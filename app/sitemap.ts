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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_URL;
  const now = new Date();

  // Core static pages & category hubs
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

  // Storefront programmatic pages (109 markets)
  const storefrontRoutes: MetadataRoute.Sitemap = STOREFRONT_ENTITIES.map((s) => ({
    url: `${siteUrl}${s.canonicalPath}`,
    lastModified: now,
    changeFrequency: s.isMajor ? "weekly" : "monthly",
    priority: s.isMajor ? 0.8 : 0.7,
  }));

  // Glossary terms
  const glossaryRoutes: MetadataRoute.Sitemap = GLOSSARY_ENTITIES.map((g) => ({
    url: `${siteUrl}${g.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Comprehensive Guides
  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ENTITIES.map((g) => ({
    url: `${siteUrl}${g.canonicalPath}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Competitor alternatives & Solutions
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

  // Localization & Tips
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

  return [
    ...coreAndHubs,
    ...storefrontRoutes,
    ...glossaryRoutes,
    ...guideRoutes,
    ...compareRoutes,
    ...solutionRoutes,
    ...personaRoutes,
    ...localizationRoutes,
    ...tipRoutes,
  ];
}
