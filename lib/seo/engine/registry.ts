/**
 * Programmatic Content Registry
 *
 * Centralizes access, indexing, validation, and relationships across all
 * programmatic SEO data layers. Provides O(1) indexed lookups and relationship maps.
 */

import { STORES, POPULAR } from "@/lib/types";
import { STORE_INFO, scriptOf } from "@/lib/seo/countries";
import { GLOSSARY, type GlossaryEntry } from "@/lib/seo/glossary";
import { GUIDES, type GuideEntry } from "@/lib/seo/guides";
import { COMPARE_DATA, type ComparePageData } from "@/lib/seo/compare";
import { PERSONAS, type PersonaDetail } from "@/lib/seo/personas";
import { SOLUTION_DETAILS, type SolutionDetail } from "@/lib/seo/solutions";
import { LOCALIZATIONS, type LocalizationDetail } from "@/lib/seo/localization";
import { TIPS, type TipEntry } from "@/lib/seo/tips";
import type {
  StorefrontEntity,
  GlossaryEntity,
  GuideEntity,
  CompareEntity,
  PersonaEntity,
  SolutionEntity,
  LocalizationEntity,
  TipEntity,
  PseoCategory,
  AnyPseoEntity,
} from "./types";

// ---------------------------------------------------------------------------
// Storefront Entities Index
// ---------------------------------------------------------------------------

export const STOREFRONT_ENTITIES: StorefrontEntity[] = STORES.map(([code, name]) => {
  const info = STORE_INFO[code] ?? {
    name,
    region: "europe",
    tier: "emerging",
    lang: "English",
    langCode: "en",
    facts: [`App Store keyword research and demand scoring for the ${name} storefront.`],
  };

  const isMajor = POPULAR.includes(code);
  const reachStores = STORES.filter(
    ([c]) => c !== code && STORE_INFO[c]?.langCode === info.langCode
  );
  const reachCount = reachStores.length;
  const reachPercent = Math.round(((reachCount + 1) / STORES.length) * 100);

  // Script efficiency multiplier relative to standard Latin characters
  const scriptName = scriptOf(code);
  let scriptEfficiency = 1.0;
  if (scriptName.includes("Kanji") || scriptName.includes("CJK")) {
    scriptEfficiency = 2.5; // High semantic density per character
  } else if (scriptName.includes("Hangul") || scriptName.includes("Arabic")) {
    scriptEfficiency = 1.8;
  } else if (scriptName.includes("Cyrillic")) {
    scriptEfficiency = 1.1;
  }

  // Difficulty delta vs US baseline
  const averageDifficultyDiscount =
    info.tier === "major" && code === "us"
      ? 0
      : info.tier === "major"
      ? -10
      : info.tier === "mid"
      ? -20
      : -35;

  const competitionIndex =
    info.tier === "major" ? (code === "us" ? 100 : 85) : info.tier === "mid" ? 55 : 25;

  return {
    category: "storefront",
    slug: code,
    code,
    name,
    region: info.region,
    tier: info.tier,
    lang: info.lang,
    langCode: info.langCode,
    script: scriptName,
    facts: info.facts,
    isMajor,
    title: `App Store Keyword Research: ${name} (${code.toUpperCase()})`,
    metaTitle: `App Store Keyword Research: ${name} | ASOGrade`,
    description: `Score App Store keywords for the ${name} storefront. Uncover Apple Search Ads demand, ranking difficulty, and localized metadata strategy for a ${info.tier} market.`,
    canonicalPath: `/keyword-research/${code}`,
    marketMetrics: {
      languageReachCount: reachCount,
      languageReachPercent: reachPercent,
      scriptCharacterEfficiency: scriptEfficiency,
      competitionIndex,
      averageDifficultyDiscount,
      topSearchVerticals: [
        "Productivity & Utilities",
        "Health & Fitness",
        "Business & Finance",
        "Games & Entertainment",
      ],
    },
    faq: [
      {
        q: `How does App Store keyword difficulty in ${name} compare to the US?`,
        a:
          info.tier === "major" && code === "us"
            ? "The US storefront is the baseline for global App Store difficulty and Apple Search Ads popularity calibration. Competition is highest here."
            : `Keyword difficulty in ${name} averages approximately ${Math.abs(
                averageDifficultyDiscount
              )} points lower than the US for comparable search terms, providing high-ROI opportunities to rank quickly.`,
      },
      {
        q: `What language metadata does Apple index for ${name}?`,
        a:
          reachCount > 0
            ? `The primary search language in ${name} is ${info.lang}. One ${info.lang} metadata set indexes across ${
                reachCount + 1
              } storefronts in total.`
            : `Apple primarily indexes ${info.lang} metadata for ${name}. Localizing your title, subtitle, and 100-character keyword field specifically into ${info.lang} captures direct local search volume.`,
      },
      {
        q: `Which metadata fields should I optimize for ${name}?`,
        a: "Apple indexes the 30-character App Title, 30-character Subtitle, and 100-character Keyword field. The full 4,000-character description and promotional text are not indexed for organic search ranking.",
      },
    ],
  };
});

