import type { MetadataRoute } from "next";
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
} from "@/lib/seo/engine";

/**
 * Sitemap IDs for scalable partitioning.
 * Keeps each chunk under Google's 50,000 URL limit and enables incremental builds.
 */
export const SITEMAP_CHUNKS = [
  { id: 0, name: "core-and-hubs" },
  { id: 1, name: "storefronts" },
  { id: 2, name: "glossary" },
  { id: 3, name: "guides" },
  { id: 4, name: "comparisons-and-solutions" },
  { id: 5, name: "localization-and-tips" },
];

export async function generateSitemaps() {
  return SITEMAP_CHUNKS.map((c) => ({ id: c.id }));
}

interface SitemapProps {
  id?: Promise<{ id: string | number }> | { id: string | number } | number | string;
}

export default async function sitemap(props?: SitemapProps): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_URL;
  const now = new Date();

  // Resolve ID across Next.js versions (synchronous, object, or Promise-wrapped)
  let rawId: unknown = props;
  if (props && typeof props === "object" && "id" in props) {
    rawId = (props as { id: unknown }).id;
    if (rawId && typeof rawId === "object" && typeof (rawId as Promise<unknown>).then === "function") {
      const resolved = await (rawId as Promise<{ id?: string | number } | string | number>);
      rawId = typeof resolved === "object" && resolved !== null && "id" in resolved ? resolved.id : resolved;
    }
  }

  const chunkId =
    rawId !== undefined && rawId !== null && rawId !== ""
      ? typeof rawId === "number"
        ? rawId
        : parseInt(String(rawId), 10)
      : null;

  // Chunk 0: Core static pages & category hubs
  const coreAndHubs: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/keyword-research`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/glossary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/compare`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/solutions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/for`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/localization`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tips`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Chunk 1: Storefront programmatic pages (109 markets)
  const storefrontRoutes: MetadataRoute.Sitemap = STOREFRONT_ENTITIES.map((s) => ({
    url: `${siteUrl}${s.canonicalPath}`,
    lastModified: now,
    changeFrequency: s.isMajor ? "weekly" : "monthly",
    priority: s.isMajor ? 0.8 : 0.7,
  }));

  // Chunk 2: Glossary terms (75+ terms)
  const glossaryRoutes: MetadataRoute.Sitemap = GLOSSARY_ENTITIES.map((g) => ({
    url: `${siteUrl}${g.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Chunk 3: Comprehensive Guides (25+ guides)
  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ENTITIES.map((g) => ({
    url: `${siteUrl}${g.canonicalPath}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Chunk 4: Competitor alternatives, Solutions, and Personas
  const compareRoutes: MetadataRoute.Sitemap = COMPARE_ENTITIES.map((c) => ({
    url: `${siteUrl}${c.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTION_ENTITIES.map((s) => ({
    url: `${siteUrl}${s.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const personaRoutes: MetadataRoute.Sitemap = PERSONA_ENTITIES.map((p) => ({
    url: `${siteUrl}${p.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const comparisonsAndSolutions = [...compareRoutes, ...solutionRoutes, ...personaRoutes];

  // Chunk 5: Localization & Actionable Tips
  const localizationRoutes: MetadataRoute.Sitemap = LOCALIZATION_ENTITIES.map((l) => ({
    url: `${siteUrl}${l.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const tipRoutes: MetadataRoute.Sitemap = TIP_ENTITIES.map((t) => ({
    url: `${siteUrl}${t.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const localizationAndTips = [...localizationRoutes, ...tipRoutes];

  // Return chunk if requested by generateSitemaps
  if (chunkId === 0) return coreAndHubs;
  if (chunkId === 1) return storefrontRoutes;
  if (chunkId === 2) return glossaryRoutes;
  if (chunkId === 3) return guideRoutes;
  if (chunkId === 4) return comparisonsAndSolutions;
  if (chunkId === 5) return localizationAndTips;

  // Fallback: full sitemap if called without an ID
  return [
    ...coreAndHubs,
    ...storefrontRoutes,
    ...glossaryRoutes,
    ...guideRoutes,
    ...comparisonsAndSolutions,
    ...localizationAndTips,
  ];
}
