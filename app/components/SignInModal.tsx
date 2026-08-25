"use client";

import { useEffect, useState } from "react";
import { Close } from "./icons";
import { supabase, authConfigured } from "@/lib/supabase/client";

const PROVIDERS = [
  {
    id: "google" as const,
    label: "Continue with Google",
    mark: (
      <span className="g"><svg width="15" height="15" viewBox="0 0 18 18" aria-hidden>
        <path fill="#4285F4" d="M17.6 9.2c0-.6-.05-1.2-.16-1.7H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6Z" />
        <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z" />
        <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3Z" />
        <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z" />
      </svg></span>
    ),
  },
];

export default function SignInModal({ onClose, next = "/app" }: {
  onClose: () => void; next?: string;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const ready = authConfigured();

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  const go = async (provider: "google") => {
    const sb = supabase();
    if (!sb) { setErr("Sign-in isn't configured yet."); return; }
    setBusy(provider); setErr(null);
    const { error } = await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) { setErr(error.message); setBusy(null); }
  };

  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="shut" onClick={onClose} aria-label="Close"><Close size={15} /></button>

        <span className="mark">aso<b>kit</b></span>
        <h2>Sign in to ASOKit</h2>
        <p>Sign in and your lists stay put — one workspace per store, on every device.</p>

        <div className="ways">
          {PROVIDERS.map((p) => (
            <button key={p.id} className="way" disabled={!!busy || !ready} onClick={() => go(p.id)}>
              {p.mark}
              <span>{busy === p.id ? "Redirecting…" : p.label}</span>
            </button>
          ))}
        </div>

        {!ready && (
          <p className="warn">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to
            <code>.env.local</code>, then enable Google under Authentication → Providers.
          </p>
        )}
        {err && <p className="warn bad">{err}</p>}

        <p className="fine">No card, no spam. Takes a couple of seconds.</p>
      </div>
    </div>
  );
}
