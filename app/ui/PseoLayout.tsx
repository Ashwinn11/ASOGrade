import type { ReactNode } from "react";
import Breadcrumb, { type Crumb } from "./Breadcrumb";
import Button from "./Button";
import JsonLd from "./JsonLd";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/**
 * The shell every pSEO content page shares.
 *
 * Header, breadcrumb, closing call to action, footer and structured data were
 * written out by hand in all ten files — about 633 of their 2,559 lines. The
 * copies had already drifted: three detail pages carried byte-identical nav
 * sets while a fourth relabelled a link and a fifth added one, and the
 * copyright line wrapped differently in one file than the other nine.
 */

export default function PseoLayout({
  trail,
  schema,
  children,
  cta,
  current,
}: {
  trail: Crumb[];
  schema: object | object[];
  children: ReactNode;
  cta?: { heading: string; body: string; label?: string };
  /** The section this page belongs to, so the nav drops its own link. */
  current?: string;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <JsonLd data={schema} />
      <SiteHeader current={current} />

      <main className="mx-auto mt-8 w-[min(100%-1.5rem,60rem)] min-w-0 flex-1">
        <Breadcrumb trail={trail} className="mb-6" />
        {children}

        {cta && (
          <section className="mt-14 rounded-card border border-transparent bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] px-6 py-10 text-center text-white sm:px-10">
            <h2 className="font-display text-2xl font-extrabold leading-tight">{cta.heading}</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-base leading-relaxed text-white/85">
              {cta.body}
            </p>
            <Button href="/onboarding" size="lg" variant="inverse" className="mt-6">
              {cta.label ?? "Get started"} <span aria-hidden="true">→</span>
            </Button>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
