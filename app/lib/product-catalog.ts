// Approved commercial facts shared by the website and both AI assistants.
export const leadResponsePrice = "S$5,000";
export const transformationPartnershipPrice = "S$2,000";

export const blueprint = {
  name: "AI Transformation Blueprint",
  price: "S$8,000",
  duration: "Four weeks",
  boundary: "The Blueprint covers assessment and planning. Implementation projects, software subscriptions and ongoing support are quoted separately. Final scope and timing are agreed after discovery.",
  deliverables: [
    { title: "Business and workflow assessment", description: "Review the agreed business areas, existing systems and recurring work to understand where time and opportunities are lost." },
    { title: "Prioritised AI opportunities", description: "Rank practical improvements by expected value, effort and readiness, including where a simpler process change is enough." },
    { title: "Tools and system recommendations", description: "Assess suitable options against your workflows, existing technology, information needs and budget." },
    { title: "Business case and cost estimates", description: "Set out estimated benefits, implementation and running costs, assumptions and measures of success." },
    { title: "Implementation-ready scope", description: "Define phased work, responsibilities, dependencies and acceptance criteria so the next project can be quoted and delivered." },
    { title: "Adoption and oversight plan", description: "Plan staff involvement, training, access controls, human review and progress checks around the agreed priorities." },
  ],
} as const;

// Keep the verified CRM values stable while using the approved public name.
export function serviceLabel(service: string) {
  return service === "Transformation Blueprint" ? blueprint.name : service;
}

export const waitlistProducts = [
  {
    slug: "whatsapp-ai-assistant",
    name: "WhatsApp AI Assistant",
    serviceInterest: "WhatsApp AI Assistant — Waitlist",
    price: "S$3,000",
    subtitle: "Business conversations, supported by AI",
    description:
      "A standalone AI assistant in development, designed to answer business questions on WhatsApp and guide conversations towards human follow-up.",
    focus: ["Business-knowledge replies", "Basic enquiry qualification", "Human handoff"],
  },
  {
    slug: "swiftchief",
    name: "SwiftChief — AI Chief of Staff",
    serviceInterest: "SwiftChief — AI Chief of Staff — Waitlist",
    price: "S$19 per user/month",
    subtitle: "Make room for what matters",
    description:
      "An AI scheduler in development for individuals and teams, designed to help organise schedules, priorities and daily briefings. Start with your own day, or coordinate with your team.",
    focus: ["Personal schedules", "Shared team priorities", "Daily and weekly briefings"],
  },
] as const;

