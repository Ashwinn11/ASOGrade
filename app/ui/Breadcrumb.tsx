import Link from "next/link";
import { cn } from "./cn";

/**
 * Trail to the current page. The last entry is the page itself and is not a
 * link. Written out ten times before, in two- and three-level variants.
 *
 * Wraps rather than overflowing: the deepest trail ends in a storefront name,
 * and those run to "Federated States of Micronesia".
 */

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  trail,
  className,
}: {
  trail: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted", className)}
    >
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <span key={crumb.label} className="flex min-w-0 items-center gap-x-1.5">
            {i > 0 && <span aria-hidden="true" className="text-faint">/</span>}
            {last || !crumb.href ? (
              <span aria-current="page" className="min-w-0 text-ink-2">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                /* Every one of the 300+ pSEO pages renders this trail, and its
                   "ASOGrade" crumb always points at "/" — that single Link,
                   multiplied across every page, was the largest source of
                   prefetch requests to the homepage in runtime logs. A
                   breadcrumb is rarely someone's actual next click. */
                prefetch={false}
                className="min-w-0 text-muted no-underline hover:text-accent transition-colors duration-150"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
