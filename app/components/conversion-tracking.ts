"use client";

import { track } from "@vercel/analytics";

export type ConversionEventName =
  | "form_submission_success"
  | "email_link_click"
  | "whatsapp_link_click"
  | "primary_contact_cta_click"
  | "concept_demo_click"
  | "capability_statement_download"
  | "assistant_open"
  | "assistant_message_sent"
  | "assistant_lead_form_open"
  | "assistant_lead_submission_success"
  | "assistant_whatsapp_handoff";

type EventProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>
    ) => void;
  }
}

export function trackConversionEvent(
  eventName: ConversionEventName,
  properties: EventProperties = {}
) {
  track(eventName, properties);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      event_category: "conversion",
      ...properties,
    });
  }
}
