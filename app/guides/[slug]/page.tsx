import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES } from "@/lib/seo/guides";
import { GLOSSARY } from "@/lib/seo/glossary";
import {
  faqSchema,
  breadcrumbSchema,
  articleSchema,
} from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";
// Using a consistent publish date — update when content is significantly revised
const PUBLISHED = "2024-11-01T00:00:00Z";
const MODIFIED = new Date().toISOString();

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  const title = fitTitle([
    `${guide.metaTitle ?? guide.title} | ASOGrade`,
    guide.metaTitle ?? guide.title,
  ]);
  const description = fitDescription(guide.description);

  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/guides/${slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  // Resolve related items to their actual data
  const relatedItems = guide.related.map((rel) => {
    if (rel.type === "guide") {
      const found = GUIDES.find((g) => g.slug === rel.slug);
      return {
        href: `/guides/${rel.slug}`,
        label: found?.title ?? rel.label,
        description: found?.description,
      };
    } else {
      const found = GLOSSARY.find((g) => g.slug === rel.slug);
      return {
        href: `/glossary/${rel.slug}`,
        label: found?.term ?? rel.label,
        description: found?.definition,
      };
    }
  });

  const faq = faqSchema(guide.faq);
  const crumb = breadcrumbSchema([
    { name: "ASOGrade", url: SITE_URL },
    { name: "Guides", url: `${SITE_URL}/guides` },
    { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}` },
  ]);
  const article = articleSchema({
    title: guide.title,
    description: guide.description,
    url: `${SITE_URL}/guides/${guide.slug}`,
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  });

  return (
    <div className="pseo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
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

      <main className="pseo-main pseo-article pseo-guide-article">
        <nav className="pseo-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">ASOGrade</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/guides">Guides</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{guide.title}</span>
        </nav>

        <div className="pseo-hero">
          <span className="pseo-eyebrow">ASOGrade Guide</span>
          <h1>{guide.title}</h1>
          <p className="pseo-lead">{guide.description}</p>
        </div>

        <article className="pseo-body">
          {guide.sections.map((section, si) => (
            <section key={si}>
              <h2>{section.heading}</h2>
              {section.body.map((para, pi) => (
                <p key={pi}>{para}</p>
              ))}
            </section>
          ))}
        </article>

        {guide.faq.length > 0 && (
          <section className="pseo-section pseo-faq">
            <h2>Frequently asked questions</h2>
            <dl>
              {guide.faq.map((item, i) => (
                <div key={i} className="pseo-faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {relatedItems.length > 0 && (
          <section className="pseo-section">
            <h2>Related resources</h2>
            <ul className="pseo-related-list pseo-related-cards">
              {relatedItems.map((item, i) => (
                <li key={i}>
                  <Link href={item.href}>
                    <strong>{item.label}</strong>
                    {item.description && <span>{item.description}</span>}
                    <em>Read →</em>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pseo-section pseo-cta-section">
          <h2>Apply this in your own keyword research</h2>
          <p>
            Score App Store keywords by popularity and difficulty across 109
            storefronts — the tool behind every strategy in this guide.
          </p>
          <Link href="/start" className="pseo-btn-primary">
            Start keyword research →
          </Link>
        </section>

        <section className="pseo-section">
          <h2>More guides</h2>
          <ul className="pseo-related-list">
            {GUIDES.filter((g) => g.slug !== guide.slug)
              .slice(0, 4)
              .map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>{g.title} →</Link>
                </li>
              ))}
          </ul>
          <Link href="/guides" className="pseo-link-more">
            View all guides →
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
