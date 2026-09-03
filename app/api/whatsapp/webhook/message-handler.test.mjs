import assert from "node:assert/strict";
import test from "node:test";

import {
  extractIncomingTextMessages,
  readReplyConfiguration,
  sendWhatsAppTextReply,
  TEST_AUTO_REPLY,
  VolatileMessageDedupe,
} from "./message-handler.ts";

const sampleMessage = {
  messageId: "wamid.TEST_MESSAGE",
  senderWhatsAppId: "16505551234",
  sourcePhoneNumberId: "123456789",
  text: "Hello SSD",
};

const sampleConfiguration = {
  accessToken: "secret-test-token",
  graphApiVersion: "v26.0",
  phoneNumberId: "123456789",
};

test("extracts a valid incoming text message without contact data", () => {
  const result = extractIncomingTextMessages({
    object: "whatsapp_business_account",
    entry: [
      {
        changes: [
          {
            field: "messages",
            value: {
              metadata: { phone_number_id: "123456789" },
              contacts: [{ profile: { name: "Private name" } }],
              messages: [
                {
                  from: "16505551234",
                  id: "wamid.TEST_MESSAGE",
                  type: "text",
                  text: { body: "  Hello SSD  " },
                },
              ],
            },
          },
        ],
      },
    ],
  });

  assert.deepEqual(result, {
    textMessages: [sampleMessage],
    ignoredMessageCount: 0,
  });
});

test("ignores statuses, media, and malformed text messages", () => {
  const result = extractIncomingTextMessages({
    object: "whatsapp_business_account",
    entry: [
      {
        changes: [
          {
            field: "messages",
            value: {
              metadata: { phone_number_id: "123456789" },
              statuses: [{ id: "status-id" }],
              messages: [
                { id: "wamid.IMAGE", from: "16505551234", type: "image" },
                {
                  id: "wamid.MISSING_BODY",
                  from: "16505551234",
                  type: "text",
                  text: {},
                },
              ],
            },
          },
        ],
      },
    ],
  });

  assert.equal(result.textMessages.length, 0);
  assert.equal(result.ignoredMessageCount, 2);
});

test("reads reply credentials only when explicitly enabled", () => {
  assert.deepEqual(readReplyConfiguration({}), {
    ok: false,
    reason: "disabled",
  });

  assert.deepEqual(
    readReplyConfiguration({ WHATSAPP_AUTO_REPLY_ENABLED: "true" }),
    { ok: false, reason: "missing_credentials" }
  );

  assert.deepEqual(
    readReplyConfiguration({
      WHATSAPP_AUTO_REPLY_ENABLED: "true",
      WHATSAPP_ACCESS_TOKEN: "secret-test-token",
      WHATSAPP_PHONE_NUMBER_ID: "123456789",
    }),
    { ok: true, config: sampleConfiguration }
  );
});

test("deduplicates within its TTL and releases failed work", () => {
  const dedupe = new VolatileMessageDedupe(100, 10);

  assert.equal(dedupe.reserve("message-a", 1_000), true);
  assert.equal(dedupe.reserve("message-a", 1_050), false);
  assert.equal(dedupe.reserve("message-a", 1_101), true);
  dedupe.release("message-a");
  assert.equal(dedupe.reserve("message-a", 1_102), true);
});

test("sends a contextual text reply through the configured phone number", async () => {
  let capturedUrl;
  let capturedInit;

  const result = await sendWhatsAppTextReply(
    sampleMessage,
    sampleConfiguration,
    async (url, init) => {
      capturedUrl = String(url);
      capturedInit = init;
      return Response.json({ messages: [{ id: "wamid.REPLY" }] });
    }
  );

  assert.deepEqual(result, { ok: true });
  assert.equal(
    capturedUrl,
    "https://graph.facebook.com/v26.0/123456789/messages"
  );
  assert.equal(capturedInit.headers.Authorization, "Bearer secret-test-token");

  const body = JSON.parse(capturedInit.body);
  assert.deepEqual(body, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "16505551234",
    type: "text",
    context: { message_id: "wamid.TEST_MESSAGE" },
    text: { preview_url: false, body: TEST_AUTO_REPLY },
  });
});

test("refuses to send through a different phone number ID", async () => {
  let called = false;
  const result = await sendWhatsAppTextReply(
    { ...sampleMessage, sourcePhoneNumberId: "987654321" },
    sampleConfiguration,
    async () => {
      called = true;
      return Response.json({});
    }
  );

  assert.equal(called, false);
  assert.deepEqual(result, {
    ok: false,
    reason: "phone_number_id_mismatch",
  });
});

test("returns redacted Meta error diagnostics", async () => {
  const result = await sendWhatsAppTextReply(
    sampleMessage,
    sampleConfiguration,
    async () =>
      Response.json(
        {
          error: {
            message: "Sensitive upstream message is intentionally omitted",
            type: "OAuthException",
            code: 190,
            error_subcode: 463,
            fbtrace_id: "trace-id",
          },
        },
        { status: 401 }
      )
  );

  assert.deepEqual(result, {
    ok: false,
    reason: "meta_rejected",
    httpStatus: 401,
    metaErrorCode: 190,
    metaErrorSubcode: 463,
    metaErrorType: "OAuthException",
    metaTraceId: "trace-id",
  });
});
