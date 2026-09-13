import { STRUGGLE_FIX } from "@/app/onboarding/solutions";

/**
 * The six solution pages, one per struggle in the onboarding questionnaire.
 *
 * Kept inline in the route file while guides and glossary lived in `lib/seo/`.
 * Same shape, same lifecycle — it belongs here with the rest.
 */

export interface SolutionDetail {
  slug: string;
  fixKey: keyof typeof STRUGGLE_FIX | string;
  /** The H1 and listing headline. */
  title: string;
  /** Optional shorter <title> when the headline would truncate in a SERP. */
  metaTitle?: string;
  subtitle: string;
  description: string;
  breakdown: {
    heading: string;
    points: string[];
  }[];
  howItWorks: string[];
  faq: { q: string; a: string }[];
}

export const SOLUTION_DETAILS: SolutionDetail[] = [
  {
    slug: "finding-keyword-ideas",
    fixKey: "ideas",
    title: "How to Find High-Value App Store Keyword Ideas",
    subtitle: "Turning raw ideas, competitor terms, and review language into a scored candidate list",
    description:
      "Struggling to find keywords worth targeting in the App Store? Paste up to 100 raw ideas in one batch and evaluate real Apple Search Ads demand instantly.",
    breakdown: [
      {
        heading: "Why keyword ideation feels overwhelming",
        points: [
          "Most developers start with a blank page or a handful of generic category terms. When you look at broad terms like 'fitness tracker' or 'habit app', the competition feels insurmountable, but finding specific alternatives is tough without data.",
          "Brainstorming in isolation leads to choosing keywords that describe your technical architecture rather than what users actually type when they need a solution.",
          "Without a high-volume batch lookup, you end up checking 3-4 words, getting tired, and settling for whatever came to mind first.",
        ],
      },
      {
        heading: "The multi-source ideation approach",
        points: [
          "Collate raw keywords from five distinct sources: competitor names and subtitles, user reviews describing pain points, App Store auto-complete suggestions, adjacent feature names, and category synonyms.",
          "Dump all 50-100 raw ideas into a single batch without filtering early. Let the demand scoring separate the signal from the noise.",
          "Separate your keywords by search intent: discovery (what is this category?), comparison (alternatives to X), and direct utility (how do I do Y?).",
        ],
      },
    ],
    howItWorks: [
      "Paste your entire raw list — up to 100 keywords at a time — into ASOGrade.",
      "Every single keyword is scored against live Apple Search Ads demand data on a 0–100 popularity scale.",
      "Sort by popularity to immediately see which phrases have real user traffic and discard the dead ends.",
    ],
    faq: [
      {
        q: "Where do the best App Store keyword ideas come from?",
        a: "The highest-converting keyword ideas usually come from competitor user reviews (what words real people use to describe their problems) and competitor subtitles (the specific 30 characters your competitors chose to index).",
      },
      {
        q: "How many keyword ideas should I research at once?",
        a: "We recommend gathering 50 to 100 raw ideas in a single ideation pass. Scoring them in bulk gives you a broad distribution of demand and difficulty to choose the best 20-30 terms.",
      },
    ],
  },
  {
    slug: "winnable-keywords",
    fixKey: "winnable",
    title: "Finding Winnable App Store Keywords You Can Actually Rank For",
    metaTitle: "Finding Winnable App Store Keywords",
    subtitle: "Targeting high demand with low difficulty — the only quadrant worth your characters",
    description:
      "Stop wasting character space on keywords you cannot rank for. Discover how to evaluate ranking difficulty from live competitor sets and find winnable keywords.",
    breakdown: [
      {
        heading: "The vanity keyword trap",
        points: [
          "Targeting ultra-popular keywords (pop 70+) when your app has fewer than 500 ratings usually results in ranking on page 5 or 6, where 0% of organic installs happen.",
          "A position #40 rank on a 75-popularity keyword yields fewer installs than a position #2 rank on a 35-popularity keyword.",
          "Difficulty must be calculated from the strength and entrenchment of the apps actually holding the top spots right now, not guessed from category ranks.",
        ],
      },
      {
        heading: "Finding the sweet spot",
        points: [
          "The 'winnable quadrant' consists of terms with popularity above 25 and difficulty below 55 (or below 40 for brand-new apps).",
          "Identify keywords where top-ranking apps have low rating counts, infrequent updates, or poor metadata optimization.",
          "Prioritize these winnable terms in your high-weight metadata fields: your Title and Subtitle.",
        ],
      },
    ],
    howItWorks: [
      "ASOGrade calculates difficulty (0–100) by inspecting the top apps ranking in the search results right now.",
      "Plot keywords on demand vs. difficulty to instantly spot high-demand, low-competition opportunities.",
      "Reserve your 100-character keyword field and 30-character subtitle exclusively for keywords you have a realistic chance of ranking in the top 5 for.",
    ],
    faq: [
      {
        q: "What difficulty score is considered winnable for a new app?",
        a: "For a new app with under 100 ratings, focus on difficulty scores below 40. Once you cross 1,000 ratings and establish download velocity, you can compete for terms with difficulty up to 55-65.",
      },
      {
        q: "How is difficulty calculated in ASOGrade?",
        a: "Difficulty is scored by analyzing the top-ranking apps for that keyword: their rating count, rating average, update recency, and how well their title and subtitle match the search query.",
      },
    ],
  },
  {
    slug: "competitor-keywords",
    fixKey: "competitors",
    title: "How to Uncover What Keywords Competitors Rank For",
    subtitle: "Reverse-engineer any App Store URL and extract scored keyword sets in seconds",
    description:
      "Paste any App Store link and read the exact keyword set that app appears for. Uncover your competitors' ASO strategy and spot immediate keyword gaps.",
    breakdown: [
      {
        heading: "Competitors have already done the testing for you",
        points: [
          "Established competitors have spent months or years testing metadata variations and running Apple Search Ads campaigns.",
          "Their visible rankings in App Store search reveal which queries Apple considers them relevant for.",
          "By tearing down 3-5 top rivals, you can uncover dozens of niche and long-tail terms you never would have thought of on your own.",
        ],
      },
      {
        heading: "Conducting a competitor keyword audit",
        points: [
          "Look past the obvious direct rivals; examine adjacent tools and indirect competitors solving the same core problem.",
          "Analyze the 30-character subtitle of each competing app — this is their highest-priority secondary keyword target.",
          "Identify 'gap keywords': terms where a competitor ranks between #10 and #30 with weak relevance, where a focused app could easily jump ahead of them.",
        ],
      },
    ],
    howItWorks: [
      "Paste any public App Store product URL into ASOGrade.",
      "Instantly retrieve up to 50 keywords the competitor ranks for, complete with live popularity and difficulty metrics.",
      "One-click add the highest-value, winnable terms directly into your active keyword list.",
    ],
    faq: [
      {
        q: "Can I inspect any app on the App Store?",
        a: "Yes. You can paste the App Store URL of any published iOS or macOS app across all 109 supported storefronts.",
      },
      {
        q: "Do I need my own published app to spy on competitors?",
        a: "No. You don't even need an App Store account or a registered app ID. You can research competitor keywords before writing your first line of code.",
      },
    ],
  },
  {
    slug: "international-markets",
    fixKey: "markets",
    title: "International App Store Optimization Across 109 Storefronts",
    metaTitle: "International ASO Across 109 Storefronts",
    subtitle: "Evaluate keyword demand and difficulty per country before paying for translations",
    description:
      "Deciding which countries to target? Compare App Store keyword difficulty across 109 storefronts and find international markets where competition is a fraction of the US.",
    breakdown: [
      {
        heading: "The US storefront is not the only market",
        points: [
          "The US App Store is by far the most crowded and expensive market to rank in. Difficulty scores in the US are typically 15–25 points higher than in Europe, Latin America, or Asia for the same intent.",
          "Many English-speaking markets (UK, Canada, Australia, Ireland, New Zealand, South Africa) require zero translation effort but offer significantly easier ranking opportunities.",
          "Localizing metadata into German, French, Spanish, Japanese, or Portuguese often yields a much higher ROI per character than fighting entrenched US incumbents.",
        ],
      },
      {
        heading: "Data-driven storefront prioritization",
        points: [
          "Score your core keywords across multiple storefronts simultaneously to see where local search volume exists.",
          "Check whether English keywords carry sufficient demand in bilingual markets (e.g. Netherlands, Sweden, Singapore, UAE) before commissioning full localizations.",
          "Avoid spending localization budgets on markets where search demand for your specific category is negligible.",
        ],
      },
    ],
    howItWorks: [
      "Toggle between 109 country storefronts with a single click in ASOGrade.",
      "Evaluate local Apple Search Ads demand signals and local competitor difficulty per storefront.",
      "Export tailored keyword sets for each target locale to deploy in App Store Connect.",
    ],
    faq: [
      {
        q: "Which storefronts should I localize for first?",
        a: "Start with secondary English storefronts (UK, CA, AU), then check major tier-1 markets with high purchasing power and lower difficulty than the US (DE, FR, JP, KR).",
      },
      {
        q: "Do keyword difficulty scores differ between storefronts?",
        a: "Yes, substantially. Because difficulty reflects local ranking competitors, a term with 70 difficulty in the US might have a difficulty of only 35 in Brazil or Germany.",
      },
    ],
  },
  {
    slug: "research-time",
    fixKey: "time",
    title: "Fast App Store Keyword Research in Seconds, Not Hours",
    subtitle: "Score 100 keywords in a single batch with instant cached results",
    description:
      "Tired of spending full afternoons on slow, manual ASO research? Learn how to score 100 keywords across 109 storefronts in seconds with ASOGrade.",
    breakdown: [
      {
        heading: "The traditional ASO research bottleneck",
        points: [
          "Manual keyword lookup involves typing terms one by one into search bars, noting down competing apps, and manually estimating demand in a spreadsheet.",
          "Traditional enterprise ASO suites force you through lengthy onboarding: adding your app, verifying credentials, configuring trackers, and waiting for scheduled data syncs.",
          "By the time you compile a comprehensive list across multiple storefronts, hours have passed and your metadata deadline has arrived.",
        ],
      },
      {
        heading: "A streamlined, browser-first research loop",
        points: [
          "Run entire batches in seconds: paste a list of up to 100 raw terms, hit enter, and receive immediate demand and difficulty scores.",
          "Cached results return instantly on repeat visits, making iterative list refinement effortless.",
          "No software to install, no browser extensions, and no complex workspace configuration.",
        ],
      },
    ],
    howItWorks: [
      "Open ASOGrade in any modern web browser.",
      "Paste your keyword batch directly into the research table.",
      "Review demand, difficulty, and competing app counts immediately, and export your chosen shortlist directly into App Store Connect.",
    ],
    faq: [
      {
        q: "How fast is a 100-keyword batch lookup?",
        a: "Batch lookups typically return in just a few seconds. Previously scored terms are served instantly from our cache.",
      },
      {
        q: "Do I need to install any desktop software or browser extension?",
        a: "No. ASOGrade runs entirely in the cloud within your web browser on desktop, tablet, or mobile.",
      },
    ],
  },
  {
    slug: "tool-cost",
    fixKey: "cost",
    title: "Affordable App Store Keyword Research Without Enterprise Pricing",
    metaTitle: "Affordable App Store Keyword Research",
    subtitle: "The research pass on its own — no bloated dashboards, no $300/mo agency fees",
    description:
      "Need accurate Apple Search Ads keyword data without paying $100–$500/mo for enterprise ASO suites? Discover how ASOGrade delivers pure research at a fraction of the cost.",
    breakdown: [
      {
        heading: "Why legacy ASO suites are so expensive",
        points: [
          "Enterprise suites bundle rank tracking, ad management, review sentiment analysis, A/B testing, and executive reporting into high-priced tiers ($79 to $300/mo).",
          "Most indie developers, bootstrappers, and small agencies only need the keyword research pass before a release — yet they're forced to pay for the entire bundle.",
          "Seat limits and strict keyword lookup quotas artificially inflate the cost for small teams.",
        ],
      },
      {
        heading: "The focused research alternative",
        points: [
          "ASOGrade focuses strictly on the research phase: scoring popularity and difficulty across 109 storefronts and tearing down competitor keyword sets.",
          "By eliminating bloated background tracking infrastructure and seat licensing, we pass the savings directly to you.",
          "Straightforward pricing: $14.99/mo or $99/year ($8.25/mo) with full access to all 109 storefronts and all features included.",
        ],
      },
    ],
    howItWorks: [
      "Get complete access to all 109 App Store storefronts, bulk lookups, and competitor teardowns on any plan.",
      "No tier restrictions, no hidden add-ons, and no seat limits.",
      "Cancel anytime with one click.",
    ],
    faq: [
      {
        q: "What is included in the $14.99/mo or $99/yr subscription?",
        a: "Every subscription includes full access to all 109 storefronts, 100 keywords per batch, 50 ranked apps per keyword, competitor teardowns, and daily data refreshes.",
      },
      {
        q: "Why is ASOGrade cheaper than tools like AppTweak or Sensor Tower?",
        a: "We deliberately focus on the pre-release keyword research pass and do not build expensive rank tracking or ad management suites. You only pay for what you actually use.",
      },
    ],
  },
  {
    slug: "app-store-character-limit-optimization",
    fixKey: "character-limits",
    title: "How to Optimize App Store Character Limits (30/30/100)",
    metaTitle: "Optimize App Store Character Limits (30/30/100) | ASOGrade",
    subtitle: "Maximizing the 160 characters Apple actually indexes for organic keyword ranking",
    description:
      "Master the 30-character Title, 30-character Subtitle, and 100-character Keyword field. Learn how to eliminate wasted characters and maximize phrase combinations.",
    breakdown: [
      {
        heading: "The 160-Character Real Estate",
        points: [
          "Apple strictly indexes three metadata fields: the 30-character App Title, the 30-character Subtitle, and the 100-character Keyword field. Totaling 160 characters.",
          "Long descriptions (4,000 characters) and promotional text (170 characters) are completely ignored by Apple's search algorithm for keyword indexing.",
          "Every repeated character across these fields represents a lost opportunity to rank for an additional keyword combination.",
        ],
      },
      {
        heading: "Character Optimization Checklist",
        points: [
          "Fill titles and subtitles to 28–30 characters without sacrificing human readability or brand clarity.",
          "Use single commas with no spaces in the keyword field: 'run,jog,pace,marathon' rather than 'run, jog, pace, marathon'. Spaces after commas waste up to 15 characters.",
          "Remove stop words (a, an, the, and, of, for, with) from the keyword field; Apple's search engine automatically handles conjunctions and prepositions.",
        ],
      },
    ],
    howItWorks: [
      "Paste your planned Title, Subtitle, and Keywords into ASOGrade.",
      "Check character counts against Apple's strict limits and identify accidental duplicate words.",
      "Score your combined keyword set across 109 storefronts to ensure high demand.",
    ],
    faq: [
      {
        q: "Does Apple index the App Store description for search?",
        a: "No. Unlike Google Play, Apple does not index the 4,000-character app description for organic App Store search rankings.",
      },
      {
        q: "Do spaces after commas count in the keyword field?",
        a: "Yes. In the 100-character keyword field, spaces consume 1 character each. Always format keywords strictly as 'word1,word2,word3' with no spaces.",
      },
    ],
  },
  {
    slug: "recovering-from-keyword-rank-drop",
    fixKey: "rank-drop",
    title: "How to Recover from an App Store Keyword Ranking Drop",
    metaTitle: "Recover from App Store Keyword Ranking Drops | ASOGrade",
    subtitle: "Step-by-step diagnostic to identify why your ranks fell and how to regain position",
    description:
      "Did your app drop in App Store keyword rankings? Follow this systematic diagnostic to pinpoint algorithm shifts, competitor metadata changes, and rating drops.",
    breakdown: [
      {
        heading: "Common Causes of Sudden Ranking Drops",
        points: [
          "Accidental Keyword Removal: Modifying your Title or Subtitle during an update can sever long-standing phrase combinations.",
          "Competitor Metadata Updates: A competitor may have moved your target keyword from their keyword field directly into their App Title, giving them superior ranking weight.",
          "Rating Average Dip: Falling below 4.0 or 4.5 stars directly depresses Apple's search ranking algorithm score.",
          "Download Velocity Decline: A dip in external paid marketing, influencer features, or seasonal interest reduces the download momentum required to hold top ranks.",
        ],
      },
      {
        heading: "Recovery Action Plan",
        points: [
          "Check the competitor teardown for the top 5 ranking apps to see what changed in their title and subtitle metadata.",
          "Verify that your primary root keywords remain in your App Title and Subtitle.",
          "Prompt for ratings at high-satisfaction user moments to lift recent rating average.",
        ],
      },
    ],
    howItWorks: [
      "Run your keyword through ASOGrade's leaderboard to inspect the current top 50 apps.",
      "Compare competitor rating counts, review velocity, and subtitle text.",
      "Identify lower-difficulty modifier keywords to rebuild download momentum.",
    ],
    faq: [
      {
        q: "How long does it take for rankings to recover after a metadata update?",
        a: "Apple's search index typically updates within 24 to 48 hours of your app update going live in the App Store.",
      },
      {
        q: "Can Apple Search Ads help restore organic ranking?",
        a: "Yes. Driving targeted downloads through Apple Search Ads for the specific dropped keyword increases download velocity and helps rebuild organic ranking weight.",
      },
    ],
  },
  {
    slug: "stop-words-in-app-store",
    fixKey: "stop-words",
    title: "Stop Words to Remove from App Store Keywords",
    metaTitle: "Stop Words to Remove from App Store Keywords | ASOGrade",
    subtitle: "Stop wasting characters on words Apple already filters out automatically",
    description:
      "Discover the stop words Apple automatically ignores in the App Store keyword field. Reclaim 15–25 characters to index high-demand search terms.",
    breakdown: [
      {
        heading: "What Are App Store Stop Words?",
        points: [
          "Stop words are common prepositions, articles, and category terms that Apple's search engine treats as noise or provides automatically.",
          "Including stop words in your 100-character keyword field wastes valuable capacity without increasing your keyword combinations.",
          "Examples of stop words: 'the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'app', 'iphone', 'ipad', 'free'.",
        ],
      },
      {
        heading: "What to Put in Your Keyword Field Instead",
        points: [
          "Replace stop words with high-intent nouns and verbs: 'tracker', 'planner', 'editor', 'maker', 'generator'.",
          "Include singular root forms: Apple automatically matches common plurals, so targeting 'habit' also indexes 'habits' in English.",
          "Add high-relevance secondary feature words that combine with your Title root words.",
        ],
      },
    ],
    howItWorks: [
      "Audit your existing keyword list in ASOGrade to spot low-value stop words.",
      "Replace dead characters with high-popularity search queries discovered in your category.",
      "Submit optimized metadata and track improved keyword coverage.",
    ],
    faq: [
      {
        q: "Should I include the word 'app' or 'free' in my keywords?",
        a: "Never. Apple already indexes 'app' for all applications and provides filters for 'free' pricing. Putting them in your keyword field is a complete waste of characters.",
      },
      {
        q: "Does Apple combine words across commas?",
        a: "Yes. If your title has 'workout' and your keyword field has 'planner,routine', Apple combines them into 'workout planner' and 'workout routine'.",
      },
    ],
  },
  {
    slug: "singular-vs-plural-indexing",
    fixKey: "singular-plural",
    title: "Singular vs. Plural Keywords in App Store Optimization",
    metaTitle: "Singular vs Plural App Store Keywords | ASOGrade",
    subtitle: "When does Apple stem keywords and when do you need both variants?",
    description:
      "Learn how Apple's algorithm handles singular and plural keywords in English and international languages, and when to include variants.",
    breakdown: [
      {
        heading: "Apple's English Stemming Rules",
        points: [
          "In English, Apple's search engine employs morphological stemming for regular plurals ending in -s or -es (e.g., 'habit' matches 'habits', 'workout' matches 'workouts').",
          "In most cases, including both 'habit' and 'habits' in your 100-character field wastes 6 characters.",
          "However, irregular plurals or words where search intent drastically differs (e.g., 'recipe' vs 'recipes') can have slight ranking deltas for exact matches.",
        ],
      },
      {
        heading: "International Language Exceptions",
        points: [
          "In Romance languages (Spanish, French, Italian, Portuguese) and Germanic languages (German), stemming is less reliable. In some cases, exact plural matches rank higher.",
          "In ideographic languages (Japanese, Chinese), singular and plural forms do not exist grammatically in the same way, altering how root concepts are indexed.",
        ],
      },
    ],
    howItWorks: [
      "Check popularity scores for both singular and plural variants in ASOGrade.",
      "Target the variant with higher Apple Search Ads popularity in your Title and Subtitle.",
      "Avoid repeating the alternate variant in your 100-character keyword field.",
    ],
    faq: [
      {
        q: "Do I need to put both singular and plural in my keyword field?",
        a: "In English, no. The singular form almost always matches searches for the plural form, saving you character space for other unique root words.",
      },
      {
        q: "Which variant has higher search demand: 'photo editor' or 'photo editors'?",
        a: "Users overwhelmingly search 'photo editor' (singular) when looking for apps. Singular forms typically carry 2x to 5x higher search popularity.",
      },
    ],
  },
  {
    slug: "zero-repeat-keyword-strategy",
    fixKey: "zero-repeat",
    title: "The Zero-Repeat Keyword Strategy for App Store Metadata",
    metaTitle: "The Zero-Repeat Keyword Strategy | ASOGrade",
    subtitle: "Why repeating words across your Title, Subtitle, and Keyword field harms your rank",
    description:
      "Repeating words in App Store metadata does not increase ranking weight. Learn the Zero-Repeat Strategy to maximize phrase combinations and coverage.",
    breakdown: [
      {
        heading: "The Myth of Keyword Density in App Store Search",
        points: [
          "Many developers accustomed to web SEO believe repeating a keyword multiple times increases keyword density and relevance. On the App Store, this is completely false.",
          "Apple's indexing engine treats each unique word as a binary presence in your metadata set. Repeating 'fitness' in your Title, Subtitle, and Keyword field gives zero extra ranking weight.",
          "By repeating words, you forfeit 10 to 30 characters that could be used to index 3 to 5 additional root keywords.",
        ],
      },
      {
        heading: "How to Apply the Zero-Repeat Rule",
        points: [
          "Place your highest-demand core keywords in the App Title (e.g., 'Brand: Running Tracker').",
          "Use the Subtitle for completely new secondary terms (e.g., '5K Marathon Pace & GPS Map').",
          "Ensure every word in the 100-character keyword field has never appeared in either the Title or Subtitle.",
        ],
      },
    ],
    howItWorks: [
      "Audit your metadata with ASOGrade's duplication check to identify repeated tokens.",
      "Replace duplicate words with high-opportunity modifier keywords.",
      "Track your expansion in total indexed search terms across 109 storefronts.",
    ],
    faq: [
      {
        q: "Does repeating a keyword in Title and Subtitle increase its ranking weight?",
        a: "No. Apple indexes each word once. The position matters (Title has more weight than Subtitle), but repeating it across both does not boost your rank.",
      },
      {
        q: "How many total unique keywords can I fit with the Zero-Repeat Strategy?",
        a: "A well-optimized metadata set can index 20 to 25 unique root words, which combine to form hundreds of searchable long-tail keyword combinations.",
      },
    ],
  },
  {
    slug: "cracking-japan-app-store-keywords",
    fixKey: "japan-aso",
    title: "How to Rank in the Japan App Store (CJK Script Density)",
    metaTitle: "Rank in the Japan App Store (ASO Guide) | ASOGrade",
    subtitle: "Leveraging Kanji, Katakana, and secondary English indexing in the world's #3 mobile market",
    description:
      "Japan is one of the highest-grossing App Store markets. Learn how Kanji semantic density allows 2.5x more keywords and how to structure Japanese metadata.",
    breakdown: [
      {
        heading: "The Power of Ideographic Script Density",
        points: [
          "In Latin script, each word requires 4–8 characters plus a space. In Japanese, ideographic Kanji characters represent full concept words in a single character.",
          "This means Apple's 100-character keyword field in Japan holds 2.5x to 3x more distinct semantic concepts than in English.",
          "Japanese users search using three distinct scripts: Kanji (native semantic words), Hiragana (grammatical particles), and Katakana (foreign loanwords).",
        ],
      },
      {
        heading: "Japanese Metadata Best Practices",
        points: [
          "Never rely on direct machine translation. Users in Tokyo search with Katakana equivalents for Western tech (e.g., タスク for task, フィットネス for fitness).",
          "Take advantage of secondary indexing: The Japan storefront also indexes English (US) metadata! You effectively have two metadata sets.",
        ],
      },
    ],
    howItWorks: [
      "Select the Japan ('jp') storefront in ASOGrade to inspect local Apple Search Ads demand.",
      "Check localized ranking apps and review their subtitles to identify authentic Japanese search terms.",
      "Score difficulty against local Japanese apps rather than US benchmarks.",
    ],
    faq: [
      {
        q: "How does keyword difficulty in Japan compare to the US?",
        a: "For many non-gaming utility and productivity categories, keyword difficulty in Japan is 10 to 20 points lower than in the US, offering high monetization potential.",
      },
      {
        q: "Do I need Japanese screenshots to rank in Japan?",
        a: "While metadata determines search ranking, localized Japanese screenshots are essential to convert searchers into installs. Unlocalized English screenshots drop conversion by over 50% in Japan.",
      },
    ],
  },
  {
    slug: "mexican-spanish-us-app-store-hack",
    fixKey: "mexican-spanish",
    title: "How to Use Spanish (Mexico) to Double US App Store Keywords",
    metaTitle: "Double US App Store Keywords via Mexican Spanish | ASOGrade",
    subtitle: "Take advantage of Apple's cross-indexing rules to gain 160 bonus characters in the US",
    description:
      "Apple indexes Spanish (Mexico) metadata in the US App Store. Learn how to place secondary English keywords in your Mexican locale to rank for twice as many US searches.",
    breakdown: [
      {
        heading: "How Cross-Locale Indexing Works in the US",
        points: [
          "In the United States, Apple indexes two primary languages for every search query: English (US) and Spanish (Mexico).",
          "This was introduced by Apple to serve the large Spanish-speaking demographic in the US.",
          "However, Apple does not restrict Spanish (Mexico) metadata to Spanish words. You can place English keywords inside your Spanish (Mexico) localization, and they will index for US users searching in English!",
        ],
      },
      {
        heading: "Step-by-Step Implementation",
        points: [
          "Add the 'Spanish (Mexico)' locale in App Store Connect.",
          "If your target audience is purely English-speaking US users, fill the Spanish (Mexico) Title, Subtitle, and Keyword field with secondary English keywords you couldn't fit in your English (US) metadata.",
          "Do not repeat keywords already in your English (US) set. Use this space for long-tail synonyms, problem queries, and feature variants.",
        ],
      },
    ],
    howItWorks: [
      "Find 50+ high-demand keywords in ASOGrade.",
      "Assign your primary 15–20 keywords to your English (US) metadata.",
      "Assign the next 20–30 keywords to your Spanish (Mexico) metadata to double your total indexed keywords in the US App Store.",
    ],
    faq: [
      {
        q: "Does Apple reject apps for putting English keywords in Spanish (Mexico)?",
        a: "No. Thousands of top-ranking iOS apps utilize English keywords in their Spanish (Mexico) and Canadian French localizations without rejection.",
      },
      {
        q: "Can words from English (US) and Spanish (Mexico) combine into phrases?",
        a: "No. Apple combines words within a single localization (Title + Subtitle + Keywords in US), but does not cross-combine words between English (US) and Spanish (Mexico). Each locale forms its own phrase combinations.",
      },
    ],
  },
];

