import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { handleContactRequest } from "./handler.ts";
import { buildHubSpotLeadPayload } from "../../lib/hubspot-lead.ts";
import { waitlistProducts, waitlistConsentText, approvedProductFacts, productFaqs } from "../../lib/product-catalog.ts";

const base = {
  firstName: "Test", lastName: "Registrant", email: "test@example.com",
  companyName: "Test Company", phoneNumber: "", serviceInterest: "Lead Response System",
  message: "Improve enquiry follow-up", consent: true, website: "",
};

function request(body, headers = {}) {
  return new Request("https://example.com/api/contact", {
    method: "POST", headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

for (const product of waitlistProducts) {
  test(`records ${product.name} separately with no company or message required`, async () => {
    let recorded;
    const response = await handleContactRequest(request({ ...base,
      serviceInterest: product.serviceInterest, companyName: "", message: "",
    }), async (input) => { recorded = input; return { ok: true }; });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.ok, true);
    assert.match(result.message, /waitlist registration/);
    assert.doesNotMatch(result.message, /two business days/);
    assert.equal(recorded.serviceInterest, "Not sure yet");
    assert.equal(recorded.waitlist, true);
    assert.ok(recorded.message.includes(product.name));
    assert.ok(recorded.message.includes(product.price));
    const crm = buildHubSpotLeadPayload(recorded);
    assert.equal(crm.fields.some((field) => field.name === "company"), false);
    assert.equal(crm.legalConsentOptions.consent.text, waitlistConsentText);
  });
}

test("preserves normal service enquiries and their original consent", async () => {
  let recorded;
  const response = await handleContactRequest(request(base), async (input) => {
    recorded = input; return { ok: true };
  });
  assert.equal(response.status, 200);
  assert.equal(recorded.serviceInterest, "Lead Response System");
  assert.equal(recorded.waitlist, undefined);
  assert.equal(recorded.message, base.message);
  assert.match((await response.json()).message, /two business days/);
  assert.doesNotMatch(buildHubSpotLeadPayload(recorded).legalConsentOptions.consent.text, /waitlist/);
});

for (const [label, overrides, error] of [
  ["missing consent", { consent: false }, "consent"],
  ["string consent", { consent: "true" }, "consent"],
  ["invalid email", { email: "invalid" }, "email"],
  ["unknown product", { serviceInterest: "A made-up product" }, "serviceInterest"],
  ["honeypot", { website: "spam" }, "website"],
  ["missing name", { firstName: "" }, "firstName"],
  ["oversized note", { message: "x".repeat(2001) }, "message"],
]) {
  test(`rejects waitlist ${label} without calling CRM`, async () => {
    const response = await handleContactRequest(request({ ...base,
      serviceInterest: waitlistProducts[1].serviceInterest, ...overrides,
    }), async () => assert.fail("CRM must not be called"));
    assert.equal(response.status, 400);
    assert.ok((await response.json()).errors[error]);
  });
}

test("ordinary enquiries still require company and message", async () => {
  const response = await handleContactRequest(request({ ...base, companyName: "", message: "" }), async () => assert.fail("CRM must not be called"));
  const result = await response.json();
  assert.equal(response.status, 400);
  assert.ok(result.errors.companyName);
  assert.ok(result.errors.message);
});

test("does not claim registration when CRM rejects it or cannot confirm it", async () => {
  for (const reason of ["rejected", "request_failed"]) {
    let calls = 0;
    const response = await handleContactRequest(request({ ...base, serviceInterest: waitlistProducts[0].serviceInterest }), async () => { calls++; return { ok: false, reason }; });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
    assert.equal(calls, 1);
  }
});

test("handles malformed JSON, unsupported media type, and actual UTF-8 body size", async () => {
  for (const [body, type, status] of [
    ["{", "application/json", 400],
    ["{}", "text/plain", 415],
    [JSON.stringify({ padding: "日".repeat(6000) }), "application/json", 413],
  ]) {
    const response = await handleContactRequest(new Request("https://example.com/api/contact", { method: "POST", headers: { "content-type": type }, body }), async () => assert.fail("CRM must not be called"));
    assert.equal(response.status, status);
  }
});

test("a malformed tracking cookie cannot block a valid enquiry", async () => {
  const response = await handleContactRequest(request(base, { cookie: "hubspotutk=%invalid" }), async (input) => {
    assert.equal(input.hutk, undefined); return { ok: true };
  });
  assert.equal(response.status, 200);
});

test("web and WhatsApp instructions both use the approved shared product facts", () => {
  for (const path of ["../chat/route.ts", "../whatsapp/webhook/ai-reply.ts"]) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    assert.match(source, /\$\{approvedProductFacts\}/);
    assert.doesNotMatch(source, /S\$3,500/);
  }
  assert.match(approvedProductFacts, /Lead Response System: starts from S\$5,000/);
  assert.match(approvedProductFacts, /WhatsApp AI Assistant: starts from S\$3,000; WAITLIST ONLY/);
  assert.match(approvedProductFacts, /SwiftChief — AI Chief of Staff: starts from S\$19 per user\/month; WAITLIST ONLY/);
  assert.match(productFaqs.find((faq) => faq.question === "What pricing is confirmed?").answer, /S\$5,000/);
});
