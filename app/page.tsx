"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import { STORES } from "@/lib/types";
import SiteHeader from "./ui/SiteHeader";
import SiteFooter from "./ui/SiteFooter";
import Button from "./ui/Button";
import Card from "./ui/Card";
import CoralHeader from "./ui/CoralHeader";
import Table from "./ui/Table";
import Faq from "./ui/Faq";
import Notice from "./ui/Notice";
import Meter, { popBand, diffBand } from "./ui/Meter";
import { Kicker } from "./ui/Pill";

const STOREFRONTS = [
  { code: "US", name: "United States", pop: 67, diff: 38 },
  { code: "GB", name: "United Kingdom", pop: 58, diff: 31 },
  { code: "BR", name: "Brazil", pop: 33, diff: 19 },
];

const SAMPLE = [
  { kw: "habit tracker", pop: 67, diff: 38, apps: 248, added: "2m" },
  { kw: "sleep sounds", pop: 66, diff: 71, apps: 250, added: "14m" },
  { kw: "mood tracker", pop: 53, diff: 60, apps: 247, added: "26m" },
  { kw: "budget planner", pop: 51, diff: 42, apps: 246, added: "1h" },
  { kw: "meal planner", pop: 48, diff: 64, apps: 249, added: "3h" },
  { kw: "daily planner", pop: 47, diff: 68, apps: 248, added: "5h" },
  { kw: "gratitude journal", pop: 34, diff: 28, apps: 243, added: "1d" },
  { kw: "water reminder", pop: 29, diff: 24, apps: 231, added: "2d" },
];

const OPPORTUNITIES = [
  { kw: "budget planner", store: "GB", pop: 51, diff: 42, tone: "best" },
  { kw: "gratitude journal", store: "AU", pop: 34, diff: 28, tone: "good" },
  { kw: "meal planner", store: "US", pop: 48, diff: 64, tone: "watch" },
  { kw: "sleep sounds", store: "CA", pop: 66, diff: 71, tone: "hard" },
];

/*
 * Position each card from its own numbers instead of a fixed class. The map
 * sold the idea that where a keyword sits *is* the answer, while the four
 * points were pinned at hardcoded coordinates that contradicted the scores
 * printed on them.
 *
 * Scaled across the sample's own range rather than 0–100: these four scores
 * span roughly 30 points each, so an absolute scale piles all four cards on
 * top of one another in the middle. The axes are labelled by direction, not
 * by number, so relative placement is the honest reading either way.
 */
const span = (vals: number[]) => {
  const lo = Math.min(...vals), hi = Math.max(...vals);
  return (v: number) => (hi === lo ? 0.5 : (v - lo) / (hi - lo));
};
const popAt  = span(OPPORTUNITIES.map((o) => o.pop));
const diffAt = span(OPPORTUNITIES.map((o) => o.diff));

/* Taken from a real teardown of Finch in the US store, so the numbers on the
   landing page are the numbers the product actually returns. */
const RIVAL = {
  name: "Finch: Self-Care Pet",
  subtitle: "Daily Journal & Habit Tracker",
  icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/9e/50/589e5087-2232-b59f-32bb-8aac4e8a2432/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/120x0w.webp",
  total: 108,
  keywords: [
    { kw: "finch", pop: 68, diff: 61 },
    { kw: "habit tracker", pop: 67, diff: 67 },
    { kw: "how we feel", pop: 57, diff: 55 },
    { kw: "mental health", pop: 55, diff: 73 },
    { kw: "daylio", pop: 55, diff: 67 },
  ],
};


const COMPARE = [
  { label: "First action", suite: "Add your app, verify it, configure storefronts, then research", ours: "Paste a keyword list and read the scores" },
  { label: "Built for", suite: "Ongoing tracking, reviews, ad campaigns and reporting", ours: "The keyword research pass before a metadata update" },
  { label: "Storefronts", suite: "Extra markets usually sit behind a higher tier", ours: `All ${STORES.length} markets, on every plan` },
  { label: "Competitor keywords", suite: "A core feature, priced accordingly", ours: "Paste their App Store link, no app of your own required" },
  { label: "Honest limit", suite: "Rank tracking, ASA management and A/B testing", ours: "None of that — this scores keywords and stops there" },
];

