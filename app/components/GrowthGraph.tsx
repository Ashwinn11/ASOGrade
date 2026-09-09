"use client";

import { useState, useRef, useId } from "react";

const Spark = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z" />
  </svg>
);

interface Point {
  x: number;
  y: number;
  label: string;
  impressions: string;
  rank: string;
  note: string;
}

const POINTS: Point[] = [
  { x: 30, y: 240, label: "Day 1", impressions: "14.2K", rank: "Rank #42", note: "Baseline before ASO" },
  { x: 130, y: 215, label: "Day 15", impressions: "22.8K", rank: "Rank #28", note: "Keywords researched" },
  { x: 230, y: 225, label: "Day 30", impressions: "26.1K", rank: "Rank #22", note: "Title & subtitle update" },
  { x: 340, y: 175, label: "Day 45", impressions: "58.4K", rank: "Rank #8", note: "Indexed in 12 storefronts" },
  { x: 420, y: 185, label: "Day 60", impressions: "71.0K", rank: "Rank #5", note: "App Store Search lift" },
  { x: 500, y: 110, label: "Day 75", impressions: "118.5K", rank: "Rank #2", note: "Top 3 for high-pop terms" },
  { x: 570, y: 55, label: "Day 90", impressions: "164.2K", rank: "Rank #1", note: "Dominating primary keywords" },
];

// SVG path with smooth natural bezier curve
const PATH_LINE =
  "M 30 240 C 90 240, 90 215, 130 215 C 170 215, 190 230, 230 225 C 280 220, 290 170, 340 175 C 380 180, 390 195, 420 185 C 460 170, 460 105, 500 110 C 530 115, 540 60, 570 55";

const PATH_AREA = `${PATH_LINE} L 570 270 L 30 270 Z`;

// Baseline flatline showing unoptimized trajectory
const BASELINE_PATH = "M 30 245 C 160 242, 320 238, 570 230";

export default function GrowthGraph({ onGetStarted }: { onGetStarted: () => void }) {
  const gradientId = useId();
  const maskId = useId();
  const [activeIdx, setActiveIdx] = useState<number>(4); // default to the pivotal inflection point
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = POINTS[activeIdx] ?? POINTS[4];

  // Map mouse x coordinate to nearest point
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 600;
    let closest = 0;
    let minDiff = Infinity;
    POINTS.forEach((pt, i) => {
      const diff = Math.abs(pt.x - relX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    setActiveIdx(closest);
  };

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-card border border-line bg-surface p-5 shadow-2 transition-all duration-300 hover:shadow-3 sm:p-6"
    >
      {/* Background radial atmosphere */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-tint-2 opacity-50 blur-3xl"
        aria-hidden="true"
      />

      {/* Card Header: Metric overview & growth badge */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xs font-bold uppercase tracking-wider text-faint">
              App Store Search Growth
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2 py-0.5 text-2xs font-bold text-[#1b703e]">
              <span className="size-1.5 rounded-full bg-green animate-pulse" />
              Live impact
            </span>
          </div>

          <div className="mt-1.5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              164.2K
            </span>
            <span className="text-xs font-semibold text-muted">monthly impressions</span>
          </div>
        </div>

        {/* The +185% pill badge inspired by user reference */}
        <div className="flex flex-col items-end">
          <div className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-tint px-3 py-1 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent" aria-hidden="true">
              <path d="M2.5 8.5L9.5 1.5M9.5 1.5H4.5M9.5 1.5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display text-base font-extrabold text-accent sm:text-lg">
              +185%
            </span>
          </div>
          <span className="mt-1 text-3xs font-semibold uppercase tracking-wider text-faint">
            vs previous listing
          </span>
        </div>
      </div>

      {/* SVG Interactive Chart Area */}
      <div className="relative mt-4">
        {/* Floating tooltip for active milestone */}
        <div
          className="pointer-events-none absolute z-20 transition-all duration-200 ease-out"
          style={{
            left: `${(active.x / 600) * 100}%`,
            top: `${(active.y / 280) * 100}%`,
            transform: "translate(-50%, -125%)",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="rounded-md border border-ink/15 bg-ink px-2.5 py-1.5 text-center text-white shadow-3">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-display text-xs font-bold text-accent">{active.impressions}</span>
                <span className="text-3xs text-white/60">·</span>
                <span className="font-mono text-3xs font-semibold text-white/90">{active.rank}</span>
              </div>
              <p className="mt-0.5 whitespace-nowrap text-3xs text-white/70">{active.note}</p>
            </div>
            {/* Tooltip caret */}
            <div className="-mt-px size-1.5 rotate-45 border-b border-r border-ink/15 bg-ink" />
          </div>
        </div>

        {/* SVG Container */}
        <svg
          viewBox="0 0 600 280"
          className="h-auto w-full cursor-crosshair overflow-visible select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
          aria-label="App store impression growth over 90 days"
        >
          <defs>
            {/* Rich gradient fill beneath the curve */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.32" />
              <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
            </linearGradient>

            {/* Line glow filter */}
            <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--color-accent)" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background horizontal grid lines */}
          <g stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" className="text-line opacity-60">
            <line x1="20" y1="70" x2="580" y2="70" />
            <line x1="20" y1="130" x2="580" y2="130" />
            <line x1="20" y1="190" x2="580" y2="190" />
            <line x1="20" y1="250" x2="580" y2="250" />
          </g>

          {/* Baseline stagnant curve (Without ASOGrade) */}
          <path
            d={BASELINE_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="text-faint/70"
          />
          <text x="320" y="248" className="fill-faint text-3xs font-medium tracking-tight">
            Baseline without ASO optimization
          </text>

          {/* Gradient area fill under growth curve */}
          <path d={PATH_AREA} fill={`url(#${gradientId})`} />

          {/* Primary growth curve */}
          <path
            d={PATH_LINE}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${gradientId}-glow)`}
          />

          {/* Vertical dashed guide line at active point */}
          <line
            x1={active.x}
            y1={active.y}
            x2={active.x}
            y2="250"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.6"
          />

          {/* Key milestone circles */}
          {POINTS.map((pt, i) => {
            const isActive = i === activeIdx;
            return (
              <g key={pt.label} className="cursor-pointer">
                {/* Active pulsating outer aura */}
                {isActive && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="12"
                    fill="var(--color-accent)"
                    opacity="0.2"
                    className="animate-ping"
                  />
                )}
                {/* Outer ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? "7" : "4.5"}
                  fill="white"
                  stroke="var(--color-accent)"
                  strokeWidth={isActive ? "3" : "2"}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Timeline Milestones Bar */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-2xs text-muted">
        <div className="flex items-center gap-1.5 font-semibold text-ink">
          <span className="text-accent"><Spark size={12} /></span>
          <span>Timeline: Day 1 → Day 90</span>
        </div>

        <button
          type="button"
          onClick={onGetStarted}
          className="group/btn inline-flex items-center gap-1 font-semibold text-accent transition-colors hover:text-accent-2"
        >
          <span>See what your app can gain</span>
          <span className="transition-transform duration-150 group-hover/btn:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
}
