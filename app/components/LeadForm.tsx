"use client";

import { useState, type FormEvent } from "react";
import { trackConversionEvent } from "./conversion-tracking";

const serviceOptions = [
  "Business Growth Website",
  "Lead Response System",
  "Transformation Blueprint",
  "Not sure yet",
] as const;

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "companyName"
  | "phoneNumber"
  | "serviceInterest"
  | "message"
  | "consent"
  | "website";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
};

const baseInputClass =
  "w-full rounded-lg border border-white/20 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30";

const errorInputClass = "border-red-400/70 focus:border-red-300 focus:ring-red-500/30";

function getString(formData: FormData, field: FieldName) {
  const value = formData.get(field);
  return typeof value === "string" ? value : "";
}

function fieldErrorId(field: FieldName) {
  return `${field}-error`;
}

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setStatusMessage("Submitting your enquiry...");
    setFieldErrors({});

    const payload = {
      firstName: getString(formData, "firstName"),
      lastName: getString(formData, "lastName"),
      email: getString(formData, "email"),
      companyName: getString(formData, "companyName"),
      phoneNumber: getString(formData, "phoneNumber"),
      serviceInterest: getString(formData, "serviceInterest"),
      message: getString(formData, "message"),
      consent: formData.get("consent") === "on",
      website: getString(formData, "website"),
      pageUri: window.location.href,
      pageName: document.title,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setStatusMessage(
          result.message ?? "The enquiry could not be submitted. Please try again."
        );
        setFieldErrors(result.errors ?? {});
        return;
      }

      trackConversionEvent("form_submission_success", {
        form: "SSD Website Enquiry",
      });
      setStatus("success");
      setStatusMessage("We’ll respond within two business days.");
      form.reset();
    } catch {
      setStatus("error");
      setStatusMessage(
        "The enquiry could not be submitted. Please email chunwai@swiftsensedigital.com or use WhatsApp."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-blue-400/40 bg-blue-500/10 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Thank you — your enquiry has been received.</h3>
        <p className="mt-2 text-sm text-white/75">{statusMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-white/85">
            First name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(fieldErrors.firstName)}
            aria-describedby={fieldErrors.firstName ? fieldErrorId("firstName") : undefined}
            className={`${baseInputClass} ${fieldErrors.firstName ? errorInputClass : ""}`}
          />
          {fieldErrors.firstName && (
            <p id={fieldErrorId("firstName")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-white/85">
            Last name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(fieldErrors.lastName)}
            aria-describedby={fieldErrors.lastName ? fieldErrorId("lastName") : undefined}
            className={`${baseInputClass} ${fieldErrors.lastName ? errorInputClass : ""}`}
          />
          {fieldErrors.lastName && (
            <p id={fieldErrorId("lastName")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/85">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? fieldErrorId("email") : undefined}
            className={`${baseInputClass} ${fieldErrors.email ? errorInputClass : ""}`}
          />
          {fieldErrors.email && (
            <p id={fieldErrorId("email")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-white/85">
            Company name *
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(fieldErrors.companyName)}
            aria-describedby={fieldErrors.companyName ? fieldErrorId("companyName") : undefined}
            className={`${baseInputClass} ${fieldErrors.companyName ? errorInputClass : ""}`}
          />
          {fieldErrors.companyName && (
            <p id={fieldErrorId("companyName")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.companyName}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-white/85">
            Phone number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            placeholder="+65 9237 1516"
            aria-invalid={Boolean(fieldErrors.phoneNumber)}
            aria-describedby={fieldErrors.phoneNumber ? fieldErrorId("phoneNumber") : undefined}
            className={`${baseInputClass} ${fieldErrors.phoneNumber ? errorInputClass : ""}`}
          />
          {fieldErrors.phoneNumber && (
            <p id={fieldErrorId("phoneNumber")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="serviceInterest" className="mb-1.5 block text-sm font-medium text-white/85">
            Service of interest *
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            required
            defaultValue=""
            aria-invalid={Boolean(fieldErrors.serviceInterest)}
            aria-describedby={fieldErrors.serviceInterest ? fieldErrorId("serviceInterest") : undefined}
            className={`${baseInputClass} ${fieldErrors.serviceInterest ? errorInputClass : ""}`}
          >
            <option value="" disabled className="bg-[#0a1628]">
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="bg-[#0a1628]">
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.serviceInterest && (
            <p id={fieldErrorId("serviceInterest")} className="mt-1.5 text-sm text-red-200">
              {fieldErrors.serviceInterest}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/85">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you want to improve, what is slowing the team down, or what you want the website or lead system to achieve."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? fieldErrorId("message") : undefined}
          className={`${baseInputClass} resize-none ${fieldErrors.message ? errorInputClass : ""}`}
        />
        {fieldErrors.message && (
          <p id={fieldErrorId("message")} className="mt-1.5 text-sm text-red-200">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 rounded-lg border border-white/15 bg-white/[0.04] p-4 text-sm text-white/80">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(fieldErrors.consent)}
            aria-describedby={fieldErrors.consent ? fieldErrorId("consent") : "consent-help"}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-[#0a1628] text-blue-600 focus:ring-blue-500"
          />
          <span>
            I agree to allow Swift Sense Digital to store and process my personal data to respond to my enquiry.
          </span>
        </label>
        <p id="consent-help" className="mt-2 text-xs text-white/65">
          We only use submitted details to respond to the enquiry.
        </p>
        {fieldErrors.consent && (
          <p id={fieldErrorId("consent")} className="mt-1.5 text-sm text-red-200">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      <div aria-live="polite" role={status === "error" ? "alert" : "status"}>
        {statusMessage && (
          <p className={`text-sm ${status === "error" ? "text-red-200" : "text-white/75"}`}>
            {statusMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-white/60"
      >
        {status === "submitting" ? "Submitting..." : "Send enquiry"}
      </button>
    </form>
  );
}
