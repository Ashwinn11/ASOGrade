/**
 * Cross-Border Storefront Localization Engine
 *
 * Generates 60 tactical playbooks for developers expanding an app from an origin storefront
 * into a destination international App Store (/localization/[from]-to-[to]).
 *
 * Covers secondary language indexing rules, character budget expansion/contraction,
 * Apple Search Ads popularity re-calibration, and script density shifts.
 */

import type { CrossLocalizationEntity } from "./engine/types";
import { STORE_INFO, scriptOf } from "./countries";
import { fitTitle, fitDescription } from "./engine/metadata";

export interface PairingConfig {
  from: string;
  to: string;
  expansionRatio: number; // e.g. 1.35 for German expansion, 0.45 for Japanese Kanji
  secondaryRule: string;
  specialTraps: string[];
}

export const PAIRING_CONFIGS: PairingConfig[] = [
  // US to 25 markets
  { from: "us", to: "jp", expansionRatio: 0.4, secondaryRule: "Japan indexes Japanese and English (US). English keywords in your primary locale still match searches in Tokyo.", specialTraps: ["Never machine-translate English idioms; Japanese users search with specific Katakana loanwords or Kanji concepts."] },
  { from: "us", to: "de", expansionRatio: 1.35, secondaryRule: "Germany indexes German and English (UK). German compound nouns frequently exceed the 30-character title limit.", specialTraps: ["Split compound nouns into individual root words in the 100-character keyword field."] },
  { from: "us", to: "fr", expansionRatio: 1.25, secondaryRule: "France indexes French and English (UK).", specialTraps: ["French text expands ~25% compared to English. Keep titles concise to fit within 30 characters."] },
  { from: "us", to: "gb", expansionRatio: 1.0, secondaryRule: "UK shares English (UK) and indexes identical character structures to the US.", specialTraps: ["British spellings (e.g. 'colour', 'favour') are automatically normalized by Apple, but local slang changes conversion."] },
  { from: "us", to: "ca", expansionRatio: 1.0, secondaryRule: "Canada indexes English (Canada) and French (Canada). Notably, French (Canada) also indexes in the US App Store, giving US apps an extra 160 characters of indexing space!", specialTraps: ["Take advantage of Canadian French to index supplementary English keywords for US users."] },
  { from: "us", to: "au", expansionRatio: 1.0, secondaryRule: "Australia indexes English (Australia) and English (UK).", specialTraps: ["Australian search terms have high overlap with the US, but keyword difficulty averages 15 points lower."] },
  { from: "us", to: "kr", expansionRatio: 0.7, secondaryRule: "South Korea indexes Korean and English (US).", specialTraps: ["Hangul syllabic blocks pack dense meaning into few characters. Leave out spacing in the keyword field."] },
  { from: "us", to: "br", expansionRatio: 1.2, secondaryRule: "Brazil indexes Portuguese (Brazil). Portuguese (Portugal) is indexed separately.", specialTraps: ["Brazilian search vocabulary differs significantly from European Portuguese. Use Brazilian colloquial terms."] },
  { from: "us", to: "es", expansionRatio: 1.2, secondaryRule: "Spain indexes Spanish (Spain) and Catalan in regional queries.", specialTraps: ["Spanish (Latin America) and Spanish (Spain) use different verb forms. Do not use Mexican Spanish for Madrid."] },
  { from: "us", to: "it", expansionRatio: 1.2, secondaryRule: "Italy indexes Italian and English (UK).", specialTraps: ["Italian nouns with articles (e.g. 'il', 'la') should have the article stripped in the keyword field."] },
  { from: "us", to: "mx", expansionRatio: 1.2, secondaryRule: "Mexico indexes Spanish (Mexico). Crucially, Spanish (Mexico) ALSO indexes in the US App Store!", specialTraps: ["You can pack Spanish (Mexico) with English keywords to gain double the keyword capacity in the US."] },
  { from: "us", to: "nl", expansionRatio: 1.15, secondaryRule: "Netherlands indexes Dutch and English (UK).", specialTraps: ["Dutch users frequently search in both English and Dutch. Include English root keywords in secondary fields."] },
  { from: "us", to: "se", expansionRatio: 1.1, secondaryRule: "Sweden indexes Swedish and English (UK).", specialTraps: ["High English fluency means dual-language searching is common across Swedish iPhone users."] },
  { from: "us", to: "in", expansionRatio: 1.0, secondaryRule: "India primarily indexes English (UK) and Hindi (Latin script / Hinglish).", specialTraps: ["Users frequently search phonetically in Latin script for vernacular terms."] },
  { from: "us", to: "sa", expansionRatio: 0.9, secondaryRule: "Saudi Arabia indexes Arabic and English (US).", specialTraps: ["Arabic script flows Right-to-Left. Ensure screenshots and number formats mirror correctly."] },
  { from: "us", to: "tr", expansionRatio: 1.15, secondaryRule: "Turkey indexes Turkish and English (UK).", specialTraps: ["Turkish special characters (ç, ğ, ı, ö, ş, ü) should be respected; Apple normalizes some but exact matches win."] },
  { from: "us", to: "pl", expansionRatio: 1.25, secondaryRule: "Poland indexes Polish and English (UK).", specialTraps: ["Polish inflections create many grammatical word endings. Pick uninflected root forms for the keyword field."] },
  { from: "us", to: "tw", expansionRatio: 0.45, secondaryRule: "Taiwan indexes Traditional Chinese (Taiwan) and English (US).", specialTraps: ["Use Traditional Chinese characters; Simplified Chinese will cause immediate user friction in Taiwan."] },
  { from: "us", to: "id", expansionRatio: 1.15, secondaryRule: "Indonesia indexes Indonesian and English (UK).", specialTraps: ["Search volume in Indonesia is high for utility and photo apps, with much lower difficulty than in Tier 1."] },
  { from: "us", to: "th", expansionRatio: 0.8, secondaryRule: "Thailand indexes Thai and English (US).", specialTraps: ["Thai script has no spaces between words. Separate Thai keyword phrases carefully with commas."] },
  { from: "us", to: "vn", expansionRatio: 1.1, secondaryRule: "Vietnam indexes Vietnamese and English (US).", specialTraps: ["Vietnamese tone marks must be accurate in Title and Subtitle."] },
  { from: "us", to: "sg", expansionRatio: 1.0, secondaryRule: "Singapore indexes English (UK), Simplified Chinese, and Malay.", specialTraps: ["English is the primary business language; Chinese is a strong secondary search channel."] },
  { from: "us", to: "ch", expansionRatio: 1.25, secondaryRule: "Switzerland indexes German, French, Italian, and English (UK).", specialTraps: ["Swiss users search across three national languages. German and French covers 90% of searches."] },
  { from: "us", to: "at", expansionRatio: 1.35, secondaryRule: "Austria indexes German and English (UK).", specialTraps: ["Austrian German idioms differ slightly from Germany; standard German keywords rank reliably."] },
  { from: "us", to: "be", expansionRatio: 1.2, secondaryRule: "Belgium indexes French, Dutch, and English (UK).", specialTraps: ["Flemish (Dutch) and French represent two distinct halves of the Belgian market."] },

  // GB to 8 markets
  { from: "gb", to: "us", expansionRatio: 1.0, secondaryRule: "US indexes English (US) and Spanish (Mexico).", specialTraps: ["Switch British terms ('solicitor', 'holiday') to US equivalents ('lawyer', 'vacation')."] },
  { from: "gb", to: "de", expansionRatio: 1.35, secondaryRule: "Germany indexes German and English (UK).", specialTraps: ["Translate German keywords carefully; UK English metadata provides secondary coverage."] },
  { from: "gb", to: "fr", expansionRatio: 1.25, secondaryRule: "France indexes French and English (UK).", specialTraps: ["French terms require character compression to avoid overflowing the 30-character limits."] },
  { from: "gb", to: "au", expansionRatio: 1.0, secondaryRule: "Australia indexes English (Australia) and English (UK).", specialTraps: ["UK English apps port directly to Australia with minimal metadata adjustment."] },
  { from: "gb", to: "ca", expansionRatio: 1.0, secondaryRule: "Canada indexes English (Canada) and French (Canada).", specialTraps: ["Canada uses Americanized spelling for many terms ('color', 'center')."] },
  { from: "gb", to: "es", expansionRatio: 1.2, secondaryRule: "Spain indexes Spanish (Spain) and Catalan.", specialTraps: ["Castilian Spanish vocabulary is required for Spain."] },
  { from: "gb", to: "it", expansionRatio: 1.2, secondaryRule: "Italy indexes Italian and English (UK).", specialTraps: ["UK English is well-indexed as secondary in Italy, but native Italian title converts 3x better."] },
  { from: "gb", to: "jp", expansionRatio: 0.4, secondaryRule: "Japan indexes Japanese and English (US).", specialTraps: ["Use native Japanese phrasing; UK idioms will not index for Tokyo searchers."] },

  // DE to 8 markets
  { from: "de", to: "us", expansionRatio: 0.75, secondaryRule: "US is the global difficulty benchmark.", specialTraps: ["Expect difficulty scores to increase by 15–25 points when entering the US."] },
  { from: "de", to: "gb", expansionRatio: 0.75, secondaryRule: "UK indexes English (UK).", specialTraps: ["UK is an ideal testing ground for English keywords before spending in the US."] },
  { from: "de", to: "fr", expansionRatio: 0.95, secondaryRule: "France indexes French and English (UK).", specialTraps: ["French and German have comparable market size; difficulty is balanced."] },
  { from: "de", to: "at", expansionRatio: 1.0, secondaryRule: "Austria indexes German.", specialTraps: ["German metadata automatically covers Austria with zero translation needed."] },
  { from: "de", to: "ch", expansionRatio: 1.0, secondaryRule: "Switzerland indexes German, French, and Italian.", specialTraps: ["German metadata reaches the German-speaking cantons (Zurich, Basel, Bern)."] },
  { from: "de", to: "nl", expansionRatio: 0.9, secondaryRule: "Netherlands indexes Dutch and English (UK).", specialTraps: ["Dutch vocabulary is linguistically close to German, but requires exact Dutch keywords."] },
  { from: "de", to: "es", expansionRatio: 0.9, secondaryRule: "Spain indexes Spanish (Spain).", specialTraps: ["Keyword difficulty in Spain is significantly lower than in Germany."] },
  { from: "de", to: "it", expansionRatio: 0.9, secondaryRule: "Italy indexes Italian and English (UK).", specialTraps: ["Southern European markets offer high rank upside for apps with moderate review counts."] },

  // FR to 8 markets
  { from: "fr", to: "us", expansionRatio: 0.8, secondaryRule: "US indexes English (US) and Spanish (Mexico).", specialTraps: ["English keywords must be rewritten for American search habits."] },
  { from: "fr", to: "gb", expansionRatio: 0.8, secondaryRule: "UK indexes English (UK).", specialTraps: ["English (UK) provides an accessible English-language beachhead."] },
  { from: "fr", to: "de", expansionRatio: 1.1, secondaryRule: "Germany indexes German and English (UK).", specialTraps: ["German text expansion requires shorter subtitle copy."] },
  { from: "fr", to: "ca", expansionRatio: 0.95, secondaryRule: "Canada indexes French (Canada) and English (Canada).", specialTraps: ["Quebec French uses distinct terms (e.g. 'magasiner' vs 'faire du shopping')."] },
  { from: "fr", to: "be", expansionRatio: 1.0, secondaryRule: "Belgium indexes French and Dutch.", specialTraps: ["French metadata covers Wallonia and Brussels completely."] },
  { from: "fr", to: "ch", expansionRatio: 1.0, secondaryRule: "Switzerland indexes French, German, and Italian.", specialTraps: ["French metadata directly indexes in Romandy (Geneva, Lausanne)."] },
  { from: "fr", to: "es", expansionRatio: 0.95, secondaryRule: "Spain indexes Spanish (Spain).", specialTraps: ["Romance language overlap helps conceptual translation, but exact keywords differ."] },
  { from: "fr", to: "it", expansionRatio: 0.95, secondaryRule: "Italy indexes Italian and English (UK).", specialTraps: ["Similar search intent patterns, with lower keyword difficulty in Italy."] },

  // JP to 5 markets
  { from: "jp", to: "us", expansionRatio: 2.5, secondaryRule: "US uses Latin script with strict 30-character limits.", specialTraps: ["Kanji text will expand by 250% when translated into English phrases; cut ruthlessly to fit."] },
  { from: "jp", to: "kr", expansionRatio: 1.8, secondaryRule: "South Korea indexes Korean (Hangul).", specialTraps: ["Both markets are mobile-first with high gaming and productivity demand."] },
  { from: "jp", to: "tw", expansionRatio: 1.1, secondaryRule: "Taiwan indexes Traditional Chinese.", specialTraps: ["Kanji and Hanzi share characters, but grammar and phrasing differ significantly."] },
  { from: "jp", to: "gb", expansionRatio: 2.5, secondaryRule: "UK indexes English (UK).", specialTraps: ["UK English offers a lower-competition English alternative to launching directly in the US."] },
  { from: "jp", to: "de", expansionRatio: 2.8, secondaryRule: "Germany indexes German.", specialTraps: ["German is the longest European script; Title space must be tightly managed."] },

  // BR to 6 markets
  { from: "br", to: "us", expansionRatio: 0.85, secondaryRule: "US indexes English (US).", specialTraps: ["Translating Portuguese to English requires verifying ASA popularity scores in the US."] },
  { from: "br", to: "pt", expansionRatio: 1.0, secondaryRule: "Portugal indexes Portuguese (Portugal).", specialTraps: ["European Portuguese has different vocabulary (e.g. 'ecrã' vs 'tela')."] },
  { from: "br", to: "es", expansionRatio: 1.0, secondaryRule: "Spain indexes Spanish (Spain).", specialTraps: ["Latin American apps expanding to Europe should localize for Castilian Spanish."] },
  { from: "br", to: "mx", expansionRatio: 1.0, secondaryRule: "Mexico indexes Spanish (Mexico).", specialTraps: ["Mexico shares LatAm cultural context, but Spanish keywords are mandatory."] },
  { from: "br", to: "ar", expansionRatio: 1.0, secondaryRule: "Argentina indexes Spanish (Latin America).", specialTraps: ["Argentine slang and phrasing are unique in the Southern Cone."] },
  { from: "br", to: "cl", expansionRatio: 1.0, secondaryRule: "Chile indexes Spanish (Latin America).", specialTraps: ["High smartphone penetration makes Chile a lucrative secondary market."] },

  // CA to 4 markets
  { from: "ca", to: "us", expansionRatio: 1.0, secondaryRule: "US indexes English (US) and Spanish (Mexico).", specialTraps: ["Canadian French metadata also indexes in the US App Store, giving Canadian apps dual indexation."] },
  { from: "ca", to: "gb", expansionRatio: 1.0, secondaryRule: "UK indexes English (UK).", specialTraps: ["Spelling differences are minimal, but consumer terms change in Britain."] },
  { from: "ca", to: "fr", expansionRatio: 1.1, secondaryRule: "France indexes French (France).", specialTraps: ["Quebec French differs idiomatically from Metropolitan French."] },
  { from: "ca", to: "au", expansionRatio: 1.0, secondaryRule: "Australia indexes English (Australia).", specialTraps: ["Direct Commonwealth English transfer with lower difficulty."] },

  // AU to 4 markets
  { from: "au", to: "us", expansionRatio: 1.0, secondaryRule: "US is the global difficulty benchmark.", specialTraps: ["Expect 10–20 point difficulty jump when moving from Australia to the US."] },
  { from: "au", to: "gb", expansionRatio: 1.0, secondaryRule: "UK indexes English (UK).", specialTraps: ["Shared Commonwealth vocabulary makes UK transition seamless."] },
  { from: "au", to: "nz", expansionRatio: 1.0, secondaryRule: "New Zealand indexes English (Australia).", specialTraps: ["Australia metadata covers New Zealand with near 100% search intent match."] },
  { from: "au", to: "ca", expansionRatio: 1.0, secondaryRule: "Canada indexes English (Canada).", specialTraps: ["High market similarity and identical Latin character budgeting."] },

  // MX to 5 markets
  { from: "mx", to: "us", expansionRatio: 0.85, secondaryRule: "Spanish (Mexico) metadata indexes natively in the US App Store.", specialTraps: ["Mexican Spanish gives you double the indexed keyword real estate in the US."] },
  { from: "mx", to: "es", expansionRatio: 1.0, secondaryRule: "Spain indexes Spanish (Spain).", specialTraps: ["Replace Mexican idioms with Castilian Spanish terms."] },
  { from: "mx", to: "co", expansionRatio: 1.0, secondaryRule: "Colombia indexes Spanish (Latin America).", specialTraps: ["Shared Latin American search taxonomy with high app download growth."] },
  { from: "mx", to: "ar", expansionRatio: 1.0, secondaryRule: "Argentina indexes Spanish (Latin America).", specialTraps: ["Argentine terminology diverges for payments and finance apps."] },
  { from: "mx", to: "cl", expansionRatio: 1.0, secondaryRule: "Chile indexes Spanish (Latin America).", specialTraps: ["High ARPU in Chile makes it a priority Spanish-language expansion."] },

  // IN to 5 markets
  { from: "in", to: "us", expansionRatio: 1.0, secondaryRule: "US is the primary target for Indian developer exports.", specialTraps: ["Localize for US vernacular and monetize with USD subscription price points."] },
  { from: "in", to: "gb", expansionRatio: 1.0, secondaryRule: "UK indexes English (UK).", specialTraps: ["Indian English aligns closely with UK grammatical conventions."] },
  { from: "in", to: "ca", expansionRatio: 1.0, secondaryRule: "Canada indexes English (Canada).", specialTraps: ["Strong diaspora presence creates dual demand for Indian cultural and utility apps."] },
  { from: "in", to: "au", expansionRatio: 1.0, secondaryRule: "Australia indexes English (Australia).", specialTraps: ["High purchasing power in Australia offsets lower volume."] },
  { from: "in", to: "ae", expansionRatio: 1.0, secondaryRule: "United Arab Emirates indexes English (UK) and Arabic.", specialTraps: ["English keywords capture expatriate professional search volume in the Gulf."] },

  // IT to 4 markets
  { from: "it", to: "us", expansionRatio: 0.8, secondaryRule: "US indexes English (US).", specialTraps: ["Convert Italian feature descriptions into concise English verbs."] },
  { from: "it", to: "gb", expansionRatio: 0.8, secondaryRule: "UK indexes English (UK).", specialTraps: ["UK English provides an accessible stepping stone to global markets."] },
  { from: "it", to: "es", expansionRatio: 1.0, secondaryRule: "Spain indexes Spanish (Spain).", specialTraps: ["High linguistic kinship, but exact keyword phrasing must be validated in Spanish."] },
  { from: "it", to: "de", expansionRatio: 1.15, secondaryRule: "Germany indexes German.", specialTraps: ["German compound words expand character length significantly."] },
];

