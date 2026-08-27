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

const TEXT: Record<Size, string> = {
  sm: "text-lg",
  md: "text-xl",
};

const ICON: Record<Size, number> = { sm: 22, md: 26 };

export default function BrandMark({
  size = "md",
  as = "link",
  logo = true,
  href = "/",
  className,
}: {
  size?: Size;
  as?: "link" | "span";
  /** The pSEO nav used a text-only mark; everywhere else carries the icon. */
  logo?: boolean;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 font-display font-extrabold tracking-tight",
    "text-ink no-underline shrink-0",
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
        ASO<b className="text-accent font-extrabold">Grade</b>
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