const FAQ = [
  {
    q: "How is this different from a full ASO suite?",
    a: "A suite does tracking, reviews, ad campaigns and reporting, and prices for all of it. ASOGrade does the research pass only: paste a keyword batch, read demand and difficulty per storefront, decide what is worth testing. If you need rank tracking and campaign management, you want a suite.",
  },
  {
    q: "What are popularity and difficulty?",
    a: "Popularity shows App Store search demand. Difficulty estimates how hard it is to break into the strongest ranking positions for that keyword. Both are scored from 0 to 100.",
  },
  {
    q: "Do I need a published app?",
    a: "No. Keyword scores belong to the keyword and storefront, so you can research a product name, subtitle, or keyword field before launch.",
  },
  {
    q: "Can I see which keywords a competitor ranks for?",
    a: "Yes. Paste their App Store link and you get the keywords they appear for, each scored for popularity and difficulty. You can also open any keyword you are tracking and read the set behind any app holding a top spot.",
  },
  {
    q: "Can I check the same keyword in several countries?",
    a: `Yes. Switch between individual storefronts or use the all-store view to compare the same list across the ${STORES.length} supported App Store markets.`,
  },
];

/*
 * Every ASO tool on the market leads with where its numbers come from —
 * AppTweak with its panel, Sensor Tower with "responsibly sourced", ASO Pilot
 * with autocomplete verification. We had nothing on the page saying why our
 * scores should be believed, which is the first thing a paying ASO reader
 * looks for.
 */
const PROVENANCE = [
  {
    h: "Apple's own demand signal",
    p: "Popularity is the Apple Search Ads figure advertisers bid against — the same 0–100 scale, not a guess reverse-engineered from chart positions.",
  },
  {
    h: "Difficulty from the live ranking set",
    p: "Difficulty reads the apps actually holding the top spots for that term right now: how established they are and how much weight sits above you.",
  },
  {
    h: "Refreshed every day",
    p: "Scores are re-pulled on a daily cadence. Anything you looked up before is served instantly from our cache, so a repeat check costs nothing and returns in under a second.",
  },
  {
    h: "Per storefront, not translated",
    p: `A keyword is scored separately in each of the ${STORES.length} supported markets. "budget planner" is a different question in the US than in Brazil, and the numbers say so.`,
  },
];


const NAV = [
  { href: "#product", label: "Product" },
  { href: "#spy", label: "Competitors" },
  { href: "#data", label: "The data" },
  { href: "#compare", label: "Compare" },
  { href: "#faq", label: "FAQ" },
];

/* Section heading + supporting copy, used by every band on this page. */
function SectionCopy({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="min-w-0 max-w-[46rem]">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-md leading-relaxed text-muted">{children}</p>}
    </div>
  );
}

