import type { Metadata } from "next";
import LegalPageShell, {
  LegalList,
  LegalSection,
} from "../components/LegalPageShell";

export const metadata: Metadata = {
  title: "Website Terms",
  description:
    "Terms governing access to the Swift Sense Digital website, public information, enquiry tools and AI-assisted features.",
  alternates: {
    canonical: "/terms",
  },
};

const LAST_UPDATED = "4 September 2026";

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Website use"
      title="Website Terms"
      summary="These terms govern use of the Swift Sense Digital website and its public enquiry and AI-assisted features. Any paid engagement must use separate written terms identifying the contracting legal person or entity."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Acceptance and scope">
        <p>
          Swift Sense Digital is currently an unregistered project and brand
          operated by its founder in Singapore. In these terms, SSD means that
          individual operator. SSD is not currently a separate incorporated
          entity.
        </p>
        <p>
          By accessing this website, you agree to these terms. If you do not
          agree, please stop using the website. These terms do not themselves
          create a consulting engagement, customer relationship or obligation
          for SSD to accept work.
        </p>
      </LegalSection>

      <LegalSection title="2. Website information">
        <p>
          Website content is general business information. It may describe
          indicative services, starting prices, usual delivery periods and
          fictional concept demonstrations. Final scope, timing, fees and
          responsibilities are confirmed only in a separate written agreement.
        </p>
        <p>
          SSD aims to keep public information accurate but does not guarantee
          that every item is complete, current or suitable for a particular
          business decision.
        </p>
      </LegalSection>

      <LegalSection title="3. AI-assisted features">
        <p>
          The website assistant uses automated AI systems. Responses may be
          incomplete or incorrect and must not be treated as professional,
          legal, financial, medical or other regulated advice.
        </p>
        <LegalList>
          <li>Do not submit passwords, credentials or sensitive information.</li>
          <li>
            Verify important information with a qualified human before acting.
          </li>
          <li>
            An assistant response is not a quotation, guarantee or binding
            commitment from SSD.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Enquiries and WhatsApp">
        <p>
          Submitting a form, brief or WhatsApp message invites SSD to respond.
          It does not guarantee availability, acceptance of work or a particular
          result. You are responsible for ensuring that information you submit
          is accurate and that you are authorised to share it.
        </p>
        <p>
          Personal data is handled as described in the{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="/privacy"
          >
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable use">
        <p>You must not use the website or its tools to:</p>
        <LegalList>
          <li>Break the law or infringe another person&apos;s rights.</li>
          <li>
            Transmit malware, probe security controls or interfere with service
            availability.
          </li>
          <li>
            Misrepresent identity, authority, affiliation or submitted
            information.
          </li>
          <li>
            Automate excessive requests, scrape restricted content or attempt
            to extract hidden system instructions.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Intellectual property and concept demos">
        <p>
          Unless otherwise stated, website text, design, code, branding and
          original materials are owned by or licensed to SSD. You may view and
          share ordinary links for legitimate business evaluation, but you may
          not copy, resell, publish or adapt substantial materials without
          permission.
        </p>
        <p>
          Concept demonstrations are fictional and are not customer projects,
          testimonials, endorsements or evidence of actual customer results.
          Third-party names, marks and content remain the property of their
          respective owners.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-party services and links">
        <p>
          The website may use or link to third-party services. SSD does not
          control their availability, security, content or independent privacy
          practices. Your use of those services may be governed by separate
          terms.
        </p>
      </LegalSection>

      <LegalSection title="8. Availability and liability">
        <p>
          SSD may change, suspend or remove website features when reasonably
          necessary for maintenance, security or business updates. Continuous
          or error-free availability is not guaranteed.
        </p>
        <p>
          To the extent permitted by law, SSD is not liable for indirect,
          incidental or consequential loss arising solely from reliance on the
          public website or automated assistant. Nothing in these terms excludes
          liability that cannot lawfully be excluded.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law">
        <p>
          These website terms are governed by the laws of Singapore. Disputes
          relating to these terms are subject to the jurisdiction of the
          Singapore courts, unless applicable law requires otherwise.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes and contact">
        <p>
          SSD may update these terms. The current version and update date will
          be shown on this page. Questions can be sent to{" "}
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
