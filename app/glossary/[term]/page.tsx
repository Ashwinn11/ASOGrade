import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GLOSSARY } from "@/lib/seo/glossary";
import {
  faqSchema,
  breadcrumbSchema,
  definedTermSchema,
} from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY.map((entry) => ({ term: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const entry = GLOSSARY.find((e) => e.slug === term);
  if (!entry) return {};

  const title = fitTitle([
    `${entry.term} — ASO Glossary | ASOGrade`,
    `${entry.term} — ASO Glossary`,
    `${entry.term} | ASOGrade`,
    entry.term,
  ]);
  const description = fitDescription(entry.definition);

  return {
    title,
    description,
    alternates: { canonical: `/glossary/${term}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/glossary/${term}`,
      type: "article",
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const entry = GLOSSARY.find((e) => e.slug === term);
  if (!entry) notFound();

  const relatedEntries = entry.related
    .map((slug) => GLOSSARY.find((e) => e.slug === slug))
    .filter(Boolean) as typeof GLOSSARY;

  const faq = faqSchema(entry.faq);
  const crumb = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
    { name: entry.term, url: `${SITE_URL}/glossary/${entry.slug}` },
  ]);
  const defined = definedTermSchema({
    term: entry.term,
    definition: entry.definition,
    url: `${SITE_URL}/glossary/${entry.slug}`,
  });

  return (
    <div className="pseo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defined) }}
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
          <Link href="/keyword-research">Keyword Research</Link>
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
          <Link href="/glossary">ASO Glossary</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{entry.term}</span>
        </nav>

        <div className="pseo-hero">
          <span className="pseo-eyebrow">ASO Glossary</span>
          <h1>{entry.term}</h1>
          <p className="pseo-definition">{entry.definition}</p>
        </div>

        <article className="pseo-body">
          {entry.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {entry.faq.length > 0 && (
          <section className="pseo-section pseo-faq">
            <h2>Frequently asked questions</h2>
            <dl>
              {entry.faq.map((item, i) => (
                <div key={i} className="pseo-faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {relatedEntries.length > 0 && (
          <section className="pseo-section">
            <h2>Related terms</h2>
            <ul className="pseo-related-list">
              {relatedEntries.map((rel) => (
                <li key={rel.slug}>
                  <Link href={`/glossary/${rel.slug}`}>
                    {rel.term} →
                  </Link>
                  <span>{rel.definition}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pseo-section pseo-cta-section">
          <h2>Put this into practice</h2>
          <p>
            Score App Store keywords by popularity and difficulty across 109
            storefronts — the numbers behind {entry.term.toLowerCase()}.
          </p>
          <Link href="/start" className="pseo-btn-primary">
            Start keyword research →
          </Link>
        </section>

        <section className="pseo-section">
          <h2>Browse the glossary</h2>
          <Link href="/glossary" className="pseo-link-more">
            View all ASO terms →
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