export const serviceOptions = [
  "Transformation Blueprint",
  "Business Growth Website",
  "Lead Response System",
  ...waitlistProducts.map((product) => product.serviceInterest),
  "Not sure yet",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export function getWaitlistProduct(serviceInterest: string) {
  return waitlistProducts.find((product) => product.serviceInterest === serviceInterest);
}

export function identifyWaitlistProduct(text: string) {
  if (/\b(?:swift\s?chief|chief of staff|scheduler)\b/i.test(text)) return waitlistProducts[1];
  if (/\bwhatsapp\s+(?:ai|assistant|chat\s?bot|bot)\b|\bai\s+(?:assistant\s+)?(?:on|for|in)\s+whatsapp\b/i.test(text)) return waitlistProducts[0];
  return undefined;
}

export const waitlistConsentText =
  "I agree to allow Swift Sense Digital to store and process my personal data to respond to my waitlist enquiry and contact me about availability of my selected product.";

export const waitlistConfirmation =
  "We’ve received your waitlist registration. We’ll contact you about availability of your selected product. This is not a purchase or confirmation of access.";

export const approvedProductFacts = `
- SSD is an outsourced AI transformation partner for SMEs across industries. Its flagship engagement is the AI Transformation Blueprint. SSD helps owners understand opportunities, prioritise work and progress adoption with less research and coordination falling on them.
- ${blueprint.name}: starts from ${blueprint.price} as a one-off fee; typical delivery is ${blueprint.duration.toLowerCase()}. Includes a comprehensive assessment of agreed business areas, prioritised roadmap, tools and cost recommendations, implementation-ready scope and an adoption plan. ${blueprint.boundary}
- Ongoing AI transformation partnership: starts from ${transformationPartnershipPrice}/month. An optional, separately scoped recurring engagement for prioritisation, implementation coordination, adoption support and progress reviews. Monthly scope, capacity and final fee are agreed after discovery. No minimum term or specific hours have been approved; do not invent them. Substantial builds and third-party charges are separate; it is not unlimited implementation or routine technical care.
- Individual solutions can be bought independently without purchasing the Blueprint. Recommend a solution only when it fits the business need; do not force a Blueprint for an already clear, bounded need.
- The client still appoints an internal decision-maker, provides agreed access and involves staff in testing and adoption. SSD reduces the management burden but does not promise transformation without client involvement.
- Business Growth Website: starts from S$1,500; typical delivery is 7–10 working days.
- Lead Response System: starts from ${leadResponsePrice}; typical delivery is 15 working days. It can answer approved FAQs, qualify enquiries, capture contact details and consent, create a HubSpot contact or enquiry, record service interest and qualification answers, acknowledge the enquiry, notify SSD, and hand off to a human by email or click-to-WhatsApp. Automated WhatsApp messaging and WhatsApp AI are not included in the base service.
${waitlistProducts.map((product) => `- ${product.name}: starts from ${product.price}; WAITLIST ONLY, in development, not available to purchase or activate. ${product.description} Register at https://www.swiftsensedigital.com/waitlist/${product.slug}.`).join("\n")}
- WhatsApp AI Assistant and Lead Response System are separate products. The first focuses on AI conversations in WhatsApp; the second on enquiry capture, qualification, routing and follow-up workflows. Neither starting price includes the other product.
- SwiftChief is an early scheduler for individuals and teams, not a complete business operating system. No launch date, specific calendar integration, included third-party subscription or guaranteed capability has been confirmed.
- Waitlist registration is not a purchase, reservation of access or confirmed launch date. Only a successful registration form response confirms the registration; never claim chat alone registers someone.
`.trim();

export const productFaqs = [
  { question: "What does the AI Transformation Blueprint include?", answer: `From ${blueprint.price} as a one-off engagement, typically over ${blueprint.duration.toLowerCase()}: an assessment of agreed business areas, prioritised opportunities, tool recommendations, estimated costs and benefits, implementation-ready scope and an adoption plan. Final scope and timing are agreed after discovery.` },
  { question: "Does the Blueprint include building every solution?", answer: "No. The Blueprint covers assessment and planning. Implementation projects, software subscriptions and ongoing support are scoped and quoted separately. It does not include every SSD product." },
  { question: "Can SSD stay involved after the Blueprint?", answer: `Yes. Our optional ongoing AI transformation partnership starts from ${transformationPartnershipPrice}/month for prioritisation, implementation coordination, staff adoption and progress reviews. Monthly scope, capacity and final fee are agreed after discovery. Substantial builds and third-party costs require their own agreed scope; routine technical care is a separate service.` },
  { question: "Do you work with a specific industry?", answer: "We work with SMEs across industries. Fit depends on the business challenge, the opportunity to improve recurring work and the team's readiness to implement. A decision-maker and agreed staff involvement are needed throughout." },
  {
    question: "What products are available?",
    answer: "Our flagship is the AI Transformation Blueprint. Business Growth Website and Lead Response System are also available independently. WhatsApp AI Assistant and SwiftChief — AI Chief of Staff are in development and open for waitlist registration only.",
  },
  {
    question: "Can I start with one product first?",
    answer: "Yes. You can purchase an individual solution without buying a Blueprint. For broader AI adoption or several competing priorities, the Blueprint establishes a practical direction first.",
  },
  {
    question: "What pricing is confirmed?",
    answer: `AI Transformation Blueprint starts from ${blueprint.price} as a one-off assessment and planning engagement, typically four weeks. Our optional ongoing AI transformation partnership starts from ${transformationPartnershipPrice}/month. Implementation projects are quoted separately. Business Growth Website starts from S$1,500 with typical delivery in 7–10 working days. Lead Response System starts from ${leadResponsePrice} with typical delivery in 15 working days. WhatsApp AI Assistant starts from S$3,000 and SwiftChief starts from S$19 per user/month; both are waitlist-only. Final scope and fees are confirmed after discovery.`,
  },
  {
    question: "Is WhatsApp AI Assistant part of Lead Response System?",
    answer: "No. They are separate products. WhatsApp AI Assistant is being developed for AI-assisted conversations on WhatsApp. Lead Response System focuses on capturing enquiries, qualification, routing and follow-up workflows. WhatsApp AI is not included in its base scope.",
  },
  {
    question: "What happens when I join a waitlist?",
    answer: "We record your interest and contact you about availability of your selected product. SwiftChief and WhatsApp AI Assistant are still in development. Registration is not a purchase or confirmation of access, and no launch date is confirmed.",
  },
  {
    question: "Do I need to know exactly what AI system I need?",
    answer: "No. The enquiry should explain the business problem, current bottleneck or desired outcome. Swift Sense Digital can recommend the next practical step.",
  },
  {
    question: "How is personal data from the enquiry form used?",
    answer: "Submitted details are used to respond to your enquiry or contact you about availability of a product whose waitlist you joined. The form asks for consent before storing and processing personal data.",
  },
] as const;
