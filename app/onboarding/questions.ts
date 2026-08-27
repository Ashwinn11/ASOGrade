/**
 * Onboarding, asked before the paywall.
 *
 * Three jobs: qualify the visitor to themselves — someone who answers "I'm
 * guessing" to how they pick keywords has just told themselves why they need
 * this — capture what they came to fix so the paywall can hand it back in their
 * own words, and give us the shape of who is arriving. Answers are stored
 * against the email used at checkout and attached to the account on first
 * sign-in.
 *
 * The order is the part that matters, and it is not the order these were
 * written in.
 *
 * The rule the funnel research is unanimous on is aspiration first, pain
 * second, and anything invasive last, once the visitor has enough invested to
 * answer it. This flow used to open with "do you have an app" and then ask what
 * it earns a month as the *second* question — the most personal thing on the
 * page, put at the point of least investment, before we had given them a single
 * reason to trust us with it. Revenue is now the last question asked, and the
 * screen that asks it says why before it asks.
 *
 * `goal` is first and is new. Every strong quiz funnel opens by having the
 * visitor state their intent, because everything after it can then be addressed
 * to that intent rather than to a generic average of everyone — and because a
 * visitor who has named what they want has quietly agreed there is something
 * they want.
 */

export type Question = {
  key: "goal" | "struggles" | "has_app" | "aso_maturity" | "localization" | "revenue";
  q: string;
  hint?: string;
  /** Shown above the question, in the visitor's interest rather than ours. */
  why?: string;
  multi?: boolean;
  options: { value: string; label: string; note?: string }[];
};

export const QUESTIONS: Question[] = [
  {
    key: "goal",
    q: "What are you trying to fix?",
    hint: "Pick the one that stings most.",
    options: [
      { value: "invisible", label: "Nobody finds my app in search" },
      { value: "launch", label: "I'm launching and want the metadata right" },
      { value: "rival", label: "A competitor is outranking me" },
      { value: "markets", label: "I want downloads from other countries" },
      { value: "audit", label: "I don't know whether my keywords work" },
    ],
  },
  {
    key: "struggles",
    q: "What's hardest about it right now?",
    hint: "Pick as many as apply.",
    multi: true,
    options: [
      { value: "ideas", label: "Finding keywords worth targeting" },
      { value: "winnable", label: "Knowing which ones I can actually rank for" },
      { value: "competitors", label: "Seeing what competitors rank for" },
      { value: "markets", label: "Deciding which countries to bother with" },
      { value: "time", label: "It takes too long" },
      { value: "cost", label: "Existing tools are too expensive" },
    ],
  },
  {
    key: "has_app",
    q: "Do you have an app on the App Store?",
    options: [
      { value: "live", label: "Yes, it's live" },
      { value: "building", label: "Building it now" },
      { value: "planning", label: "Not yet, still planning" },
      { value: "several", label: "Several apps" },
    ],
  },
  {
    key: "aso_maturity",
    q: "How do you pick keywords today?",
    options: [
      { value: "guess", label: "Mostly guessing" },
      { value: "sheet", label: "A spreadsheet and some research" },
      { value: "tool", label: "A paid ASO tool" },
      { value: "agency", label: "An agency or consultant does it" },
    ],
  },
  {
    key: "localization",
    q: "How many storefronts are you localized for?",
    hint: "ASOGrade scores keywords separately in 109 of them.",
    options: [
      { value: "en", label: "English only" },
      { value: "few", label: "A handful" },
      { value: "many", label: "Ten or more" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    key: "revenue",
    /* Last, and explained before it is asked. The `why` renders above the
       question rather than as a footnote under it, because a reason given after
       the ask is a reason nobody reads. */
    why: "Last one, and the only one that is none of our business by default.",
    q: "Roughly what does it earn a month?",
    hint: "It only changes how we talk about price. Never shared, and “rather not say” is a real answer.",
    options: [
      { value: "pre", label: "Nothing yet" },
      { value: "under1k", label: "Under $1,000" },
      { value: "1k-10k", label: "$1,000 – $10,000" },
      { value: "over10k", label: "Over $10,000" },
      { value: "skip", label: "Rather not say" },
    ],
  },
];
