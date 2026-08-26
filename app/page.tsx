"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import { STORES } from "@/lib/types";

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

/*
 * The pill is centred on its coordinate, so the usable range is inset by half
 * a pill on each side — otherwise the extreme points hang off the canvas and
 * collide with the axis labels in the corners.
 */
const plot = (pop: number, diff: number) => ({
  left: `${20 + (1 - diffAt(diff)) * 56}%`,   // lower difficulty sits right
  top: `${24 + (1 - popAt(pop)) * 54}%`,      // higher popularity sits high
});

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

const WORKFLOW = [
  {
    n: "01",
    h: "Paste the messy list",
    p: "Names, subtitles, competitor ideas, review language, and raw Search Ads terms can land in the same batch.",
    chips: ["habit tracker", "sleep sounds", "gratitude journal"],
    metric: "100 keyword ceiling",
  },
  {
    n: "02",
    h: "Move through markets",
    p: "Run the same terms in your main storefront, then jump to secondary countries when a keyword looks blocked.",
    chips: ["US", "GB", "BR", "JP"],
    metric: `${STORES.length} storefronts`,
  },
  {
    n: "03",
    h: "Ship the reachable set",
    p: "Keep the terms with demand and a realistic path into the ranking set. Leave the vanity keywords out.",
    chips: ["shortlist", "test", "watch"],
    metric: "metadata-ready",
  },
];

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

const popBand = (value: number) => (value >= 65 ? "hi" : value >= 25 ? "mid" : "lo");
const diffBand = (value: number) => (value <= 35 ? "hi" : value <= 65 ? "mid" : "lo");

function ScoreCell({ value, band }: { value: number; band: string }) {
  return (
    <span className={`cell ${band}`}>
      <span className="n">{value}</span>
      <span className="track"><i style={{ width: `${value}%` }} /></span>
    </span>
  );
}

