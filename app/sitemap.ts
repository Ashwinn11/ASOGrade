import type { MetadataRoute } from "next";
import { STORES } from "@/lib/types";
import { GLOSSARY } from "@/lib/seo/glossary";
import { GUIDES } from "@/lib/seo/guides";

const COMPARE_SLUGS = ["guessing", "spreadsheets", "aso-suites", "agencies"];
const SOLUTION_SLUGS = [
  "finding-keyword-ideas",
  "winnable-keywords",
  "competitor-keywords",
  "international-markets",
  "research-time",
  "tool-cost",
];

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
    {
      url: `${siteUrl}/start`,
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

  return [
    ...coreRoutes,
    ...hubRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...compareRoutes,
    ...solutionRoutes,
    ...storeRoutes,
  ];
}
