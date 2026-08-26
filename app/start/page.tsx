"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";
import { QUESTIONS } from "./questions";
import { STRUGGLE_FIX, MATURITY_LINE, MATURITY_NOTE, LOCALIZATION_NOTE, PRICE_FRAME } from "./solutions";

/**
 * Sign in first, then onboarding, then the paywall.
 *
 * Signing in up front costs one tap but removes the worst failure in a
 * buy-first flow: paying as one address and signing in as another, leaving a
 * subscription attached to nobody. With an account already in hand the email
 * comes from Google, the answers file against a real user id, and a returning
 * visitor is recognised instantly — so nobody is ever asked the questions twice.
 */

type Answers = Record<string, string | string[]>;

/* Checkout navigates away to Dodo and back, so answers cannot live only in
   component state. Kept per browser; the copy in Postgres is the durable one.
   Stamped with the account that gave them: a shared machine must never show one
   person's answers to the next. */
const SAVED = "asograde.onboarding";

export default function Start() {
  const router = useRouter();
  const { user, ready } = useUser();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState(false);   // has prior state been read
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Restore anything from before a refresh or the trip out to checkout — but
  // only if it belongs to whoever is signed in now.
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(SAVED);
      if (!raw) return;
      const save = JSON.parse(raw);
      if (save?.uid === user.id) setAnswers(save.answers ?? {});
      else localStorage.removeItem(SAVED);
    } catch { /* private window or cleared storage: start fresh */ }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    try { localStorage.setItem(SAVED, JSON.stringify({ uid: user.id, answers })); }
    catch { /* not fatal; the flow still works, it just will not resume */ }
  }, [answers, user]);

  // Not signed in: this page has nothing to show. Send them to sign in and come
  // straight back here.
  useEffect(() => {
    if (!ready || user) return;
    const sb = supabase();
    sb?.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/start")}` },
    });
  }, [ready, user]);

  // A returning visitor skips whatever they have already answered. Subscribers
  // never get here at all — the workspace is where they belong.
  useEffect(() => {
    if (!ready || !user) return;
    (async () => {
      const sb = supabase();
      const [{ data: sub }, { data: prior }] = await Promise.all([
        sb!.from("subscriptions").select("status").maybeSingle(),
        sb!.from("onboarding_answers")
           .select("has_app, revenue, struggles, aso_maturity, localization")
           .order("created_at", { ascending: false }).limit(1).maybeSingle(),
      ]);
      if (sub && ["active", "trialing"].includes(String(sub.status))) {
        router.replace("/app");
        return;
      }
      if (prior) setStep(QUESTIONS.length);   // answered before: straight to the plans
      setChecked(true);
    })();
  }, [ready, user, router]);

  const total = QUESTIONS.length;
  const onRecap = step === total;        // their answers, handed back with the fix
  const onPaywall = step > total;
  const current = QUESTIONS[step];
  const picked = current ? answers[current.key] : undefined;
  const canAdvance = current?.multi ? Array.isArray(picked) && picked.length > 0 : Boolean(picked);

  const choose = (value: string) => {
    if (!current) return;
    if (current.multi) {
      const now = Array.isArray(picked) ? picked : [];
      setAnswers({ ...answers, [current.key]: now.includes(value) ? now.filter((v) => v !== value) : [...now, value] });
    } else {
      setAnswers({ ...answers, [current.key]: value });
      setTimeout(() => setStep((s) => s + 1), 140);
    }
  };

  const buy = async (plan: "monthly" | "yearly") => {
    setBusy(plan); setErr(null);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, answers }),
      }).then((x) => x.json());
      // Already paying: nothing to buy, so show them what they have instead of
      // an error they cannot act on.
      if (r.code === "already-subscribed") { router.replace("/billing"); return; }
      if (!r.ok || !r.url) throw new Error(r.error ?? "could not start checkout");
      window.location.href = r.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setBusy(null);
    }
  };

  const pct = useMemo(() => Math.round((Math.min(step, total) / total) * 100), [step, total]);

  // Only the struggles they actually picked, in the order the question listed
  // them, so the recap reads as their answer rather than a feature dump.
  const fixes = useMemo(() => {
    const picked = Array.isArray(answers.struggles) ? answers.struggles : [];
    return Object.keys(STRUGGLE_FIX).filter((k) => picked.includes(k)).map((k) => STRUGGLE_FIX[k]);
  }, [answers]);

  // If there is genuinely nothing to reflect back, the recap has no argument to
  // make — skip it rather than render a headline over empty space.
  const hasAnswers = Object.keys(answers).length > 0 &&
    (fixes.length > 0 || Boolean(answers.aso_maturity));

  // Never come to rest on a recap with nothing to say — step past it in
  // whichever direction it was reached from.
  useEffect(() => {
    if (onRecap && checked && !hasAnswers) setStep(total + 1);
  }, [onRecap, checked, hasAnswers, total]);

  const maturity = String(answers.aso_maturity ?? "");
  const local = String(answers.localization ?? "");
  const revenue = String(answers.revenue ?? "skip");

  if (!ready || !user || !checked) {
    return (
      <div className="page landing onboard-page">
        <div className="land-bg" aria-hidden="true" />

        <header className="landing-nav">
          <Link className="brand-mark" href="/" aria-label="ASOGrade home">
            <img src="/mark.png" alt="" width={26} height={26} />
            <span>ASO<b>Grade</b></span>
          </Link>
          <nav className="nav-menu" aria-label="Primary">
            <Link href="/keyword-research">Storefronts</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/compare">Compare</Link>
          </nav>
        </header>

        <main className="onboard">
          <section className="onboard-step paywall" style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="onboard-count">Get Started</span>
            <h1>App Store Keyword Research Plans</h1>
            <p className="onboard-hint">
              Score keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts. No software to install.
            </p>

            <div className="plans">
              <div className="plan">
                <b>Monthly</b>
                <div className="plan-price"><strong>$14.99</strong><span>/month</span></div>
                <p>Full access to all 109 storefronts, billed monthly.</p>
                <button
                  className="btn secondary big"
                  onClick={() => {
                    const sb = supabase();
                    sb?.auth.signInWithOAuth({
                      provider: "google",
                      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/start")}` },
                    });
                  }}
                >
                  Continue with Google
                </button>
              </div>

              <div className="plan best">
                <span className="plan-flag">Save 45%</span>
                <b>Yearly</b>
                <div className="plan-price"><strong>$99</strong><span>/year</span></div>
                <p>The same full access at <b>$8.25 a month</b>, billed once annually.</p>
                <button
                  className="btn primary big"
                  onClick={() => {
                    const sb = supabase();
                    sb?.auth.signInWithOAuth({
                      provider: "google",
                      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/start")}` },
                    });
                  }}
                >
                  Continue with Google
                </button>
              </div>
            </div>

            <ul className="includes">
              <li><b>109</b> App Store storefronts, each scored separately</li>
              <li><b>100</b> keywords in a single check, as often as you like</li>
              <li><b>50</b> ranked apps readable behind any keyword</li>
              <li>Competitor teardowns — paste a link, read their whole set</li>
              <li>Apple Search Ads demand signals, not chart guesses</li>
              <li>Refreshed daily; anything already checked returns instantly</li>
            </ul>

            <div className="anchor">
              A full ASO suite runs $79–$1,500 a month for rank tracking and ad tooling you may never open. ASOGrade covers the keyword research pass and stops there.
            </div>

            <div style={{ marginTop: 32, textAlign: "left" }}>
              <h3 style={{ fontSize: 18, marginBottom: 12 }}>Frequently Asked Questions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <strong style={{ display: "block", marginBottom: 4 }}>Do I need a published app to use ASOGrade?</strong>
                  <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>No. Keyword demand and difficulty belong to the keyword and storefront. You can research names, subtitles, and keyword fields before launch.</span>
                </div>
                <div>
                  <strong style={{ display: "block", marginBottom: 4 }}>Can I cancel anytime?</strong>
                  <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>Yes. Subscriptions can be canceled at any time with one click. Your access continues until the end of your billing cycle.</span>
                </div>
                <div>
                  <strong style={{ display: "block", marginBottom: 4 }}>How does billing work?</strong>
                  <span style={{ fontSize: 13.5, color: "var(--ink-2)" }}>Payments are processed securely via Dodo Payments (merchant of record). Local taxes are calculated and added automatically at checkout.</span>
                </div>
              </div>
            </div>

            <p className="pay-fine" style={{ marginTop: 24 }}>
              Cancel any time. Payments handled securely by Dodo Payments. <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page landing onboard-page">
      <div className="land-bg" aria-hidden="true" />

      <header className="landing-nav">
        <Link className="brand-mark" href="/" aria-label="ASOGrade home">
          <img src="/mark.png" alt="" width={26} height={26} />
          <span>ASO<b>Grade</b></span>
        </Link>
        <span className="sp" />
        <span className="who-chip">{user.email}</span>
      </header>

      <main className="onboard">
        <div className="onboard-bar" aria-hidden="true"><i style={{ width: `${onPaywall ? 100 : pct}%` }} /></div>

        {current && !onRecap && !onPaywall ? (
          <section className="onboard-step" key={current.key}>
            <span className="onboard-count">Question {step + 1} of {total}</span>
            <h1>{current.q}</h1>
            {current.hint && <p className="onboard-hint">{current.hint}</p>}

            <div className="onboard-opts">
              {current.options.map((o) => {
                const on = current.multi
                  ? Array.isArray(picked) && picked.includes(o.value)
                  : picked === o.value;
                return (
                  <button key={o.value} className="onboard-opt" data-on={on ? 1 : 0}
                    onClick={() => choose(o.value)}>
                    <span>{o.label}</span>
                    {o.note && <em>{o.note}</em>}
                  </button>
                );
              })}
            </div>

            <div className="onboard-nav">
              {step > 0 && <button className="btn secondary" onClick={() => setStep((s) => s - 1)}>Back</button>}
              {current.multi && (
                <button className="btn primary" disabled={!canAdvance} onClick={() => setStep((s) => s + 1)}>
                  Continue
                </button>
              )}
            </div>
          </section>

        ) : onRecap && hasAnswers ? (
          /* Their answers, handed back with the specific thing that answers each
             one. This is the argument; the plans page is just the ask. */
          <section className="onboard-step" key="recap">
            <span className="onboard-count">Here's where you are</span>
            <h1>{MATURITY_LINE[maturity] ?? "Here's what you told us."}</h1>
            <p className="onboard-hint">{MATURITY_NOTE[maturity]}</p>

            {fixes.length > 0 && (
              <div className="fixes">
                {fixes.map((f) => (
                  <div className="fix" key={f.problem}>
                    <div className="fix-head">
                      <span className="fix-problem">{f.problem}</span>
                      {f.proof && <em>{f.proof}</em>}
                    </div>
                    <p>{f.fix}</p>
                  </div>
                ))}
              </div>
            )}

            {LOCALIZATION_NOTE[local] && (
              <div className="notice working">{LOCALIZATION_NOTE[local]}</div>
            )}

            <div className="onboard-nav">
              <button className="btn secondary" onClick={() => setStep((s) => s - 1)}>Back</button>
              <button className="btn primary big" onClick={() => setStep((s) => s + 1)}>
                See what it costs
              </button>
            </div>
          </section>

        ) : (
          <section className="onboard-step paywall" key="paywall">
            <span className="onboard-count">Last step</span>
            <h1>One keyword field. Get it right.</h1>
            <p className="onboard-hint">{PRICE_FRAME[revenue] ?? PRICE_FRAME.skip}</p>

            <div className="plans">
              <div className="plan">
                <b>Monthly</b>
                <div className="plan-price"><strong>$14.99</strong><span>/month</span></div>
                <p>Everything below, billed monthly.</p>
                <button className="btn secondary big" disabled={!!busy} onClick={() => buy("monthly")}>
                  {busy === "monthly" ? "Opening checkout…" : "Choose monthly"}
                </button>
              </div>

              <div className="plan best">
                <span className="plan-flag">Save 45%</span>
                <b>Yearly</b>
                <div className="plan-price"><strong>$99</strong><span>/year</span></div>
                <p>The same thing at <b>$8.25 a month</b>, billed once.</p>
                <button className="btn primary big" disabled={!!busy} onClick={() => buy("yearly")}>
                  {busy === "yearly" ? "Opening checkout…" : "Choose yearly"}
                </button>
              </div>
            </div>

            {/* Everything both plans include, stated once rather than duplicated
                into two columns of ticks that say the same thing. */}
            <ul className="includes">
              <li><b>109</b> App Store storefronts, each scored separately</li>
              <li><b>100</b> keywords in a single check, as often as you like</li>
              <li><b>50</b> ranked apps readable behind any keyword</li>
              <li>Competitor teardowns — paste a link, read their whole set</li>
              <li>Apple Search Ads demand, not a guess from chart position</li>
              <li>Refreshed daily; anything already checked returns instantly</li>
            </ul>

            <div className="anchor">
              A full ASO suite runs $79–$1,500 a month for tracking, ad management
              and reporting you may never open. This does the research pass and
              stops there.
            </div>

            {err && <div className="error">{err}</div>}

            <p className="pay-fine">
              Billed to <b>{user.email}</b>. Cancel any time — access runs to the end
              of the paid period. Prices exclude tax; local tax is added at checkout.
              Payments handled by Dodo Payments. <Link href="/terms">Terms</Link> and{" "}
              <Link href="/privacy">Privacy</Link>.
            </p>

            <div className="onboard-nav">
              <button className="btn secondary" onClick={() => setStep(total)}>Back</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
