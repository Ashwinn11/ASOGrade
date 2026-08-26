import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/seo/guides";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "App Store Keyword Research Guides | ASOGrade",
  description:
    "In-depth guides to App Store keyword research: low-competition strategies, difficulty evaluation, multi-storefront research, and competitor teardowns.",
  alternates: { canonical: "/guides" },
  openGraph: {
      images: [OG_IMAGE],
    title: "App Store Keyword Research Guides | ASOGrade",
    description:
      "In-depth guides to App Store keyword research — low-competition keyword strategies, difficulty evaluation, and multi-storefront research.",
    url: `${SITE_URL}/guides`,
    type: "website",
  },
};

export default function GuidesHub() {
  const collectionSchema = collectionPageSchema({
    title: "App Store Keyword Research Guides",
    description:
      "In-depth guides to App Store keyword research — strategy, tactics, and workflows for indie developers and ASO professionals.",
    url: `${SITE_URL}/guides`,
  });

  const crumbSchema = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Guides", url: `${SITE_URL}/guides` },
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
          <span aria-current="page">Guides</span>
        </nav>

        <div className="pseo-hero">
          <h1>App Store Keyword Research Guides</h1>
          <p className="pseo-lead">
            Practical guides to finding, evaluating, and acting on App Store
            keyword opportunities — written for indie developers and ASO
            practitioners who need real answers, not generic advice.
          </p>
        </div>

        <section className="pseo-section">
          <h2>In-depth guides</h2>
          <ul className="pseo-guide-list">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="pseo-guide-item">
                <Link href={`/guides/${guide.slug}`}>
                  <strong>{guide.title}</strong>
                  <span>{guide.description}</span>
                  <em>Read guide →</em>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="pseo-section">
          <h2>Essential ASO glossary concepts</h2>
          <p className="pseo-section-note">
            Master the underlying metrics and algorithmic factors covered in these guides:
          </p>
          <ul className="pseo-related-list pseo-related-cards">
            <li>
              <Link href="/glossary/keyword-popularity">
                <strong>Keyword Popularity (Pop)</strong>
                <span>0–100 search demand index derived from Apple Search Ads data.</span>
                <em>Read definition →</em>
              </Link>
            </li>
            <li>
              <Link href="/glossary/keyword-difficulty">
                <strong>Keyword Difficulty (Diff)</strong>
                <span>0–100 score estimating ranking barrier based on live top-ranking apps.</span>
                <em>Read definition →</em>
              </Link>
            </li>
            <li>
              <Link href="/glossary/apple-search-ads">
                <strong>Apple Search Ads Demand</strong>
                <span>How ASA demand signals reveal genuine search volume without download guesses.</span>
                <em>Read definition →</em>
              </Link>
            </li>
            <li>
              <Link href="/glossary/app-store-search-ranking-factors">
                <strong>Ranking Factors Hierarchy</strong>
                <span>Title vs. Subtitle vs. Keyword field weight allocation rules.</span>
                <em>Read definition →</em>
              </Link>
            </li>
            <li>
              <Link href="/glossary/localization-aso">
                <strong>ASO Localization</strong>
                <span>How local language metadata unlocks lower difficulty in international markets.</span>
                <em>Read definition →</em>
              </Link>
            </li>
            <li>
              <Link href="/glossary/competitor-teardown">
                <strong>Competitor Teardowns</strong>
                <span>How to reverse-engineer rival ranking footprints to discover keyword gaps.</span>
                <em>Read definition →</em>
              </Link>
            </li>
          </ul>
          <Link href="/glossary" className="pseo-link-more">
            Browse all 26 glossary definitions →
          </Link>
        </section>

        <section className="pseo-section">
          <h2>Storefront keyword research</h2>
          <p className="pseo-section-note">
            Keyword difficulty varies significantly by country. Explore market guides for the top App Store storefronts:
          </p>
          <ul className="pseo-related-list">
            <li><Link href="/keyword-research/us">🇺🇸 United States (US) →</Link></li>
            <li><Link href="/keyword-research/gb">🇬🇧 United Kingdom (GB) →</Link></li>
            <li><Link href="/keyword-research/ca">🇨🇦 Canada (CA) →</Link></li>
            <li><Link href="/keyword-research/au">🇦🇺 Australia (AU) →</Link></li>
            <li><Link href="/keyword-research/de">🇩🇪 Germany (DE) →</Link></li>
            <li><Link href="/keyword-research/fr">🇫🇷 France (FR) →</Link></li>
            <li><Link href="/keyword-research/jp">🇯🇵 Japan (JP) →</Link></li>
            <li><Link href="/keyword-research/br">🇧🇷 Brazil (BR) →</Link></li>
          </ul>
          <Link href="/keyword-research" className="pseo-link-more">
            View all 109 storefront guides →
          </Link>
        </section>

        <section className="pseo-section pseo-cta-section">
          <h2>Ready to research keywords?</h2>
          <p>
            Score App Store keywords by popularity and difficulty across 109
            storefronts — apply everything in these guides with real data.
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
