"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";
import { QUESTIONS } from "./questions";
import SiteHeader from "../ui/SiteHeader";
import SiteFooter from "../ui/SiteFooter";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Notice from "../ui/Notice";
import Faq from "../ui/Faq";
import Pill, { Kicker } from "../ui/Pill";
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

  /* One definition of the plans, used by both the signed-out pitch and the
     paywall at the end of the questionnaire. The two were separate copies of
     the same markup in this file and their feature lists had already drifted
     apart by a sentence. */
  const Plans = ({ onPick, busyKey }: {
    onPick: (plan: "monthly" | "yearly") => void;
    busyKey: string | null;
  }) => (
    <>
      <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
        <Card className="flex flex-col">
          <b className="text-base font-semibold text-ink">Monthly</b>
          <div className="mt-2 flex items-baseline gap-1">
            <strong className="font-display text-3xl font-extrabold text-ink">$14.99</strong>
            <span className="text-sm text-muted">/month</span>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            Everything below, billed monthly.
          </p>
          <Button variant="secondary" size="lg" block className="mt-5"
            disabled={!!busyKey} onClick={() => onPick("monthly")}>
            {busyKey === "monthly" ? "Opening checkout…" : "Choose monthly"}
          </Button>
        </Card>

        <Card className="relative flex flex-col border-tint-line">
          <span className="absolute -top-2.5 right-5">
            <Pill className="shadow-1">Save 45%</Pill>
          </span>
          <b className="text-base font-semibold text-ink">Yearly</b>
          <div className="mt-2 flex items-baseline gap-1">
            <strong className="font-display text-3xl font-extrabold text-ink">$99</strong>
            <span className="text-sm text-muted">/year</span>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            The same thing at <b className="font-semibold text-ink">$8.25 a month</b>, billed once.
          </p>
          <Button size="lg" block className="mt-5"
            disabled={!!busyKey} onClick={() => onPick("yearly")}>
            {busyKey === "yearly" ? "Opening checkout…" : "Choose yearly"}
          </Button>
        </Card>
      </div>

      {/* Everything both plans include, stated once rather than duplicated
          into two columns of ticks that say the same thing. */}
      <ul className="mt-6 grid min-w-0 list-none gap-2 sm:grid-cols-2">
        {[
          <><b className="font-semibold text-ink">109</b> App Store storefronts, each scored separately</>,
          <><b className="font-semibold text-ink">100</b> keywords in a single check, as often as you like</>,
          <><b className="font-semibold text-ink">50</b> ranked apps readable behind any keyword</>,
          <>Competitor teardowns — paste a link, read their whole set</>,
          <>Apple Search Ads demand, not a guess from chart position</>,
          <>Refreshed daily; anything already checked returns instantly</>,
        ].map((item, i) => (
          <li key={i} className="flex min-w-0 gap-2 text-sm leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>

      <Card tone="accent" className="mt-6">
        <p className="text-sm leading-relaxed text-white/90">
          A full ASO suite runs $79–$1,500 a month for tracking, ad management and
          reporting you may never open. This does the research pass and stops there.
        </p>
      </Card>
    </>
  );

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader
        links={ready && user ? [] : undefined}
        actions={
          ready && user ? (
            <span className="min-w-0 max-w-[12rem] truncate rounded-full border border-line px-3 py-1.5 text-xs text-muted">
              {user.email}
            </span>
          ) : undefined
        }
      />
      <main className="mx-auto mt-10 w-[min(100%-1.5rem,44rem)] min-w-0 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );

  /*
   * Signed in but we do not yet know where they belong.
   *
   * This used to fall through to the pricing block below, so a visitor who had
   * just signed in saw the plans flash for the length of one round trip before
   * the questionnaire replaced them — the paywall arriving before the questions
   * that are supposed to justify it. A signed-in visitor gets a quiet hold
   * instead; the pricing block still renders for signed-out visitors, who are
   * on their way to Google and are the ones it is written for.
   */
  if (ready && user && !checked) {
    return (
      <Shell>
        <div className="flex min-h-[20rem] items-center justify-center gap-3 text-md text-muted" role="status">
          <span
            aria-hidden="true"
            className="size-4 shrink-0 animate-spin-slow rounded-full border-2 border-line border-t-accent"
          />
          <span>Setting up your account…</span>
        </div>
      </Shell>
    );
  }

  /* Signed out: the plans as a pitch, while the OAuth redirect is in flight.
     This is also what a crawler sees for /start. */
  if (!ready || !user) {
    const signInThenReturn = () => {
      supabase()?.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/start")}` },
      });
    };

    return (
      <Shell>
        <Kicker>Get started</Kicker>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink">
          App Store Keyword Research Plans
        </h1>
        <p className="mt-3 max-w-[54ch] text-md leading-relaxed text-muted">
          Score keywords by Apple Search Ads demand and ranking difficulty across 109
          storefronts. No software to install.
        </p>

        <Plans onPick={signInThenReturn} busyKey={null} />

        <h2 className="mt-12 font-display text-xl font-extrabold text-ink">
          Frequently asked questions
        </h2>
        <Faq
          className="mt-4"
          items={[
            {
              q: "Do I need a published app to use ASOGrade?",
              a: "No. Keyword demand and difficulty belong to the keyword and storefront. You can research names, subtitles, and keyword fields before launch.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Subscriptions can be canceled at any time with one click. Your access continues until the end of your billing cycle.",
            },
            {
              q: "How does billing work?",
              a: "Payments are processed securely via Dodo Payments (merchant of record). Local taxes are calculated and added automatically at checkout.",
            },
          ]}
        />

        <p className="mt-8 text-xs leading-relaxed text-faint">
          Cancel any time. Payments handled securely by Dodo Payments.{" "}
          <Link className="text-accent underline underline-offset-2" href="/terms">Terms of Service</Link>{" "}
          and{" "}
          <Link className="text-accent underline underline-offset-2" href="/privacy">Privacy Policy</Link>.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="h-1 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-brand"
          style={{ width: `${onPaywall ? 100 : pct}%` }}
        />
      </div>

      {current && !onRecap && !onPaywall ? (
        <section key={current.key} className="mt-8 min-w-0 animate-fade">
          <Kicker>Question {step + 1} of {total}</Kicker>
          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
            {current.q}
          </h1>
          {current.hint && <p className="mt-2 text-sm leading-relaxed text-muted">{current.hint}</p>}

          <div className="mt-6 grid min-w-0 gap-2.5">
            {current.options.map((o) => {
              const on = current.multi
                ? Array.isArray(picked) && picked.includes(o.value)
                : picked === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => choose(o.value)}
                  className={`min-w-0 cursor-pointer rounded-md border px-5 py-4 text-left transition-colors duration-150 ${
                    on ? "border-accent bg-tint" : "border-line bg-surface hover:bg-hover"
                  }`}
                >
                  <span className="block text-base font-semibold text-ink">{o.label}</span>
                  {o.note && <em className="mt-1 block text-sm not-italic text-muted">{o.note}</em>}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex min-w-0 flex-wrap gap-3">
            {step > 0 && (
              <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button>
            )}
            {current.multi && (
              <Button disabled={!canAdvance} onClick={() => setStep((s) => s + 1)}>Continue</Button>
            )}
          </div>
        </section>
      ) : onRecap && hasAnswers ? (
        /* Their answers, handed back with the specific thing that answers each
           one. This is the argument; the plans page is just the ask. */
        <section key="recap" className="mt-8 min-w-0 animate-fade">
          <Kicker>Here&apos;s where you are</Kicker>
          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
            {MATURITY_LINE[maturity] ?? "Here's what you told us."}
          </h1>
          <p className="mt-2 text-md leading-relaxed text-muted">{MATURITY_NOTE[maturity]}</p>

          {fixes.length > 0 && (
            <div className="mt-6 grid min-w-0 gap-3">
              {fixes.map((f) => (
                <Card key={f.problem} pad="sm" className="border-l-[3px] border-l-accent">
                  {/* The badge wraps under the problem rather than sitting beside
                      it: as a nowrap flex sibling with nothing able to shrink, it
                      used to render outside this card. */}
                  <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="min-w-0 text-base font-semibold text-ink">{f.problem}</span>
                    {f.proof && <Pill className="shrink-0">{f.proof}</Pill>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.fix}</p>
                </Card>
              ))}
            </div>
          )}

          {LOCALIZATION_NOTE[local] && (
            <Notice tone="working" className="mt-4">{LOCALIZATION_NOTE[local]}</Notice>
          )}

          <div className="mt-6 flex min-w-0 flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button>
            <Button size="lg" onClick={() => setStep((s) => s + 1)}>See what it costs</Button>
          </div>
        </section>
      ) : (
        <section key="paywall" className="mt-8 min-w-0 animate-fade">
          <Kicker>Last step</Kicker>
          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
            One keyword field. Get it right.
          </h1>
          <p className="mt-2 text-md leading-relaxed text-muted">
            {PRICE_FRAME[revenue] ?? PRICE_FRAME.skip}
          </p>

          <Plans onPick={buy} busyKey={busy} />

          {err && <Notice tone="error" className="mt-4">{err}</Notice>}

          <p className="mt-6 text-xs leading-relaxed text-faint [overflow-wrap:anywhere]">
            Billed to <b className="font-semibold text-ink-2">{user.email}</b>. Cancel any
            time — access runs to the end of the paid period. Prices exclude tax; local tax
            is added at checkout. Payments handled by Dodo Payments.{" "}
            <Link className="text-accent underline underline-offset-2" href="/terms">Terms</Link>{" "}
            and{" "}
            <Link className="text-accent underline underline-offset-2" href="/privacy">Privacy</Link>.
          </p>

          <div className="mt-6">
            <Button variant="secondary" onClick={() => setStep(total)}>Back</Button>
          </div>
        </section>
      )}
    </Shell>
  );
}
