"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";
import Notice from "../ui/Notice";
import Plans from "../ui/Plans";

/**
 * The buy buttons on /pricing.
 *
 * These used to be links to /onboarding, which meant the flow read: see the price,
 * pick a plan, and then get asked six questions about your app before being
 * shown the same price again. A visitor who has already chosen has nothing left
 * to be qualified for. /onboarding is the funnel for someone arriving cold from
 * "Get started"; this page is for someone who came to buy, so clicking a plan
 * here opens checkout.
 *
 * Signed out, checkout is impossible — the API refuses without a session,
 * because a subscription with no account behind it belongs to nobody. So the
 * click signs in first and comes back to `/pricing?plan=…`, which the effect
 * below picks up and finishes. The visitor experiences one interruption they
 * expected, not a questionnaire they didn't.
 *
 * The page around this stays a server component: the price is still in the
 * first byte of HTML for anyone, reader or crawler, with no session needed.
 */
export default function BuyPlans() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const resumed = useRef(false);

  const buy = useCallback(async (plan: "monthly" | "yearly") => {
    setBusy(plan); setErr(null);
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      }).then((x) => x.json());
      // Already paying: nothing to sell them, so show what they have.
      if (r.code === "already-subscribed") { router.replace("/billing"); return; }
      if (!r.ok || !r.url) throw new Error(r.error ?? "could not start checkout");
      window.location.href = r.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setBusy(null);
    }
  }, [router]);

  const pick = (plan: "monthly" | "yearly") => {
    if (!ready) return;
    if (user) { void buy(plan); return; }

    const sb = supabase();
    if (!sb) { setErr("Sign-in isn't configured yet."); return; }
    setBusy(plan);
    const next = `/pricing?plan=${plan}`;
    void sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    }).then(({ error }) => { if (error) { setErr(error.message); setBusy(null); } });
  };

  /* Back from sign-in with a plan still in hand. Read from the URL rather than
     useSearchParams so the page can stay statically prerendered, and drop the
     parameter as we go — a refresh afterwards should not re-open checkout. */
  useEffect(() => {
    if (!ready || !user || resumed.current) return;
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan !== "monthly" && plan !== "yearly") return;
    resumed.current = true;
    window.history.replaceState(null, "", "/pricing");
    void buy(plan);
  }, [ready, user, buy]);

  return (
    <>
      <Plans onPick={pick} busyKey={busy} />
      {err && <Notice tone="error" className="mt-4">{err}</Notice>}
    </>
  );
}
