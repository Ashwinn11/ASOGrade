import { STRUGGLE_FIX } from "@/app/start/solutions";

/**
 * The six solution pages, one per struggle in the onboarding questionnaire.
 *
 * Kept inline in the route file while guides and glossary lived in `lib/seo/`.
 * Same shape, same lifecycle — it belongs here with the rest.
 */

export interface SolutionDetail {
  slug: string;
  fixKey: keyof typeof STRUGGLE_FIX;
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
          "Enterprise suites bundle rank tracking, ad management, review sentiment analysis, A/B testing, and executive reporting into high-priced tiers ($79 to $1,500+/mo).",
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
];
