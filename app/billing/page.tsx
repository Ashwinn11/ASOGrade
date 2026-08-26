"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";

/**
 * Plan details.
 *
 * Read straight from `subscriptions`, which is the same row the API gate asks
 * about — so what this page says and what the product actually allows can never
 * drift apart. The row is readable by its owner and writable only by the
 * webhook, so nothing here can change entitlement.
 */

type Sub = {
  status: string;
  plan: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  dodo_subscription_id: string | null;
  created_at: string;
};

const PRETTY: Record<string, string> = {
  active: "Active",
  trialing: "Trial",
  cancelled: "Cancelling",
  expired: "Expired",
  on_hold: "On hold",
  paused: "Paused",
  failed: "Payment failed",
};

const when = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : "—";

export default function Billing() {
  const { user, ready } = useUser();
  const router = useRouter();
  const [sub, setSub] = useState<Sub | null | undefined>(undefined);
  const [opening, setOpening] = useState(false);
  const [portalErr, setPortalErr] = useState<string | null>(null);
  const [extra, setExtra] = useState(0);   // other subscriptions on this account

  // The portal link is a signed session that expires, so it has to be minted on
  // click rather than rendered as an href.
  const openPortal = async () => {
    setOpening(true); setPortalErr(null);
    try {
      const r = await fetch("/api/portal", { method: "POST" }).then((x) => x.json());
      if (!r.ok || !r.url) throw new Error(r.error ?? "could not open the billing portal");
      window.location.href = r.url;
    } catch (e) {
      setPortalErr(e instanceof Error ? e.message : String(e));
      setOpening(false);
    }
  };

  useEffect(() => { if (ready && !user) router.replace("/"); }, [ready, user, router]);

  useEffect(() => {
    if (!user) return;
    // There can legitimately be more than one row — a plan change leaves the old
    // one behind until it expires. Show the one that actually grants access.
    supabase()?.from("subscriptions")
      .select("status, plan, current_period_end, cancel_at_period_end, dodo_subscription_id, created_at")
      .order("current_period_end", { ascending: false })
      .then(({ data }) => {
        const rows = (data ?? []) as Sub[];
        const live = rows.find((r) => ["active", "trialing"].includes(r.status));
        setSub(live ?? rows[0] ?? null);
        setExtra(rows.filter((r) => r !== (live ?? rows[0])).length);
      });
  }, [user]);

  if (!ready || !user) return null;

  const live = sub && ["active", "trialing"].includes(sub.status);
  const yearly = sub?.plan === "yearly";

  return (
    <div className="page landing onboard-page">
      <div className="land-bg" aria-hidden="true" />

      <header className="landing-nav">
        <Link className="brand-mark" href="/" aria-label="ASOGrade home">
          <img src="/mark.png" alt="" width={26} height={26} />
          <span>ASO<b>Grade</b></span>
        </Link>
        <span className="sp" />
        <Link className="btn secondary" href="/app">Back to workspace</Link>
      </header>

      <main className="onboard">
        <span className="onboard-count">Account</span>
        <h1>Billing</h1>

        {sub === undefined ? (
          <p className="onboard-hint">Loading…</p>
        ) : !sub ? (
          <>
            <p className="onboard-hint">
              There's no subscription on this account yet, so keyword scoring is
              switched off.
            </p>
            <div className="onboard-nav single">
              <Link className="btn primary big" href="/start">See the plans</Link>
            </div>
          </>
        ) : (
          <>
            <div className="bill-card">
              <div className="bill-row">
                <span>Plan</span>
                <b>{yearly ? "Yearly — $99/year" : "Monthly — $14.99/month"}</b>
              </div>
              <div className="bill-row">
                <span>Status</span>
                <b className="bill-status" data-live={live ? 1 : 0}>
                  {PRETTY[sub.status] ?? sub.status}
                </b>
              </div>
              <div className="bill-row">
                <span>Started</span>
                <b>{when(sub.created_at)}</b>
              </div>
              <div className="bill-row">
                <span>{sub.cancel_at_period_end ? "Access ends" : "Renews"}</span>
                <b>{when(sub.current_period_end)}</b>
              </div>
              <div className="bill-row">
                <span>Billed to</span>
                <b>{user.email}</b>
              </div>
              {sub.dodo_subscription_id && (
                <div className="bill-row">
                  <span>Reference</span>
                  <b className="bill-ref">{sub.dodo_subscription_id}</b>
                </div>
              )}
            </div>

            {extra > 0 && (
              <div className="notice">
                <b>{extra === 1 ? "Another subscription" : `${extra} other subscriptions`}</b>{" "}
                {extra === 1 ? "is" : "are"} attached to this account and may still
                be billing. Email <a href="mailto:support@asograde.com">support@asograde.com</a>
                {" "}and we will close {extra === 1 ? "it" : "them"}.
              </div>
            )}

            {sub.cancel_at_period_end && (
              <div className="notice working">
                This subscription is set to end on {when(sub.current_period_end)}.
                Scoring keeps working until then.
              </div>
            )}

            {!live && (
              <div className="notice">
                <b>Scoring is switched off.</b> Renew to turn it back on.
              </div>
            )}

            <div className="onboard-nav">
              {!live && <Link className="btn primary" href="/start">Choose a plan</Link>}
              <button className="btn secondary" onClick={openPortal} disabled={opening}>
                {opening ? "Opening…" : "Change or cancel"}
              </button>
            </div>

            {portalErr && <div className="error">{portalErr}</div>}

            <p className="pay-fine">
              Handled by Dodo Payments, our merchant of record.{" "}
              <a href="mailto:support@asograde.com">Need help?</a>
            </p>
          </>
        )}
      </main>
    </div>
  );
}
