import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Clarity from "./components/Clarity";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationSchema } from "./schema";
import { ServiceSchema } from "./service-schema";
import { FAQSchema } from "./faq-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swiftsense.digital"),
  applicationName: "Swift Sense Digital",

  title: {
    default: "Swift Sense Digital | AI Consultant, Automation & Business Transformation Singapore",
    template: "%s | Swift Sense Digital",
  },

  description:
  "Swift Sense Digital helps SMEs unlock their business potential through AI automation, AI websites, AI chatbots, workflow automation, CRM integration and business transformation consulting.",
  keywords: [
    "AI Singapore",
    "AI Consultant Singapore",
    "AI Automation Singapore",
    "Workflow Automation",
    "Business Automation",
    "AI Chatbot Singapore",
    "AI Website Singapore",
    "CRM Integration",
    "Business Transformation",
    "Business Process Automation",
    "SME AI",
    "Artificial Intelligence Singapore",
    "Lead Response AI",
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
    title: "Swift Sense Digital | AI Automation & Business Transformation",
    description:
    "Swift Sense Digital helps SMEs unlock their business potential through AI automation, AI websites, AI chatbots, workflow automation, CRM integration and business transformation consulting.",
    url: "https://swiftsense.digital",
    siteName: "Swift Sense Digital",
    locale: "en_SG",
    type: "website",

    images: [

      {
        url: "https://swiftsense.digital/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swift Sense Digital - Practical AI and Automation for Growing Businesses",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Swift Sense Digital | AI Automation & Business Transformation",
    description:
      "Helping SMEs improve productivity through practical AI, automation and business transformation.",
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
        <ServiceSchema />
        <FAQSchema />
        
        {children}
      </body>
    </html>
  );
}
