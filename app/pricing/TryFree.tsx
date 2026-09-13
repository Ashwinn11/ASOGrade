"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../components/useUser";
import SignInModal from "../components/SignInModal";

/**
 * The "not sure yet?" escape hatch above the plans.
 *
 * A signed-in visitor already has a workspace, so this sends them straight
 * back to it. A signed-out one has nowhere to land without an account —
 * despite what the page used to claim — so it opens the same sign-in modal
 * the homepage's own free-trial button uses, and resumes at /dashboard once
 * they're through.
 */
export default function TryFree() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [signIn, setSignIn] = useState(false);

  const go = () => (user ? router.push("/dashboard") : setSignIn(true));

  return (
    <>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-tint-line bg-tint px-4 py-3.5">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="mt-0.5 size-5 shrink-0 text-accent"
        >
          <path
            d="M10 2 3 5.5v4c0 4.14 2.98 7.9 7 8.85 4.02-.95 7-4.71 7-8.85v-4L10 2Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
          />
          <path d="M7.25 10 9.25 12l3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">Not sure yet? </span>
          <button
            type="button"
            onClick={go}
            disabled={!ready}
            className="cursor-pointer font-semibold text-accent underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            Try 3 keywords free →
          </button>
          <span className="text-faint"> — no credit card required.</span>
        </p>
      </div>

      {signIn && <SignInModal onClose={() => setSignIn(false)} next="/dashboard" />}
    </>
  );
}
