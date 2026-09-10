import assert from "node:assert/strict";
import test from "node:test";

import {
  applyLeadFunnelMutation,
  checkLeadFunnelEligibility,
  handleLeadFunnelMessage,
  inferServiceInterest,
  WHATSAPP_CONSENT_PROMPT,
} from "./lead-funnel.ts";
import {
  createUpstashRestStore,
  getConversationStateKey,
  getMessageDedupeKey,
} from "./redis-store.ts";
import {
  buildHubSpotLeadPayload,
  submitHubSpotLead,
} from "../../../lib/hubspot-lead.ts";

class MemoryStore {
  values = new Map();
  reservations = new Set();

  async getJson(key) {
    return this.values.get(key) ?? null;
  }

  async setJson(key, value) {
    this.values.set(key, structuredClone(value));
  }

  async delete(key) {
    this.values.delete(key);
    this.reservations.delete(key);
  }

  async reserve(key) {
    if (this.reservations.has(key)) {
      return false;
    }

    this.reservations.add(key);
    return true;
  }
}

const baseMessage = {
  messageId: "wamid.TEST",
  senderWhatsAppId: "6591234567",
  sourcePhoneNumberId: "123456789",
  text: "START",
};

function message(text, sequence) {
  return {
    ...baseMessage,
    messageId: `wamid.TEST_${sequence}`,
    text,
  };
}

async function advance(store, text, sequence, submitLead) {
  const result = await handleLeadFunnelMessage(
    message(text, sequence),
    store,
    { now: 1_000 + sequence, submitLead }
  );

  if (result.handled && result.replyText !== null) {
    await applyLeadFunnelMutation(store, result.mutation);
  }

  return result;
}

async function reachConsent(store, submitLead) {
  await advance(store, "START", 1, submitLead);
  await advance(store, "We keep missing customer enquiries", 2, submitLead);
  await advance(store, "Example Pte Ltd", 3, submitLead);
  await advance(store, "Alex Tan", 4, submitLead);
  return advance(store, "alex@example.com", 5, submitLead);
}

test("keeps the lead funnel disabled unless the sender is explicitly allowed", () => {
  assert.deepEqual(checkLeadFunnelEligibility({}, baseMessage.senderWhatsAppId), {
    ok: false,
    reason: "disabled",
  });

  assert.deepEqual(
    checkLeadFunnelEligibility(
      { WHATSAPP_LEAD_FUNNEL_ENABLED: "true" },
      baseMessage.senderWhatsAppId
    ),
    { ok: false, reason: "missing_allowlist" }
  );

  assert.deepEqual(
    checkLeadFunnelEligibility(
      {
        WHATSAPP_LEAD_FUNNEL_ENABLED: "true",
        WHATSAPP_AI_ALLOWED_SENDER_IDS: "6590000000",
      },
      baseMessage.senderWhatsAppId
    ),
    { ok: false, reason: "sender_not_allowed" }
  );

  assert.deepEqual(
    checkLeadFunnelEligibility(
      {
        WHATSAPP_LEAD_FUNNEL_ENABLED: "true",
        WHATSAPP_AI_ALLOWED_SENDER_IDS: baseMessage.senderWhatsAppId,
      },
      baseMessage.senderWhatsAppId
    ),
    { ok: true }
  );
});

test("maps business needs to the approved SSD services", () => {
  assert.equal(
    inferServiceInterest("Our website is outdated"),
    "Business Growth Website"
  );
  assert.equal(
    inferServiceInterest("We miss too many enquiries"),
    "Lead Response System"
  );
  assert.equal(
    inferServiceInterest("Several workflows need prioritisation"),
    "Transformation Blueprint"
  );
  assert.equal(inferServiceInterest("We are exploring options"), "Not sure yet");
});

test("qualifies a lead and requires explicit consent without calling HubSpot", async () => {
  const store = new MemoryStore();
  let submissionCount = 0;
  const submitLead = async () => {
    submissionCount += 1;
    return { ok: true };
  };

  const start = await advance(store, "START", 1, submitLead);
  assert.equal(start.outcome, "qualification_started");

  const need = await advance(
    store,
    "We keep missing customer enquiries",
    2,
    submitLead
  );
  assert.equal(need.outcome, "qualification_advanced");

  await advance(store, "Example Pte Ltd", 3, submitLead);
  const shortName = await advance(store, "Alex", 4, submitLead);
  assert.equal(shortName.outcome, "validation_retry");

  await advance(store, "Alex Tan", 5, submitLead);
  const invalidEmail = await advance(store, "not-an-email", 6, submitLead);
  assert.equal(invalidEmail.outcome, "validation_retry");

  const email = await advance(store, "alex@example.com", 7, submitLead);
  assert.equal(email.replyText, WHATSAPP_CONSENT_PROMPT);

  const ambiguousYes = await advance(store, "yes", 8, submitLead);
  assert.equal(ambiguousYes.outcome, "validation_retry");
  assert.equal(submissionCount, 0);

  const declined = await advance(store, "NO", 9, submitLead);
  assert.equal(declined.outcome, "consent_declined");
  assert.equal(submissionCount, 0);
  assert.equal(
    await store.getJson(getConversationStateKey(baseMessage)),
    null
  );
});

