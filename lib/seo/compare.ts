import { MATURITY_LINE } from "@/app/onboarding/solutions";

/**
 * The four comparison pages.
 *
 * Lived inline in `app/compare/[slug]/page.tsx` while the parallel guides and
 * glossary trees kept theirs in `lib/seo/` — same content shape, two different
 * homes. Moved here so every pSEO dataset is found in the same place and the
 * sitemap can import the slugs from the same source the route generates from.
 */

export interface ComparePageData {
  slug: string;
  maturityKey: keyof typeof MATURITY_LINE;
  title: string;
  subtitle: string;
  description: string;
  quickVerdict?: {
    summary: string;
    bestForCompetitor: string;
    bestForASOGrade: string;
  };
  intro: string[];
  whatThisApproachDoes: string[];
  whereItFalls: string[];
  whereASOGradeFits: string[];
  faq: { q: string; a: string }[];
}

export const COMPARE_DATA: ComparePageData[] = [
  {
    slug: "guessing",
    maturityKey: "guess",
    title: "ASOGrade vs. Guessing on Instinct",
    subtitle: "Moving from gut feel to grounded keyword decisions",
    description:
      "Guessing on keyword instinct is a common starting point — here's what it costs you and when a research tool earns its keep.",
    quickVerdict: {
      summary:
        "Instinct generates strong candidate ideas but cannot predict search demand or ranking accessibility. ASOGrade pairs intuitive ideation with real Apple Search Ads popularity and difficulty metrics.",
      bestForCompetitor: "Day 0 pre-launch product validation before committing to optimization.",
      bestForASOGrade: "Developers actively updating metadata to systematically grow organic App Store downloads.",
    },
    intro: [
      "Most developers pick their first App Store keywords on instinct. You know your app, you know what it does, and you write the subtitle and keyword field based on how you'd describe it. This is a reasonable starting point — you're not making things up, you're drawing on genuine product knowledge.",
      "The problem is that instinct doesn't have access to two pieces of information that matter: which of your instinctive terms actually have search demand in the App Store, and which of them have ranking sets you can realistically break into. Without those numbers, you're optimizing on assumptions that may or may not match real user search behaviour.",
    ],
    whatThisApproachDoes: [
      "Instinct-based keyword selection draws on your understanding of your app's category, your competitors' names, and the language you see in similar apps' subtitles. These are valid inputs.",
      "It is genuinely faster for a first pass than running a full research workflow. For very early-stage apps where the entire product is still being validated, spending an afternoon on keyword research before you know if anyone wants the app at all is a poor use of time.",
      "The honest cost of instinct-only selection: you're choosing without knowing whether a term has 5 searches a day or 500, and without knowing whether the top-ranking apps for that term are beatable by an app with your current rating count.",
    ],
    whereItFalls: [
      "Instinct reliably picks category-correct keywords — terms that describe what the app does. What it misses is the distinction between keywords that describe the app and keywords that describe the search. These are often different. Users search for problems and outcomes ('sleep better', 'stop snooze') not always for product categories ('sleep timer', 'alarm app').",
      "Instinct also has no signal on difficulty. You might choose a perfectly relevant keyword that is dominated by apps with 50,000 ratings and a three-year ranking history. That term is in your metadata, you're indexed for it, and you rank 45th. The traffic value is near zero.",
      "Over time, the instinct approach generates a keyword set that is semantically reasonable but not optimised — some terms are generating installs, most aren't, and you have no data to tell them apart.",
    ],
    whereASOGradeFits: [
      "ASOGrade replaces the guess on demand with a number: the Apple Search Ads popularity score for each keyword in each storefront. Before writing a single character of metadata, you can see which of your instinctive candidates actually have users searching for them.",
      "It also replaces the guess on accessibility with the difficulty score. You can see, before committing to a keyword, whether the apps currently ranking for it are beatable at your current stage — or whether you should find a lower-difficulty synonym first.",
      "The workflow is: generate your instinctive candidates (instinct is still useful for ideation), score them, cut the ones with no demand or impossible difficulty, and write metadata against what's left. The instinct drives the candidate list; the data drives the final selection.",
    ],
    faq: [
      {
        q: "Is instinct-based keyword selection always wrong?",
        a: "No — instinct is useful for generating the candidate list. The problem is using instinct for the final selection, without demand and difficulty data to validate the choices. Instinct says 'habit tracker is relevant'; data says whether 'habit tracker' or 'daily habits app' has better demand and accessibility.",
      },
      {
        q: "At what point does keyword research pay off vs. just guessing?",
        a: "When you have an app generating some organic installs and you want to grow them systematically. For a pre-launch app or a very early-stage product, instinct plus basic metadata hygiene is a reasonable starting point. Once you're investing in ASO updates to drive growth, data-driven research pays for itself.",
      },
      {
        q: "Can't I just check my keyword performance in App Store Connect?",
        a: "You can see which terms led to impressions and installs after the fact — but not the demand or difficulty of terms you're not yet targeting. App Store Connect analytics tells you how well your current keyword set is working; keyword research tells you which set to try next.",
      },
    ],
  },
  {
    slug: "spreadsheets",
    maturityKey: "sheet",
    title: "ASOGrade vs. DIY Keyword Spreadsheets",
    subtitle: "What spreadsheet-based ASO does well and where it stalls",
    description:
      "DIY spreadsheet keyword research is a disciplined approach — here's what it gets right, what it misses, and when dedicated tooling becomes worth the cost.",
    quickVerdict: {
      summary:
        "Spreadsheets are free and highly customizable for small keyword sets, but fail at volume and multi-storefront scale. ASOGrade cuts 2–3 hours of manual lookup down to seconds with daily-refreshed scoring across 109 markets.",
      bestForCompetitor: "Developers tracking 20–30 keywords in a single market with zero tooling budget.",
      bestForASOGrade: "Developers running batch research across 100+ keywords or multiple App Store countries.",
    },
    intro: [
      "Running App Store keyword research through a spreadsheet — collecting candidates, manually checking each one in the App Store or via a free tool, recording scores, sorting and filtering — is a legitimate approach. It is disciplined, repeatable, and free beyond the time investment.",
      "Many indie developers and small studios manage their ASO this way and get good results. The question is not whether spreadsheet-based research works, but at what point the time cost and data freshness limitations make a dedicated tool the better option.",
    ],
    whatThisApproachDoes: [
      "A spreadsheet research workflow forces you to be systematic. You're documenting your candidate list, your scoring criteria, your selections, and your rationale. That documentation is valuable for team communication, for client reporting if you're a freelancer, and for your own memory of why you made specific choices.",
      "It also works with any data source — you can pull scores from any tool that gives you numbers, store them in a spreadsheet, and do whatever analysis you want on top. If your keyword scoring tool changes, your spreadsheet structure stays the same.",
      "For apps with small keyword sets (20-30 keywords, single storefront), the overhead of a dedicated tool versus a spreadsheet is small. The workflow is comparable in time.",
    ],
    whereItFalls: [
      "The spreadsheet approach breaks down at volume. Running 100 keyword candidates through a manual research process — checking each one, recording the scores, refreshing when stale — takes hours per research pass. For a monthly update cycle with 100+ candidates, the time cost compounds quickly.",
      "Data freshness is the second limitation. Keyword difficulty changes as competitors update their metadata, and popularity shifts with search behaviour. Scores recorded in a spreadsheet age immediately. A score from last month may not reflect the current ranking landscape for a dynamic category.",
      "The third limitation is multi-storefront research. Checking the same 100 keywords across 5 storefronts in a spreadsheet means 500 manual lookups. The time cost makes thorough multi-storefront research impractical with a manual workflow.",
    ],
    whereASOGradeFits: [
      "ASOGrade makes the scoring pass fast: paste up to 100 keywords, get popularity and difficulty back in seconds, with daily-refreshed data. The research workflow that takes 2-3 hours in a spreadsheet takes 20-30 minutes in ASOGrade.",
      "The multi-storefront capability is the second main difference. Checking the same keyword set in the UK, Germany, and Brazil alongside the US is a matter of switching the storefront selector, not running hundreds of additional manual lookups.",
      "For teams that have a well-established spreadsheet workflow, ASOGrade can slot in as the data source — export the scored results and continue the analysis in the spreadsheet if that's where your process lives.",
    ],
    faq: [
      {
        q: "Does moving to a dedicated tool mean I lose the documentation value of the spreadsheet?",
        a: "No — you can maintain the spreadsheet as the record of decisions, sourcing the numbers from ASOGrade instead of manual lookups. The spreadsheet documents what you chose and why; the tool supplies the current data quickly.",
      },
      {
        q: "How much time does switching from spreadsheet to dedicated tool actually save?",
        a: "For a complete research pass across 100 candidates in a single storefront: typically 2-3 hours of manual lookup reduced to 20-30 minutes. For multi-storefront research (4+ markets), the saving is proportionally larger — manual is impractical, ASOGrade makes it routine.",
      },
    ],
  },
  {
    slug: "aso-suites",
    maturityKey: "tool",
    title: "ASOGrade vs. Full ASO Suites",
    subtitle: "The keyword research pass versus the everything tool",
    description:
      "Full ASO suites do more than keyword research. Here's what they include, what they cost, and when a dedicated research tool makes more sense.",
    quickVerdict: {
      summary:
        "Full suites ($79–$300/mo) bundle rank tracking, review management, and ad intelligence with steep onboarding. ASOGrade ($8.25–$14.99/mo) focuses strictly on the pre-update keyword scoring pass with zero setup.",
      bestForCompetitor: "Agencies and teams requiring daily rank tracking, review replies, and enterprise ad analytics.",
      bestForASOGrade: "Developers who only need keyword demand & difficulty scoring before metadata updates.",
    },
    intro: [
      "If you're already paying for a full ASO suite, you know the numbers matter — you're already investing in data to improve your App Store results. The question is whether you're using the full feature set you're paying for, or whether you primarily need the keyword research component.",
      "Full ASO suites — products like AppTweak, Sensor Tower, and MobileAction — are comprehensive platforms that bundle keyword research, rank tracking, review management, competitor monitoring, ad campaign analytics, and reporting dashboards. They price for the full bundle.",
    ],
    whatThisApproachDoes: [
      "A full ASO suite provides everything in one platform: keyword scoring, your app's current ranking positions for every keyword, automated alerts when rankings change, a review inbox with response tools, Apple Search Ads campaign performance data, and shareable reports.",
      "For teams doing active rank tracking — monitoring dozens of keywords daily across multiple apps and markets — the suite's tracking and alerting features are genuinely valuable and not replicated by a pure research tool.",
      "For agencies managing multiple clients, the multi-app management, white-label reporting, and team seat features of a full suite are practical necessities, not luxuries.",
    ],
    whereItFalls: [
      "Full suites start at roughly $79/month and run to about $300/month at the top tiers. If you primarily need the keyword research pass — scoring candidates before a metadata update — you're paying for rank tracking, review management, ad analytics, and reporting features you may not use.",
      "The comprehensiveness of a full suite can also create overhead. Onboarding requires setting up your app, verifying it, configuring storefronts, and learning the dashboard before you can run your first keyword lookup. For a developer who needs to research keywords for a single update, the setup cost is real.",
      "Full suite keyword data quality varies by provider and is often not directly from Apple's Search Ads demand signal — some use proxy models based on download estimates or third-party panels that introduce noise.",
    ],
    whereASOGradeFits: [
      "ASOGrade is the keyword research half of the stack, without the tracking and management features. The first action is pasting a keyword list — no app setup, no verification, no storefront configuration first.",
      "If you're already using a full ASO suite, ASOGrade is not a replacement — it's a complement for the research phase. Some practitioners use a dedicated research tool for the deep pre-update research pass and their suite for ongoing monitoring.",
      "If you're not tracking rankings daily, don't manage reviews at scale, and don't need the reporting features, ASOGrade at $8.25-14.99/month covers the research workflow at a fraction of suite pricing.",
    ],
    faq: [
      {
        q: "Does ASOGrade include rank tracking?",
        a: "No. ASOGrade scores keywords for research purposes — it does not track your app's current ranking position for those keywords over time. If you need daily rank tracking, a full ASO suite includes this. ASOGrade is the research pass before the metadata update, not the monitoring after it.",
      },
      {
        q: "Is the keyword data in ASOGrade from the same source as in ASO suites?",
        a: "ASOGrade's popularity score comes directly from Apple Search Ads demand signals — the same data Apple uses for ad pricing. Some full suites use the same source; others use proxy models. Ask your suite provider what their popularity score represents.",
      },
      {
        q: "Should I cancel my ASO suite and switch to ASOGrade?",
        a: "Only if you're primarily using the suite for keyword research and not using rank tracking, review management, or reporting features. If you use the full feature set, the suite's value justifies the price. If you're paying for features you don't use, the research-only approach is cheaper.",
      },
    ],
  },
  {
    slug: "agencies",
    maturityKey: "agency",
    title: "ASOGrade vs. Hiring an ASO Agency",
    subtitle: "When agency-managed ASO makes sense — and when it doesn't",
    description:
      "ASO agencies handle keyword research and metadata for you. What you get, what it costs, and when DIY research with good tooling is the better fit.",
    quickVerdict: {
      summary:
        "Agencies charge $500–$5,000/mo to handle full ASO strategy on retainer. ASOGrade ($8.25–$14.99/mo) lets developers run in-house research or audit agency shortlists with verifiable Apple Search Ads data.",
      bestForCompetitor: "High-revenue apps lacking internal marketing bandwidth who want full delegation.",
      bestForASOGrade: "Developers managing ASO in-house or wanting independent verification of agency recommendations.",
    },
    intro: [
      "Hiring an ASO agency or freelancer to manage your keyword research means outsourcing the process entirely — they run the research, write the metadata, submit the updates, and report results. For the right situation, this is genuinely valuable. For others, it creates dependency without the corresponding benefit.",
      "The most important thing you can do with agency-managed ASO is understand their work well enough to evaluate it. Being able to check a shortlist they've proposed — looking up the demand and difficulty for each keyword they've recommended — is the minimum viable oversight for a decision that directly affects your app's organic growth.",
    ],
    whatThisApproachDoes: [
      "A good ASO agency brings category expertise, established research workflows, and the ability to run consistent update cycles without requiring your time. For indie developers who are product-focused and don't want to invest in learning ASO tooling, delegation is a legitimate choice.",
      "Agencies also bring competitive intelligence across multiple clients in a category — they may have patterns across many apps in your space that inform what keyword strategies are working beyond your own data.",
      "The practical value of agency management is highest for apps with significant revenue at stake (where the cost of a poor keyword choice is expensive) and for developers who genuinely lack the time or inclination to run the process themselves.",
    ],
    whereItFalls: [
      "ASO agency pricing starts at several hundred dollars per month for basic metadata management and runs much higher for comprehensive programs. At these price points, the economics require your app to be generating meaningful App Store revenue before the investment is justifiable.",
      "There is also an information asymmetry problem: you're evaluating their work (the shortlist of recommended keywords, the proposed metadata) without being able to independently assess whether the choices are good. An agency that recommends high-popularity keywords they can't actually rank you for looks active while delivering poor outcomes.",
      "Dependency is the third risk. If you outsource keyword research entirely, you lose the internal knowledge of what you've tried, why, and what worked. Bringing this capability back in-house later requires rebuilding from scratch.",
    ],
    whereASOGradeFits: [
      "If you're currently using an ASO agency, ASOGrade gives you the ability to check their shortlist before it becomes your metadata for the next release. Look up the keywords they've proposed: are the popularity scores real? Are the difficulty scores winnable at your current rating count? This is the minimum viable oversight for delegated ASO.",
      "If you're considering whether to hire an agency or manage ASO in-house, ASOGrade is the in-house option — a research tool that lets one person run the full keyword research workflow without agency overhead.",
      "For apps where the research step is genuinely manageable in-house and the main constraint is tooling, ASOGrade at $8.25-14.99/month covers the research workflow at a fraction of agency retainer costs.",
    ],
    faq: [
      {
        q: "How do I evaluate whether my ASO agency is doing good work?",
        a: "Look up the keywords they've recommended or submitted in a scoring tool. Are the popularity scores above 25? Are the difficulty scores achievable for your app's current rating count? Are there obvious cannibalization issues (the same word appearing in name, subtitle, and keyword field)? If you can verify the choices are data-grounded, you have reason to trust the process.",
      },
      {
        q: "Can I use ASOGrade alongside an agency?",
        a: "Yes. ASOGrade is specifically useful as an independent check on the shortlists and metadata an agency proposes. You're not running parallel keyword research workflows — you're spot-checking the agency's output against the same demand and difficulty data they should be using.",
      },
      {
        q: "What should I look for when evaluating an ASO agency?",
        a: "Ask what data sources they use for keyword demand and difficulty. Ask how they report on results (which keywords moved, by how much, what the install attribution shows). Ask whether they can show you past case studies for apps in your category with similar starting rating counts. The answers reveal whether their process is data-grounded or intuition-dressed-as-process.",
      },
    ],
  },
  {
    slug: "apptweak",
    maturityKey: "tool",
    title: "ASOGrade vs. AppTweak",
    subtitle: "A full App Store and Google Play intelligence suite versus a research-only tool",
    description:
      "AppTweak bundles keyword research with rank tracking, competitor monitoring, and ad intelligence across App Store and Google Play. Here's how the research pass compares.",
    quickVerdict: {
      summary:
        "AppTweak ($79–$499/mo) is a comprehensive multi-store platform for continuous rank tracking and Google Play + iOS intelligence. ASOGrade ($8.25–$14.99/mo) is a dedicated browser tool for instant App Store keyword difficulty scoring.",
      bestForCompetitor: "Cross-platform teams (iOS & Android) needing ongoing rank monitoring and review management.",
      bestForASOGrade: "iOS developers looking for fast, affordable App Store keyword research without subscription bloat.",
    },
    intro: [
      "AppTweak is one of the most established ASO platforms on the market, covering both the App Store and Google Play with keyword research, rank tracking, competitor monitoring, ratings and reviews analysis, and Apple Search Ads intelligence in one dashboard.",
      "If you're evaluating AppTweak against ASOGrade, the real question is whether you need the full platform or just the keyword research step inside it. AppTweak is built to be the single tool a team lives in daily; ASOGrade is built to be the tool you open before a metadata update and close afterward.",
    ],
    whatThisApproachDoes: [
      "AppTweak's Essential plan starts at $79/month ($949/year) and includes keyword research, rank tracking, competitor analysis, and ratings/reviews analysis for up to 500 tracked keywords, 5 followed apps, and 5 competitors per app, with 6 months of historical data. Grow ($249/month) and Grow Plus ($499/month) raise those limits and add organic-installs-per-keyword, in-app event monitoring, and longer history. Enterprise pricing adds an ASO Agent, AppDNA/GameDNA taxonomy, and a dedicated account manager. Confirm current pricing on their site — suite pricing changes.",
      "Both App Store and Google Play are covered from the same account across 100+ countries and languages, which matters if you ship on both platforms and want one place to check keyword performance across them.",
      "The historical data and rank tracking are real strengths: seeing how a keyword's difficulty or your own rank has moved over 6-24 months is something a point-in-time research tool cannot show.",
    ],
    whereItFalls: [
      "Every AppTweak tier through Grow Plus is scoped to a single seat and a single domain. An agency or a studio managing keyword research for several apps or clients needs either an Enterprise contract or multiple accounts, which changes the effective per-app cost quickly.",
      "If keyword research before a metadata update is the only workflow you actually run, the $79-$499/month range buys rank tracking, review management, and reporting features that sit unused between update cycles.",
      "Onboarding a new app means setting it up, verifying it, and configuring trackers before the first keyword score appears — a reasonable cost for a tool you'll live in daily, less so if you need one research pass and a fast answer.",
    ],
    whereASOGradeFits: [
      "ASOGrade skips the setup: paste up to 100 keywords and get popularity and difficulty back in seconds, with no app verification or tracker configuration first.",
      "If you're already paying for AppTweak and using its tracking, review management, and Google Play coverage, ASOGrade is not a replacement — Google Play keyword research isn't something it does at all. If you're on the App Store only and mainly opening AppTweak to check keyword scores before an update, ASOGrade covers that specific step at a fraction of the cost.",
      "For teams managing more than one app or client under a single AppTweak seat limit, ASOGrade's flat per-account pricing with no seat or domain cap is worth checking against what an Enterprise upgrade would cost instead.",
    ],
    faq: [
      {
        q: "Does ASOGrade support Google Play like AppTweak does?",
        a: "No. ASOGrade is App Store only, across all 109 storefronts. If you ship on Google Play and need keyword research there too, AppTweak or a similar cross-platform suite covers both stores from one account.",
      },
      {
        q: "Is AppTweak's keyword data better than ASOGrade's?",
        a: "Both use Apple Search Ads-based signals for App Store popularity; AppTweak layers in its own rank-tracking history and organic-install estimates on top. If you need trend history over months, AppTweak's tracking does something ASOGrade doesn't. If you need a current score fast, both work.",
      },
      {
        q: "Can I use ASOGrade instead of paying for AppTweak's Grow plan?",
        a: "Only if rank tracking, in-app event monitoring, and Google Play coverage aren't things you use. Those live on AppTweak's Grow tier and above. If your workflow is keyword research before each update, ASOGrade covers that alone for less.",
      },
    ],
  },
  {
    slug: "sensor-tower",
    maturityKey: "tool",
    title: "ASOGrade vs. Sensor Tower",
    subtitle: "Enterprise market intelligence versus a self-serve keyword research tool",
    description:
      "Sensor Tower is a market-intelligence platform with custom, quote-based pricing. Here's what that means if you only need App Store keyword research.",
    quickVerdict: {
      summary:
        "Sensor Tower is an enterprise intelligence platform with custom quote-based pricing for macro market sizing. ASOGrade is an instant, transparently priced ($14.99/mo) tool built for App Store keyword scoring.",
      bestForCompetitor: "Enterprises needing cross-market download/revenue estimations and advertising intelligence.",
      bestForASOGrade: "Indie developers and app marketers needing immediate, self-serve App Store keyword demand scoring.",
    },
    intro: [
      "Sensor Tower is a mobile market-intelligence platform built for enterprise clients: Store Intelligence, Ad Intelligence, Audience data, Web Insights, and more, plus its own Gen AI product and MCP server for programmatic access. It's aimed at competitive intelligence across an entire market, not a single app's keyword research.",
      "The comparison here is unusual because Sensor Tower doesn't publish self-serve pricing at all. Their own pricing page states plainly that plans are customized for each customer through a sales conversation, so there's no tier or dollar figure to weigh against ASOGrade's $14.99/month the way you can with other tools.",
    ],
    whatThisApproachDoes: [
      "Sensor Tower's strength is breadth: market share estimates, competitor download and revenue estimates, ad creative intelligence across networks, and audience overlap data that go well beyond what any single-app keyword tool measures. Teams doing market sizing, investment research, or competitive strategy at a portfolio level use it for exactly that reason.",
      "The platform is built for analysts and growth teams who need to answer how a whole category is moving, not just what to put in a keyword field.",
    ],
    whereItFalls: [
      "There's no public price to compare, no self-serve signup, and no way to try a keyword lookup before a sales call. For a developer who wants to check 100 keywords this afternoon, that's a real barrier regardless of what the eventual contract costs.",
      "Sensor Tower's estimates are modeled from a mix of panel data and other signals rather than a single direct feed like Apple Search Ads demand for the App Store specifically, which is a different kind of number for a different kind of question — market sizing versus whether a word will rank.",
      "Its scope is built for teams evaluating a market, not for the specific, recurring task of scoring a keyword list before a metadata update.",
    ],
    whereASOGradeFits: [
      "If what you actually need is App Store keyword popularity and difficulty before writing metadata, ASOGrade answers that in seconds at a fixed $14.99/month, with the price visible before you sign up for anything.",
      "ASOGrade doesn't do market sizing, ad intelligence, or competitor revenue estimates, and isn't trying to. If those are what you need, Sensor Tower's breadth is the right tool and the sales conversation is worth having.",
      "Some teams use both: a market-intelligence platform for strategy and a focused research tool for the recurring keyword-scoring work, because the two answer different questions at very different price points.",
    ],
    faq: [
      {
        q: "Why doesn't Sensor Tower list its prices?",
        a: "It's built for enterprise clients with custom needs across market intelligence, ad intelligence, and audience data, so pricing is quoted per contract rather than published as a fixed tier. That's a legitimate model for that kind of product, but it means you can't compare cost without a sales call.",
      },
      {
        q: "Is Sensor Tower overkill for basic App Store keyword research?",
        a: "For that specific task, likely yes. Sensor Tower is built to answer market-level questions with a large data platform behind it. If keyword popularity and difficulty for your own metadata is the whole job, a dedicated research tool answers it faster and at a fraction of the likely cost.",
      },
      {
        q: "Can I get an estimate of Sensor Tower's App Store ASO pricing before contacting sales?",
        a: "Not from their own site. If you want to compare cost before a sales conversation, tools with published pricing, including ASOGrade, AppTweak, and MobileAction, let you see the number upfront.",
      },
    ],
  },
  {
    slug: "mobileaction",
    maturityKey: "tool",
    title: "ASOGrade vs. MobileAction",
    subtitle: "A tiered ASO and ad-intelligence suite versus a flat-priced research tool",
    description:
      "MobileAction prices ASO Intelligence, Apple Ads campaign management, and ad intelligence as three separate products. Here's how the keyword research tier compares.",
    quickVerdict: {
      summary:
        "MobileAction bundles ASO and Apple Search Ads campaign management with tiered keyword limits ($15–$239/mo). ASOGrade provides flat pricing with uncapped total research across 109 storefronts.",
      bestForCompetitor: "Teams managing live Apple Search Ads campaigns alongside keyword rank tracking.",
      bestForASOGrade: "Developers wanting pure organic keyword research across 100-keyword batches without tier caps.",
    },
    intro: [
      "MobileAction sells ASO Intelligence (keyword research, rank tracking, competitor analysis) as one product, Apple Ads campaign management (CMP) as a second, and Ad Intelligence (creative and network data) as a third. Each has its own pricing, so the number you land on depends on which you need.",
      "For keyword research specifically, MobileAction's ASO Intelligence tiers are the relevant comparison. Its CMP tool has a free tier for accounts under $10,000/month in Apple Ads spend, which is worth knowing if you're already running Search Ads campaigns and just need a keyword-scoring layer alongside them.",
    ],
    whatThisApproachDoes: [
      "ASO Intelligence starts at Lite ($15/month: 100 keywords, 5 apps, 3 competitors, 3 months of history, 1 seat) and moves to Basic ($69/month, their most popular tier: 500 keywords, 8 apps, 10 competitors, 6 months of history, adds competitor keyword insights and metadata analysis), then Pro ($239/month: 1,500 keywords, 10 apps, 15 competitors, 3 seats, organic downloads per keyword and keyword trends). Enterprise adds unlimited competitors and seats at custom pricing.",
      "The Lite tier at $15/month is close to ASOGrade's price and covers a reasonable starting keyword volume, with rank tracking and multi-app support ASOGrade doesn't do.",
      "Bundling CMP and Ad Intelligence as separate paid products means a team using all three functions gets a coordinated view of paid and organic performance in one vendor relationship, which some workflows value.",
    ],
    whereItFalls: [
      "The 100-keyword cap on Lite and 500 on Basic apply across all your tracked apps combined, not per app, so a studio running keyword research across several apps hits those ceilings faster than a single-app developer would.",
      "Getting the ad-intelligence view means paying for a separate product on top of ASO Intelligence, which adds up if the only thing you actually use is keyword popularity and difficulty.",
      "Historical tracking and multi-app dashboards are built for ongoing monitoring; if your workflow is a research pass before each metadata update rather than daily tracking, you're paying partly for a cadence you don't use.",
    ],
    whereASOGradeFits: [
      "ASOGrade's $14.99/month (or $8.25/month on the yearly plan) includes all 109 storefronts and up to 100 keywords per batch with no seat, app, or competitor cap, which is a different tradeoff than MobileAction's per-tier caps: one flat price instead of a ladder to climb as your keyword count grows.",
      "If you're not running Apple Ads campaigns and don't need CMP or Ad Intelligence, MobileAction's ASO Intelligence alone is the fair comparison, and its Lite tier is close in price to ASOGrade's yearly rate with rank tracking as its main addition.",
      "For research-only workflows across multiple apps or storefronts, checking whether MobileAction's per-tier keyword caps or ASOGrade's flat, uncapped-per-batch pricing costs less depends on how many keywords you actually score in a typical month.",
    ],
    faq: [
      {
        q: "Does MobileAction's Lite tier compete with ASOGrade on price?",
        a: "Closely. At $15/month, Lite is within a dollar of ASOGrade's monthly rate and includes rank tracking ASOGrade doesn't. The tradeoff is a 100-keyword cap across all your apps combined, versus ASOGrade's 100 keywords per batch with no total cap.",
      },
      {
        q: "Do I need MobileAction's CMP if I use ASOGrade?",
        a: "Only if you're running Apple Search Ads campaigns and want campaign management tooling. ASOGrade doesn't manage ad campaigns; it scores keywords for organic metadata decisions, which is a different job than bidding and budget management.",
      },
      {
        q: "Which is better for a studio with several apps?",
        a: "Depends on your keyword volume. MobileAction's tiers cap total tracked keywords across all apps, so a studio can hit that ceiling and need to upgrade. ASOGrade's flat pricing has no per-app or total-keyword ceiling, only the 100-per-batch limit on any single research pass.",
      },
    ],
  },
  {
    slug: "appfigures",
    maturityKey: "tool",
    title: "ASOGrade vs. Appfigures",
    subtitle: "An app analytics platform with ASO features versus a keyword-research-first tool",
    description:
      "Appfigures is built around download, revenue, and subscription analytics, with keyword tools layered on top. Here's how it compares for keyword research specifically.",
    quickVerdict: {
      summary:
        "Appfigures bundles revenue and download analytics with keyword monitoring (real ASO starting at $44.99/mo). ASOGrade ($8.25–$14.99/mo) strips away unneeded analytics to focus purely on rapid keyword difficulty scoring.",
      bestForCompetitor: "Developers wanting third-party download, revenue, and subscription analytics alongside basic ASO.",
      bestForASOGrade: "Developers already using App Store Connect for metrics who just need high-speed keyword scoring.",
    },
    intro: [
      "Appfigures started as an app analytics platform (downloads, revenue, subscriptions, ad spend across your own apps) and has added ASO features across its pricing tiers over time. Keyword research is one part of what it does rather than the whole product.",
      "That shapes the comparison: if you want analytics and ASO in one dashboard, Appfigures does both. If keyword research is the specific job, you're choosing how much analytics tooling you want to pay for to get it.",
    ],
    whatThisApproachDoes: [
      "Connect ($9.99/month, $7.99/month billed annually) is the entry tier: 5 apps, 25 tracked keywords, and analytics focused on downloads, revenue, subscriptions, and ad spend rather than deep ASO. Monitor ($44.99/month, $35.99/month annually) is the first tier with real ASO capability: 100 keywords, daily rank updates, and keyword popularity scores. Optimize ($149.99/month) adds a premium competitor and hourly rank updates; Boost ($599.99/month) and Amplify ($1,399.99/month) scale further into multiple competitors, Apple Ads Intelligence, and market trend reports.",
      "For a team that wants download and revenue tracking alongside ASO in a single account, that consolidation has real value: one login instead of two separate tools with two separate data exports to reconcile.",
    ],
    whereItFalls: [
      "The entry-level Connect tier isn't really an ASO plan: 25 keywords and no daily rank updates make it thin for research. The tier that actually does keyword popularity scoring and daily updates, Monitor, starts at $44.99/month, three times ASOGrade's monthly rate.",
      "Most of Appfigures' tier structure is priced around analytics depth (more apps, more competitors, ad spend intelligence) rather than keyword-research depth specifically, so a lot of the cost increase up the ladder isn't buying more keyword capability.",
      "If download and revenue analytics aren't something you need from a third-party tool (App Store Connect already gives you your own numbers), you're paying for a chunk of Appfigures that isn't doing anything for your keyword strategy.",
    ],
    whereASOGradeFits: [
      "If keyword research is the actual task, ASOGrade's $14.99/month sits between Appfigures' Connect (too thin for real ASO) and Monitor (three times the price, bundled with analytics you may already get from App Store Connect).",
      "ASOGrade doesn't do download, revenue, or subscription analytics at all. If you need that alongside ASO in one tool, Appfigures' bundle is the more complete answer.",
      "For a developer or small studio that already reads its own numbers in App Store Connect and just wants the keyword-scoring step done well and cheaply, ASOGrade covers that without paying for the analytics half of Appfigures' pricing.",
    ],
    faq: [
      {
        q: "Is Appfigures' cheapest plan good for keyword research?",
        a: "Not really. Connect at $9.99/month tracks only 25 keywords and skips daily rank updates and popularity scores. Appfigures' first real ASO tier is Monitor at $44.99/month.",
      },
      {
        q: "Why is Appfigures more expensive than ASOGrade for keyword research?",
        a: "Because you're paying for its analytics platform (downloads, revenue, subscriptions, ad spend tracking) alongside the ASO features, not for keyword research alone. If you don't need that analytics layer, you're paying for capability you won't use.",
      },
      {
        q: "Should I use both Appfigures and ASOGrade?",
        a: "If you already rely on Appfigures for revenue and subscription analytics and just want a faster, cheaper keyword-scoring pass before metadata updates, running ASOGrade alongside it for that one step is reasonable.",
      },
    ],
  },
  {
    slug: "astro",
    maturityKey: "tool",
    title: "ASOGrade vs. Astro",
    subtitle: "A native Mac app with rank tracking versus a browser-based research tool",
    description:
      "Astro is a macOS-only app priced close to ASOGrade's yearly rate. The real difference is platform and rank tracking, not cost.",
    quickVerdict: {
      summary:
        "Astro ($9/mo or $108/yr) is a native macOS-only application covering 60+ storefronts with rank tracking. ASOGrade ($8.25–$14.99/mo) runs in any web browser without installation and covers 109 storefronts.",
      bestForCompetitor: "Mac-only indie developers who require daily historical rank tracking.",
      bestForASOGrade: "Developers on any OS (Mac, Windows, Linux, Mobile) needing 109 storefronts and zero local software installs.",
    },
    intro: [
      "Astro (tryastro.app) is a native macOS application for App Store keyword research: install a DMG, sign in, and work from a desktop app rather than a browser tab. It requires macOS 14 or later.",
      "Astro's pricing, $9/month or $108/year for a single Mac license, sits close enough to ASOGrade's $14.99/month ($99/year) that price isn't the deciding factor between them. Platform and feature scope are.",
    ],
    whatThisApproachDoes: [
      "A single Astro license includes unlimited keyword tracking, daily rank tracking with historical graphs, competitor keyword extraction, and popularity/difficulty scoring built on Apple Search Ads data, the same underlying data source ASOGrade uses. DeepL-powered translation is built in for localizing metadata.",
      "Astro covers 60+ App Store countries. For an app targeting its top markets, that's likely enough coverage without needing all 109 storefronts.",
      "Rank tracking is a real feature ASOGrade doesn't have: Astro shows how your app's position for a keyword moves over time, not just a point-in-time difficulty score.",
    ],
    whereItFalls: [
      "Astro requires a Mac and a local install. If you work across Windows, Linux, or want to check a keyword list from a phone or a shared team machine, a native macOS-only app is a real constraint ASOGrade doesn't have.",
      "60+ storefronts is meaningfully fewer than ASOGrade's 109, which matters specifically for the long tail of smaller or emerging markets where difficulty tends to be lowest.",
      "A single Mac license is scoped to one machine; sharing research across a team means either sharing one login on one computer or buying more licenses, whereas ASOGrade runs in any browser on any device tied to one account.",
    ],
    whereASOGradeFits: [
      "If you're on a Mac, want rank tracking, and 60+ storefronts covers your target markets, Astro is a legitimate, similarly-priced alternative built specifically for indie iOS developers.",
      "If you work across multiple operating systems, want the full 109-storefront range including smaller emerging markets, or want to check keywords from any device without installing anything, ASOGrade fits that instead.",
      "Neither tool is meaningfully cheaper than the other at this point; the honest choice is platform (installed Mac app versus browser tool) and whether you need rank tracking, which only Astro of the two provides.",
    ],
    faq: [
      {
        q: "Is Astro cheaper than ASOGrade?",
        a: "Barely, and not consistently. Astro is $9/month or $108/year; ASOGrade is $14.99/month or $99/year. On the annual plan ASOGrade is actually $9 cheaper. Price isn't the real difference between them.",
      },
      {
        q: "Does ASOGrade do rank tracking like Astro?",
        a: "No. ASOGrade scores keyword popularity and difficulty for research purposes; it doesn't track your app's ranking position for those keywords over time. If daily rank tracking is what you need, Astro has it built in.",
      },
      {
        q: "Can I use Astro if I don't have a Mac?",
        a: "No. Astro requires macOS 14 or later, distributed as a native app. ASOGrade runs in any modern browser on any operating system, which is the main practical difference if you're not on a Mac.",
      },
    ],
  },
];
