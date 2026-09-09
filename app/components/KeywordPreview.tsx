"use client";

import { useState, useRef, useEffect } from "react";
import { track } from "@vercel/analytics/react";
import Meter, { popBand, diffBand } from "../ui/Meter";
import { cn } from "../ui/cn";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FREE_LIMIT = 3;
const STORAGE_KEY = "asograde_preview_v1";
const SUGGESTIONS = ["habit tracker", "budget planner", "sleep sounds", "mood tracker"];

// ---------------------------------------------------------------------------
// localStorage helpers — keyed by calendar date so the limit resets daily.
// ---------------------------------------------------------------------------

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "2026-09-09"
}

function loadCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    // Reset if stored date is not today
    if (parsed?.date !== todayKey()) return 0;
    return typeof parsed?.count === "number" ? parsed.count : 0;
  } catch {
    return 0;
  }
}

function saveCount(n: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey(), count: n }));
  } catch {
    // storage blocked — fail silently, don't break the UI
  }
}

// ---------------------------------------------------------------------------
// Opportunity verdict
// ---------------------------------------------------------------------------

type Verdict = "Excellent" | "Good" | "Competitive" | "Hard";

function verdict(pop: number, diff: number): Verdict {
  if (pop >= 50 && diff <= 45) return "Excellent";
  if (pop >= 35 && diff <= 55) return "Good";
  if (pop >= 50 && diff > 55)  return "Hard";
  return "Competitive";
}

const VERDICT_STYLE: Record<Verdict, { chip: string; label: string }> = {
  Excellent:   { chip: "bg-green/15 text-green border-green/30",            label: "High demand, low competition" },
  Good:        { chip: "bg-[#28c8a0]/15 text-[#1a9e7e] border-[#28c8a0]/30", label: "Solid opportunity" },
  Competitive: { chip: "bg-amber/15 text-[#b07d00] border-amber/30",        label: "Possible but crowded" },
  Hard:        { chip: "bg-red/15 text-red border-red/30",                  label: "High competition" },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ResultRow {
  keyword: string;
  pop: number;
  diff: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function KeywordPreview({ onSignIn }: { onSignIn: () => void }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ResultRow[]>([]);
  // Initialise from localStorage so a refresh doesn't reset the limit
  const [count, setCount] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Read persisted count after mount (avoids SSR mismatch)
  useEffect(() => {
    setCount(loadCount());
    setHydrated(true);
    inputRef.current?.focus();
  }, []);

  const exhausted = hydrated && count >= FREE_LIMIT;

  const scoreKeyword = async (raw: string) => {
    const keyword = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!keyword || exhausted || loading) return;

    setLoading(true);
    setError(null);
    track("preview_keyword_submitted", { keyword });

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, store: "us" }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      const pop  = data.popularity  ?? 0;
      const diff = data.difficulty  ?? 0;

      const newCount = count + 1;
      setCount(newCount);
      saveCount(newCount);

      setResults((prev) => {
        const deduped = prev.filter((r) => r.keyword !== keyword);
        return [{ keyword: data.keyword ?? keyword, pop, diff }, ...deduped];
      });
      setInput("");

      track("preview_result_shown", { keyword, verdict: verdict(pop, diff) });
      if (newCount >= FREE_LIMIT) track("preview_limit_reached");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => scoreKeyword(input);
  const handleKey    = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };

  const openSignIn = () => {
    track("signin_modal_opened", { source: "keyword_preview" });
    onSignIn();
  };

  return (
    <div className="min-w-0">
      {/* Input row */}
      <div className={cn(
        "flex min-w-0 items-center gap-2 rounded-full border bg-surface px-4 py-2 shadow-2 transition-colors",
        exhausted
          ? "border-line opacity-60 cursor-not-allowed"
          : "border-line focus-within:border-tint-line focus-within:shadow-ring",
      )}>
        {loading ? <SpinIcon /> : <SearchIcon />}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={exhausted || loading}
          placeholder="Try a keyword — habit tracker, budget planner…"
          aria-label="Enter an App Store keyword to score"
          className="min-w-0 flex-1 bg-transparent text-md text-ink placeholder:text-faint focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={exhausted || loading || !input.trim()}
          aria-label="Score keyword"
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150",
            "bg-accent text-white hover:not-disabled:bg-accent-2",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          {loading ? "Scoring…" : "Score"}
        </button>
      </div>

      {/* Suggestion chips — only before first result */}
      {!exhausted && results.length === 0 && !loading && (
        <div className="mt-3 flex min-w-0 flex-wrap gap-2">
          <span className="self-center text-xs text-faint">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => scoreKeyword(s)}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-2 transition-colors hover:border-tint-line hover:bg-hover"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-3 animate-fade text-xs text-red">{error}</p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 min-w-0 space-y-2">
          {results.map((r, i) => {
            const v  = verdict(r.pop, r.diff);
            const vs = VERDICT_STYLE[v];
            return (
              <div
                key={r.keyword}
                className="animate-fade min-w-0 rounded-card border border-ink shadow-1 bg-[radial-gradient(circle_at_85%_0%,rgba(255,207,188,.16),transparent_38%),linear-gradient(140deg,var(--color-dark-1),var(--color-dark-2)_60%,var(--color-dark-3))] p-4"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                  <span className="min-w-0 font-semibold text-dark-ink">{r.keyword}</span>
                  <span className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    vs.chip,
                  )}>
                    {v}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-dark-ink/55">{vs.label}</p>
                <div className="mt-3 grid min-w-0 gap-2 [grid-template-columns:4rem_1fr]">
                  <span className="self-center text-xs font-medium text-dark-ink/60">Popularity</span>
                  <Meter value={r.pop} band={popBand(r.pop)} onDark />
                  <span className="self-center text-xs font-medium text-dark-ink/60">Difficulty</span>
                  <Meter value={r.diff} band={diffBand(r.diff)} onDark />
                </div>
                <p className="mt-2 text-2xs text-dark-ink/40">
                  Powered by Apple Search Ads · United States
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Limit reached — soft paywall */}
      {exhausted && (
        <div className="mt-4 animate-fade min-w-0 rounded-card border border-ink shadow-1 bg-[radial-gradient(circle_at_85%_0%,rgba(255,207,188,.16),transparent_38%),linear-gradient(140deg,var(--color-dark-1),var(--color-dark-2)_60%,var(--color-dark-3))] p-5 text-center">
          <p className="font-semibold text-dark-ink">You've used your 3 free lookups today</p>
          <p className="mt-1 text-sm text-dark-ink/60">
            Score 100 keywords at once, across all 109 App Store markets.
          </p>
          <button
            type="button"
            onClick={openSignIn}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-2"
          >
            Get started free
            <ArrowIcon />
          </button>
          <p className="mt-2 text-xs text-dark-ink/45">$14.99/mo · resets tomorrow · cancel anytime</p>
        </div>
      )}

      {/* Interim CTA — after ≥1 result, before limit */}
      {results.length > 0 && !exhausted && (
        <div className="mt-3 flex min-w-0 items-center justify-between gap-3 rounded-full border border-line bg-surface px-4 py-2 shadow-1">
          <span className="text-xs text-faint">
            {FREE_LIMIT - count} free {FREE_LIMIT - count === 1 ? "lookup" : "lookups"} remaining today
          </span>
          <button
            type="button"
            onClick={openSignIn}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent hover:text-accent-2"
          >
            Unlock everything <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 text-faint" aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round"
      className="shrink-0 animate-spin-slow text-accent" aria-hidden>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
