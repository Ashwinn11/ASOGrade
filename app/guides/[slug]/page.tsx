import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES } from "@/lib/seo/guides";
import { GLOSSARY } from "@/lib/seo/glossary";
import { faqSchema, breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import { LinkCardGrid } from "@/app/ui/LinkCard";

// A fixed publish date; bump when a guide is materially revised.
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

  const related = guide.related.map((rel) => {
    if (rel.type === "guide") {
      const found = GUIDES.find((g) => g.slug === rel.slug);
      return {
        href: `/guides/${rel.slug}`,
        title: found?.title ?? rel.label,
        note: found?.description,
        cta: "Read",
      };
    }
    const found = GLOSSARY.find((g) => g.slug === rel.slug);
    return {
      href: `/glossary/${rel.slug}`,
      title: found?.term ?? rel.label,
      note: found?.definition,
      cta: "Read",
    };
  });

  return (
    <PseoLayout
      current="/guides"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: guide.title },
      ]}
      schema={[
        articleSchema({
          title: guide.title,
          description: guide.description,
          url: `${SITE_URL}/guides/${guide.slug}`,
          datePublished: PUBLISHED,
          dateModified: MODIFIED,
        }),
        faqSchema(guide.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Guides", url: `${SITE_URL}/guides` },
          { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}` },
        ]),
      ]}
      cta={{
        heading: "Apply this in your own keyword research",
        body: "Score App Store keywords by popularity and difficulty across 109 storefronts — the tool behind every strategy in this guide.",
        label: "Start keyword research",
      }}
    >
      <PageHero kicker="ASOGrade Guide" title={guide.title} lead={guide.description} />

      <Prose className="mt-8">
        {guide.sections.map((section, si) => (
          <section key={si}>
            <h2>{section.heading}</h2>
            {section.body.map((para, pi) => (
              <p key={pi}>{para}</p>
            ))}
          </section>
        ))}
      </Prose>

      {guide.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={guide.faq} />
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Related resources">
          <LinkCardGrid items={related} />
        </Section>
      )}

      <Section title="More guides">
        <LinkCardGrid
          items={GUIDES.filter((g) => g.slug !== guide.slug)
            .slice(0, 4)
            .map((g) => ({
              href: `/guides/${g.slug}`,
              title: g.metaTitle ?? g.title,
              note: g.description,
              cta: "Read guide",
            }))}
        />
        <Link
          href="/guides"
          className="mt-4 inline-block text-sm font-semibold text-accent no-underline hover:underline"
        >
          View all guides →
        </Link>
      </Section>
    </PseoLayout>
  );
}
