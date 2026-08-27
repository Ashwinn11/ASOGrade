import Link from "next/link";
import BrandMark from "./BrandMark";
import { cn } from "./cn";

/**
 * The site footer.
 *
 * There were four: the landing footer with columns, the flat legal-page footer,
 * the pSEO footer, and the workspace legend — no shared code, and the copyright
 * line had already drifted between copies of the pSEO one. This is the single
 * footer, rendered by the landing page, the legal pages, `PseoLayout` (so every
 * guide, glossary term, comparison, solution and storefront page), start and
 * billing — which is what keeps it consistent everywhere without a per-page
 * variant.
 *
 * Legal carries Support alongside Privacy and Terms; there is no FAQ column,
 * and no "Company" heading.
 *
 * Coral, full-bleed, and the last thing on the page — the copyright and the
 * Apple trademark notice included, which used to hang underneath on the page
 * background and read as a stray line that had fallen off the end.
 *
 * Not a `Card`: a Card is a rounded, bordered, shadowed object sitting *on* a
 * surface, and a footer that ends the document is the surface. It carries the
 * accent gradient directly instead — the same string `Card`'s `tone="accent"`
 * uses, character for character, so it resolves to a class Tailwind has already
 * generated rather than a near-identical second one. The horizontal inset lives
 * on the inner column, so the colour runs edge to edge while the content still
 * lines up with every other band on the page.
 */

const COLUMNS: { heading: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    heading: "Product",
    links: [
      { href: "/", label: "Keyword research" },
      { href: "/start", label: "Pricing" },
      { href: "/solutions", label: "Solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/guides", label: "ASO Guides" },
      { href: "/glossary", label: "ASO Glossary" },
      { href: "/keyword-research", label: "109 Storefronts" },
      { href: "/compare", label: "Compare approaches" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "mailto:support@asograde.com", label: "Support", external: true },
    ],
  },
];

/* One link style, so a mailto and a route cannot drift apart. */
const LINK =
  "min-w-0 text-sm text-white/80 no-underline transition-colors duration-150 hover:text-white";

export default function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-20 w-full min-w-0 text-white",
        "bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))]",
        className,
      )}
    >
      <div className="mx-auto w-[min(100%-1.5rem,72rem)] min-w-0 py-14">
        <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <div className="min-w-0">
            <BrandMark size="sm" tone="onColor" />
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/80">
              App Store keyword research that runs in the browser.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex min-w-0 flex-col gap-2.5">
              <h4 className="text-2xs font-bold uppercase tracking-[0.06em] text-white/60">
                {col.heading}
              </h4>
              {col.links.map((l) =>
                l.external ? (
                  <a key={l.href} href={l.href} className={cn(LINK, "[overflow-wrap:anywhere]")}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <div className="mt-10 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-6 text-xs text-white/70">
          <span>&copy; {new Date().getFullYear()} ASOGrade</span>
          <span className="min-w-0 sm:ml-auto">
            Not affiliated with Apple. App Store is a trademark of Apple Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
