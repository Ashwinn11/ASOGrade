import { Chevron } from "../components/icons";
import { cn } from "./cn";

/**
 * Question and answer list.
 *
 * There were three unrelated implementations of this: the static `<dl>` used
 * by five pSEO pages, the interactive accordion on the landing page, and a
 * third on the paywall built entirely from inline styles with no class names
 * at all. All three render the same content, and the same FAQ text is fed to
 * `faqSchema()` for the JSON-LD, so they had no reason to differ.
 *
 * Static by default. The landing page's accordion behaviour is available
 * through `collapsible`, which uses <details> so it needs no client JavaScript
 * and keeps the answers in the HTML for crawlers and AI citation.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export default function Faq({
  items,
  collapsible = false,
  className,
}: {
  items: FaqItem[];
  collapsible?: boolean;
  className?: string;
}) {
  if (!items.length) return null;

  if (collapsible) {
    return (
      <div className={cn("flex min-w-0 flex-col gap-2", className)}>
        {items.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className="group min-w-0 rounded-md border border-line bg-surface open:bg-sunken"
          >
            <summary
              className={cn(
                "flex min-w-0 cursor-pointer list-none items-start justify-between gap-3",
                "px-5 py-4 text-base font-semibold text-ink marker:hidden",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              <span className="min-w-0">{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-faint transition-transform duration-200 ease-brand group-open:rotate-180"
              >
                <Chevron size={13} />
              </span>
            </summary>
            <p className="min-w-0 px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    );
  }

  return (
    <dl className={cn("flex min-w-0 flex-col gap-3", className)}>
      {items.map((item) => (
        <div
          key={item.q}
          className="min-w-0 rounded-md border border-line bg-surface px-5 py-4"
        >
          <dt className="text-base font-semibold text-ink">{item.q}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
