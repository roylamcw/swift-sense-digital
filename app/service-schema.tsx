function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Swift Sense Digital",
    serviceType: [
      "Business Growth Website",
      "Lead Response System",
      "Transformation Blueprint",
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
      "Practical AI and systems work for growing SMEs, focused on business growth websites, lead response and transformation planning.",
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