// ---------------------------------------------------------------------------
// Glossary Entities Index
// ---------------------------------------------------------------------------

export const GLOSSARY_ENTITIES: GlossaryEntity[] = GLOSSARY.map((item: GlossaryEntry) => ({
  category: "glossary",
  slug: item.slug,
  term: item.term,
  title: `${item.term} — ASO Glossary`,
  metaTitle: `${item.term} — ASO Glossary | ASOGrade`,
  definition: item.definition,
  description: item.metaDescription ?? item.definition,
  canonicalPath: `/glossary/${item.slug}`,
  body: item.body,
  relatedSlugs: item.related,
  faq: item.faq,
}));

// ---------------------------------------------------------------------------
// Guide Entities Index
// ---------------------------------------------------------------------------

export const GUIDE_ENTITIES: GuideEntity[] = GUIDES.map((g: GuideEntry) => {
  const totalWords = g.sections.reduce(
    (acc, sec) => acc + sec.body.reduce((sAcc, p) => sAcc + p.split(/\s+/).length, 0),
    0
  );
  const readingTimeMinutes = Math.max(3, Math.round(totalWords / 200));

  return {
    category: "guide",
    slug: g.slug,
    title: g.title,
    metaTitle: g.metaTitle ?? `${g.title} | ASOGrade`,
    description: g.description,
    canonicalPath: `/guides/${g.slug}`,
    readingTimeMinutes,
    sections: g.sections,
    relatedItems: g.related,
    faq: g.faq,
  };
});

// ---------------------------------------------------------------------------
// Competitor Entities Index
// ---------------------------------------------------------------------------

export const COMPARE_ENTITIES: CompareEntity[] = COMPARE_DATA.map((c: ComparePageData) => ({
  category: "compare",
  slug: c.slug,
  competitorName: c.slug,
  title: c.title,
  metaTitle: `${c.title} | ASOGrade`,
  subtitle: c.subtitle,
  description: c.description,
  canonicalPath: `/compare/${c.slug}`,
  priceRange: "$79–$499/mo",
  setupTime: "15–30 mins",
  platform: "Web",
  quickVerdict: c.quickVerdict ?? {
    summary: c.description,
    bestForCompetitor: "Full multi-platform marketing suites with ad tracking.",
    bestForAsograde: "Fast, focused App Store keyword difficulty and popularity scoring across 109 storefronts.",
  },
  comparisonMatrix: [
    {
      feature: "109 Storefronts Analysis",
      asograde: "Included",
      competitor: "Limited or tiered",
      advantage: "asograde",
    },
    {
      feature: "Apple Search Ads Popularity",
      asograde: "Live Demand Signal",
      competitor: "Estimated / Modeled",
      advantage: "asograde",
    },
  ],
  breakdown: [
    {
      heading: "What this approach does well",
      paragraphs: c.whatThisApproachDoes,
    },
    {
      heading: "Where it falls short",
      paragraphs: c.whereItFalls,
    },
  ],
  faq: c.faq,
}));

// ---------------------------------------------------------------------------
// Persona Entities Index
// ---------------------------------------------------------------------------

export const PERSONA_ENTITIES: PersonaEntity[] = PERSONAS.map((p: PersonaDetail) => ({
  category: "persona",
  slug: p.slug,
  audience: p.audience,
  title: p.title,
  metaTitle: p.metaTitle ?? `${p.title} | ASOGrade`,
  subtitle: p.subtitle,
  description: p.description,
  canonicalPath: `/for/${p.slug}`,
  breakdown: p.breakdown,
  goodFit: p.goodFit,
  notGoodFit: p.notGoodFit,
  howItWorks: p.howItWorks,
  faq: p.faq,
}));

// ---------------------------------------------------------------------------
// Solution Entities Index
// ---------------------------------------------------------------------------

export const SOLUTION_ENTITIES: SolutionEntity[] = SOLUTION_DETAILS.map((s: SolutionDetail) => ({
  category: "solution",
  slug: s.slug,
  fixKey: s.fixKey,
  title: s.title,
  metaTitle: s.metaTitle ?? `${s.title} | ASOGrade`,
  subtitle: s.subtitle,
  description: s.description,
  canonicalPath: `/solutions/${s.slug}`,
  breakdown: s.breakdown,
  howItWorks: s.howItWorks,
  faq: s.faq,
}));

