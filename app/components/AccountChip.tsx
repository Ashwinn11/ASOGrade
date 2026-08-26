"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "./useUser";

/** Signed-in state for the tool header. Renders nothing until auth is configured. */
export default function AccountChip({ onSignIn }: { onSignIn: () => void }) {
  const { user, ready } = useUser();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const [plan, setPlan] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase()?.from("subscriptions").select("status, plan").maybeSingle()
      .then(({ data }) => {
        if (!data) { setPlan("No plan"); setLive(false); return; }
        const on = ["active", "trialing"].includes(String(data.status));
        setLive(on);
        setPlan(on ? (data.plan === "yearly" ? "Yearly" : "Monthly") : String(data.status));
      });
  }, [user]);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("mousedown", away);
    return () => window.removeEventListener("mousedown", away);
  }, [open]);

  if (!ready) return null;
  if (!user) return <button className="btn sm" onClick={onSignIn}>Sign in</button>;

  const meta = user.user_metadata ?? {};
  const name = (meta.full_name as string) ?? (meta.name as string) ?? user.email ?? "Account";
  const avatar = (meta.avatar_url as string) ?? (meta.picture as string) ?? null;

  return (
    <div className="picker" ref={wrap}>
      <button className="trigger acct" data-open={open ? 1 : 0} onClick={() => setOpen((o) => !o)}>
        {avatar
          ? <img className="av" src={avatar} alt="" />
          : <span className="av ph">{name.trim()[0]?.toUpperCase()}</span>}
        <span className="nm">{name}</span>
      </button>

      {open && (
        <div className="pop acctpop">
          <div className="acctwho">
            <div className="n">{name}</div>
            {user.email && <div className="e">{user.email}</div>}
          </div>
          <Link className="opt" href="/billing" onClick={() => setOpen(false)}>
            <span>Billing</span>
            {plan && <em data-live={live ? 1 : 0}>{plan}</em>}
          </Link>
          <button className="opt" onClick={async () => {
            // Signing out has to take the local answers with it — otherwise the
            // next person to sign in on this machine sees them pre-filled.
            try { localStorage.removeItem("asograde.onboarding"); } catch {}
            await supabase()?.auth.signOut();
            window.location.href = "/";
          }}>Sign out</button>
        </div>
      )}
    </div>
  );
}
