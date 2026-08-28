import Link from "next/link";
import { cn } from "./cn";

/**
 * A link with a title, a line of context, and a call to action.
 *
 * The same `<strong>/<span>/<em>` triple was styled under five names —
 * `pseo-related-cards`, `pseo-guide-item`, `pseo-glossary-item`,
 * `pseo-compare-card`, `pseo-solution-card` — and in four of the five hub
 * pages every card was hand-written as a literal `<li>` rather than mapped
 * from an array, which is how the copy drifted between pages.
 */

export interface LinkCardItem {
  href: string;
  title: string;
  note?: string;
  cta?: string;
  badge?: string;
}

export function LinkCardGrid({
  items,
  min = 260,
  className,
  prefetch,
}: {
  items: LinkCardItem[];
  /** Track floor. Wrapped in min(…, 100%) so it can never exceed the container. */
  min?: number;
  className?: string;
  /**
   * Pass `false` on grids with dozens of items (glossary's 66, tips' 55,
   * every storefront's 109) — Next.js prefetches every visible `<Link>` by
   * default, so a single hub-page scroll was quietly firing that many
   * background requests. Leave unset on small "related content" grids
   * (2-6 items), where prefetch is cheap and the next click is likely.
   */
  prefetch?: boolean;
}) {
  return (
    <ul
      className={cn("grid list-none gap-3", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` }}
    >
      {items.map((item) => (
        <LinkCard key={item.href} prefetch={prefetch} {...item} />
      ))}
    </ul>
  );
}

export default function LinkCard({ href, title, note, cta, badge, prefetch }: LinkCardItem & { prefetch?: boolean }) {
  return (
    <li className="min-w-0 list-none">
      <Link
        href={href}
        prefetch={prefetch}
        className={cn(
          "group flex h-full min-w-0 flex-col gap-1.5 rounded-md border border-line",
          "bg-surface px-5 py-4 no-underline transition-colors duration-150 ease-brand",
          "hover:border-tint-line hover:bg-hover",
        )}
      >
        <strong className="min-w-0 text-base font-semibold text-ink break-words">
          {title}
        </strong>
        {note && <span className="min-w-0 text-sm leading-relaxed text-muted">{note}</span>}
        {badge && (
          <span className="mt-1 text-2xs font-bold uppercase tracking-[0.06em] text-faint">
            {badge}
          </span>
        )}
        {cta && (
          <em className="mt-auto pt-2 text-sm font-semibold not-italic text-accent">
            {cta} <span aria-hidden="true">→</span>
          </em>
        )}
      </Link>
    </li>
  );
}
