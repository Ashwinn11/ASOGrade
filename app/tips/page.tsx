import type { Metadata } from "next";
import {
  TIP_ENTITIES,
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
    "App Store Keyword Research: Quick Answers | ASOGrade",
    "App Store Keyword Research: Quick Answers",
  ],
  descriptionCandidates: [
    "Direct answers to specific App Store keyword and ASO questions — one question, one real answer, no padding.",
  ],
  canonicalPath: "/tips",
  type: "website",
});

export default function TipsHub() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "App Store Keyword Research: Quick Answers",
      description: "Direct answers to specific App Store keyword and ASO questions.",
      url: `${SITE_URL}/tips`,
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Tips", url: `${SITE_URL}/tips` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/tips"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Tips" }]}
      schema={jsonLdGraph}
      cta={{
        heading: "Get the numbers behind your own keywords",
        body: "Paste your candidate list and read popularity, difficulty, and competing app count in seconds.",
      }}
    >
      <PageHero
        title="App Store Keyword Research: Quick Answers"
        lead="Specific questions, answered directly. For the full workflow behind any of these, see the guides — this is the fast version."
      />

      <Section>
        <LinkCardGrid
          min={300}
          prefetch={false}
          items={TIP_ENTITIES.map((t) => ({
            href: `/tips/${t.slug}`,
            title: t.title,
            note: t.shortAnswer,
            cta: "Read the answer",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
