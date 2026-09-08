import { createHmac, timingSafeEqual } from "node:crypto";
import { after } from "next/server";

import { generateWhatsAppAIReply } from "./ai-reply";
import {
  extractIncomingTextMessages,
  readReplyConfiguration,
  sendWhatsAppTextReply,
  TEST_AUTO_REPLY,
  VolatileMessageDedupe,
  type IncomingTextMessage,
} from "./message-handler";

export const maxDuration = 30;

const MAX_REQUEST_BYTES = 1024 * 1024;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;
// This protects the proof of concept from immediate retries on one function
// instance. Production-grade deduplication will require durable shared storage.
const messageDedupe = new VolatileMessageDedupe();

function textResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function hasValidMetaSignature(
  payload: Buffer,
  signatureHeader: string | null,
  appSecret: string
) {
  if (!signatureHeader) {
    return false;
  }

  const suppliedSignature = signatureHeader.trim();
  const expectedSignature =
    "sha256=" +
    createHmac("sha256", appSecret).update(payload).digest("hex");

  return safeEqual(suppliedSignature, expectedSignature);
}

function summarizeWebhook(payload: Record<string, unknown>) {
  const entries = Array.isArray(payload.entry) ? payload.entry : [];
  const fields = new Set<string>();
  let changeCount = 0;
  let messageCount = 0;
  let statusCount = 0;

  for (const entry of entries) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) {
      continue;
    }

    for (const change of entry.changes) {
      if (!isRecord(change)) {
        continue;
      }

      changeCount += 1;

      if (typeof change.field === "string") {
        fields.add(change.field);
      }

      if (!isRecord(change.value)) {
        continue;
      }

      if (Array.isArray(change.value.messages)) {
        messageCount += change.value.messages.length;
      }

      if (Array.isArray(change.value.statuses)) {
        statusCount += change.value.statuses.length;
      }
    }
  }

  return {
    object:
      typeof payload.object === "string" ? payload.object : "unknown",
    entryCount: entries.length,
    changeCount,
    fields: [...fields].sort(),
    messageCount,
    statusCount,
  };
}

async function processIncomingTextMessages(
  messages: IncomingTextMessage[]
) {
  const configuration = readReplyConfiguration(process.env);

  if (!configuration.ok) {
    console.info("[whatsapp-webhook] automatic reply skipped", {
      reason: configuration.reason,
      candidateCount: messages.length,
    });
    return;
  }

  let duplicateCount = 0;
  let failedCount = 0;
  let aiReplyCount = 0;
  let fallbackReplyCount = 0;
  let sentCount = 0;
  let aiAttempted = false;

  for (const message of messages) {
    const dedupeKey = `${message.sourcePhoneNumberId}:${message.messageId}`;

    if (!messageDedupe.reserve(dedupeKey)) {
      duplicateCount += 1;
      continue;
    }

    const aiResult = aiAttempted
      ? { ok: false as const, reason: "batch_limit" as const }
      : await generateWhatsAppAIReply(message, process.env);
    aiAttempted = true;

    const replyText = aiResult.ok ? aiResult.text : TEST_AUTO_REPLY;
    const replyMode = aiResult.ok ? "ai" : "fallback";

    if (
      !aiResult.ok &&
      aiResult.reason !== "disabled" &&
      aiResult.reason !== "sender_not_allowed" &&
      aiResult.reason !== "batch_limit"
    ) {
      console.warn("[whatsapp-webhook] AI reply unavailable", {
        reason: aiResult.reason,
      });
    }

    const result = await sendWhatsAppTextReply(
      message,
      configuration.config,
      { replyText }
    );

    if (!result.ok) {
      messageDedupe.release(dedupeKey);
      failedCount += 1;
      console.warn("[whatsapp-webhook] automatic reply failed", {
        reason: result.reason,
        httpStatus: result.httpStatus,
        metaErrorCode: result.metaErrorCode,
        metaErrorSubcode: result.metaErrorSubcode,
        metaErrorType: result.metaErrorType,
        metaTraceId: result.metaTraceId,
      });
      continue;
    }

    if (replyMode === "ai") {
      aiReplyCount += 1;
    } else {
      fallbackReplyCount += 1;
    }

    sentCount += 1;
  }

  console.info("[whatsapp-webhook] automatic reply batch completed", {
    aiReplyCount,
    candidateCount: messages.length,
    duplicateCount,
    fallbackReplyCount,
    failedCount,
    sentCount,
  });
}

export async function GET(request: Request) {
  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (!expectedToken) {
    console.error(
      "[whatsapp-webhook] WHATSAPP_WEBHOOK_VERIFY_TOKEN is not configured"
    );
    return textResponse("Webhook verification is not configured.", 503);
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const suppliedToken = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    suppliedToken &&
    challenge !== null &&
    safeEqual(suppliedToken, expectedToken)
  ) {
    return textResponse(challenge, 200);
  }

  return textResponse("Forbidden", 403);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return Response.json(
      { received: false, error: "unsupported_media_type" },
      { status: 415, headers: NO_STORE_HEADERS }
    );
  }

  const declaredLength = Number(
    request.headers.get("content-length") ?? "0"
  );

  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_REQUEST_BYTES
  ) {
    return Response.json(
      { received: false, error: "payload_too_large" },
      { status: 413, headers: NO_STORE_HEADERS }
    );
  }

  const appSecret = process.env.META_APP_SECRET;

  if (!appSecret) {
    console.error("[whatsapp-webhook] META_APP_SECRET is not configured");
    return Response.json(
      { received: false, error: "webhook_not_configured" },
      { status: 503, headers: NO_STORE_HEADERS }
    );
  }

  let rawPayload: Buffer;

  try {
    rawPayload = Buffer.from(await request.arrayBuffer());
  } catch {
    return Response.json(
      { received: false, error: "payload_unreadable" },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (rawPayload.byteLength > MAX_REQUEST_BYTES) {
    return Response.json(
      { received: false, error: "payload_too_large" },
      { status: 413, headers: NO_STORE_HEADERS }
    );
  }

  if (
    !hasValidMetaSignature(
      rawPayload,
      request.headers.get("x-hub-signature-256"),
      appSecret
    )
  ) {
    return Response.json(
      { received: false, error: "invalid_signature" },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawPayload.toString("utf8"));
  } catch {
    return Response.json(
      { received: false, error: "invalid_json" },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (!isRecord(payload)) {
    return Response.json(
      { received: false, error: "invalid_payload" },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const { textMessages, ignoredMessageCount } =
    extractIncomingTextMessages(payload);

  // Keep diagnostics free of message text, phone numbers and contact details.
  console.info("[whatsapp-webhook] accepted signed Meta event", {
    ...summarizeWebhook(payload),
    acceptedTextMessageCount: textMessages.length,
    ignoredMessageCount,
  });

  if (textMessages.length > 0) {
    after(() => processIncomingTextMessages(textMessages));
  }

  return Response.json(
    { received: true },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}
