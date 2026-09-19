// Approved commercial facts shared by the website and both AI assistants.
export const leadResponsePrice = "S$5,000";

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
  "Business Growth Website",
  "Lead Response System",
  "Transformation Blueprint",
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
- Business Growth Website: starts from S$1,500; typical delivery is 7–10 working days.
- Lead Response System: starts from ${leadResponsePrice}; typical delivery is 15 working days. It can answer approved FAQs, qualify enquiries, capture contact details and consent, create a HubSpot contact or enquiry, record service interest and qualification answers, acknowledge the enquiry, notify SSD, and hand off to a human by email or click-to-WhatsApp. Automated WhatsApp messaging and WhatsApp AI are not included in the base service.
- Transformation Blueprint: starts from S$8,000; typical delivery is four weeks. It is for a business that needs a clearer transformation plan before implementation.
${waitlistProducts.map((product) => `- ${product.name}: starts from ${product.price}; WAITLIST ONLY, in development, not available to purchase or activate. ${product.description} Register at https://www.swiftsensedigital.com/waitlist/${product.slug}.`).join("\n")}
- WhatsApp AI Assistant and Lead Response System are separate products. The first focuses on AI conversations in WhatsApp; the second on enquiry capture, qualification, routing and follow-up workflows. Neither starting price includes the other product.
- SwiftChief is an early scheduler for individuals and teams, not a complete business operating system. No launch date, specific calendar integration, included third-party subscription or guaranteed capability has been confirmed.
- Waitlist registration is not a purchase, reservation of access or confirmed launch date. Only a successful registration form response confirms the registration; never claim chat alone registers someone.
`.trim();

export const productFaqs = [
  {
    question: "What products are available?",
    answer: "You can enquire about Business Growth Website, Lead Response System and Transformation Blueprint. WhatsApp AI Assistant and SwiftChief — AI Chief of Staff are in development and open for waitlist registration only.",
  },
  {
    question: "Can I start with one product first?",
    answer: "Yes. The recommendation should match the immediate business objective and can expand after the first useful system is live.",
  },
  {
    question: "What pricing is confirmed?",
    answer: `Business Growth Website starts from S$1,500 with typical delivery in 7–10 working days. Lead Response System starts from ${leadResponsePrice} with typical delivery in 15 working days. Transformation Blueprint starts from S$8,000 with typical delivery in four weeks. WhatsApp AI Assistant starts from S$3,000 and SwiftChief starts from S$19 per user/month; both are waitlist-only. Final scope and fees are confirmed after discovery.`,
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