/**
 * 60 Cross-Storefront Localization Entities
 * e.g., /localization/us-to-jp
 */
export const CROSS_LOCALIZATION_ENTITIES: CrossLocalizationEntity[] = PAIRING_CONFIGS.map((cfg) => {
  const fromStore = STORE_INFO[cfg.from] ?? { name: cfg.from.toUpperCase(), lang: "English" };
  const toStore = STORE_INFO[cfg.to] ?? { name: cfg.to.toUpperCase(), lang: "English" };

  const slug = `${cfg.from}-to-${cfg.to}`;
  const canonicalPath = `/localization/${slug}`;

  const title = `Localize App Store Keywords: ${fromStore.name} to ${toStore.name}`;
  const metaTitle = fitTitle([
    `${fromStore.name} to ${toStore.name} ASO`,
    `ASO: ${fromStore.name} to ${toStore.name} | ASOGrade`,
  ]);
  const description = fitDescription(
    `Playbook for expanding App Store keywords from ${fromStore.name} to ${toStore.name}. Covers secondary indexing rules, script expansion (${cfg.expansionRatio}x), and metadata tips.`
  );

  const expansionDirection =
    cfg.expansionRatio > 1.1
      ? `Expands by ~${Math.round((cfg.expansionRatio - 1) * 100)}%`
      : cfg.expansionRatio < 0.9
      ? `Contracts by ~${Math.round((1 - cfg.expansionRatio) * 100)}%`
      : "Maintains similar character length";

  return {
    category: "cross-localization",
    slug,
    fromStoreCode: cfg.from,
    fromStoreName: fromStore.name,
    toStoreCode: cfg.to,
    toStoreName: toStore.name,
    sourceLang: fromStore.lang,
    targetLang: toStore.lang,
    expansionRatio: cfg.expansionRatio,
    secondaryIndexingRules: cfg.secondaryRule,
    translationChecklist: [
      `Check Apple's secondary language indexing rules for ${toStore.name}.`,
      `Account for script expansion: ${expansionDirection} when translating from ${fromStore.lang} to ${toStore.lang}.`,
      `Verify Apple Search Ads popularity for target keywords directly in the ${toStore.name} storefront.`,
      `Audit top-ranking local competitor subtitles in ${toStore.name} before finalizing your 100-character field.`,
    ],
    metadataAdjustments: {
      titleAdvice: `Place the primary ${toStore.lang} high-demand search term in your 30-character App Title.`,
      subtitleAdvice: `Reinforce secondary intent and benefits in ${toStore.lang} within 30 characters.`,
      keywordAdvice: `Fill the 100-character keyword field with comma-separated, single root words in ${toStore.lang} without spaces after commas.`,
    },
    title,
    metaTitle,
    description,
    canonicalPath,
    directAnswer: {
      heading: `ASO Localization: ${fromStore.name} to ${toStore.name}`,
      summary: `Expanding from ${fromStore.name} to ${toStore.name} shifts your primary keyword language from ${fromStore.lang} to ${toStore.lang}. Text length ${expansionDirection.toLowerCase()}.`,
      takeaways: [
        `Origin Market: ${fromStore.name} (${cfg.from.toUpperCase()})`,
        `Destination Market: ${toStore.name} (${cfg.to.toUpperCase()})`,
        `Script Expansion Factor: ${cfg.expansionRatio}x`,
        `Secondary Indexing: ${cfg.secondaryRule}`,
      ],
      bestFor: `Developers localizing metadata from ${fromStore.name} into ${toStore.name}.`,
    },
    breakdown: [
      {
        heading: `Cross-Market Indexing Rules & Script Density`,
        paragraphs: [
          `When taking an app successful in ${fromStore.name} into ${toStore.name}, the biggest mistake is direct literal translation. Search intent is cultural, not purely grammatical.`,
          `${cfg.secondaryRule}`,
          `Script expansion factor is ${cfg.expansionRatio}x (${expansionDirection}). In a 30-character title limit, every character counts.`,
        ],
      },
      {
        heading: `Common Pitfalls to Avoid in ${toStore.name}`,
        paragraphs: cfg.specialTraps,
      },
    ],
    faq: [
      {
        q: `Does Apple automatically translate my keywords from ${fromStore.name} for ${toStore.name}?`,
        a: `No. Apple does not translate metadata across languages. If you do not provide dedicated ${toStore.lang} metadata, users searching in ${toStore.name} will only find you if they type in ${fromStore.lang} or if secondary indexing applies.`,
      },
      {
        q: `How do I verify search volume in ${toStore.name}?`,
        a: `Use ASOGrade's ${toStore.name} storefront selector. It reads Apple Search Ads demand scores calibrated directly to local search behavior in ${toStore.name}.`,
      },
    ],
  };
});
