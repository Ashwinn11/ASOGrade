/**
 * Long-form guide entries — each powers one /guides/[slug] page.
 *
 * These are the primary AI-search / GEO content targets: detailed, honest,
 * practically useful articles aimed at indie developers and ASO practitioners.
 * Each is 800+ words of real editorial content, not filler.
 *
 * Shape:
 *   slug        URL segment
 *   title       H1 and page title
 *   description Meta description (under 160 chars)
 *   sections    Array of {heading, body[]} — each section is an H2
 *   faq         3-5 Q+A pairs for FAQPage JSON-LD
 *   related     Slugs of 2-3 related guides or glossary terms
 */

export interface GuideSection {
  heading: string;
  body: string[];
}

export interface GuideEntry {
  slug: string;
  /** The H1 and listing headline. */
  title: string;
  /** Optional shorter <title> when the headline would truncate in a SERP. */
  metaTitle?: string;
  description: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: { slug: string; label: string; type: "guide" | "glossary" }[];
}

export const GUIDES: GuideEntry[] = [
  {
    slug: "low-competition-app-store-keywords",
    title: "How to Find Low-Competition App Store Keywords",
    description: "A practical step-by-step method for finding App Store keywords with real search demand and low enough difficulty to rank for — without guessing.",
    sections: [
      {
        heading: "Why low-competition keywords matter for most apps",
        body: [
          "The instinct when starting App Store keyword research is to target the biggest, most-searched terms in your category. The problem is that those terms are dominated by apps with years of installs, thousands of ratings, and enough ranking weight that a new or mid-stage app cannot displace them regardless of how well-crafted the metadata is.",
          "Low-competition keywords solve this problem: they are terms with real search demand — enough that ranking in the top 3 generates meaningful organic installs — but with a difficulty score low enough that you can actually earn those positions with a well-targeted metadata update and normal organic growth.",
          "These terms exist in every category. They are the specific, niche, or slightly unfamiliar phrasings that users do search but that the major apps haven't fully captured in their own metadata. Finding them systematically — not by luck — is the core skill in practical ASO.",
        ],
      },
      {
        heading: "Step 1: Build a candidate list before scoring",
        body: [
          "Keyword research begins with ideation, not data. The data tells you which ideas are good — it cannot generate ideas for you. Start by assembling the longest list of candidates you can before worrying about scoring.",
          "Sources to work through: your competitors' App Store subtitles and names (the words they chose publicly reveal their targeting strategy), App Store search suggestions (start typing your core term and read what Apple suggests), user review language (how do users describe your app's benefit in their own words?), Apple Search Ads keyword suggestions (when setting up a campaign, Apple suggests related terms — you don't need to run the campaign to harvest the suggestions), and your own feature set vocabulary (what does your app actually do, described in 20 different ways?).",
          "Aim for at least 50-100 candidates before you start scoring. The scoring pass will eliminate most of them, and you need a wide enough net to have meaningful options after the cut.",
        ],
      },
      {
        heading: "Step 2: Score every candidate for popularity and difficulty",
        body: [
          "Once you have your candidate list, run each term through a keyword scoring tool to get two numbers: popularity (0–100, Apple Search Ads demand signal) and difficulty (0–100, how hard it is to rank based on who currently holds the top spots).",
          "The interpretation of these scores is straightforward in principle: you want keywords where popularity is meaningful (above 25 as a working threshold) and difficulty is accessible (below 60 for most apps; below 45 if you're early-stage). The high-popularity, low-difficulty zone is where low-competition opportunity lives.",
          "Score everything, including terms you think won't work. The surprising ones — terms you'd have dismissed without data — are often the best opportunities. A counterintuitive phrase that happens to have 40 popularity and 20 difficulty is worth more than the obvious category term at 65 popularity and 80 difficulty.",
        ],
      },
      {
        heading: "Step 3: Filter for the high-demand, low-difficulty zone",
        body: [
          "After scoring, sort your candidate list by difficulty (low to high), then look at what's in the bottom half of the difficulty range. From that filtered set, sort by popularity (high to low). The terms that survive both filters — low difficulty and acceptable popularity — are your low-competition keyword targets.",
          "A practical filter that works for most apps: popularity 25 or above, difficulty 55 or below. Adjust the difficulty threshold based on your app's current authority — a brand-new app with under 100 ratings should target below 40; an app with 10,000+ ratings can aim at 60+.",
          "Reject terms below 25 popularity regardless of how low the difficulty is. A perfectly accessible keyword with almost no searches generates almost no installs, even at a top-1 ranking. Low competition only matters when paired with real demand.",
        ],
      },
      {
        heading: "Step 4: Check competition in secondary storefronts",
        body: [
          "If your primary market's difficulty is blocking the terms you want, run the same candidates in secondary storefronts. The same keyword in Germany, Brazil, or Canada will often have similar popularity (if the market has real demand for your app category) but significantly lower difficulty — because fewer well-established apps have targeted those markets.",
          "This is not a workaround — it's the expected behavior of a global marketplace with uneven competitive density. The US App Store has been in existence since 2008 and has attracted the most optimized apps and the most competitive metadata. Markets that developed later have compressed competitive histories.",
          "Running your keyword research per storefront is not extra work for its own sake — it reveals where the effort-to-result ratio is highest. Two hours of metadata localization into German, aimed at terms that score 35 difficulty rather than the US equivalent at 65, may generate more organic installs than months of US optimization fighting entrenched competition.",
        ],
      },
      {
        heading: "Step 5: Validate the terms are actually relevant",
        body: [
          "Before finalizing your keyword selections, manually search each candidate in the actual App Store. Look at the results: do apps in your category appear? Is your type of app a sensible answer to that search query? If the search results are filled with apps in an unrelated category, users searching that term probably want something you're not.",
          "Relevance validation prevents the trap of chasing technically low-difficulty keywords that describe the wrong user intent. A keyword with difficulty 20 is worthless if the users searching it want a game and your app is a productivity tool.",
          "After this manual check, finalize your selection. The terms that survive all five steps — candidate, scored, filtered, checked in secondary markets, validated for relevance — are your low-competition keyword targets. These go into your metadata in the highest-weight positions your character budget allows.",
        ],
      },
    ],
    faq: [
      {
        q: "What counts as 'low competition' for App Store keywords?",
        a: "A difficulty score below 55 is generally considered accessible for an established app. Below 40 is accessible for earlier-stage apps. The threshold should be calibrated to your app's current authority — your rating count and tenure in the store. A new app should target below 40; one with significant ratings can aim for 55-60.",
      },
      {
        q: "Can low-competition keywords actually generate meaningful install volume?",
        a: "Yes, in aggregate. A single low-competition keyword at top-3 might generate 3-8 installs per day. Twenty such keywords generates 60-160 installs per day — comparable to a single high-competition broad term that took much longer and more effort to achieve. The key is building a portfolio of low-competition terms rather than expecting a single term to drive everything.",
      },
      {
        q: "How often should I repeat this process?",
        a: "Before every metadata update, which for an actively optimized app is every 4-8 weeks. The competitive landscape changes — terms that were hard to rank for 6 months ago may have opened up as a dominant competitor changed their strategy, and new terms emerge as search behavior evolves.",
      },
      {
        q: "Should I include both short and long keywords in my research?",
        a: "Yes. Short keywords ('habit tracker') are the high-volume terms — worth understanding even if you can't rank for them yet. Long, specific phrases ('sobriety habit tracker', 'ADHD habit tracker app') are where the low-competition opportunities often hide. The App Store keyword field is individual words, not phrases — 'habit' in the field matches 'habit tracker', 'habit journal', and any other phrase containing the word.",
      },
    ],
    related: [
      { slug: "keyword-difficulty", label: "Keyword Difficulty", type: "glossary" },
      { slug: "keyword-popularity", label: "Keyword Popularity", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Keyword Research Workflow", type: "guide" },
    ],
  },
  {
    slug: "app-store-keyword-research-workflow",
    title: "How to Do App Store Keyword Research: A 4-Phase Workflow",
    description: "A complete, repeatable workflow for App Store keyword research — from ideation to metadata update — for indie developers and ASO professionals.",
    sections: [
      {
        heading: "The workflow overview",
        body: [
          "App Store keyword research is most effective when it follows a consistent, repeatable process rather than an ad hoc collection of hunches. A good workflow has four phases: Ideate (build a long list of candidates), Score (evaluate each candidate for popularity and difficulty), Select (choose the best terms for the space available), and Update (write the metadata and submit).",
          "Each phase has different outputs and different tools. Ideation is a creative, expansive phase — you want quantity. Scoring is analytical — you apply objective criteria. Selection is a constrained optimization — you're fitting the best terms into 100 + 30 + 30 characters. Update is an execution step with a defined output: a metadata submission.",
          "Running the full workflow before every metadata update (roughly every 4-8 weeks for an actively managed app) is more effective than occasional large overhauls. Small, data-driven changes accumulate to large ranking improvements over time.",
        ],
      },
      {
        heading: "Phase 1 — Ideate: Build your candidate list",
        body: [
          "Start with your app's core value proposition stated in 10 different ways. What problem does it solve? What category does it belong to? What are users trying to accomplish? Each framing generates different keyword candidates.",
          "Then work through structured sources: your top competitors' names and subtitles (copy the exact words they've publicly chosen), App Store search suggestions for your 3-5 core terms, user review language (what phrases do satisfied users use to describe what the app did for them?), and your own feature vocabulary (every feature name is a potential keyword).",
          "Add terms from Apple Search Ads keyword suggestions if you have access — when starting a campaign, Apple suggests related terms that reveal adjacent search demand. You don't need to run the campaign to harvest the list.",
          "Target 80-150 candidates. More is fine; the scoring pass will cull them efficiently.",
        ],
      },
      {
        heading: "Phase 2 — Score: Get popularity and difficulty for every candidate",
        body: [
          "Run your candidate list through a keyword scoring tool. For each term in your primary storefront, you need: popularity (0–100, how much search demand exists), difficulty (0–100, how competitive the current ranking set is), and competing apps count (how many apps appear in results for this term).",
          "Score all candidates in your primary storefront first. Then for your top 20-30 candidates, check scores in 2-3 secondary storefronts — typically your next-largest markets. Secondary storefront scores often reveal that a term blocked in the US is accessible in the UK, Canada, or Australia.",
          "As you score, mark each term with a simple tier: Green (popularity 30+, difficulty 55 or below), Yellow (borderline — either popularity is lower or difficulty is higher, worth considering), Red (popularity below 25 or difficulty above 70). The scoring pass typically reduces 100+ candidates to 20-30 viable terms.",
        ],
      },
      {
        heading: "Phase 3 — Select: Fit the best terms into your metadata",
        body: [
          "Selection starts with a constraint: you have 100 characters for the keyword field, 30 for the subtitle, and 30 for the name (most of which is taken by the brand name). Work backwards from the highest-weight fields.",
          "Name: Can you work a high-value keyword into your app name without damaging the brand? Many successful apps use the format 'App Name: Category Keyword'. The name's 30 characters are the most valuable in ASO — a keyword here outranks the same keyword buried in the keyword field.",
          "Subtitle: Choose a second-tier keyword or a phrase combining two related terms. The subtitle is both algorithm-visible and user-visible (it shows in search results), so it needs to work for both readers.",
          "Keyword field: Enter your remaining selected terms as comma-separated words. Each word is indexed individually — you don't need to enter full phrases. 'budget,planner,weekly' covers 'budget planner', 'weekly planner', and 'budget weekly' without wasting characters on the spaces.",
          "Check for cannibalization: any word already in your name or subtitle doesn't need to be in the keyword field. Remove duplicates and use the freed characters for additional terms.",
        ],
      },
      {
        heading: "Phase 4 — Update: Submit and track",
        body: [
          "Write the final metadata, review it once for readability (the name and subtitle especially — they're visible to users), and submit with your next app update. The metadata update can go in an otherwise minor update; it doesn't need to be bundled with a major feature release.",
          "After submission, track results: App Store Connect's app analytics shows search impressions and installs by search term with a lag of a few days. Note which terms are generating impressions and which are converting to installs. Terms that generate impressions but few installs may indicate a conversion problem (screenshots, description), not a ranking problem.",
          "Plan your next iteration: the workflow repeats. Terms that underperformed get replaced in the next update; terms that generated strong results get supplemented with related low-competition terms. The cumulative effect of iterative, data-driven updates compounds over time.",
        ],
      },
    ],
    faq: [
      {
        q: "How long does the full workflow take?",
        a: "For an established app with a defined competitive set, a focused workflow run — ideation, scoring, selection — takes 2-4 hours. The first time through, with an unfamiliar category and process, expect 4-6 hours. Subsequent iterations are faster because you're building on previous research.",
      },
      {
        q: "Do I need to update keywords every time I update my app?",
        a: "Not necessarily, but it's worth checking scores before each update. If the scores haven't changed and your current terms are still well-chosen, you can submit the update with unchanged metadata. The point is to make the check, not to change for the sake of changing.",
      },
      {
        q: "What if my app is new with no ratings — does keyword research still matter?",
        a: "Especially then. A new app can't rely on rating count for ranking weight, so every metadata character choice matters more. The practical adjustment is targeting lower difficulty thresholds — stick to terms below 40 difficulty where the ranking set is accessible even without established authority.",
      },
    ],
    related: [
      { slug: "low-competition-app-store-keywords", label: "Finding Low-Competition Keywords", type: "guide" },
      { slug: "evaluate-keyword-difficulty", label: "Evaluating Keyword Difficulty", type: "guide" },
      { slug: "aso-keyword-research", label: "ASO Keyword Research", type: "glossary" },
    ],
  },
  {
    slug: "evaluate-keyword-difficulty",
    title: "How to Evaluate App Store Keyword Difficulty",
    description: "What keyword difficulty actually measures, how to interpret scores in context, and how to set realistic targets based on your app's current authority.",
    sections: [
      {
        heading: "What difficulty actually measures — and what it doesn't",
        body: [
          "Keyword difficulty is a score of the competitive strength of the apps currently holding the top positions for a given keyword. A high difficulty score means the apps ranking for this term are well-established — they have significant rating counts, long store tenure, and metadata that is well-aligned to the keyword. A low difficulty score means the top-ranking apps are weaker, newer, or less optimized.",
          "What difficulty does not measure: how much search demand exists (that's popularity), how relevant your app is to the keyword, or whether your app's features match what users are looking for. Those are separate considerations that you layer on top of the difficulty read.",
          "The key insight is that difficulty is about the incumbents, not about you. A keyword with difficulty 70 is hard not because it's inherently hard, but because the apps sitting in the top positions are hard to displace. As those apps change — as new competitors enter or established ones lose ranking weight — the difficulty score for the same keyword changes.",
        ],
      },
      {
        heading: "How to set difficulty targets based on your app's stage",
        body: [
          "A brand-new app with under 100 ratings has minimal ranking authority — the engagement signal Apple has for it is thin. At this stage, targeting keywords with difficulty above 50 is likely futile regardless of how good the metadata is. The ranking set above you has years of engagement signals that you simply don't have yet.",
          "The practical difficulty threshold scales roughly with rating count: below 100 ratings, aim for difficulty under 40; 100-1,000 ratings, aim for difficulty under 55; above 1,000 ratings, difficulty up to 65 becomes accessible; above 10,000 ratings, you can compete for 70+ difficulty keywords with optimized metadata and some deliberate install velocity.",
          "These thresholds are approximate — what matters is that you calibrate expectations to your current position rather than assuming any keyword is equally accessible. Good keyword research at the wrong stage of app development still generates poor results.",
        ],
      },
      {
        heading: "Interpreting difficulty across storefronts",
        body: [
          "The same keyword will have different difficulty in different App Store storefronts, and the variation is often dramatic. A US difficulty of 70 for a productivity keyword might correspond to a UK difficulty of 55, a German difficulty of 40, and a Brazilian difficulty of 25 for the equivalent terms.",
          "This variation exists because the competitive density of each market has evolved differently. The US market has been active since 2008 and has attracted the most optimized apps and the most aggressive ASO investment. Markets that developed their app ecosystems later have had less time to build up entrenched competition.",
          "For an app blocked in the US on its target keywords, running difficulty checks in secondary markets is not a fallback — it's the expected next step. The objective is finding where the demand-difficulty ratio is best, which is often not in your primary market.",
        ],
      },
      {
        heading: "When to target high-difficulty keywords anyway",
        body: [
          "High difficulty shouldn't automatically mean 'skip'. There are situations where targeting a hard keyword is strategically correct even if you won't rank top-3 for it today.",
          "The clearest case is exact-match terms for your app's core function. If your app is a budget tracker, having 'budget' or 'tracker' in the title is important for user expectation-setting and brand alignment, even if the organic ranking benefit from that specific placement is modest due to competition. The metadata serves human readers as well as the algorithm.",
          "A second case is terms where any ranking is valuable. A position-12 ranking for a very high popularity keyword (65+) may generate more installs per day than a position-1 ranking for a low-popularity term (25). The install math can favor including the high-difficulty term even if your rank is not top-5.",
          "The third case is forward-looking: if you expect your rating count to grow significantly over the next 6-12 months, including a term you'll eventually be able to rank for means the metadata is already in place when your authority crosses the threshold.",
        ],
      },
    ],
    faq: [
      {
        q: "Does difficulty change if I put a keyword in my title instead of just the keyword field?",
        a: "Difficulty measures the strength of who is currently ranking, not how you choose to target the keyword. Putting a keyword in your title increases your ranking weight for that term, which may improve your rank — but it doesn't change the difficulty score, which describes the competition above you.",
      },
      {
        q: "What if a keyword I want has very low popularity AND very low difficulty?",
        a: "Skip it unless the term is essential for brand or relevance reasons. A perfectly accessible keyword with almost no searches generates almost no installs even at position 1. Low difficulty is only valuable when paired with real demand. Prioritize terms above 25 popularity.",
      },
      {
        q: "How quickly does difficulty change?",
        a: "Slowly in stable categories; faster in dynamic ones. If a major competitor exits a market or changes their metadata significantly, difficulty for the keywords they vacate can drop noticeably. In rapidly growing app categories, new entrants regularly shift difficulty scores. Daily-refreshed scoring catches these shifts; monthly snapshots may miss them.",
      },
    ],
    related: [
      { slug: "keyword-difficulty", label: "Keyword Difficulty (Glossary)", type: "glossary" },
      { slug: "low-competition-app-store-keywords", label: "Finding Low-Competition Keywords", type: "guide" },
      { slug: "app-store-keyword-research-workflow", label: "Full Research Workflow", type: "guide" },
    ],
  },
  {
    slug: "free-vs-paid-aso-tools",
    title: "Free vs. Paid App Store Keyword Research Tools",
    description: "What free ASO keyword tools can and can't do, when a paid tool earns its cost, and how to decide what's right for your stage of development.",
    sections: [
      {
        heading: "What free tools actually give you",
        body: [
          "Free keyword research for the App Store exists in several forms: App Store search suggest (what Apple autocompletes when you start typing), basic keyword ranking checkers that manually query the store, and free tiers of paid tools that expose limited data with usage caps.",
          "Search suggest is genuinely useful for ideation — it reveals what real users are typing, and it's available to anyone with an App Store account. The limitation is that it gives you the keyword ideas, not the numbers: you can't tell from search suggest whether a term gets 5 searches a day or 5,000.",
          "Free tiers of paid tools typically give you popularity estimates for a handful of keywords per day, sometimes with a delay of days or weeks. These are useful for getting a general feel for a market but not sufficient for running a complete keyword research pass against a 100-term candidate list.",
        ],
      },
      {
        heading: "Where free tools fall short",
        body: [
          "The most significant gap in free keyword research is volume: you cannot affordably score 80-100 candidates in a sitting using tools that cap at 5 or 10 free lookups per day. A proper ideation-to-selection research pass requires scoring the full candidate list in one session — otherwise you're making selections based on incomplete data.",
          "The second gap is freshness. The App Store's competitive landscape changes continuously — apps enter and exit, metadata is updated, and popularity scores shift with search behavior. Data that is 30 days old is materially misleading for difficulty scores in fast-moving categories.",
          "The third gap is storefront coverage. Free tools typically expose data for one or two major storefronts. If your app is localized into German, French, or Japanese — or if you're investigating secondary markets as a strategy — single-storefront free tools don't support the research you need.",
        ],
      },
      {
        heading: "When a paid tool earns its cost",
        body: [
          "A paid keyword research tool earns its cost when the time it saves — or the installs it enables — exceeds the subscription fee. For an app generating above $500/month in revenue, a single well-chosen keyword that generates 5 additional organic installs per day, at a reasonable install value, pays for a year of tooling in a matter of weeks.",
          "For a pre-revenue app or an early-stage app with very low monthly revenue, the economics are tighter. The honest answer is that the free approach — using search suggest for ideation, checking a handful of priority terms with a free tool, making considered metadata choices — is viable at the very early stage when the subscription cost is a significant fraction of monthly revenue.",
          "The inflection point where a paid tool becomes clearly cost-effective is typically around $200-500/month in App Store revenue, assuming the research translates to meaningful ranking improvements. Below that, the expected value of better-researched keywords is real but the certainty is low enough that prioritizing product quality and user acquisition over ASO tooling is reasonable.",
        ],
      },
      {
        heading: "What ASOGrade does and doesn't do",
        body: [
          "ASOGrade is a paid keyword research tool at $14.99/month (or $99/year). It is specifically a research tool, not a suite — it does not include rank tracking, review management, Apple Search Ads campaign management, or reporting dashboards.",
          "What it does: scores keyword popularity and difficulty in real time across all 109 storefronts, runs competitor teardowns (paste an App Store link, read the keyword set), and lets you analyze up to 100 keywords in a single batch. The popularity signal comes from Apple Search Ads demand data, not from estimated download counts.",
          "What it deliberately does not do: the things that full ASO suites do and charge $79-$300/month for. If you need rank tracking dashboards, A/B test management, or review response workflows, ASOGrade is not the right tool. It is the research pass — the step before the metadata update — and stops there.",
          "We're not going to tell you ASOGrade is the only valid choice. If you want a comprehensive suite that includes research as one of many features, products like AppTweak, Sensor Tower, or MobileAction do that. The tradeoff is that the all-in-one price reflects the full feature set, whether you use it or not. ASOGrade charges only for the research step.",
        ],
      },
    ],
    faq: [
      {
        q: "Are there free App Store keyword research tools that are genuinely useful?",
        a: "App Store search suggest is free and genuinely useful for ideation. AppFollow, AppTweak, and Sensor Tower all offer free tiers with limited lookups. For a pre-revenue app doing initial keyword discovery, combining search suggest with a limited free tier is a viable starting point. The constraint is volume — you can't run a complete research pass within typical free tier limits.",
      },
      {
        q: "Does ASOGrade have a free tier?",
        a: "No. Keyword scoring requires an active subscription. The reason is that the popularity data comes from Apple Search Ads demand signals, which have access costs at scale. A limited free trial isn't currently available, but the annual plan at $99/year works out to $8.25/month for a full-year research budget.",
      },
      {
        q: "Is keyword research tooling worth the cost for a brand-new app?",
        a: "If you're pre-launch or very early post-launch with under 50 ratings, the honest answer is: probably not as the top priority. At that stage, product quality, ratings acquisition, and basic metadata hygiene (no cannibalization, relevant keywords in the name and subtitle) return more per dollar than sophisticated keyword research. Once you're generating some organic installs and looking to scale them, research tooling earns its cost clearly.",
      },
    ],
    related: [
      { slug: "aso-keyword-research", label: "ASO Keyword Research", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Research Workflow", type: "guide" },
      { slug: "evaluate-keyword-difficulty", label: "Evaluating Keyword Difficulty", type: "guide" },
    ],
  },
  {
    slug: "multi-storefront-keyword-research",
    title: "App Store Keyword Research Across Multiple Storefronts",
    description: "How to research keywords across 109 App Store storefronts — and why per-storefront scoring reveals opportunities that single-market research misses.",
    sections: [
      {
        heading: "Why per-storefront research is necessary, not optional",
        body: [
          "The App Store is not one global search index — it is 109 separate markets, each with its own search index, its own keyword popularity scores, and its own unique competitive landscape. A keyword that is dominant and hard to rank for in the US might be moderately popular and highly accessible in Germany, or have entirely different demand in Japan.",
          "When you do keyword research only in your primary market, you're optimizing for one market while the other 108 remain unexamined. For an app with any international user base — even an accidental one — this leaves a large share of potential organic installs on the table.",
          "Per-storefront research is also how you find the expansion markets worth localizing into. Rather than guessing which countries to bother with, you can look at where your target keywords have real demand (popularity above 25) and accessible competition (difficulty below your current threshold). That is a data-driven localization decision, not a geography guess.",
        ],
      },
      {
        heading: "The English-speaking markets: a high-ROI starting cluster",
        body: [
          "For English-language apps, the five core English-speaking storefronts — US, GB, AU, CA, IE — share the same language and broadly similar user behavior, but have meaningfully different keyword difficulty. The US is consistently the most competitive; the others typically run 5-20 points lower difficulty for the same terms.",
          "This means the UK, Australia, Canada, and Ireland are often accessible secondary targets for keywords that are blocked in the US. An app that can't crack top-5 for 'habit tracker' in the US might achieve top-3 in Australia or Ireland within a single update cycle — generating real organic installs that also contribute to engagement signals.",
          "New Zealand, South Africa, and the Philippines are further English-speaking storefronts worth checking. They have lower search volume per term, but difficulty is correspondingly very low — useful for building a ranking footprint on terms you can later challenge in the larger markets.",
          "Furthermore, ranking well in secondary English storefronts builds aggregate download velocity and rating volume that can positively influence global app authority across the entire ecosystem.",
        ],
      },
      {
        heading: "Major non-English markets: building the localization case",
        body: [
          "The major non-English storefronts — Germany, France, Japan, Brazil, South Korea, China — each have significant search volume for apps in most categories. Users in these markets search primarily in their local language, not English. An app with only English metadata is largely invisible to these searches.",
          "The localization case comes down to the keyword data: compare the popularity of your core keywords in German, French, or Portuguese (using the local-language equivalent terms) to the equivalent US English scores. If German popularity is above 25 for your core category term and German difficulty is meaningfully below the US equivalent, the ROI on a German localization is positive.",
          "This is a data exercise, not a cultural assumption. Some categories are strong in Germany; others are stronger in Japan or Brazil. The keyword research tells you which markets have real demand for your specific app category, not just which markets are large by population.",
          "When localizing metadata, avoid direct word-for-word machine translation. Native search idioms often differ from dictionary definitions. Always validate local keyword popularity using native Search Ads demand before publishing.",
        ],
      },
      {
        heading: "Emerging markets: where difficulty is near zero",
        body: [
          "In the 50+ smaller, emerging storefronts — markets like Nigeria, Pakistan, Vietnam, or the smaller LATAM countries — keyword difficulty is often extremely low. For most app categories, the top-ranking apps in these storefronts are not highly optimized, have low rating counts, and have left significant keyword real estate unclaimed.",
          "The limitation is demand: popularity scores in small storefronts are often also low, because the absolute user base is smaller. The opportunity is apps that are already popular globally but haven't optimized for these markets — they rank by default relevance, but a well-targeted metadata update could displace them and capture the available demand.",
          "Emerging markets are also useful as testing grounds. If you want to test whether a particular keyword set generates installs before committing to it in a competitive major market, ranking for it in a low-difficulty emerging market gives you a real-world signal with minimal competitive pressure.",
          "Capturing early market share in emerging regions can establish long-term defensibility as smartphone penetration and digital purchasing power continue to expand in these economies.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to do keyword research in all 109 storefronts?",
        a: "No. Focus on the storefronts where your app has users or where the demand-difficulty gap is most favorable. Start with your primary market, then check your next 3-5 target markets. For English-only apps, the other major English-speaking storefronts are the natural first additions.",
      },
      {
        q: "How do I find which keywords to research in non-English storefronts?",
        a: "Start by translating your core English keywords into the target language. Then use App Store search suggest in that storefront to see what local users are actually typing. The local phrasing may be different from a literal translation — for example, the German search term for 'budget app' is often different from the literal German translation.",
      },
      {
        q: "Does ranking in secondary storefronts affect my ranking in the primary storefront?",
        a: "Not directly — storefronts have separate ranking indexes. But the installs from secondary storefronts contribute to your overall engagement signals, which Apple does consider in some aspects of its algorithm. More importantly, secondary storefront installs are real users who generate reviews, retention data, and word-of-mouth — all of which compound your overall app authority.",
      },
    ],
    related: [
      { slug: "localization-aso", label: "Localization (ASO)", type: "glossary" },
      { slug: "app-store-storefront", label: "App Store Storefronts", type: "glossary" },
      { slug: "apple-search-ads-popularity", label: "Apple Search Ads Popularity Score", type: "guide" },
    ],
  },
  {
    slug: "competitor-keyword-set",
    title: "How to Read a Competitor's App Store Keyword Set",
    description: "A practical guide to reverse-engineering the keywords a competing app ranks for, interpreting results, and discovering winnable keyword gaps.",
    sections: [
      {
        heading: "What a competitor teardown actually reveals",
        body: [
          "Every app that appears in App Store search results is there because Apple's algorithm decided it is relevant to the user's query. By looking at which searches bring up a competitor's app, you can indirectly read their targeting strategy — which keywords they've successfully earned relevance for, even though their actual keyword field is private.",
          "A teardown is not a copy-paste operation. The terms a competitor ranks for tell you which keywords have user intent in your category, what the competition looks like for each, and where you might find gaps — terms they appear for that you don't target, or terms with lower difficulty than their top results suggest.",
          "The output of a competitor teardown is a list of scored keywords — popularity and difficulty for each term the competitor appears in results for. This list is the starting point for gap analysis and metadata planning, not the end.",
        ],
      },
      {
        heading: "Choosing which competitors to analyze",
        body: [
          "Not all competitors are equally useful to analyze. The most valuable teardowns are for apps that rank in the top 10 for your primary target keywords — these apps have demonstrated they can capture the search intent you're after, and their keyword footprint reveals how.",
          "Analyze both direct competitors (apps doing exactly what yours does) and indirect competitors (apps solving the same user problem differently). An indirect competitor may rank for terms that are underexploited in the direct category — terms with real demand that the direct competitors have overlooked.",
          "Analyze 3-5 competitors rather than just one. A single competitor's footprint reveals their strategy; multiple competitors' footprints reveal the overall keyword landscape for your category — which terms are essential (everyone ranks for them), which are differentiated (only some apps target them), and which are gaps (high demand, nobody's claimed them efficiently).",
          "Pay close attention to recently updated competitors. Apps that frequently revise their subtitles are actively testing new keyword combinations that you can learn from without spending your own release cycles.",
        ],
      },
      {
        heading: "Interpreting the teardown output",
        body: [
          "After running a teardown, you have a list of keywords with popularity and difficulty scores. Sort this list by popularity (high to low) and scan for three distinct groups:",
          "Core terms: high popularity (50+), high difficulty (65+). These are the category-defining keywords that every app targets. You need them in your metadata for relevance signal, but don't expect to rank top-3 quickly. Put them in the name or subtitle if they fit naturally.",
          "Opportunity terms: moderate popularity (25-50), moderate difficulty (40-65). These are the terms where real demand exists and the competition is accessible. These belong in your keyword field and are your near-term ranking targets.",
          "Gap terms: any popularity above 25, difficulty below 40. These are underexploited keywords that the competitor is ranking for — perhaps accidentally, or because they appear in their app name without being their primary target. These are your highest-priority additions.",
          "Filtering out branded terms of direct rivals that have strict trademark protections ensures you focus only on winnable, commercially safe search phrases.",
        ],
      },
      {
        heading: "Moving from teardown to metadata update",
        body: [
          "A competitor teardown without a metadata update is just interesting information. The true value comes from acting systematically on what you uncover. Take the gap terms and opportunity terms identified in the teardown and integrate them into your next keyword research pass.",
          "Score the gap terms in your own primary storefront (the teardown may have been run in a different market), check them in your secondary storefronts, and decide how to fit the best ones into your available metadata characters.",
          "Over time, tracking your competitor's keyword footprint across multiple teardowns reveals how their strategy is evolving — which terms they're gaining on, which they're dropping, and what new terms they're appearing for. This competitive intelligence informs your own strategy over multiple update cycles, not just the immediate next update.",
          "Document your baseline rank before publishing the update so you can accurately measure ranking improvements across every targeted competitor term.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I see a competitor's actual keyword field?",
        a: "No. Apple's keyword field is private — only the app's developer (and Apple) can see it. What you can see is the keyword ranking footprint: which searches produce results that include the competitor's app. This indirect read reveals their effective reach, even if not their exact submission.",
      },
      {
        q: "How do I know which keywords a competitor ranks for vs. just appears in?",
        a: "Ranking data shows you both the keyword and the rank position. A keyword where the competitor appears at position 2 is one they're actively optimizing for. A keyword where they appear at position 25 is one they're only loosely relevant to — less useful as a targeting inspiration.",
      },
      {
        q: "What if my competitor ranks for terms that aren't relevant to my app?",
        a: "Skip them. A competitor teardown is an input into your research, not a list to copy wholesale. Relevance is a filter you apply on top of the data — target the terms your app genuinely serves, because user intent mismatch hurts conversion and can hurt ranking quality signals over time.",
      },
    ],
    related: [
      { slug: "competitor-teardown", label: "Competitor Teardown", type: "glossary" },
      { slug: "keyword-gap-analysis", label: "Keyword Gap Analysis", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Research Workflow", type: "guide" },
    ],
  },
  {
    slug: "apple-search-ads-popularity",
    title: "Apple Search Ads Popularity Score, Explained",
    description: "What the Apple Search Ads popularity score is, how it's generated, what the 0–100 scale means, and how to use it for organic keyword research.",
    sections: [
      {
        heading: "Where the popularity score comes from",
        body: [
          "When developers set up Apple Search Ads campaigns, Apple shows them a popularity score for each keyword they're considering bidding on. This score represents the relative search demand for that term in the target App Store market — the more frequently users search the term, the higher the score.",
          "Apple does not publish absolute query counts. Instead, it exposes a 0–100 relative index, where 100 represents the highest-demand terms in the category and 0 represents terms with essentially no search activity. The index is relative to the category and market, not to all App Store searches globally.",
          "This demand signal is what ASOGrade surfaces as its popularity score. The same 0–100 scale, the same underlying data — presented without requiring you to set up an ad campaign to access it. For organic keyword research, this is the clearest demand indicator available without reverse-engineering download estimates from chart positions.",
        ],
      },
      {
        heading: "How to interpret the 0–100 scale",
        body: [
          "The scale is relative, not absolute. A popularity score of 67 doesn't mean a specific number of monthly searches — it means that term is searched more than keywords scoring 50, in that storefront, at the time the data was collected.",
          "Practical thresholds that work for most app categories: Below 15 — essentially no meaningful search volume; don't target unless the term is essential for relevance. 15-25 — light demand, perhaps worth including in the keyword field if it fits, but don't give it a title or subtitle slot. 25-50 — solid demand, worth targeting in the keyword field and potentially in the subtitle for the right term. 50-65 — high demand, worth the highest-weight positions you can give them if the difficulty is manageable. Above 65 — very high demand, expect significant competition; worth targeting if your app's authority can compete.",
          "The practical minimum for most apps is 25. Below that, even a top-1 ranking generates marginal installs. The goal is meaningful volume at an accessible difficulty — the combination, not either number alone.",
        ],
      },
      {
        heading: "Why popularity scores vary by storefront",
        body: [
          "Apple calculates popularity separately for each storefront using the search behavior of users in that market. A keyword that is heavily searched in the US might have almost no searches in a smaller market, or might be searched primarily in the local language rather than English.",
          "This storefront-by-storefront variation is essential information for localization decisions. Running the same keyword in US, UK, Germany, Japan, and Brazil reveals where real demand exists and in which language users are searching for it. A popularity score of 40 in Germany for the German-language equivalent of your core keyword is a clear signal that German localization is worth the investment.",
          "Popularity scores can also reveal that some of your English keywords have non-zero demand in non-English markets — meaning some international users are searching in English, and you can capture that demand without a full local-language localization. This doesn't replace localization but it helps prioritize which partial steps to take first.",
        ],
      },
      {
        heading: "Popularity vs. other demand signals",
        body: [
          "Before Apple's ASA popularity signal was widely accessible, ASO researchers estimated keyword demand from chart positions, category ranks, and download estimates derived from review velocity. These estimates are indirect and noisy — a keyword that generates downloads from paid campaigns looks identical to one that generates organic downloads in download-based estimates.",
          "The Apple Search Ads popularity score is a direct demand measurement: how many users are actually typing this term into the App Store search bar. It doesn't include downloads that came from browsing, editorial features, or external links — only search-driven behavior. This makes it a cleaner signal for organic keyword research than any download-based estimate.",
          "The signal is specific to the App Store, not web search. Google Keyword Planner data does not map reliably to App Store search behavior — users search differently in app stores than in web browsers, and the overlap depends heavily on category.",
        ],
      },
    ],
    faq: [
      {
        q: "Does a high popularity score guarantee I'll get installs if I rank for it?",
        a: "High popularity means high search volume, which means ranking at the top generates exposure. But conversion from impression to install depends on your app's icon, screenshots, rating, and how well the app matches the search intent. Popularity drives the traffic ceiling; conversion determines how much of that ceiling you capture.",
      },
      {
        q: "Why does the same keyword have different popularity in different countries?",
        a: "Search behavior is market-specific. Users in Brazil may search 'rastreador de hábitos' (habit tracker in Portuguese) rather than the English version. Users in Germany search in German. Each storefront's popularity score reflects what local users are actually typing — which is why you need to check the local-language equivalent, not just translate English scores.",
      },
      {
        q: "Can I access the Apple Search Ads popularity scores without running ads?",
        a: "Yes — tools like ASOGrade pull this signal and present it as a keyword score without requiring you to set up an ad campaign. You get the benefit of the ASA demand data (the most accurate search demand signal available for the App Store) without the campaign management overhead.",
      },
    ],
    related: [
      { slug: "apple-search-ads", label: "Apple Search Ads", type: "glossary" },
      { slug: "keyword-popularity", label: "Keyword Popularity", type: "glossary" },
      { slug: "multi-storefront-keyword-research", label: "Multi-Storefront Research", type: "guide" },
    ],
  },

  {
    slug: "metadata-fields-that-affect-ranking",
    title: "App Store Metadata Fields That Actually Affect Search Ranking",
    metaTitle: "Metadata Fields That Affect App Store Ranking",
    description: "Which App Store metadata fields Apple indexes, what weight each carries, and how to spend a limited character budget across title, subtitle and keyword field.",
    sections: [
      {
        heading: "The four fields that matter for search",
        body: [
          "Apple indexes four main text fields for App Store search: the App Name (30 characters), the Subtitle (30 characters), the Keyword Field (100 characters), and the Developer Name (variable). The Long Description, Promotional Text, and What's New sections are visible on the product page but are not indexed for keyword search on iOS.",
          "This is different from Google Play, where the full description is indexed and often a major driver of keyword coverage. App Store keyword strategy must work within the 160 combined characters of name, subtitle, and keyword field — everything else is product page conversion copy, not ranking fuel.",
          "Understanding this constraint is the foundation of App Store keyword strategy. Every character in the name, subtitle, and keyword field is a deliberate choice. There is no equivalent of 'write a long article and naturally include your keywords' — the field limits force explicit prioritization.",
        ],
      },
      {
        heading: "App Name: highest weight, most visible",
        body: [
          "The app name is the highest-weight metadata field for keyword ranking. A keyword in the app name ranks better for that term than the same keyword appearing only in the subtitle or keyword field. The app name is also the most visible element in search results — it's the largest text users see when deciding whether to tap.",
          "The name has 30 characters. For most apps, the brand name alone takes 5-15 characters, leaving room for one keyword or short phrase. The common format is 'Brand Name: Category Keyword' or 'Brand Name – Keyword Phrase'. Examples: 'Headspace: Mindfulness & Sleep', 'Calm: Sleep & Meditation', 'Things 3: Personal Task Manager'.",
          "What to put in the name: your single most important keyword — the term that best describes your app's function and has the highest popularity you can reasonably include without damaging brand legibility. Don't keyword-stuff the name; a name that reads as spam converts poorly regardless of how well it ranks.",
        ],
      },
      {
        heading: "Subtitle: second-weight, user-visible",
        body: [
          "The subtitle appears below the app name in search results and on the product page. It is indexed for search at the second-highest weight, below the name but above the keyword field. It is also user-visible, which means it serves both ranking (keyword coverage) and conversion (explaining the app's value).",
          "The subtitle's dual role — algorithm food and human pitch — makes it the most strategically nuanced field. A subtitle that is legible and compelling to human readers while also including 2-3 high-value keywords delivers the best combined outcome. A subtitle that is just a list of keywords ranks for those terms but may reduce conversion because it reads as noise.",
          "Best approach: write the subtitle as a value proposition sentence that naturally includes your second and third most important keywords. 'Daily Habit Tracker & Streak Counter' includes 'daily', 'habit', 'tracker', 'streak', and 'counter' without reading as a keyword list.",
        ],
      },
      {
        heading: "Keyword Field: volume coverage, algorithm only",
        body: [
          "The keyword field is 100 characters of comma-separated words that only the algorithm sees — users never read it. This makes it the right place for pure keyword coverage: terms that extend your search footprint but that you wouldn't put in the visible name or subtitle for legibility reasons.",
          "Key rules for the keyword field: (1) No spaces between words in a phrase — 'habit,tracker' not 'habit tracker'. Each word is indexed individually; the comma separates entries. (2) No words already in your name or subtitle — they're already indexed. (3) No brand names of specific apps or companies you're not affiliated with — this is against Apple's guidelines. (4) No stop words (a, the, for, of) — they're not indexed.",
          "Use the 100 characters for: competitor category terms, use-case synonyms, alternate phrasings of your core function, secondary features, and relevant adjacent terms. For an international app, the keyword field can contain terms in multiple languages (the languages of the storefronts you're targeting) — Apple indexes each separately.",
        ],
      },
      {
        heading: "Developer Name: minor but real",
        body: [
          "The developer name (the name shown under the app name in search results) is indexed for search, though at lower weight than the other fields. Some developers choose a developer name that includes category keywords: 'Budget Apps Studio' rather than a person's name.",
          "This is a minor optimization compared to the name, subtitle, and keyword field, and the developer name is shared across all your apps — changing it to optimize for one app's keywords may hurt the others. For most developers, focusing the optimization effort on the three primary fields is the right priority.",
        ],
      },
    ],
    faq: [
      {
        q: "Does the app description affect keyword ranking on iOS?",
        a: "No. Apple does not index the long description for search on iOS. Write it for conversion (convincing users who've tapped into the product page to install), not for keyword ranking. On the Mac App Store, the first paragraph may have minor indexing, but it's a much smaller signal than the primary metadata fields.",
      },
      {
        q: "Should I use all 100 characters in the keyword field?",
        a: "Yes. Every unused character is wasted keyword coverage. If you're at 95 characters, find one more relevant 5-character word to fill it. Leaving keyword field characters empty means you're choosing not to rank for terms you could be appearing in search results for.",
      },
      {
        q: "Does putting a keyword in the title guarantee I'll rank for it?",
        a: "It guarantees you're indexed for it, which is the first requirement. Actual ranking depends on the competitive strength of the other apps indexed for that term (difficulty), your app's engagement signals (installs, retention, ratings), and how precisely your app serves the user intent behind the keyword. The title placement maximizes your ranking weight; everything else determines where in the results you land.",
      },
    ],
    related: [
      { slug: "title-vs-subtitle-keywords", label: "Title vs. Subtitle Keywords", type: "glossary" },
      { slug: "keyword-cannibalization", label: "Keyword Cannibalization", type: "glossary" },
      { slug: "app-store-optimization", label: "App Store Optimization", type: "glossary" },
    ],
  },
  {
    slug: "apple-search-ads-campaign-types-for-keyword-research",
    title: "Using Apple Search Ads Campaign Types for Keyword Research",
    metaTitle: "Apple Search Ads Campaigns for Keyword Research",
    description: "How to use Apple Search Ads' Discovery, Brand, Category, and Competitor campaign structure to find real keyword ideas, even if you never spend a dollar on ads.",
    sections: [
      {
        heading: "Apple's own campaign structure is a keyword research tool in disguise",
        body: [
          "Apple recommends organizing Search Ads accounts into four campaign types: Brand (your own app and company name, exact match), Category (non-brand genre terms, exact match), Competitor (terms tied to similar apps, exact match), and Discovery (broad match plus Search Match, aimed at surfacing new terms rather than targeting known ones).",
          "Each type answers a different research question. Brand tells you what defends your name. Category tells you what generic language for your app's function looks like. Competitor tells you which adjacent apps Apple considers similar to yours. Discovery tells you what real users type that you haven't thought to target yet.",
          "You can read this structure for keyword ideas without running a single ad. Setting up a draft campaign in each category and reviewing Apple's suggested keywords costs nothing until you activate spend, and the suggestions themselves come from real query data Apple has that no third-party tool can replicate.",
        ],
      },
      {
        heading: "Discovery campaigns: the highest-value research source",
        body: [
          "A Discovery campaign runs on broad match and Search Match, which means Apple matches your ad against a wide set of related searches based on your app's own metadata and category, without you specifying exact keywords up front.",
          "After a Discovery campaign has run for even a short period, Apple's search terms report shows the actual queries that triggered your ad. This is real search behavior, not a guess: users typed these exact phrases into the App Store and Apple decided your app was relevant enough to show for them.",
          "Mine that report for terms with decent impression counts that you haven't targeted in your organic metadata. Score each one for popularity and difficulty before adding it — a term Apple matched you to isn't automatically worth a metadata slot, especially if it's a low-relevance broad match rather than a genuine intent match.",
        ],
      },
      {
        heading: "Brand, Category, and Competitor campaigns as a research checklist",
        body: [
          "Brand campaigns confirm what protects your name — useful mainly for making sure you're not missing an obvious misspelling or alternate rendering of your own app name as a keyword worth defending in metadata too.",
          "Category campaigns are where you validate the generic terms you'd expect to matter. If Apple's suggested keyword list for your category doesn't overlap heavily with your existing organic keyword field, that's worth investigating — either your metadata is missing obvious terms, or your app isn't as clearly categorized as you assumed.",
          "Competitor campaigns reveal which apps Apple's own systems consider similar to yours, which is sometimes a different list than the competitors you'd name yourself. Apps you didn't think of as direct competitors showing up here are worth a competitor teardown of their own.",
        ],
      },
      {
        heading: "Where this stops being a keyword research method",
        body: [
          "None of this replaces scoring the keywords you find. A term surfacing in a Discovery campaign's search terms report tells you it exists and that Apple matched it to you; it doesn't tell you the term's difficulty or whether you can realistically rank for it organically.",
          "It also doesn't replace running actual paid campaigns if your goal is advertising performance rather than organic keyword research. Using campaign types purely to mine keyword ideas is a legitimate, no-cost use of the platform, but it's a research technique, not a substitute for either organic optimization or a deliberate paid acquisition strategy.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to actually spend money on Apple Search Ads to use this technique?",
        a: "You need a campaign running to generate a search terms report, which does require some spend, but it can be a small daily budget over a short window rather than a sustained campaign. The goal here is harvesting real query data, not running a permanent ad program.",
      },
      {
        q: "Is Search Match the same thing as a Discovery campaign?",
        a: "Search Match is a targeting option that automatically matches your ad to relevant searches based on your app's metadata, without you entering keywords. Discovery campaigns are the campaign type built around using Search Match and broad match together to find new terms, rather than the narrower exact-match targeting used in Brand, Category, and Competitor campaigns.",
      },
      {
        q: "Should terms from a Discovery campaign go straight into my keyword field?",
        a: "No. Score each one for organic popularity and difficulty first. Apple matching an ad to a query means the query was relevant enough for an impression, not that the term has meaningful organic search volume or an achievable ranking difficulty.",
      },
    ],
    related: [
      { slug: "discovery-campaign", label: "Discovery Campaign", type: "glossary" },
      { slug: "search-match", label: "Search Match", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Keyword Research Workflow", type: "guide" },
    ],
  },
  {
    slug: "what-affects-app-store-ranking-2026",
    title: "What Actually Affects App Store Ranking in 2026",
    metaTitle: "What Affects App Store Ranking in 2026",
    description: "The current App Store ranking formula in plain terms: relevance, conversion, retention, and download velocity, and which of these a keyword update can and can't move.",
    sections: [
      {
        heading: "Ranking is a multiplication, not a checklist",
        body: [
          "App Store search ranking in 2026 behaves less like a checklist of factors you tick off and more like a formula where several inputs multiply against each other: metadata relevance, conversion rate, retention, and download velocity. A weak score on any one factor drags down the combined result, regardless of how strong the others are.",
          "This matters for how you think about a metadata update. Perfect keyword placement in your title and subtitle raises relevance, but if your app's conversion rate from search impression to install is well below your category average, or retention is poor, the metadata work alone won't produce the ranking gain you're expecting.",
          "The four inputs aren't equally controllable on the same timeline. Metadata relevance changes the moment your update is indexed. Conversion rate responds to icon, screenshots, and rating within days. Retention and download velocity are slower-moving and reflect the underlying product, not a single update cycle.",
        ],
      },
      {
        heading: "Relevance: what a keyword update actually does",
        body: [
          "Relevance is the piece keyword research directly controls. Your title, subtitle, and keyword field tell Apple's algorithm which queries your app is a plausible answer to. Getting this right is necessary but not sufficient — it makes you eligible to rank, it doesn't guarantee a strong position on its own.",
          "Screenshot caption text has been part of this relevance signal since June 2025, when Apple began OCR-indexing the text visible in screenshot captions. This is a real, if secondary, extension of what counts as indexed metadata beyond the three classic fields.",
        ],
      },
      {
        heading: "Conversion rate: the multiplier most keyword research ignores",
        body: [
          "Conversion rate — the share of people who see your app in search results and actually install it — sits around 3-5% across most categories, though this varies widely by category and by how well-targeted your keyword traffic is. A high-relevance keyword sending you low-intent traffic can produce a weak conversion rate that undermines the ranking benefit of ranking for it in the first place.",
          "This is why a gap-analysis keyword pulled from a competitor teardown needs a relevance check, not just a difficulty check. A term with real demand and low difficulty that doesn't actually describe what your app does will convert poorly once you start appearing in its results, which works against you over time rather than for you.",
          "Icon, screenshots, preview video, and rating are the primary levers for conversion rate. None of these are keyword research's job, but a keyword strategy that ignores them is optimizing one multiplier while leaving another one weak.",
        ],
      },
      {
        heading: "Retention and download velocity: what compounds and what a keyword update can't fix",
        body: [
          "Retention — whether users who install keep using the app — is now read as a first-class ranking signal in both major app stores, not just a business metric. A smaller app with strong retention and a 4.6-star rating can outrank a larger, better-known app with weaker post-install engagement, because the algorithm is weighing what happens after the install, not just before it.",
          "Download velocity, the rate of installs over a given period, acts as a multiplier on top of the others. This is part of why the halo effect between paid Apple Search Ads and organic ranking is real: a burst of paid installs raises velocity, which raises ranking, which raises organic visibility independent of any metadata change.",
          "Neither retention nor velocity responds to a keyword field update. They're downstream of product quality and marketing reach. Keyword research remains the right lever for relevance and a meaningful lever for the traffic that feeds velocity, but it isn't a substitute for the product and growth work behind the other two factors.",
        ],
      },
    ],
    faq: [
      {
        q: "If I fix my keywords but my app has weak retention, will ranking improve?",
        a: "Some, from the relevance gain alone, but less than if retention were also strong. The four factors multiply rather than add, so a weak factor caps the benefit of improving a different one. Expect a partial gain, not the full potential of a well-targeted keyword set.",
      },
      {
        q: "Does Apple publish the exact weighting of these ranking factors?",
        a: "No. Apple doesn't disclose precise weights for relevance, conversion, retention, and download velocity. The multiplicative framing reflects observed behavior in the ranking system, documented by ASO researchers and practitioners, not an official formula from Apple.",
      },
      {
        q: "Is screenshot caption text as important as the title or subtitle for ranking?",
        a: "No — it's a secondary signal added more recently, not a replacement for the three primary indexed fields (title, subtitle, keyword field). Treat correctly worded screenshot captions as a supplementary opportunity, not your main keyword strategy.",
      },
    ],
    related: [
      { slug: "app-store-conversion-rate", label: "App Store Conversion Rate", type: "glossary" },
      { slug: "retention-rate-aso", label: "Retention Rate", type: "glossary" },
      { slug: "app-store-search-ranking-factors", label: "App Store Search Ranking Factors", type: "glossary" },
    ],
  },
  {
    slug: "does-apple-search-ads-improve-organic-ranking",
    title: "Does Running Apple Search Ads Improve Organic Ranking?",
    metaTitle: "Does Apple Search Ads Boost Organic Ranking?",
    description: "What the research actually shows about the halo effect between paid Apple Search Ads and organic App Store ranking, and what Apple does and doesn't confirm.",
    sections: [
      {
        heading: "Apple doesn't officially confirm a link, but the mechanism is documented",
        body: [
          "Apple has never officially stated that running Search Ads campaigns improves your organic ranking. What exists instead is a growing body of independent evidence, including academic research, pointing to an indirect mechanism that produces exactly that effect.",
          "The proposed mechanism isn't that Apple gives advertisers a direct organic ranking boost as a reward for spending. It's that paid installs raise your app's download velocity and category ranking, and those ranking gains are visible to organic searchers too, who then contribute their own installs on top of the paid ones.",
        ],
      },
      {
        heading: "What the research found",
        body: [
          "An academic study analyzing advertising spillovers in mobile apps (via ad shutoffs and store ranking data) found that paid Apple Search Ads installs produce a measurable positive spillover to organic installs, rather than simply cannibalizing organic traffic that would have happened anyway.",
          "The study's event analysis found that shutting off ad spend decreased organic installs by 20-30% for the apps studied. Separately, longer-term panel models estimated that every $100 spent on Search Ads was associated with roughly 32 paid installs and an additional 2.2 organic installs.",
          "The mechanism the researchers point to is ranking-based: paid install velocity improves an app's category ranking, and that improved ranking increases organic visibility independent of any change to the app's own metadata.",
        ],
      },
      {
        heading: "What this means for keyword research specifically",
        body: [
          "The halo effect is a reason to think about paid and organic keyword strategy together rather than as separate workstreams. A term with a high tap-through rate on paid ads — meaning users who see your ad for that term are likely to tap it — is also a signal of relevance worth reflecting in your organic metadata.",
          "It's also a reason not to interpret an organic ranking bump as pure evidence that a metadata change worked, if you were running ads at the same time. Isolating the two effects requires either running the metadata test without concurrent ad spend, or accepting that the ranking gain is a combination of both.",
          "None of this changes the actual keyword research process — you still need popularity and difficulty numbers for organic terms regardless of whether you also advertise on them. It changes how you interpret a ranking change when both levers moved at once.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I run Apple Search Ads specifically to boost my organic ranking?",
        a: "The evidence suggests a real spillover effect exists, but it's a side effect of paid install velocity, not a guaranteed or officially sanctioned mechanism. Running ads purely for an organic boost, without also valuing the direct paid installs, is a riskier bet than running ads for their own return and treating any organic lift as a bonus.",
      },
      {
        q: "How large is the halo effect in practice?",
        a: "The cited study found roughly 2.2 organic installs per $100 of ad spend on average across the apps analyzed, with real variation likely by category and competitive density. Treat this as a directional finding rather than a number to plan a specific budget around for your own app.",
      },
      {
        q: "Does this mean my organic difficulty score will look easier if a competitor is running ads?",
        a: "A competitor's ad spend can contribute to their organic ranking strength, which is reflected in a difficulty score that measures the apps currently holding top positions. The score doesn't separate out how much of an app's ranking came from paid versus organic effort — it measures the current competitive landscape as it stands.",
      },
    ],
    related: [
      { slug: "halo-effect", label: "Halo Effect", type: "glossary" },
      { slug: "download-velocity", label: "Download Velocity", type: "glossary" },
      { slug: "apple-search-ads-popularity", label: "Apple Search Ads Popularity Score", type: "guide" },
    ],
  },
  {
    slug: "app-store-character-limits-and-what-is-indexed",
    title: "App Store Character Limits and What's Actually Indexed for Search",
    metaTitle: "App Store Character Limits & Indexing",
    description: "The 30/30/100 rule for App Store metadata, why promotional text and the description aren't indexed at all, and the screenshot-caption exception worth knowing about.",
    sections: [
      {
        heading: "The 160-character search surface",
        body: [
          "Three fields make up everything Apple indexes for App Store search: the app name (30 characters), the subtitle (30 characters), and the keyword field (100 characters). That's 160 characters total, and it's the entire text surface the search algorithm reads to decide what your app is relevant for.",
          "Every other piece of visible text on your product page exists for conversion, not discovery. Getting this distinction wrong is one of the most common metadata mistakes: writing careful, keyword-rich promotional text or description copy that has zero effect on what you rank for.",
        ],
      },
      {
        heading: "What's genuinely not indexed",
        body: [
          "Promotional text (170 characters) sits at the top of the product page and can be updated at any time without a new binary submission, which makes it useful for timely messaging — a sale, a seasonal push, a new feature callout. It is not indexed for search under any circumstance, so don't spend it on keywords you're hoping to rank for.",
          "The full description (up to 4,000 characters) is similarly not indexed on iOS. This is a real difference from Google Play, where the description does factor into search. An App Store description written purely for keyword coverage, in the style that might work on Android, wastes the opportunity to actually persuade a reader who has already seen your name, subtitle, and screenshots.",
          "What's New release notes are also not indexed. Write them for existing users deciding whether an update is worth installing, not for search visibility.",
        ],
      },
      {
        heading: "The screenshot exception",
        body: [
          "Since June 2025, Apple has been extracting text from screenshot captions via OCR and using it as a ranking signal. This is a real change from older ASO advice that treated screenshots as pure conversion assets with zero connection to search ranking.",
          "The practical implication: caption text overlaid on your screenshots is now doing double duty, same as the subtitle. It should read well to a human deciding whether to install, and it can carry keyword relevance you're not able to fit into the 30-character subtitle limit.",
          "This is a secondary signal, not a new primary field to obsess over. Don't sacrifice screenshot clarity or conversion quality to jam in keywords — a caption that reads as a keyword list rather than a feature callout is a worse trade than accepting a smaller indexing benefit.",
        ],
      },
      {
        heading: "Spending the 160 characters well",
        body: [
          "Because the searchable surface is fixed and small, every character in the name, subtitle, and keyword field should earn its place. Words already in your name don't need to be repeated in the subtitle or keyword field — Apple has already indexed them once, and repetition doesn't add ranking weight, it just wastes space you could use for a new term.",
          "The keyword field specifically rewards precision: no spaces within phrases (commas separate individual words, which are indexed independently), no stop words, and no terms already covered elsewhere in your metadata. A keyword field at 80 of 100 characters used has 20 characters of coverage you're leaving on the table for free.",
        ],
      },
    ],
    faq: [
      {
        q: "Will adding keywords to my app description help me rank higher?",
        a: "No. The description is not indexed for App Store search under any circumstance. Write it to convert a visitor who's already reached your product page, not to influence what you rank for.",
      },
      {
        q: "Is it worth adding keywords to promotional text since it's editable without a new build?",
        a: "Not for ranking purposes — promotional text isn't indexed either. Its editability without resubmission makes it useful for timely conversion messaging (a sale, a seasonal hook), which is a different job from keyword coverage.",
      },
      {
        q: "Do screenshot captions matter as much as the subtitle for ranking?",
        a: "No. Caption text OCR-indexing is a secondary signal added in 2025, meaningfully smaller in weight than the three primary indexed fields. Treat it as a bonus opportunity within otherwise conversion-focused screenshot design, not a fourth primary keyword field.",
      },
    ],
    related: [
      { slug: "promotional-text", label: "Promotional Text", type: "glossary" },
      { slug: "screenshot-caption-indexing", label: "Screenshot Caption Indexing", type: "glossary" },
      { slug: "metadata-fields-that-affect-ranking", label: "Metadata Fields That Affect Ranking", type: "guide" },
    ],
  },
  {
    slug: "app-store-optimization-myths-that-waste-your-character-budget",
    title: "App Store Optimization Myths That Waste Your Character Budget",
    metaTitle: "ASO Myths That Waste Your Metadata",
    description: "Three persistent App Store Optimization myths — keyword stuffing, ratings-as-everything, and translated keywords being enough — and what to do instead.",
    sections: [
      {
        heading: "Myth 1: repeating a keyword multiple times helps you rank higher for it",
        body: [
          "Keyword stuffing — cramming the same word into the name, subtitle, and keyword field, or repeating it several times within the keyword field itself — doesn't add ranking weight beyond the first correctly-placed instance. A word is either indexed for your app or it isn't; indexing it twice doesn't index it twice as hard.",
          "Worse, repetition inside visible fields (name and subtitle) actively hurts conversion. A subtitle like 'Budget Budget Tracker App Budget' reads as spam to a human deciding whether to install, even if it were doing something for ranking, which it isn't.",
          "The correct instinct behind this myth — that a keyword deserves emphasis — is better served by placing it in the highest-weight field it fits in (name over subtitle, subtitle over keyword field) once, and using the freed-up character space for a different term entirely.",
        ],
      },
      {
        heading: "Myth 2: your star rating is the dominant ranking factor",
        body: [
          "Ratings matter, but they're one input among several, not the deciding one. Plenty of apps with middling ratings hold strong search positions because their conversion rate, retention, and metadata relevance are strong enough to compensate. A 4.8-star app with poor retention can rank behind a 4.2-star app with excellent retention and a clean keyword strategy.",
          "This myth causes real strategic harm when it leads a team to deprioritize keyword research and metadata work in favor of pure ratings-chasing tactics (review prompts, incentivized reviews against Apple's guidelines, and similar). Ratings are worth earning honestly through product quality, but treating them as the single lever that moves ranking overstates their actual weight in the formula.",
          "The practical takeaway: keep improving your rating through genuine product quality, but don't treat a strong rating as a substitute for doing the keyword research and metadata work that controls relevance directly.",
        ],
      },
      {
        heading: "Myth 3: a translated keyword list is the same as a localized one",
        body: [
          "Running your English keyword list through a translator and submitting the output as your German, Spanish, or Japanese metadata produces grammatically correct text that frequently isn't what local users actually search. Search behavior is about the specific words and phrasings a market's users type, not the dictionary-correct translation of a different market's words.",
          "A literal translation misses regional vocabulary differences (Spain's 'móvil' versus Mexico's 'celular' for phone-related terms, for one concrete example), misses whether a loanword or a native term is more commonly searched, and misses cultural conventions in how app copy is expected to read.",
          "The fix isn't complicated, just an extra step: after translating for a baseline, verify each candidate's actual popularity in the target storefront before committing metadata space to it, and check the storefront's own autosuggest behavior for phrasings you might not have considered.",
        ],
      },
    ],
    faq: [
      {
        q: "Is there any benefit to using a keyword more than once across my metadata fields?",
        a: "No. Once a word appears in your name, subtitle, or keyword field, it's indexed. Repeating it elsewhere wastes character space that could index a different term instead. Remove duplicates and use the freed space for new coverage.",
      },
      {
        q: "If ratings aren't the dominant factor, why do highly-rated apps often rank well?",
        a: "High ratings frequently correlate with the factors that do carry real weight — strong retention and good conversion rates tend to accompany products good enough to earn high ratings in the first place. The rating itself isn't pulling the ranking up directly so much as it's a visible symptom of the same underlying product quality that is.",
      },
      {
        q: "How do I know if my translated keywords are actually being searched?",
        a: "Score them for popularity in the target storefront using the local-language term, not just the translated one. A near-zero popularity score on a grammatically correct translation is a sign the real search behavior uses different vocabulary.",
      },
    ],
    related: [
      { slug: "keyword-stuffing", label: "Keyword Stuffing", type: "glossary" },
      { slug: "translation-vs-localization", label: "Translation vs. Localization", type: "glossary" },
      { slug: "ratings-and-reviews-aso", label: "Ratings and Reviews", type: "glossary" },
    ],
  },
  {
    slug: "product-page-optimization-and-keyword-research",
    title: "How Product Page Optimization and Keyword Research Work Together",
    metaTitle: "Product Page Optimization & Keyword Research",
    description: "Product Page Optimization tests your creative, not your keywords — here's how to sequence the two so each informs the other instead of getting confused for each other.",
    sections: [
      {
        heading: "Two different tools solving two different problems",
        body: [
          "Product Page Optimization (PPO) is App Store Connect's native A/B testing tool. It lets you run up to three treatment variants against your default product page, each changing only the icon, screenshots, or app preview video, for up to 90 days, with Apple's own statistical engine measuring which treatment converts better.",
          "Keyword research answers a different question: which search terms should get you into the results in the first place. PPO answers what happens once a user has already seen your app in those results and is deciding whether to tap through and install.",
          "Confusing the two leads to wasted effort in both directions — testing screenshot variants for a keyword you don't actually rank for tells you nothing useful, and picking keywords without any regard for whether your current product page converts well on the traffic they'd send you optimizes for the wrong metric.",
        ],
      },
      {
        heading: "Sequence keyword research before creative testing",
        body: [
          "Establish your keyword targets first. Know which terms you're realistically indexed for and ranking on, using popularity and difficulty scores, before designing a PPO test around them — otherwise you're testing creative for an audience you haven't confirmed you're actually reaching.",
          "Once you know your real search traffic sources, a PPO test becomes meaningfully targeted: you can test whether a screenshot sequence that leads with the specific benefit implied by your top keyword converts better than a more generic sequence, because you know that keyword is actually driving a measurable share of your impressions.",
          "Custom Product Pages (CPPs) are a related but distinct tool — up to 35 per app, used to build a page variant for a specific external campaign URL rather than for organic search traffic. CPPs are not eligible for PPO testing, and they don't affect what you rank for organically; they're a landing-page tool for paid or referral traffic, not a keyword research instrument.",
        ],
      },
      {
        heading: "What a PPO result can and can't tell you about your keywords",
        body: [
          "A winning PPO treatment tells you which creative converts better for your current traffic mix. It doesn't tell you whether a different keyword strategy would send you better-matched traffic in the first place. A screenshot sequence can only convert the visitors your metadata actually attracts.",
          "If a PPO test shows weak conversion across all treatments despite solid impression volume, that's a signal worth checking against your keyword relevance, not just your creative. Ranking for a keyword whose searchers don't actually want what your app does will show up as poor conversion no matter how good the screenshots are.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I run a PPO test before or after a keyword field update?",
        a: "After, generally. Let a keyword update settle and get re-indexed first, so you have a stable sense of which terms are actually sending you traffic, then design the PPO test around that real traffic rather than a traffic mix that's about to change.",
      },
      {
        q: "Can Custom Product Pages help with keyword research?",
        a: "No. CPPs serve specific campaign URLs and don't factor into organic search indexing or ranking. They're useful for tailoring a landing experience to a specific paid or referral audience, not for testing or improving keyword performance.",
      },
      {
        q: "How long should I run a PPO test before trusting the result?",
        a: "Apple's own tooling uses Bayesian statistical analysis and will flag a treatment as performing better or worse once it reaches a stated confidence level, typically referenced around 90%. Tests can run up to 90 days; low-traffic apps may need most of that window to reach a reliable read.",
      },
    ],
    related: [
      { slug: "product-page-optimization", label: "Product Page Optimization", type: "glossary" },
      { slug: "custom-product-pages", label: "Custom Product Pages", type: "glossary" },
      { slug: "app-store-conversion-rate", label: "App Store Conversion Rate", type: "glossary" },
    ],
  },
  {
    slug: "seasonal-app-store-keyword-calendar",
    title: "A Seasonal App Store Keyword Calendar",
    metaTitle: "Seasonal App Store Keyword Calendar",
    description: "The recurring windows where App Store search demand shifts predictably by category, and how much lead time to give a metadata update before each one.",
    sections: [
      {
        heading: "Demand isn't flat across the year",
        body: [
          "Several app categories see sharp, predictable, recurring shifts in search demand tied to the calendar. Treating keyword research as a one-time or purely reactive exercise misses the chance to have the right metadata already live when a seasonal search spike starts, rather than scrambling once it's underway.",
          "The categories most affected are health and fitness, education, shopping and deals, and finance — but the underlying idea, that certain terms spike predictably, is worth checking against your own category even if it isn't one of these.",
        ],
      },
      {
        heading: "New Year: the single biggest window for fitness, habits, and finance",
        body: [
          "The period from late December through mid-January is the largest install window of the year for fitness, habit-tracking, and personal finance apps, driven by New Year's resolution behavior. Terms like 'New Year workout', 'resolution tracker', and similar goal-oriented phrasing see a real, temporary spike in search popularity during this window.",
          "Because App Store metadata updates take some time to review and index, submit seasonal keyword and screenshot changes in early-to-mid December rather than waiting until January 1st — by the time a submission clears review and indexes, a chunk of the highest-intent early window may have passed.",
        ],
      },
      {
        heading: "Back-to-school: education's equivalent window",
        body: [
          "Mid-August through mid-September sees a comparable spike for education apps, study tools, and productivity apps aimed at students, as the school year begins and both students and parents search for organizational and learning tools.",
          "The same lead-time logic applies: prepare metadata and creative updates in late July or early August so the update is live and indexed before the bulk of back-to-school search activity begins, rather than reacting once enrollment season is already underway.",
        ],
      },
      {
        heading: "Black Friday and Cyber Monday: a shorter, sharper spike",
        body: [
          "Late November's shopping events drive a shorter but more intense spike in search and install activity for shopping apps, deal-finder tools, and retail-adjacent utilities. Because the window itself is brief, a common guideline is to start preparing 4-6 weeks ahead and submit metadata changes 2-3 weeks before the event, to allow for review and indexing lag before the spike arrives.",
          "Promotional text, since it can be updated without a new build, is a useful secondary lever here for timely messaging around the sale itself, even though it doesn't affect what you rank for.",
        ],
      },
      {
        heading: "Summer: a smaller, secondary fitness peak",
        body: [
          "January remains the largest fitness-category window of the year, but the summer months (roughly June through August) represent a real secondary peak, driven by outdoor activity and event-driven motivation ('summer body', 'beach workout', and similar seasonal phrasing) rather than resolution behavior.",
          "This peak is worth checking for popularity in your specific category before committing metadata space to seasonal terms — the effect is real but generally smaller than the New Year window, and worth confirming with current scores rather than assumed from general industry commentary.",
        ],
      },
    ],
    faq: [
      {
        q: "How far in advance should I submit a seasonal metadata update?",
        a: "For the New Year and back-to-school windows, 2-4 weeks ahead is a reasonable buffer for review and indexing. For a sharper, shorter event like Black Friday, 2-3 weeks ahead is the commonly cited minimum, with preparation starting 4-6 weeks out.",
      },
      {
        q: "Should I revert seasonal keywords after the window passes?",
        a: "Check the popularity score for the seasonal term outside its window — if it drops close to zero, holding that character-field space for a keyword with no off-season demand is a poor trade against a term with steadier year-round popularity.",
      },
      {
        q: "Do these seasonal windows apply outside fitness, education, and shopping categories?",
        a: "The four covered here are the most documented, but the underlying pattern — recurring calendar-driven search spikes — is worth checking for any category with an obvious seasonal or event tie-in. Score your own candidate seasonal terms rather than assuming a pattern documented for other categories applies identically to yours.",
      },
    ],
    related: [
      { slug: "seasonal-keyword-calendar", label: "Seasonal Keyword Calendar", type: "glossary" },
      { slug: "keyword-seasonality", label: "Keyword Seasonality", type: "glossary" },
      { slug: "how-often-to-update-app-store-keywords", label: "How Often to Update Keywords", type: "guide" },
    ],
  },
  {
    slug: "translation-vs-localization-for-app-store-metadata",
    title: "Translation vs. Localization for App Store Metadata",
    metaTitle: "Translation vs. Localization for App Metadata",
    description: "Why a word-for-word translated keyword list underperforms a properly localized one, with real vocabulary and tone examples across major markets.",
    sections: [
      {
        heading: "Translation changes the language; localization changes the words people actually search",
        body: [
          "Translating your English App Store metadata into another language produces text that is grammatically correct and readable. It does not guarantee that the specific words you chose are the words users in that market actually type into App Store search — those are two different problems, and solving the first doesn't solve the second.",
          "A translated keyword list is a reasonable starting point, not a finished one. The step that turns a translation into a proper localization is checking the actual local-language popularity of each candidate, and researching what a native speaker in that specific storefront searches, which sometimes diverges meaningfully from the dictionary-correct rendering of your original English term.",
        ],
      },
      {
        heading: "Vocabulary drift is real, not a rare edge case",
        body: [
          "Spanish alone illustrates this across its own storefronts: a phone is often 'móvil' in Spain and 'celular' across most of Latin America. A German compound noun for a single concept can have more than one valid written form. Brazilian and European Portuguese diverge on everyday words like 'bus' ('ônibus' versus 'autocarro') closely enough to how American and British English diverge, sometimes more.",
          "None of these differences show up as a translation error — a translator would render each correctly for its target dialect. They show up as a research gap when a single English-to-everywhere translation pass is used to generate metadata for every storefront that nominally shares a language.",
        ],
      },
      {
        heading: "Tone and copy conventions differ by market, independent of vocabulary",
        body: [
          "Beyond individual word choice, the expected style of app copy varies by market. Japanese product pages tend toward detailed, feature-by-feature description copy. US listings favor concise, benefit-led copy. Brazilian copy tends toward a warmer, more conversational, enthusiastic register than either.",
          "This affects promotional text and description more directly than the indexed keyword fields, since those are the fields users actually read in full. But it's part of the same underlying point: a straight translation optimizes for linguistic correctness, not for matching a market's actual expectations and search behavior.",
        ],
      },
      {
        heading: "A workable process for turning a translation into a localization",
        body: [
          "Start from a translated baseline for coverage, then score every candidate keyword's actual popularity in the target storefront using the local term, not the source-language term run through translation. A near-zero score on a grammatically correct translation is the clearest signal that real usage differs.",
          "Check the storefront's own App Store search autosuggest for your core concepts to surface local phrasing you might not have considered. Where a market has genuine dialect variation within a shared language (Spanish, Portuguese, and similar), treat each storefront's vocabulary as its own research pass rather than assuming one list covers the whole language.",
        ],
      },
    ],
    faq: [
      {
        q: "Is it ever fine to just translate my keyword list and ship it?",
        a: "For an initial low-cost test of whether a market has any demand at all, a translated list is a reasonable first pass. Before investing real character-field space and design effort in a full localization, verify the translated terms' actual popularity rather than assuming translation alone is sufficient.",
      },
      {
        q: "How much does vocabulary really differ within one language across storefronts?",
        a: "Enough to matter. Spanish and Portuguese both have documented, common everyday-word differences between their major storefronts, comparable in scale to the differences between American and British English, and sometimes larger.",
      },
      {
        q: "Does this apply to the keyword field, or just visible copy like description and promotional text?",
        a: "Both. The keyword field is exactly where vocabulary drift matters most, since it's pure keyword coverage — a mistranslated or dialect-mismatched keyword-field term returns close to zero real search demand, wasting character space that a correctly localized term would have used productively.",
      },
    ],
    related: [
      { slug: "translation-vs-localization", label: "Translation vs. Localization", type: "glossary" },
      { slug: "cross-localization", label: "Cross-Localization", type: "glossary" },
      { slug: "localization-aso", label: "Localization (ASO)", type: "glossary" },
    ],
  },
  {
    slug: "rtl-and-asian-market-aso-considerations",
    title: "RTL and Asian Market ASO Considerations",
    metaTitle: "RTL & Asian Market ASO Considerations",
    description: "What right-to-left layout means for Arabic and Hebrew metadata, and how Japanese and Chinese script and copy conventions differ from Western App Store defaults.",
    sections: [
      {
        heading: "Right-to-left affects more than text alignment",
        body: [
          "Arabic and Hebrew are read right-to-left, and Apple's App Store interface mirrors accordingly for RTL locales — navigation elements, layout flow, and reading order all flip. This has real consequences for screenshots that include any UI chrome, directional arrows, or ordered step sequences: a screenshot that reads correctly left-to-right will read backwards to an RTL user if it isn't specifically designed for that direction.",
          "Since screenshot caption text has been OCR-indexed as a ranking signal since June 2025, this isn't purely a design and conversion concern anymore. RTL-locale screenshots need correctly rendered, properly directional Arabic or Hebrew captions to get the same indexing benefit an English-locale screenshot gets, not a mirrored image with an untranslated or incorrectly rendered caption.",
        ],
      },
      {
        heading: "Japanese and Chinese: script mixing and vertical text",
        body: [
          "Japanese text in ordinary use mixes three scripts: kanji, hiragana, and katakana, and a single concept sometimes has valid search candidates in more than one script, particularly for loanword-derived terms that get searched in katakana even when a native kanji equivalent exists.",
          "Both Japanese and Chinese can be rendered vertically as well as horizontally, though horizontal rendering is standard for App Store metadata and most app UI. Where a screenshot or preview asset uses vertical text as a stylistic choice, confirm it still reads correctly and isn't mistaken for a rendering error by users unfamiliar with the convention in a software context.",
          "Chinese requires a further decision most Western-market ASO doesn't: Simplified Chinese for mainland China versus Traditional Chinese for Taiwan, Hong Kong, and Macau. These aren't the same character set rendered differently — running one through a script converter changes the characters but not necessarily the underlying vocabulary, which has diverged after decades of separate usage.",
        ],
      },
      {
        heading: "Copy conventions differ independent of script",
        body: [
          "Japanese app descriptions and product pages tend toward detailed, feature-by-feature copy, a real contrast to the concise, benefit-led style that performs well in US-market listings. This is a market convention, not a translation quality issue, and it applies to promotional text and description even though neither is indexed for search.",
          "Formality register also matters more visibly in Japanese and Korean app copy than in most Western markets — polite, formal phrasing is the safer default for a general-audience app, with more casual register reserved deliberately for youth-oriented categories.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need separate screenshot designs for RTL markets, or just translated captions?",
        a: "Separate designs, ideally. Any screenshot with directional UI elements, ordered steps, or interface chrome needs to be laid out for right-to-left reading, not just have its caption text translated on top of a left-to-right design.",
      },
      {
        q: "Can I use one Chinese keyword list for China, Taiwan, and Hong Kong?",
        a: "Not reliably. China uses Simplified Chinese; Taiwan and Hong Kong use Traditional Chinese, with Hong Kong's Cantonese influence adding further vocabulary differences from Taiwan's Mandarin-based usage. Score each storefront's actual local terms rather than converting one script to another.",
      },
      {
        q: "Should I test both kanji and katakana forms of a Japanese keyword?",
        a: "Yes, for concepts with an English-loanword origin. Both forms can carry meaningfully different search volume, and Apple indexes them as distinct strings even when a Japanese speaker treats them as interchangeable.",
      },
    ],
    related: [
      { slug: "rtl-language-aso", label: "RTL Language ASO", type: "glossary" },
      { slug: "screenshot-caption-indexing", label: "Screenshot Caption Indexing", type: "glossary" },
      { slug: "translation-vs-localization-for-app-store-metadata", label: "Translation vs. Localization", type: "guide" },
    ],
  },
  {
    slug: "aso-checklist-before-launch",
    title: "An App Store Keyword Research Checklist Before Launch",
    metaTitle: "ASO Checklist Before Launch",
    description: "A concrete pre-launch keyword research checklist for an app with zero ratings and no ranking history, focused on what actually matters at that stage.",
    sections: [
      {
        heading: "A pre-launch app has no ranking authority — plan around that, don't ignore it",
        body: [
          "An app with zero ratings and no store history has none of the engagement signals (retention, download velocity, rating count) that established apps use to compete for higher-difficulty terms. Every pre-launch keyword decision should assume you're starting from the most accessible end of the difficulty range, not the terms you'd eventually want once the app has traction.",
          "This isn't a permanent constraint — it's a starting condition. The checklist below is about making good decisions for month one, with the expectation that difficulty targets widen as ratings and installs accumulate.",
        ],
      },
      {
        heading: "The checklist",
        body: [
          "1. Build a candidate list of 50-100 keywords before scoring anything, pulling from your own feature vocabulary, competitor subtitles, App Store search suggestions, and (if available) Apple Search Ads Discovery campaign data.",
          "2. Score every candidate for popularity and difficulty in your primary storefront. Set your difficulty ceiling low — under 40 is a reasonable target for an app with no ratings yet, rather than the 55-65 range an established app might target.",
          "3. Reject anything below roughly 20-25 popularity regardless of how low the difficulty is. A pre-launch app especially can't afford to spend scarce character-field space on a term with no real demand behind it.",
          "4. Check your top 15-20 surviving candidates across 2-3 secondary storefronts. A pre-launch app has no existing localization commitments yet, which makes this the cheapest point in the app's life to build a multi-storefront keyword strategy from scratch.",
          "5. Write your name, subtitle, and keyword field against the surviving list, prioritizing the single best keyword for the name, two to three for the subtitle as a natural phrase, and the rest for the keyword field without duplication.",
          "6. Manually search your top 10 chosen terms in the actual App Store before submission. Confirm the results are genuinely apps like yours, not an unrelated category — a pre-launch app has zero track record to recover from a bad first relevance signal.",
          "7. Plan your first re-score for 4-6 weeks post-launch, once you have some initial ratings and installs, to check whether your difficulty ceiling can widen.",
        ],
      },
    ],
    faq: [
      {
        q: "Is it worth doing multi-storefront research before I even have one rating?",
        a: "Yes — it's cheaper before launch than after, since there's no existing single-market metadata investment to reconsider. You're building the initial keyword set for every target storefront at once rather than retrofitting localization onto an established listing later.",
      },
      {
        q: "Should a pre-launch app target any high-difficulty keywords at all?",
        a: "Generally no, with a narrow exception for a core category term needed for basic relevance and brand clarity (a budgeting app probably needs 'budget' somewhere even if it can't rank top-10 for it immediately). Reserve the rest of your limited character budget for terms you can realistically move on.",
      },
      {
        q: "How soon after launch should I re-run this checklist?",
        a: "4-6 weeks is a reasonable first checkpoint, once you have enough ratings and installs to reassess your difficulty ceiling. Waiting much longer risks leaving winnable terms unclaimed once your app's authority has actually improved.",
      },
    ],
    related: [
      { slug: "new-app-keyword-strategy", label: "New App Keyword Strategy", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Keyword Research Workflow", type: "guide" },
      { slug: "evaluate-keyword-difficulty", label: "Evaluating Keyword Difficulty", type: "guide" },
    ],
  },
  {
    slug: "portfolio-keyword-strategy-for-studios",
    title: "Portfolio Keyword Strategy for Studios With Multiple Apps",
    metaTitle: "Portfolio Keyword Strategy for Studios",
    description: "How to avoid your own apps cannibalizing each other's App Store rankings when you manage several apps in a similar category.",
    sections: [
      {
        heading: "The failure mode a single-app view can't see",
        body: [
          "A studio running keyword research one app at a time, in isolation, can end up with two of its own apps targeting the same keyword without anyone noticing. Apple's algorithm doesn't favor you for owning both apps — it ranks them independently, which means you're often splitting your own relevance and installs across two listings competing for one result set, sometimes losing both positions to an unrelated third party in the process.",
          "This is invisible from inside any single app's dashboard, because each app's keyword research looks reasonable on its own. The problem only shows up when you compare candidate and live keyword lists across the whole portfolio side by side.",
        ],
      },
      {
        heading: "Building a shared keyword map",
        body: [
          "Maintain one running list of which app in your portfolio holds which core keywords, updated whenever any app's metadata changes. This doesn't need to be sophisticated — a spreadsheet mapping keyword to app to storefront to current difficulty is enough to catch most conflicts before they happen.",
          "Before finalizing a metadata update for any single app, check its proposed keyword list against this shared map. A keyword already assigned to a sibling app is a candidate for removal unless there's a deliberate reason both apps should compete for it (rare, but not impossible if the two apps serve genuinely different sub-segments of the same broad term).",
          "Use consistent popularity and difficulty thresholds across the portfolio when deciding what's worth targeting. If one app used a 40-difficulty ceiling and another used 65, comparing their keyword lists for overlap doesn't tell you much, since the two lists were built against different standards of what counts as accessible.",
        ],
      },
      {
        heading: "Deciding which app should hold a contested keyword",
        body: [
          "When two apps in the portfolio are both plausible candidates for the same term, prioritize the app most specifically aligned with that term's likely user intent, not simply the app with the higher existing rating count. A generalist app grabbing every contested term from more specialized sibling apps tends to under-convert on searches that wanted the specialized functionality.",
          "Where the apps are close enough in relevance that either could reasonably hold the term, favor whichever app has stronger current retention and conversion signals — those are the factors that compound with ranking, and putting a contested keyword behind the weaker-performing app wastes the opportunity.",
          "Revisit contested-keyword assignments periodically rather than treating the first decision as permanent. As one sibling app's engagement signals improve relative to another's, the better home for a shared keyword can shift.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I know if two of my apps are actually cannibalizing each other?",
        a: "Compare their candidate and live keyword lists directly, storefront by storefront. Any keyword appearing as a target for more than one of your own apps in the same storefront is a candidate conflict worth a deliberate decision, even if neither app's individual research flagged it as a problem.",
      },
      {
        q: "Does ASOGrade limit how many apps I can research under one account for this kind of comparison?",
        a: "No — the subscription covers however many apps you research; there's no per-app or per-domain fee that would make cross-portfolio comparison more expensive than researching a single app.",
      },
      {
        q: "Should sibling apps ever deliberately share a keyword?",
        a: "Occasionally, if the apps serve different enough sub-segments of a broad term's search intent that both can convert well on it without directly competing for the same user. This is the exception, not the default — most contested keywords are better resolved by picking one app to hold the term.",
      },
    ],
    related: [
      { slug: "portfolio-keyword-cannibalization", label: "Portfolio Keyword Cannibalization", type: "glossary" },
      { slug: "keyword-cannibalization", label: "Keyword Cannibalization", type: "glossary" },
      { slug: "evaluate-keyword-difficulty", label: "Evaluating Keyword Difficulty", type: "guide" },
    ],
  },
  {
    slug: "single-keyword-vs-keyword-phrase-strategy",
    title: "Single Keywords vs. Keyword Phrases: Which Strategy Wins",
    metaTitle: "Single Keywords vs. Keyword Phrases",
    description: "When to target one-word, high-competition terms versus multi-word phrases in App Store metadata, and how the keyword field's word-indexing rules change the calculation.",
    sections: [
      {
        heading: "The keyword field indexes words, not phrases",
        body: [
          "The App Store keyword field is a set of comma-separated words, each indexed independently rather than as a fixed phrase. Entering 'budget,tracker,weekly' covers searches for 'budget tracker', 'weekly budget', 'weekly tracker', and any other combination of those three words, without needing to spell out every phrase variant explicitly.",
          "This changes how to think about single words versus phrases: you're rarely choosing between one or the other in the keyword field itself, since individual words there recombine automatically. The real choice is which individual words earn a spot in your limited 100 characters, and separately, whether your subtitle (which is read as a literal phrase, not word-indexed) should target a broad single word or a specific multi-word phrase.",
        ],
      },
      {
        heading: "Single, broad words: high popularity, high difficulty, real but distant upside",
        body: [
          "A single broad word like 'fitness' or 'budget' typically carries high popularity and high difficulty simultaneously — lots of search demand, and a ranking set dominated by the most established apps in the category. For a new or mid-stage app, targeting one of these as a primary ranking goal is usually not realistic in the near term.",
          "That doesn't mean broad terms have no place. Including the core category word somewhere in your metadata matters for basic relevance signaling and for the (smaller, but real) share of installs that come from any ranking at all on a very high-volume term, even outside the top few positions.",
        ],
      },
      {
        heading: "Multi-word phrases: where accessible ranking usually lives",
        body: [
          "A specific phrase like 'weekly budget planner' or 'ADHD habit tracker' has lower absolute search volume than the broad single-word version, but the ranking set competing for that specific intent is typically far less entrenched, since fewer apps have built metadata precisely targeting the narrower phrase.",
          "This is where most of the accessible, near-term ranking opportunity lives for apps below the top tier of established players. A portfolio of well-chosen specific phrases, each capturing a smaller but real slice of demand at a low difficulty, often out-produces a single broad term you can't realistically rank for.",
          "The subtitle is the field where phrase construction matters most directly, since it's read as connected text rather than word-indexed like the keyword field. A subtitle written as a coherent phrase covering two or three specific terms ('Weekly Budget & Bill Planner') does double duty as both a phrase-level ranking signal and legible, convert-worthy copy.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I enter multi-word phrases in the keyword field with commas, or as one entry?",
        a: "Enter the individual words, comma-separated, without spaces inside a phrase. 'Budget planner' should be entered as 'budget,planner' — this indexes both words independently and covers more combinations than trying to preserve the phrase as a single unit.",
      },
      {
        q: "Is a specific long-tail phrase ever worth more than a broad single word?",
        a: "In terms of realistic installs generated, often yes for apps that can't rank top-5 for the broad term. A portfolio of accessible specific phrases with real popularity typically produces more actual installs than a broad term you rank 40th for.",
      },
      {
        q: "Does the subtitle behave the same word-indexing way as the keyword field?",
        a: "No. The subtitle is indexed as the literal text you write, which is why it needs to read as a coherent phrase rather than a comma-separated word list the way the keyword field does.",
      },
    ],
    related: [
      { slug: "single-keyword-vs-phrase-match", label: "Single Keyword vs. Phrase Match", type: "glossary" },
      { slug: "long-tail-keywords", label: "Long-Tail Keywords", type: "glossary" },
      { slug: "title-vs-subtitle-keywords", label: "Title vs. Subtitle Keywords", type: "glossary" },
    ],
  },
  {
    slug: "how-often-to-update-app-store-keywords",
    title: "How Often to Update Your App Store Keywords",
    metaTitle: "How Often to Update App Store Keywords",
    description: "A practical update cadence for App Store keywords, weighed against indexing lag and the real cost of churning a keyword set that's already working.",
    sections: [
      {
        heading: "The two costs on either side of this decision",
        body: [
          "Updating too rarely means leaving winnable terms unclaimed as your app's authority grows, and missing shifts in the competitive landscape that open up previously-blocked keywords. Updating too often means paying an indexing-lag cost on every change (a new submission takes time to review and re-index) and risking the loss of accumulated ranking signal on a term that was quietly working, for the sake of chasing a marginally better one.",
          "There's no single correct cadence for every app, but a workable default exists: check scores before every planned app update, and treat a full keyword research pass as warranted roughly every 4-8 weeks for an actively maintained app, rather than either updating every release or leaving metadata untouched for a year.",
        ],
      },
      {
        heading: "When to check without necessarily changing anything",
        body: [
          "Before any app update you're submitting anyway, it costs little to re-score your current keyword set and see whether anything has shifted meaningfully. If your existing terms are still scoring well on both popularity and difficulty, submit the update with unchanged metadata rather than changing for the sake of having something to report.",
          "This check-without-churning approach also catches genuine problems early: a keyword that's held steady for months but has recently seen its difficulty spike (a new well-funded competitor entering the category, for instance) is worth knowing about before it costs you a ranking position, not after.",
        ],
      },
      {
        heading: "When a full re-research pass is actually warranted",
        body: [
          "A full pass — new candidate ideation, not just re-scoring the existing list — makes sense on a slower cycle, roughly every 4-8 weeks for an app receiving regular updates, or whenever a specific trigger occurs: a significant jump in your app's rating count (crossing 100, 1,000, or 10,000 ratings meaningfully changes what difficulty is realistic), a major competitor entering or exiting your category, or approaching a known seasonal window relevant to your app.",
          "Avoid re-researching purely because a scheduled interval has passed with no other signal. The value of a full pass comes from genuinely new information — new candidate ideas, a changed competitive landscape, a changed app authority level — not from the calendar alone.",
        ],
      },
      {
        heading: "The cost of churning a working keyword set",
        body: [
          "Replacing a keyword that's ranking reasonably well resets whatever accumulated relevance signal Apple has built for your app on that term. A marginal improvement in a candidate's raw popularity or difficulty score isn't automatically worth that reset, particularly for a term close to a ranking position that's already generating installs.",
          "A reasonable rule: only replace a currently-working keyword when the alternative is meaningfully better (not marginally), or when the current term has genuinely stopped performing (declining impressions or installs attributable to it, not just a slightly less attractive score on paper).",
        ],
      },
    ],
    faq: [
      {
        q: "Should I update my keywords with every single app release?",
        a: "Not necessarily. Check scores before every release, but only change metadata when the check reveals something worth acting on. Changing keywords purely because a release is happening anyway can churn a working term for no real gain.",
      },
      {
        q: "How long does it take for a keyword change to show up in rankings?",
        a: "Re-indexing typically happens within a few days of an update going live. Meaningful ranking movement on a newly targeted term can take longer, particularly for more competitive terms where accumulating enough engagement signal to climb the ranking set takes sustained installs over time, not just the metadata change itself.",
      },
      {
        q: "What's a good trigger for a full re-research pass outside the normal 4-8 week cycle?",
        a: "A significant milestone in ratings count, a new well-funded competitor entering your category, or an upcoming seasonal window relevant to your app are all reasonable triggers for an out-of-cycle full pass, rather than waiting for the next scheduled check.",
      },
    ],
    related: [
      { slug: "keyword-indexing-time", label: "Keyword Indexing Time", type: "glossary" },
      { slug: "app-store-keyword-research-workflow", label: "Keyword Research Workflow", type: "guide" },
      { slug: "seasonal-app-store-keyword-calendar", label: "Seasonal Keyword Calendar", type: "guide" },
    ],
  },
  {
    slug: "what-is-a-good-apple-search-ads-popularity-score",
    title: "What's a Good Apple Search Ads Popularity Score? A Decision Framework",
    metaTitle: "What's a Good Apple Search Ads Popularity Score",
    description: "Beyond the basic 0-100 scale: a decision framework for which popularity and difficulty combinations are worth acting on at different stages of an app's life.",
    sections: [
      {
        heading: "Popularity alone doesn't answer the question you're actually asking",
        body: [
          "'Is this a good popularity score' is really two questions collapsed into one: does this term have enough real demand to matter, and given that demand, is the difficulty of ranking for it accessible to my app right now. A popularity score in isolation, without a difficulty read and without knowing your app's current authority, doesn't tell you whether a keyword is worth a metadata slot.",
          "The generic thresholds — below 25 is weak, 25-50 is solid, above 65 is high demand — are a reasonable starting orientation, but the actual decision depends on pairing that number with difficulty and with your app's stage.",
        ],
      },
      {
        heading: "A framework by app stage",
        body: [
          "Pre-launch or under 100 ratings: prioritize popularity above 25 paired with difficulty under 40. At this stage, difficulty accessibility matters more than chasing the highest popularity you can find, since you have no ranking authority to compete on a harder term regardless of its demand.",
          "100-1,000 ratings: the accessible difficulty ceiling rises to roughly 55. This is typically the stage where a portfolio strategy — several popularity-30-to-50 terms at accessible difficulty — starts to outproduce chasing any single high-popularity term.",
          "1,000-10,000 ratings: difficulty up to 65 becomes realistic for well-targeted metadata, and it's worth starting to test one or two higher-popularity, higher-difficulty terms in the subtitle or name, since your app now has enough engagement signal to compete meaningfully.",
          "Above 10,000 ratings: difficulty in the 70+ range is worth pursuing for terms with genuinely high popularity, provided your conversion rate and retention are also strong — remember that ranking is a multiplication of relevance, conversion, retention, and velocity, not relevance alone.",
        ],
      },
      {
        heading: "When a lower-popularity term is the better choice",
        body: [
          "A term with popularity 30 and difficulty 35 frequently produces more actual installs, sooner, than a term with popularity 60 and difficulty 75 that you rank 30th for. Position matters enormously — a top-3 ranking on a moderate-demand term reliably outperforms a buried ranking on a high-demand one.",
          "This is the core argument for scoring your full candidate list rather than cherry-picking the handful of highest-popularity terms and stopping there. The best decision is usually visible only once you can compare the full spread of popularity-difficulty combinations against each other.",
        ],
      },
    ],
    faq: [
      {
        q: "Does a good popularity score mean the same thing in every storefront?",
        a: "The scale itself is relative within each storefront, not globally comparable. A popularity of 50 in a smaller storefront reflects strong relative demand there, even though the storefront's absolute search volume is lower than a major market's.",
      },
      {
        q: "Should I ever target a keyword with popularity below 25?",
        a: "Rarely, and mainly for relevance or brand reasons rather than install-volume reasons — a core category term your app needs for basic clarity, even if its measured popularity is modest. As a portfolio strategy for driving installs, terms below 25 popularity are usually not worth the character-field space.",
      },
      {
        q: "How do I decide between two similarly-scored candidates?",
        a: "Check relevance first — does the term actually describe what your app does, since a mismatched term hurts conversion even if it scores well. Then prefer the one with lower difficulty relative to your current app stage, since position matters more than raw demand for actual install volume.",
      },
    ],
    related: [
      { slug: "keyword-popularity", label: "Keyword Popularity", type: "glossary" },
      { slug: "keyword-difficulty", label: "Keyword Difficulty", type: "glossary" },
      { slug: "evaluate-keyword-difficulty", label: "Evaluating Keyword Difficulty", type: "guide" },
    ],
  },
  {
    slug: "reading-app-store-connect-analytics-alongside-third-party-tools",
    title: "Reading App Store Connect Analytics Alongside a Keyword Research Tool",
    metaTitle: "App Store Connect Analytics + Keyword Tools",
    description: "What App Store Connect's own impressions, conversion, and retention data tells you that a keyword research tool doesn't, and how to use both together.",
    sections: [
      {
        heading: "Two different vantage points on the same problem",
        body: [
          "App Store Connect's native analytics shows you what actually happened after your current metadata went live: search impressions and installs by search term, conversion rate, and retention, all specific to your app's real traffic. A keyword research tool shows you the landscape of possibility: which candidate terms have demand, how difficult they are to rank for, and what a competitor's footprint looks like.",
          "Neither view replaces the other. App Store Connect can't tell you about a keyword you're not currently ranking for at all — it only reports on terms already generating impressions for your app. A research tool can't tell you how your actual current metadata is performing in the real world; it can only estimate demand and difficulty for a term in the abstract.",
        ],
      },
      {
        heading: "What App Store Connect tells you that a research tool can't",
        body: [
          "Real conversion rate by search term, when available, is the clearest signal for distinguishing a relevance problem from a difficulty problem. A term generating solid impressions but a conversion rate well below your app's average suggests the traffic isn't well-matched to what your app does, regardless of how favorable its popularity and difficulty scores looked in research.",
          "Retention data tied to acquisition source, where available, can reveal that installs from a particular keyword or campaign retain worse than your average, which is a signal worth feeding back into keyword selection — a term that technically converts but attracts the wrong user isn't a long-term win even if it moves your ranking numbers short-term.",
        ],
      },
      {
        heading: "What a research tool tells you that App Store Connect can't",
        body: [
          "App Store Connect has no visibility into terms you don't currently rank for, which means it can't help with the ideation and gap-finding side of keyword research at all. Discovering that a specific phrase has real demand and low difficulty, before you've ever targeted it, is exactly the blind spot a research tool fills.",
          "It also can't tell you a competitor's keyword footprint, since that data belongs entirely to the competitor's own account. A competitor teardown — reading which searches surface a rival's app — is only possible through the indirect ranking-based approach a research tool uses, not through your own App Store Connect dashboard.",
          "And App Store Connect reports on your current reality with some lag, while a research tool's difficulty score reflects the live competitive set right now, which is the number you need before deciding what to change next, not just what already happened.",
        ],
      },
      {
        heading: "Using both in one workflow",
        body: [
          "Start a research cycle by pulling your current App Store Connect performance: which terms are generating impressions, what's converting, what's retaining. Flag any term with weak conversion or retention despite decent impression volume as a candidate for replacement, independent of its research-tool scores.",
          "Then run your full candidate list — including replacements for flagged underperformers — through popularity and difficulty scoring. After the next metadata update goes live and has time to accumulate data, return to App Store Connect to see how the new terms actually performed, closing the loop.",
        ],
      },
    ],
    faq: [
      {
        q: "Is App Store Connect's analytics data enough on its own for keyword research?",
        a: "No — it only reports on terms you're already ranking for, with no visibility into untried candidates or competitor keyword footprints. It's the essential feedback half of the loop, not a substitute for the research half.",
      },
      {
        q: "How much lag is there in App Store Connect's search-term analytics?",
        a: "There's typically a delay of a few days before impression and conversion data by search term becomes available, which is worth factoring in when deciding how soon after a metadata change to check results.",
      },
      {
        q: "If a keyword has a great popularity and difficulty score but converts poorly in App Store Connect, what should I do?",
        a: "Trust the real conversion data over the research score. A poor conversion rate on real traffic usually points to a relevance mismatch between the term and your app that a demand/difficulty score can't detect on its own — reconsider whether the term genuinely describes what your app does.",
      },
    ],
    related: [
      { slug: "app-store-connect-analytics", label: "App Store Connect Analytics", type: "glossary" },
      { slug: "app-store-conversion-rate", label: "App Store Conversion Rate", type: "glossary" },
      { slug: "what-affects-app-store-ranking-2026", label: "What Affects App Store Ranking", type: "guide" },
    ],
  },
];
