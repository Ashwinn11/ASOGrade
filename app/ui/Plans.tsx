import { STORES } from "@/lib/types";
import Button from "./Button";
import { cn } from "./cn";
import Card from "./Card";
import Pill from "./Pill";

/**
 * The two plans, as two cards.
 *
 * Shared because there are two places that sell — the public /pricing page and
 * the paywall at the end of /onboarding — and they had drifted into two different
 * designs for the same two prices. One of them was a single dark panel split
 * down the middle by a divider, which read as one object with a seam rather
 * than as a choice: the thing being compared has to be two things.
 *
 * Two modes. Give it `href` and every button is a link (the marketing page
 * before anyone has clicked). Give it `onPick` and every button is an action
 * that opens checkout.
 */

/*
 * Derived, not typed in. The monthly-equivalent and the saving are the two
 * numbers the yearly card is sold on, and both used to be hand-written strings
 * in the markup — "$8.25 a month" and "Save 45%" — which is one price change
 * away from a page that lies about its own arithmetic.
 */
export const MONTHLY = 14.99;
export const YEARLY = 99;
export const PER_MONTH_ON_YEARLY = (YEARLY / 12).toFixed(2);
export const YEAR_AT_MONTHLY = (MONTHLY * 12).toFixed(2);
export const SAVING = Math.round(MONTHLY * 12 - YEARLY);

/** The suite price, which is the anchor everything else is read against. */
export function SuiteAnchor({ tail }: { tail: string }) {
  return (
    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 rounded-md border border-line bg-sunken px-5 py-4">
      <b className="font-display text-base font-extrabold text-ink">$79 – $1,500 a month</b>
      <span className="min-w-0 flex-1 text-sm leading-relaxed text-muted">{tail}</span>
    </div>
  );
}

/* What each card lists, and the two lists are deliberately not the same.
   Printing one shared feature list into both made the choice look like two ways
   of buying an identical thing, which is exactly what a reader who has to pick
   one does not need. Monthly says what the product is; yearly says what yearly
   gives you that monthly does not.

   Numbers are separated from their text so they can take a different weight on
   a light card and on a dark one — baked-in `text-ink` is invisible on the
   yearly card. */
type Point = { n?: string; text: string };

const MONTHLY_POINTS: Point[] = [
  { n: String(STORES.length), text: "App Store storefronts, each scored separately" },
  { n: "100", text: "keywords a check, with 50 ranked apps behind each" },
  { text: "Competitor teardowns and Apple Search Ads demand" },
];

/* Yearly and monthly are the same product, so the temptation is to fill this
   list with the saving restated four ways — and the card already shows $8.25,
   a struck $179.88, "$99 billed once" and a Save badge before the list starts.
   So: one line saying nothing is missing, two saying what the tool actually
   does that the monthly card had no room for, and the price point last.

   Notably absent is "free updates", which would imply the monthly plan is
   missing something it is not. The honest version of that idea is the last
   line: a price change lands on a monthly subscriber immediately and on
   somebody who has already paid for the year only when the year is up. */
const YEARLY_POINTS: Point[] = [
  { text: "Everything in the monthly plan" },
  { text: "Difficulty scored from the apps actually ranking, storefront by storefront" },
  { text: "Refreshed daily — anything already checked comes back instantly" },
  { text: "Future price changes start after your year, never during it" },
];

function Included({ points, dark = false }: { points: Point[]; dark?: boolean }) {
  return (
    <ul
      className={cn(
        "mt-6 grid min-w-0 flex-1 list-none content-start gap-2.5 text-sm leading-relaxed",
        dark ? "text-dark-ink/70" : "text-muted",
      )}
    >
      {points.map((f) => (
        <li key={f.text} className="flex min-w-0 gap-2.5">
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className={cn("mt-1 shrink-0", dark ? "text-dark-accent" : "text-accent")}
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
          <span className="min-w-0">
            {f.n && (
              <b className={cn("font-semibold", dark ? "text-dark-ink" : "text-ink")}>{f.n} </b>
            )}
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Rebuilt against what pricing research is consistent about, all of which the
 * original pair of equal-weight cards was on the wrong side of:
 *
 *   · The recommended plan has to actually dominate. Two identical cards with a
 *     small badge on one is not a recommendation, it is a pair of options. Here
 *     yearly is the dark card — wider column, larger figure, one more reason
 *     on it — and monthly is a
 *     white one beside it. Both get a real, filled button: the quieter plan
 *     still has to look purchasable.
 *   · Compare like with like. Monthly says $14.99 a month, so yearly leads with
 *     $8.25 a month and puts the billed-once figure under it. Leading with $99
 *     asked the reader to do the division.
 *   · Money beats percentage. "Save $81" tests better than "Save 45%", and the
 *     struck-through $179.88 gives the saving something to be measured against.
 *   · The CTA names the outcome rather than repeating the plan name back.
 *
 * The lists sit inside the cards rather than once underneath both. Underneath,
 * a list belongs to the page; inside, it is what the button beside it buys.
 */
export default function Plans({
  onPick, busyKey = null, href,
}: {
  onPick?: (plan: "monthly" | "yearly") => void;
  busyKey?: string | null;
  href?: string;
}) {
  const monthly = href
    ? { href }
    : { onClick: () => onPick?.("monthly"), disabled: !!busyKey };
  const yearly = href
    ? { href }
    : { onClick: () => onPick?.("yearly"), disabled: !!busyKey };

  return (
    <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-[1fr_1.15fr]">
      {/* Monthly — a real choice, and a real button. It carried the outlined
          `secondary` treatment, which on a page whose only other button is a
          solid white one read as the disabled half of the pair rather than the
          cheaper half. */}
      <Card pad="lg" className="flex min-w-0 flex-col">
        <span className="text-2xs font-bold uppercase tracking-[0.14em] text-muted">Monthly</span>

        <div className="mt-5 flex min-w-0 flex-wrap items-baseline gap-x-2">
          <strong className="font-display text-4xl font-extrabold leading-none tracking-tight text-ink">
            ${MONTHLY}
          </strong>
          <span className="text-sm text-muted">/month</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          Billed every month. Cancel whenever you like.
        </p>

        <Included points={MONTHLY_POINTS} />

        <Button size="lg" block className="mt-7" {...monthly}>
          {busyKey === "monthly" ? "Opening checkout…" : "Start monthly"}
        </Button>
      </Card>

      {/* Yearly — the offer, and it looks like one. */}
      <Card tone="dark" pad="lg" className="flex min-w-0 flex-col shadow-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-dark-accent">Yearly</span>
          <Pill tone="accentSolid" className="shrink-0">Save ${SAVING}</Pill>
        </div>

        <div className="mt-5 flex min-w-0 flex-wrap items-baseline gap-x-2">
          <strong className="font-display text-5xl font-extrabold leading-none tracking-tight text-dark-ink">
            ${PER_MONTH_ON_YEARLY}
          </strong>
          <span className="text-sm text-dark-ink/55">/month</span>
        </div>

        <p className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-2.5 text-sm">
          <s className="text-dark-ink/35">${YEAR_AT_MONTHLY}</s>
          <span className="font-semibold text-dark-ink/85">${YEARLY} billed once</span>
        </p>

        <Included points={YEARLY_POINTS} dark />

        <Button variant="inverse" size="lg" block className="mt-7" {...yearly}>
          {busyKey === "yearly" ? "Opening checkout…" : `Get all ${STORES.length} storefronts`}
        </Button>
      </Card>
    </div>
  );
}
