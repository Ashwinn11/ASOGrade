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
];
