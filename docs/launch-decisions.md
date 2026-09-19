# Swift Sense Digital Launch Decisions

This file is the commercial and technical source of truth for the launch website until CW approves a different source.

## Confirmed Company Facts

- Company name: Swift Sense Digital
- Positioning: AI Transformation Consultancy for Growing SMEs
- Canonical URL: https://www.swiftsensedigital.com
- Public email: chunwai@swiftsensedigital.com
- Telephone: +65 9237 1516
- WhatsApp URL: https://wa.me/6592371516
- LinkedIn: https://www.linkedin.com/company/swiftsensedigital/

## Approved Launch Products

1. Business Growth Website
2. Lead Response System
3. Transformation Blueprint

## Approved Product Update — 19 September 2026

CW approved the following website and assistant updates:

| Product | Public starting price | Availability |
| --- | --- | --- |
| Business Growth Website | S$1,500 | Enquiries open; existing 7–10 working day guidance unchanged |
| Lead Response System | S$5,000 | Enquiries open; existing 15 working day guidance unchanged |
| Transformation Blueprint | S$8,000 | Enquiries open; existing four-week guidance unchanged |
| WhatsApp AI Assistant | S$3,000 | Waitlist only |
| SwiftChief — AI Chief of Staff | S$19 per user/month | Waitlist only |

- WhatsApp AI Assistant is a standalone product, separate from Lead Response System. Automated WhatsApp and WhatsApp AI remain excluded from the Lead Response System base scope.
- SwiftChief is an early AI scheduler for individuals and teams, not a complete operating system. Describe schedules, priorities and briefings as its intended focus, not launched capabilities.
- Publish the SwiftChief headline price only. The approved recommendation also included Personal and Team at S$19/user/month (Team minimum three users), annual pricing at S$190/user/year, and team onboarding from S$500 once-off. Detailed plans are not being advertised on this waitlist page.
- Neither waitlist has a confirmed launch date. Do not promise access, payments, calendar integrations, third-party licences or included ongoing usage charges.
- `app/lib/product-catalog.ts` supplies public waitlist details and shared commercial facts to the homepage, registration pages, FAQs, website assistant and WhatsApp assistant.

### Waitlist routing

- Product links open `/waitlist/whatsapp-ai-assistant` or `/waitlist/swiftchief` with the correct product fixed in the form.
- Registrations reuse `/api/contact` and the existing HubSpot form. No new CRM, database, subscription or production dependency is introduced.
- The verified HubSpot `service_of_interest` enum is unchanged. Waitlist submissions use `Not sure yet`; the `how_can_we_help` field starts with `WAITLIST REGISTRATION` and records the exact product, starting price and availability status. This is not a separate HubSpot list or a new custom property.
- Company and notes are optional for waitlists. Empty company fields are omitted, not replaced with invented company data. The external form’s acceptance of omitted company still requires a controlled end-to-end test before release.
- Consent explicitly covers the selected product’s availability updates. Only a successful HubSpot response produces a registration confirmation. Test failures do not retry automatically.
- WhatsApp waitlist requests are directed to the relevant web form, not silently classified as Lead Response System. Existing allowlists, human-handoff suppression and explicit-consent rules remain in place.

## HubSpot Form

- Portal ID: 246767649
- Form ID: 6815e370-efd2-4141-8fbd-0fd36072482f
- Region: na2
- Form name: SSD Website Enquiry
- Submission endpoint: https://api.hsforms.com/submissions/v3/integration/submit/246767649/6815e370-efd2-4141-8fbd-0fd36072482f
- HubSpot CAPTCHA was removed from this form because CAPTCHA-enabled HubSpot forms reject Forms API submissions.

Verified HubSpot field names:

- First name: firstname
- Last name: lastname
- Email: email
- Company name: company
- Phone number: phone
- Service of interest: service_of_interest
- How can we help: how_can_we_help

Verified service_of_interest dropdown submitted values from the rendered published form:

- Business Growth Website: Business Growth Website
- Lead Response System: Lead Response System
- Transformation Blueprint: Transformation Blueprint
- Not sure yet: Not sure yet

Verified end-to-end submission status:

- Website submission passed on 16 July 2026.
- HubSpot recorded the submission as an SSD website conversion.
- HubSpot contact fields and custom properties were verified.
- SSD notification email was received.
- Vercel Bot Protection and `/api/contact` rate limiting remain required before production deployment.

## Analytics

- Google Analytics: G-7E55E7YK2L
- Microsoft Clarity: xi56yioghx

## Approved Founder Facts

- 12 years of total professional experience.
- Currently a General Manager.
- Company-wide leadership experience across sales and marketing, operations, finance, HR, team building and P&L responsibilities.
- Has delivered 40% year-on-year growth.
- Holds a Master's degree.

Do not describe the 12 years as AI experience or AI transformation experience.

Do not invent the Master's subject, institution, growth period or commercial context.

## Pending Founder Approval

These commercial items are not approved for publication as fixed facts:

- Detailed deliverables
- Exact timelines
- Scope and exclusions
- Prices beyond those explicitly approved in the product update above
- Care-plan structure and pricing
- "Most Popular" claims
