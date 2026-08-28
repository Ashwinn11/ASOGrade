import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
} from "@/lib/seo/schema";

/**
 * Self-hosted, replacing a render-blocking <link> to fonts.googleapis.com.
 *
 * That stylesheet request had to complete, on its own connection to a third
 * origin, before the browser could start laying out text — measured at 184ms
 * of render-blocking time by Lighthouse, on top of the DNS and TLS cost of a
 * cold connection to a host nothing else on the page touches. `next/font`
 * downloads the same three families at build time and serves them from this
 * origin, so painting text no longer waits on fonts.googleapis.com at all.
 *
 * Options mirror the stylesheet URL exactly: DM Sans keeps its `opsz` axis
 * and both load their full variable range rather than fixed cuts, since
 * globals.css spans 300–1000 (DM Sans) and 500–800 (Outfit) as fluid weights,
 * not a fixed set. `display: "swap"` matches the value the URL requested.
 */
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  // Scrapers need absolute URLs for the icons and share card, and the domain is
  // still temporary — so it moves with an env var rather than a code change.
  metadataBase: new URL(SITE_URL),
  /* The head term this whole site is built to win. The previous title
     ("ASO Tool for iOS Developers") and the hero H1 between them contained no
     phrase anybody searches, which left five weaker sub-pages competing for
     "app store keyword research" while the strongest page on the domain sat
     the query out. */
  title: "App Store Keyword Research for iOS Developers | ASOGrade",
  description: "App Store keyword research for iOS developers. Score any keyword by Apple Search Ads demand and ranking difficulty across all 109 storefronts.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "App Store Keyword Research for iOS Developers | ASOGrade",
    description: "Score any App Store keyword for search demand and ranking difficulty, and compare all 109 markets before you write your metadata.",
    type: "website",
    url: SITE_URL,
    siteName: "ASOGrade",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Store Keyword Research for iOS Developers | ASOGrade",
    description: "Score any App Store keyword for search demand and ranking difficulty, and compare all 109 markets before you write your metadata.",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${geistMono.variable} ${outfit.variable}`}
    >
      <head>
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
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
