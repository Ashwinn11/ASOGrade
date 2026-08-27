"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";
import AccountChip from "../components/AccountChip";
import { QUESTIONS } from "./questions";
import SiteHeader from "../ui/SiteHeader";
import Button from "../ui/Button";
import { Kicker } from "../ui/Pill";
import { cn } from "../ui/cn";

/**
 * Sign in, answer the questions, go to the price. Nothing else lives here.
 *
 * This route carried the paywall too, which is why the price appeared in three
 * places that had all drifted apart, and why /pricing sent anyone who clicked a
 * plan back into a six-question funnel before showing them the same price
 * again. There is one place to buy now — /pricing — and this is the thing that
 * leads to it.
 *
 * Signing in up front costs one tap but removes the worst failure in a
 * buy-first flow: paying as one address and signing in as another, leaving a
 * subscription attached to nobody. It is also what makes completion recordable,
 * so nobody is ever asked these six questions twice.
 */

type Answers = Record<string, string | string[]>;

/* Answers survive a refresh mid-flow. Stamped with the account that gave them:
   a shared machine must never show one person's answers to the next. Dropped
   the moment the server has them. */
const SAVED = "asograde.onboarding";

/*
 * No footer, no nav. A funnel has one thing it wants the visitor to do, and a
 * footer is thirty links to somewhere else sitting directly under it.
 */
function Shell({ children, ready, user, onHome }: {
  children: React.ReactNode;
  ready: boolean;
  user: { email?: string | null } | null;
  onHome: () => void;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader links={[]} actions={ready && user ? <AccountChip onSignIn={onHome} /> : undefined} />
      <main className="mx-auto my-10 w-[min(100%-1.5rem,40rem)] min-w-0 flex-1">{children}</main>
    </div>
  );
}

function Waiting({ label }: { label: string }) {
  return (
    <div className="flex min-h-[20rem] items-center justify-center gap-3 text-md text-muted" role="status">
      <span
        aria-hidden="true"
        className="size-4 shrink-0 animate-spin-slow rounded-full border-2 border-line border-t-accent"
      />
      <span>{label}</span>
    </div>
  );
}

/* --------------------------------------------------------------------- page */

export default function Start() {
  const router = useRouter();
  const { user, ready } = useUser();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checked, setChecked] = useState(false);   // has prior state been read
  const [saving, setSaving] = useState(false);

  // Restore anything from before a refresh — but only if it belongs to whoever
  // is signed in now.
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
    supabase()?.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/onboarding")}` },
    });
  }, [ready, user]);

  /* The onboarding check. Subscribers belong in the workspace; anyone who has
     already answered goes to the price rather than through the same six
     questions a second time. Only somebody genuinely new sees a question. */
  useEffect(() => {
    if (!ready || !user) return;
    (async () => {
      const sb = supabase();
      const [{ data: sub }, { data: prior }] = await Promise.all([
        sb!.from("subscriptions").select("status").maybeSingle(),
        sb!.from("onboarding_answers")
           .select("completed_at")
           .not("completed_at", "is", null)
           .limit(1).maybeSingle(),
      ]);
      if (sub && ["active", "trialing"].includes(String(sub.status))) {
        router.replace("/dashboard");
        return;
      }
      if (prior) { router.replace("/pricing"); return; }
      setChecked(true);
    })();
  }, [ready, user, router]);

  const current = QUESTIONS[step];
  const picked = current ? answers[current.key] : undefined;
  const isLast = step === QUESTIONS.length - 1;
  const canAdvance = current?.multi ? Array.isArray(picked) && picked.length > 0 : Boolean(picked);

  const back = () => setStep((s) => Math.max(0, s - 1));

  /* The last answer is the end of the funnel, not a step towards another
     screen: it is filed and the visitor is handed to the price. */
  const finish = async (final: Answers) => {
    setSaving(true);
    try {
      const r = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: final }),
      }).then((x) => x.json());
      if (!r?.ok) console.error("[start] answers not saved:", r?.error);
      else { try { localStorage.removeItem(SAVED); } catch { /* nothing to clear */ } }
    } catch (e) {
      // A failed write costs us a row of research and costs them the six
      // questions again next time. It must not also cost them the price.
      console.error("[start] answers not saved:", e);
    }
    router.replace("/pricing");
  };

  const advance = (final: Answers) => {
    if (isLast) void finish(final);
    else setStep((s) => s + 1);
  };

  const choose = (value: string) => {
    if (!current) return;
    if (current.multi) {
      const now = Array.isArray(picked) ? picked : [];
      setAnswers({
        ...answers,
        [current.key]: now.includes(value) ? now.filter((v) => v !== value) : [...now, value],
      });
    } else {
      const next = { ...answers, [current.key]: value };
      setAnswers(next);
      setTimeout(() => advance(next), 140);
    }
  };

  const pct = useMemo(() => Math.round((step / QUESTIONS.length) * 100), [step]);
  const home = () => router.push("/");

  /* Signed in, but we do not yet know whether they belong here, in the
     workspace or at the price. A quiet hold rather than a flash of question one. */
  if (!ready || !user || !checked) {
    return (
      <Shell ready={ready} user={user} onHome={home}>
        <Waiting label={ready && user ? "Setting up your account…" : "Taking you to sign in…"} />
      </Shell>
    );
  }

  if (saving) {
    return (
      <Shell ready={ready} user={user} onHome={home}>
        <Waiting label="Saving your answers…" />
      </Shell>
    );
  }

  return (
    <Shell ready={ready} user={user} onHome={home}>
      <div className="h-1 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-brand"
          style={{ width: `${pct}%` }}
        />
      </div>

      <section key={current.key} className="mt-8 min-w-0 animate-fade">
        <Kicker>Question {step + 1} of {QUESTIONS.length}</Kicker>

        {/* The reason, above the ask. On the revenue question this is the
            difference between an intrusive question and a fair one, and a
            reason printed underneath is a reason nobody reads. */}
        {current.why && (
          <p className="mt-3 text-sm font-semibold text-accent-2">{current.why}</p>
        )}

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
                className={cn(
                  "min-w-0 cursor-pointer rounded-md border px-5 py-4 text-left transition-colors duration-150",
                  on ? "border-accent bg-tint" : "border-line bg-surface hover:bg-hover",
                )}
              >
                <span className="block text-base font-semibold text-ink">{o.label}</span>
                {o.note && <em className="mt-1 block text-sm not-italic text-muted">{o.note}</em>}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex min-w-0 flex-wrap gap-3">
          {step > 0 && <Button variant="secondary" onClick={back}>Back</Button>}
          {current.multi && (
            <Button disabled={!canAdvance} onClick={() => advance(answers)}>
              {isLast ? "See the plans" : "Continue"}
            </Button>
          )}
        </div>
      </section>
    </Shell>
  );
}
