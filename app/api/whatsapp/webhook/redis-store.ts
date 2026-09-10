import { createHash } from "node:crypto";

import type { IncomingTextMessage } from "./message-handler";

const REDIS_REQUEST_TIMEOUT_MS = 5_000;
const MAX_REDIS_URL_LENGTH = 2_048;
const MAX_REDIS_TOKEN_LENGTH = 4_096;

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

type RedisResponse = {
  result?: unknown;
  error?: unknown;
};

export type WhatsAppStateStore = {
  getJson<T>(key: string): Promise<T | null>;
  setJson(key: string, value: unknown, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
  reserve(key: string, ttlSeconds: number): Promise<boolean>;
};

export type RedisConfigurationResult =
  | { ok: true; store: WhatsAppStateStore }
  | {
      ok: false;
      reason: "missing_credentials" | "invalid_configuration";
    };

function readTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : undefined;
}

function isValidRedisUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

function isRedisResponse(value: unknown): value is RedisResponse {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export class UpstashRestStore implements WhatsAppStateStore {
  private readonly url: string;
  private readonly token: string;
  private readonly fetchImpl: FetchLike;

  constructor(
    url: string,
    token: string,
    fetchImpl: FetchLike = fetch
  ) {
    this.url = url;
    this.token = token;
    this.fetchImpl = fetchImpl;
  }

  private async command(arguments_: readonly (string | number)[]) {
    let response: Response;

    try {
      response = await this.fetchImpl(this.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arguments_),
        signal: AbortSignal.timeout(REDIS_REQUEST_TIMEOUT_MS),
      });
    } catch {
      throw new Error("redis_request_failed");
    }

    let body: unknown;

    try {
      body = await response.json();
    } catch {
      throw new Error("redis_invalid_response");
    }

    if (
      !response.ok ||
      !isRedisResponse(body) ||
      typeof body.error === "string"
    ) {
      throw new Error("redis_command_rejected");
    }

    return body.result;
  }

  async getJson<T>(key: string): Promise<T | null> {
    const result = await this.command(["GET", key]);

    if (result === null || result === undefined) {
      return null;
    }

    if (typeof result !== "string") {
      throw new Error("redis_invalid_value");
    }

    try {
      return JSON.parse(result) as T;
    } catch {
      throw new Error("redis_invalid_value");
    }
  }

  async setJson(key: string, value: unknown, ttlSeconds: number) {
    const result = await this.command([
      "SET",
      key,
      JSON.stringify(value),
      "EX",
      ttlSeconds,
    ]);

    if (result !== "OK") {
      throw new Error("redis_set_failed");
    }
  }

  async delete(key: string) {
    await this.command(["DEL", key]);
  }

  async reserve(key: string, ttlSeconds: number) {
    const result = await this.command([
      "SET",
      key,
      "processing",
      "EX",
      ttlSeconds,
      "NX",
    ]);

    return result === "OK";
  }
}

export function createUpstashRestStore(
  environment: Record<string, string | undefined>,
  fetchImpl?: FetchLike
): RedisConfigurationResult {
  const url = readTrimmedString(
    environment.KV_REST_API_URL,
    MAX_REDIS_URL_LENGTH
  );
  const token = readTrimmedString(
    environment.KV_REST_API_TOKEN,
    MAX_REDIS_TOKEN_LENGTH
  );

  if (!url || !token) {
    return { ok: false, reason: "missing_credentials" };
  }

  if (!isValidRedisUrl(url)) {
    return { ok: false, reason: "invalid_configuration" };
  }

  return { ok: true, store: new UpstashRestStore(url, token, fetchImpl) };
}

function hashKey(namespace: string, ...parts: string[]) {
  return `whatsapp:${namespace}:${createHash("sha256")
    .update(parts.join(":"), "utf8")
    .digest("hex")}`;
}

export function getConversationStateKey(message: IncomingTextMessage) {
  return hashKey(
    "conversation:v1",
    message.sourcePhoneNumberId,
    message.senderWhatsAppId
  );
}

export function getMessageDedupeKey(message: IncomingTextMessage) {
  return hashKey(
    "message:v1",
    message.sourcePhoneNumberId,
    message.messageId
  );
}
