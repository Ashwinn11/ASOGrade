import type { Metadata } from "next";
import {
  CATEGORY_ENTITIES,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return buildPseoMetadata({
    titleCandidates: [
      "App Store Categories Keyword Research Directory | ASOGrade",
      "ASO Categories Directory | ASOGrade",
    ],
    descriptionCandidates: [
      "Explore App Store keyword research blueprints for 45 app categories: fitness, finance, habit trackers, AI photo editors, productivity, and more.",
    ],
    canonicalPath: "/keyword-research/category",
    type: "website",
  });
}

export default function CategoryDirectoryPage() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "App Store Categories Keyword Research Directory",
      description: "Explore App Store keyword research blueprints for 45 app categories.",
      url: `${SITE_URL}/keyword-research/category`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Keyword Research", url: `${SITE_URL}/keyword-research` },
      { name: "Categories", url: `${SITE_URL}/keyword-research/category` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/keyword-research"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: "Categories" },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Score keywords across all categories",
        body: "Paste up to 100 candidate keywords and get instant Apple Search Ads popularity and difficulty scores across 109 storefronts.",
      }}
    >
      <PageHero
        kicker="Category Blueprints"
        title="App Store Keyword Research by Category"
        lead="Targeted keyword intelligence, search intent seeds, and title/subtitle formulas for 45 popular App Store niches."
      />

      <Section title="All App Categories & Niches">
        <LinkCardGrid
          min={260}
          items={CATEGORY_ENTITIES.map((c) => ({
            href: c.canonicalPath,
            title: c.nicheName,
            note: `${c.appStoreCategory} • Benchmark Pop: ${c.benchmarkMetrics.averagePopularity}/100 • Diff: ${c.benchmarkMetrics.typicalDifficultyRange}`,
            cta: "View category blueprint",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
