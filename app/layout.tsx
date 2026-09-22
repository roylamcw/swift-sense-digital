import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Clarity from "./components/Clarity";
import LeadResponseAssistant from "./components/LeadResponseAssistant";
import { Analytics } from "@vercel/analytics/next";
import { LocalBusinessSchema, OrganizationSchema } from "./schema";
import { ServiceSchema } from "./service-schema";
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
    default: "Swift Sense Digital | AI Transformation Partner for SMEs",
    template: "%s | Swift Sense Digital",
  },

  description:
    "Your outsourced AI transformation partner. Assess opportunities with the AI Transformation Blueprint, implement agreed priorities and support ongoing adoption.",
  keywords: [
    "Swift Sense Digital",
    "AI Transformation Partner",
    "SME AI Singapore",
    "Business Growth Website",
    "Lead Response System",
    "WhatsApp AI Assistant",
    "SwiftChief AI Chief of Staff",
    "Transformation Blueprint",
    "Business Transformation Singapore",
    "Event Agency Website Singapore",
    "Tuition Centre Website Singapore",
    "SME Website Concept Demo",
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
    title: "Swift Sense Digital | AI Transformation Partner for SMEs",
    description:
      "Focus on your business. Explore a practical AI transformation plan, separately scoped implementation and ongoing support.",
    url: "https://www.swiftsensedigital.com",
    siteName: "Swift Sense Digital",
    locale: "en_SG",
    type: "website",

    images: [

      {
        url: "https://www.swiftsensedigital.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swift Sense Digital - AI Transformation Partner for SMEs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Swift Sense Digital | AI Transformation Partner",
    description:
      "AI transformation for SMEs: a clear Blueprint, practical implementation and ongoing support.",
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
        <SpeedInsights />

        {children}
        <LeadResponseAssistant />
      </body>
    </html>
  );
}
