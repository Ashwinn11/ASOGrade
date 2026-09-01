import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TIPS } from "@/lib/seo/tips";
import {
  TIP_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  fitDescription,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  SITE_URL,
  type TipEntity,
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
  return TIP_ENTITIES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tip = getPseoEntity("tip", slug) as TipEntity | null;
  if (!tip) return {};

  const fullDescription =
    tip.shortAnswer.length < 50
      ? `${tip.shortAnswer} ${tip.explanation[0] ?? ""}`.trim()
      : tip.shortAnswer;

  return buildPseoMetadata({
    titleCandidates: [
      `${tip.metaTitle ?? tip.title} | ASOGrade`,
      tip.metaTitle ?? tip.title,
      fitDescription(tip.title, 55),
      "ASO Tips | ASOGrade",
    ],
    descriptionCandidates: [fullDescription, tip.explanation[0] ?? tip.description],
    canonicalPath: tip.canonicalPath,
    type: "article",
  });
}

export default async function TipPage({ params }: Props) {
  const { slug } = await params;
  const rawTip = TIPS.find((t) => t.slug === slug);
  if (!rawTip) notFound();

  const fullAnswer = [rawTip.shortAnswer, ...rawTip.explanation].join(" ");
  const faqItems = [{ q: rawTip.question, a: fullAnswer }, ...(rawTip.followUp ?? [])];

  const related = rawTip.related
    .map((r) => {
      const href =
        r.type === "guide"
          ? `/guides/${r.slug}`
          : r.type === "glossary"
          ? `/glossary/${r.slug}`
          : `/tips/${r.slug}`;
      return { href, title: r.label, cta: "Read more" };
    })
    .filter((r) => r.href !== `/tips/${rawTip.slug}`);

  const moreTips = TIP_ENTITIES.filter((t) => t.slug !== rawTip.slug).slice(0, 6);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: rawTip.question,
      description: rawTip.shortAnswer,
      url: `${SITE_URL}/tips/${rawTip.slug}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Tips", url: `${SITE_URL}/tips` },
      { name: rawTip.question, url: `${SITE_URL}/tips/${rawTip.slug}` },
    ]),
    buildFaqSchema(faqItems),
  ]);

  return (
    <PseoLayout
      current="/tips"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Tips", href: "/tips" },
        { label: rawTip.question },
      ]}
      schema={jsonLdGraph}
      cta={{
        heading: "Check it against your own keywords",
        body: "Paste your candidate list and read real popularity, difficulty, and competing app count in seconds.",
      }}
    >
      <PageHero title={rawTip.question} />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
        <span className="text-2xs font-bold uppercase tracking-wider text-accent">
          Direct Answer / Quick Summary
        </span>
        <p className="mt-1 text-base font-semibold leading-relaxed text-ink">
          {rawTip.shortAnswer}
        </p>
      </Card>

      <Prose className="mt-8">
        {rawTip.explanation.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {(rawTip as { ruleOfThumb?: string }).ruleOfThumb && (
        <Card tone="surface" className="mt-6 border-l-[3px] border-l-[var(--color-ink)]" pad="md">
          <strong className="block text-xs font-bold uppercase tracking-wider text-ink">
            Rule of Thumb
          </strong>
          <p className="mt-1 text-sm text-ink-2 leading-relaxed">
            {(rawTip as { ruleOfThumb?: string }).ruleOfThumb}
          </p>
        </Card>
      )}

      {rawTip.followUp && rawTip.followUp.length > 0 && (
        <Section title="Related questions">
          <Faq items={rawTip.followUp} />
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Go deeper">
          <LinkCardGrid min={260} items={related} />
        </Section>
      )}

      <Section title="More quick answers">
        <LinkCardGrid
          min={280}
          items={moreTips.map((t) => ({
            href: `/tips/${t.slug}`,
            title: t.title,
            note: t.shortAnswer,
            cta: "Read the answer",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
