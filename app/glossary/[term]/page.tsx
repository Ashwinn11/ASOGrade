import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GLOSSARY } from "@/lib/seo/glossary";
import { faqSchema, breadcrumbSchema, definedTermSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import { LinkCardGrid } from "@/app/ui/LinkCard";

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
  const description = fitDescription(entry.metaDescription ?? entry.definition);

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

  const related = entry.related
    .map((slug) => GLOSSARY.find((e) => e.slug === slug))
    .filter(Boolean) as typeof GLOSSARY;

  return (
    <PseoLayout
      current="/glossary"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "ASO Glossary", href: "/glossary" },
        { label: entry.term },
      ]}
      schema={[
        definedTermSchema({
          term: entry.term,
          definition: entry.definition,
          url: `${SITE_URL}/glossary/${entry.slug}`,
        }),
        faqSchema(entry.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
          { name: entry.term, url: `${SITE_URL}/glossary/${entry.slug}` },
        ]),
      ]}
      cta={{
        heading: "Put this into practice",
        body: `Score App Store keywords by popularity and difficulty across 109 storefronts — the numbers behind ${entry.term.toLowerCase()}.`,
        label: "Start keyword research",
      }}
    >
      <PageHero kicker="ASO Glossary" title={entry.term} />

      <p className="mt-5 border-l-[3px] border-accent bg-sunken px-5 py-4 text-md leading-relaxed text-ink-2">
        {entry.definition}
      </p>

      <Prose className="mt-8">
        {entry.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Prose>

      {entry.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={entry.faq} />
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Related terms">
          <LinkCardGrid
            min={250}
            items={related.map((rel) => ({
              href: `/glossary/${rel.slug}`,
              title: rel.term,
              note: rel.definition,
            }))}
          />
        </Section>
      )}

      <Section title="Browse the glossary">
        <Link
          href="/glossary"
          className="text-sm font-semibold text-accent no-underline hover:underline"
        >
          View all ASO terms →
        </Link>
      </Section>
    </PseoLayout>
  );
}
