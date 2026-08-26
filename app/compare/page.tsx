import type { Metadata } from "next";
import Link from "next/link";
import { MATURITY_LINE, MATURITY_NOTE } from "@/app/start/solutions";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "ASOGrade vs. Other ASO Approaches — Compare | ASOGrade",
  description:
    "How ASOGrade compares to guessing on instinct, DIY spreadsheets, full ASO suites, and agencies — honest category-level comparisons, no inflated competitor claims.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "ASOGrade vs. Other ASO Approaches — Compare | ASOGrade",
    description:
      "How ASOGrade compares to guessing on instinct, DIY spreadsheets, full ASO suites, and agencies.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
};

const COMPARE_PAGES = [
  {
    slug: "guessing",
    key: "guess",
    title: "ASOGrade vs. Guessing on Instinct",
    tagline: MATURITY_LINE.guess,
    note: MATURITY_NOTE.guess,
  },
  {
    slug: "spreadsheets",
    key: "sheet",
    title: "ASOGrade vs. DIY Spreadsheets",
    tagline: MATURITY_LINE.sheet,
    note: MATURITY_NOTE.sheet,
  },
  {
    slug: "aso-suites",
    key: "tool",
    title: "ASOGrade vs. Full ASO Suites",
    tagline: MATURITY_LINE.tool,
    note: MATURITY_NOTE.tool,
  },
  {
    slug: "agencies",
    key: "agency",
    title: "ASOGrade vs. Hiring an Agency",
    tagline: MATURITY_LINE.agency,
    note: MATURITY_NOTE.agency,
  },
];

export default function CompareHub() {
  const collectionSchema = collectionPageSchema({
    title: "ASOGrade vs. Other ASO Approaches",
    description:
      "How ASOGrade compares to different approaches to App Store keyword research — instinct, spreadsheets, full suites, and agencies.",
    url: `${SITE_URL}/compare`,
  });

  const crumbSchema = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Compare", url: `${SITE_URL}/compare` },
  ]);

  return (
    <div className="pseo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }}
      />

      <header className="pseo-header">
        <nav className="pseo-nav" aria-label="Site">
          <Link className="pseo-brand" href="/">
            ASO<b>Grade</b>
          </Link>
          <Link href="/keyword-research">Keyword Research</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/start" className="pseo-cta-link">
            Get started →
          </Link>
        </nav>
      </header>

      <main className="pseo-main">
        <nav className="pseo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">ASOGrade</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Compare</span>
        </nav>

        <div className="pseo-hero">
          <h1>ASOGrade vs. Other ASO Approaches</h1>
          <p className="pseo-lead">
            Honest, category-level comparisons between ASOGrade and the
            alternatives — no made-up competitor claims, just a clear read on
            what each approach actually delivers.
          </p>
        </div>

        <section className="pseo-section">
          <ul className="pseo-compare-grid">
            {COMPARE_PAGES.map((page) => (
              <li key={page.slug} className="pseo-compare-card">
                <Link href={`/compare/${page.slug}`}>
                  <strong>{page.title}</strong>
                  <em className="pseo-tagline">{page.tagline}</em>
                  <span>{page.note}</span>
                  <span className="pseo-read-more">Read comparison →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section pseo-cta-section">
          <h2>See the difference in practice</h2>
          <p>
            Paste 100 keyword ideas and get popularity, difficulty, and competing
            app count in seconds — no spreadsheet, no agency, no guesswork.
          </p>
          <Link href="/start" className="pseo-btn-primary">
            Get started →
          </Link>
        </section>
      </main>

      <footer className="pseo-footer">
        <div className="pseo-footer-links">
          <Link href="/">Home</Link>
          <Link href="/keyword-research">Keyword Research</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <p className="pseo-footer-copy">
          © {new Date().getFullYear()} ASOGrade · Not affiliated with Apple
          Inc. App Store is a trademark of Apple Inc.
        </p>
      </footer>
    </div>
  );
}
