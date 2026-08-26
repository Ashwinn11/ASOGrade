import type { Metadata } from "next";
import "./globals.css";

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
  const siteUrl = SITE_URL;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ASOGrade",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description:
      "ASOGrade is a browser-based App Store keyword research tool that scores keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts.",
    email: "support@asograde.com",
    knowsAbout: [
      "App Store Optimization",
      "App Store Keyword Research",
      "Apple Search Ads",
      "ASO Keyword Difficulty",
      "Mobile App Marketing",
      "iOS App Store Rankings",
      "App Store Storefronts",
      "Keyword Demand Analysis",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ASOGrade",
    url: siteUrl,
    description:
      "Score App Store keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/app?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ASOGrade",
    url: siteUrl,
    description:
      "Browser-based App Store keyword research tool. Score keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts — no install required.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "App Store Optimization",
    operatingSystem: "Web (any modern browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: "en",
    isAccessibleForFree: true,
    featureList: [
      "Keyword demand scoring based on Apple Search Ads data",
      "Ranking difficulty analysis per storefront",
      "109 App Store storefronts supported",
      "Bulk keyword analysis — paste up to 100 keywords",
      "Competitor keyword set analysis",
      "No software installation required",
      "Keyword list saved to your account",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Indie developers, small studios, app marketers, ASO professionals",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "ASOGrade",
      url: siteUrl,
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..1000&family=Geist+Mono:wght@400..600&family=Outfit:wght@500..800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data — fixes AI search visibility warning from SEO audit */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
