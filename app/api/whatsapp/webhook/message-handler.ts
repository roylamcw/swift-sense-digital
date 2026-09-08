const DEFAULT_GRAPH_API_VERSION = "v26.0";
const MAX_MESSAGES_PER_WEBHOOK = 20;
const MAX_TEXT_LENGTH = 4_096;
const MESSAGE_ID_PATTERN = /^[A-Za-z0-9._~:+\/=\-]+$/;
const NUMERIC_ID_PATTERN = /^\d+$/;
const GRAPH_API_VERSION_PATTERN = /^v\d{1,3}\.\d{1,3}$/;

export const TEST_AUTO_REPLY =
  "Thanks — Swift Sense Digital received your test message. This is an automated setup acknowledgement.";

export type IncomingTextMessage = {
  messageId: string;
  senderWhatsAppId: string;
  sourcePhoneNumberId: string;
  text: string;
};

export type ExtractedMessageBatch = {
  textMessages: IncomingTextMessage[];
  ignoredMessageCount: number;
};

export type WhatsAppReplyConfiguration = {
  accessToken: string;
  graphApiVersion: string;
  phoneNumberId: string;
};

export type ReplyConfigurationResult =
  | { ok: true; config: WhatsAppReplyConfiguration }
  | {
      ok: false;
      reason: "disabled" | "missing_credentials" | "invalid_configuration";
    };

export type WhatsAppSendResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "invalid_reply_text"
        | "phone_number_id_mismatch"
        | "request_failed"
        | "meta_rejected";
      httpStatus?: number;
      metaErrorCode?: number;
      metaErrorSubcode?: number;
      metaErrorType?: string;
      metaTraceId?: string;
    };

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

type WhatsAppSendOptions = {
  fetchImpl?: FetchLike;
  replyText?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed.length > maxLength) {
    return undefined;
  }

  return trimmed;
}

function readNumericId(value: unknown, maxLength: number) {
  const identifier = readTrimmedString(value, maxLength);

  return identifier && NUMERIC_ID_PATTERN.test(identifier)
    ? identifier
    : undefined;
}

function readMessageId(value: unknown) {
  const identifier = readTrimmedString(value, 512);

  return identifier && MESSAGE_ID_PATTERN.test(identifier)
    ? identifier
    : undefined;
}

function readDiagnosticString(value: unknown) {
  return readTrimmedString(value, 200);
}

function readDiagnosticNumber(value: unknown) {
  return typeof value === "number" && Number.isSafeInteger(value)
    ? value
    : undefined;
}

function readMetaErrorDiagnostics(body: unknown) {
  const error = isRecord(body) && isRecord(body.error) ? body.error : undefined;

  return {
    metaErrorCode: readDiagnosticNumber(error?.code),
    metaErrorSubcode: readDiagnosticNumber(error?.error_subcode),
    metaErrorType: readDiagnosticString(error?.type),
    metaTraceId: readDiagnosticString(error?.fbtrace_id),
  };
}

export function extractIncomingTextMessages(
  payload: Record<string, unknown>
): ExtractedMessageBatch {
  const textMessages: IncomingTextMessage[] = [];
  const seenMessageIds = new Set<string>();
  let ignoredMessageCount = 0;

  if (
    payload.object !== "whatsapp_business_account" ||
    !Array.isArray(payload.entry)
  ) {
    return { textMessages, ignoredMessageCount };
  }

  for (const entry of payload.entry) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) {
      continue;
    }

    for (const change of entry.changes) {
      if (
        !isRecord(change) ||
        change.field !== "messages" ||
        !isRecord(change.value) ||
        !Array.isArray(change.value.messages)
      ) {
        continue;
      }

      const metadata = isRecord(change.value.metadata)
        ? change.value.metadata
        : undefined;
      const sourcePhoneNumberId = readNumericId(
        metadata?.phone_number_id,
        64
      );

      for (const rawMessage of change.value.messages) {
        if (textMessages.length >= MAX_MESSAGES_PER_WEBHOOK) {
          ignoredMessageCount += 1;
          continue;
        }

        if (!isRecord(rawMessage) || rawMessage.type !== "text") {
          ignoredMessageCount += 1;
          continue;
        }

        const messageId = readMessageId(rawMessage.id);
        const senderWhatsAppId = readNumericId(rawMessage.from, 20);
        const textPayload = isRecord(rawMessage.text)
          ? rawMessage.text
          : undefined;
        const text = readTrimmedString(textPayload?.body, MAX_TEXT_LENGTH);

        if (
          !messageId ||
          !senderWhatsAppId ||
          !sourcePhoneNumberId ||
          !text
        ) {
          ignoredMessageCount += 1;
          continue;
        }

        if (seenMessageIds.has(messageId)) {
          continue;
        }

        seenMessageIds.add(messageId);
        textMessages.push({
          messageId,
          senderWhatsAppId,
          sourcePhoneNumberId,
          text,
        });
      }
    }
  }

  return { textMessages, ignoredMessageCount };
}

