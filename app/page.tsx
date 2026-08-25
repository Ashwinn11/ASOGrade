"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import { STORES } from "@/lib/types";

const SAMPLE = [
  { kw: "habit tracker", store: "US", pop: 67, diff: 38, tag: "shortlist" },
  { kw: "budget planner", store: "GB", pop: 51, diff: 42, tag: "shortlist" },
  { kw: "sleep sounds", store: "CA", pop: 66, diff: 71, tag: "crowded" },
  { kw: "gratitude journal", store: "AU", pop: 34, diff: 28, tag: "opening" },
  { kw: "meal planner", store: "US", pop: 48, diff: 64, tag: "watch" },
];

const STOREFRONTS = [
  { code: "US", name: "United States", pop: 67, diff: 38 },
  { code: "GB", name: "United Kingdom", pop: 58, diff: 31 },
  { code: "BR", name: "Brazil", pop: 33, diff: 19 },
];

const ADVANTAGES = [
  {
    label: "Input",
    value: "100 terms",
    copy: "Batch a full metadata draft instead of checking ideas one by one.",
  },
  {
    label: "Coverage",
    value: `${STORES.length} stores`,
    copy: "The same list can move across every supported App Store market.",
  },
  {
    label: "Output",
    value: "pop + diff",
    copy: "Demand and ranking pressure sit together, so weak bets are easier to cut.",
  },
];

const OPPORTUNITIES = [
  { kw: "budget planner", store: "GB", score: "51 / 42", tone: "best" },
  { kw: "gratitude journal", store: "AU", score: "34 / 28", tone: "good" },
  { kw: "meal planner", store: "US", score: "48 / 64", tone: "watch" },
  { kw: "sleep sounds", store: "CA", score: "66 / 71", tone: "hard" },
];

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
  { label: "First action", desktop: "Install, create a tracked app, then configure stores", asokit: "Paste keywords and read the market immediately" },
  { label: "Best use", desktop: "Ongoing rank tracking after you already know the list", asokit: "Fast keyword discovery before the next metadata update" },
  { label: "Market view", desktop: "Country switching is usually a secondary workflow", asokit: `${STORES.length} storefronts are part of the core research loop` },
  { label: "Team access", desktop: "Tied to a Mac workflow", asokit: "Runs in the browser with a saved workspace" },
];

