const HUBSPOT_PORTAL_ID = "246767649";
const HUBSPOT_FORM_ID = "6815e370-efd2-4141-8fbd-0fd36072482f";
const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

export const hubspotServiceOptions = [
  "Business Growth Website",
  "Lead Response System",
  "Transformation Blueprint",
  "Not sure yet",
] as const;

export type HubSpotServiceOption = (typeof hubspotServiceOptions)[number];

export type HubSpotLeadInput = {
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
  hutk?: string;
};

export type HubSpotFailureDiagnostics = {
  httpStatus?: number;
  category?: string;
  correlationId?: string;
  errorCodes?: string[];
  fields?: string[];
};

export type HubSpotSubmissionResult =
  | { ok: true }
  | {
      ok: false;
      reason: "request_failed" | "rejected";
      diagnostics?: HubSpotFailureDiagnostics;
    };

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

type SubmitOptions = {
  fetchImpl?: FetchLike;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readDiagnosticString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function collectDiagnosticValues(
  value: unknown,
  keys: ReadonlySet<string>
) {
  const values = new Set<string>();

  function visit(item: unknown) {
    if (Array.isArray(item)) {
      item.forEach(visit);
      return;
    }

    if (!isRecord(item)) {
      return;
    }

    for (const [key, nestedValue] of Object.entries(item)) {
      if (keys.has(key) && typeof nestedValue === "string") {
        values.add(nestedValue);
      } else if (["errors", "context"].includes(key)) {
        visit(nestedValue);
      }
    }
  }

  visit(value);
  return [...values].sort();
}

async function readFailureDiagnostics(response: Response) {
  let body: unknown;

  try {
    body = await response.clone().json();
  } catch {
    body = undefined;
  }

  const responseBody = isRecord(body) ? body : undefined;

  return {
    httpStatus: response.status,
    category: readDiagnosticString(responseBody?.category),
    correlationId: readDiagnosticString(responseBody?.correlationId),
    errorCodes: collectDiagnosticValues(
      body,
      new Set(["code", "errorCode", "errorType", "subCategory"])
    ),
    fields: collectDiagnosticValues(
      body,
      new Set(["field", "fieldName", "name", "propertyName"])
    ),
  } satisfies HubSpotFailureDiagnostics;
}

export function buildHubSpotLeadPayload(input: HubSpotLeadInput) {
  return {
    fields: [
      { name: hubspotFieldNames.firstName, value: input.firstName },
      { name: hubspotFieldNames.lastName, value: input.lastName },
      { name: hubspotFieldNames.email, value: input.email },
      { name: hubspotFieldNames.companyName, value: input.companyName },
      ...(input.phoneNumber
        ? [{ name: hubspotFieldNames.phoneNumber, value: input.phoneNumber }]
        : []),
      {
        name: hubspotFieldNames.serviceInterest,
        value: input.serviceInterest,
      },
      { name: hubspotFieldNames.message, value: input.message },
    ],
    context: {
      ...(input.hutk ? { hutk: input.hutk } : {}),
      ...(input.pageUri ? { pageUri: input.pageUri } : {}),
      ...(input.pageName ? { pageName: input.pageName } : {}),
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow Swift Sense Digital to store and process my personal data to respond to my enquiry.",
      },
    },
  };
}

export async function submitHubSpotLead(
  input: HubSpotLeadInput,
  options: SubmitOptions = {}
): Promise<HubSpotSubmissionResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  let response: Response;

  try {
    response = await fetchImpl(HUBSPOT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildHubSpotLeadPayload(input)),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, reason: "request_failed" };
  }

  if (response.ok) {
    return { ok: true };
  }

  return {
    ok: false,
    reason: "rejected",
    diagnostics: await readFailureDiagnostics(response),
  };
}
