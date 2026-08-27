"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "../components/useUser";
import SiteHeader from "../ui/SiteHeader";
import SiteFooter from "../ui/SiteFooter";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Notice from "../ui/Notice";
import { Kicker } from "../ui/Pill";

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

  /* Identity values — the address and the Dodo reference — are unbreakable
     strings. They wrap here rather than being clipped by the card, which is
     what the old fixed-row layout did with no way to read the tail. */
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 last:border-b-0">
      <span className="shrink-0 text-sm text-muted">{label}</span>
      <b className="min-w-0 text-right text-base font-semibold text-ink [overflow-wrap:anywhere]">
        {children}
      </b>
    </div>
  );

  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader
        links={[]}
        actions={<Button variant="secondary" size="sm" href="/app">Back to workspace</Button>}
      />

      <main className="mx-auto mt-10 w-[min(100%-1.5rem,42rem)] min-w-0 flex-1">
        <Kicker>Account</Kicker>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink">Billing</h1>

        {sub === undefined ? (
          <p className="mt-4 text-sm text-muted">Loading…</p>
        ) : !sub ? (
          <>
            <p className="mt-4 max-w-[54ch] text-md leading-relaxed text-muted">
              There&apos;s no subscription on this account yet, so keyword scoring is
              switched off.
            </p>
            <Button href="/start" size="lg" className="mt-6">See the plans</Button>
          </>
        ) : (
          <>
            <Card pad="none" className="mt-6 overflow-hidden">
              <Row label="Plan">{yearly ? "Yearly — $99/year" : "Monthly — $14.99/month"}</Row>
              <Row label="Status">
                <span className={live ? "text-[#2b7a4b]" : "text-accent-2"}>
                  {PRETTY[sub.status] ?? sub.status}
                </span>
              </Row>
              <Row label="Started">{when(sub.created_at)}</Row>
              <Row label={sub.cancel_at_period_end ? "Access ends" : "Renews"}>
                {when(sub.current_period_end)}
              </Row>
              <Row label="Billed to">{user.email}</Row>
              {sub.dodo_subscription_id && (
                <Row label="Reference">
                  <span className="font-mono text-xs">{sub.dodo_subscription_id}</span>
                </Row>
              )}
            </Card>

            {extra > 0 && (
              <Notice className="mt-4">
                <b className="font-semibold text-ink">
                  {extra === 1 ? "Another subscription" : `${extra} other subscriptions`}
                </b>{" "}
                {extra === 1 ? "is" : "are"} attached to this account and may still be
                billing. Email{" "}
                <a className="text-accent underline underline-offset-2" href="mailto:support@asograde.com">
                  support@asograde.com
                </a>{" "}
                and we will close {extra === 1 ? "it" : "them"}.
              </Notice>
            )}

            {sub.cancel_at_period_end && (
              <Notice tone="working" className="mt-4">
                This subscription is set to end on {when(sub.current_period_end)}. Scoring
                keeps working until then.
              </Notice>
            )}

            {!live && (
              <Notice className="mt-4">
                <b className="font-semibold text-ink">Scoring is switched off.</b> Renew to
                turn it back on.
              </Notice>
            )}

            <div className="mt-6 flex min-w-0 flex-wrap gap-3">
              {!live && <Button href="/start">Choose a plan</Button>}
              <Button variant="secondary" onClick={openPortal} disabled={opening}>
                {opening ? "Opening…" : "Change or cancel"}
              </Button>
            </div>

            {portalErr && <Notice tone="error" className="mt-4">{portalErr}</Notice>}

            <p className="mt-6 text-xs leading-relaxed text-faint">
              Handled by Dodo Payments, our merchant of record.{" "}
              <a className="text-accent underline underline-offset-2" href="mailto:support@asograde.com">
                Need help?
              </a>
            </p>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
