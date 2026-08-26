import type { Metadata } from "next";
import Link from "next/link";
import { STRUGGLE_FIX } from "@/app/start/solutions";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "ASO Solutions for Common Keyword Challenges | ASOGrade",
  description:
    "Solutions to common App Store keyword problems: finding ideas, identifying winnable terms, competitor research, international markets, speed, and cost.",
  alternates: { canonical: "/solutions" },
  openGraph: {
      images: [OG_IMAGE],
    title: "ASO Solutions for Common Keyword Challenges | ASOGrade",
    description:
      "Solutions to common App Store keyword problems: finding ideas, winnable terms, competitor teardowns, localization, speed, and pricing.",
    url: `${SITE_URL}/solutions`,
    type: "website",
  },
};

export const SOLUTION_PAGES = [
  {
    slug: "finding-keyword-ideas",
    key: "ideas",
    title: "Finding Keywords Worth Targeting",
    problem: STRUGGLE_FIX.ideas.problem,
    fix: STRUGGLE_FIX.ideas.fix,
    proof: STRUGGLE_FIX.ideas.proof,
  },
  {
    slug: "winnable-keywords",
    key: "winnable",
    title: "Knowing Which Keywords You Can Actually Rank For",
    problem: STRUGGLE_FIX.winnable.problem,
    fix: STRUGGLE_FIX.winnable.fix,
    proof: STRUGGLE_FIX.winnable.proof,
  },
  {
    slug: "competitor-keywords",
    key: "competitors",
    title: "Seeing What Your Competitors Rank For",
    problem: STRUGGLE_FIX.competitors.problem,
    fix: STRUGGLE_FIX.competitors.fix,
    proof: STRUGGLE_FIX.competitors.proof,
  },
  {
    slug: "international-markets",
    key: "markets",
    title: "Deciding Which Countries and Storefronts to Target",
    problem: STRUGGLE_FIX.markets.problem,
    fix: STRUGGLE_FIX.markets.fix,
    proof: STRUGGLE_FIX.markets.proof,
  },
  {
    slug: "research-time",
    key: "time",
    title: "Cutting the Time Spent on Keyword Research",
    problem: STRUGGLE_FIX.time.problem,
    fix: STRUGGLE_FIX.time.fix,
    proof: STRUGGLE_FIX.time.proof,
  },
  {
    slug: "tool-cost",
    key: "cost",
    title: "Affordable App Store Keyword Research Without Enterprise Pricing",
    problem: STRUGGLE_FIX.cost.problem,
    fix: STRUGGLE_FIX.cost.fix,
    proof: STRUGGLE_FIX.cost.proof,
  },
];

export default function SolutionsHub() {
  const collectionSchema = collectionPageSchema({
    title: "ASO Solutions for Common Keyword Challenges",
    description:
      "Solutions to the six most common App Store keyword research struggles indie developers and small studios face.",
    url: `${SITE_URL}/solutions`,
  });

  const crumbSchema = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Solutions", url: `${SITE_URL}/solutions` },
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
          <Link href="/compare">Compare</Link>
          <Link href="/start" className="pseo-cta-link">
            Get started →
          </Link>
        </nav>
      </header>

      <main className="pseo-main">
        <nav className="pseo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">ASOGrade</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Solutions</span>
        </nav>

        <div className="pseo-hero">
          <h1>App Store Keyword Solutions</h1>
          <p className="pseo-lead">
            Specific fixes for the exact problems developers encounter when
            researching App Store keywords — from candidate ideation to
            international storefront expansion.
          </p>
        </div>

        <section className="pseo-section">
          <ul className="pseo-solutions-grid">
            {SOLUTION_PAGES.map((page) => (
              <li key={page.slug} className="pseo-solution-card">
                <Link href={`/solutions/${page.slug}`}>
                  <span className="pseo-proof-badge">{page.proof}</span>
                  <strong>{page.title}</strong>
                  <p className="pseo-problem-statement">
                    <strong>Challenge:</strong> {page.problem}
                  </p>
                  <p className="pseo-solution-statement">
                    <strong>Fix:</strong> {page.fix}
                  </p>
                  <span className="pseo-read-more">Learn more →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section pseo-cta-section">
          <h2>Fix your keyword workflow today</h2>
          <p>
            Paste 100 raw ideas in one go and get Apple Search Ads demand and
            ranking difficulty in seconds.
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
