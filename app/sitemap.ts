import { MetadataRoute } from "next";
import { waitlistProducts } from "./lib/product-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.swiftsensedigital.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...waitlistProducts.map((product) => ({
      url: `${baseUrl}/waitlist/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/data-deletion`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
