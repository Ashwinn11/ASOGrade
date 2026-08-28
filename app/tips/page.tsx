import type { Metadata } from "next";
import { TIPS } from "@/lib/seo/tips";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = {
  title: "App Store Keyword Research: Quick Answers | ASOGrade",
  description:
    "Direct answers to specific App Store keyword and ASO questions — one question, one real answer, no padding.",
  alternates: { canonical: "/tips" },
  openGraph: {
    images: [OG_IMAGE],
    title: "App Store Keyword Research: Quick Answers | ASOGrade",
    description:
      "Direct answers to specific App Store keyword and ASO questions — one question, one real answer, no padding.",
    url: `${SITE_URL}/tips`,
    type: "website",
  },
};

export default function TipsHub() {
  return (
    <PseoLayout
      current="/tips"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Tips" }]}
      schema={[
        collectionPageSchema({
          title: "App Store Keyword Research: Quick Answers",
          description: "Direct answers to specific App Store keyword and ASO questions.",
          url: `${SITE_URL}/tips`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Tips", url: `${SITE_URL}/tips` },
        ]),
      ]}
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
          items={TIPS.map((t) => ({
            href: `/tips/${t.slug}`,
            title: t.question,
            note: t.shortAnswer,
            cta: "Read the answer",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
