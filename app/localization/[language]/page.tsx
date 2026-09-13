import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALIZATIONS } from "@/lib/seo/localization";
import {
  LOCALIZATION_ENTITIES,
  CROSS_LOCALIZATION_ENTITIES,
  PRIORITY_CROSS_LOCALIZATION_SLUGS,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  buildSoftwareApplicationSchema,
  SITE_URL,
  type LocalizationEntity,
  type CrossLocalizationEntity,
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
  params: Promise<{ language: string }>;
}

export async function generateStaticParams() {
  return [
    ...LOCALIZATION_ENTITIES.map((l) => ({ language: l.slug })),
    ...PRIORITY_CROSS_LOCALIZATION_SLUGS.map((slug) => ({ language: slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const crossLoc = getPseoEntity("cross-localization", language) as CrossLocalizationEntity | null;
  if (crossLoc) {
    return buildPseoMetadata({
      titleCandidates: [crossLoc.metaTitle ?? crossLoc.title, crossLoc.title],
      descriptionCandidates: [crossLoc.description],
      canonicalPath: crossLoc.canonicalPath,
      type: "article",
    });
  }

  const loc = LOCALIZATIONS.find((l) => l.slug === language);
  if (!loc) return {};

  return buildPseoMetadata({
    titleCandidates: [
      `${loc.metaTitle ?? loc.title} | ASOGrade`,
      loc.metaTitle ?? loc.title,
    ],
    descriptionCandidates: [loc.description],
    canonicalPath: `/localization/${language}`,
    type: "article",
  });
}

export default async function LocalizationPage({ params }: Props) {
  const { language } = await params;
  const crossLoc = getPseoEntity("cross-localization", language) as CrossLocalizationEntity | null;

  if (crossLoc) {
    const relatedPairings = CROSS_LOCALIZATION_ENTITIES.filter(
      (c) =>
        c.slug !== crossLoc.slug &&
        (c.fromStoreCode === crossLoc.fromStoreCode || c.toStoreCode === crossLoc.toStoreCode)
    ).slice(0, 6);

    const jsonLdGraph = buildUnifiedGraphSchema([
      buildWebPageSchema({
        title: crossLoc.title,
        description: crossLoc.description,
        url: `${SITE_URL}${crossLoc.canonicalPath}`,
      }),
      buildBreadcrumbSchema([
        { name: "ASOGrade", url: SITE_URL },
        { name: "Localization", url: `${SITE_URL}/localization` },
        {
          name: `${crossLoc.fromStoreName} to ${crossLoc.toStoreName}`,
          url: `${SITE_URL}${crossLoc.canonicalPath}`,
        },
      ]),
      buildSoftwareApplicationSchema(),
      buildFaqSchema(crossLoc.faq ?? []),
    ]);

    return (
      <PseoLayout
        current="/localization"
        trail={[
          { label: "ASOGrade", href: "/" },
          { label: "Localization", href: "/localization" },
          { label: `${crossLoc.fromStoreName} to ${crossLoc.toStoreName}` },
        ]}
        schema={jsonLdGraph}
        cta={{
          heading: `Score keywords for ${crossLoc.toStoreName}`,
          body: `Analyze Apple Search Ads demand and difficulty for ${crossLoc.toStoreName} directly in your browser.`,
        }}
      >
        <PageHero
          kicker="Storefront Localization Playbook"
          title={crossLoc.title}
          lead={crossLoc.description}
        />

        {crossLoc.directAnswer && (
          <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
            <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Cross-Storefront Blueprint &amp; Indexing Rules
            </div>
            <p className="mt-2 text-base font-medium leading-relaxed text-ink">
              {crossLoc.directAnswer.summary}
            </p>
            {crossLoc.directAnswer.takeaways && (
              <ul className="mt-3 space-y-1 text-sm text-ink/90">
                {crossLoc.directAnswer.takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        <Section title="Metadata Translation & Character Strategy">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card pad="md" className="border border-line">
              <strong className="block text-xs uppercase tracking-wider text-accent font-semibold">
                Title (30 chars)
              </strong>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {crossLoc.metadataAdjustments.titleAdvice}
              </p>
            </Card>
            <Card pad="md" className="border border-line">
              <strong className="block text-xs uppercase tracking-wider text-muted font-semibold">
                Subtitle (30 chars)
              </strong>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {crossLoc.metadataAdjustments.subtitleAdvice}
              </p>
            </Card>
            <Card pad="md" className="border border-line">
              <strong className="block text-xs uppercase tracking-wider text-muted font-semibold">
                Keyword Field (100 chars)
              </strong>
              <p className="mt-1 text-sm text-ink leading-relaxed">
                {crossLoc.metadataAdjustments.keywordAdvice}
              </p>
            </Card>
          </div>
        </Section>

        {crossLoc.translationChecklist && (
          <Section title="Localization Checklist">
            <ul className="space-y-2">
              {crossLoc.translationChecklist.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-md border border-line bg-surface p-3 text-sm text-ink"
                >
                  <span className="text-accent font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {crossLoc.breakdown && (
          <div className="space-y-8">
            {crossLoc.breakdown.map((sec, idx) => (
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

        {crossLoc.faq && crossLoc.faq.length > 0 && (
          <Section title="Frequently Asked Questions">
            <Faq items={crossLoc.faq} />
          </Section>
        )}

        <Section title="Other Localization Playbooks">
          <LinkCardGrid
            min={260}
            items={relatedPairings.map((p) => ({
              href: p.canonicalPath,
              title: `${p.fromStoreName} → ${p.toStoreName}`,
              note: `ASO strategy from ${p.fromStoreName} to ${p.toStoreName}`,
              cta: "Read playbook",
            }))}
          />
        </Section>
      </PseoLayout>
    );
  }

  const loc = LOCALIZATIONS.find((l) => l.slug === language);
  if (!loc) notFound();

  const others = LOCALIZATION_ENTITIES.filter((l) => l.slug !== loc.slug);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: loc.title,
      description: loc.description,
      url: `${SITE_URL}/localization/${loc.slug}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Localization", url: `${SITE_URL}/localization` },
      { name: loc.language, url: `${SITE_URL}/localization/${loc.slug}` },
    ]),
    buildFaqSchema(loc.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/localization"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Localization", href: "/localization" },
        { label: loc.language },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: `Get started across every ${loc.language} storefront`,
        body: "Paste your candidate list and check real demand and difficulty in each market, in seconds.",
      }}
    >
      <PageHero
        kicker="Localization"
        badges={<Pill>{loc.storefronts.length} storefronts</Pill>}
        title={loc.title}
        lead={loc.subtitle}
      />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
        <strong className="block font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
          Storefronts covered by {loc.language} metadata
        </strong>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {loc.storefronts.map((s) => (
            <Link
              key={s.code}
              href={`/keyword-research/${s.code}`}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink no-underline transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </Card>

      <Prose className="mt-8">
        {loc.breakdown.map((section, idx) => (
          <section key={idx}>
            <h2>{section.heading}</h2>
            {section.points.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}
      </Prose>

      <Section
        title="What a straight translation misses"
        note="Register, dialect, and script adjustments worth checking before you reuse one market's list in another."
      >
        <Prose>
          <ul>
            {loc.registerNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </Prose>
      </Section>

      {loc.faq && loc.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={loc.faq} />
        </Section>
      )}

      <Section title="Other languages">
        <LinkCardGrid
          min={260}
          items={others.map((l) => ({
            href: `/localization/${l.slug}`,
            title: l.language,
            note: l.description,
            cta: "Read more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
