import type { MetadataRoute } from "next";
import { STORES } from "@/lib/types";
import { GLOSSARY } from "@/lib/seo/glossary";
import { GUIDES } from "@/lib/seo/guides";
import { COMPARE_DATA } from "@/lib/seo/compare";
import { SOLUTION_DETAILS } from "@/lib/seo/solutions";
import { PERSONAS } from "@/lib/seo/personas";
import { LOCALIZATIONS } from "@/lib/seo/localization";
import { TIPS } from "@/lib/seo/tips";

/* Read from the same arrays the routes generate from, so a new page cannot
   ship without a sitemap entry. These two were hand-listed here while their
   content still lived inline in the route files. */
const COMPARE_SLUGS = COMPARE_DATA.map((d) => d.slug);
const SOLUTION_SLUGS = SOLUTION_DETAILS.map((d) => d.slug);

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    /* /pricing, not /onboarding. The funnel is noindex and gated behind Google
       sign-in, so it had nothing to offer a crawler but a spinner; the price
       it was ranked for now lives on a server-rendered page of its own. */
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
  ];

  const hubRoutes: MetadataRoute.Sitemap = [
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

  const storeRoutes: MetadataRoute.Sitemap = STORES.map(([code]) => ({
    url: `${siteUrl}/keyword-research/${code}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = GLOSSARY.map((entry) => ({
    url: `${siteUrl}/glossary/${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const compareRoutes: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((slug) => ({
    url: `${siteUrl}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const personaRoutes: MetadataRoute.Sitemap = PERSONAS.map((p) => ({
    url: `${siteUrl}/for/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const localizationRoutes: MetadataRoute.Sitemap = LOCALIZATIONS.map((l) => ({
    url: `${siteUrl}/localization/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tipRoutes: MetadataRoute.Sitemap = TIPS.map((t) => ({
    url: `${siteUrl}/tips/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...coreRoutes,
    ...hubRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...compareRoutes,
    ...solutionRoutes,
    ...personaRoutes,
    ...localizationRoutes,
    ...tipRoutes,
    ...storeRoutes,
  ];
}
