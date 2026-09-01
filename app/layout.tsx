import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildSoftwareApplicationSchema,
  buildUnifiedGraphSchema,
} from "@/lib/seo/engine";
import { SITE_URL } from "@/lib/seo/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-geist-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "App Store Keyword Research for iOS Developers | ASOGrade",
  description:
    "App Store keyword research for iOS developers. Score any keyword by Apple Search Ads demand and ranking difficulty across all 109 storefronts.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "App Store Keyword Research for iOS Developers | ASOGrade",
    description:
      "Score any App Store keyword for search demand and ranking difficulty, and compare all 109 markets before you write your metadata.",
    type: "website",
    url: SITE_URL,
    siteName: "ASOGrade",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Store Keyword Research for iOS Developers | ASOGrade",
    description:
      "Score any App Store keyword for search demand and ranking difficulty, and compare all 109 markets before you write your metadata.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "ory-verify": "orynth-e64469ecaecd4f80be3a2234f6ae6710",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rootSiteGraph = buildUnifiedGraphSchema([
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildSoftwareApplicationSchema(),
  ]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${geistMono.variable} ${outfit.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSiteGraph) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
