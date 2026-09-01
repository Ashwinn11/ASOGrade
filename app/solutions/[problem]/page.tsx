import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STRUGGLE_FIX } from "@/app/onboarding/solutions";
import { SOLUTION_DETAILS } from "@/lib/seo/solutions";
import {
  SOLUTION_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  SITE_URL,
  type SolutionEntity,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import Pill from "@/app/ui/Pill";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const dynamicParams = true;
export const revalidate = 86400;

interface Props {
  params: Promise<{ problem: string }>;
}

export async function generateStaticParams() {
  return SOLUTION_ENTITIES.map((d) => ({ problem: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { problem } = await params;
  const detail = getPseoEntity("solution", problem) as SolutionEntity | null;
  if (!detail) return {};

  return buildPseoMetadata({
    titleCandidates: [
      `${detail.metaTitle ?? detail.title} | ASOGrade`,
      detail.metaTitle ?? detail.title,
    ],
    descriptionCandidates: [detail.description],
    canonicalPath: detail.canonicalPath,
    type: "article",
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { problem } = await params;
  const detail = SOLUTION_DETAILS.find((d) => d.slug === problem);
  if (!detail) notFound();

  const fix = STRUGGLE_FIX[detail.fixKey];

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: detail.title,
      description: detail.description,
      url: `${SITE_URL}/solutions/${detail.slug}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Solutions", url: `${SITE_URL}/solutions` },
      { name: detail.title, url: `${SITE_URL}/solutions/${detail.slug}` },
    ]),
    buildFaqSchema(detail.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/solutions"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: detail.title },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Ready to solve this for your app?",
        body: "Join indie developers scoring App Store keywords by demand and difficulty across 109 storefronts.",
        label: "Start researching now",
      }}
    >
      <PageHero
        badges={fix?.proof ? <Pill>{fix.proof}</Pill> : undefined}
        title={detail.title}
        lead={detail.subtitle}
      />

      {fix && (
        <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
          <p className="text-sm leading-relaxed text-muted">
            <strong className="font-semibold text-ink">The problem:</strong> {fix.problem}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <strong className="font-semibold text-ink">The fix:</strong> {fix.fix}
          </p>
        </Card>
      )}

      <Prose className="mt-8">
        {detail.breakdown.map((section, idx) => (
          <section key={idx}>
            <h2>{section.heading}</h2>
            {section.points.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}
      </Prose>

      <Section title="How ASOGrade solves this">
        <Prose>
          <ol>
            {detail.howItWorks.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Prose>
      </Section>

      {detail.faq && detail.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={detail.faq} />
        </Section>
      )}

      <Section title="Other ASO solutions">
        <LinkCardGrid
          min={260}
          items={SOLUTION_ENTITIES.filter((d) => d.slug !== detail.slug).map((d) => ({
            href: `/solutions/${d.slug}`,
            title: d.metaTitle ?? d.title,
            note: d.subtitle,
            cta: "Learn more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
