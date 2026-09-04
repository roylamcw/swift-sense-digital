import type { Metadata } from "next";
import LegalPageShell, {
  LegalList,
  LegalSection,
} from "../components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swift Sense Digital collects, uses, shares and protects personal data across its website, enquiry tools, AI assistant and WhatsApp communications.",
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "4 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      summary="This policy explains how Swift Sense Digital handles personal data when you visit our website, submit an enquiry, use our AI-assisted tools or communicate with us through WhatsApp."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Who this policy covers">
        <p>
          Swift Sense Digital is currently an unregistered project and brand
          operated by its founder in Singapore. The project is developing AI
          transformation, website and lead-response services. In this policy,
          SSD, we or us means the individual operating this website and project.
          This policy applies to visitors, prospective customers, customers and
          other people who interact with our digital services.
        </p>
        <p>
          Questions or requests about personal data can be sent to{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="mailto:chunwai@swiftsensedigital.com"
          >
            chunwai@swiftsensedigital.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Personal data we collect">
        <p>Depending on how you interact with SSD, we may collect:</p>
        <LegalList>
          <li>
            Enquiry details such as your name, work email, company, optional
            phone number, service interest, message and consent record.
          </li>
          <li>
            Website assistant messages and the technical information needed to
            operate and protect the assistant. The assistant is designed not to
            request contact details or sensitive information.
          </li>
          <li>
            WhatsApp information such as your WhatsApp identifier or phone
            number, message content, message identifiers, timestamps and
            delivery or status information.
          </li>
          <li>
            Website and device information such as pages viewed, interactions,
            browser and device type, approximate location, IP address, cookies
            and similar identifiers.
          </li>
          <li>
            Records of our correspondence, proposals, agreements and service
            delivery where relevant to a business relationship.
          </li>
        </LegalList>
        <p>
          Please do not send passwords, payment-card details, health records,
          government identification numbers or other sensitive or confidential
          information through the website assistant or WhatsApp unless we have
          agreed on a suitable secure method.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use personal data">
        <p>We use personal data where reasonably necessary to:</p>
        <LegalList>
          <li>Respond to enquiries and recommend an appropriate next step.</li>
          <li>
            Operate the website, forms, AI-assisted tools and WhatsApp
            communications.
          </li>
          <li>
            Create and manage prospect or customer records after consent or
            another lawful basis applies.
          </li>
          <li>
            Understand website performance, improve user journeys and measure
            important enquiry actions.
          </li>
          <li>
            Prevent abuse, protect our systems, troubleshoot problems and
            maintain service reliability.
          </li>
          <li>
            Meet contractual, accounting, regulatory and legal obligations.
          </li>
        </LegalList>
        <p>
          The website assistant processes conversation text to generate a
          response. Its conversation is not added to an enquiry submitted to
          SSD unless you separately complete and submit the brief form.
        </p>
      </LegalSection>

      <LegalSection title="4. Service providers and disclosures">
        <p>
          We use service providers to operate SSD. They may process limited
          personal data on our behalf or under their own applicable terms:
        </p>
        <LegalList>
          <li>HubSpot for enquiry and customer-relationship records.</li>
          <li>Vercel for website hosting, analytics and AI Gateway services.</li>
          <li>
            Selected AI model providers for generating website-assistant
            responses.
          </li>
          <li>Google Analytics for website usage measurement.</li>
          <li>
            Microsoft Clarity for website interaction analytics, including
            session-replay and heatmap features.
          </li>
          <li>Meta and WhatsApp for WhatsApp messaging and related events.</li>
        </LegalList>
        <p>
          We may also disclose information to professional advisers, regulators,
          courts or public authorities where reasonably necessary or legally
          required, and in connection with a genuine business reorganisation.
          We do not sell personal data.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies and analytics">
        <p>
          The website uses cookies and similar technologies for analytics,
          security and service operation. Google Analytics, Microsoft Clarity,
          HubSpot and Vercel may set or read identifiers according to their
          configurations and policies.
        </p>
        <p>
          You can limit cookies through your browser settings and use available
          provider opt-out controls. Blocking some technologies may affect
          website functionality or measurement.
        </p>
      </LegalSection>

      <LegalSection title="6. WhatsApp communications">
        <p>
          When you message SSD on WhatsApp, Meta and WhatsApp process information
          under their own terms and privacy policies. SSD receives the
          information needed to read the message, respond and operate the
          approved workflow.
        </p>
        <p>
          Business-initiated WhatsApp messages will only be sent where an
          appropriate opt-in or other permitted basis exists. You can withdraw
          from such messages by replying STOP or emailing us. Service messages
          that are necessary to complete an active request may still be sent
          where permitted.
        </p>
      </LegalSection>

      <LegalSection title="7. International processing">
        <p>
          Some service providers may process information outside Singapore. We
          take reasonable steps to use providers and arrangements intended to
          protect personal data in a manner consistent with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="8. Retention and security">
        <p>
          We retain personal data only for as long as reasonably needed for the
          purposes described here, an active business relationship, legitimate
          business records or legal obligations. Data that is no longer needed
          will be deleted, anonymised or securely disposed of where practicable.
        </p>
        <p>
          We use reasonable administrative and technical safeguards. No online
          service or transmission method can be guaranteed completely secure.
        </p>
      </LegalSection>

      <LegalSection title="9. Your choices and requests">
        <p>
          Subject to applicable law, you may ask to access or correct personal
          data, withdraw consent, stop marketing communications, or request
          deletion. We may need to verify your identity and may retain
          information where a legal or legitimate record-keeping requirement
          applies.
        </p>
        <p>
          See our{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="/data-deletion"
          >
            Data Deletion Instructions
          </a>{" "}
          for the request process.
        </p>
      </LegalSection>

      <LegalSection title="10. Children and policy updates">
        <p>
          SSD services are intended for business users and are not directed to
          children. We do not knowingly collect children&apos;s personal data
          through these services.
        </p>
        <p>
          We may update this policy when our services or legal obligations
          change. The current version and update date will remain available on
          this page.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Email privacy questions and requests to{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="mailto:chunwai@swiftsensedigital.com"
          >
            chunwai@swiftsensedigital.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
