import {
  submitHubSpotLead,
  type HubSpotLeadInput,
  type HubSpotServiceOption,
  type HubSpotSubmissionResult,
} from "../../../lib/hubspot-lead.ts";

import type { IncomingTextMessage } from "./message-handler";
import {
  getConversationStateKey,
  type WhatsAppStateStore,
} from "./redis-store.ts";

const CONVERSATION_TTL_SECONDS = 7 * 24 * 60 * 60;
const MAX_ALLOWED_SENDERS = 20;
const MAX_NEED_LENGTH = 1_000;
const MAX_COMPANY_LENGTH = 120;
const MAX_NAME_LENGTH = 160;
const MAX_EMAIL_LENGTH = 254;
const NUMERIC_ID_PATTERN = /^\d+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WHATSAPP_CONSENT_PROMPT =
  "May Swift Sense Digital store your name, company, email, WhatsApp number and business need in HubSpot so CW can respond to this enquiry? Reply YES I CONSENT or NO.";

export type LeadFunnelStage =
  | "collect_need"
  | "collect_company"
  | "collect_name"
  | "collect_email"
  | "collect_consent"
  | "submitting"
  | "submission_failed"
  | "submission_uncertain"
  | "confirmation_pending"
  | "handover";

export type LeadFunnelState = {
  version: 1;
  stage: LeadFunnelStage;
  startedAt: number;
  updatedAt: number;
  wantsHuman: boolean;
  need?: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  serviceInterest?: HubSpotServiceOption;
};

export type LeadFunnelMutation =
  | { type: "set"; key: string; state: LeadFunnelState }
  | { type: "delete"; key: string };

export type LeadFunnelResult =
  | { handled: false }
  | {
      handled: true;
      outcome:
        | "qualification_started"
        | "qualification_advanced"
        | "validation_retry"
        | "consent_declined"
        | "submission_succeeded"
        | "submission_failed"
        | "submission_uncertain"
        | "handover_suppressed"
        | "cancelled";
      replyText: string | null;
      mutation?: LeadFunnelMutation;
    };

export type LeadFunnelEligibilityResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "disabled"
        | "missing_allowlist"
        | "invalid_configuration"
        | "sender_not_allowed";
    };

type SubmitLeadLike = (
  input: HubSpotLeadInput
) => Promise<HubSpotSubmissionResult>;

type HandleOptions = {
  now?: number;
  submitLead?: SubmitLeadLike;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeInput(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized && normalized.length <= maxLength ? normalized : undefined;
}

function readStoredString(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? normalizeInput(value, maxLength)
    : undefined;
}

function isStage(value: unknown): value is LeadFunnelStage {
  return [
    "collect_need",
    "collect_company",
    "collect_name",
    "collect_email",
    "collect_consent",
    "submitting",
    "submission_failed",
    "submission_uncertain",
    "confirmation_pending",
    "handover",
  ].includes(String(value));
}

function parseStoredState(value: unknown): LeadFunnelState | null {
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    !isStage(value.stage) ||
    typeof value.startedAt !== "number" ||
    !Number.isFinite(value.startedAt) ||
    typeof value.updatedAt !== "number" ||
    !Number.isFinite(value.updatedAt) ||
    typeof value.wantsHuman !== "boolean"
  ) {
    return null;
  }

  return {
    version: 1,
    stage: value.stage,
    startedAt: value.startedAt,
    updatedAt: value.updatedAt,
    wantsHuman: value.wantsHuman,
    need: readStoredString(value.need, MAX_NEED_LENGTH),
    companyName: readStoredString(value.companyName, MAX_COMPANY_LENGTH),
    firstName: readStoredString(value.firstName, 80),
    lastName: readStoredString(value.lastName, 80),
    email: readStoredString(value.email, MAX_EMAIL_LENGTH),
    serviceInterest: [
      "Business Growth Website",
      "Lead Response System",
      "Transformation Blueprint",
      "Not sure yet",
    ].includes(String(value.serviceInterest))
      ? (value.serviceInterest as HubSpotServiceOption)
      : undefined,
  };
}

function withStage(
  state: LeadFunnelState,
  stage: LeadFunnelStage,
  now: number,
  additions: Partial<LeadFunnelState> = {}
): LeadFunnelState {
  return { ...state, ...additions, stage, updatedAt: now };
}

