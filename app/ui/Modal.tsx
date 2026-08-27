"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Close } from "../components/icons";
import Button from "./Button";
import { cn } from "./cn";

/**
 * The dialog.
 *
 * Replaces three shells — `.sheet`, `.ksheet` and `.spy` — which differed only
 * in width but had drifted apart on everything else: one had an Escape
 * handler and two did not, and the competitor panel had no `role="dialog"` or
 * `aria-modal` at all. Centralising it means those are not per-call-site
 * decisions any more.
 *
 * Also restores focus to whatever opened it, which none of the three did.
 *
 * Carries a soft coral wash at the top of the panel — the same accent used
 * behind the landing hero — so the light sheets read as part of the same
 * material as the warm dark cards in the workspace, rather than a plain white
 * box dropped on top of everything else.
 */

type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
  sm: "max-w-[392px]",
  md: "max-w-[560px]",
  lg: "max-w-[760px]",
};

export default function Modal({
  onClose,
  title,
  children,
  size = "sm",
  className,
  hideClose = false,
}: {
  onClose: () => void;
  /** Announced as the dialog's name. Pass the same text the heading shows. */
  title: string;
  children: ReactNode;
  size?: Size;
  className?: string;
  /** Set when the content renders its own close action — a `ModalHeader`'s
   *  coral bar carries one inline — so there is never a second, redundant
   *  corner button fighting it for the same job. */
  hideClose?: boolean;
}) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement;
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panel.current) return;

      // Keep focus inside while it is open; a dialog the keyboard can walk out
      // of behind the scrim is worse than no dialog.
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/45 p-4 animate-fadein"
      onClick={onClose}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative isolate w-full min-w-0 rounded-card border border-ink/20 bg-surface",
          "p-6 pt-8 shadow-3 animate-lift outline-none",
          SIZE[size],
          className,
        )}
      >
        {/* Only visible when nothing has covered it — a ModalHeader's opaque
            coral bar sits on top of this, which is expected. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 rounded-t-card bg-[radial-gradient(60%_100%_at_50%_0%,var(--color-tint-2),transparent)]"
        />

        {!hideClose && (
          <Button
            variant="icon"
            size="sm"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10"
          >
            <Close size={15} />
          </Button>
        )}

        <h2 id={titleId} className="sr-only">{title}</h2>
        {children}
      </div>
    </div>
  );
}