const FAQ = [
  {
    q: "How is this different from desktop ASO tools?",
    a: "ASOKit is built for the research pass before tracking. Open it in the browser, paste a keyword batch, switch storefronts, and decide which terms are worth testing.",
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
    q: "Can I check the same keyword in several countries?",
    a: `Yes. Switch between individual storefronts or use the all-store view to compare the same list across the ${STORES.length} supported App Store markets.`,
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
  const enter = () => (user ? router.push("/app") : setSignIn(true));
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
        <span className="brand-mark">aso<b>kit</b></span>
        <nav className="nav-menu" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#compare">Compare</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-actions">
          <button className="btn primary" onClick={enter} disabled={!ready}>
            {user ? "Open app" : "Start free"}
          </button>
        </div>
      </header>

      {authError && <div className="error wrapped">Sign-in failed: {authError}</div>}

      <main id="main">
        <section className="landing-hero" id="product">
          <div className="hero-copy">
            <span className="landing-eyebrow">Browser-first ASO research</span>
            <h1>Find App Store keywords before your competitors do.</h1>
            <p className="hero-sub">
              ASOKit turns raw keyword ideas into a usable metadata shortlist with Apple
              Search Ads popularity, ranking difficulty, and storefront context in one workspace.
            </p>

            <div className="hero-actions">
              <button className="btn primary big" onClick={enter} disabled={!ready}>
                {user ? "Open your workspace" : "Check keywords free"}
              </button>
              <a className="btn secondary big" href="#compare">See the angle</a>
            </div>

            <dl className="proof-list" aria-label="Product facts">
              <div>
                <dt>{STORES.length}</dt>
                <dd>App Store markets</dd>
              </div>
              <div>
                <dt>100</dt>
                <dd>keywords per batch</dd>
              </div>
              <div>
                <dt>0</dt>
                <dd>downloads required</dd>
              </div>
            </dl>
          </div>

          <div className="product-shot" aria-label="ASOKit keyword research preview">
            <div className="shot-top">
              <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="shot-title">Keyword workspace</span>
              <span className="shot-status">live scores</span>
            </div>

            <div className="query-strip">
              <span>habit tracker, budget planner, sleep sounds</span>
              <b>US</b>
            </div>

            <div className="market-snap">
              {STOREFRONTS.map((store) => (
                <div key={store.code}>
                  <span>{store.code}</span>
                  <b>{store.name}</b>
                  <small>{store.pop} pop / {store.diff} diff</small>
                </div>
              ))}
            </div>

            <div className="keyword-table" role="table" aria-label="Sample keyword scores">
              <div className="keyword-head" role="row">
                <span>Keyword</span>
                <span>Store</span>
                <span>Pop</span>
                <span>Diff</span>
                <span>Decision</span>
              </div>
              {SAMPLE.map((row, i) => (
                <div className="keyword-row" role="row" key={`${row.store}-${row.kw}`} style={{ animationDelay: `${120 + i * 70}ms` }}>
                  <span className="keyword-name"><b>{row.kw}</b></span>
                  <span className="store-code">{row.store}</span>
                  <ScoreCell value={row.pop} band={popBand(row.pop)} />
                  <ScoreCell value={row.diff} band={diffBand(row.diff)} />
                  <span className={`decision ${row.tag}`}>{row.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="signal-band" aria-label="ASOKit highlights">
          <div className="signal-inner">
            <p>Apple Search Ads demand, difficulty scoring, and country-by-country keyword context.</p>
            <span>Built for the metadata decisions that happen before rank tracking.</span>
          </div>
        </section>

        <section className="section-shell feature-section">
          <div className="section-copy">
            <span className="section-kicker">Why it wins</span>
            <h2>A leaner research loop for serious ASO work.</h2>
            <p>
              ASOKit should win the first research session: no install friction, no heavy
              suite, just the numbers that decide what goes into App Store metadata.
            </p>
          </div>

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
                  <span className={`map-point point-${i + 1} ${item.tone}`} key={item.kw}>
                    <b>{item.kw}</b>
                    <em>{item.store} / {item.score}</em>
                  </span>
                ))}
              </div>
            </div>

            <div className="advantage-rail">
              {ADVANTAGES.map((item) => (
                <article className="advantage-stat" key={item.label}>
                  <span>{item.label}</span>
                  <b>{item.value}</b>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell workflow-section" id="workflow">
          <div className="section-copy compact">
            <span className="section-kicker">Workflow</span>
            <h2>From raw ideas to a ranked shortlist.</h2>
          </div>

          <div className="workflow-board">
            {WORKFLOW.map((step) => (
              <article className="workflow-step" key={step.n}>
                <div className="workflow-copy">
                  <span className="step-num">{step.n}</span>
                  <h3>{step.h}</h3>
                  <p>{step.p}</p>
                </div>
                <div className="workflow-art" aria-hidden="true">
                  <div className="chip-cloud">
                    {step.chips.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                  <strong>{step.metric}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell compare-section" id="compare">
          <div className="section-copy compact">
            <span className="section-kicker">Positioning</span>
            <h2>Browser speed against desktop-heavy ASO tools.</h2>
          </div>

          <div className="compare-table" role="table" aria-label="ASOKit positioning against desktop ASO tools">
            <div className="compare-head" role="row">
              <span>Decision point</span>
              <span>Desktop ASO tools</span>
              <span>ASOKit</span>
            </div>
            {COMPARE.map((row) => (
              <div className="compare-row" role="row" key={row.label}>
                <b>{row.label}</b>
                <span>{row.desktop}</span>
                <span>{row.asokit}</span>
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
          <span>Ready when the keyword list is messy.</span>
          <h2>Score the terms before they reach your next App Store update.</h2>
          <button className="btn primary big" onClick={enter} disabled={!ready}>
            {user ? "Open your workspace" : "Start researching"}
          </button>
        </section>
      </main>

      <footer className="foot">
        <span className="brand-mark">aso<b>kit</b></span>
        <a href="mailto:support@asokit.app">Support</a>
        <span className="fine">Not affiliated with Apple. App Store is a trademark of Apple Inc.</span>
      </footer>

      {signIn && <SignInModal onClose={() => setSignIn(false)} />}
    </div>
  );
}
