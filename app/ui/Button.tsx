import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "./cn";

/**
 * The button.
 *
 * Replaces seven separate implementations — `.btn` and its modifiers, `.go`,
 * `.way`, `.pseo-btn-primary` (a verbatim re-implementation of `.btn.primary
 * .big`), plus the one-off add/ghost buttons in the workspace. The same visual
 * button was also rendered as `<button>`, `<a>` and `<Link>` in different
 * files, so the element is a prop here rather than a fork.
 *
 * On wrapping: the old `.btn` set `white-space: nowrap`, and a full-width
 * button in a two-column grid then painted its label outside its own pill at
 * 320-360px. Labels wrap here instead. Anything that genuinely must stay on
 * one line is a `Pill`, not a button.
 *
 * Colour and shape are independent: `variant` picks the colour, `iconOnly`
 * picks circular icon-sized padding instead of a labelled pill — so "coral
 * circle, white glyph" is `variant="primary" iconOnly` and "white circle,
 * coral glyph" is `variant="inverse" iconOnly`, rather than a separate named
 * variant for every colour × shape combination. Overriding a variant's own
 * colour classes through `className` doesn't work reliably — `cn()`
 * concatenates rather than merges, so which of two conflicting `bg-*`
 * classes wins depends on Tailwind's internal ordering, not which one came
 * last in the string — and it silently produced a white-on-white button
 * once. If a surface needs a colour combination that isn't here, it gets a
 * new variant, never a `className` override of an existing one's colours.
 */

type Variant = "primary" | "secondary" | "ghost" | "icon" | "inverse" | "onColor" | "dangerGhost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-150 " +
  "ease-brand cursor-pointer select-none text-center " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "active:not-disabled:translate-y-px";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-transparent " +
    "hover:not-disabled:bg-accent-2 hover:not-disabled:shadow-2",
  secondary:
    "bg-surface text-ink border border-line " +
    "hover:not-disabled:bg-hover hover:not-disabled:border-tint-line",
  ghost:
    "bg-transparent text-muted border border-transparent " +
    "hover:not-disabled:bg-hover hover:not-disabled:text-ink",
  // Muted and bordered — the neutral utility icon button on a light surface
  // (the keyword sheet's delete control, a modal's own corner close). The
  // border is deliberate: a bare icon has no boundary of its own to read as
  // a control rather than decoration.
  icon: "bg-transparent text-muted border border-line hover:not-disabled:bg-hover hover:not-disabled:text-ink",
  // The primary button's colours inverted, for sitting on a coral or dark
  // surface (the closing CTA, a hub page's call-to-action).
  inverse: "bg-white text-accent-2 border border-transparent hover:not-disabled:bg-[#f1f5eb]",
  // A translucent white chip with a white glyph — for an icon button that
  // itself sits directly on a coral or dark surface (a modal's coral title
  // bar). Visible at rest, not only on hover: without a permanent backdrop
  // there, a bare white icon on coral has nothing to read as a control until
  // the pointer is already on it.
  onColor: "bg-white/14 text-white border border-transparent hover:not-disabled:bg-white/24",
  // No box at rest or on hover — a bare glyph that only tints red, for a
  // delete icon sitting in a dense row of its own (the workspace table)
  // rather than alone on a coral/dark bar. `onColor`'s permanent chip reads
  // as a control worth a second look there; in a packed row of many rows it
  // was just visual noise the user asked to remove.
  dangerGhost: "bg-transparent text-muted border border-transparent hover:not-disabled:text-red",
};

const SIZE: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-base px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

const ICON_SIZE: Record<Size, string> = {
  sm: "p-1.5",
  md: "p-2.5",
  lg: "p-3",
};

export interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Circular icon padding instead of the labelled pill's text padding. */
  iconOnly?: boolean;
  /** Fills its container. Pairs with `min-w-0` on the parent, never nowrap. */
  block?: boolean;
  href?: string;
  /** Renders an `<a>` rather than a `<Link>`; for mailto, external, or a full reload. */
  external?: boolean;
  /** Takes the event so a button nested in a clickable row can stop it
   *  reaching the row's own handler (the table row's delete/expand icons). */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  title?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  iconOnly = false,
  block = false,
  href,
  external = false,
  onClick,
  type = "button",
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const cls = cn(
    BASE,
    VARIANT[variant],
    iconOnly || variant === "icon" ? ICON_SIZE[size] : SIZE[size],
    block && "w-full",
    className,
  );

  if (href && !disabled) {
    return external ? (
      <a className={cls} href={href} {...rest}>{children}</a>
    ) : (
      <Link className={cls} href={href} {...rest}>{children}</Link>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
