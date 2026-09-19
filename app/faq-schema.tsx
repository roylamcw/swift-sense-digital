import { productFaqs } from "./lib/product-catalog";

function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: productFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
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
