import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/lib/seo/glossary";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "ASO Glossary: App Store Optimization Terms Defined | ASOGrade",
  description:
    "Clear definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "ASO Glossary: App Store Optimization Terms Defined | ASOGrade",
    description:
      "Clear definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, and more.",
    url: `${SITE_URL}/glossary`,
    type: "website",
  },
};

// Sort alphabetically by term
const sortedGlossary = [...GLOSSARY].sort((a, b) =>
  a.term.localeCompare(b.term)
);

export default function GlossaryHub() {
  const collectionSchema = collectionPageSchema({
    title: "ASO Glossary",
    description:
      "Definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
    url: `${SITE_URL}/glossary`,
  });

  const crumbSchema = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
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
          <Link href="/guides">Guides</Link>
          <Link href="/compare">Compare</Link>
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
          <span aria-current="page">ASO Glossary</span>
        </nav>

        <div className="pseo-hero">
          <h1>App Store Optimization Glossary</h1>
          <p className="pseo-lead">
            Clear definitions of every term that matters in App Store keyword
            research — from keyword popularity and difficulty to storefronts,
            metadata fields, and competitor teardowns.
          </p>
        </div>

        <section className="pseo-section">
          <h2>All glossary terms</h2>
          <ul className="pseo-glossary-grid">
            {sortedGlossary.map((entry) => (
              <li key={entry.slug} className="pseo-glossary-item">
                <Link href={`/glossary/${entry.slug}`}>
                  <strong>{entry.term}</strong>
                  <span>{entry.definition}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section">
          <h2>Practical guides applying these concepts</h2>
          <p className="pseo-section-note">
            Ready to apply these definitions to real keyword research workflows? Read our in-depth guides:
          </p>
          <ul className="pseo-related-list pseo-related-cards">
            <li>
              <Link href="/guides/low-competition-app-store-keywords">
                <strong>Finding Low-Competition Keywords</strong>
                <span>Step-by-step framework to find high-demand, accessible keyword opportunities.</span>
                <em>Read guide →</em>
              </Link>
            </li>
            <li>
              <Link href="/guides/app-store-keyword-research-workflow">
                <strong>End-to-End Research Workflow</strong>
                <span>From raw ideation to scoring, filtering, and final metadata deployment.</span>
                <em>Read guide →</em>
              </Link>
            </li>
            <li>
              <Link href="/guides/evaluate-keyword-difficulty">
                <strong>Evaluating Keyword Difficulty</strong>
                <span>How to read live ranking sets and calibrate difficulty to your app authority.</span>
                <em>Read guide →</em>
              </Link>
            </li>
            <li>
              <Link href="/guides/multi-storefront-keyword-research">
                <strong>Multi-Storefront Research</strong>
                <span>How to uncover lower competition across 109 App Store markets.</span>
                <em>Read guide →</em>
              </Link>
            </li>
          </ul>
          <Link href="/guides" className="pseo-link-more">
            Browse all in-depth ASO guides →
          </Link>
        </section>

        <section className="pseo-section pseo-cta-section">
          <h2>Put the definitions to work</h2>
          <p>
            Score App Store keywords by popularity and difficulty across 109
            storefronts — the two numbers behind every definition in this
            glossary.
          </p>
          <Link href="/start" className="pseo-btn-primary">
            Start keyword research →
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
