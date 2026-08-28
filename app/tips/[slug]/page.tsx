import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TIPS } from "@/lib/seo/tips";
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tip = TIPS.find((t) => t.slug === slug);
  if (!tip) return {};

  const title = fitTitle([`${tip.metaTitle ?? tip.question} | ASOGrade`, tip.metaTitle ?? tip.question]);
  const description = fitDescription(tip.shortAnswer);

  return {
    title,
    description,
    alternates: { canonical: `/tips/${slug}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/tips/${slug}`,
      type: "article",
    },
  };
}

export default async function TipPage({ params }: Props) {
  const { slug } = await params;
  const tip = TIPS.find((t) => t.slug === slug);
  if (!tip) notFound();

  const fullAnswer = [tip.shortAnswer, ...tip.explanation].join(" ");
  const faqItems = [{ q: tip.question, a: fullAnswer }, ...(tip.followUp ?? [])];

  const related = tip.related
    .map((r) => {
      const href = r.type === "guide" ? `/guides/${r.slug}` : r.type === "glossary" ? `/glossary/${r.slug}` : `/tips/${r.slug}`;
      return { href, title: r.label, cta: "Read more" };
    })
    .filter((r) => r.href !== `/tips/${tip.slug}`);

  return (
    <PseoLayout
      current="/tips"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Tips", href: "/tips" },
        { label: tip.question },
      ]}
      schema={[
        webPageSchema({
          title: tip.question,
          description: tip.shortAnswer,
          url: `${SITE_URL}/tips/${tip.slug}`,
        }),
        faqSchema(faqItems),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Tips", url: `${SITE_URL}/tips` },
          { name: tip.question, url: `${SITE_URL}/tips/${tip.slug}` },
        ]),
      ]}
      cta={{
        heading: "Check it against your own keywords",
        body: "Paste your candidate list and read real popularity, difficulty, and competing app count in seconds.",
      }}
    >
      <PageHero title={tip.question} />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent">
        <p className="text-base font-semibold leading-relaxed text-ink">{tip.shortAnswer}</p>
      </Card>

      <Prose className="mt-8">
        {tip.explanation.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Prose>

      {tip.followUp && tip.followUp.length > 0 && (
        <Section title="Related questions">
          <Faq items={tip.followUp} />
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
          items={TIPS.filter((t) => t.slug !== tip.slug)
            .slice(0, 6)
            .map((t) => ({ href: `/tips/${t.slug}`, title: t.question, note: t.shortAnswer, cta: "Read the answer" }))}
        />
      </Section>
    </PseoLayout>
  );
}
