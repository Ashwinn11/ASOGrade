import type { Metadata } from "next";
import Link from "next/link";
import { STORES, POPULAR } from "@/lib/types";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "App Store Keyword Research by Storefront — All 109 Markets | ASOGrade",
  description:
    "App Store keyword research guides for all 109 storefronts. Find out which markets have the best demand-to-difficulty ratio for your category — from the US to emerging markets.",
  alternates: { canonical: "/keyword-research" },
  openGraph: {
    title: "App Store Keyword Research by Storefront — All 109 Markets | ASOGrade",
    description:
      "App Store keyword research guides for all 109 storefronts. Find out which markets have the best demand-to-difficulty ratio for your category.",
    url: `${SITE_URL}/keyword-research`,
    type: "website",
  },
};

// Group stores: popular first, then remaining alphabetically by name
const popularSet = new Set(POPULAR);
const popularStores = STORES.filter(([code]) => popularSet.has(code));
const otherStores = STORES.filter(([code]) => !popularSet.has(code));

export default function KeywordResearchHub() {
  const collectionSchema = collectionPageSchema({
    title: "App Store Keyword Research by Storefront",
    description:
      "App Store keyword research guides for all 109 storefronts, covering market tier, primary language, and keyword strategy for each market.",
    url: `${SITE_URL}/keyword-research`,
  });

  const crumbSchema = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Keyword Research by Storefront", url: `${SITE_URL}/keyword-research` },
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
          <Link href="/glossary">Glossary</Link>
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
          <span aria-current="page">Keyword Research by Storefront</span>
        </nav>

        <div className="pseo-hero">
          <h1>App Store Keyword Research by Storefront</h1>
          <p className="pseo-lead">
            The App Store is 109 separate markets, each with its own keyword
            demand and ranking difficulty. Find the storefronts where your
            target keywords are most accessible — and where localization delivers
            the best return.
          </p>
        </div>

        <section className="pseo-section">
          <h2>Major storefronts</h2>
          <p className="pseo-section-note">
            The {POPULAR.length} markets most apps target first — highest search
            volume, highest competition.
          </p>
          <ul className="pseo-store-grid">
            {popularStores.map(([code, name]) => (
              <li key={code}>
                <Link href={`/keyword-research/${code}`}>
                  <span className="pseo-store-flag">
                    {code.length === 2
                      ? String.fromCodePoint(
                          ...[...code.toLowerCase()].map(
                            (ch) => 0x1f1e6 + ch.charCodeAt(0) - 97
                          )
                        )
                      : ""}
                  </span>
                  <span className="pseo-store-name">{name}</span>
                  <span className="pseo-store-code">{code.toUpperCase()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section">
          <h2>All other storefronts</h2>
          <p className="pseo-section-note">
            Mid-tier and emerging markets — often dramatically lower keyword
            difficulty for the same search intent.
          </p>
          <ul className="pseo-store-grid">
            {otherStores.map(([code, name]) => (
              <li key={code}>
                <Link href={`/keyword-research/${code}`}>
                  <span className="pseo-store-flag">
                    {code.length === 2
                      ? String.fromCodePoint(
                          ...[...code.toLowerCase()].map(
                            (ch) => 0x1f1e6 + ch.charCodeAt(0) - 97
                          )
                        )
                      : ""}
                  </span>
                  <span className="pseo-store-name">{name}</span>
                  <span className="pseo-store-code">{code.toUpperCase()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section pseo-cta-section">
          <h2>Research keywords across all 109 storefronts</h2>
          <p>
            Score any keyword for popularity and difficulty in any storefront.
            Paste 100 ideas and read the numbers — no install required.
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
          © {new Date().getFullYear()} ASOGrade · Not affiliated with Apple Inc.
          App Store is a trademark of Apple Inc.
        </p>
      </footer>
    </div>
  );
}
