"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageResponse } from "./ai-elements/message";
import { trackConversionEvent } from "./conversion-tracking";

const WHATSAPP_NUMBER = "6592371516";
const MAX_INPUT_LENGTH = 800;

const quickPrompts = [
  "Which service fits me?",
  "How does lead response work?",
  "What does it cost?",
  "Talk to CW",
] as const;

const serviceOptions = [
  "Business Growth Website",
  "Lead Response System",
  "Transformation Blueprint",
  "Not sure yet",
] as const;

type ServiceOption = (typeof serviceOptions)[number];
type PanelView = "chat" | "brief" | "success";

type BriefForm = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  serviceInterest: ServiceOption;
  challenge: string;
  timing: string;
  consent: boolean;
  website: string;
};

type ContactErrorMap = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "companyName"
    | "phoneNumber"
    | "serviceInterest"
    | "message"
    | "consent"
    | "website",
    string
  >
>;

const initialBrief: BriefForm = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  phoneNumber: "",
  serviceInterest: "Not sure yet",
  challenge: "",
  timing: "",
  consent: false,
  website: "",
};

const transport = new DefaultChatTransport({
  api: "/api/chat",
});

function Icon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <Icon className={className}>
      <path
        d="M7.5 18.5 4 20l1.15-3.45A8 8 0 1 1 7.5 18.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8 10.5h8M8 13.5h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon className="h-5 w-5">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

function ArrowIcon() {
  return (
    <Icon className="h-4 w-4">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

function SendIcon() {
  return (
    <Icon className="h-4 w-4">
      <path
        d="m4 5 16 7-16 7 3-7-3-7Zm3 7h13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </Icon>
  );
}

function CheckIcon() {
  return (
    <Icon className="h-7 w-7">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

function AssistantAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173a63] text-white shadow-sm">
      <span className="text-[11px] font-bold tracking-wide">SS</span>
    </div>
  );
}

function messageText(message: UIMessage) {
  return message.parts
    .filter(
      (part): part is Extract<(typeof message.parts)[number], { type: "text" }> =>
        part.type === "text"
    )
    .map((part) => part.text)
    .join("\n");
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1 text-xs font-medium text-red-700" role="alert">
      {message}
    </p>
  );
}

function inputClass(hasError = false) {
  return `mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
  }`;
}

