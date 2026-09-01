import type { Metadata } from "next";
import {
  PERSONA_ENTITIES,
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
    "App Store Keyword Research by Role | ASOGrade",
    "App Store Keyword Research by Role",
  ],
  descriptionCandidates: [
    "How indie developers, studios, agencies, and Apple Search Ads advertisers each use ASOGrade for App Store keyword research — and where it isn't the right fit.",
  ],
  canonicalPath: "/for",
  type: "website",
});

export default function ForHub() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "App Store Keyword Research by Role",
      description:
        "Who ASOGrade's keyword research fits, broken down by how each kind of user actually works.",
      url: `${SITE_URL}/for`,
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "For", url: `${SITE_URL}/for` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/for"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "For" }]}
      schema={jsonLdGraph}
      cta={{
        heading: "Find your workflow",
        body: "Whichever one you are, the research pass looks the same: paste keywords, read real demand and difficulty, in seconds.",
      }}
    >
      <PageHero
        title="App Store Keyword Research by Role"
        lead="The scores are the same for everyone. What you do with them, and what else you need alongside them, depends on whether you're shipping one app or managing a client's whole portfolio."
      />

      <Section>
        <LinkCardGrid
          min={280}
          items={PERSONA_ENTITIES.map((p) => ({
            href: `/for/${p.slug}`,
            title: p.audience,
            note: p.subtitle,
            cta: "Read more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
