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
  buildSoftwareApplicationSchema,
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
  const data = getPseoEntity("compare", slug) as CompareEntity | null;
  if (!data) notFound();

  // Pick 6 contextual alternatives to prevent link dilution
  const others = COMPARE_ENTITIES.filter((d) => d.slug !== slug).slice(0, 6);

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
    buildSoftwareApplicationSchema(),
    buildFaqSchema(data.faq ?? []),
  ]);

  const bestForUs =
    data.quickVerdict?.bestForASOGrade ??
    data.quickVerdict?.bestForAsograde ??
    "Fast, focused App Store keyword difficulty and popularity scoring across 109 storefronts.";

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
      <PageHero kicker="Comparison & Alternative" title={data.title} lead={data.subtitle} />

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
                Best for alternative
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
                {bestForUs}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Comparison Matrix Table */}
      {data.comparisonMatrix && data.comparisonMatrix.length > 0 && (
        <Section title="Comparison at a Glance">
          <div className="overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full text-left text-sm text-ink">
              <thead className="border-b border-line bg-muted/10 font-display text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="p-3">Feature / Capability</th>
                  <th className="p-3 text-accent font-bold">ASOGrade</th>
                  <th className="p-3">{data.competitorName}</th>
                  {data.competitorBName && <th className="p-3">{data.competitorBName}</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.comparisonMatrix.map((row, idx) => (
                  <tr key={idx} className={row.advantage === "asograde" ? "bg-accent/5" : ""}>
                    <td className="p-3 font-medium">{row.feature}</td>
                    <td className="p-3 text-accent font-semibold">{row.asograde}</td>
                    <td className="p-3 text-ink/80">{row.competitor}</td>
                    {data.competitorBName && (
                      <td className="p-3 text-ink/80">{row.competitorB ?? "—"}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Detailed Content Breakdown */}
      {data.breakdown && data.breakdown.length > 0 && (
        <div className="space-y-8">
          {data.breakdown.map((sec, idx) => (
            <Section key={idx} title={sec.heading}>
              <Prose>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </Prose>
            </Section>
          ))}
        </div>
      )}

      {data.faq && data.faq.length > 0 && (
        <Section title="Frequently Asked Questions">
          <Faq items={data.faq} />
        </Section>
      )}

      <Section title="More ASO Tool Comparisons">
        <LinkCardGrid
          min={260}
          items={others.map((d) => ({
            href: d.canonicalPath,
            title: d.title,
            note: d.subtitle,
            cta: "Read comparison",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