export default function Landing() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [signIn, setSignIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const enter = () => (user ? router.push("/app") : setSignIn(true));

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("authError");
    if (e) {
      setAuthError(e);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  /* Every primary button on the page is this one, so the ask never drifts.
     The price note is a sibling in normal flow, not an absolutely-positioned
     nowrap label — as an overlay it used to sit on top of the button beside it
     and run off the card edge below ~400px. */
  const Cta = ({ size = "lg", note = true }: { size?: "md" | "lg"; note?: boolean }) => (
    <span className="flex min-w-0 flex-col items-start gap-2">
      <Button size={size} onClick={enter} disabled={!ready}>
        {user ? "Dashboard" : "Get started"}
      </Button>
      {note && !user && (
        <span className="text-xs leading-relaxed text-faint">
          $14.99/mo or $99/yr · cancel anytime · nothing to install
        </span>
      )}
    </span>
  );

  return (
    <div className="min-w-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:shadow-2"
      >
        Skip to content
      </a>

      <SiteHeader links={NAV} actions={<Cta size="md" note={false} />} />

      {authError && (
        <div className="mx-auto mt-4 w-[min(100%-1.5rem,72rem)]">
          <Notice tone="error">Sign-in failed: {authError}</Notice>
        </div>
      )}

      <main id="main" className="min-w-0">
        {/* ------------------------------------------------------------ hero */}
        <section
          id="product"
          className="mx-auto mt-12 scroll-mt-24 grid w-[min(100%-1.5rem,72rem)] min-w-0 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14"
        >
          <div className="min-w-0">
            <Kicker>Browser-first ASO research</Kicker>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Rank for keywords people actually search.
            </h1>
            <p className="mt-5 max-w-[52ch] text-md leading-relaxed text-muted">
              Paste a hundred keyword ideas and get Apple Search Ads demand, ranking
              difficulty and how many apps you are up against — scored per storefront,
              in seconds. No install, no tracked app to set up first.
            </p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-faint">
              For indie developers, small studios and the freelancers who do their own
              keyword research.
            </p>

            {/* Both actions share the row and wrap together; neither is forced
                to a width its label cannot fill. */}
            <div className="mt-8 flex min-w-0 flex-wrap items-start gap-3">
              <Cta />
              <Button variant="secondary" size="lg" href="#data" external>
                How the scores work
              </Button>
            </div>

            <dl className="mt-10 grid min-w-0 gap-4 sm:grid-cols-3">
              {[
                [`${((STORES.length * 100) / 1000).toFixed(1)}K`, "keyword × market scores per batch"],
                [String(STORES.length), "App Store markets"],
                ["50", "ranked apps per keyword"],
              ].map(([n, label]) => (
                <div key={label} className="min-w-0">
                  <dt className="font-display text-xl font-extrabold text-ink">{n}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-faint">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ProductShot />
        </section>

        {/* ---------------------------------------------------- opportunity */}
        <section className="mx-auto mt-24 grid w-[min(100%-1.5rem,72rem)] min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <OpportunityMap />
          <SectionCopy kicker="Why it wins" title="Demand and difficulty in one row, so weak keywords are obvious.">
            High popularity with low difficulty is the only quadrant worth your
            characters. Both numbers sit on the same row, so the weak bets are obvious
            without a spreadsheet.
          </SectionCopy>
        </section>

        {/* --------------------------------------------------------- rivals */}
        <section id="spy" className="mx-auto mt-24 scroll-mt-24 w-[min(100%-1.5rem,72rem)] min-w-0">
          <SectionCopy kicker="Competitor teardown" title="Read the keyword set behind any app in the chart.">
            Paste a competitor&apos;s App Store link and get the keywords they show up
            for, each with its own popularity and difficulty. Take the ones worth having
            straight into your list.
          </SectionCopy>

          <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-[1.1fr_1fr]">
            <Card tone="dark" pad="none" className="min-w-0 overflow-hidden">
              {/* The name/subtitle pair shares this row with a fixed icon and a
                  fixed count. A `flex-1 min-w-0` text block next to shrink-0
                  siblings has a minimum width of zero, so without a forced
                  wrap it silently squeezes to a couple of pixels instead of
                  ever dropping to its own line — the count gets `basis-full`
                  so it wraps below once the name needs the room. */}
              <div className="flex min-w-0 flex-wrap items-center gap-3 border-b border-white/10 p-4">
                <img
                  src={RIVAL.icon}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="size-10 shrink-0 rounded-lg"
                />
                <span className="min-w-0 flex-1">
                  <b className="block truncate text-base font-semibold text-dark-ink">{RIVAL.name}</b>
                  <em className="block truncate text-xs not-italic text-dark-ink/60">{RIVAL.subtitle}</em>
                </span>
                <span className="shrink-0 basis-full font-mono text-2xs text-dark-ink/60 sm:basis-auto">
                  {RIVAL.total} keywords
                </span>
              </div>

              <div className="min-w-0 p-2">
                {RIVAL.keywords.map((r) => (
                  <div
                    key={r.kw}
                    className="grid min-w-0 items-center gap-3 rounded-md px-2 py-2.5 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]"
                  >
                    <span className="min-w-0 truncate text-sm text-dark-ink">{r.kw}</span>
                    <Meter value={r.pop} band={popBand(r.pop)} onDark />
                    <Meter value={r.diff} band={diffBand(r.diff)} onDark />
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["No app required", "You do not have to publish, or even name, an app of your own to read someone else's."],
                ["Straight from the rankings", "Open any keyword, then use the eye on a competing app to read its full set."],
                ["Names and subtitles too", "Every app in a ranking list shows the 30 characters it chose to compete on."],
              ].map(([h, p]) => (
                <Card key={h} pad="sm">
                  <b className="block text-base font-semibold text-ink">{h}</b>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- mid CTA */}
        <section className="mx-auto mt-20 flex w-[min(100%-1.5rem,72rem)] min-w-0 flex-wrap items-center justify-between gap-6 rounded-card border border-line bg-surface p-7">
          <div className="min-w-0">
            <b className="block font-display text-xl font-extrabold text-ink">
              Try it on a competitor right now.
            </b>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted">
              Paste any App Store link and read their keyword set in about a second.
            </span>
          </div>
          <Cta note={false} />
        </section>

        {/* ------------------------------------------------------- compare */}
        <section id="compare" className="mx-auto mt-24 scroll-mt-24 w-[min(100%-1.5rem,72rem)] min-w-0">
          <SectionCopy kicker="Positioning" title="What this does, and what it deliberately does not." />
          <Table
            className="mt-8"
            caption="ASOGrade positioning against full ASO suites"
            head={["Decision point", "Full ASO suites", "ASOGrade"]}
            rows={COMPARE.map((r) => [r.label, r.suite, r.ours])}
          />
        </section>

        {/* ---------------------------------------------------------- data */}
        <section id="data" className="mx-auto mt-24 scroll-mt-24 w-[min(100%-1.5rem,72rem)] min-w-0">
          <SectionCopy kicker="The data" title="Where these numbers come from.">
            A keyword score is only worth the source behind it. Here is ours, stated
            plainly enough to argue with.
          </SectionCopy>
          <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2">
            {PROVENANCE.map((item) => (
              <Card key={item.h} className="border-l-[3px] border-l-accent">
                <h3 className="text-lg font-bold text-ink">{item.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.p}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------------- FAQ */}
        <section id="faq" className="mx-auto mt-24 scroll-mt-24 grid w-[min(100%-1.5rem,72rem)] min-w-0 gap-8 lg:grid-cols-[minmax(0,.62fr)_minmax(0,1fr)]">
          <SectionCopy kicker="FAQ" title="Questions worth answering upfront." />
          <Faq items={FAQ} collapsible />
        </section>

        {/* ------------------------------------------------------ closing */}
        <section className="mx-auto mt-24 w-[min(100%-1.5rem,72rem)] min-w-0 rounded-card bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] px-6 py-12 text-center sm:px-10">
          <Kicker tone="onDark">Before the next release</Kicker>
          <h2 className="mx-auto mt-4 max-w-[24ch] font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Find out which keywords are worth the characters.
          </h2>
          <div className="mt-7 flex justify-center">
            <span className="flex flex-col items-center gap-2">
              <Button size="lg" variant="inverse" onClick={enter} disabled={!ready}>
                {user ? "Dashboard" : "Get started"}
              </Button>
              {!user && (
                <span className="text-xs leading-relaxed text-white/75">
                  $14.99/mo or $99/yr · cancel anytime · nothing to install
                </span>
              )}
            </span>
          </div>
        </section>
      </main>

      <SiteFooter />

      {signIn && <SignInModal onClose={() => setSignIn(false)} next="/start" />}
    </div>
  );
}

/* ------------------------------------------------------------ product shot */

/**
 * The workspace preview.
 *
 * The old markup used one fixed six-track grid (`20px 1fr 84px 84px 40px 44px`)
 * with no responsive override at all, so it needed 327px before padding and
 * silently lost its two right-hand columns on every phone — the keyword track
 * collapsed to zero and `.shot-panel { overflow: hidden }` hid the evidence.
 * Apps and Added are now dropped below `sm` instead of overflowing.
 */
function ProductShot() {
  const cols =
    "grid min-w-0 items-center gap-3 [grid-template-columns:minmax(0,1fr)_4.5rem_4.5rem] " +
    "sm:[grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem_3rem_3.5rem]";

  return (
    <div className="min-w-0" aria-label="ASOGrade keyword workspace preview">
      <Card tone="dark" pad="none" className="min-w-0 overflow-hidden">
        {/* The same CoralHeader the real workspace panel uses, so this
            preview reads as a screenshot of the actual product rather than a
            generic dark mock. */}
        <CoralHeader
          bleed={false}
          stack="sm"
          title={`${SAMPLE.length * 32} keywords`}
          subtitle="Researching United States"
          right={
            <span className="shrink-0 self-start rounded-full bg-white px-3 py-1 text-2xs text-accent-2 sm:self-auto">
              🇺🇸 United States
            </span>
          }
        />

        <div className={`${cols} border-b border-white/10 px-4 py-2.5`}>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Keyword</span>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Pop</span>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Diff</span>
          <span className="hidden text-right text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45 sm:block">Apps</span>
          <span className="hidden text-right text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45 sm:block">Added</span>
        </div>

        <div className="min-w-0 p-2" role="table" aria-label="Sample keyword scores">
          {SAMPLE.map((row, i) => (
            <div
              key={row.kw}
              role="row"
              className={`${cols} animate-fade rounded-md px-2 py-2.5`}
              style={{ animationDelay: `${140 + i * 70}ms` }}
            >
              <span className="min-w-0 truncate text-sm text-dark-ink">{row.kw}</span>
              <Meter value={row.pop} band={popBand(row.pop)} onDark />
              <Meter value={row.diff} band={diffBand(row.diff)} onDark />
              <span className="hidden text-right font-mono text-2xs tabular-nums text-dark-ink/60 sm:block">{row.apps}</span>
              <span className="hidden text-right font-mono text-2xs tabular-nums text-dark-ink/60 sm:block">{row.added}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-3 grid min-w-0 grid-cols-3 gap-2">
        {STOREFRONTS.map((store) => (
          <Card key={store.code} tone="dark" pad="sm" className="min-w-0">
            <span className="block font-mono text-2xs text-dark-ink/50">{store.code}</span>
            <b className="mt-0.5 block truncate text-sm font-semibold text-dark-ink">{store.name}</b>
            <small className="mt-0.5 block truncate text-2xs text-dark-ink/55">
              {store.pop} pop / {store.diff} diff
            </small>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- opportunity map */

const TONE: Record<string, string> = {
  best: "bg-green/85",
  good: "bg-green/85",
  watch: "bg-amber/90",
  hard: "bg-red/85",
};

/**
 * Scatter of four sample keywords, positioned from their own scores.
 *
 * Two things this has to get right, both of which it got wrong before. A pill
 * paints a background, so it must never be given a width it cannot fill —
 * `max-width` plus `white-space: nowrap` is what printed the scores outside
 * their own pill. And a pill is over half the canvas on a phone, so centring
 * it on its coordinate hangs it off the edge; below `sm` each pill anchors to
 * the edge of the half it belongs to and popularity carries the vertical axis.
 */
function OpportunityMap() {
  return (
    <Card tone="dark" pad="sm" className="min-w-0 overflow-hidden">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs font-semibold text-dark-ink/70">
        <span>Opportunity map</span>
        <b className="font-mono text-2xs font-semibold text-dark-ink">popularity × difficulty</b>
      </div>

      {/* Two soft diagonal tints plus a faint grid-paper texture, the way the
          original canvas read as a lit surface rather than a plain dark box.
          The texture is a decorative pseudo-layer, not real content, so it is
          a plain aria-hidden span rather than something the overflow rules
          above need to account for. */}
      <div
        className="relative mt-4 min-h-[31rem] min-w-0 overflow-hidden rounded-lg border border-white/14 sm:min-h-[28rem]"
        style={{
          background:
            "linear-gradient(135deg, rgba(40,200,150,.16), transparent 38%)," +
            "linear-gradient(315deg, rgba(201,100,67,.2), transparent 36%)," +
            "rgba(255,255,255,.035)",
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,rgba(0,0,0,.24))]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)," +
              "linear-gradient(180deg, rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-1/2 h-px bg-white/16" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-[10%] left-1/2 w-px bg-white/16" />

        <span className="absolute left-4 top-4 text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">
          higher popularity
        </span>
        <span className="absolute bottom-3.5 right-4 text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">
          lower difficulty
        </span>

        {OPPORTUNITIES.map((item, i) => {
          const x = diffAt(item.diff);
          const y = popAt(item.pop);
          const left = x > 0.5;   // low difficulty sits right, so a high x is the left half
          return (
            <span
              key={item.kw}
              style={{ "--x": x, "--y": y, animationDelay: `${i * 80}ms` } as React.CSSProperties}
              className={[
                "absolute inline-flex animate-fade items-baseline gap-1.5 whitespace-nowrap",
                "rounded-full border border-white/20 px-2.5 py-1.5 text-white shadow-2",
                // phone: anchor to the near edge, spread popularity over the height
                "top-[calc((10+(1-var(--y))*80)*1%)] -translate-y-1/2",
                left ? "left-1.5" : "right-1.5",
                // desktop: centre on the true coordinate
                "sm:left-[calc((20+(1-var(--x))*56)*1%)] sm:right-auto",
                "sm:top-[calc((24+(1-var(--y))*54)*1%)] sm:-translate-x-1/2 sm:-translate-y-1/2",
                TONE[item.tone],
              ].join(" ")}
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 self-center rounded-full bg-current opacity-90" />
              <b className="text-xs font-bold">{item.kw}</b>
              <em className="font-mono text-2xs not-italic text-white/75">
                {item.pop}/{item.diff}
              </em>
            </span>
          );
        })}
      </div>
    </Card>
  );
}
