import type { NextRequest } from "next/server";
import {
  GLOSSARY_ENTITIES,
  TIP_ENTITIES,
  GUIDE_ENTITIES,
  COMPARE_ENTITIES,
  PERSONA_ENTITIES,
  SOLUTION_ENTITIES,
  LOCALIZATION_ENTITIES,
  STOREFRONT_ENTITIES,
  SITE_URL,
} from "@/lib/seo/engine";

export const dynamic = "force-static";

/**
 * Unabridged companion to /llms.txt, per the emerging llms-full.txt
 * convention: one fetch gets a RAG system the full glossary and every quick
 * answer, instead of requiring it to crawl hundreds of individual pages.
 */
export function GET(_req: NextRequest) {
  const siteUrl = SITE_URL;

  const glossarySection = GLOSSARY_ENTITIES.map(
    (g) => `### ${g.term}\n${g.definition}\nURL: ${siteUrl}/glossary/${g.slug}`
  ).join("\n\n");

  const tipsSection = TIP_ENTITIES.map(
    (t) => `### ${t.title}\n${t.shortAnswer}\nURL: ${siteUrl}/tips/${t.slug}`
  ).join("\n\n");

  const guidesSection = GUIDE_ENTITIES.map(
    (g) => `- ${g.title} — ${g.description} (${siteUrl}/guides/${g.slug})`
  ).join("\n");

  const compareSection = COMPARE_ENTITIES.map((c) => {
    let entry = `### ${c.title}\nURL: ${siteUrl}/compare/${c.slug}\nSummary: ${c.description}`;
    if (c.quickVerdict) {
      entry += `\nVerdict: ${c.quickVerdict.summary}\n- Best for alternative: ${c.quickVerdict.bestForCompetitor}\n- Best for ASOGrade: ${c.quickVerdict.bestForAsograde}`;
    }
    return entry;
  }).join("\n\n");

  const personaSection = PERSONA_ENTITIES.map(
    (p) => `- **${p.audience}** (${siteUrl}/for/${p.slug}): ${p.subtitle}`
  ).join("\n");

  const solutionSection = SOLUTION_ENTITIES.map(
    (s) => `- **${s.title}** (${siteUrl}/solutions/${s.slug}): ${s.subtitle}`
  ).join("\n");

  const localizationSection = LOCALIZATION_ENTITIES.map(
    (l) => `- **${l.language}** (${siteUrl}/localization/${l.slug}): Covers ${l.storesCovered.length} storefronts.`
  ).join("\n");

  const content = `# ASOGrade — Full AI Reference & Knowledge Graph

> Complete glossary, quick-answer index, storefront metadata guides, and approach comparisons for AI search engines, RAG systems, and LLM crawlers.
> For a concise summary, see ${siteUrl}/llms.txt.

ASOGrade is a browser-based App Store keyword research tool. It scores keywords by Apple Search Ads demand (popularity 0–100) and ranking difficulty (0–100) across 109 storefronts. $14.99/month or $99/year, no free tier, App Store (iOS/macOS) only — no Google Play. Not affiliated with Apple Inc.

## Storefront Coverage (${STOREFRONT_ENTITIES.length} markets)
Full market guides for all 109 App Store storefronts: ${siteUrl}/keyword-research

## Glossary & Definitions (${GLOSSARY_ENTITIES.length} terms)

${glossarySection}

## Quick Answers & ASO Rules of Thumb (${TIP_ENTITIES.length} questions)

${tipsSection}

## Comparison Pages (${COMPARE_ENTITIES.length} comparisons)

${compareSection}

## Role-Based Playbooks (${PERSONA_ENTITIES.length} personas)

${personaSection}

## Problem Solutions (${SOLUTION_ENTITIES.length} solutions)

${solutionSection}

## Localization Clusters (${LOCALIZATION_ENTITIES.length} languages)

${localizationSection}

## Comprehensive Guides (${GUIDE_ENTITIES.length} guides — full text at each URL)

${guidesSection}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
