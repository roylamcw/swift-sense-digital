function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swift Sense Digital",
    url: "https://www.swiftsensedigital.com",
    logo: "https://www.swiftsensedigital.com/og-image.png",
    email: "chunwai@swiftsensedigital.com",
    telephone: "+65 9237 1516",
    sameAs: ["https://www.linkedin.com/company/swiftsensedigital/"],
    description:
      "Swift Sense Digital is an AI Transformation Consultancy for Growing SMEs.",
    founder: {
      "@type": "Person",
      name: "CW Lam",
    },
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    knowsAbout: [
      "Business Growth Website",
      "Lead Response System",
      "Transformation Blueprint",
      "Practical AI",
      "Business Transformation",
      "Process Improvement",
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

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Swift Sense Digital",
    url: "https://www.swiftsensedigital.com",
    image: "https://www.swiftsensedigital.com/og-image.png",
    email: "chunwai@swiftsensedigital.com",
    telephone: "+65 9237 1516",
    description:
      "Swift Sense Digital helps growing SMEs unlock potential through practical AI, better systems and modern technology.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
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
