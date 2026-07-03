"use client";

import { useState, type FormEvent } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Founder", href: "#founder" },
  { label: "Why Us", href: "#why-us" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_EMAIL = "hello@swiftsensedigital.com";
const CONTACT_WHATSAPP = "https://wa.me/6592371516";
const CONTACT_LINKEDIN = "#";

const problems = [
  {
    title: "Slow response times lose leads",
    description:
      "Prospects expect instant answers. When your team can't reply fast enough, they move on to competitors who can.",
  },
  {
    title: "Manual workflows drain resources",
    description:
      "Repetitive tasks eat up hours every week — time your team should spend on growth, not admin.",
  },
  {
    title: "Outdated websites fail to convert",
    description:
      "A static site that doesn't capture intent or guide visitors leaves revenue on the table.",
  },
];

const services = [
  {
    title: "AI-Enabled Websites",
    description:
      "Launch a fast, modern website built to convert — with smart forms, lead capture, and AI-ready architecture from day one.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.618 2.44m0 0a8.959 8.959 0 0 1-.284-2.253" />
      </svg>
    ),
  },
  {
    title: "AI-Assisted Chatbots",
    description:
      "Deploy intelligent chat that answers FAQs, qualifies leads, and hands off to your team — 24/7, without extra headcount.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description:
      "Connect your tools and automate repetitive processes — from lead routing to follow-ups — so nothing falls through the cracks.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.431l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.431l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    title: "AI Transformation Consulting",
    description:
      "Get a practical roadmap for adopting AI across sales, operations, and customer service — scoped for SME budgets and timelines.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
];

const whySwiftSense = [
  {
    title: "Business-first approach",
    description:
      "Every recommendation starts with your revenue, operations, and customer experience — not the latest AI trend.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Real operational experience",
    description:
      "Led by a former General Manager who has run sales, growth, and transformation projects — not just built websites.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15m-16.5 18v-9a2.25 2.25 0 0 1 2.25-2.25h12A2.25 2.25 0 0 1 21 12v9M12 7.5V3m0 0 3.75 3.75M12 3 8.25 6.75M12 3l3.75 3.75" />
      </svg>
    ),
  },
  {
    title: "SME-focused solutions",
    description:
      "Purpose-built for owners, MDs, and GMs who need results without enterprise complexity or price tags.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008H17.25v-.008Zm0 3h.008v.008H17.25v-.008Zm0 3h.008v.008H17.25v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Fast deployment",
    description:
      "Most projects go live in 2–5 weeks. We move quickly because SMEs can't afford months of agency delays.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "End-to-end implementation",
    description:
      "From strategy and build to launch, training, and support — one partner, no hand-offs between vendors.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const socialProof = [
  {
    title: "Practical implementation",
    description:
      "We deploy working systems your team can use from day one — not slide decks or proof-of-concept demos.",
  },
  {
    title: "Fast turnaround",
    description:
      "Typical website and chatbot projects launch in 2–5 weeks, so you start seeing results quickly.",
  },
  {
    title: "Affordable SME solutions",
    description:
      "Transparent pricing designed for growing businesses — enterprise capability without enterprise cost.",
  },
  {
    title: "Ongoing support",
    description:
      "Optional monthly retainers are available for website updates, chatbot optimisation, workflow improvements and performance reviews.",
  },
];

const pricingTiers = [
  {
    name: "AI Website Launch",
    price: "S$1,500",
    description: "Get online fast with a professional, AI-ready website that captures leads from day one.",
    features: [
      "Custom responsive design",
      "Lead capture forms & CTAs",
      "SEO-ready structure",
      "Mobile-optimised performance",
      "2 rounds of revisions",
    ],
    highlighted: false,
  },
  {
    name: "AI Lead Response System",
    price: "S$3,500",
    description: "Website plus AI chatbot to respond instantly, qualify leads, and route enquiries automatically.",
    features: [
      "Everything in Website Launch",
      "AI-assisted chatbot setup",
      "FAQ & lead qualification flows",
      "CRM / email integration",
      "30-day post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "AI Transformation Starter",
    price: "S$8,000",
    description: "Full-stack AI enablement — website, chatbot, and workflow automation tailored to your business.",
    features: [
      "Everything in Lead Response",
      "Custom workflow automation",
      "Multi-tool integrations",
      "Team onboarding & training",
      "90-day optimisation support",
    ],
    highlighted: false,
  },
];

const portfolioProjects = [
  {
    name: "Workforce & Staffing",
    industry: "Staffing",
    description:
      "AI-enabled website and enquiry system for staffing agencies that need to capture job requests, qualify enquiries and route them to operations quickly.",
    highlights: [
      "24/7 enquiry capture",
      "Automated staff request handling",
      "Lead routing to operations team",
    ],
    tags: ["AI Website", "AI Chatbot", "Enquiry Capture"],
    gradient: "from-blue-600/20 to-indigo-600/10",
  },
  {
    name: "Financial Advisory",
    industry: "Financial Services",
    description:
      "Lead qualification system for advisory firms that helps pre-screen prospects, understand customer needs and prepare advisors for higher-quality conversations.",
    highlights: [
      "Smart lead qualification flows",
      "Needs-based client assessment",
      "Priority routing for advisors",
    ],
    tags: ["AI Website", "Lead Qualification Chatbot"],
    gradient: "from-emerald-600/20 to-teal-600/10",
  },
  {
    name: "Restaurant Operations",
    industry: "F&B · Hospitality",
    description:
      "Customer response and reservation system for restaurants that answers common questions, supports booking enquiries and reduces repetitive front-of-house admin.",
    highlights: [
      "Instant reservation handling",
      "Menu & dietary FAQ automation",
      "Reduced phone and walk-in admin",
    ],
    tags: ["AI Website", "Reservations", "FAQ Chatbot"],
    gradient: "from-violet-600/20 to-purple-600/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery call",
    description: "We learn about your business, goals, and bottlenecks to recommend the right solution.",
  },
  {
    number: "02",
    title: "Build & configure",
    description: "We design, develop, and integrate your website, chatbot, or automation workflows.",
  },
  {
    number: "03",
    title: "Launch & optimise",
    description: "Go live with confidence. We monitor, refine, and support you post-launch.",
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "An AI Website Launch usually takes 2–3 weeks. Lead Response Systems take 3–5 weeks, and full AI Transformation projects typically run 6–8 weeks depending on scope.",
  },
  {
    question: "Do I need technical knowledge to manage the systems?",
    answer:
      "No. We build everything to be easy to manage and provide onboarding so your team can handle day-to-day updates without a developer.",
  },
  {
    question: "Can I start with one service and expand later?",
    answer:
      "Absolutely. Many clients start with a website launch and add chatbot or automation capabilities as their needs grow. Our packages are designed to scale with you.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with SMEs across professional services, retail, F&B, events, agencies, and more. If you need to respond faster and capture more leads, we can help.",
  },
  {
    question: "Is ongoing support available?",
    answer:
      "Yes. All packages include post-launch support. Ongoing optimisation plans are available from S$150/month and can include website updates, chatbot retraining, workflow improvements, reporting and AI adoption support."
  },
];

function ConsultationForm() {
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
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-white/80">
            Company Name *
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
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
            Email *
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
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-white/80">
            Mobile Number *
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            placeholder="+65 9123 4567"
            className="w-full rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="challenge" className="mb-1.5 block text-sm font-medium text-white/80">
          Biggest Business Challenge *
        </label>
        <textarea
          id="challenge"
          name="challenge"
          rows={4}
          required
          placeholder="What's slowing your growth? Slow lead response, manual admin, outdated website..."
          className="w-full resize-none rounded-lg border border-white/10 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold transition-colors hover:bg-blue-500"
      >
        Book My Free Consultation
      </button>
      <p className="text-center text-xs text-white/40">
        No spam, no pressure. Just a 30-minute call to explore what&apos;s possible.
      </p>
    </form>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0a1628] text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1628]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-semibold tracking-tight">
            Swift Sense <span className="text-blue-400">Digital</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-500"
          >
            Book Free Consultation
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              Practical AI Solutions for Growing SMEs
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Helping SMEs Respond Faster, Win More Business and{" "}
              <span className="text-blue-400">Automate Repetitive Work</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Swift Sense Digital helps business owners and managers adopt practical AI — from
              AI-enabled websites and chatbots to workflow automation — so you grow without
              adding headcount.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="w-full rounded-lg bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 sm:w-auto"
              >
                Book Free Consultation
              </a>
              <a
                href="#portfolio"
                className="w-full rounded-lg border border-white/20 px-8 py-3.5 text-center text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
              >
                See How AI Can Help My Business
              </a>
            </div>
            <p className="mt-4 text-sm text-white/50">
              No obligation · Speak directly with the founder · Get a tailored roadmap
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { stat: "24/7", label: "Instant customer response" },
              { stat: "2–5 wks", label: "Typical deployment time" },
              { stat: "SME-first", label: "Built for growing businesses" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-blue-400">{item.stat}</p>
                <p className="mt-1 text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] p-8">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-4xl font-bold text-white">
                  LCW
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold">CW Lam</h3>
                  <p className="mt-1 text-sm text-blue-400">Founder & Lead Consultant</p>
                </div>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {[
                      "12+ years leading business growth, operations and transformation",
                      "General Manager with P&L, sales and team leadership experience",
                      "Delivered 40% year-on-year revenue growth across 3 consecutive years",
                      "Master's Degree in Data Science & Artificial Intelligence",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-white/70">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
                Meet the founder
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Business leadership meets AI expertise
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                Unlike traditional web agencies, Swift Sense Digital is led by someone who has
                sat in the General Manager&apos;s chair — managing P&amp;L, sales pipelines,
                and operational teams — and holds a Master&apos;s in Data Science &amp;
                Artificial Intelligence.
              </p>
              <p className="mt-4 leading-relaxed text-white/60">
                CW Lam founded Swift Sense Digital to help SME owners, managing directors,
                and general managers adopt AI that actually moves the needle: faster customer
                response, more qualified leads, and less time lost to repetitive admin.
              </p>
              <blockquote className="mt-8 border-l-2 border-blue-500/50 pl-5 italic text-white/80">
                &ldquo;We focus on practical business outcomes, not AI hype. Every system we
                build is designed to help you respond faster, win more business, and free your
                team for work that matters.&rdquo;
              </blockquote>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold transition-colors hover:bg-blue-500"
              >
                Book a call with Lam
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Your business is losing opportunities every day
            </h2>
            <p className="mt-4 text-white/60">
              Most SMEs know they need to move faster — but lack the time, tools, or team to
              make it happen.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="rounded-xl border border-white/10 bg-[#0d1f35] p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Practical AI solutions for your business
            </h2>
            <p className="mt-4 text-white/60">
              Four core services designed to help SMEs respond faster, convert more, and
              operate smarter — without enterprise complexity.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-white/10 bg-[#0a1628] p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Swift Sense Digital */}
      <section id="why-us" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
              Why Swift Sense Digital
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Not another generic AI agency
            </h2>
            <p className="mt-4 text-white/60">
              We combine real business leadership with hands-on AI implementation — built
              specifically for SMEs who need results, not experiments.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whySwiftSense.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {whySwiftSense.slice(3).map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-blue-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 transition-colors group-hover:bg-blue-600/30">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
              Industry solutions
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              AI systems tailored for different industries
            </h2>
            <p className="mt-4 text-white/60">
            Examples of how AI-enabled websites, chatbots and workflow automation can be applied across common SME business models.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <div
                key={project.name}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a1628] transition-colors hover:border-blue-500/30"
              >
                <div className={`relative bg-gradient-to-br ${project.gradient} px-6 py-8`}>
                  <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    Industry Example:
                  </span>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-white/50">
                    {project.industry}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-5">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-white/80">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/40">
          Live demo builds can be prepared for selected industries during consultation.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Transparent pricing, real results
            </h2>
            <p className="mt-4 text-white/60">
            Most businesses spend thousands each month on manual admin, customer service and lead follow-up.
            Our systems help you automate repetitive work and improve response time at a fraction of the annual cost of hiring.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl border p-8 ${
                  tier.highlighted
                    ? "border-blue-500 bg-[#0d1f35] shadow-lg shadow-blue-500/10"
                    : "border-white/10 bg-[#0d1f35]"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-white/50">From</span>
                  <span className="text-3xl font-bold text-blue-400">{tier.price}</span>
                </div>
                <p className="mt-3 text-sm text-white/60">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "border border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  Book Free Consultation
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
              Trusted by growing businesses
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why businesses work with Swift Sense Digital
            </h2>
            <p className="mt-4 text-white/60">
              SME owners and managers choose us because we deliver practical AI that works —
              quickly, affordably, and with ongoing support.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {socialProof.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-[#0a1628] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-transparent p-8 text-center md:p-10">
            <h3 className="text-xl font-bold md:text-2xl">
              Ready to see what&apos;s possible for your business?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
              Book a free 30-minute consultation with Lam. Walk away with a clear picture of
              where AI can save you time, capture more leads, and drive growth.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
<section id="process" className="px-6 py-20 md:py-28">
  <div className="mx-auto max-w-6xl">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        Live in three simple steps
      </h2>
      <p className="mt-4 text-white/60">
        A clear, proven process from first call to launch — no surprises.
      </p>
    </div>

    <div className="relative mt-16">
      <div className="absolute left-[10%] right-[10%] top-10 hidden h-[2px] bg-gradient-to-r from-blue-500/20 via-blue-400/60 to-blue-500/20 md:block" />

      <div className="relative grid gap-12 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="relative text-center">
            <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/40 bg-[#0a1628] text-xl font-bold text-blue-400 shadow-lg shadow-blue-500/10">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-white/60">
              Everything you need to know before getting started.
            </p>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-white/10 bg-[#0a1628] open:bg-white/[0.07]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-white/40 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="border-t border-white/10 px-6 py-4 text-sm leading-relaxed text-white/60">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Lead Capture */}
      <section id="contact" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
                Free · 30 minutes · No obligation
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Book your free consultation
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                Tell us about your biggest business challenge and we&apos;ll show you exactly
                where AI can help — whether that&apos;s a new website, a chatbot, or workflow
                automation.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Speak directly with founder CW LAM",
                  "Get a tailored recommendation — not a sales pitch",
                  "Walk away with a clear next step, even if we're not the right fit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={CONTACT_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0d1f35] p-6 md:p-8">
              <h3 className="mb-6 text-center text-lg font-semibold">
                Tell us about your business — it takes 2 minutes
              </h3>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0d1f35] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Swift Sense <span className="text-blue-400">Digital</span>
              </p>
              <p className="mt-2 text-sm text-white/50">
                Practical AI solutions for growing SMEs
              </p>
              <p className="mt-4 text-sm text-white/60">
                Founded by <span className="text-white/80">CW LAM</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {CONTACT_EMAIL}
              </a>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={CONTACT_LINKEDIN}
                className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.063 2.064 2.064 0 0 1 2.063 2.063 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 transition-colors hover:text-white/70"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
            &copy; {new Date().getFullYear()} Swift Sense Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
