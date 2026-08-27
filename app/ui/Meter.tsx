import { cn } from "./cn";

/**
 * A 0–100 score with its bar.
 *
 * Existed twice — `ScoreCell` on the landing page and `Meter` in the
 * workspace — with the same markup but different null handling, and the
 * landing copy did not clamp its bar width. The `popBand`/`diffBand`
 * thresholds were duplicated alongside them and had drifted: the landing page
 * called 25 the low cutoff for popularity where the workspace used 20.
 *
 * The number column is sized in `ch`, not px. It was `width: 23px` for a
 * three-character value in a tabular font that needs ~23.4px, so "100"
 * overflowed its own cell by a hair — the same bug class as the pill, just
 * small enough that nobody looked.
 */

export type Band = "hi" | "mid" | "lo" | "na";

/** Demand: higher is better. */
export const popBand = (v: number | null): Band =>
  v == null ? "na" : v >= 65 ? "hi" : v >= 20 ? "mid" : "lo";

/** Difficulty: lower is better. */
export const diffBand = (v: number | null): Band =>
  v == null ? "na" : v <= 20 ? "hi" : v <= 65 ? "mid" : "lo";

const FILL: Record<Band, string> = {
  hi: "bg-green",
  mid: "bg-amber",
  lo: "bg-red",
  na: "bg-line-2",
};

export default function Meter({
  value,
  band,
  onDark = false,
  className,
}: {
  value: number | null;
  band: Band;
  onDark?: boolean;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value ?? 0));

  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <span
        className={cn(
          "w-[3ch] shrink-0 text-right font-mono text-xs font-semibold tabular-nums",
          onDark ? "text-dark-ink" : "text-ink",
        )}
      >
        {value ?? "–"}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "h-1 min-w-0 flex-1 overflow-hidden rounded-full",
          onDark ? "bg-white/15" : "bg-track",
        )}
      >
        <span className={cn("block h-full rounded-full", FILL[band])} style={{ width: `${pct}%` }} />
      </span>
    </span>
  );
}
