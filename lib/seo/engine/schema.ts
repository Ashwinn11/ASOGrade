/**
 * Schema.org JSON-LD Graph Builder
 *
 * Constructs connected Schema.org entities linked via unified `@graph` arrays
 * and unambiguous `@id` node identifiers for Search Engines, AI Overviews, and RAG agents.
 */

import { SITE_URL } from "@/lib/seo/site";
import { DEFAULT_OG_IMAGE } from "./metadata";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Stable Organization reference.
 */
export function organizationReference() {
  return { "@id": ORG_ID };
}

/**
 * Site-wide Organization schema.
 */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "ASOGrade",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description:
      "ASOGrade is a browser-based App Store keyword research tool that scores keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts.",
    email: "support@asograde.com",
    sameAs: [
      "https://twitter.com/asograde",
      "https://github.com/asograde",
    ],
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

/**
 * Site-wide WebSite schema.
 */
export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "ASOGrade",
    url: SITE_URL,
    description:
      "Score App Store keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts.",
    publisher: organizationReference(),
    inLanguage: "en-US",
  };
}

/**
 * SoftwareApplication schema.
 */
export function buildSoftwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "ASOGrade",
    url: SITE_URL,
    description:
      "Browser-based App Store keyword research tool. Score keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts — no install required.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "App Store Optimization",
    operatingSystem: "Web (any modern browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: "en",
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
    offers: [
      {
        "@type": "Offer",
        name: "Monthly Plan",
        price: "14.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Yearly Plan",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
    ],
    creator: organizationReference(),
  };
}

/**
 * BreadcrumbList schema builder.
 */
export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
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
 * FAQPage schema builder.
 */
export function buildFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: (items ?? []).map((item) => ({
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
 * DefinedTerm schema for glossary pages.
 */
export function buildDefinedTermSchema({
  term,
  definition,
  url,
}: {
  term: string;
  definition: string;
  url: string;
}) {
  return {
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
 * Article schema for guides and in-depth articles.
 */
export function buildArticleSchema({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  datePublished = "2025-01-01T00:00:00Z",
  dateModified = new Date().toISOString(),
}: {
  title: string;
  description: string;
  url: string;
  image?: { url: string; width: number; height: number };
  datePublished?: string;
  dateModified?: string;
}) {
  const imageUrl = image.url.startsWith("http") ? image.url : `${SITE_URL}${image.url}`;
  return {
    "@type": "Article",
    headline: title,
    description,
    url,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: image.width,
      height: image.height,
    },
    datePublished,
    dateModified,
    author: organizationReference(),
    publisher: organizationReference(),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

/**
 * WebPage / ItemPage schema.
 */
export function buildWebPageSchema({
  title,
  description,
  url,
  type = "WebPage",
}: {
  title: string;
  description: string;
  url: string;
  type?: "WebPage" | "CollectionPage" | "ItemPage";
}) {
  return {
    "@type": type,
    name: title,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: organizationReference(),
    inLanguage: "en-US",
  };
}

/**
 * Combine multiple schemas into a single unified JSON-LD @graph.
 */
export function buildUnifiedGraphSchema(nodes: (object | null | undefined)[]) {
  const cleanNodes = nodes.filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": cleanNodes,
  };
}
