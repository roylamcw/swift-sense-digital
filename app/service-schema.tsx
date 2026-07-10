export function ServiceSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
  
      name: "Swift Sense Digital",
  
      serviceType: [
        "AI Website Development",
        "AI Lead Response System",
        "AI Knowledge Base",
        "AI Document Assistant",
        "AI Meeting Assistant",
        "CRM Integration",
        "Workflow Automation",
        "Business Transformation Consulting",
      ],
  
      provider: {
        "@type": "Organization",
        name: "Swift Sense Digital",
        url: "https://swiftsense.digital",
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
        "Practical AI solutions that improve business productivity through websites, chatbots, workflow automation and business transformation.",
  
      url: "https://swiftsense.digital",
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