export function readReplyConfiguration(
  environment: Record<string, string | undefined>
): ReplyConfigurationResult {
  if (environment.WHATSAPP_AUTO_REPLY_ENABLED !== "true") {
    return { ok: false, reason: "disabled" };
  }

  const accessToken = readTrimmedString(
    environment.WHATSAPP_ACCESS_TOKEN,
    4_096
  );
  const phoneNumberId = readNumericId(
    environment.WHATSAPP_PHONE_NUMBER_ID,
    64
  );
  const graphApiVersion =
    readTrimmedString(environment.WHATSAPP_GRAPH_API_VERSION, 20) ??
    DEFAULT_GRAPH_API_VERSION;

  if (!accessToken || !phoneNumberId) {
    return { ok: false, reason: "missing_credentials" };
  }

  if (!GRAPH_API_VERSION_PATTERN.test(graphApiVersion)) {
    return { ok: false, reason: "invalid_configuration" };
  }

  return {
    ok: true,
    config: { accessToken, graphApiVersion, phoneNumberId },
  };
}

export class VolatileMessageDedupe {
  private readonly entries = new Map<string, number>();
  private readonly maxEntries: number;
  private readonly ttlMs: number;

  constructor(ttlMs = 15 * 60 * 1_000, maxEntries = 5_000) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
  }

  reserve(key: string, now = Date.now()) {
    this.prune(now);

    const expiresAt = this.entries.get(key);

    if (expiresAt && expiresAt > now) {
      return false;
    }

    if (this.entries.size >= this.maxEntries) {
      const oldestKey = this.entries.keys().next().value;

      if (typeof oldestKey === "string") {
        this.entries.delete(oldestKey);
      }
    }

    this.entries.set(key, now + this.ttlMs);
    return true;
  }

  release(key: string) {
    this.entries.delete(key);
  }

  private prune(now: number) {
    for (const [key, expiresAt] of this.entries) {
      if (expiresAt <= now) {
        this.entries.delete(key);
      }
    }
  }
}

export async function sendWhatsAppTextReply(
  message: IncomingTextMessage,
  configuration: WhatsAppReplyConfiguration,
  options: WhatsAppSendOptions = {}
): Promise<WhatsAppSendResult> {
  if (message.sourcePhoneNumberId !== configuration.phoneNumberId) {
    return { ok: false, reason: "phone_number_id_mismatch" };
  }

  const replyText = readTrimmedString(
    options.replyText ?? TEST_AUTO_REPLY,
    MAX_TEXT_LENGTH
  );

  if (!replyText) {
    return { ok: false, reason: "invalid_reply_text" };
  }

  const endpoint = `https://graph.facebook.com/${configuration.graphApiVersion}/${encodeURIComponent(configuration.phoneNumberId)}/messages`;
  const fetchImpl = options.fetchImpl ?? fetch;

  let response: Response;

  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: message.senderWhatsAppId,
        type: "text",
        context: {
          message_id: message.messageId,
        },
        text: {
          preview_url: false,
          body: replyText,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, reason: "request_failed" };
  }

  if (response.ok) {
    return { ok: true };
  }

  let responseBody: unknown;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = undefined;
  }

  return {
    ok: false,
    reason: "meta_rejected",
    httpStatus: response.status,
    ...readMetaErrorDiagnostics(responseBody),
  };
}
