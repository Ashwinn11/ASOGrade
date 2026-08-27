import type { ReactNode } from "react";
import { Kicker } from "./Pill";
import { cn } from "./cn";

/**
 * Page hero and content section.
 *
 * The heading + lead pairing was written out on every content page with its
 * own sizes, and the uppercase label above it went by four different class
 * names. Both live here so a page describes what it says, not how it looks.
 */

export function PageHero({
  kicker,
  title,
  lead,
  badges,
  className,
}: {
  kicker?: string;
  title: string;
  lead?: ReactNode;
  badges?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      {badges && <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">{badges}</div>}
      {kicker && <Kicker className="mb-3">{kicker}</Kicker>}
      {/* break-words, not `anywhere`: a heading should break a word only when
          the word alone cannot fit, never to tighten the line. */}
      <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink break-words sm:text-4xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-4 max-w-[62ch] text-md leading-relaxed text-muted">{lead}</p>
      )}
    </div>
  );
}

export default function Section({
  title,
  note,
  children,
  className,
}: {
  title?: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-12 min-w-0", className)}>
      {title && (
        <h2 className="font-display text-xl font-extrabold leading-tight text-ink">{title}</h2>
      )}
      {note && <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted">{note}</p>}
      <div className={cn("min-w-0", Boolean(title || note) && "mt-5")}>{children}</div>
    </section>
  );
}
