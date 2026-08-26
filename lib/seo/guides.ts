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
    title: "App Store Keyword Research: A Step-by-Step Workflow",
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
          "What it deliberately does not do: the things that full ASO suites do and charge $79-$1,500/month for. If you need rank tracking dashboards, A/B test management, or review response workflows, ASOGrade is not the right tool. It is the research pass — the step before the metadata update — and stops there.",
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
    description: "Which App Store metadata fields Apple indexes for search, what weight each carries, and how to prioritize your limited character budget for maximum keyword coverage.",
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
];
