import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MATURITY_LINE, MATURITY_NOTE } from "@/app/onboarding/solutions";
import { COMPARE_DATA } from "@/lib/seo/compare";
import {
  COMPARE_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  SITE_URL,
  type CompareEntity,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const dynamicParams = true;
export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARE_ENTITIES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getPseoEntity("compare", slug) as CompareEntity | null;
  if (!data) return {};

  return buildPseoMetadata({
    titleCandidates: [`${data.title} | ASOGrade`, data.title],
    descriptionCandidates: [data.description],
    canonicalPath: data.canonicalPath,
    type: "article",
  });
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const data = COMPARE_DATA.find((d) => d.slug === slug);
  if (!data) notFound();

  const others = COMPARE_ENTITIES.filter((d) => d.slug !== slug);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: data.title,
      description: data.description,
      url: `${SITE_URL}/compare/${data.slug}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Compare", url: `${SITE_URL}/compare` },
      { name: data.title, url: `${SITE_URL}/compare/${data.slug}` },
    ]),
    buildFaqSchema(data.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/compare"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Compare", href: "/compare" },
        { label: data.title },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Try the research pass on its own",
        body: "Paste 100 keyword ideas and read popularity, difficulty, and competing app count across 109 storefronts — in seconds.",
      }}
    >
      <PageHero kicker="Compare" title={data.title} lead={data.subtitle} />

      {data.quickVerdict && (
        <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
          <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Quick Verdict &amp; Key Takeaways
          </div>
          <p className="mt-2 text-base font-medium leading-relaxed text-ink">
            {data.quickVerdict.summary}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div className="rounded-md bg-surface p-3 border border-line">
              <strong className="block font-semibold text-xs uppercase tracking-wider text-muted">
                Best for alternative approach
              </strong>
              <p className="mt-1 text-ink text-sm leading-relaxed">
                {data.quickVerdict.bestForCompetitor}
              </p>
            </div>
            <div className="rounded-md bg-surface p-3 border border-line">
              <strong className="block font-semibold text-xs uppercase tracking-wider text-accent">
                Best for ASOGrade
              </strong>
              <p className="mt-1 text-ink text-sm leading-relaxed">
                {data.quickVerdict.bestForASOGrade}
              </p>
            </div>
          </div>
        </Card>
      )}

      {data.maturityKey && (
        <Card tone="sunken" className="mt-4 border-l-[3px] border-l-accent">
          <strong className="block font-display text-base font-bold text-ink">
            {MATURITY_LINE[data.maturityKey]}
          </strong>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {MATURITY_NOTE[data.maturityKey]}
          </p>
        </Card>
      )}

      <Prose className="mt-8">
        {data.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      <Section title="What this approach does well">
        <Prose>
          {data.whatThisApproachDoes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section title="Where it falls short">
        <Prose>
          {data.whereItFalls.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </Section>

      <Section title="Where ASOGrade fits">
        <Prose>
          {data.whereASOGradeFits.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </Section>

      {data.faq && data.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={data.faq} />
        </Section>
      )}

      <Section title="Other comparisons">
        <LinkCardGrid
          min={260}
          items={others.map((d) => ({
            href: `/compare/${d.slug}`,
            title: d.title,
            note: d.subtitle,
            cta: "Read comparison",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
