import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORES, POPULAR, flagOf } from "@/lib/types";
import { STORE_INFO } from "@/lib/seo/countries";
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

interface Props {
  params: Promise<{ store: string }>;
}

export async function generateStaticParams() {
  return STORES.map(([code]) => ({ store: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { store } = await params;
  const info = STORE_INFO[store];
  const [, name] = STORES.find(([code]) => code === store) ?? [];
  if (!name) return {};

  const tierLabel = info?.tier === "major"
    ? "major"
    : info?.tier === "mid"
    ? "mid-tier"
    : "emerging";

  const title = `App Store Keyword Research: ${name} (${store.toUpperCase()}) | ASOGrade`;
  const description = info
    ? `${info.facts[0]} Research App Store keywords in the ${name} storefront — popularity, difficulty, and strategy for a ${tierLabel} market.`
    : `App Store keyword research guide for the ${name} (${store.toUpperCase()}) storefront — demand, difficulty, and localization strategy.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `/keyword-research/${store}` },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/keyword-research/${store}`,
      type: "article",
    },
  };
}

export default async function StorefrontPage({ params }: Props) {
  const { store } = await params;
  const storeEntry = STORES.find(([code]) => code === store);
  if (!storeEntry) notFound();

  const [code, name] = storeEntry;
  const info = STORE_INFO[code];
  const isMajor = POPULAR.includes(code);
  const flag = flagOf(code);

  const tierLabel = info?.tier === "major"
    ? "Major market"
    : info?.tier === "mid"
    ? "Mid-tier market"
    : "Emerging market";

  const faqItems = info
    ? [
        {
          q: `What language should I use for App Store keywords in ${name}?`,
          a: `The primary search language in ${name} is ${info.lang}. ${
            info.langCode === "en"
              ? "English metadata works well without additional localisation."
              : `Keywords in ${info.lang} are needed to capture most of the search demand. English-only metadata will miss the majority of ${name} App Store searches.`
          }`,
        },
        {
          q: `Is the ${name} App Store worth targeting?`,
          a: info?.tier === "major"
            ? `Yes — ${name} is one of the highest-volume App Store markets and worth treating as a primary target. Expect higher keyword difficulty than smaller markets.`
            : info?.tier === "mid"
            ? `${name} is a worthwhile secondary target. Keyword difficulty tends to be lower than the major markets for the same search intent, making it a good expansion market.`
            : `${name} is an emerging market with very low keyword difficulty for most categories. The user base is smaller, but competition is minimal — useful for testing keyword strategies with low cost.`,
        },
        {
          q: `How does ${name} keyword difficulty compare to the US?`,
          a: isMajor && code !== "us"
            ? `${name} typically runs 5–20 points lower difficulty than the US for the same keyword categories, despite similar or meaningful search volume. It is often a more accessible target.`
            : code === "us"
            ? `The US is the most competitive App Store market — keyword difficulty is consistently among the highest of any storefront. For the same keywords, secondary markets like UK, Canada, or Australia typically score 5–20 points lower.`
            : `${name}'s keyword difficulty is substantially below major markets for most categories. This makes it a low-effort way to capture App Store users in an underserved market.`,
        },
      ]
    : [];

  const faq = faqSchema(faqItems);
  const crumb = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Keyword Research by Storefront", url: `${SITE_URL}/keyword-research` },
    { name: name, url: `${SITE_URL}/keyword-research/${code}` },
  ]);
  const page = webPageSchema({
    title: `App Store Keyword Research: ${name}`,
    description: `App Store keyword research guide for the ${name} (${code.toUpperCase()}) storefront.`,
    url: `${SITE_URL}/keyword-research/${code}`,
  });

  return (
    <div className="pseo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />

      <header className="pseo-header">
        <nav className="pseo-nav" aria-label="Site">
          <Link className="pseo-brand" href="/">
            ASO<b>Grade</b>
          </Link>
          <Link href="/keyword-research">All Storefronts</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/start" className="pseo-cta-link">
            Get started →
          </Link>
        </nav>
      </header>

      <main className="pseo-main pseo-article">
        <nav className="pseo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">ASOGrade</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/keyword-research">Keyword Research by Storefront</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{name}</span>
        </nav>

        <div className="pseo-hero">
          <div className="pseo-store-badge">
            {flag && <span className="pseo-flag" aria-hidden="true">{flag}</span>}
            <span className="pseo-tier-badge">{tierLabel}</span>
          </div>
          <h1>App Store Keyword Research: {name}</h1>
          <p className="pseo-lead">
            {info
              ? info.facts[0]
              : `A guide to App Store keyword research in the ${name} (${code.toUpperCase()}) storefront — what to know about demand, difficulty, and strategy before you localise.`}
          </p>
        </div>

        {info && (
          <>
            <section className="pseo-section">
              <h2>Market overview</h2>
              <dl className="pseo-meta-dl">
                <div>
                  <dt>Storefront code</dt>
                  <dd>{code.toUpperCase()}</dd>
                </div>
                <div>
                  <dt>Market tier</dt>
                  <dd>{tierLabel}</dd>
                </div>
                <div>
                  <dt>Primary search language</dt>
                  <dd>{info.lang}</dd>
                </div>
                <div>
                  <dt>Region</dt>
                  <dd>
                    {info.region
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="pseo-section">
              <h2>What to know about this market</h2>
              {info.facts.map((fact, i) => (
                <p key={i}>{fact}</p>
              ))}
            </section>
          </>
        )}

        <section className="pseo-section">
          <h2>How to research keywords in {name}</h2>
          <p>
            App Store keyword research in {name} follows the same process as
            any other storefront, but the numbers will differ — sometimes
            dramatically — from what you see in your primary market.
          </p>
          <ol className="pseo-steps">
            <li>
              <strong>Build a candidate list.</strong> Start with your core
              category keywords in{" "}
              {info?.langCode === "en" ? "English" : info?.lang ?? "the local language"},{" "}
              add competitor subtitle terms, and include any local-language
              search terms relevant to your app category.
            </li>
            <li>
              <strong>Score for popularity.</strong> Run each candidate in the{" "}
              {name} storefront specifically — popularity scores can differ
              significantly from other markets. Look for terms above 25.
            </li>
            <li>
              <strong>Check difficulty.</strong> Filter to terms with difficulty
              below{" "}
              {info?.tier === "major"
                ? "60 for an established app, below 45 for a newer app."
                : info?.tier === "mid"
                ? "50 — this market has meaningful volume with consistently lower competition than the major storefronts."
                : "40 — in this emerging market, most keyword slots are accessible even for newer apps."}
            </li>
            <li>
              <strong>Update metadata.</strong> Include the winning terms in
              your {name} storefront metadata — separate from your primary-market
              metadata if you have localised versions.
            </li>
          </ol>
        </section>

        {faqItems.length > 0 && (
          <section className="pseo-section pseo-faq">
            <h2>Frequently asked questions</h2>
            <dl>
              {faqItems.map((item, i) => (
                <div key={i} className="pseo-faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="pseo-section pseo-cta-section">
          <h2>Research {name} App Store keywords now</h2>
          <p>
            Score keywords in the {name} storefront — popularity, difficulty,
            and competing apps count — across 109 markets in one workspace.
          </p>
          <Link href="/start" className="pseo-btn-primary">
            Start researching →
          </Link>
        </section>

        <section className="pseo-section">
          <h2>Other storefronts to compare</h2>
          <ul className="pseo-related-list">
            {(isMajor ? STORES.filter(([c]) => POPULAR.includes(c) && c !== code) : STORES.filter(([c]) => POPULAR.includes(c)))
              .slice(0, 8)
              .map(([c, n]) => (
                <li key={c}>
                  <Link href={`/keyword-research/${c}`}>
                    {flagOf(c)} {n} →
                  </Link>
                </li>
              ))}
          </ul>
          <Link href="/keyword-research" className="pseo-link-more">
            View all 109 storefronts →
          </Link>
        </section>
      </main>

      <footer className="pseo-footer">
        <div className="pseo-footer-links">
          <Link href="/">Home</Link>
          <Link href="/keyword-research">Keyword Research</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/guides">Guides</Link>
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
