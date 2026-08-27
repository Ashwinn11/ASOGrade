"use client";

import { useState } from "react";
import { supabase, authConfigured } from "@/lib/supabase/client";
import Modal from "../ui/Modal";
import BrandMark from "../ui/BrandMark";
import Notice from "../ui/Notice";

const GOOGLE = (
  <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden className="shrink-0">
    <path fill="#4285F4" d="M17.6 9.2c0-.6-.05-1.2-.16-1.7H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6Z" />
    <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z" />
    <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3Z" />
    <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z" />
  </svg>
);

export default function SignInModal({ onClose, next = "/app" }: {
  onClose: () => void; next?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ready = authConfigured();

  const go = async () => {
    const sb = supabase();
    if (!sb) { setErr("Sign-in isn't configured yet."); return; }
    setBusy(true); setErr(null);
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) { setErr(error.message); setBusy(false); }
  };

  return (
    <Modal onClose={onClose} title="Sign in to ASOGrade">
      <BrandMark size="sm" as="span" />

      <p className="mt-5 font-display text-xl font-extrabold leading-tight text-ink">
        Sign in to ASOGrade
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Sign in and your lists stay put — one workspace per store, on every device.
      </p>

      <button
        type="button"
        onClick={go}
        disabled={busy || !ready}
        className="mt-6 flex w-full min-w-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:not-disabled:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {GOOGLE}
        <span>{busy ? "Redirecting…" : "Continue with Google"}</span>
      </button>

      {!ready && (
        <Notice tone="error" className="mt-4">
          Add <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code className="font-mono text-xs">.env.local</code>, then enable Google under
          Authentication → Providers.
        </Notice>
      )}
      {err && <Notice tone="error" className="mt-4">{err}</Notice>}

      <p className="mt-5 text-xs text-faint">No card, no spam. Takes a couple of seconds.</p>
    </Modal>
  );
}
