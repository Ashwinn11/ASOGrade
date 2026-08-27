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
  title: "ASOGrade - ASO Tool for iOS Developers",
  description: "App Store Optimization for iOS developers. Score keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts. Nothing to install.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ASOGrade: App Store Optimization Tool for iOS Developers",
    description: "ASOGrade helps you improve the visibility of your app on the App Store. Score any keyword for search demand and ranking difficulty, and compare all 109 markets.",
    type: "website",
    url: SITE_URL,
    siteName: "ASOGrade",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASOGrade: App Store Optimization Tool for iOS Developers",
    description: "ASOGrade helps you improve the visibility of your app on the App Store. Score any keyword for search demand and ranking difficulty, and compare all 109 markets.",
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
    /* `data-scroll-behavior` is what lets Next disable the smooth scroll in
       globals.css during a route transition. Without it every navigation
       animates the scroll back to the top instead of jumping, which reads as
       lag on a long page like the landing one. */
    <html lang="en" data-scroll-behavior="smooth">
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
