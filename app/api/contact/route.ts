import { NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = "246767649";
const HUBSPOT_FORM_ID = "6815e370-efd2-4141-8fbd-0fd36072482f";
const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
const MAX_REQUEST_BYTES = 16 * 1024;

const serviceOptions = [
  "Business Growth Website",
  "Lead Response System",
  "Transformation Blueprint",
  "Not sure yet",
] as const;

type ServiceOption = (typeof serviceOptions)[number];

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
  serviceInterest: ServiceOption;
  message: string;
  consent: true;
  pageUri?: string;
  pageName?: string;
};

const hubspotFieldNames = {
  firstName: "firstname",
  lastName: "lastname",
  email: "email",
  companyName: "company",
  phoneNumber: "phone",
  serviceInterest: "service_of_interest",
  message: "how_can_we_help",
} as const;

const hubspotServiceValues: Record<ServiceOption, string> = {
  "Business Growth Website": "Business Growth Website",
  "Lead Response System": "Lead Response System",
  "Transformation Blueprint": "Transformation Blueprint",
  "Not sure yet": "Not sure yet",
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

function isHubSpotMappingComplete() {
  return (
    Object.values(hubspotFieldNames).every(Boolean) &&
    Object.values(hubspotServiceValues).every(Boolean)
  );
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined;
}

function readDiagnosticString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function collectHubSpotFieldNames(value: unknown): string[] {
  const fieldNames = new Set<string>();

  function visit(item: unknown) {
    if (Array.isArray(item)) {
      item.forEach(visit);
      return;
    }

    if (!isRecord(item)) {
      return;
    }

    for (const [key, nestedValue] of Object.entries(item)) {
      if (
        ["field", "fieldName", "name", "propertyName"].includes(key) &&
        typeof nestedValue === "string"
      ) {
        fieldNames.add(nestedValue);
      } else if (["errors", "context"].includes(key)) {
        visit(nestedValue);
      }
    }
  }

  visit(value);

  return [...fieldNames].sort();
}

function collectHubSpotErrorCodes(value: unknown): string[] {
  const codes = new Set<string>();

  function visit(item: unknown) {
    if (Array.isArray(item)) {
      item.forEach(visit);
      return;
    }

    if (!isRecord(item)) {
      return;
    }

    for (const [key, nestedValue] of Object.entries(item)) {
      if (
        ["code", "errorCode", "errorType", "subCategory"].includes(key) &&
        typeof nestedValue === "string"
      ) {
        codes.add(nestedValue);
      } else if (["errors", "context"].includes(key)) {
        visit(nestedValue);
      }
    }
  }

  visit(value);

  return [...codes].sort();
}

async function logHubSpotDiagnostics(response: Response) {
  let body: unknown;

  try {
    body = await response.clone().json();
  } catch {
    body = undefined;
  }

  const responseBody = asRecord(body);
  const diagnostics = {
    event: "hubspot_form_submission_rejected",
    httpStatus: response.status,
    category: readDiagnosticString(responseBody?.category),
    correlationId: readDiagnosticString(responseBody?.correlationId),
    errorCodes: collectHubSpotErrorCodes(body),
    fields: collectHubSpotFieldNames(body),
  };

  console.warn("[contact-route] HubSpot rejected form submission", diagnostics);
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
  const companyName = readString(raw.companyName, "companyName", "Company name", errors, {
    required: true,
    maxLength: 120,
  });
  const phoneNumber = readString(raw.phoneNumber, "phoneNumber", "Phone number", errors, {
    maxLength: 40,
  });
  const serviceInterest = readString(
    raw.serviceInterest,
    "serviceInterest",
    "Service of interest",
    errors,
    {
      required: true,
      maxLength: 80,
    }
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

  if (serviceInterest && !serviceOptions.includes(serviceInterest as ServiceOption)) {
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
      serviceInterest: serviceInterest as ServiceOption,
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

  if (!isHubSpotMappingComplete()) {
    return jsonError(
      "The enquiry form is awaiting verified HubSpot field mapping. Please email chunwai@swiftsensedigital.com or use WhatsApp for now.",
      503
    );
  }

  const hutk = parseHubSpotCookie(request.headers.get("cookie"));
  const hubspotPayload = {
    fields: [
      { name: hubspotFieldNames.firstName, value: data.firstName },
      { name: hubspotFieldNames.lastName, value: data.lastName },
      { name: hubspotFieldNames.email, value: data.email },
      { name: hubspotFieldNames.companyName, value: data.companyName },
      ...(data.phoneNumber
        ? [{ name: hubspotFieldNames.phoneNumber, value: data.phoneNumber }]
        : []),
      {
        name: hubspotFieldNames.serviceInterest,
        value: hubspotServiceValues[data.serviceInterest],
      },
      { name: hubspotFieldNames.message, value: data.message },
    ],
    context: {
      ...(hutk ? { hutk } : {}),
      ...(data.pageUri ? { pageUri: data.pageUri } : {}),
      ...(data.pageName ? { pageName: data.pageName } : {}),
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow Swift Sense Digital to store and process my personal data to respond to my enquiry.",
      },
    },
  };

  const hubspotResponse = await fetch(HUBSPOT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hubspotPayload),
  });

  if (!hubspotResponse.ok) {
    await logHubSpotDiagnostics(hubspotResponse);

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
