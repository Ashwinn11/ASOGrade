import type { Metadata } from "next";
import { STRUGGLE_FIX } from "@/app/onboarding/solutions";
import {
  SOLUTION_ENTITIES,
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
    "ASO Solutions for Common Keyword Challenges | ASOGrade",
    "ASO Solutions for Common Keyword Challenges",
  ],
  descriptionCandidates: [
    "Solutions to common App Store keyword problems: finding ideas, identifying winnable terms, competitor research, international markets, speed, and cost.",
  ],
  canonicalPath: "/solutions",
  type: "website",
});

export default function SolutionsHub() {
  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: "App Store Keyword Solutions",
      description:
        "Specific fixes for the problems developers hit when researching App Store keywords.",
      url: `${SITE_URL}/solutions`,
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Solutions", url: `${SITE_URL}/solutions` },
    ]),
  ]);

  return (
    <PseoLayout
      current="/solutions"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Solutions" }]}
      schema={jsonLdGraph}
      cta={{
        heading: "Fix your keyword workflow today",
        body: "Paste 100 raw ideas in one go and get Apple Search Ads demand and ranking difficulty in seconds.",
      }}
    >
      <PageHero
        title="App Store Keyword Solutions"
        lead="Specific fixes for the exact problems developers encounter when researching App Store keywords — from candidate ideation to international storefront expansion."
      />

      <Section>
        <LinkCardGrid
          min={280}
          items={SOLUTION_ENTITIES.map((d) => {
            const fix = STRUGGLE_FIX[d.fixKey as keyof typeof STRUGGLE_FIX];
            return {
              href: `/solutions/${d.slug}`,
              title: d.title,
              note: fix?.problem ?? d.description,
              badge: fix?.proof,
              cta: "Learn more",
            };
          })}
        />
      </Section>
    </PseoLayout>
  );
}
