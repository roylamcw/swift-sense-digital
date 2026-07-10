export function FAQSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
  
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a typical project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An AI Website Launch usually takes 2–3 weeks. Lead Response Systems take 3–5 weeks, and full AI Transformation projects typically run 6–8 weeks depending on scope.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need technical knowledge to manage the systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We build everything to be easy to manage and provide onboarding so your team can handle day-to-day updates without a developer.",
          },
        },
        {
          "@type": "Question",
          name: "Can I start with one service and expand later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Many clients start with a website launch and add chatbot or automation capabilities as their needs grow. Our packages are designed to scale with you.",
          },
        },
        {
          "@type": "Question",
          name: "What industries do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with SMEs across professional services, retail, F&B, events, agencies, and more. If you need to respond faster and capture more leads, we can help.",
          },
        },
        {
          "@type": "Question",
          name: "Is ongoing support available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All packages include post-launch support. Ongoing optimisation plans are available from S$150/month and can include website updates, chatbot retraining, workflow improvements, reporting and AI adoption support.",
          },
        },
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