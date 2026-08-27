import type { Metadata } from "next";
import { MATURITY_LINE, MATURITY_NOTE } from "@/app/onboarding/solutions";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Table from "@/app/ui/Table";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = {
  title: "ASOGrade vs. Other ASO Approaches | ASOGrade",
  description:
    "How ASOGrade compares to guessing on instinct, DIY spreadsheets, full ASO suites, and agencies — honest comparisons, no inflated competitor claims.",
  alternates: { canonical: "/compare" },
  openGraph: {
    images: [OG_IMAGE],
    title: "ASOGrade vs. Other ASO Approaches | ASOGrade",
    description:
      "How ASOGrade compares to guessing on instinct, DIY spreadsheets, full ASO suites, and agencies — honest, category-level comparisons.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
};

export const COMPARE_PAGES = [
  { slug: "guessing", key: "guess", title: "ASOGrade vs. Guessing on Instinct" },
  { slug: "spreadsheets", key: "sheet", title: "ASOGrade vs. DIY Spreadsheets" },
  { slug: "aso-suites", key: "tool", title: "ASOGrade vs. Full ASO Suites" },
  { slug: "agencies", key: "agency", title: "ASOGrade vs. Hiring an Agency" },
] as const;

const MATRIX: string[][] = [
  ["Instinct", "Write words that describe the app", "5 minutes", "None (guesswork)", "$0 (high opportunity cost)"],
  ["Spreadsheet", "Manual lookup in App Store", "2–4 hours", "Manual / free limits", "$0 (significant time)"],
  ["Full suite", "App setup, verification, tracker config", "30–60 minutes", "Mixed / estimated models", "$79–$300/mo"],
  ["Agency", "Discovery call & retainer contract", "1–2 weeks turnaround", "Agency tooling suite", "$500–$5,000/mo"],
  ["ASOGrade", "Paste 100 keywords & read scores", "Under 10 seconds", "Apple Search Ads demand", "$8.25–$14.99/mo"],
];

export default function CompareHub() {
  return (
    <PseoLayout
      current="/compare"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Compare" }]}
      schema={[
        collectionPageSchema({
          title: "ASOGrade vs. Other ASO Approaches",
          description:
            "Category-level comparisons between ASOGrade and the alternatives: instinct, spreadsheets, full suites, and agencies.",
          url: `${SITE_URL}/compare`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Compare", url: `${SITE_URL}/compare` },
        ]),
      ]}
      cta={{
        heading: "See the difference in practice",
        body: "Paste 100 keyword ideas and get popularity, difficulty, and competing app count in seconds — no spreadsheet, no agency, no guesswork.",
      }}
    >
      <PageHero
        title="ASOGrade vs. Other ASO Approaches"
        lead="Honest, category-level comparisons between ASOGrade and the alternatives — no made-up competitor claims, just a clear read on what each approach actually delivers."
      />

      <Section title="Four common ways to handle ASO">
        <LinkCardGrid
          min={280}
          items={COMPARE_PAGES.map((p) => ({
            href: `/compare/${p.slug}`,
            title: p.title,
            note: MATURITY_NOTE[p.key],
            badge: MATURITY_LINE[p.key],
            cta: "Read comparison",
          }))}
        />
      </Section>

      <Section title="Approach comparison matrix">
        <Table
          caption="How five approaches to App Store keyword research compare"
          head={["Approach", "First action", "Time per batch", "Data source", "Typical cost"]}
          rows={MATRIX}
          highlightLast
        />
      </Section>

      <Section title="Related guides & solutions">
        <LinkCardGrid
          items={[
            {
              href: "/guides/free-vs-paid-aso-tools",
              title: "Free vs. Paid ASO Tools",
              note: "Where free research tools hit limits and when paid tools earn their cost.",
              cta: "Read guide",
            },
            {
              href: "/solutions/tool-cost",
              title: "Affordable ASO Without Enterprise Pricing",
              note: "Why paying for bloated dashboards you never use wastes budget.",
              cta: "Read solution",
            },
            {
              href: "/solutions/research-time",
              title: "Cutting ASO Research Time",
              note: "Score 100 keywords in seconds with instant caching.",
              cta: "Read solution",
            },
          ]}
        />
      </Section>
    </PseoLayout>
  );
}
