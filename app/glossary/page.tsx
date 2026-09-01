import type { Metadata } from "next";
import Link from "next/link";
import {
  GLOSSARY_ENTITIES,
  GUIDE_ENTITIES,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = buildPseoMetadata({
  titleCandidates: [
    "ASO Glossary: App Store Optimization Terms | ASOGrade",
    "ASO Glossary: App Store Optimization Terms",
  ],
  descriptionCandidates: [
    "Clear definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
  ],
  canonicalPath: "/glossary",
  type: "website",
});

const sorted = [...GLOSSARY_ENTITIES].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryHub() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "ASO Glossary",
      description:
        "Definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
      url: `${SITE_URL}/glossary`,
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/glossary"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "ASO Glossary" }]}
      schema={jsonLdGraph}
      cta={{
        heading: "Put the definitions to work",
        body: "Score App Store keywords by popularity and difficulty across 109 storefronts — the two numbers behind every definition in this glossary.",
        label: "Start keyword research",
      }}
    >
      <PageHero
        title="App Store Optimization Glossary"
        lead="Clear definitions of every term that matters in App Store keyword research — from keyword popularity and difficulty to storefronts, metadata fields, and competitor teardowns."
      />

      <Section title="All glossary terms">
        <LinkCardGrid
          min={250}
          prefetch={false}
          items={sorted.map((entry) => ({
            href: `/glossary/${entry.slug}`,
            title: entry.term,
            note: entry.definition,
          }))}
        />
      </Section>

      <Section
        title="Practical guides applying these concepts"
        note="Ready to apply these definitions to real keyword research workflows? Read our in-depth guides:"
      >
        <LinkCardGrid
          items={GUIDE_ENTITIES.slice(0, 4).map((g) => ({
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
          Browse all in-depth ASO guides →
        </Link>
      </Section>
    </PseoLayout>
  );
}
