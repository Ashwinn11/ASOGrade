"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import { STORES } from "@/lib/types";

/* Sample rows — the real numbers, so the page shows the actual product. */
const SAMPLE = [
  { kw: "habit tracker",     pop: 67, diff: 67 },
  { kw: "white noise",       pop: 66, diff: 77 },
  { kw: "budget planner",    pop: 51, diff: 63 },
  { kw: "gratitude journal", pop: 34, diff: 60 },
];

const STEPS = [
  { n: "01", h: "Paste your keywords", p: "One at a time or a whole list. No app to add, no project to set up, no onboarding." },
  { n: "02", h: "Pick a storefront",   p: `All ${STORES.length} of them. The same keyword scores differently in the US than it does in Brazil.` },
  { n: "03", h: "Read pop and diff",   p: "Apple Search Ads popularity, and how hard its top spots are to take. That's the whole decision." },
];

const FAQ = [
  { q: "What are pop and diff?",
    a: "Popularity indicates how much a keyword is searched within the App Store. Difficulty indicates how difficult it is to index for a keyword. Both run 0–100. The guidance is to put keywords with a popularity above 25 and a difficulty below 75 into your metadata — the coloured bars let you scan a long list for those at a glance." },
  { q: "Do I need to have shipped an app?",
    a: "No. Keyword scores belong to the keyword and the storefront, not to your app — so a name you're still deciding on scores exactly the same as a live one. Paste keywords and read the numbers." },
  { q: "Can I check the same keyword in several countries?",
    a: "Yes, and you should. Switch stores and check it again, then use the All stores view to see every copy side by side. A keyword that's hopeless in the US is often wide open in a smaller storefront." },
  { q: "Where does the data come from?",
    a: "Popularity comes straight out of Apple Search Ads — Apple's own measure of how much a keyword gets searched, the same number advertisers bid against. Difficulty is calculated from who currently holds the top spots for that keyword and how much weight they carry, so it tells you what it would actually take to break into the top 10. Both are pulled live per storefront, and every row shows when it was last checked." },
];

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
      <div className="glow" />

      <header className="nav">
        <span className="mark">aso<b>kit</b></span>
        <span className="sp" />
        <a className="navlink" href="#how">How it works</a>
        <a className="navlink" href="#faq">FAQ</a>
        <button className="btn primary" onClick={enter} disabled={!ready}>
          {user ? "Open the tool" : "Get started"}
        </button>
      </header>

      {authError && <div className="error wrapped">Sign-in failed: {authError}</div>}

      <section className="lead">
        <span className="eyebrow">Apple Search Ads data · {STORES.length} storefronts</span>
        <h1>Know which keywords<br />are worth fighting for.</h1>
        <p className="sub">
          Paste a keyword. See its Apple Search Ads popularity and how hard the top spots
          are to take — in any App Store country. No app to add, no account required.
        </p>
        <div className="cta">
          <button className="btn primary big" onClick={enter} disabled={!ready}>
            {user ? "Open the tool" : "Check a keyword — free"}
          </button>
        </div>

        <div className="peek">
          <div className="peekhead">
            <span>Keyword</span><span>Pop</span><span>Diff</span>
          </div>
          {SAMPLE.map((r, i) => (
            <div className="peekrow" key={r.kw} style={{ animationDelay: `${140 + i * 90}ms` }}>
              <span className="pk"><b>{r.kw}</b></span>
              <span className={`cell ${r.pop >= 65 ? "hi" : r.pop >= 20 ? "mid" : "lo"}`}>
                <span className="n">{r.pop}</span>
                <span className="track"><i style={{ width: `${r.pop}%` }} /></span>
              </span>
              <span className={`cell ${r.diff <= 20 ? "hi" : r.diff <= 65 ? "mid" : "lo"}`}>
                <span className="n">{r.diff}</span>
                <span className="track"><i style={{ width: `${r.diff}%` }} /></span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="how" id="how">
        {STEPS.map((s) => (
          <article className="step" key={s.n}>
            <span className="num">{s.n}</span>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </article>
        ))}
      </section>

      <section className="strip">
        <div>
          <span className="big">{STORES.length}</span>
          <span className="lbl">storefronts, every one verified</span>
        </div>
        <div>
          <span className="big">100</span>
          <span className="lbl">keywords per batch</span>
        </div>
        <div>
          <span className="big">20<i>/</i>65</span>
          <span className="lbl">the pop and diff line to beat</span>
        </div>
      </section>

      <section className="faq" id="faq">
        <h2>Questions</h2>
        {FAQ.map((f, i) => (
          <div className="qa" key={f.q} data-open={openFaq === i ? 1 : 0}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {f.q}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openFaq === i && <p>{f.a}</p>}
          </div>
        ))}
      </section>

      <section className="last">
        <h2>Stop guessing at your keyword field.</h2>
        <button className="btn primary big" onClick={enter} disabled={!ready}>Open the tool</button>
      </section>

      <footer className="foot">
        <span className="mark">aso<b>kit</b></span>
        <span className="sp" />
        <span className="fine">Not affiliated with Apple. App Store is a trademark of Apple Inc.</span>
      </footer>

      {signIn && <SignInModal onClose={() => setSignIn(false)} />}
    </div>
  );
}
