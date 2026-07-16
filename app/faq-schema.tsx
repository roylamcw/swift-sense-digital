function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What launch products are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Swift Sense Digital is launching with Business Growth Website, Lead Response System and Transformation Blueprint.",
        },
      },
      {
        "@type": "Question",
        name: "Can I start with one product first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The recommendation should match the immediate business objective and can expand after the first useful system is live.",
        },
      },
      {
        "@type": "Question",
        name: "What pricing is confirmed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Business Growth Website starts from S$1,500. Detailed deliverables, exact timelines, scope, exclusions and other pricing require founder approval before being treated as fixed facts.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to know exactly what AI system I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The enquiry should explain the business problem, current bottleneck or desired outcome. Swift Sense Digital can recommend the next practical step.",
        },
      },
      {
        "@type": "Question",
        name: "How is personal data from the enquiry form used?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submitted details are used to respond to the enquiry. The form asks for consent before storing and processing personal data.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: toJsonLd(schema),
      }}
    />
  );
}