function isHumanRequest(text: string) {
  return /\b(?:human|person|consultant|agent|cw|call me|contact me|speak to|talk to)\b/i.test(
    text
  );
}

function isLeadIntent(text: string) {
  return /^(?:start|get started|proceed|yes(?:,)? (?:please|let'?s|i'?m interested)|i(?: am|'m) interested|sign me up|book (?:a )?consultation|help me decide)\b/i.test(
    text.trim()
  );
}

function isCancelRequest(text: string) {
  return /^(?:cancel|stop|no thanks|not interested|do not submit|don'?t submit)$/i.test(
    text.trim()
  );
}

function isConsentGranted(text: string) {
  return /^(?:yes i consent|yes, i consent|i consent|i agree)$/i.test(
    text.trim()
  );
}

function isConsentDeclined(text: string) {
  return /^(?:no|no thanks|i do not consent|i don'?t consent)$/i.test(
    text.trim()
  );
}

export function inferServiceInterest(text: string): HubSpotServiceOption {
  if (/\b(?:website|web site|landing page|online presence|seo)\b/i.test(text)) {
    return "Business Growth Website";
  }

  if (
    /\b(?:lead|enquir(?:y|ies)|inquir(?:y|ies)|follow[- ]?up|whatsapp|chatbot|response|repetitive|missed)\b/i.test(
      text
    )
  ) {
    return "Lead Response System";
  }

  if (
    /\b(?:strategy|blueprint|transform|workflow|process|systems?|prioriti[sz]|multiple|several)\b/i.test(
      text
    )
  ) {
    return "Transformation Blueprint";
  }

  return "Not sure yet";
}

function parseFullName(text: string) {
  const normalized = normalizeInput(text, MAX_NAME_LENGTH);

  if (!normalized || normalized.includes("@")) {
    return undefined;
  }

  const parts = normalized.split(" ");

  if (parts.length < 2) {
    return undefined;
  }

  const [firstName, ...lastNameParts] = parts;
  const lastName = lastNameParts.join(" ");

  if (firstName.length > 80 || lastName.length > 80) {
    return undefined;
  }

  return { firstName, lastName };
}

function hasCompleteLead(state: LeadFunnelState) {
  return Boolean(
    state.need &&
      state.companyName &&
      state.firstName &&
      state.lastName &&
      state.email &&
      state.serviceInterest
  );
}

function buildHubSpotInput(
  state: LeadFunnelState,
  message: IncomingTextMessage
): HubSpotLeadInput | undefined {
  if (!hasCompleteLead(state)) {
    return undefined;
  }

  return {
    firstName: state.firstName!,
    lastName: state.lastName!,
    email: state.email!,
    companyName: state.companyName!,
    phoneNumber: `+${message.senderWhatsAppId}`,
    serviceInterest: state.serviceInterest!,
    message: `WhatsApp qualification: ${state.need!}${
      state.wantsHuman ? " Human follow-up requested." : ""
    }`,
    consent: true,
    pageUri: "https://www.swiftsensedigital.com/",
    pageName: "SSD WhatsApp Assistant",
  };
}

export function checkLeadFunnelEligibility(
  environment: Record<string, string | undefined>,
  senderWhatsAppId: string
): LeadFunnelEligibilityResult {
  if (environment.WHATSAPP_LEAD_FUNNEL_ENABLED !== "true") {
    return { ok: false, reason: "disabled" };
  }

  const rawAllowlist = environment.WHATSAPP_AI_ALLOWED_SENDER_IDS?.trim();

  if (!rawAllowlist) {
    return { ok: false, reason: "missing_allowlist" };
  }

  const senderIds = rawAllowlist
    .split(",")
    .map((senderId) => senderId.trim())
    .filter(Boolean);

  if (
    senderIds.length === 0 ||
    senderIds.length > MAX_ALLOWED_SENDERS ||
    senderIds.some(
      (senderId) =>
        senderId.length > 20 || !NUMERIC_ID_PATTERN.test(senderId)
    )
  ) {
    return { ok: false, reason: "invalid_configuration" };
  }

  return senderIds.includes(senderWhatsAppId)
    ? { ok: true }
    : { ok: false, reason: "sender_not_allowed" };
}

export async function applyLeadFunnelMutation(
  store: WhatsAppStateStore,
  mutation: LeadFunnelMutation | undefined
) {
  if (!mutation) {
    return;
  }

  if (mutation.type === "delete") {
    await store.delete(mutation.key);
    return;
  }

  await store.setJson(
    mutation.key,
    mutation.state,
    CONVERSATION_TTL_SECONDS
  );
}

export async function handleLeadFunnelMessage(
  message: IncomingTextMessage,
  store: WhatsAppStateStore,
  options: HandleOptions = {}
): Promise<LeadFunnelResult> {
  const now = options.now ?? Date.now();
  const submitLead = options.submitLead ?? submitHubSpotLead;
  const stateKey = getConversationStateKey(message);
  const storedState = await store.getJson<unknown>(stateKey);
  const state = parseStoredState(storedState);
  const text = message.text.trim();

  if (storedState !== null && !state) {
    await store.delete(stateKey);
  }

  if (state && isCancelRequest(text)) {
    return {
      handled: true,
      outcome: "cancelled",
      replyText:
        "Understood. The qualification has been cancelled and no enquiry was submitted to HubSpot.",
      mutation: { type: "delete", key: stateKey },
    };
  }

  if (!state) {
    const wantsHuman = isHumanRequest(text);

    if (!wantsHuman && !isLeadIntent(text)) {
      return { handled: false };
    }

    const serviceInterest = inferServiceInterest(text);
    const includesUsefulNeed =
      serviceInterest !== "Not sure yet" && text.length >= 16;
    const initialState: LeadFunnelState = {
      version: 1,
      stage: includesUsefulNeed ? "collect_company" : "collect_need",
      startedAt: now,
      updatedAt: now,
      wantsHuman,
      ...(includesUsefulNeed
        ? { need: text, serviceInterest }
        : {}),
    };

    return {
      handled: true,
      outcome: "qualification_started",
      replyText: includesUsefulNeed
        ? "Thanks. What is your business or company name?"
        : "Great. What is the main business problem you want to solve—for example, website credibility, slow or missed enquiries, or deciding what to improve first?",
      mutation: { type: "set", key: stateKey, state: initialState },
    };
  }

  if (state.stage === "handover") {
    return {
      handled: true,
      outcome: "handover_suppressed",
      replyText: null,
    };
  }

  if (state.stage === "confirmation_pending") {
    return {
      handled: true,
      outcome: "submission_succeeded",
      replyText:
        "Thanks—your enquiry has been recorded for human follow-up. CW will respond within two business days.",
      mutation: {
        type: "set",
        key: stateKey,
        state: withStage(state, "handover", now, {
          need: undefined,
          companyName: undefined,
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          serviceInterest: undefined,
        }),
      },
    };
  }

  if (state.stage === "submitting" || state.stage === "submission_uncertain") {
    const uncertainState = withStage(state, "submission_uncertain", now);

    return {
      handled: true,
      outcome: "submission_uncertain",
      replyText:
        "I could not confirm whether the enquiry was recorded, so I will not submit it again automatically. Please email chunwai@swiftsensedigital.com for CW to check it safely.",
      mutation: { type: "set", key: stateKey, state: uncertainState },
    };
  }

  if (state.stage === "submission_failed") {
    if (/^retry$/i.test(text)) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText: WHATSAPP_CONSENT_PROMPT,
        mutation: {
          type: "set",
          key: stateKey,
          state: withStage(state, "collect_consent", now),
        },
      };
    }

    return {
      handled: true,
      outcome: "submission_failed",
      replyText:
        "The enquiry was not recorded. Reply RETRY to make one controlled attempt, or email chunwai@swiftsensedigital.com.",
    };
  }

  const wantsHuman = state.wantsHuman || isHumanRequest(text);

  if (state.stage === "collect_need") {
    if (isHumanRequest(text) && text.length < 16) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText:
          "I can arrange human follow-up. First, what is the main business problem you want help with?",
        mutation: {
          type: "set",
          key: stateKey,
          state: { ...state, wantsHuman, updatedAt: now },
        },
      };
    }

    const need = normalizeInput(text, MAX_NEED_LENGTH);

    if (!need || need.length < 8) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText:
          "Please briefly describe the business problem you want to solve so I can qualify the enquiry accurately.",
      };
    }

    return {
      handled: true,
      outcome: "qualification_advanced",
      replyText: "Thanks. What is your business or company name?",
      mutation: {
        type: "set",
        key: stateKey,
        state: withStage(state, "collect_company", now, {
          wantsHuman,
          need,
          serviceInterest: inferServiceInterest(need),
        }),
      },
    };
  }

  if (state.stage === "collect_company") {
    if (isHumanRequest(text)) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText:
          "I can arrange human follow-up. What is your business or company name?",
        mutation: {
          type: "set",
          key: stateKey,
          state: { ...state, wantsHuman, updatedAt: now },
        },
      };
    }

    const companyName = normalizeInput(text, MAX_COMPANY_LENGTH);

    if (!companyName || companyName.length < 2 || companyName.includes("@")) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText: "Please enter a valid business or company name.",
      };
    }

    return {
      handled: true,
      outcome: "qualification_advanced",
      replyText: "What is your full name (first and last name)?",
      mutation: {
        type: "set",
        key: stateKey,
        state: withStage(state, "collect_name", now, {
          wantsHuman,
          companyName,
        }),
      },
    };
  }

  if (state.stage === "collect_name") {
    const name = parseFullName(text);

    if (!name) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText: "Please share both your first and last name.",
      };
    }

    return {
      handled: true,
      outcome: "qualification_advanced",
      replyText: "What email address should CW use for the follow-up?",
      mutation: {
        type: "set",
        key: stateKey,
        state: withStage(state, "collect_email", now, {
          wantsHuman,
          ...name,
        }),
      },
    };
  }

  if (state.stage === "collect_email") {
    const email = normalizeInput(text.toLowerCase(), MAX_EMAIL_LENGTH);

    if (!email || !EMAIL_PATTERN.test(email)) {
      return {
        handled: true,
        outcome: "validation_retry",
        replyText: "Please enter a valid email address.",
      };
    }

    return {
      handled: true,
      outcome: "qualification_advanced",
      replyText: WHATSAPP_CONSENT_PROMPT,
      mutation: {
        type: "set",
        key: stateKey,
        state: withStage(state, "collect_consent", now, {
          wantsHuman,
          email,
        }),
      },
    };
  }

  if (isConsentDeclined(text)) {
    return {
      handled: true,
      outcome: "consent_declined",
      replyText:
        "Understood. Nothing has been submitted to HubSpot. You can contact CW directly at chunwai@swiftsensedigital.com.",
      mutation: { type: "delete", key: stateKey },
    };
  }

  if (!isConsentGranted(text)) {
    return {
      handled: true,
      outcome: "validation_retry",
      replyText: WHATSAPP_CONSENT_PROMPT,
    };
  }

  const hubspotInput = buildHubSpotInput(state, message);

  if (!hubspotInput) {
    return {
      handled: true,
      outcome: "submission_failed",
      replyText:
        "The qualification is incomplete, so nothing was submitted. Reply CANCEL and then START to begin again.",
    };
  }

  await store.setJson(
    stateKey,
    withStage(state, "submitting", now),
    CONVERSATION_TTL_SECONDS
  );

  const submission = await submitLead(hubspotInput);

  if (!submission.ok) {
    const failedStage =
      submission.reason === "request_failed"
        ? "submission_uncertain"
        : "submission_failed";
    await store.setJson(
      stateKey,
      withStage(state, failedStage, now),
      CONVERSATION_TTL_SECONDS
    );

    return submission.reason === "request_failed"
      ? {
          handled: true,
          outcome: "submission_uncertain",
          replyText:
            "I could not confirm whether the enquiry was recorded, so I will not submit it again automatically. Please email chunwai@swiftsensedigital.com for CW to check it safely.",
        }
      : {
          handled: true,
          outcome: "submission_failed",
          replyText:
            "The enquiry was not recorded. Reply RETRY to make one controlled attempt, or email chunwai@swiftsensedigital.com.",
        };
  }

  const confirmationState = withStage(state, "confirmation_pending", now, {
    need: undefined,
    companyName: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    serviceInterest: undefined,
  });
  await store.setJson(
    stateKey,
    confirmationState,
    CONVERSATION_TTL_SECONDS
  );

  return {
    handled: true,
    outcome: "submission_succeeded",
    replyText:
      "Thanks—your enquiry has been recorded for human follow-up. CW will respond within two business days.",
    mutation: {
      type: "set",
      key: stateKey,
      state: withStage(confirmationState, "handover", now),
    },
  };
}
