/**
 * What each answer means, and the specific thing that answers it.
 *
 * Asking five questions and then showing a price list wastes the answers. The
 * point of asking is to hand the problem back in the visitor's own terms and
 * put the fix next to it — so the paywall reads as the conclusion of what they
 * just told us rather than an unrelated ask.
 *
 * Every claim here has to be literally true of the product. A tailored page
 * that overpromises is worse than a generic one, because it overpromises about
 * the exact thing they said they cared about.
 */

export type Fix = { problem: string; fix: string; proof?: string };

/** Keyed by the multi-select in question 3. */
export const STRUGGLE_FIX: Record<string, Fix> = {
  ideas: {
    problem: "Finding keywords worth targeting",
    fix: "Paste up to 100 raw ideas in one go — names, competitor terms, review language — and every one comes back with real Apple Search Ads demand.",
    proof: "100 per batch",
  },
  winnable: {
    problem: "Knowing which ones you can actually rank for",
    fix: "Difficulty is read from the apps holding the top spots right now, not guessed from chart position. High demand with low difficulty is the only quadrant worth your characters.",
    proof: "Scored 0–100",
  },
  competitors: {
    problem: "Seeing what competitors rank for",
    fix: "Paste any App Store link and read the keyword set that app appears for, each scored. Take the ones worth having straight into your list.",
    proof: "50 ranked apps per keyword",
  },
  markets: {
    problem: "Deciding which countries to bother with",
    fix: "The same keyword is scored separately in every storefront, so you can see where a term is cheap before you pay a translator.",
    proof: "109 storefronts",
  },
  time: {
    problem: "It takes too long",
    fix: "A batch is scored in seconds and cached after that, so re-checking a list costs nothing and returns instantly.",
    proof: "Seconds, not an afternoon",
  },
  cost: {
    problem: "Existing tools are too expensive",
    fix: "This does the research pass and stops there — no rank tracking, no ad manager, no seat pricing. That is why it costs a fraction of a full suite.",
    proof: "$8.25/mo on yearly",
  },
};

/** A one-line read on how they work today, used as the headline of the recap. */
export const MATURITY_LINE: Record<string, string> = {
  guess: "You're picking keywords on instinct.",
  sheet: "You're doing the research by hand.",
  tool: "You're already paying for a tool.",
  agency: "Someone else is doing this for you.",
};

export const MATURITY_NOTE: Record<string, string> = {
  guess: "Instinct is fine for a first guess and expensive for a metadata slot. Every field you fill without a demand number is a slot you cannot measure.",
  sheet: "A spreadsheet holds the list but can't tell you which terms are winnable — that number has to come from the live ranking set, and it changes daily.",
  tool: "Then you know the numbers matter. This is the research half on its own, without the tracking and campaign tooling you may not be using.",
  agency: "Worth being able to check their shortlist yourself before it becomes your metadata for the next release.",
};

/** Storefront coverage, turned into the size of what they're leaving alone. */
export const LOCALIZATION_NOTE: Record<string, string> = {
  en: "You're localized in English only, which leaves 108 storefronts unexamined. Difficulty in a smaller market is routinely a fraction of the US.",
  few: "A handful of storefronts is a start. The same keyword often scores completely differently a border away.",
  many: "Ten or more markets is real coverage — and the reason per-storefront scoring matters rather than one translated list.",
  unsure: "Worth finding out: the same keyword can be twice as winnable in one storefront as another.",
};

/** Revenue is only used to pick how the price is framed against their stakes. */
export const PRICE_FRAME: Record<string, string> = {
  pre: "Before revenue, the keyword field is one of the few levers that costs nothing but attention.",
  under1k: "At this stage a single keyword that starts converting pays for a year of this several times over.",
  "1k-10k": "At your revenue, one better-chosen keyword in the title is worth more than the annual price many times over.",
  over10k: "At your revenue this is a rounding error against what a single well-placed keyword returns.",
  skip: "One keyword that starts converting pays for a year of this.",
};
