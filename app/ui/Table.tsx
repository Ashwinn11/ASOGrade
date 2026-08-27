import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * A comparison table.
 *
 * Replaces the one on the compare hub that was built from 35 inline style
 * props — `padding: "12px 16px"` alone was repeated 25 times in a single
 * block — and the class-based twin on the landing page that rendered the same
 * concept from `.compare-table`.
 *
 * The scroller is part of the component, not an optional wrapper. A table is
 * the one thing that legitimately cannot shrink to a phone, so it gets a real
 * horizontal scroll container; the old CSS gave six wide containers
 * `overflow: hidden` instead, which clipped content with no way to reach it.
 */

export default function Table({
  head,
  rows,
  highlightLast = false,
  caption,
  className,
}: {
  head: string[];
  rows: ReactNode[][];
  /** Marks the final row as the recommended option. */
  highlightLast?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 overflow-x-auto rounded-md border border-line", className)}>
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-line bg-sunken">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-2xs font-bold uppercase tracking-[0.06em] text-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const best = highlightLast && i === rows.length - 1;
            return (
              <tr
                key={i}
                className={cn(
                  "border-b border-line last:border-b-0",
                  best ? "bg-tint" : "bg-surface",
                )}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      "px-4 py-3 align-top leading-relaxed",
                      j === 0 && "font-semibold text-ink",
                      j > 0 && (best ? "font-semibold text-accent-2" : "text-muted"),
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
