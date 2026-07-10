export function OrganizationSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
  
      name: "Swift Sense Digital",
  
      url: "https://swiftsense.digital",
  
      logo: "https://swiftsense.digital/og-image.png",
  
      description:
        "Swift Sense Digital helps SMEs unlock their business potential through AI automation, AI websites, AI chatbots, workflow automation, CRM integration and business transformation consulting.",
  
      founder: {
        "@type": "Person",
        name: "CW Lam",
      },
  
      address: {
        "@type": "PostalAddress",
        addressCountry: "SG",
      },
  
      areaServed: {
        "@type": "Country",
        name: "Singapore",
      },
  
      knowsAbout: [
        "Artificial Intelligence",
        "Workflow Automation",
        "Business Transformation",
        "AI Chatbots",
        "CRM Integration",
        "AI Websites",
        "Process Improvement",
      ],
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    );
  }