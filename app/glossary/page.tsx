import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/lib/seo/glossary";
import { GUIDES } from "@/lib/seo/guides";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = {
  title: "ASO Glossary: App Store Optimization Terms | ASOGrade",
  description:
    "Clear definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    images: [OG_IMAGE],
    title: "ASO Glossary: App Store Optimization Terms | ASOGrade",
    description:
      "Clear definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, and more.",
    url: `${SITE_URL}/glossary`,
    type: "website",
  },
};

const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryHub() {
  return (
    <PseoLayout
      current="/glossary"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "ASO Glossary" }]}
      schema={[
        collectionPageSchema({
          title: "ASO Glossary",
          description:
            "Definitions of App Store Optimization terms — keyword popularity, keyword difficulty, storefronts, metadata fields, competitor teardown, and more.",
          url: `${SITE_URL}/glossary`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "ASO Glossary", url: `${SITE_URL}/glossary` },
        ]),
      ]}
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
          items={GUIDES.slice(0, 4).map((g) => ({
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
