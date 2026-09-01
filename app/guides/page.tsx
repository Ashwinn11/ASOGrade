import type { Metadata } from "next";
import Link from "next/link";
import {
  GUIDE_ENTITIES,
  GLOSSARY_ENTITIES,
  STOREFRONT_ENTITIES,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo/engine";
import { flagOf } from "@/lib/types";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = buildPseoMetadata({
  titleCandidates: [
    "App Store Keyword Research Guides | ASOGrade",
    "App Store Keyword Research Guides",
  ],
  descriptionCandidates: [
    "In-depth guides to App Store keyword research: low-competition strategies, difficulty evaluation, multi-storefront research, and competitor teardowns.",
  ],
  canonicalPath: "/guides",
  type: "website",
});

const headlineStores = STOREFRONT_ENTITIES.filter((s) => s.isMajor).slice(0, 8);

export default function GuidesHub() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "App Store Keyword Research Guides",
      description:
        "In-depth guides to App Store keyword research, difficulty evaluation, and multi-storefront strategy.",
      url: `${SITE_URL}/guides`,
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Guides", url: `${SITE_URL}/guides` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/guides"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Guides" }]}
      schema={jsonLdGraph}
      cta={{
        heading: "Ready to research keywords?",
        body: "Score App Store keywords by popularity and difficulty across 109 storefronts — apply everything in these guides with real data.",
        label: "Start keyword research",
      }}
    >
      <PageHero
        title="App Store Keyword Research Guides"
        lead="Practical guides to finding, evaluating, and acting on App Store keyword opportunities — written for indie developers and ASO practitioners who need real answers, not generic advice."
      />

      <Section title="In-depth guides">
        <LinkCardGrid
          min={280}
          items={GUIDE_ENTITIES.map((g) => ({
            href: `/guides/${g.slug}`,
            title: g.title,
            note: g.description,
            cta: "Read guide",
          }))}
        />
      </Section>

      <Section
        title="Essential ASO glossary concepts"
        note="Master the underlying metrics and algorithmic factors covered in these guides:"
      >
        <LinkCardGrid
          min={250}
          items={GLOSSARY_ENTITIES.slice(0, 6).map((e) => ({
            href: `/glossary/${e.slug}`,
            title: e.term,
            note: e.definition,
          }))}
        />
        <Link
          href="/glossary"
          className="mt-4 inline-block text-sm font-semibold text-accent no-underline hover:underline"
        >
          Browse the full ASO glossary →
        </Link>
      </Section>

      <Section
        title="Storefront keyword research"
        note="Keyword difficulty varies significantly by country. Explore market guides for the top App Store storefronts:"
      >
        <LinkCardGrid
          min={200}
          items={headlineStores.map((s) => ({
            href: `/keyword-research/${s.code}`,
            title: `${flagOf(s.code)} ${s.name}`,
            badge: s.isMajor ? "Major market" : undefined,
          }))}
        />
        <Link
          href="/keyword-research"
          className="mt-4 inline-block text-sm font-semibold text-accent no-underline hover:underline"
        >
          View all 109 storefront guides →
        </Link>
      </Section>
    </PseoLayout>
  );
}
