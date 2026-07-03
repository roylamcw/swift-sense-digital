"use client";

import { useState, type FormEvent } from "react";

const serviceOptions = [
  "AI Website Launch",
  "AI Lead Response System",
  "AI Transformation Starter",
  "Not sure yet — need advice",
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Thank you — we&apos;ll be in touch within 24 hours</h3>
        <p className="mt-2 text-sm text-white/60">
          Lam will personally review your enquiry and reach out to schedule your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/80">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-white/80">
            Company *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Your business name"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/80">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+65 9123 4567"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-white/80">
          What are you interested in? *
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        >
          <option value="" disabled className="text-white/30">
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option} className="bg-[#0a1628]">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/80">
          Tell us about your goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What challenges are you facing? What would success look like?"
          className="w-full resize-none rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold transition-colors hover:bg-blue-500"
      >
        Book my free consultation
      </button>
      <p className="text-center text-xs text-white/40">
        No spam, no pressure. Just a 30-minute call to explore what&apos;s possible.
      </p>
    </form>
  );
}
