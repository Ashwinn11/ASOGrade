/**
 * Graph-Based Internal Linking Engine
 *
 * Computes dynamic, semantic hub-and-spoke connections, contextual cross-cluster
 * relationships, and structured breadcrumb hierarchies to prevent orphan pages
 * and maximize PageRank distribution across large-scale programmatic architectures.
 */

import { SITE_URL } from "@/lib/seo/site";
import {
  STOREFRONT_ENTITIES,
  GLOSSARY_ENTITIES,
  GUIDE_ENTITIES,
  COMPARE_ENTITIES,
  PERSONA_ENTITIES,
  SOLUTION_ENTITIES,
  LOCALIZATION_ENTITIES,
  TIP_ENTITIES,
} from "./registry";
import type {
  StorefrontEntity,
  GlossaryEntity,
  GuideEntity,
  CompareEntity,
  LinkCardItem,
  BreadcrumbItem,
  SchemaCrumb,
  PseoCategory,
} from "./types";

/**
 * Get related storefronts based on region, language, and market tier.
 */
export function getRelatedStorefronts(
  currentCode: string,
  limit = 8
): StorefrontEntity[] {
  const current = STOREFRONT_ENTITIES.find((s) => s.code === currentCode.toLowerCase());
  if (!current) return STOREFRONT_ENTITIES.slice(0, limit);

  // Score candidate storefronts by shared language (3 pts), shared region (2 pts), shared tier (1 pt)
  const scored = STOREFRONT_ENTITIES.filter((s) => s.code !== current.code).map((s) => {
    let score = 0;
    if (s.langCode === current.langCode) score += 3;
    if (s.region === current.region) score += 2;
    if (s.tier === current.tier) score += 1;
    if (s.isMajor) score += 0.5;
    return { store: s, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.store);
}

/**
 * Get related glossary terms based on tag / semantic overlap.
 */
export function getRelatedGlossaryTerms(
  currentSlug: string,
  limit = 6
): GlossaryEntity[] {
  const current = GLOSSARY_ENTITIES.find((g) => g.slug === currentSlug.toLowerCase());
  if (!current) return GLOSSARY_ENTITIES.slice(0, limit);

  // Explicit related list first
  const explicit = current.relatedSlugs
    .map((slug) => GLOSSARY_ENTITIES.find((g) => g.slug === slug))
    .filter(Boolean) as GlossaryEntity[];

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Fill remainder with other terms
  const remainder = GLOSSARY_ENTITIES.filter(
    (g) => g.slug !== current.slug && !explicit.some((e) => e.slug === g.slug)
  );

  return [...explicit, ...remainder].slice(0, limit);
}

/**
 * Get related guides for a given guide slug.
 */
export function getRelatedGuides(currentSlug: string, limit = 4): GuideEntity[] {
  const current = GUIDE_ENTITIES.find((g) => g.slug === currentSlug.toLowerCase());
  if (!current) return GUIDE_ENTITIES.slice(0, limit);

  const explicit = current.relatedItems
    .filter((r) => r.type === "guide")
    .map((r) => GUIDE_ENTITIES.find((g) => g.slug === r.slug))
    .filter(Boolean) as GuideEntity[];

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const remainder = GUIDE_ENTITIES.filter(
    (g) => g.slug !== current.slug && !explicit.some((e) => e.slug === g.slug)
  );

  return [...explicit, ...remainder].slice(0, limit);
}

/**
 * Get contextual cross-cluster links for a storefront.
 */
export function getStorefrontContextualLinks(storeCode: string): {
  languageCluster?: LinkCardItem;
  relatedGuides: LinkCardItem[];
  relatedGlossary: LinkCardItem[];
} {
  const store = STOREFRONT_ENTITIES.find((s) => s.code === storeCode.toLowerCase());
  if (!store) {
    return {
      relatedGuides: [],
      relatedGlossary: [],
    };
  }

  // Find corresponding language cluster if available
  const langMatch = LOCALIZATION_ENTITIES.find(
    (l) => l.langCode === store.langCode || l.storesCovered.includes(store.code)
  );

  const languageCluster: LinkCardItem | undefined = langMatch
    ? {
        title: `${langMatch.language} App Store Localization`,
        description: `Learn how ${langMatch.language} metadata reaches ${langMatch.storesCovered.length} storefronts simultaneously.`,
        href: `/localization/${langMatch.slug}`,
        badge: `${langMatch.storesCovered.length} Stores`,
      }
    : undefined;

  const relatedGuides: LinkCardItem[] = [
    {
      title: "Evaluate Keyword Difficulty Across Storefronts",
      description: "How to interpret difficulty scores when localizing into secondary markets.",
      href: "/guides/evaluate-keyword-difficulty",
    },
    {
      title: "How to Find Low-Competition Keywords",
      description: "Uncover high-demand, winnable terms before writing your metadata.",
      href: "/guides/low-competition-app-store-keywords",
    },
  ];

  const relatedGlossary: LinkCardItem[] = [
    {
      title: "Apple Search Ads Popularity",
      description: "The 0–100 demand signal powering ASOGrade keyword scores.",
      href: "/glossary/apple-search-ads-popularity",
    },
    {
      title: "Keyword Difficulty",
      description: "How ranking competitiveness is calculated per App Store market.",
      href: "/glossary/keyword-difficulty",
    },
  ];

  return { languageCluster, relatedGuides, relatedGlossary };
}

/**
 * Universal Breadcrumb & Schema Trail Generator
 */
export function buildBreadcrumbHierarchy(
  category: PseoCategory,
  title: string,
  slug?: string
): {
  uiTrail: BreadcrumbItem[];
  schemaCrumbs: SchemaCrumb[];
} {
  const root = { label: "ASOGrade", href: "/" };
  const rootSchema = { name: "ASOGrade", url: SITE_URL };

  const hubMap: Record<PseoCategory, { label: string; href: string }> = {
    storefront: { label: "Keyword Research", href: "/keyword-research" },
    glossary: { label: "ASO Glossary", href: "/glossary" },
    guide: { label: "Guides", href: "/guides" },
    compare: { label: "Compare", href: "/compare" },
    persona: { label: "For You", href: "/for" },
    solution: { label: "Solutions", href: "/solutions" },
    localization: { label: "Localization", href: "/localization" },
    tip: { label: "ASO Tips", href: "/tips" },
  };

  const hub = hubMap[category];
  const hubSchema = { name: hub.label, url: `${SITE_URL}${hub.href}` };

  const currentPath = slug ? `${hub.href}/${slug}` : hub.href;
  const currentSchema = { name: title, url: `${SITE_URL}${currentPath}` };

  return {
    uiTrail: [root, { label: hub.label, href: hub.href }, { label: title }],
    schemaCrumbs: [rootSchema, hubSchema, currentSchema],
  };
}
