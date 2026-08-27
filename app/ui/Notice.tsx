import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * Inline status: information, work in progress, or an error.
 *
 * Nine banners across four files were built from `.notice`, `.notice.working`
 * and `.error` with no shared markup. Error text is frequently a raw message
 * from Supabase or Dodo and can carry a URL, so the body breaks anywhere —
 * that class of unbreakable string had no wrap control anywhere in the old CSS.
 */

type Tone = "info" | "working" | "error";

const TONE: Record<Tone, string> = {
  info: "bg-sunken border-line text-ink-2",
  working: "bg-tint border-tint-line text-accent-2",
  error: "bg-red/10 border-red/35 text-[#a8442f]",
};

export default function Notice({
  children,
  tone = "info",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex min-w-0 items-start gap-2.5 rounded-md border px-4 py-3",
        "text-sm leading-relaxed [overflow-wrap:anywhere]",
        TONE[tone],
        className,
      )}
    >
      {tone === "working" && (
        <span
          aria-hidden="true"
          className="mt-0.5 size-3.5 shrink-0 rounded-full border-2 border-tint-line border-t-accent animate-spin-slow"
        />
      )}
      <span className="min-w-0">{children}</span>
    </div>
  );
}
