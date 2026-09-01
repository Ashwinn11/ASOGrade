import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GUIDE_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  getRelatedGuides,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  type GuideEntity,
} from "@/lib/seo/engine";
import { GLOSSARY_ENTITIES } from "@/lib/seo/engine/registry";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Pill from "@/app/ui/Pill";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const dynamicParams = true;
export const revalidate = 86400;

const PUBLISHED = "2026-08-26T00:00:00Z";
const MODIFIED = "2026-08-28T00:00:00Z";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDE_ENTITIES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPseoEntity("guide", slug) as GuideEntity | null;
  if (!guide) return {};

  return buildPseoMetadata({
    titleCandidates: [
      `${guide.metaTitle ?? guide.title} | ASOGrade`,
      guide.metaTitle ?? guide.title,
    ],
    descriptionCandidates: [guide.description],
    canonicalPath: guide.canonicalPath,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getPseoEntity("guide", slug) as GuideEntity | null;
  if (!guide) notFound();

  const related = guide.relatedItems.map((rel) => {
    if (rel.type === "guide") {
      const found = GUIDE_ENTITIES.find((g) => g.slug === rel.slug);
      return {
        href: `/guides/${rel.slug}`,
        title: found?.title ?? rel.label,
        note: found?.description,
        cta: "Read guide",
      };
    }
    const found = GLOSSARY_ENTITIES.find((g) => g.slug === rel.slug);
    return {
      href: `/glossary/${rel.slug}`,
      title: found?.term ?? rel.label,
      note: found?.definition,
      cta: "Read term",
    };
  });

  const moreGuides = getRelatedGuides(guide.slug, 4);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildArticleSchema({
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}${guide.canonicalPath}`,
      image: DEFAULT_OG_IMAGE,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Guides", url: `${SITE_URL}/guides` },
      { name: guide.title, url: `${SITE_URL}${guide.canonicalPath}` },
    ]),
    buildFaqSchema(guide.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/guides"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: guide.title },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Apply this in your own keyword research",
        body: "Score App Store keywords by popularity and difficulty across 109 storefronts — the tool behind every strategy in this guide.",
        label: "Start keyword research",
      }}
    >
      <PageHero
        kicker="ASOGrade Guide"
        title={guide.title}
        lead={guide.description}
        badges={
          <Pill tone="neutral">{guide.readingTimeMinutes} min read</Pill>
        }
      />

      {/* Key Takeaways Callout for AEO / Quick Scan */}
      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
        <span className="text-2xs font-bold uppercase tracking-wider text-accent">
          Key Takeaway &amp; Summary
        </span>
        <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
          {guide.description}
        </p>
      </Card>

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

      {guide.faq && guide.faq.length > 0 && (
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
          items={moreGuides.map((g) => ({
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