export default function LeadResponseAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<PanelView>("chat");
  const [input, setInput] = useState("");
  const [brief, setBrief] = useState<BriefForm>(initialBrief);
  const [contactErrors, setContactErrors] = useState<ContactErrorMap>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    setMessages,
  } = useChat({
    transport,
  });

  const isResponding = status === "submitted" || status === "streaming";

  const whatsappMessage =
    view === "success"
      ? `Hi CW, I just submitted a website brief for ${brief.companyName || "my business"}. I would like to continue the conversation.`
      : "Hi CW, I’m visiting the Swift Sense Digital website and would like to discuss my business needs.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && view === "chat") {
      inputRef.current?.focus();
    }
  }, [isOpen, view]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, isResponding]);

  function openAssistant() {
    setIsOpen(true);
    trackConversionEvent("assistant_open", { source: "floating_launcher" });
  }

  function openBriefForm(source: string) {
    setView("brief");
    setContactErrors({});
    setSubmitError("");
    trackConversionEvent("assistant_lead_form_open", { source });
  }

  async function send(text: string, source: "typed" | "quick_prompt") {
    const trimmed = text.trim();

    if (!trimmed || isResponding) {
      return;
    }

    if (error) {
      clearError();
    }

    trackConversionEvent("assistant_message_sent", {
      source,
      message_count: messages.length + 1,
    });
    await sendMessage({ text: trimmed });
    setInput("");
  }

  function submitChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input, "typed");
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input, "typed");
    }
  }

  function updateBrief<K extends keyof BriefForm>(
    field: K,
    value: BriefForm[K]
  ) {
    setBrief((current) => ({ ...current, [field]: value }));
    setContactErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setContactErrors({});
    setIsSubmitting(true);

    const message = [
      "Submitted through the Swift Sense website lead response assistant.",
      `Business priority: ${brief.challenge.trim()}`,
      `Preferred timing: ${brief.timing}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: brief.firstName,
          lastName: brief.lastName,
          email: brief.email,
          companyName: brief.companyName,
          phoneNumber: brief.phoneNumber,
          serviceInterest: brief.serviceInterest,
          message,
          consent: brief.consent,
          website: brief.website,
          pageUri: window.location.href,
          pageName: document.title,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: ContactErrorMap;
      };

      if (!response.ok || !result.ok) {
        setContactErrors(result.errors ?? {});
        setSubmitError(
          result.message ??
            "The brief could not be submitted. Please try WhatsApp or email."
        );
        return;
      }

      setView("success");
      trackConversionEvent("assistant_lead_submission_success", {
        service: brief.serviceInterest,
      });
    } catch {
      setSubmitError(
        "The brief could not be submitted. Please try WhatsApp or email."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAgain() {
    setMessages([]);
    setInput("");
    setBrief(initialBrief);
    setView("chat");
    setSubmitError("");
    setContactErrors({});
  }

  return (
    <>
      {isOpen ? (
        <div
          aria-label="Swift Sense lead response assistant"
          aria-modal="false"
          className="fixed inset-x-3 bottom-3 z-[80] flex h-[min(690px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px]"
          id="swift-sense-assistant"
          role="dialog"
        >
          <header className="flex items-center gap-3 bg-[#102f52] px-4 py-3.5 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <ChatIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Swift Sense Assistant</p>
              <p className="mt-0.5 text-xs text-blue-100">
                AI-assisted lead response
              </p>
            </div>
            <button
              aria-label="Close assistant"
              className="rounded-full p-2 text-blue-100 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <CloseIcon />
            </button>
          </header>

          {view === "chat" ? (
            <>
              <div
                aria-live="polite"
                className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-4"
              >
                <div className="flex items-start gap-2.5">
                  <AssistantAvatar />
                  <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                    Hi, I’m the live example of Swift Sense Digital’s lead
                    response solution. I can explain our services, help you find
                    the right starting point, or pass a brief to CW.
                  </div>
                </div>

                {messages.length === 0 ? (
                  <div className="grid grid-cols-2 gap-2 pl-10">
                    {quickPrompts.map((prompt) => (
                      <button
                        className="rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-left text-xs font-semibold leading-4 text-[#173a63] transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        key={prompt}
                        onClick={() => void send(prompt, "quick_prompt")}
                        type="button"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                ) : null}

                {messages.map((message) => {
                  const text = messageText(message);

                  if (!text) {
                    return null;
                  }

                  return message.role === "user" ? (
                    <div className="flex justify-end" key={message.id}>
                      <div className="max-w-[84%] rounded-2xl rounded-tr-md bg-[#173a63] px-3.5 py-2.5 text-sm leading-6 text-white">
                        {text}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5" key={message.id}>
                      <AssistantAvatar />
                      <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-3.5 py-2.5 text-slate-700 shadow-sm">
                        <MessageResponse
                          mode={
                            message.id === messages.at(-1)?.id && isResponding
                              ? "streaming"
                              : "static"
                          }
                        >
                          {text}
                        </MessageResponse>
                      </div>
                    </div>
                  );
                })}

                {isResponding ? (
                  <div className="flex items-start gap-2.5">
                    <AssistantAvatar />
                    <div
                      aria-label="Assistant is responding"
                      className="flex gap-1 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3.5 shadow-sm"
                    >
                      {[0, 1, 2].map((dot) => (
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500"
                          key={dot}
                          style={{ animationDelay: `${dot * 120}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-5 text-amber-900">
                    <p className="font-semibold">
                      The assistant is temporarily unavailable.
                    </p>
                    <p className="mt-1">
                      You can still share your brief or continue with CW on
                      WhatsApp.
                    </p>
                  </div>
                ) : null}
                <div ref={messageEndRef} />
              </div>

              <div className="border-t border-slate-200 bg-white px-3.5 py-3">
                <div className="mb-2 flex gap-2">
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#173a63] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#0f2d4e] focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => openBriefForm("chat_footer")}
                    type="button"
                  >
                    Share my brief
                    <ArrowIcon />
                  </button>
                  <a
                    aria-label="Talk to CW on WhatsApp"
                    className="flex items-center justify-center rounded-xl border border-emerald-300 px-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    href={whatsappUrl}
                    onClick={() =>
                      trackConversionEvent("assistant_whatsapp_handoff", {
                        source: "chat_footer",
                      })
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </div>
                <form className="flex items-center gap-2" onSubmit={submitChat}>
                  <label className="sr-only" htmlFor="assistant-message">
                    Ask about Swift Sense Digital
                  </label>
                  <input
                    autoComplete="off"
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                    disabled={isResponding}
                    id="assistant-message"
                    maxLength={MAX_INPUT_LENGTH}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleComposerKeyDown}
                    placeholder="Ask a question…"
                    ref={inputRef}
                    value={input}
                  />
                  <button
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f28c28] text-white transition hover:bg-[#dc7615] focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:cursor-not-allowed disabled:bg-slate-300"
                    disabled={!input.trim() || isResponding}
                    type="submit"
                  >
                    <SendIcon />
                  </button>
                </form>
                <p className="mt-2 text-center text-[10px] leading-4 text-slate-500">
                  AI-assisted. Don’t share sensitive or confidential
                  information.
                </p>
              </div>
            </>
          ) : null}

          {view === "brief" ? (
            <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4">
              <button
                className="mb-3 text-xs font-bold text-blue-700 hover:text-blue-900"
                onClick={() => setView("chat")}
                type="button"
              >
                ← Back to conversation
              </button>
              <div className="mb-4">
                <p className="text-lg font-bold text-slate-950">
                  Share a short business brief
                </p>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  This creates an enquiry for CW to review. The AI conversation
                  is not submitted.
                </p>
              </div>

              <form className="space-y-3.5" onSubmit={submitBrief}>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs font-semibold text-slate-700">
                    First name
                    <input
                      autoComplete="given-name"
                      className={inputClass(Boolean(contactErrors.firstName))}
                      maxLength={80}
                      onChange={(event) =>
                        updateBrief("firstName", event.target.value)
                      }
                      required
                      value={brief.firstName}
                    />
                    <FieldError message={contactErrors.firstName} />
                  </label>
                  <label className="text-xs font-semibold text-slate-700">
                    Last name
                    <input
                      autoComplete="family-name"
                      className={inputClass(Boolean(contactErrors.lastName))}
                      maxLength={80}
                      onChange={(event) =>
                        updateBrief("lastName", event.target.value)
                      }
                      required
                      value={brief.lastName}
                    />
                    <FieldError message={contactErrors.lastName} />
                  </label>
                </div>

                <label className="block text-xs font-semibold text-slate-700">
                  Work email
                  <input
                    autoComplete="email"
                    className={inputClass(Boolean(contactErrors.email))}
                    maxLength={254}
                    onChange={(event) => updateBrief("email", event.target.value)}
                    required
                    type="email"
                    value={brief.email}
                  />
                  <FieldError message={contactErrors.email} />
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Company
                  <input
                    autoComplete="organization"
                    className={inputClass(Boolean(contactErrors.companyName))}
                    maxLength={120}
                    onChange={(event) =>
                      updateBrief("companyName", event.target.value)
                    }
                    required
                    value={brief.companyName}
                  />
                  <FieldError message={contactErrors.companyName} />
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Phone <span className="font-normal text-slate-500">(optional)</span>
                  <input
                    autoComplete="tel"
                    className={inputClass(Boolean(contactErrors.phoneNumber))}
                    maxLength={40}
                    onChange={(event) =>
                      updateBrief("phoneNumber", event.target.value)
                    }
                    type="tel"
                    value={brief.phoneNumber}
                  />
                  <FieldError message={contactErrors.phoneNumber} />
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Likely starting point
                  <select
                    className={inputClass(
                      Boolean(contactErrors.serviceInterest)
                    )}
                    onChange={(event) =>
                      updateBrief(
                        "serviceInterest",
                        event.target.value as ServiceOption
                      )
                    }
                    value={brief.serviceInterest}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError message={contactErrors.serviceInterest} />
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  What are you trying to improve?
                  <textarea
                    className={`${inputClass(Boolean(contactErrors.message))} min-h-24 resize-y`}
                    maxLength={1500}
                    onChange={(event) =>
                      updateBrief("challenge", event.target.value)
                    }
                    placeholder="For example: enquiries come in after hours and follow-up is inconsistent."
                    required
                    value={brief.challenge}
                  />
                  <FieldError message={contactErrors.message} />
                </label>

                <label className="block text-xs font-semibold text-slate-700">
                  Preferred timing
                  <select
                    className={inputClass()}
                    onChange={(event) =>
                      updateBrief("timing", event.target.value)
                    }
                    required
                    value={brief.timing}
                  >
                    <option disabled value="">
                      Select one
                    </option>
                    <option value="As soon as practical">
                      As soon as practical
                    </option>
                    <option value="Within 1–2 months">Within 1–2 months</option>
                    <option value="Within 3–6 months">Within 3–6 months</option>
                    <option value="Exploring for now">Exploring for now</option>
                  </select>
                </label>

                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Website
                    <input
                      autoComplete="off"
                      onChange={(event) =>
                        updateBrief("website", event.target.value)
                      }
                      tabIndex={-1}
                      value={brief.website}
                    />
                  </label>
                </div>

                <label className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600">
                  <input
                    checked={brief.consent}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                    onChange={(event) =>
                      updateBrief("consent", event.target.checked)
                    }
                    required
                    type="checkbox"
                  />
                  <span>
                    I agree to allow Swift Sense Digital to store and process my
                    personal data to respond to my enquiry, as described in the{" "}
                    <a
                      className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                      href="/privacy"
                    >
                      Privacy Policy
                    </a>
                    .
                    <FieldError message={contactErrors.consent} />
                  </span>
                </label>

                {submitError ? (
                  <p
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium leading-5 text-red-800"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173a63] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f2d4e] focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting…" : "Submit my brief"}
                  {!isSubmitting ? <ArrowIcon /> : null}
                </button>
              </form>
            </div>
          ) : null}

          {view === "success" ? (
            <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-950">
                Your brief is with CW
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                Thank you, {brief.firstName}. Swift Sense Digital will respond
                within two business days.
              </p>
              <a
                className="mt-5 flex w-full max-w-xs items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                href={whatsappUrl}
                onClick={() =>
                  trackConversionEvent("assistant_whatsapp_handoff", {
                    source: "submission_success",
                  })
                }
                rel="noreferrer"
                target="_blank"
              >
                Continue on WhatsApp
              </a>
              <button
                className="mt-3 text-xs font-bold text-blue-700 hover:text-blue-900"
                onClick={startAgain}
                type="button"
              >
                Start a new conversation
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <button
          aria-controls="swift-sense-assistant"
          aria-expanded="false"
          aria-label="Open Swift Sense lead response assistant"
          className="fixed bottom-5 right-4 z-[80] flex items-center gap-2.5 rounded-full bg-[#173a63] px-4 py-3 text-white shadow-[0_12px_36px_rgba(23,58,99,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0f2d4e] focus:outline-none focus:ring-4 focus:ring-blue-200 sm:right-5"
          onClick={openAssistant}
          type="button"
        >
          <ChatIcon className="h-5 w-5" />
          <span className="text-sm font-bold">Ask Swift Sense</span>
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
        </button>
      )}
    </>
  );
}
