/**
 * Shared JSON-LD schema builders for all ASOGrade pages.
 *
 * Centralises structured data construction so there's one place to update when
 * schema.org vocabulary changes, and so templates can import only what they need.
 *
 * All builders return plain objects (not JSON strings) — callers are responsible
 * for JSON.stringify() when embedding in <script type="application/ld+json">.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

// ---------------------------------------------------------------------------
// Reusable sub-objects
// ---------------------------------------------------------------------------

function organization() {
  return {
    "@type": "Organization",
    name: "ASOGrade",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
  };
}

// ---------------------------------------------------------------------------
// Page-level schema builders
// ---------------------------------------------------------------------------

/**
 * FAQPage schema for pages with Q+A pairs.
 * Renders as rich results in Google Search when validated.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * BreadcrumbList schema for sub-pages.
 * Renders as breadcrumb trail in Google Search results.
 *
 * @param crumbs Array of {name, url} — ordered from root to current page
 */
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * DefinedTerm schema for glossary pages.
 * Signals to search engines that this page defines a concept.
 */
export function definedTermSchema({
  term,
  definition,
  url,
}: {
  term: string;
  definition: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "ASOGrade ASO Glossary",
      url: `${SITE_URL}/glossary`,
    },
  };
}

/**
 * Article schema for long-form guide pages.
 * Used by AI search engines and Google Discover for citation attribution.
 */
export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: organization(),
    publisher: organization(),
    inLanguage: "en",
    isAccessibleForFree: true,
  };
}

/**
 * WebPage schema for hub/index pages.
 */
export function webPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "ASOGrade",
      url: SITE_URL,
    },
    publisher: organization(),
    inLanguage: "en",
  };
}

/**
 * CollectionPage schema for hub/index pages that list resources.
 */
export function collectionPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    publisher: organization(),
    inLanguage: "en",
  };
}

// Site-wide schemas, emitted once from the root layout.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ASOGrade",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
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
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ASOGrade",
    url: SITE_URL,
    description:
      "Score App Store keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts.",
    /* No `potentialAction`/SearchAction. It advertised a sitelinks searchbox
       pointing at the workspace's `?q=` — a page behind Google sign-in and
       disallowed in robots.txt, so a crawler could neither reach it nor use it.
       A searchbox target has to be a public URL, and there isn't one to offer;
       claiming otherwise is a broken signal rather than a missing feature. */
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ASOGrade",
    url: SITE_URL,
    description:
      "Browser-based App Store keyword research tool. Score keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts — no install required.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "App Store Optimization",
    operatingSystem: "Web (any modern browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: "en",
    // Paid-only: there is no free tier. Claiming otherwise here is structured
    // data that contradicts the pricing on the page, which is what gets a
    // SoftwareApplication block ignored or flagged.
    isAccessibleForFree: false,
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
      audienceType:
        "Indie developers, small studios, app marketers, ASO professionals",
    },
    // The real plans, so the rich result and the pricing section agree.
    offers: [
      {
        "@type": "Offer",
        name: "Monthly",
        price: "14.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Yearly",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
    ],
    creator: organization(),
  };
}
