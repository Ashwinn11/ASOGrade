import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * A bordered surface.
 *
 * Thirteen separate rules described this same box — `.panel`, `.command-card`,
 * `.shot-panel`, `.rival-panel`, `.trust-card`, `.bill-card`, `.plan`, `.fix`,
 * `.anchor`, `.legal`, `.pseo-definition`, `.pseo-problem-box`,
 * `.pseo-solution-card` — with drifting radii and shadows.
 *
 * `tone="dark"` is the workspace/product surface. It carries a warm radial
 * highlight over the base gradient — the same idea `--shot-skin` used to give
 * the product screenshot a lit, glass-like edge instead of a flat rectangle.
 * That highlight was pasted as a raw gradient into six separate rules before,
 * two of which had already drifted to a different angle from the rest; it is
 * defined once here so every dark surface in the product — the composer, the
 * opportunity map, the competitor panel — reads as one material.
 */

type Tone = "surface" | "sunken" | "dark" | "accent";
type Pad = "none" | "sm" | "md" | "lg";

const TONE: Record<Tone, string> = {
  surface: "bg-surface border-line text-ink",
  sunken: "bg-sunken border-line text-ink",
  // One unbroken string, deliberately: Tailwind's scanner reads raw source
  // text, not evaluated JS, so splitting an arbitrary-value class across a
  // `+` concatenation breaks the bracket in two and the class silently
  // generates nothing — which is exactly how this went dark on first pass.
  //
  // border-ink rather than the near-invisible white/10 the first pass used:
  // a crisp dark line is what gives the dark surfaces their sticker-like edge
  // and matches the same outline weight the wordmark itself uses.
  dark: "border-ink text-dark-ink bg-[radial-gradient(circle_at_85%_0%,rgba(255,207,188,.16),transparent_38%),linear-gradient(140deg,var(--color-dark-1),var(--color-dark-2)_60%,var(--color-dark-3))]",
  accent: "border-transparent text-white bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))]",
};

const PAD: Record<Pad, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
};

export default function Card({
  children,
  tone = "surface",
  pad = "md",
  className,
  as: As = "div",
}: {
  children: ReactNode;
  tone?: Tone;
  pad?: Pad;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <As
      className={cn(
        // min-w-0 by default: a Card is almost always a flex or grid child, and
        // the default min-width:auto is what pushed content past its parent.
        "min-w-0 rounded-card border shadow-1",
        TONE[tone],
        PAD[pad],
        className,
      )}
    >
      {children}
    </As>
  );
}
