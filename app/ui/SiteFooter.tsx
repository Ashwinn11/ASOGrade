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
      { href: "/pricing", label: "Pricing" },
      { href: "/solutions", label: "Solutions" },
      { href: "/for", label: "By role" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/guides", label: "ASO Guides" },
      { href: "/glossary", label: "ASO Glossary" },
      { href: "/tips", label: "Quick answers" },
      { href: "/keyword-research", label: "109 Storefronts" },
      { href: "/localization", label: "By language" },
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
                  /* prefetch={false}: this footer renders on every page site-wide
                     (landing, legal, and every pSEO template), so its ~13 links
                     were firing a full-viewport prefetch burst on every single
                     pageview — visible in Vercel's runtime logs as a dozen
                     simultaneous hub-page hits per visit. None of these are a
                     likely very-next-click, so it's not worth prefetching. */
                  <Link key={l.href} href={l.href} prefetch={false} className={LINK}>
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        {/* ScrollLaunch, SaaSFame, SaaS Roots, Confetti SaaS, and CurlShip all
            verify a free listing (or, for Confetti/CurlShip, a dofollow link
            specifically — the listing itself is already live either way) by
            fetching this page and looking for their badge, so all five have to
            stay on the homepage rather than move to a press page later.
            CurlShip's check runs hourly via cron rather than on submit; its
            /badge page has a manual "verify now" trigger if that matters later.
            Plain <a>/<img>: each image is served from the directory's own
            domain, which next/image would need configured as a remote pattern
            for no benefit at this size. */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://www.scrolllaunch.com/products/asograde?ref=badge"
            target="_blank"
            rel="noopener"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.scrolllaunch.com/api/badge/asograde"
              alt="Featured on ScrollLaunch"
              width={220}
              height={48}
              loading="lazy"
            />
          </a>
          <a
            href="https://saasfame.com/item/asograde"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://saasfame.com/badge-light.svg"
              alt="Featured on saasfame.com"
              style={{ height: 54, width: "auto" }}
              loading="lazy"
            />
          </a>
          <a
            target="_blank"
            href="https://saasroots.com/product/asograde"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://saasroots.com/assets/images/badge.png"
              alt="SaaS Roots"
              height={54}
              loading="lazy"
            />
          </a>
          <a
            href="https://confettisaas.com/saas/asograde-com?ref=badge"
            target="_blank"
            rel="noopener"
            aria-label="View ASOGrade on ConfettiSaaS"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://confettisaas.com/badge-light.svg"
              width={250}
              height={54}
              alt="ASOGrade on ConfettiSaaS"
              loading="lazy"
              style={{ display: "block" }}
            />
          </a>
          <a href="https://curlship.com" target="_blank" rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://curlship.com/badge.svg"
              alt="Listed on CurlShip"
              width={120}
              height={20}
              loading="lazy"
            />
          </a>
        </div>

        <div className="mt-8 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-6 text-xs text-white/70">
          <span>&copy; {new Date().getFullYear()} ASOGrade</span>
          <span className="min-w-0 sm:ml-auto">
            Not affiliated with Apple. App Store is a trademark of Apple Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
