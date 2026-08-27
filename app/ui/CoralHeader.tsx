import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * The coral identity bar — the same accent gradient the landing page's
 * primary button and closing CTA use, at the top of a card or a modal.
 *
 * This used to be three separate hand-rolled `<div>`s: one in the keyword
 * sheet, one in the competitor panel, one in the workspace results panel and
 * a fourth in the landing page's product-shot preview — each copy free to
 * drift from the others, which is exactly what happened (only the
 * competitor panel got the real coral treatment on the first pass; the
 * keyword sheet's own title bar was left plain while an unrelated inner
 * label was coloured coral by mistake instead). One component, used
 * everywhere the coral bar appears, is what stops that drift.
 *
 * `bleed` controls how it reaches the container's edges: a `Modal` has its
 * own padding (`p-6 pt-8`), so the bar escapes it with negative margins
 * (`bleed` default `true`); a `pad="none"` `Card` has no padding to escape,
 * so the bar is just its flush first child (`bleed={false}`).
 *
 * `stack` sets the breakpoint below which title and `right` stack instead of
 * sharing a row. Left unset, the bar is always one row — right for a keyword
 * or an app name plus a close button, which comfortably fits at any width a
 * modal renders at. Breakpoints are evaluated against the viewport, not the
 * bar's own container, so `stack` should only be set for a bar whose
 * container is close to full viewport width (the workspace panel, the
 * landing page's product-shot preview) — never for a modal, where `sm:` would
 * fire from the surrounding page being wide even while the modal itself
 * stays narrow.
 *
 * `size` sets the title's weight in the hierarchy, not just its colour: a
 * modal's own title bar is the thing the panel is *of* (`"md"`, the
 * default) — a nested sub-card's coral bar (e.g. "Who holds the top spots"
 * inside the keyword sheet) is a label *within* that panel, and rendering it
 * at the same size as the modal's own title reads as two equally-important
 * headings stacked on top of each other. `"sm"` restores the original
 * small-caps kicker size (11px/600/uppercase, ported from `.ksheet .bhead`)
 * with the coral fill added, rather than inflating it to match.
 */

type Stack = "sm" | "lg";
type Size = "md" | "sm";

const STACK_CLASS: Record<Stack, string> = {
  sm: "sm:flex-row sm:items-center sm:justify-between",
  lg: "lg:flex-row lg:items-center lg:justify-between",
};

const TITLE_CLASS: Record<Size, string> = {
  md: "text-lg font-semibold",
  sm: "text-2xs font-semibold uppercase tracking-wide",
};

export default function CoralHeader({
  icon,
  title,
  subtitle,
  right,
  bleed = true,
  stack,
  size = "md",
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Whatever belongs on the header's other side — plain text, a close
   *  button, or a whole cluster of controls. */
  right?: ReactNode;
  bleed?: boolean;
  stack?: Stack;
  size?: Size;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 rounded-t-card bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))]",
        // One complete padding declaration, never two competing ones: mixing
        // a base `p-4` with a `bleed` override's `px-5 py-4` in the same
        // class list is the identical trap that silently dropped the Card
        // and Button colour variants earlier — whichever Tailwind happens to
        // order last wins, not whichever is written last here.
        bleed ? "-mx-6 -mt-8 mb-5 px-5 py-4" : "p-4",
        // No `stack`: always one row — right for a modal, whose own width
        // stays narrow regardless of the viewport a `sm:`/`lg:` prefix would
        // key off. With `stack`: column below the given breakpoint, row above.
        stack ? cn("flex-col gap-3", STACK_CLASS[stack]) : "items-center gap-3",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon}
        <span className="min-w-0 flex-1">
          <span className={cn("block truncate text-white", TITLE_CLASS[size])}>{title}</span>
          {subtitle && <span className="block truncate text-xs text-white/70">{subtitle}</span>}
        </span>
      </div>
      {right}
    </div>
  );
}
