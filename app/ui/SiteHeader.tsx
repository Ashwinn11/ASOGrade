import Link from "next/link";
import type { ReactNode } from "react";
import BrandMark from "./BrandMark";
import { cn } from "./cn";

/**
 * The site header — one header for the whole site, not a marketing-page
 * special case with every content page reaching for its own copy.
 *
 * Three nav systems existed before this — `.landing-nav`, `.pseo-nav` and the
 * workspace `.top` — and the pSEO one was hand-written into all ten content
 * pages with the link set drifting between them. A `variant` prop briefly
 * kept a second, floating "pill" style around for content pages while only
 * the landing page got the sticky glass bar; that was the wrong split — this
 * is the one header, used everywhere, full-width and fixed to the top on
 * scroll.
 *
 * Glassmorphism proper: a translucent, saturated, heavily-blurred fill, not
 * a near-opaque background with a hint of blur — content scrolling underneath
 * should visibly show through, tinted and softened.
 *
 * The wrapping behaviour below is the fix for the bug that started this
 * migration: the old `.landing-nav` was a three-track grid whose action slot
 * could not shrink, so a signed-in visitor's "Open your workspace" button
 * escaped the nav pill by 170px at narrow widths. Here the row wraps, the
 * brand never shrinks, and the link list is allowed to drop to its own line —
 * so there is no width at which a child has to paint outside the parent.
 */

export interface NavLink {
  href: string;
  label: string;
}

export const SITE_NAV: NavLink[] = [
  { href: "/keyword-research", label: "Storefronts" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/compare", label: "Compare" },
  { href: "/solutions", label: "Solutions" },
];

export default function SiteHeader({
  links = SITE_NAV,
  /** Marks the current section so its own link is not offered. */
  current,
  actions,
  className,
}: {
  links?: NavLink[];
  current?: string;
  actions?: ReactNode;
  className?: string;
}) {
  const shown = current ? links.filter((l) => l.href !== current) : links;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-white/40 bg-surface/55",
        "backdrop-blur-xl backdrop-saturate-150 shadow-1",
        className,
      )}
    >
      <div
        className={cn(
          // Edge to edge, not centred in a max-width column: the brand sits
          // at the actual left edge of the viewport and the CTA at the
          // actual right edge, the way most product headers do it.
          "flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-6",
        )}
      >
        <BrandMark size="sm" />

        {shown.length > 0 && (
          <nav
            aria-label="Primary"
            className={cn(
              // Its own row until there is room to share one. `min-w-0` lets the
              // box shrink but the link text keeps its own min-content width, so
              // shrinking alone still overflowed — the row break is the fix.
              // gap-x-8 rather than gap-x-4 above md: a tight cluster of five
              // short links centred in a full-width bar reads as a small
              // island with two large stretches of dead space on either side
              // of it — spreading the links out uses more of that width
              // instead of leaving it empty.
              // justify-center is unqualified, not md-only. Below md this nav is
              // `w-full order-last` — a row of its own under the brand — and
              // with centring applied only from md up it fell back to
              // flex-start there, leaving the links hard against the left edge
              // while the brand and the CTA sat on the full-width row above.
              "order-last flex w-full min-w-0 flex-wrap items-center justify-center gap-x-4 gap-y-1.5",
              "md:order-none md:w-auto md:flex-1 md:gap-x-8",
            )}
          >
            {shown.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink no-underline transition-colors duration-150 hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {actions && <div className="ml-auto flex min-w-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