test("submits once after consent, removes Redis PII, and suppresses AI for handover", async () => {
  const store = new MemoryStore();
  const submissions = [];
  const submitLead = async (lead) => {
    submissions.push(lead);
    return { ok: true };
  };

  await reachConsent(store, submitLead);
  const submitted = await advance(store, "YES I CONSENT", 6, submitLead);

  assert.equal(submitted.outcome, "submission_succeeded");
  assert.equal(submissions.length, 1);
  assert.deepEqual(submissions[0], {
    firstName: "Alex",
    lastName: "Tan",
    email: "alex@example.com",
    companyName: "Example Pte Ltd",
    phoneNumber: "+6591234567",
    serviceInterest: "Lead Response System",
    message:
      "WhatsApp qualification: We keep missing customer enquiries",
    consent: true,
    pageUri: "https://www.swiftsensedigital.com/",
    pageName: "SSD WhatsApp Assistant",
  });

  const saved = await store.getJson(getConversationStateKey(baseMessage));
  assert.equal(saved.stage, "handover");
  assert.equal(saved.email, undefined);
  assert.equal(saved.companyName, undefined);

  const followUp = await advance(store, "Are you there?", 7, submitLead);
  assert.equal(followUp.outcome, "handover_suppressed");
  assert.equal(followUp.replyText, null);
  assert.equal(submissions.length, 1);
});

test("does not automatically retry an uncertain HubSpot request", async () => {
  const store = new MemoryStore();
  let submissionCount = 0;
  const submitLead = async () => {
    submissionCount += 1;
    return { ok: false, reason: "request_failed" };
  };

  await reachConsent(store, submitLead);
  const uncertain = await advance(store, "YES I CONSENT", 6, submitLead);
  assert.equal(uncertain.outcome, "submission_uncertain");
  assert.equal(submissionCount, 1);

  const repeat = await advance(store, "YES I CONSENT", 7, submitLead);
  assert.equal(repeat.outcome, "submission_uncertain");
  assert.equal(submissionCount, 1);
});

test("allows one deliberate retry after HubSpot explicitly rejects a request", async () => {
  const store = new MemoryStore();
  let submissionCount = 0;
  const submitLead = async () => {
    submissionCount += 1;
    return submissionCount === 1
      ? { ok: false, reason: "rejected", diagnostics: { httpStatus: 503 } }
      : { ok: true };
  };

  await reachConsent(store, submitLead);
  const rejected = await advance(store, "YES I CONSENT", 6, submitLead);
  assert.equal(rejected.outcome, "submission_failed");

  const retryPrompt = await advance(store, "RETRY", 7, submitLead);
  assert.equal(retryPrompt.replyText, WHATSAPP_CONSENT_PROMPT);
  assert.equal(submissionCount, 1);

  const submitted = await advance(store, "YES I CONSENT", 8, submitLead);
  assert.equal(submitted.outcome, "submission_succeeded");
  assert.equal(submissionCount, 2);
});

test("uses Vercel's Redis REST variables and sends authenticated JSON commands", async () => {
  const commands = [];
  const configuration = createUpstashRestStore(
    {
      KV_REST_API_URL: "https://example.upstash.io",
      KV_REST_API_TOKEN: "test-secret-token",
    },
    async (url, init) => {
      commands.push({ url: String(url), init, body: JSON.parse(init.body) });
      const command = commands.at(-1).body[0];
      const result = command === "GET" ? JSON.stringify({ stage: "test" }) : "OK";
      return Response.json({ result });
    }
  );

  assert.equal(configuration.ok, true);
  assert.equal(await configuration.store.reserve("message-key", 60), true);
  assert.deepEqual(await configuration.store.getJson("state-key"), {
    stage: "test",
  });
  await configuration.store.setJson("state-key", { stage: "next" }, 120);

  assert.deepEqual(commands.map((entry) => entry.body), [
    ["SET", "message-key", "processing", "EX", 60, "NX"],
    ["GET", "state-key"],
    ["SET", "state-key", JSON.stringify({ stage: "next" }), "EX", 120],
  ]);
  assert.equal(commands[0].url, "https://example.upstash.io");
  assert.equal(
    commands[0].init.headers.Authorization,
    "Bearer test-secret-token"
  );
});

test("hashes Redis keys so WhatsApp identifiers are not stored in key names", () => {
  const conversationKey = getConversationStateKey(baseMessage);
  const messageKey = getMessageDedupeKey(baseMessage);

  assert.match(conversationKey, /^whatsapp:conversation:v1:[a-f0-9]{64}$/);
  assert.match(messageKey, /^whatsapp:message:v1:[a-f0-9]{64}$/);
  assert.equal(conversationKey.includes(baseMessage.senderWhatsAppId), false);
  assert.equal(messageKey.includes(baseMessage.messageId), false);
});

test("builds and submits the existing HubSpot form payload without an API secret", async () => {
  const lead = {
    firstName: "Alex",
    lastName: "Tan",
    email: "alex@example.com",
    companyName: "Example Pte Ltd",
    phoneNumber: "+6591234567",
    serviceInterest: "Lead Response System",
    message: "WhatsApp qualification: missed enquiries",
    consent: true,
    pageName: "SSD WhatsApp Assistant",
  };
  const payload = buildHubSpotLeadPayload(lead);

  assert.equal(payload.legalConsentOptions.consent.consentToProcess, true);
  assert.equal(
    payload.fields.find((field) => field.name === "email").value,
    "alex@example.com"
  );

  let captured;
  const result = await submitHubSpotLead(lead, {
    fetchImpl: async (url, init) => {
      captured = { url: String(url), init };
      return new Response(null, { status: 204 });
    },
  });

  assert.deepEqual(result, { ok: true });
  assert.match(captured.url, /^https:\/\/api\.hsforms\.com\/submissions\//);
  assert.equal(captured.init.headers.Authorization, undefined);
});
