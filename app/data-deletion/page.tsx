import type { Metadata } from "next";
import LegalPageShell, {
  LegalList,
  LegalSection,
} from "../components/LegalPageShell";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description:
    "How to request access, correction or deletion of personal data held by Swift Sense Digital.",
  alternates: {
    canonical: "/data-deletion",
  },
};

const LAST_UPDATED = "4 September 2026";

export default function DataDeletionPage() {
  return (
    <LegalPageShell
      eyebrow="Privacy request"
      title="Data Deletion Instructions"
      summary="Use these instructions to ask Swift Sense Digital to locate, correct or delete personal data connected with a website enquiry, AI-assisted brief, customer record or WhatsApp conversation."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Submit your request">
        <p>
          Email{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="mailto:chunwai@swiftsensedigital.com?subject=Data%20deletion%20request"
          >
            chunwai@swiftsensedigital.com
          </a>{" "}
          with the subject line Data deletion request.
        </p>
        <p>Include only the information needed to locate your record:</p>
        <LegalList>
          <li>Your name.</li>
          <li>The email address or phone number used to contact SSD.</li>
          <li>
            The channel involved, such as website form, assistant brief,
            WhatsApp or customer correspondence.
          </li>
          <li>
            Whether you want access, correction, withdrawal of consent or
            deletion.
          </li>
          <li>A short description of the relevant interaction.</li>
        </LegalList>
        <p>
          Do not email identity documents unless SSD specifically asks for a
          suitable verification method.
        </p>
      </LegalSection>

      <LegalSection title="2. What happens next">
        <p>SSD will review the request and may:</p>
        <LegalList>
          <li>
            Ask for proportionate information to verify your identity or
            authority.
          </li>
          <li>
            Search relevant SSD systems and service-provider records.
          </li>
          <li>
            Delete, anonymise, correct or restrict the applicable data where
            appropriate.
          </li>
          <li>
            Confirm completion or explain any information that must be retained.
          </li>
        </LegalList>
        <p>
          We aim to respond within a reasonable period. Complex requests,
          identity checks or requests involving multiple service providers may
          take longer.
        </p>
      </LegalSection>

      <LegalSection title="3. Information that may be retained">
        <p>
          Some information may be retained where reasonably necessary for legal,
          accounting, security, dispute-resolution or contractual obligations.
          SSD may also retain a minimal record of the request and its outcome.
        </p>
      </LegalSection>

      <LegalSection title="4. WhatsApp and independent accounts">
        <p>
          A request to SSD covers information controlled by SSD. Deleting a
          conversation from your device does not automatically delete records
          held by SSD, and an SSD request does not delete your Meta, WhatsApp,
          Google, Microsoft, HubSpot, Vercel or AI-provider account data that
          those providers independently control.
        </p>
        <p>
          You may also use the controls provided directly by those services.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies and analytics identifiers">
        <p>
          Browser cookies can be cleared or blocked through browser settings.
          Analytics providers may offer separate opt-out or deletion controls.
          If you want SSD to review an identifiable record connected with an
          enquiry, include the relevant enquiry email or phone number in your
          request.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          For questions about this process, email{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="mailto:chunwai@swiftsensedigital.com"
          >
            chunwai@swiftsensedigital.com
          </a>
          . See the{" "}
          <a
            className="font-medium text-blue-200 underline underline-offset-2 hover:text-white"
            href="/privacy"
          >
            Privacy Policy
          </a>{" "}
          for the wider description of SSD&apos;s data practices.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
