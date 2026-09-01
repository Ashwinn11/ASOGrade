/**
 * Anti-Thin Content & Intent Differentiation Engine
 *
 * Computes market-specific analytical insights, character budget efficiency,
 * competitive discount indices, and unique intent-matched direct answer blocks
 * to ensure every programmatic page has high information gain and zero thin content.
 */

import type { StorefrontEntity, DirectAnswerBlock, FaqItem } from "./types";

/**
 * Generate unique analytical takeaways for a storefront market.
 */
export function generateStorefrontInsights(store: StorefrontEntity): {
  directAnswer: DirectAnswerBlock;
  metadataPlaybook: {
    titleStrategy: string;
    subtitleStrategy: string;
    keywordFieldStrategy: string;
  };
  metricsAnalysis: {
    reachSummary: string;
    difficultySummary: string;
    scriptAdvantage: string;
  };
} {
  const { name, lang, tier, script, marketMetrics } = store;
  const isUS = store.code === "us";

  let difficultySummary = "";
  if (isUS) {
    difficultySummary =
      "The US App Store is the global benchmark for Apple Search Ads popularity (0–100) and ranking competition. Keyword difficulty runs highest here across all categories.";
  } else if (tier === "major") {
    difficultySummary = `As a major revenue tier market, ${name} has robust search volume with keyword difficulty averaging 5–15 points below the US. A prime secondary target for high-converting keywords.`;
  } else if (tier === "mid") {
    difficultySummary = `In ${name}, keyword competition is moderate—difficulty scores are typically 15–25 points lower than in Tier-1 English markets, allowing newer apps to secure top-3 ranks quickly.`;
  } else {
    difficultySummary = `In ${name}, keyword competition is low (25–40 points below US equivalents). Ranking for high-intent keywords requires significantly fewer total ratings.`;
  }

  const reachSummary =
    marketMetrics.languageReachCount > 0
      ? `Deploying ${lang} metadata indexes your app across ${name} plus ${marketMetrics.languageReachCount} additional storefronts, covering ${marketMetrics.languageReachPercent}% of global App Store territories.`
      : `${lang} metadata is dedicated specifically to the ${name} storefront. All 160 indexed characters should target local vocabulary.`;

  let scriptAdvantage = "";
  if (script.includes("Kanji") || script.includes("CJK")) {
    scriptAdvantage =
      "Ideographic characters (Kanji/Hanzi) convey entire concept words in a single character, yielding 2.5× higher semantic keyword density inside Apple's 100-character limit.";
  } else if (script.includes("Hangul") || script.includes("Arabic")) {
    scriptAdvantage =
      "Syllabic and non-Latin scripts offer high semantic packaging. Avoid punctuation and spaces in the keyword field to maximize capacity.";
  } else {
    scriptAdvantage =
      "Latin script allows flexible combinations. Use single spaces in the title and subtitle, and strictly comma-separated single words without spaces in the 100-character keyword field.";
  }

  const directAnswer: DirectAnswerBlock = {
    heading: `ASO Strategy Blueprint: ${name} (${store.code.toUpperCase()})`,
    summary: `${name} is an active ${tier} App Store market searching predominantly in ${lang}. Keyword difficulty averages ${
      isUS ? "the highest globally" : `${Math.abs(marketMetrics.averageDifficultyDiscount)} points below the US`
    }.`,
    takeaways: [
      `Primary Search Language: ${lang} (${script} script).`,
      `Language Reach: Covers ${marketMetrics.languageReachCount + 1} total App Store territories.`,
      `Target Popularity Threshold: Look for keywords with popularity > 20 in ${name}.`,
      `Target Difficulty Threshold: ${tier === "major" ? "Aim < 55" : tier === "mid" ? "Aim < 45" : "Aim < 35"} for new or growing apps.`,
    ],
    bestFor: `Apps optimizing metadata for ${lang}-speaking audiences looking for winnable organic keywords.`,
  };

  const metadataPlaybook = {
    titleStrategy: `Include your primary high-demand ${lang} keyword directly in the 30-character App Title alongside your brand name.`,
    subtitleStrategy: `Use the 30-character Subtitle for secondary descriptive keywords that reinforce user search intent in ${name}.`,
    keywordFieldStrategy: `Pack the 100-character keyword field with comma-separated, single-word root keywords in ${lang}. Do not repeat words already in the Title or Subtitle.`,
  };

  return {
    directAnswer,
    metadataPlaybook,
    metricsAnalysis: {
      reachSummary,
      difficultySummary,
      scriptAdvantage,
    },
  };
}

/**
 * Generate supplemental unique FAQs for any entity to expand helpful content without duplication.
 */
export function synthesizeIntentFaqs(entity: {
  title: string;
  category: string;
  lang?: string;
  name?: string;
}): FaqItem[] {
  if (entity.category === "storefront") {
    const name = entity.name ?? "this market";
    return [
      {
        q: `Can I rank for English keywords in the ${name} App Store?`,
        a: `Yes, if English keywords are searched locally. However, local users in ${name} predominantly search in ${
          entity.lang ?? "the local language"
        }. Combining local terms with universal English terms provides optimal coverage.`,
      },
      {
        q: `How often should I update App Store keywords for ${name}?`,
        a: `App Store keyword rankings stabilize within 3–7 days of releasing a metadata update. It is recommended to evaluate keyword performance and refresh metadata every 4–8 weeks based on seasonality and competitors.`,
      },
    ];
  }

  return [];
}
