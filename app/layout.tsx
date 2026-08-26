import type { Metadata } from "next";
import "./globals.css";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
} from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  // Scrapers need absolute URLs for the icons and share card, and the domain is
  // still temporary — so it moves with an env var rather than a code change.
  metadataBase: new URL(SITE_URL),
  title: "ASOGrade - App Store keyword research in your browser",
  description: "Score App Store keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts. Paste 100 ideas, get answers in seconds — no install.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ASOGrade - App Store keyword research in your browser",
    description: "Paste 100 keyword ideas. Get demand, difficulty and the ranking set behind each one, scored across 109 App Store markets.",
    type: "website",
    url: SITE_URL,
    siteName: "ASOGrade",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASOGrade - App Store keyword research in your browser",
    description: "Paste 100 keyword ideas. Get demand, difficulty and the ranking set behind each one, scored across 109 App Store markets.",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..1000&family=Geist+Mono:wght@400..600&family=Outfit:wght@500..800&display=swap"
          rel="stylesheet"
        />
        {/* Site-wide JSON-LD. Page-level schema (FAQ, breadcrumbs, articles)
            is emitted by each route from the same lib/seo/schema builders. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
