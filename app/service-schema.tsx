function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Swift Sense Digital",
    serviceType: [
      "AI Transformation Blueprint",
      "Ongoing AI Transformation Partnership",
      "Business Growth Website",
      "Lead Response System",
    ],
    provider: {
      "@type": "Organization",
      name: "Swift Sense Digital",
      url: "https://www.swiftsensedigital.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and Medium Enterprises",
    },
    description:
      "AI transformation assessment and planning for SMEs, with separately scoped implementation and optional ongoing monthly support. Individual solutions are available independently.",
    url: "https://www.swiftsensedigital.com",
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
