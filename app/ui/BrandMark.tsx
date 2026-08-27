import Link from "next/link";
import { cn } from "./cn";

/**
 * The wordmark: ASO in ink, Grade in coral.
 *
 * Replaces four CSS implementations (`.mark`, `.brand-mark`, `.sheet .mark`,
 * `.pseo-brand`) across 21 call sites, which between them used three font
 * sizes, two typefaces, two icon sizes and two icon radii for one logo — and
 * rendered it as a `<Link>` in some places and a bare `<span>` in others.
 *
 * `as="span"` is for contexts that are already inside a link, or where there is
 * nowhere to navigate to (the sign-in sheet, the subscription dialog).
 */

type Size = "sm" | "md";
/** `onColor` is for the coral footer card; `ink` is everywhere else. */
type Tone = "ink" | "onColor";

const TEXT: Record<Size, string> = {
  sm: "text-lg",
  md: "text-xl",
};

const ICON: Record<Size, number> = { sm: 22, md: 26 };

export default function BrandMark({
  size = "md",
  as = "link",
  logo = true,
  tone = "ink",
  href = "/",
  className,
}: {
  size?: Size;
  as?: "link" | "span";
  /** The pSEO nav used a text-only mark; everywhere else carries the icon. */
  logo?: boolean;
  /**
   * A tone rather than a `className` override, for the same reason `Button`
   * refuses colour overrides: `cn()` concatenates rather than merges, so which
   * of two competing `text-*` classes wins comes down to Tailwind's ordering
   * rather than source order. Coral-on-coral would simply vanish.
   */
  tone?: Tone;
  href?: string;
  className?: string;
}) {
  const onColor = tone === "onColor";

  const cls = cn(
    "inline-flex items-center gap-2 font-display font-extrabold tracking-tight",
    "no-underline shrink-0",
    onColor ? "text-white" : "text-ink",
    TEXT[size],
    as === "link" && "hover:opacity-80 transition-opacity duration-150 ease-brand",
    className,
  );

  const inner = (
    <>
      {logo && (
        <img
          src="/mark.png"
          alt=""
          width={ICON[size]}
          height={ICON[size]}
          className="rounded-md shrink-0"
        />
      )}
      <span>
        {/* The two-tone wordmark survives on coral by dropping the second half
            in opacity instead of in hue — the coral half would be invisible. */}
        ASO<b className={cn("font-extrabold", onColor ? "text-white/70" : "text-accent")}>Grade</b>
      </span>
    </>
  );

  if (as === "span") return <span className={cls}>{inner}</span>;

  return (
    <Link className={cls} href={href} aria-label="ASOGrade home">
      {inner}
    </Link>
  );
}
