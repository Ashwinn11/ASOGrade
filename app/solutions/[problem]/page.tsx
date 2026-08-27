import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STRUGGLE_FIX } from "@/app/start/solutions";
import { SOLUTION_DETAILS } from "@/lib/seo/solutions";
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import Pill from "@/app/ui/Pill";
import { LinkCardGrid } from "@/app/ui/LinkCard";

interface Props {
  params: Promise<{ problem: string }>;
}

export async function generateStaticParams() {
  return SOLUTION_DETAILS.map((d) => ({ problem: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { problem } = await params;
  const detail = SOLUTION_DETAILS.find((d) => d.slug === problem);
  if (!detail) return {};

  const title = fitTitle([
    `${detail.metaTitle ?? detail.title} | ASOGrade`,
    detail.metaTitle ?? detail.title,
  ]);
  const description = fitDescription(detail.description);

  return {
    title,
    description,
    alternates: { canonical: `/solutions/${problem}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/solutions/${problem}`,
      type: "article",
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { problem } = await params;
  const detail = SOLUTION_DETAILS.find((d) => d.slug === problem);
  if (!detail) notFound();

  const fix = STRUGGLE_FIX[detail.fixKey];

  return (
    <PseoLayout
      current="/solutions"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: detail.title },
      ]}
      schema={[
        webPageSchema({
          title: detail.title,
          description: detail.description,
          url: `${SITE_URL}/solutions/${detail.slug}`,
        }),
        faqSchema(detail.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Solutions", url: `${SITE_URL}/solutions` },
          { name: detail.title, url: `${SITE_URL}/solutions/${detail.slug}` },
        ]),
      ]}
      cta={{
        heading: "Ready to solve this for your app?",
        body: "Join indie developers scoring App Store keywords by demand and difficulty across 109 storefronts.",
        label: "Start researching now",
      }}
    >
      <PageHero
        badges={fix.proof ? <Pill>{fix.proof}</Pill> : undefined}
        title={detail.title}
        lead={detail.subtitle}
      />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent">
        <p className="text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-ink">The problem:</strong> {fix.problem}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-ink">The fix:</strong> {fix.fix}
        </p>
      </Card>

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

      {detail.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={detail.faq} />
        </Section>
      )}

      <Section title="Other ASO solutions">
        <LinkCardGrid
          min={260}
          items={SOLUTION_DETAILS.filter((d) => d.slug !== detail.slug).map((d) => ({
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
