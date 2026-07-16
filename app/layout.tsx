import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Clarity from "./components/Clarity";
import { Analytics } from "@vercel/analytics/next";
import { LocalBusinessSchema, OrganizationSchema } from "./schema";
import { ServiceSchema } from "./service-schema";
import { FAQSchema } from "./faq-schema";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.swiftsensedigital.com"),
  applicationName: "Swift Sense Digital",

  title: {
    default: "Swift Sense Digital | AI Transformation Consultancy for Growing SMEs",
    template: "%s | Swift Sense Digital",
  },

  description:
    "Swift Sense Digital helps growing SMEs unlock potential through practical AI, better systems and modern technology.",
  keywords: [
    "Swift Sense Digital",
    "AI Transformation Consultancy",
    "SME AI Singapore",
    "Business Growth Website",
    "Lead Response System",
    "Transformation Blueprint",
    "Business Transformation Singapore",
  ],

  authors: [
    {
      name: "Swift Sense Digital",
    },
  ],

  creator: "Swift Sense Digital",

  publisher: "Swift Sense Digital",

  category: "Business",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Swift Sense Digital | AI Transformation Consultancy for Growing SMEs",
    description:
      "Business First. AI Enabled. Results Driven. Practical AI and systems for growing SMEs.",
    url: "https://www.swiftsensedigital.com",
    siteName: "Swift Sense Digital",
    locale: "en_SG",
    type: "website",

    images: [

      {
        url: "https://www.swiftsensedigital.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swift Sense Digital - AI Transformation Consultancy for Growing SMEs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Swift Sense Digital | AI Transformation Consultancy",
    description:
      "Helping growing SMEs unlock potential through practical AI, better systems and modern technology.",
    images: ["/og-image.png"],  
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <Clarity />
        <Analytics />

        <OrganizationSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <FAQSchema />
        <SpeedInsights />

        {children}
      </body>
    </html>
  );
}
