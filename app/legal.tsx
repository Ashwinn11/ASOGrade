import Link from "next/link";
import type { ReactNode } from "react";

/** Shared shell for the privacy and terms pages: brand home, prose, footer. */
export default function Legal({ title, updated, children }:
  { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="page landing legal-page">
      <div className="land-bg" aria-hidden="true" />

      <header className="landing-nav">
        <Link className="brand-mark" href="/" aria-label="ASOGrade home">
          <img src="/mark.png" alt="" width={26} height={26} />
          <span>ASO<b>Grade</b></span>
        </Link>
        <span className="sp" />
        <div className="nav-actions">
          <Link className="btn primary" href="/">Back to ASOGrade</Link>
        </div>
      </header>

      <main className="legal">
        <h1>{title}</h1>
        <p className="legal-updated">Last updated {updated}</p>
        {children}
      </main>

      <footer className="foot">
        <div className="foot-base only">
          <Link className="brand-mark" href="/" aria-label="ASOGrade home">
            <img src="/mark.png" alt="" width={22} height={22} />
            <span>ASO<b>Grade</b></span>
          </Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:support@asograde.com">Support</a>
          <span className="fine">Not affiliated with Apple. App Store is a trademark of Apple Inc.</span>
        </div>
      </footer>
    </div>
  );
}