export default function Landing() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [signIn, setSignIn] = useState(false);

  // one way in: signed in goes straight through, everyone else signs in first
  // Signed out goes through sign-in first; /start picks up from there.
  const enter = () => (user ? router.push("/app") : setSignIn(true));

  /* Every primary button on the page is this one, so the ask never drifts. */
  const Cta = ({ big = true, note = true }: { big?: boolean; note?: boolean }) => (
    <span className="cta-group">
      <button className={`btn primary${big ? " big" : ""}`} onClick={enter} disabled={!ready}>
        {user ? "Open your workspace" : "Get started"}
      </button>
      {note && !user && (
        <span className="cta-note">$14.99/mo or $99/yr · cancel anytime · nothing to install</span>
      )}
    </span>
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("authError");
    if (e) {
      setAuthError(e);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="land">
      <a className="skip" href="#main">Skip to content</a>
      <div className="land-bg" aria-hidden="true" />

      <header className="landing-nav">
        <Link className="brand-mark" href="/" aria-label="ASOGrade home">
          <img src="/mark.png" alt="" width={26} height={26} />
          <span>ASO<b>Grade</b></span>
        </Link>
        <nav className="nav-menu" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#spy">Competitors</a>
          <a href="#data">The data</a>
          <a href="#compare">Compare</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <Cta big={false} note={false} />
        </div>
      </header>

      {authError && <div className="error wrapped">Sign-in failed: {authError}</div>}

      <main id="main">
        <section className="landing-hero" id="product">
          <div className="hero-copy">
            <span className="landing-eyebrow">Browser-first ASO research</span>
            <h1>Rank for keywords people actually search.</h1>
            <p className="hero-sub">
              Paste a hundred keyword ideas and get Apple Search Ads demand, ranking
              difficulty and how many apps you are up against — scored per storefront,
              in seconds. No install, no tracked app to set up first.
            </p>

            <p className="hero-who">
              For indie developers, small studios and the freelancers who do their
              own keyword research.
            </p>

            <div className="hero-actions">
              <Cta />
              <a className="btn secondary big" href="#data">How the scores work</a>
            </div>

            <dl className="proof-list" aria-label="Product facts">
              <div>
                <dt>{((STORES.length * 100) / 1000).toFixed(1)}K</dt>
                <dd>keyword &times; market scores per batch</dd>
              </div>
              <div>
                <dt>{STORES.length}</dt>
                <dd>App Store markets</dd>
              </div>
              <div>
                <dt>50</dt>
                <dd>ranked apps per keyword</dd>
              </div>
            </dl>
          </div>

          <div className="product-shot" aria-label="ASOGrade keyword workspace preview">
            {/* Two separate cards. The panel leads with its coral bar as a hard
                top edge; the storefront strip sits below as its own row. */}
            <div className="shot-panel">
              <div className="shot-head">
                <span className="shot-titlegroup">
                  <b>{SAMPLE.length * 32} keywords</b>
                  <em>Researching United States</em>
                </span>
                <span className="shot-pill">🇺🇸 United States</span>
                <span className="shot-pill wide">Spy on a competitor</span>
                <span className="shot-pill narrow">Filter</span>
              </div>

              <div className="shot-cols">
                <span className="shot-box" aria-hidden="true" />
                <span>Keyword</span>
                <span className="num">Pop</span>
                <span className="num">Diff</span>
                <span className="num">Apps</span>
                <span className="num">Added</span>
              </div>

              <div className="shot-rows" role="table" aria-label="Sample keyword scores">
                {SAMPLE.map((row, i) => (
                  <div className="shot-row" role="row" key={row.kw}
                    style={{ animationDelay: `${140 + i * 70}ms` }}>
                    <span className="shot-box" aria-hidden="true" />
                    <span className="shot-kw">{row.kw}</span>
                    <ScoreCell value={row.pop} band={popBand(row.pop)} />
                    <ScoreCell value={row.diff} band={diffBand(row.diff)} />
                    <span className="num">{row.apps}</span>
                    <span className="num">{row.added}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shot-markets" aria-label="Same keyword across storefronts">
              {STOREFRONTS.map((store) => (
                <div key={store.code}>
                  <span>{store.code}</span>
                  <b>{store.name}</b>
                  <small>{store.pop} pop / {store.diff} diff</small>
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="section-shell feature-section">
          <div className="advantage-board">
            <div className="opportunity-map" aria-label="Keyword opportunity map">
              <div className="map-top">
                <span>Opportunity map</span>
                <b>popularity x difficulty</b>
              </div>
              <div className="map-canvas">
                <span className="map-axis demand">higher popularity</span>
                <span className="map-axis reachable">lower difficulty</span>
                {OPPORTUNITIES.map((item, i) => (
                  <span
                    className={`map-point ${item.tone}`}
                    key={item.kw}
                    style={{ ...plot(item.pop, item.diff), animationDelay: `${i * 80}ms` }}
                  >
                    <b>{item.kw}</b>
                    <em>{item.pop}/{item.diff}</em>
                  </span>
                ))}
              </div>
            </div>

            <div className="section-copy compact board-copy">
              <span className="section-kicker">Why it wins</span>
              <h2>Demand and difficulty in one row, so weak keywords are obvious.</h2>
              <p>
                High popularity with low difficulty is the only quadrant worth your
                characters. Both numbers sit on the same row, so the weak bets are
                obvious without a spreadsheet.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell rival-section" id="spy">
          <div className="section-copy compact">
            <span className="section-kicker">Competitor teardown</span>
            <h2>Read the keyword set behind any app in the chart.</h2>
            <p>
              Paste a competitor&apos;s App Store link and get the keywords they show up
              for, each with its own popularity and difficulty. Take the ones worth
              having straight into your list.
            </p>
          </div>

          <div className="rival-board">
            <div className="rival-panel" aria-label="Example competitor teardown">
              <div className="rival-head">
                <img className="rival-icon" src={RIVAL.icon} alt="" width={40} height={40} loading="lazy" />
                <span className="rival-who">
                  <b>{RIVAL.name}</b>
                  <em>{RIVAL.subtitle}</em>
                </span>
                <span className="rival-count">{RIVAL.total} keywords</span>
              </div>
              <div className="rival-cols">
                <span>Keyword</span><span>Pop</span><span>Diff</span><span />
              </div>
              {RIVAL.keywords.map((r) => (
                <div className="rival-row" key={r.kw}>
                  <span className="rival-kw">{r.kw}</span>
                  <ScoreCell value={r.pop} band={popBand(r.pop)} />
                  <ScoreCell value={r.diff} band={diffBand(r.diff)} />
                  <span className="rival-add" aria-hidden="true">+</span>
                </div>
              ))}
            </div>

            <div className="rival-notes">
              <article>
                <b>No app required</b>
                <p>You do not have to publish, or even name, an app of your own to read someone else&apos;s.</p>
              </article>
              <article>
                <b>Straight from the rankings</b>
                <p>Open any keyword, then use the eye on a competing app to read its full set.</p>
              </article>
              <article>
                <b>Names and subtitles too</b>
                <p>Every app in a ranking list shows the 30 characters it chose to compete on.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mid-cta" aria-label="Try it">
          <div>
            <b>Try it on a competitor right now.</b>
            <span>Paste any App Store link and read their keyword set in about a second.</span>
          </div>
          <Cta note={false} />
        </section>

        <section className="section-shell compare-section" id="compare">
          <div className="section-copy compact">
            <span className="section-kicker">Positioning</span>
            <h2>What this does, and what it deliberately does not.</h2>
          </div>

          <div className="compare-table" role="table" aria-label="ASOGrade positioning against full ASO suites">
            <div className="compare-head" role="row">
              <span>Decision point</span>
              <span>Full ASO suites</span>
              <span>ASOGrade</span>
            </div>
            {COMPARE.map((row) => (
              <div className="compare-row" role="row" key={row.label}>
                <b>{row.label}</b>
                <span>{row.suite}</span>
                <span>{row.ours}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell trust-section" id="data">
          <div className="section-copy compact">
            <span className="section-kicker">The data</span>
            <h2>Where these numbers come from.</h2>
            <p>
              A keyword score is only worth the source behind it. Here is ours,
              stated plainly enough to argue with.
            </p>
          </div>
          <div className="trust-grid">
            {PROVENANCE.map((item) => (
              <div className="trust-card" key={item.h}>
                <h3>{item.h}</h3>
                <p>{item.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell faq-section" id="faq">
          <div className="section-copy compact">
            <span className="section-kicker">FAQ</span>
            <h2>Questions worth answering upfront.</h2>
          </div>

          <div className="faq-list">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div className="faq-item" key={item.q} data-open={open ? 1 : 0}>
                  <button
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {item.q}
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {open && <p id={`faq-panel-${i}`}>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="closing-cta">
          <span>Before the next release</span>
          <h2>Find out which keywords are worth the characters.</h2>
          <Cta />
        </section>
      </main>

      <footer className="foot">
        <div className="foot-top">
          <div className="foot-brand">
            <Link className="brand-mark" href="/" aria-label="ASOGrade home">
              <img src="/mark.png" alt="" width={22} height={22} />
              <span>ASO<b>Grade</b></span>
            </Link>
            <p>App Store keyword research that runs in the browser.</p>
          </div>

          <nav className="foot-col" aria-label="Product">
            <h4>Product</h4>
            <a href="#product">Keyword research</a>
            <a href="#spy">Competitor teardown</a>
            <a href="#data">The data</a>
            <Link href="/solutions">Solutions</Link>
          </nav>

          <nav className="foot-col" aria-label="Resources">
            <h4>Resources</h4>
            <Link href="/guides">ASO Guides</Link>
            <Link href="/glossary">ASO Glossary</Link>
            <Link href="/keyword-research">109 Storefronts</Link>
            <Link href="/compare">Compare approaches</Link>
          </nav>

          <nav className="foot-col" aria-label="Company">
            <h4>Company</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:support@asograde.com">Support</a>
          </nav>

          <nav className="foot-col" aria-label="Legal">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>

        <div className="foot-base">
          <span>&copy; {new Date().getFullYear()} ASOGrade</span>
          <span className="fine">Not affiliated with Apple. App Store is a trademark of Apple Inc.</span>
        </div>
      </footer>

      {signIn && <SignInModal onClose={() => setSignIn(false)} next="/start" />}
    </div>
  );
}
