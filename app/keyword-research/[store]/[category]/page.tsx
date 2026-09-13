import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  STOREFRONT_CATEGORY_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSoftwareApplicationSchema,
  SITE_URL,
  type StorefrontCategoryEntity,
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
  params: Promise<{ store: string; category: string }>;
}

export async function generateStaticParams() {
  // Pre-generate Tier-1 combinations for static speed
  const priorityStores = ["us", "gb", "jp", "de"];
  const priorityCategories = ["fitness-workout", "habit-tracker", "budget-finance", "ai-photo-editor"];
  const params: { store: string; category: string }[] = [];

  for (const s of priorityStores) {
    for (const c of priorityCategories) {
      params.push({ store: s, category: c });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { store, category } = await params;
  const slug = `${store.toLowerCase()}-${category.toLowerCase()}`;
  const data = getPseoEntity("storefront-category", slug) as StorefrontCategoryEntity | null;
  if (!data) return {};

  return buildPseoMetadata({
    titleCandidates: [data.metaTitle ?? `${data.nicheName} ASO: ${data.storeName}`, data.title],
    descriptionCandidates: [data.description],
    canonicalPath: data.canonicalPath,
    type: "article",
  });
}

export default async function StorefrontCategoryPage({ params }: Props) {
  const { store, category } = await params;
  const slug = `${store.toLowerCase()}-${category.toLowerCase()}`;
  const data = getPseoEntity("storefront-category", slug) as StorefrontCategoryEntity | null;
  if (!data) notFound();

  // Related categories in this market
  const otherCategoriesInStore = STOREFRONT_CATEGORY_ENTITIES.filter(
    (e) => e.storeCode === data.storeCode && e.nicheId !== data.nicheId
  ).slice(0, 6);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: data.title,
      description: data.description,
      url: `${SITE_URL}${data.canonicalPath}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Keyword Research", url: `${SITE_URL}/keyword-research` },
      { name: data.storeName, url: `${SITE_URL}/keyword-research/${data.storeCode}` },
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
        { label: data.storeName, href: `/keyword-research/${data.storeCode}` },
        { label: data.nicheName },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: `Score ${data.nicheName} keywords in ${data.storeName}`,
        body: `Analyze Apple Search Ads demand and ranking difficulty across ${data.storeName} and 108 other App Store territories.`,
      }}
    >
      <PageHero
        kicker={`${data.storeName} (${data.storeCode.toUpperCase()}) • ${data.nicheName}`}
        title={data.title}
        lead={data.description}
      />

      {/* AEO Direct Answer Summary */}
      {data.directAnswer && (
        <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
          <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Market &amp; Category Strategy Summary
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

      {/* Market Metrics Grid */}
      <Section title="Market Dynamics & Opportunity">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card pad="sm" className="border border-line">
            <strong className="block text-xs uppercase tracking-wider text-muted">Storefront Tier</strong>
            <p className="mt-1 font-display text-lg font-bold text-ink capitalize">
              {data.localizedMetrics.storefrontTier}
            </p>
          </Card>
          <Card pad="sm" className="border border-line">
            <strong className="block text-xs uppercase tracking-wider text-muted">Difficulty Delta</strong>
            <p className="mt-1 font-display text-lg font-bold text-accent">
              {data.localizedMetrics.difficultyDiscount === 0
                ? "Baseline (US)"
                : `${data.localizedMetrics.difficultyDiscount} pts vs US`}
            </p>
          </Card>
          <Card pad="sm" className="border border-line">
            <strong className="block text-xs uppercase tracking-wider text-muted">Script Density</strong>
            <p className="mt-1 font-display text-lg font-bold text-ink">
              {data.localizedMetrics.scriptEfficiency}x Latin
            </p>
          </Card>
          <Card pad="sm" className="border border-line">
            <strong className="block text-xs uppercase tracking-wider text-muted">Opportunity Index</strong>
            <p className="mt-1 font-display text-lg font-bold text-accent">
              {data.localizedMetrics.marketOpportunityScore} / 100
            </p>
          </Card>
        </div>
      </Section>

      {/* Localized Strategy */}
      {data.storefrontStrategy && data.storefrontStrategy.length > 0 && (
        <Section title="Storefront Strategy Highlights">
          <ul className="space-y-2">
            {data.storefrontStrategy.map((s, idx) => (
              <li key={idx} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3 text-sm text-ink">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-bold text-accent">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

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

      {/* Other categories in this market */}
      <Section title={`More Categories in ${data.storeName}`}>
        <LinkCardGrid
          min={260}
          items={otherCategoriesInStore.map((c) => ({
            href: c.canonicalPath,
            title: `${c.nicheName} (${data.storeCode.toUpperCase()})`,
            note: `ASO strategy in ${data.storeName}`,
            cta: "View market playbook",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