// ---------------------------------------------------------------------------
// Localization Entities Index
// ---------------------------------------------------------------------------

export const LOCALIZATION_ENTITIES: LocalizationEntity[] = LOCALIZATIONS.map(
  (l: LocalizationDetail) => ({
    category: "localization",
    slug: l.slug,
    language: l.language,
    langCode: l.slug,
    title: `App Store Keyword Research in ${l.language}`,
    metaTitle: `App Store Keyword Research in ${l.language} | ASOGrade`,
    description: `Optimize App Store keywords for ${l.language}-speaking markets. Discover multi-storefront indexing rules and cross-country localization strategy.`,
    canonicalPath: `/localization/${l.slug}`,
    storesCovered: l.storefronts.map((s) => s.code),
    primaryMarket: l.storefronts[0]?.name ?? l.language,
    facts: l.registerNotes,
    keywordStrategies: l.breakdown,
    faq: l.faq,
  })
);

// ---------------------------------------------------------------------------
// Tip Entities Index
// ---------------------------------------------------------------------------

export const TIP_ENTITIES: TipEntity[] = TIPS.map((t: TipEntry) => {
  const fullDesc =
    t.shortAnswer.length < 50
      ? `${t.shortAnswer} ${t.explanation[0] ?? ""}`.trim()
      : t.shortAnswer;

  return {
    category: "tip",
    slug: t.slug,
    title: t.question,
    metaTitle: t.metaTitle ?? `${t.question} | ASOGrade`,
    description: fullDesc,
    canonicalPath: `/tips/${t.slug}`,
    shortAnswer: t.shortAnswer,
    explanation: t.explanation,
    relatedSlugs: t.related.map((r) => r.slug),
    faq: [
      {
        q: t.question,
        a: fullDesc,
      },
    ],
  };
});

// ---------------------------------------------------------------------------
// Unified Lookups & Graph Indices
// ---------------------------------------------------------------------------

const storefrontByCode = new Map<string, StorefrontEntity>(
  STOREFRONT_ENTITIES.map((e) => [e.code.toLowerCase(), e])
);

const glossaryBySlug = new Map<string, GlossaryEntity>(
  GLOSSARY_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const guideBySlug = new Map<string, GuideEntity>(
  GUIDE_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const compareBySlug = new Map<string, CompareEntity>(
  COMPARE_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const personaBySlug = new Map<string, PersonaEntity>(
  PERSONA_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const solutionBySlug = new Map<string, SolutionEntity>(
  SOLUTION_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const localizationBySlug = new Map<string, LocalizationEntity>(
  LOCALIZATION_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

const tipBySlug = new Map<string, TipEntity>(
  TIP_ENTITIES.map((e) => [e.slug.toLowerCase(), e])
);

/**
 * Get an entity by category and slug/code with O(1) performance.
 */
export function getPseoEntity(category: PseoCategory, slugOrCode: string): AnyPseoEntity | null {
  const key = slugOrCode.toLowerCase();
  switch (category) {
    case "storefront":
      return storefrontByCode.get(key) ?? null;
    case "glossary":
      return glossaryBySlug.get(key) ?? null;
    case "guide":
      return guideBySlug.get(key) ?? null;
    case "compare":
      return compareBySlug.get(key) ?? null;
    case "persona":
      return personaBySlug.get(key) ?? null;
    case "solution":
      return solutionBySlug.get(key) ?? null;
    case "localization":
      return localizationBySlug.get(key) ?? null;
    case "tip":
      return tipBySlug.get(key) ?? null;
    default:
      return null;
  }
}

/**
 * Priority Tier 1 Slugs for static build generation (SSG).
 * Remaining 100,000+ long-tail pages are dynamically handled via on-demand ISR.
 */
export const PRIORITY_STORE_CODES = POPULAR;
export const PRIORITY_GLOSSARY_SLUGS = GLOSSARY_ENTITIES.slice(0, 30).map((g) => g.slug);
export const PRIORITY_GUIDE_SLUGS = GUIDE_ENTITIES.map((g) => g.slug);
export const PRIORITY_COMPARE_SLUGS = COMPARE_ENTITIES.map((c) => c.slug);
export const PRIORITY_PERSONA_SLUGS = PERSONA_ENTITIES.map((p) => p.slug);
export const PRIORITY_SOLUTION_SLUGS = SOLUTION_ENTITIES.map((s) => s.slug);
export const PRIORITY_LOCALIZATION_SLUGS = LOCALIZATION_ENTITIES.map((l) => l.slug);
export const PRIORITY_TIP_SLUGS = TIP_ENTITIES.slice(0, 30).map((t) => t.slug);
