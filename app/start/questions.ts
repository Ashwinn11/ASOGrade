/**
 * Onboarding, asked before the paywall.
 *
 * Two jobs: qualify the visitor to themselves — someone who answers "I'm
 * guessing" to how they pick keywords has just told themselves why they need
 * this — and give us the shape of who is arriving. Answers are stored against
 * the email used at checkout and attached to the account on first sign-in.
 *
 * Kept to five, all single-tap except one. Every extra question is people lost.
 */

export type Question = {
  key: "has_app" | "revenue" | "struggles" | "aso_maturity" | "localization";
  q: string;
  hint?: string;
  multi?: boolean;
  options: { value: string; label: string; note?: string }[];
};

export const QUESTIONS: Question[] = [
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
    key: "revenue",
    q: "Roughly what does it earn a month?",
    hint: "Only used to understand who ASOGrade is for. Never shared.",
    options: [
      { value: "pre", label: "Nothing yet" },
      { value: "under1k", label: "Under $1,000" },
      { value: "1k-10k", label: "$1,000 – $10,000" },
      { value: "over10k", label: "Over $10,000" },
      { value: "skip", label: "Rather not say" },
    ],
  },
  {
    key: "struggles",
    q: "What's hardest about ASO right now?",
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
];
