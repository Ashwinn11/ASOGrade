import type { NextRequest } from "next/server";
import { GLOSSARY } from "@/lib/seo/glossary";
import { TIPS } from "@/lib/seo/tips";
import { GUIDES } from "@/lib/seo/guides";
import { COMPARE_DATA } from "@/lib/seo/compare";

export const dynamic = "force-static";

/**
 * Unabridged companion to /llms.txt, per the emerging llms-full.txt
 * convention: one fetch gets a RAG system the full glossary and every quick
 * answer, instead of requiring it to crawl 120+ individual pages to assemble
 * the same facts. Guides and comparisons are indexed by title/description
 * only — their full bodies are long-form workflow content meant to be read
 * as pages, not flattened into a reference dump.
 */
export function GET(_req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

  const glossarySection = GLOSSARY.map(
    (g) => `### ${g.term}\n${g.definition}\nURL: ${siteUrl}/glossary/${g.slug}`
  ).join("\n\n");

  const tipsSection = TIPS.map(
    (t) => `### ${t.question}\n${t.shortAnswer}\nURL: ${siteUrl}/tips/${t.slug}`
  ).join("\n\n");

  const guidesSection = GUIDES.map(
    (g) => `- ${g.title} — ${g.description} (${siteUrl}/guides/${g.slug})`
  ).join("\n");

  const compareSection = COMPARE_DATA.map(
    (c) => `- ${c.title} (${siteUrl}/compare/${c.slug})`
  ).join("\n");

  const content = `# ASOGrade — Full Reference

> Complete glossary and quick-answer index for AI assistants and RAG systems.
> For a short overview, see ${siteUrl}/llms.txt instead.

ASOGrade is a browser-based App Store keyword research tool. It scores keywords by Apple Search Ads demand (popularity) and ranking difficulty across 109 storefronts. $14.99/month or $99/year, no free tier, App Store (iOS) only — no Google Play. Not affiliated with Apple Inc.

## Glossary (${GLOSSARY.length} terms)

${glossarySection}

## Quick answers (${TIPS.length} questions)

${tipsSection}

## Guides index (${GUIDES.length} guides — full text at each URL)

${guidesSection}

## Comparison pages (full text at each URL)

${compareSection}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
