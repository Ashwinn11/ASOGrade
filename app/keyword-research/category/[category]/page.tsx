import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORY_ENTITIES,
  PRIORITY_CATEGORY_SLUGS,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSoftwareApplicationSchema,
  SITE_URL,
  type CategoryEntity,
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
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return PRIORITY_CATEGORY_SLUGS.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const data = getPseoEntity("category", category) as CategoryEntity | null;
  if (!data) return {};

  return buildPseoMetadata({
    titleCandidates: [data.metaTitle ?? `${data.nicheName} ASO Keywords | ASOGrade`, data.title],
    descriptionCandidates: [data.description],
    canonicalPath: data.canonicalPath,
    type: "article",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = getPseoEntity("category", category) as CategoryEntity | null;
  if (!data) notFound();

  const relatedCategories = CATEGORY_ENTITIES.filter((c) => c.slug !== category).slice(0, 6);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: data.title,
      description: data.description,
      url: `${SITE_URL}${data.canonicalPath}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Keyword Research", url: `${SITE_URL}/keyword-research` },
      { name: data.nicheName, url: `${SITE_URL}${data.canonicalPath}` },
    ]),
    buildSoftwareApplicationSchema(),
    buildFaqSchema(data.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/keyword-research"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: data.nicheName },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: `Score ${data.nicheName} keywords in seconds`,
        body: "Paste up to 100 keyword candidates and get instant Apple Search Ads popularity and difficulty scores across 109 storefronts.",
      }}
    >
      <PageHero kicker="App Store Category ASO" title={data.title} lead={data.description} />

      {/* AEO Direct Answer Summary */}
      {data.directAnswer && (
        <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
          <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Category ASO Blueprint &amp; Benchmarks
          </div>
          <p className="mt-2 text-base font-medium leading-relaxed text-ink">
            {data.directAnswer.summary}
          </p>
          {data.directAnswer.takeaways && (
            <ul className="mt-3 space-y-1 text-sm text-ink/90">
              {data.directAnswer.takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* Seed Keywords Table */}
      <Section title={`High-Demand Seed Keywords: ${data.nicheName}`}>
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm text-ink">
            <thead className="border-b border-line bg-muted/10 font-display text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-3">Seed Keyword</th>
                <th className="p-3">Search Intent</th>
                <th className="p-3 text-accent">Est. Popularity</th>
                <th className="p-3">Est. Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.seedKeywords.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-surface" : "bg-muted/5"}>
                  <td className="p-3 font-semibold text-ink">{row.keyword}</td>
                  <td className="p-3 capitalize text-muted">{row.intent}</td>
                  <td className="p-3 text-accent font-bold">{row.estimatedPop} / 100</td>
                  <td className="p-3 text-ink/80">{row.estimatedDiff} / 100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Title & Subtitle Formulas */}
      <Section title="Title & Subtitle Stacking Patterns">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card pad="md" className="border border-line">
            <strong className="block text-xs font-semibold uppercase tracking-wider text-accent">
              Title Formula Patterns (30 chars)
            </strong>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {data.titleFormulas.map((f, i) => (
                <li key={i} className="font-mono text-xs bg-muted/10 p-2 rounded border border-line/60">
                  {f}
                </li>
              ))}
            </ul>
          </Card>
          <Card pad="md" className="border border-line">
            <strong className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Subtitle Stacking Patterns (30 chars)
            </strong>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {data.subtitleFormulas.map((f, i) => (
                <li key={i} className="font-mono text-xs bg-muted/10 p-2 rounded border border-line/60">
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Breakdown sections */}
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

      {/* FAQ */}
      {data.faq && data.faq.length > 0 && (
        <Section title="Frequently Asked Questions">
          <Faq items={data.faq} />
        </Section>
      )}

      {/* Related Categories */}
      <Section title="Explore More App Store Categories">
        <LinkCardGrid
          min={260}
          items={relatedCategories.map((c) => ({
            href: c.canonicalPath,
            title: c.nicheName,
            note: `${c.appStoreCategory} • Avg Pop ${c.benchmarkMetrics.averagePopularity}`,
            cta: "View category playbook",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
