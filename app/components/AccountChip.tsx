"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "./useUser";
import Button from "../ui/Button";

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
  if (!user) return <Button size="sm" onClick={onSignIn}>Sign in</Button>;

  const meta = user.user_metadata ?? {};
  const name = (meta.full_name as string) ?? (meta.name as string) ?? user.email ?? "Account";
  const avatar = (meta.avatar_url as string) ?? (meta.picture as string) ?? null;

  return (
    <div className="relative min-w-0" ref={wrap}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Account menu — ${name}`}
        title={name}
        className="flex shrink-0 cursor-pointer rounded-full border border-line bg-surface p-0.5 transition-colors duration-150 hover:bg-hover"
      >
        {avatar ? (
          <img className="size-9 shrink-0 rounded-full object-cover" src={avatar} alt="" />
        ) : (
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tint text-sm font-bold text-accent-2">
            {name.trim()[0]?.toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-30 w-60 animate-drop rounded-md border border-line bg-surface p-1.5 shadow-3">
          {/* The name falls back to the email when the OAuth profile has none,
              and an address has no break opportunities — so both lines are
              clipped with an ellipsis rather than allowed to run out of the
              popover, which is what the old fixed 240px panel did. */}
          <div className="min-w-0 border-b border-line px-3 py-2.5">
            <div className="truncate text-sm font-semibold text-ink">{name}</div>
            {user.email && <div className="truncate text-xs text-muted">{user.email}</div>}
          </div>

          <Link
            href="/billing"
            onClick={() => setOpen(false)}
            className="mt-1 flex min-w-0 items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm text-ink-2 no-underline transition-colors duration-150 hover:bg-hover"
          >
            <span>Billing</span>
            {plan && (
              <em
                className={`shrink-0 rounded-full px-2 py-0.5 text-2xs font-bold not-italic ${
                  live ? "bg-green/15 text-[#2b7a4b]" : "bg-tint text-accent-2"
                }`}
              >
                {plan}
              </em>
            )}
          </Link>

          <button
            type="button"
            className="flex w-full min-w-0 cursor-pointer rounded-sm px-3 py-2 text-left text-sm text-ink-2 transition-colors duration-150 hover:bg-hover"
            onClick={async () => {
              // Signing out has to take the local answers with it — otherwise the
              // next person to sign in on this machine sees them pre-filled.
              try { localStorage.removeItem("asograde.onboarding"); } catch {}
              await supabase()?.auth.signOut();
              window.location.href = "/";
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
