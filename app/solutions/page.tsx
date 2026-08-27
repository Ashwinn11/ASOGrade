import type { Metadata } from "next";
import { STRUGGLE_FIX } from "@/app/onboarding/solutions";
import { SOLUTION_DETAILS } from "@/lib/seo/solutions";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = {
  title: "ASO Solutions for Common Keyword Challenges | ASOGrade",
  description:
    "Solutions to common App Store keyword problems: finding ideas, identifying winnable terms, competitor research, international markets, speed, and cost.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    images: [OG_IMAGE],
    title: "ASO Solutions for Common Keyword Challenges | ASOGrade",
    description:
      "Solutions to common App Store keyword problems: finding ideas, identifying winnable terms, competitor research, international markets, speed, and cost.",
    url: `${SITE_URL}/solutions`,
    type: "website",
  },
};

export default function SolutionsHub() {
  return (
    <PseoLayout
      current="/solutions"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Solutions" }]}
      schema={[
        collectionPageSchema({
          title: "App Store Keyword Solutions",
          description:
            "Specific fixes for the problems developers hit when researching App Store keywords.",
          url: `${SITE_URL}/solutions`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Solutions", url: `${SITE_URL}/solutions` },
        ]),
      ]}
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
          items={SOLUTION_DETAILS.map((d) => {
            const fix = STRUGGLE_FIX[d.fixKey];
            return {
              href: `/solutions/${d.slug}`,
              title: d.title,
              note: fix.problem,
              badge: fix.proof,
              cta: "Learn more",
            };
          })}
        />
      </Section>
    </PseoLayout>
  );
}
