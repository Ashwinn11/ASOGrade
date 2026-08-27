import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * Small labels: the uppercase kicker above a heading, and the inline badge.
 *
 * Ten pill implementations existed, and four different class names described
 * the one uppercase coral label (`.eyebrow`, `.landing-eyebrow`,
 * `.section-kicker`, `.pseo-eyebrow`) using three radii and three weights.
 *
 * The overflow rule these have to obey: a pill paints a background, so it must
 * never be given a width it cannot fill. `max-width` plus `white-space: nowrap`
 * is what made the opportunity-map scores render outside their own pill, and
 * the same pairing is why the paywall proof badge escaped its card. Pills size
 * to their content and wrap; only `truncate` may constrain one, because that
 * clips the text rather than letting it paint outside.
 */

type Tone = "accent" | "neutral" | "good" | "warn" | "bad" | "onDark";

const TONE: Record<Tone, string> = {
  accent: "bg-tint text-accent-2",
  neutral: "bg-sunken text-muted border border-line",
  good: "bg-green/15 text-[#1d684f]",
  warn: "bg-amber/20 text-[#865416]",
  bad: "bg-red/15 text-[#93432f]",
  onDark: "bg-white/12 text-dark-ink",
};

export function Kicker({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2 py-1 text-2xs font-bold uppercase tracking-[0.06em]",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default function Pill({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1",
        "text-xs font-semibold",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
