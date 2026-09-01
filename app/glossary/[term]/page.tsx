import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GLOSSARY_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildDefinedTermSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  getRelatedGlossaryTerms,
  SITE_URL,
  type GlossaryEntity,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const dynamicParams = true;
export const revalidate = 86400;

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_ENTITIES.map((entry) => ({ term: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const entry = getPseoEntity("glossary", term) as GlossaryEntity | null;
  if (!entry) return {};

  return buildPseoMetadata({
    titleCandidates: [
      `${entry.term} — ASO Glossary | ASOGrade`,
      `${entry.term} — ASO Glossary`,
      `${entry.term} | ASOGrade`,
      entry.term,
    ],
    descriptionCandidates: [
      entry.description,
      `What is ${entry.term}? Definition, formula, and actionable App Store keyword research strategy for iOS developers.`,
      `Learn about ${entry.term} in the ASOGrade App Store Optimization glossary.`,
    ],
    canonicalPath: entry.canonicalPath,
    type: "article",
  });
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const entry = getPseoEntity("glossary", term) as GlossaryEntity | null;
  if (!entry) notFound();

  const related = getRelatedGlossaryTerms(entry.slug, 6);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: `${entry.term} — ASO Glossary`,
      description: entry.description,
      url: `${SITE_URL}${entry.canonicalPath}`,
    }),
    buildDefinedTermSchema({
      term: entry.term,
      definition: entry.definition,
      url: `${SITE_URL}${entry.canonicalPath}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
      { name: entry.term, url: `${SITE_URL}${entry.canonicalPath}` },
    ]),
    buildFaqSchema(entry.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/glossary"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "ASO Glossary", href: "/glossary" },
        { label: entry.term },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Put this into practice",
        body: `Score App Store keywords by popularity and difficulty across 109 storefronts — the numbers behind ${entry.term.toLowerCase()}.`,
        label: "Start keyword research",
      }}
    >
      <PageHero kicker="ASO Glossary" title={entry.term} />

      {/* AEO / Quick Definition Block */}
      <Card tone="sunken" className="mt-5 border-l-[3px] border-l-accent" pad="md">
        <span className="text-2xs font-bold uppercase tracking-wider text-accent">
          Core Definition
        </span>
        <p className="mt-1 text-base font-medium leading-relaxed text-ink">
          {entry.definition}
        </p>
      </Card>

      <Prose className="mt-8">
        {entry.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Prose>

      {entry.faq && entry.faq.length > 0 && (
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
