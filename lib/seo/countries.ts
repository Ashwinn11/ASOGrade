/**
 * Metadata for every App Store storefront, keyed by ISO 3166-1 alpha-2 code.
 *
 * These facts power /keyword-research/[store] pages.  The goal is real
 * editorial differentiation — each page should say something true and useful
 * about that market, not repeat "here is a country with an App Store".
 *
 * tier:    "major"    — top-15 revenue storefronts, high competition
 *          "mid"      — active market worth targeting, moderate competition
 *          "emerging" — lower volume, often dramatically lower keyword difficulty
 *
 * lang:    Primary App Store search language (what most users type in).
 * facts:   1-2 short, true statements about ASO strategy for this market.
 */

export interface StoreInfo {
  name: string;
  region: "north-america" | "latam" | "europe" | "middle-east-africa" | "asia-pacific";
  tier: "major" | "mid" | "emerging";
  lang: string;
  langCode: string;
  facts: string[];
}

export const STORE_INFO: Record<string, StoreInfo> = {
  us: {
    name: "United States",
    region: "north-america",
    tier: "major",
    lang: "English",
    langCode: "en",
    facts: [
      "The US storefront is the single most competitive App Store market — keyword difficulty scores routinely run 10–20 points higher than in comparable English-speaking markets.",
      "Apple Search Ads popularity scores are calibrated to US search volume, so a US score of 60 represents real, substantial demand.",
    ],
  },
  gb: {
    name: "United Kingdom",
    region: "europe",
    tier: "major",
    lang: "English",
    langCode: "en",
    facts: [
      "UK keyword difficulty typically runs 5–12 points below the US for identical terms, making it a useful secondary target when US rankings are blocked.",
      "British spelling variations (e.g. 'colour', 'organise') rarely rank differently from American spellings — search intent is the same, algorithm handles both.",
    ],
  },
  ca: {
    name: "Canada",
    region: "north-america",
    tier: "major",
    lang: "English",
    langCode: "en",
    facts: [
      "Canada is an English-dominant storefront with behaviour nearly identical to the US, but with noticeably lower difficulty scores for the same keywords.",
      "French-language keywords for Quebec represent a secondary angle — the same app can use French subtitle text to capture demand that English-only competitors miss.",
    ],
  },
  au: {
    name: "Australia",
    region: "asia-pacific",
    tier: "major",
    lang: "English",
    langCode: "en",
    facts: [
      "Australia consistently shows 8–15 points lower keyword difficulty than the US for the same English terms — a strong secondary target for apps blocked in the US.",
      "Local categories like finance (tax, superannuation) and health (Medicare) carry unique demand with minimal competition from global apps.",
    ],
  },
  de: {
    name: "Germany",
    region: "europe",
    tier: "major",
    lang: "German",
    langCode: "de",
    facts: [
      "Germany is the largest German-language App Store market — localising into German unlocks Austria and Switzerland at effectively no extra cost.",
      "German users search in German, not English. A full German subtitle and keyword field is required to capture German demand — partial localisation loses most of the market.",
    ],
  },
  fr: {
    name: "France",
    region: "europe",
    tier: "major",
    lang: "French",
    langCode: "fr",
    facts: [
      "France is the largest French-language storefront — French localisation simultaneously serves Belgium, Switzerland, and parts of Canada.",
      "French difficulty scores for productivity and utility keywords typically run 15–25 points below US equivalents, making French a high-ROI localisation.",
    ],
  },
  jp: {
    name: "Japan",
    region: "asia-pacific",
    tier: "major",
    lang: "Japanese",
    langCode: "ja",
    facts: [
      "Japan is among the top-3 App Store revenue markets globally and is worth treating as a first-tier target, not an afterthought.",
      "Japanese users search in Japanese (hiragana/katakana/kanji) — English keywords will not capture Japanese demand. Localisation requires native-speaker metadata.",
    ],
  },
  cn: {
    name: "China",
    region: "asia-pacific",
    tier: "major",
    lang: "Chinese (Simplified)",
    langCode: "zh",
    facts: [
      "China is a distinct regulatory environment — many categories require ICP licensing. Verify compliance before targeting this storefront.",
      "Chinese keywords (Simplified Mandarin) are required; Japanese or Traditional Chinese metadata will not carry over.",
    ],
  },
  kr: {
    name: "South Korea",
    region: "asia-pacific",
    tier: "major",
    lang: "Korean",
    langCode: "ko",
    facts: [
      "South Korea is a high-revenue market for games and productivity apps with moderate difficulty compared to Japan for the same categories.",
      "Korean-language keywords are mandatory — transliteration of English product names into Hangul is common but must be phonetically accurate.",
    ],
  },
  in: {
    name: "India",
    region: "asia-pacific",
    tier: "major",
    lang: "English",
    langCode: "en",
    facts: [
      "India's App Store is English-dominant at the keyword level, so no separate localisation is required — difficulty is usually 20–30 points lower than the US for the same terms.",
      "Finance, education, and utility categories are exceptionally active in India, with rapidly growing user bases and below-average difficulty scores.",
    ],
  },
  br: {
    name: "Brazil",
    region: "latam",
    tier: "major",
    lang: "Portuguese",
    langCode: "pt",
    facts: [
      "Brazil is the largest App Store market in Latin America and the only storefront where Brazilian Portuguese localisation delivers significant volume.",
      "Difficulty scores in Brazil are substantially lower than the US across most categories — it is one of the most accessible high-volume storefronts.",
    ],
  },
  mx: {
    name: "Mexico",
    region: "latam",
    tier: "major",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Mexico is the largest Spanish-language App Store storefront. Spanish localisation for Mexico also serves most of the rest of Latin America.",
      "Keyword difficulty in Mexico is well below the US for identical Spanish terms — a winnable entry point into Spanish-language App Store search.",
    ],
  },
  ru: {
    name: "Russia",
    region: "europe",
    tier: "major",
    lang: "Russian",
    langCode: "ru",
    facts: [
      "Russia requires Cyrillic-script localisation — Latin-script keywords will not capture Russian search demand.",
      "The Russian storefront has significant volume in productivity, navigation, and games categories with difficulty scores substantially below Western European equivalents.",
    ],
  },
  es: {
    name: "Spain",
    region: "europe",
    tier: "mid",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Spain shares its primary keyword language with Mexico — a single Spanish localisation covers both storefronts, giving Spain a useful bundle value.",
      "Spanish difficulty scores in Spain run 5–15 points below Mexico for the same terms, making Spain a good supplementary target.",
    ],
  },
  it: {
    name: "Italy",
    region: "europe",
    tier: "mid",
    lang: "Italian",
    langCode: "it",
    facts: [
      "Italy is a mid-tier European market with moderate difficulty. Italian localisation is standalone — no close linguistic neighbour storefront to bundle.",
      "Finance and travel categories are particularly active in Italy, with difficulty that is consistently 10–20 points below Germany for equivalent terms.",
    ],
  },
  nl: {
    name: "Netherlands",
    region: "europe",
    tier: "mid",
    lang: "Dutch",
    langCode: "nl",
    facts: [
      "Dutch users frequently search in English for international apps — English metadata can capture Dutch demand without a full localisation.",
      "Keyword difficulty in the Netherlands is consistently lower than Germany and France for the same category terms.",
    ],
  },
  se: {
    name: "Sweden",
    region: "europe",
    tier: "mid",
    lang: "Swedish",
    langCode: "sv",
    facts: [
      "Swedish users have high English proficiency — English keywords perform well, but a Swedish subtitle can unlock demand that purely English metadata misses.",
      "Scandinavia (Sweden, Norway, Denmark) shares similar App Store behaviour — targeting Sweden gives useful signal for the other two.",
    ],
  },
  no: {
    name: "Norway",
    region: "europe",
    tier: "mid",
    lang: "Norwegian",
    langCode: "nb",
    facts: [
      "Norway is a high-income market with above-average willingness to pay — worth targeting despite smaller raw user volume.",
      "English keywords perform well in Norway, but Norwegian-language terms in the subtitle can add incremental reach.",
    ],
  },
  dk: {
    name: "Denmark",
    region: "europe",
    tier: "mid",
    lang: "Danish",
    langCode: "da",
    facts: [
      "Denmark shares App Store search behaviour with Sweden and Norway — similar keyword patterns, similar difficulty ranges.",
      "Danish users search in both Danish and English, so English keywords with a Danish subtitle covers most demand efficiently.",
    ],
  },
  fi: {
    name: "Finland",
    region: "europe",
    tier: "mid",
    lang: "Finnish",
    langCode: "fi",
    facts: [
      "Finnish is linguistically distinct from the other Scandinavian languages — Swedish localisation will not carry over to Finnish search demand.",
      "Difficulty scores in Finland are among the lowest in Europe for most categories, making it a high-opportunity emerging market within the EU.",
    ],
  },
  pl: {
    name: "Poland",
    region: "europe",
    tier: "mid",
    lang: "Polish",
    langCode: "pl",
    facts: [
      "Poland is the largest Central European App Store market by volume — Polish localisation is the most valuable single investment for the CEE region.",
      "Difficulty scores for most Polish-language keywords are 20–35 points below UK equivalents, representing significantly lower competition.",
    ],
  },
  tr: {
    name: "Turkey",
    region: "middle-east-africa",
    tier: "mid",
    lang: "Turkish",
    langCode: "tr",
    facts: [
      "Turkey is one of the fastest-growing App Store markets in the region with difficulty scores well below European equivalents.",
      "Turkish-language keywords are required for meaningful reach — English keywords perform poorly in Turkey.",
    ],
  },
  sa: {
    name: "Saudi Arabia",
    region: "middle-east-africa",
    tier: "mid",
    lang: "Arabic",
    langCode: "ar",
    facts: [
      "Saudi Arabia is the largest Arabic-language App Store market by revenue — it is the priority target if adding Arabic localisation.",
      "Arabic metadata must be right-to-left text and should use Modern Standard Arabic rather than a dialect.",
    ],
  },
  ae: {
    name: "United Arab Emirates",
    region: "middle-east-africa",
    tier: "mid",
    lang: "Arabic",
    langCode: "ar",
    facts: [
      "The UAE has a high proportion of English-speaking residents — English keywords capture significant demand alongside Arabic.",
      "Finance, travel, and lifestyle categories are particularly active in the UAE with difficulty below what comparable volume would suggest.",
    ],
  },
  sg: {
    name: "Singapore",
    region: "asia-pacific",
    tier: "mid",
    lang: "English",
    langCode: "en",
    facts: [
      "Singapore is an English-dominant market with one of the highest App Store revenue-per-user rates in Southeast Asia.",
      "English keywords work well with no localisation required — difficulty is typically 15–25 points below the US for the same terms.",
    ],
  },
  hk: {
    name: "Hong Kong",
    region: "asia-pacific",
    tier: "mid",
    lang: "Chinese (Traditional)",
    langCode: "zh-HK",
    facts: [
      "Hong Kong uses Traditional Chinese — Simplified Chinese (mainland) metadata will not capture Hong Kong demand.",
      "English also performs well in Hong Kong given the bilingual population — dual-language metadata is common practice.",
    ],
  },
  tw: {
    name: "Taiwan",
    region: "asia-pacific",
    tier: "mid",
    lang: "Chinese (Traditional)",
    langCode: "zh-TW",
    facts: [
      "Taiwan uses Traditional Chinese — the same localisation as Hong Kong, making the two a natural bundle.",
      "Taiwan is a well-developed market with moderate difficulty and is often overlooked relative to its revenue potential.",
    ],
  },
  id: {
    name: "Indonesia",
    region: "asia-pacific",
    tier: "mid",
    lang: "Indonesian",
    langCode: "id",
    facts: [
      "Indonesia is one of the largest mobile markets by user count and is growing rapidly in App Store revenue.",
      "Indonesian (Bahasa Indonesia) is linguistically accessible — many common app-category terms are close to English cognates.",
    ],
  },
  ph: {
    name: "Philippines",
    region: "asia-pacific",
    tier: "mid",
    lang: "English",
    langCode: "en",
    facts: [
      "The Philippines is an English-dominant storefront — no localisation is required to capture Philippine search demand.",
      "Difficulty scores are consistently low, making the Philippines an accessible secondary market for English-language apps.",
    ],
  },
  my: {
    name: "Malaysia",
    region: "asia-pacific",
    tier: "mid",
    lang: "English",
    langCode: "en",
    facts: [
      "Malaysia is largely English-dominant in App Store search, with Malay-language terms adding incremental reach for some categories.",
      "Difficulty scores are substantially below Singapore for the same English terms, making Malaysia a useful benchmarking comparison.",
    ],
  },
  th: {
    name: "Thailand",
    region: "asia-pacific",
    tier: "mid",
    lang: "Thai",
    langCode: "th",
    facts: [
      "Thai-language keywords are required for Thailand — English metadata has limited reach with Thai users.",
      "Thailand is a growing mid-tier market with difficulty scores well below Japan and South Korea for equivalent category terms.",
    ],
  },
  vn: {
    name: "Vietnam",
    region: "asia-pacific",
    tier: "mid",
    lang: "Vietnamese",
    langCode: "vi",
    facts: [
      "Vietnam has one of the fastest-growing mobile user populations in Southeast Asia with very low keyword difficulty.",
      "Vietnamese localisation is a standalone investment — it does not overlap meaningfully with other SEA languages.",
    ],
  },
  at: {
    name: "Austria",
    region: "europe",
    tier: "mid",
    lang: "German",
    langCode: "de",
    facts: [
      "Austria shares the German-language storefront with Germany — German localisation covers Austria at no extra cost.",
      "Difficulty scores in Austria are systematically lower than Germany for identical German-language terms.",
    ],
  },
  ch: {
    name: "Switzerland",
    region: "europe",
    tier: "mid",
    lang: "German",
    langCode: "de",
    facts: [
      "Switzerland has three language regions (German, French, Italian) — German metadata covers the majority.",
      "Switzerland has among the highest App Store revenue-per-user in Europe, making it worth targeting despite smaller volume.",
    ],
  },
  be: {
    name: "Belgium",
    region: "europe",
    tier: "mid",
    lang: "Dutch",
    langCode: "nl",
    facts: [
      "Belgium has Dutch and French regions — Dutch metadata covers Flanders, French covers Wallonia.",
      "Dutch difficulty scores for Belgium are lower than the Netherlands for the same terms.",
    ],
  },
  pt: {
    name: "Portugal",
    region: "europe",
    tier: "mid",
    lang: "Portuguese",
    langCode: "pt-PT",
    facts: [
      "Portugal uses European Portuguese — Brazilian Portuguese metadata will not fully capture Portuguese demand as the dialects differ meaningfully.",
      "Portugal is a mid-tier market worth targeting when Brazilian Portuguese localisation is already in place, as the incremental effort is small.",
    ],
  },
  za: {
    name: "South Africa",
    region: "middle-east-africa",
    tier: "mid",
    lang: "English",
    langCode: "en",
    facts: [
      "South Africa is the largest English-language App Store market in Africa — no localisation required.",
      "Difficulty scores are among the lowest for any English-language market, making South Africa an accessible entry point.",
    ],
  },
  ar: {
    name: "Argentina",
    region: "latam",
    tier: "mid",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Argentina is a major Latin American market — Spanish localisation for Mexico also covers Argentina.",
      "Difficulty scores are lower in Argentina than Mexico for the same Spanish terms.",
    ],
  },
  co: {
    name: "Colombia",
    region: "latam",
    tier: "mid",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Colombia is the third-largest Spanish-language App Store market, after Mexico and Argentina.",
      "Spanish difficulty in Colombia is consistently lower than Mexico, making it a strong secondary LATAM target.",
    ],
  },
  cl: {
    name: "Chile",
    region: "latam",
    tier: "mid",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Chile has one of the highest App Store revenue-per-user rates in Latin America despite its smaller population.",
      "Spanish metadata from Mexico localisation covers Chile effectively.",
    ],
  },
  pe: {
    name: "Peru",
    region: "latam",
    tier: "emerging",
    lang: "Spanish",
    langCode: "es",
    facts: [
      "Peru is an emerging LATAM market with very low keyword difficulty across all categories.",
      "Spanish metadata from Mexico localisation covers Peru effectively.",
    ],
  },
  // Remaining stores at emerging tier
  al: { name: "Albania", region: "europe", tier: "emerging", lang: "Albanian", langCode: "sq", facts: ["Albania is an emerging market with very low keyword difficulty — competition for any category is minimal.", "English keywords also perform well given high English proficiency among younger Albanian users."] },
  dz: { name: "Algeria", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Algeria is a growing market in North Africa — Arabic localisation is required for meaningful reach.", "Difficulty scores are among the lowest of any Arabic-language storefront."] },
  am: { name: "Armenia", region: "europe", tier: "emerging", lang: "Armenian", langCode: "hy", facts: ["Armenia is a very small storefront with near-zero keyword difficulty — useful for testing keyword ideas before scaling.", "English keywords are broadly understood."] },
  az: { name: "Azerbaijan", region: "europe", tier: "emerging", lang: "Azerbaijani", langCode: "az", facts: ["Azerbaijan is an emerging market where English and Russian keywords both perform well.", "Difficulty is negligible for most categories."] },
  bh: { name: "Bahrain", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Bahrain is a small but high-income Gulf market — Arabic localisation from Saudi Arabia covers Bahrain.", "English keywords also perform well given the international population."] },
  bo: { name: "Bolivia", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Bolivia is an emerging market — Spanish localisation from Mexico covers Bolivia.", "Difficulty scores are very low across all categories."] },
  ba: { name: "Bosnia and Herzegovina", region: "europe", tier: "emerging", lang: "Bosnian", langCode: "bs", facts: ["Bosnia is an emerging European market with very low difficulty — useful for low-competition keyword testing.", "English and Serbian keywords also perform reasonably well."] },
  bw: { name: "Botswana", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Botswana is an English-dominant market in Southern Africa with very low keyword difficulty.", "No localisation required."] },
  bg: { name: "Bulgaria", region: "europe", tier: "emerging", lang: "Bulgarian", langCode: "bg", facts: ["Bulgaria requires Cyrillic-script localisation for meaningful reach.", "Difficulty scores are very low — useful as a low-competition testbed."] },
  kh: { name: "Cambodia", region: "asia-pacific", tier: "emerging", lang: "Khmer", langCode: "km", facts: ["Cambodia is a very early-stage market — English keywords work reasonably well for international app categories.", "Difficulty is near-zero for most terms."] },
  cv: { name: "Cape Verde", region: "middle-east-africa", tier: "emerging", lang: "Portuguese", langCode: "pt", facts: ["Cape Verde is a tiny market covered by Portuguese localisation.", "Difficulty is negligible."] },
  td: { name: "Chad", region: "middle-east-africa", tier: "emerging", lang: "French", langCode: "fr", facts: ["Chad is a very early-stage market covered by French localisation for the Francophone population.", "Difficulty is near-zero."] },
  cr: { name: "Costa Rica", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Costa Rica is covered by Spanish localisation from Mexico.", "A small but affluent market with low difficulty."] },
  hr: { name: "Croatia", region: "europe", tier: "emerging", lang: "Croatian", langCode: "hr", facts: ["Croatia is an EU member with a growing App Store market — English keywords also perform reasonably well.", "Difficulty is low for most categories."] },
  cy: { name: "Cyprus", region: "europe", tier: "emerging", lang: "Greek", langCode: "el", facts: ["Cyprus uses Greek as its primary App Store language — Greek localisation from Greece covers Cyprus.", "Very low difficulty for all categories."] },
  cz: { name: "Czech Republic", region: "europe", tier: "mid", lang: "Czech", langCode: "cs", facts: ["Czech Republic is the largest Central European market after Poland.", "Czech localisation is standalone — Slovak is a close linguistic relative but a separate storefront."] },
  do: { name: "Dominican Republic", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Dominican Republic is covered by Spanish localisation from Mexico.", "Low difficulty across all categories."] },
  ec: { name: "Ecuador", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Ecuador is covered by Spanish localisation from Mexico.", "Very low difficulty — a minimal-effort incremental market."] },
  eg: { name: "Egypt", region: "middle-east-africa", tier: "mid", lang: "Arabic", langCode: "ar", facts: ["Egypt is the largest Arabic-language market by population — Arabic localisation from Saudi Arabia covers Egypt.", "Egypt has very low difficulty scores despite significant search volume."] },
  sv: { name: "El Salvador", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["El Salvador is covered by Spanish localisation from Mexico.", "Difficulty is near-zero for most categories."] },
  ee: { name: "Estonia", region: "europe", tier: "emerging", lang: "Estonian", langCode: "et", facts: ["Estonia has very high English proficiency — English keywords work well without localisation.", "Very low difficulty given the small market size."] },
  fm: { name: "Federated States of Micronesia", region: "asia-pacific", tier: "emerging", lang: "English", langCode: "en", facts: ["Micronesia is an English-dominant micro-market with negligible competition.", "Useful as a zero-difficulty data point."] },
  fj: { name: "Fiji", region: "asia-pacific", tier: "emerging", lang: "English", langCode: "en", facts: ["Fiji is an English-dominant market with very low keyword difficulty.", "No localisation required."] },
  gh: { name: "Ghana", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Ghana is the largest English-speaking App Store market in West Africa.", "Difficulty is very low — a low-effort market to add English coverage."] },
  gr: { name: "Greece", region: "europe", tier: "mid", lang: "Greek", langCode: "el", facts: ["Greece has a meaningful App Store market with moderate difficulty for Southern European terms.", "Greek localisation also covers Cyprus."] },
  gd: { name: "Grenada", region: "latam", tier: "emerging", lang: "English", langCode: "en", facts: ["Grenada is a micro-market with zero meaningful competition.", "English keywords work without localisation."] },
  gt: { name: "Guatemala", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Guatemala is covered by Spanish localisation from Mexico.", "Very low difficulty."] },
  gy: { name: "Guyana", region: "latam", tier: "emerging", lang: "English", langCode: "en", facts: ["Guyana is an English-dominant micro-market with negligible competition.", "No localisation required."] },
  hn: { name: "Honduras", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Honduras is covered by Spanish localisation from Mexico.", "Difficulty is near-zero."] },
  hu: { name: "Hungary", region: "europe", tier: "mid", lang: "Hungarian", langCode: "hu", facts: ["Hungarian is a unique language with no close linguistic relatives — localisation is a standalone investment.", "Difficulty scores are moderate and below Western European equivalents for the same categories."] },
  is: { name: "Iceland", region: "europe", tier: "emerging", lang: "Icelandic", langCode: "is", facts: ["Iceland is a tiny but wealthy market with very high English proficiency — English keywords work well.", "Very low difficulty for all categories."] },
  iq: { name: "Iraq", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Iraq is an emerging Arabic-language market with very low difficulty.", "Arabic localisation from Saudi Arabia covers Iraq."] },
  ie: { name: "Ireland", region: "europe", tier: "mid", lang: "English", langCode: "en", facts: ["Ireland is an English-dominant market with difficulty slightly below the UK for the same terms.", "No localisation required — existing English metadata covers Ireland."] },
  il: { name: "Israel", region: "middle-east-africa", tier: "mid", lang: "Hebrew", langCode: "he", facts: ["Israel has a technically sophisticated user base with high per-user revenue.", "English keywords perform well alongside Hebrew — Hebrew localisation adds incremental reach."] },
  jo: { name: "Jordan", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Jordan is an emerging Arabic-language market covered by Saudi Arabia localisation.", "Very low difficulty."] },
  kz: { name: "Kazakhstan", region: "europe", tier: "emerging", lang: "Russian", langCode: "ru", facts: ["Kazakhstan is largely Russian-dominant in App Store search — Russian localisation covers it.", "Low difficulty for most categories."] },
  ke: { name: "Kenya", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Kenya is the largest English-speaking market in East Africa with a rapidly growing mobile user base.", "No localisation required — very low difficulty."] },
  kg: { name: "Kyrgyzstan", region: "europe", tier: "emerging", lang: "Russian", langCode: "ru", facts: ["Russian is the dominant language for App Store search in Kyrgyzstan.", "Difficulty is near-zero."] },
  kw: { name: "Kuwait", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Kuwait is a small but high-income Gulf market — Arabic localisation from Saudi Arabia covers it.", "English also performs well given the international population."] },
  lv: { name: "Latvia", region: "europe", tier: "emerging", lang: "Latvian", langCode: "lv", facts: ["Latvia has high English proficiency — English keywords perform well without localisation.", "Very low difficulty."] },
  lb: { name: "Lebanon", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Lebanon is an Arabic-language market with a bilingual population — Arabic and English keywords both perform well.", "Very low difficulty."] },
  lu: { name: "Luxembourg", region: "europe", tier: "emerging", lang: "French", langCode: "fr", facts: ["Luxembourg is a tiny but wealthy market — French localisation covers the primary search language.", "Difficulty is negligible."] },
  mo: { name: "Macau", region: "asia-pacific", tier: "emerging", lang: "Chinese (Traditional)", langCode: "zh-MO", facts: ["Macau is a tiny market covered by Traditional Chinese localisation.", "Difficulty is near-zero."] },
  mg: { name: "Madagascar", region: "middle-east-africa", tier: "emerging", lang: "French", langCode: "fr", facts: ["French localisation from France covers the Francophone majority in Madagascar.", "Very low difficulty — negligible competition."] },
  mn: { name: "Mongolia", region: "asia-pacific", tier: "emerging", lang: "Mongolian", langCode: "mn", facts: ["Mongolia is a very small market — Russian and English keywords are understood by the tech-literate user base.", "Near-zero difficulty."] },
  ma: { name: "Morocco", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Morocco uses French as a secondary language alongside Arabic — French localisation adds incremental reach.", "Low difficulty across all categories."] },
  np: { name: "Nepal", region: "asia-pacific", tier: "emerging", lang: "Nepali", langCode: "ne", facts: ["Nepal is an emerging market with near-zero keyword difficulty.", "English keywords perform reasonably well for international app categories."] },
  nz: { name: "New Zealand", region: "asia-pacific", tier: "mid", lang: "English", langCode: "en", facts: ["New Zealand is an English-dominant market with difficulty slightly below Australia for the same terms.", "No localisation required."] },
  om: { name: "Oman", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Oman is a small Gulf market — Arabic localisation from Saudi Arabia covers it.", "Very low difficulty."] },
  pk: { name: "Pakistan", region: "asia-pacific", tier: "mid", lang: "English", langCode: "en", facts: ["Pakistan has a large and rapidly growing App Store user base — English keywords work well without localisation.", "Difficulty is very low despite significant search volume — a high-opportunity market."] },
  pa: { name: "Panama", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Panama is covered by Spanish localisation from Mexico.", "Very low difficulty."] },
  py: { name: "Paraguay", region: "latam", tier: "emerging", lang: "Spanish", langCode: "es", facts: ["Paraguay is covered by Spanish localisation from Mexico.", "Near-zero difficulty."] },
  qa: { name: "Qatar", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Qatar is a small but very high-income Gulf market — Arabic localisation from Saudi Arabia covers it.", "English also performs well given the large expat population."] },
  tt: { name: "Trinidad and Tobago", region: "latam", tier: "emerging", lang: "English", langCode: "en", facts: ["Trinidad and Tobago is an English-dominant market with negligible keyword difficulty.", "No localisation required."] },
  ro: { name: "Romania", region: "europe", tier: "mid", lang: "Romanian", langCode: "ro", facts: ["Romania is the second-largest Central European market after Poland.", "Romanian localisation is standalone — no close linguistic neighbour to bundle."] },
  sk: { name: "Slovakia", region: "europe", tier: "emerging", lang: "Slovak", langCode: "sk", facts: ["Slovak and Czech are mutually intelligible — Czech metadata provides partial coverage in Slovakia.", "Low difficulty for most categories."] },
  si: { name: "Slovenia", region: "europe", tier: "emerging", lang: "Slovenian", langCode: "sl", facts: ["Slovenia is a small EU market with high English proficiency — English keywords work well.", "Very low difficulty."] },
  lk: { name: "Sri Lanka", region: "asia-pacific", tier: "emerging", lang: "English", langCode: "en", facts: ["Sri Lanka is an English-dominant market in South Asia — no localisation required.", "Very low difficulty across all categories."] },
  sz: { name: "Swaziland", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Swaziland (Eswatini) is a micro-market — English keywords work well with no localisation.", "Near-zero difficulty."] },
  tj: { name: "Tajikistan", region: "europe", tier: "emerging", lang: "Russian", langCode: "ru", facts: ["Russian is the dominant language for App Store search in Tajikistan.", "Near-zero difficulty."] },
  tz: { name: "Tanzania", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Tanzania has a large Swahili-speaking population, but English keywords cover the App Store well.", "Near-zero difficulty."] },
  tn: { name: "Tunisia", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Tunisia is an Arabic-language market with French as a secondary language — both localisation options provide coverage.", "Low difficulty."] },
  tm: { name: "Turkmenistan", region: "europe", tier: "emerging", lang: "Russian", langCode: "ru", facts: ["Turkmenistan is a micro-market — Russian keywords are most effective for the tech-literate population.", "Near-zero difficulty."] },
  tc: { name: "Turks and Caicos Islands", region: "latam", tier: "emerging", lang: "English", langCode: "en", facts: ["Turks and Caicos is a micro-market with negligible competition.", "No localisation required."] },
  ug: { name: "Uganda", region: "middle-east-africa", tier: "emerging", lang: "English", langCode: "en", facts: ["Uganda is an English-dominant market in East Africa with a rapidly growing mobile user base.", "Very low difficulty."] },
  ua: { name: "Ukraine", region: "europe", tier: "mid", lang: "Ukrainian", langCode: "uk", facts: ["Ukraine requires Ukrainian-script metadata — Russian is no longer the primary search language.", "Difficulty is moderate and lower than most Western European markets for the same categories."] },
  uz: { name: "Uzbekistan", region: "europe", tier: "emerging", lang: "Russian", langCode: "ru", facts: ["Uzbekistan is largely Russian-dominant in App Store search — Russian localisation covers it.", "Near-zero difficulty."] },
  ye: { name: "Yemen", region: "middle-east-africa", tier: "emerging", lang: "Arabic", langCode: "ar", facts: ["Yemen is an emerging Arabic-language market — Arabic localisation from Saudi Arabia covers it.", "Near-zero difficulty."] },
};
