"use client";

import Meter, { popBand, diffBand } from "../ui/Meter";
import { Search, Chevron } from "./icons";

const SAMPLE_KEYWORDS = [
  { keyword: "habit tracker", pop: 74, diff: 58, apps: 210, tag: "Good", tagClass: "bg-green/15 text-green border-green/30" },
  { keyword: "sleep sounds", pop: 68, diff: 42, apps: 184, tag: "Easy Win", tagClass: "bg-teal/15 text-teal border-teal/30" },
  { keyword: "budget planner", pop: 61, diff: 49, apps: 95, tag: "Low Diff", tagClass: "bg-accent/15 text-accent border-accent/30" },
  { keyword: "water reminder", pop: 52, diff: 31, apps: 62, tag: "Top Pick", tagClass: "bg-green/15 text-green border-green/30" },
  { keyword: "workout log", pop: 79, diff: 64, apps: 320, tag: "High Pop", tagClass: "bg-amber/15 text-amber border-amber/30" },
];

export default function DashboardPreview({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-white/10 bg-[#1e1c18] p-4 text-dark-ink shadow-2 sm:p-5">
      {/* Decorative window header */}
      <div className="mb-4 flex min-w-0 items-center justify-between gap-3 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-red/80" />
          <div className="size-2.5 rounded-full bg-amber/80" />
          <div className="size-2.5 rounded-full bg-green/80" />
          <span className="ml-2 font-mono text-2xs text-dark-ink/50">ASOGrade Workspace</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-2xs font-semibold text-dark-ink/80">
          <span className="text-xs" role="img" aria-label="United States">🇺🇸</span>
          <span>United States</span>
          <span className="text-dark-ink/50"><Chevron size={10} /></span>
        </div>
      </div>

      {/* Mock Search / Composer */}
      <div className="mb-4 flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-white/6 px-3 py-2">
        <span className="shrink-0 text-dark-ink/40"><Search size={14} /></span>
        <span className="min-w-0 flex-1 truncate text-xs text-dark-ink/40">
          Type or paste keywords to score…
        </span>
        <button
          type="button"
          onClick={onGetStarted}
          className="shrink-0 rounded-md bg-accent px-2.5 py-1 text-2xs font-bold text-white transition-opacity hover:opacity-90"
        >
          Check
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_3.5rem] items-center gap-3 border-b border-white/10 px-2.5 pb-2 font-mono text-2xs font-bold uppercase tracking-wider text-dark-ink/40">
        <span>Keyword</span>
        <span className="text-right">Pop</span>
        <span className="text-right">Diff</span>
        <span className="text-right">Apps</span>
      </div>

      {/* Single-line rows matching real dashboard format */}
      <div className="divide-y divide-white/6">
        {SAMPLE_KEYWORDS.map((r) => (
          <div
            key={r.keyword}
            onClick={onGetStarted}
            className="group grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_3.5rem] items-center gap-3 rounded-md px-2.5 py-2.5 text-xs transition-colors hover:cursor-pointer hover:bg-white/6"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="min-w-0 truncate font-semibold text-dark-ink group-hover:text-white">
                {r.keyword}
              </span>
              <span className={`hidden shrink-0 rounded-full border px-1.5 py-0.5 text-3xs font-semibold sm:inline-block ${r.tagClass}`}>
                {r.tag}
              </span>
            </div>

            <div className="min-w-0 text-right">
              <Meter value={r.pop} band={popBand(r.pop)} onDark />
            </div>

            <div className="min-w-0 text-right">
              <Meter value={r.diff} band={diffBand(r.diff)} onDark />
            </div>

            <div className="text-right font-mono text-2xs tabular-nums text-dark-ink/60">
              {r.apps}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-2xs text-dark-ink/50">
        <span>Real-time Apple Search Ads metrics</span>
        <button
          type="button"
          onClick={onGetStarted}
          className="font-semibold text-accent hover:text-white transition-colors"
        >
          Track yours free →
        </button>
      </div>
    </div>
  );
}
