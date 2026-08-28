/**
 * Persona pages — one per /for/[audience] route.
 *
 * Same lifecycle as solutions.ts and compare.ts: a flat array the route and
 * the sitemap both read from. Personas differ from solutions in axis, not in
 * shape — solutions are organized by problem, these by who is solving it —
 * so each entry earns its place with a genuinely different workflow and a
 * genuinely different "who this isn't for", not a swapped audience name over
 * identical copy.
 */

export interface PersonaDetail {
  slug: string;
  /** Short label used in nav cards and the hub grid. */
  audience: string;
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
  /** Specific, honest qualifiers — not "everyone", the actual shape of a good-fit user. */
  goodFit: string[];
  /** What this persona actually needs that ASOGrade doesn't do. Never empty. */
  notGoodFit: string[];
  howItWorks: string[];
  faq: { q: string; a: string }[];
}

export const PERSONAS: PersonaDetail[] = [
  {
    slug: "indie-developers",
    audience: "Indie iOS Developers",
    title: "App Store Keyword Research for Indie iOS Developers",
    subtitle: "One person, one or two apps, and no time to learn a dashboard you'll open twice a year",
    description:
      "Keyword research built for solo iOS developers: paste your candidate list, read the scores, ship the update — no app verification, no seats, no suite to learn.",
    breakdown: [
      {
        heading: "The constraint isn't budget, it's attention",
        points: [
          "Most solo developers can find $15 a month for a tool that works. What they can't find is an afternoon to onboard into a suite built for a marketing team: adding the app, verifying ownership, configuring trackers, learning which of thirty menu items matters.",
          "A metadata update happens a handful of times a year, around a version release. The tool only needs to be fast and correct on those days, not something you have open daily. That changes what 'good' looks like: instant answers over a dashboard that has learned your habits.",
          "The honest failure mode for a solo developer isn't picking the wrong tool. It's picking no tool, and writing the keyword field from memory the night before submitting, because every option in front of you looked like a project.",
        ],
      },
      {
        heading: "What one or two apps actually needs",
        points: [
          "You don't need multi-seat permissions, white-label reports, or a client dashboard. You need to paste a list, see which terms have real demand and a realistic difficulty, and write three metadata fields with those numbers in front of you.",
          "You do need every storefront, even if you only ever localize into two or three. Checking whether a keyword you can't win in the US is winnable in Canada or the UK costs nothing extra and sometimes changes the whole plan.",
          "You need the numbers to still be there next time. A cache that remembers what you checked six months ago, rather than starting cold on every visit, is worth more to an infrequent user than to someone logging in daily.",
        ],
      },
    ],
    goodFit: [
      "You maintain one or two apps and update metadata a few times a year, not weekly.",
      "You want the research pass on its own, not rank tracking, review management, or ad campaign tooling bundled in.",
      "You'd rather paste a list and read scores than configure a workspace.",
    ],
    notGoodFit: [
      "You're running daily rank-tracking alerts across a portfolio — that's a full suite's job, and ASOGrade doesn't do it.",
      "You need team seats or client-facing reports — see the agency page instead.",
    ],
    howItWorks: [
      "Sign in, paste up to 100 keyword candidates for your app, and pick a storefront.",
      "Read popularity and difficulty for each one, sorted however you like, in seconds.",
      "Paste a competitor's App Store link if you want their keyword set too, then write your title, subtitle, and keyword field with real numbers behind every choice.",
    ],
    faq: [
      {
        q: "I only update my app twice a year. Is a subscription worth it for that?",
        a: "It depends on how much a good keyword choice is worth to your install numbers versus $14.99 a month, or $8.25 a month on the yearly plan. Most developers cancel the months they're not actively researching and resubscribe before the next update — the plan has no lock-in beyond the current billing period.",
      },
      {
        q: "Do I need a published app to use this?",
        a: "No. You can research keywords before you've written a line of code, and you can paste any public App Store link — yours or a competitor's — to read its keyword set.",
      },
      {
        q: "What if I manage a second app later?",
        a: "The same account covers however many apps you research. There's no per-app fee or seat limit to add a second app to your workflow.",
      },
    ],
  },
  {
    slug: "app-studios",
    audience: "Studios With Multiple Apps",
    title: "Keyword Research for Studios Managing Multiple Apps",
    subtitle: "Coordinating a portfolio without your own apps competing for the same search term",
    description:
      "Run keyword research across a multi-app portfolio in one account, and catch the specific failure mode single-app tools miss: your own apps cannibalizing each other's rankings.",
    breakdown: [
      {
        heading: "The problem a single-app tool doesn't see",
        points: [
          "Studios with several apps in a similar category run into a failure mode solo developers don't: two of your own apps targeting the same keyword. Apple doesn't rank both of your apps highly for one term just because you own them both — you're splitting your own relevance signal and often losing to a third party doing nothing but sitting in the middle.",
          "This is invisible from inside any single app's dashboard. You have to look at your candidate keyword lists side by side, across every app in the portfolio, to see where you're targeting yourself. Most teams find this by accident, months after two apps have been quietly undercutting each other.",
          "The fix is a shared keyword map across the portfolio, checked before each app's metadata update, not after a ranking drop prompts an investigation.",
        ],
      },
      {
        heading: "What a portfolio workflow needs that a single research pass doesn't",
        points: [
          "Consistent methodology across apps matters more than it does for one app alone. If app A used a difficulty threshold of 40 and app B used 65, you can't compare their keyword sets meaningfully when you go looking for overlap.",
          "Per-market prioritization compounds across a portfolio. Five apps each checked across even four core markets is real volume — batching 100 keywords per pass keeps that from turning into hours of one-at-a-time lookups.",
          "None of this requires per-app licensing. A studio account that scores keywords for however many apps you're actively updating, without a per-domain fee for each one, is what makes the cross-portfolio check worth doing routinely instead of once a year.",
        ],
      },
    ],
    goodFit: [
      "You manage 3 or more apps, especially in overlapping categories, and want one account rather than one subscription per app.",
      "You want to check for keyword overlap across your own portfolio before it costs you a ranking, not after.",
      "You need consistent popularity/difficulty thresholds across apps so the numbers are comparable.",
    ],
    notGoodFit: [
      "You need centralized team roles, permissions, or client billing across a large org — that's an enterprise suite's job, not a research tool's.",
      "You need automated cross-app alerting when a portfolio keyword's ranking shifts — ASOGrade scores on demand, it doesn't monitor continuously.",
    ],
    howItWorks: [
      "Run each app's candidate keyword list through the same storefront and the same popularity/difficulty thresholds, so the numbers are comparable across the portfolio.",
      "Cross-reference the scored lists to spot any keyword two of your own apps are both targeting, and decide which app should hold it.",
      "Paste rival studios' App Store links to see whether the keyword you gave up internally is winnable against them instead.",
    ],
    faq: [
      {
        q: "Does ASOGrade limit how many apps I can research under one account?",
        a: "No. The subscription is per account, not per app or per domain — unlike suites that charge per app slot or per seat. How many apps you research in a batch is up to you.",
      },
      {
        q: "How do I actually spot portfolio cannibalization?",
        a: "Export or note each app's top-scoring candidate keywords and compare the lists across your portfolio. Any keyword appearing as a top target for two of your own apps in the same storefront is worth a deliberate decision about which app keeps it, rather than leaving both to compete by accident.",
      },
      {
        q: "Should every app in the portfolio use the same difficulty threshold?",
        a: "Not necessarily — a newer app with fewer ratings should still target lower difficulty than an established one in the same portfolio. The point of a shared methodology is comparability, not identical thresholds.",
      },
    ],
  },
  {
    slug: "aso-agencies",
    audience: "ASO Freelancers & Agencies",
    title: "App Store Keyword Research for ASO Freelancers and Agencies",
    subtitle: "A defensible number behind every keyword you put in front of a client",
    description:
      "Score client keyword shortlists in seconds with real Apple Search Ads demand and live difficulty data — one account, no per-client domain fees, numbers you can show your work with.",
    breakdown: [
      {
        heading: "The trust problem agency ASO has to solve every renewal",
        points: [
          "A client who isn't technical can't independently verify that the keywords you chose were good ones. What they can see is whether installs moved. If they didn't, the honest answer is often 'the demand wasn't there' or 'the difficulty was too high to win in three months' — and you need the numbers to say that with, not just your judgment.",
          "This works both directions. Being able to hand a client a popularity and difficulty score for every keyword in the current metadata, not just the ones you're proposing, turns a retainer conversation from a trust exercise into a data review.",
          "It also protects you from the keyword that looked right on instinct but had near-zero real demand — the mistake is cheap to make and expensive to explain later without a number showing you checked.",
        ],
      },
      {
        heading: "Running research across many client apps without per-client tool costs",
        points: [
          "Several suites price by seat or by domain — AppTweak's published tiers, for example, include one domain through their Grow Plus tier, which means an agency managing several client apps either juggles multiple accounts or moves to a custom enterprise quote earlier than a single-app developer would.",
          "A flat account that scores keywords for however many client apps you're actively researching, without a per-domain fee, changes the economics of taking on a small client — the tool cost doesn't scale linearly with your client count the way seat-based suite pricing does.",
          "Turnaround matters for new-client onboarding specifically: being able to score a prospective client's current keyword set and read their top competitors' sets in the same call, rather than promising a report next week, is a real differentiator in a pitch.",
        ],
      },
    ],
    goodFit: [
      "You're a solo consultant or small agency running keyword research across 2-15 client apps a month.",
      "You want to show clients the demand/difficulty numbers behind every recommendation, not just deliver a finished metadata field.",
      "You need fast turnaround for prospective-client audits, ahead of a pitch or renewal conversation.",
    ],
    notGoodFit: [
      "You need white-label reporting, client logins, or multi-seat team permissions built into the tool itself — ASOGrade is single-account and doesn't brand reports for resale.",
      "You bill clients for ongoing rank tracking as a deliverable — that's not something ASOGrade measures; you'd pair it with a tracking tool for that specific line item.",
    ],
    howItWorks: [
      "Paste a prospective or existing client's current keyword set, or extract it directly from their App Store link, to see real popularity and difficulty for what they're already targeting.",
      "Score your proposed replacement list the same way, so the before/after is a number comparison, not an assertion.",
      "Re-run the same list before each renewal to show whether the keyword landscape shifted, and whether the original recommendation still holds.",
    ],
    faq: [
      {
        q: "Can I run keyword research for multiple clients under one ASOGrade account?",
        a: "Yes. There's no per-app or per-domain fee — the subscription covers however many apps or client keyword sets you research.",
      },
      {
        q: "Does ASOGrade produce client-ready reports?",
        a: "No built-in white-label export exists today. You can screenshot or copy scores into your own reporting format; ASOGrade is the research layer, not the client deliverable.",
      },
      {
        q: "How do I audit a prospective client's current keyword choices before a pitch?",
        a: "Paste their App Store link to pull their live keyword set with scores, then compare it against the candidate list you'd propose instead. That comparison is usually the most persuasive part of a pitch, because it's their own current numbers, not a hypothetical.",
      },
    ],
  },
  {
    slug: "apple-search-ads-advertisers",
    audience: "Apple Search Ads Advertisers",
    title: "App Store Keyword Research for Apple Search Ads Advertisers",
    subtitle: "Know which keywords you can rank for free before you keep paying to appear on them",
    description:
      "Cross-check the keywords you're bidding on in Apple Search Ads against organic ranking difficulty, so you know which terms are worth an ongoing bid and which you can win without one.",
    breakdown: [
      {
        heading: "Paid and organic answer different questions about the same keyword",
        points: [
          "Apple Search Ads tells you what a keyword costs to win right now, through your cost-per-tap and impression share. It doesn't tell you how close you are to ranking for that same term organically, for free, given your app's current rating count and metadata.",
          "A keyword with high ad demand and low organic difficulty is a candidate to stop bidding on, once your organic ranking climbs into a position that no longer needs the ad spend to be visible. Without a difficulty number, that decision gets made on ad-spend fatigue instead of on data.",
          "The reverse case matters too: a keyword with real demand and difficulty too high to win organically anytime soon is a legitimate candidate to keep funding with ads indefinitely, rather than a research failure.",
        ],
      },
      {
        heading: "Using Discovery campaigns and organic scoring together",
        points: [
          "Apple's own Discovery campaign type, run on broad match and Search Match, surfaces real search terms your ads matched against — a source of keyword ideas even for a developer who never intends to run ads long-term. Score those discovered terms for organic popularity and difficulty before deciding whether they belong in a Brand, Category, or Competitor campaign, or in your organic metadata instead.",
          "The tap-through rate on a term you're already advertising is itself a relevance signal — a term with a strong ad tap-through and reasonable organic difficulty is a stronger metadata candidate than one your ads perform poorly on, even if both have similar raw search demand.",
          "None of this replaces Apple's own campaign console for bid management, budget pacing, or match-type tuning. It answers one question the console doesn't: given everything currently ranking, could this app win the term without paying for it.",
        ],
      },
    ],
    goodFit: [
      "You're running live Apple Search Ads campaigns and want an organic difficulty read on the keywords you're bidding on.",
      "You use Discovery campaigns for keyword discovery and want to evaluate what they surface before committing budget or metadata space to it.",
      "You want a periodic check on which paid keywords have become organically winnable, to trim ad spend where it's no longer needed.",
    ],
    notGoodFit: [
      "You need bid management, budget pacing, or campaign automation — that's Apple's own Search Ads console or a dedicated ad-management tool, not ASOGrade.",
      "You need ad performance reporting (CPT, CPA, impression share) — ASOGrade scores organic popularity and difficulty, not your campaign's ad metrics.",
    ],
    howItWorks: [
      "Paste the keywords from your active or planned Apple Search Ads campaigns into ASOGrade for the same storefront.",
      "Read the organic difficulty score alongside what you already know about that keyword's ad cost and performance.",
      "Prioritize organic metadata real estate for terms where difficulty is within reach, and keep the ad budget on terms that remain organically out of range.",
    ],
    faq: [
      {
        q: "Does ASOGrade connect to my Apple Search Ads account?",
        a: "No. You bring the keyword list — from your campaigns, from Discovery campaign results, or from anywhere else — and ASOGrade scores organic popularity and difficulty for it. Campaign management stays in Apple's own console.",
      },
      {
        q: "Is ASOGrade's popularity score the same as Apple Search Ads demand data?",
        a: "Yes — popularity is derived from Apple Search Ads demand signals, the same data advertisers see when deciding what to bid on. Difficulty is a separate calculation, based on the apps currently ranking organically for that term.",
      },
      {
        q: "How do I decide when to stop bidding on a keyword?",
        a: "There's no universal threshold, but a common pattern is watching organic difficulty trend down for a term you're paying for, and testing a pause once your app is already ranking in the top 5-10 organically for it — then confirming the organic position holds before cutting the spend entirely.",
      },
    ],
  },
];
