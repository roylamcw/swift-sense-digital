import Link from "next/link";
import LeadForm from "./components/LeadForm";
import TrackedLink from "./components/TrackedLink";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Founder", href: "#founder" },
  { label: "Why Us", href: "#why-us" },
  { label: "Examples", href: "#examples" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_EMAIL = "chunwai@swiftsensedigital.com";
const CONTACT_PHONE_DISPLAY = "+65 9237 1516";
const CONTACT_PHONE_HREF = "tel:+6592371516";
const CONTACT_WHATSAPP = "https://wa.me/6592371516";
const CONTACT_LINKEDIN = "https://www.linkedin.com/company/swiftsensedigital/";

const problems = [
  {
    title: "Your website is not converting enough interest",
    description:
      "Visitors need a clear offer, a useful next step and a frictionless enquiry path before they become qualified conversations.",
  },
  {
    title: "Good leads wait too long for a response",
    description:
      "When enquiries sit in inboxes or chats, the customer loses momentum and your team starts the conversation without context.",
  },
  {
    title: "AI ideas are not connected to business priorities",
    description:
      "SMEs need practical improvements that fit current operations, budget and team capacity - not disconnected AI experiments.",
  },
];

const products = [
  {
    title: "Business Growth Website",
    description:
      "A conversion-focused website for growing SMEs that need clearer positioning, stronger calls to action and a reliable enquiry journey.",
    price: "From S$1,500",
    focus: ["Clear offer structure", "Mobile-first enquiry path", "SEO and analytics foundations"],
  },
  {
    title: "Lead Response System",
    description:
      "A lead handling system designed to help your team capture enquiries, understand intent and respond with better context.",
    price: "Scoped after discovery",
    focus: ["Enquiry capture", "Lead context", "Response workflow"],
  },
  {
    title: "Transformation Blueprint",
    description:
      "A practical business review that identifies where AI, systems and process improvements can create measurable operational value.",
    price: "Scoped after discovery",
    focus: ["Business priorities", "Operational bottlenecks", "Practical roadmap"],
  },
];

const founderFacts = [
  "12 years of total professional experience",
  "Currently a General Manager",
  "Company-wide leadership across sales and marketing, operations, finance, HR, team building and P&L",
  "Delivered 40% year-on-year growth",
  "Holds a Master's degree",
];

const whySwiftSense = [
  {
    title: "Business first",
    description:
      "Recommendations start with the business problem, customer journey and operational constraint before choosing the technology.",
  },
  {
    title: "Human-centred AI",
    description:
      "The goal is to help teams respond faster, work with better information and spend less time on repetitive manual tasks.",
  },
  {
    title: "SME practical",
    description:
      "Launch work is kept focused on first revenue, reliable delivery and reusable systems rather than unnecessary platform complexity.",
  },
  {
    title: "Measured outcomes",
    description:
      "Analytics, enquiry tracking and clear handover points are treated as part of the system, not as afterthoughts.",
  },
];

const exampleUseCases = [
  {
    name: "Service Business",
    description:
      "Clarify the offer, capture enquiry intent and make it easier for the team to follow up with the right context.",
    tags: ["Business Growth Website", "Lead Response System"],
  },
  {
    name: "Operations-Led SME",
    description:
      "Map repetitive admin and customer response bottlenecks into a practical improvement roadmap.",
    tags: ["Transformation Blueprint"],
  },
  {
    name: "Growing Local Brand",
    description:
      "Improve trust, mobile usability and contact paths so prospects understand what to do next.",
    tags: ["Business Growth Website"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Review the business objective, current customer journey and where the team is losing time or opportunities.",
  },
  {
    number: "02",
    title: "Prioritise",
    description:
      "Choose the launch product and scope that best supports revenue, delivery reliability and customer experience.",
  },
  {
    number: "03",
    title: "Build and improve",
    description:
      "Implement the agreed system, measure the enquiry journey and refine based on real customer feedback.",
  },
];

const faqs = [
  {
    question: "What launch products are available?",
    answer:
      "Swift Sense Digital is launching with Business Growth Website, Lead Response System and Transformation Blueprint.",
  },
  {
    question: "Can I start with one product first?",
    answer:
      "Yes. The recommendation should match the immediate business objective and can expand after the first useful system is live.",
  },
  {
    question: "What pricing is confirmed?",
    answer:
      "Business Growth Website starts from S$1,500. Detailed deliverables, exact timelines, scope, exclusions and other pricing require founder approval before being treated as fixed facts.",
  },
  {
    question: "Do I need to know exactly what AI system I need?",
    answer:
      "No. The enquiry should explain the business problem, current bottleneck or desired outcome. Swift Sense Digital can recommend the next practical step.",
  },
  {
    question: "How is personal data from the enquiry form used?",
    answer:
      "Submitted details are used to respond to the enquiry. The form asks for consent before storing and processing personal data.",
  },
];

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0a1628] font-sans text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0a1628]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1628]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight" aria-label="Swift Sense Digital home">
            Swift Sense <span className="text-blue-300">Digital</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <TrackedLink
            href="#contact"
            eventName="primary_contact_cta_click"
            eventProperties={{ location: "header" }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-500"
          >
            Start Enquiry
          </TrackedLink>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18)_0%,_transparent_60%)]" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200">
                AI Transformation Consultancy for Growing SMEs
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Business First. <span className="text-blue-300">AI Enabled.</span> Results Driven.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Swift Sense Digital helps growing SMEs unlock potential through practical AI,
                better systems and modern technology.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <TrackedLink
                  href="#contact"
                  eventName="primary_contact_cta_click"
                  eventProperties={{ location: "hero" }}
                  className="w-full rounded-lg bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 sm:w-auto"
                >
                  Start an enquiry
                </TrackedLink>

                <a
                  href="#products"
                  className="w-full rounded-lg border border-white/25 px-8 py-3.5 text-center text-sm font-semibold transition-colors hover:border-white/50 hover:bg-white/5 sm:w-auto"
                >
                  View launch products
                </a>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { stat: "12 yrs", label: "Total professional experience" },
                { stat: "40%", label: "Year-on-year growth delivered" },
                { stat: "SME", label: "Built for growing businesses" },
                { stat: "AI + Human", label: "Practical transformation support" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-sm">
                  <p className="text-2xl font-bold text-blue-300">{item.stat}</p>
                  <p className="mt-1 text-sm text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-300">
                Launch focus
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Turn interest into better business conversations
              </h2>
              <p className="mt-4 text-white/75">
                The first release focuses on clear offers, reliable enquiry capture and practical
                systems that help teams respond with context.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-6 shadow-2xl shadow-blue-950/20">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-semibold">Enquiry journey example</p>
                    <p className="text-xs text-white/65">Context before follow-up</p>
                  </div>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-200">
                    Captured
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 p-4">
                    <p className="text-sm text-white/85">
                      We need a clearer website and a faster way to respond to customer enquiries.
                    </p>
                  </div>

                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-blue-500/30 bg-blue-600/20 p-4">
                    <p className="text-sm text-blue-100">
                      Swift Sense Digital can review the offer, capture the right details and
                      recommend the most practical launch product.
                    </p>
                  </div>

                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 p-4">
                    <p className="text-sm text-white/85">
                      The priority is more qualified enquiries without adding unnecessary admin.
                    </p>
                  </div>

                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-blue-500/30 bg-blue-600/20 p-4">
                    <p className="text-sm text-blue-100">
                      That points to a stronger enquiry journey first, then a lead response workflow
                      if response speed is the bottleneck.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a1628] p-6">
                <p className="mb-4 text-sm font-semibold text-blue-200">What gets captured</p>

                <div className="space-y-4">
                  {[
                    ["Business need", "Clearer website and lead journey"],
                    ["Service interest", "Approved launch product"],
                    ["Contact route", "Email, phone and WhatsApp"],
                    ["Next action", "Founder review and recommendation"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-xs uppercase tracking-wider text-white/65">{label}</p>
                      <p className="mt-1 text-sm font-medium text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Where growing businesses lose momentum
              </h2>
              <p className="mt-4 text-white/75">
                The launch products are designed around common growth bottlenecks, not technology for its own sake.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {problems.map((problem) => (
                <div key={problem.title} className="rounded-xl border border-white/10 bg-[#0d1f35] p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.007M2.697 16.126 10.05 3.378c.866-1.5 3.032-1.5 3.898 0l7.355 12.748c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.731 0-2.814-1.874-1.948-3.374Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-300">
                Approved launch products
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Three practical starting points
              </h2>
              <p className="mt-4 text-white/75">
                Each product supports a different launch priority: stronger conversion, faster lead response or a clearer transformation roadmap.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.title} className="flex flex-col rounded-xl border border-white/10 bg-[#0a1628] p-8">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{product.description}</p>
                  <p className="mt-5 text-sm font-semibold text-blue-200">{product.price}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {product.focus.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    href="#contact"
                    eventName="primary_contact_cta_click"
                    eventProperties={{ location: `product:${product.title}` }}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    Ask about this product
                    <ArrowIcon />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative mx-auto w-full max-w-sm lg:mx-0">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] p-8">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-4xl font-bold text-white">
                    CW
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold">CW Lam</h3>
                    <p className="mt-1 text-sm text-blue-300">Founder</p>
                  </div>
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {founderFacts.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckIcon />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-300">
                  Founder credibility
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Practical transformation led from a business perspective
                </h2>
                <p className="mt-4 leading-relaxed text-white/75">
                  Swift Sense Digital is built around the belief that AI should amplify people and improve business outcomes. The work starts with the commercial problem, then applies technology where it is useful.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  CW brings broad company-wide leadership experience across sales and marketing, operations, finance, HR, team building and P&L responsibilities.
                </p>
                <blockquote className="mt-8 border-l-2 border-blue-400/60 pl-5 italic text-white/85">
                  &quot;Unlock Potential.&quot;
                </blockquote>
                <TrackedLink
                  href="#contact"
                  eventName="primary_contact_cta_click"
                  eventProperties={{ location: "founder" }}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold transition-colors hover:bg-blue-500"
                >
                  Start a conversation
                  <ArrowIcon />
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-300">
                Why Swift Sense Digital
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Calm, practical AI for real SME operations
              </h2>
              <p className="mt-4 text-white/75">
                The launch focus is first revenue, reliable delivery and reusable systems - not unnecessary complexity.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whySwiftSense.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-300">
                Example applications
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How the launch products can be applied
              </h2>
              <p className="mt-4 text-white/75">
                These are illustrative use cases, not customer case studies or testimonials.
              </p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {exampleUseCases.map((project) => (
                <article key={project.name} className="rounded-xl border border-white/10 bg-[#0a1628] p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/65">Illustrative use case</p>
                  <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Confirmed pricing guidance
              </h2>
              <p className="mt-4 text-white/75">
                Business Growth Website has a confirmed starting price. Other commercial details should be scoped and approved before being published as fixed facts.
              </p>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.title} className="flex flex-col rounded-xl border border-white/10 bg-[#0d1f35] p-8">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-300">{product.price}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">{product.description}</p>
                  <TrackedLink
                    href="#contact"
                    eventName="primary_contact_cta_click"
                    eventProperties={{ location: `pricing:${product.title}` }}
                    className="mt-8 block rounded-lg border border-white/25 py-3 text-center text-sm font-semibold transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    Discuss fit
                  </TrackedLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                From enquiry to practical next step
              </h2>
              <p className="mt-4 text-white/75">
                A simple decision path keeps the work focused on what will help the business move first.
              </p>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-[10%] right-[10%] top-10 hidden h-[2px] bg-gradient-to-r from-blue-500/20 via-blue-400/60 to-blue-500/20 md:block" />

              <div className="relative grid gap-12 md:grid-cols-3">
                {processSteps.map((step) => (
                  <div key={step.number} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/50 bg-[#0a1628] text-xl font-bold text-blue-300 shadow-lg shadow-blue-500/10">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/75">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-white/10 bg-[#0d1f35] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-white/75">Useful details before getting started.</p>
            </div>
            <div className="mt-12 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-white/10 bg-[#0a1628] open:bg-white/[0.07]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg className="h-5 w-5 shrink-0 text-white/70 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="border-t border-white/10 px-6 py-4 text-sm leading-relaxed text-white/75">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-3 inline-block rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200">
                  Website enquiry
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Tell us what you want to improve
                </h2>
                <p className="mt-4 leading-relaxed text-white/75">
                  Share the challenge or opportunity, and we&apos;ll recommend the clearest next step.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Choose one of the three approved launch products",
                    "Explain the business problem in plain language",
                    "Use email, phone or WhatsApp if the form is unavailable",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <TrackedLink
                    href={`mailto:${CONTACT_EMAIL}`}
                    eventName="email_link_click"
                    eventProperties={{ location: "contact" }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-medium transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    <svg className="h-4 w-4 text-white/75" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    {CONTACT_EMAIL}
                  </TrackedLink>
                  <TrackedLink
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="whatsapp_link_click"
                    eventProperties={{ location: "contact" }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-medium transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    <svg className="h-4 w-4 text-white/75" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    WhatsApp
                  </TrackedLink>
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-medium transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0d1f35] p-6 md:p-8">
                <h3 className="mb-6 text-center text-lg font-semibold">
                  SSD Website Enquiry
                </h3>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0d1f35] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Swift Sense <span className="text-blue-300">Digital</span>
              </p>
              <p className="mt-2 text-sm text-white/75">
                AI Transformation Consultancy for Growing SMEs
              </p>
              <p className="mt-4 text-sm text-white/75">
                Unlock Potential.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <TrackedLink
                href={`mailto:${CONTACT_EMAIL}`}
                eventName="email_link_click"
                eventProperties={{ location: "footer" }}
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                {CONTACT_EMAIL}
              </TrackedLink>
              <a href={CONTACT_PHONE_HREF} className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white">
                {CONTACT_PHONE_DISPLAY}
              </a>
              <TrackedLink
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_link_click"
                eventProperties={{ location: "footer" }}
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                WhatsApp
              </TrackedLink>
              <a
                href={CONTACT_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} Swift Sense Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
