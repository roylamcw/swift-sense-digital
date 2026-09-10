import { NextResponse } from "next/server";

import {
  hubspotServiceOptions,
  submitHubSpotLead,
  type HubSpotServiceOption,
} from "../../lib/hubspot-lead";

const MAX_REQUEST_BYTES = 16 * 1024;

type ContactField =
  | "firstName"
  | "lastName"
  | "email"
  | "companyName"
  | "phoneNumber"
  | "serviceInterest"
  | "message"
  | "consent"
  | "website";

type ErrorMap = Partial<Record<ContactField, string>>;

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  serviceInterest: HubSpotServiceOption;
  message: string;
  consent: true;
  pageUri?: string;
  pageName?: string;
};

function jsonError(message: string, status: number, errors?: ErrorMap) {
  return NextResponse.json({ ok: false, message, errors }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  value: unknown,
  field: ContactField,
  label: string,
  errors: ErrorMap,
  options: { required?: boolean; maxLength: number } = { maxLength: 500 }
) {
  if (typeof value !== "string") {
    if (options.required) {
      errors[field] = `${label} is required.`;
    }
    return "";
  }

  const trimmed = value.trim();

  if (options.required && trimmed.length === 0) {
    errors[field] = `${label} is required.`;
  } else if (trimmed.length > options.maxLength) {
    errors[field] = `${label} is too long.`;
  }

  return trimmed;
}

function parseHubSpotCookie(cookieHeader: string | null) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const hubspotCookie = cookies.find((cookie) => cookie.startsWith("hubspotutk="));

  if (!hubspotCookie) {
    return undefined;
  }

  return decodeURIComponent(hubspotCookie.slice("hubspotutk=".length));
}

function validatePayload(raw: unknown): { data?: ContactPayload; errors: ErrorMap } {
  const errors: ErrorMap = {};

  if (!isRecord(raw)) {
    return {
      errors: {
        message: "The enquiry could not be read. Please try again.",
      },
    };
  }

  const firstName = readString(raw.firstName, "firstName", "First name", errors, {
    required: true,
    maxLength: 80,
  });
  const lastName = readString(raw.lastName, "lastName", "Last name", errors, {
    required: true,
    maxLength: 80,
  });
  const email = readString(raw.email, "email", "Email", errors, {
    required: true,
    maxLength: 254,
  });
  const companyName = readString(
    raw.companyName,
    "companyName",
    "Company name",
    errors,
    { required: true, maxLength: 120 }
  );
  const phoneNumber = readString(
    raw.phoneNumber,
    "phoneNumber",
    "Phone number",
    errors,
    { maxLength: 40 }
  );
  const serviceInterest = readString(
    raw.serviceInterest,
    "serviceInterest",
    "Service of interest",
    errors,
    { required: true, maxLength: 80 }
  );
  const message = readString(raw.message, "message", "How can we help", errors, {
    required: true,
    maxLength: 2000,
  });
  const website = readString(raw.website, "website", "Website", errors, {
    maxLength: 120,
  });

  if (website) {
    errors.website = "The enquiry could not be submitted.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (
    serviceInterest &&
    !hubspotServiceOptions.includes(serviceInterest as HubSpotServiceOption)
  ) {
    errors.serviceInterest = "Choose a valid service of interest.";
  }

  if (raw.consent !== true) {
    errors.consent = "Consent is required before submitting the enquiry.";
  }

  const pageUri = readString(raw.pageUri, "message", "Page URL", errors, {
    maxLength: 1000,
  });
  const pageName = readString(raw.pageName, "message", "Page name", errors, {
    maxLength: 250,
  });

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      companyName,
      ...(phoneNumber ? { phoneNumber } : {}),
      serviceInterest: serviceInterest as HubSpotServiceOption,
      message,
      consent: true,
      pageUri,
      pageName,
    },
    errors,
  };
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return jsonError("Submit the enquiry as JSON.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonError("The enquiry is too large. Please shorten your message.", 413);
  }

  let requestBody = "";

  try {
    requestBody = await request.text();
  } catch {
    return jsonError("The enquiry could not be read. Please try again.", 400);
  }

  if (requestBody.length > MAX_REQUEST_BYTES) {
    return jsonError("The enquiry is too large. Please shorten your message.", 413);
  }

  let rawPayload: unknown;

  try {
    rawPayload = JSON.parse(requestBody);
  } catch {
    return jsonError("The enquiry data is malformed. Please try again.", 400);
  }

  const { data, errors } = validatePayload(rawPayload);

  if (!data) {
    return jsonError("Please correct the highlighted fields.", 400, errors);
  }

  const submission = await submitHubSpotLead({
    ...data,
    hutk: parseHubSpotCookie(request.headers.get("cookie")),
  });

  if (!submission.ok) {
    console.warn("[contact-route] HubSpot form submission failed", {
      reason: submission.reason,
      ...submission.diagnostics,
    });

    return jsonError(
      "The enquiry could not be submitted. Please email chunwai@swiftsensedigital.com or use WhatsApp.",
      502
    );
  }

  return NextResponse.json({
    ok: true,
    message: "We’ll respond within two business days.",
  });
}

