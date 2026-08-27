import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * Long-form body copy: guides, glossary entries, legal pages.
 *
 * Styling flowed from five different container rules before (`.legal`,
 * `.pseo-body`, `.pseo-article`, `.rival-notes article`, and inline styles on
 * the paywall), so the same paragraph rendered at three sizes depending on
 * which page it landed in.
 */
export default function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 text-base leading-[1.75] text-ink-2",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink",
        "[&_p]:mb-4",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mb-2",
        "[&_b]:font-semibold [&_b]:text-ink [&_strong]:font-semibold [&_strong]:text-ink",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:[overflow-wrap:anywhere]",
        "[&_code]:rounded-sm [&_code]:bg-sunken [&_code]:px-1.5 [&_code]:py-0.5",
        "[&_code]:font-mono [&_code]:text-xs [&_code]:[overflow-wrap:anywhere]",
        className,
      )}
    >
      {children}
    </div>
  );
}
