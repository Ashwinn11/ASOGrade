import Link from "next/link";
import BrandMark from "./BrandMark";
import { cn } from "./cn";

/**
 * The site footer.
 *
 * There were four: the landing footer with columns, the flat legal-page
 * footer, the pSEO footer, and the workspace legend — no shared code, and the
 * copyright line had already drifted between copies of the pSEO one.
 *
 * Legal carries Support alongside Privacy and Terms; there is no FAQ column,
 * and no "Company" heading.
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

export default function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mx-auto mt-20 w-[min(100%-1.5rem,72rem)] min-w-0 border-t border-line pt-10 pb-14",
        className,
      )}
    >
      <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <BrandMark size="sm" />
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
            App Store keyword research that runs in the browser.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex min-w-0 flex-col gap-2.5">
            <h4 className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">
              {col.heading}
            </h4>
            {col.links.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  className="min-w-0 text-sm text-muted no-underline [overflow-wrap:anywhere] hover:text-accent transition-colors duration-150"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="min-w-0 text-sm text-muted no-underline hover:text-accent transition-colors duration-150"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        ))}
      </div>

      <div className="mt-10 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-faint">
        <span>&copy; {new Date().getFullYear()} ASOGrade</span>
        <span className="min-w-0 sm:ml-auto">
          Not affiliated with Apple. App Store is a trademark of Apple Inc.
        </span>
      </div>
    </footer>
  );
}
