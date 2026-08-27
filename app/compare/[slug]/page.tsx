import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MATURITY_LINE, MATURITY_NOTE } from "@/app/onboarding/solutions";
import { COMPARE_DATA } from "@/lib/seo/compare";
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
  return COMPARE_DATA.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARE_DATA.find((d) => d.slug === slug);
  if (!data) return {};

  const title = fitTitle([`${data.title} | ASOGrade`, data.title]);
  const description = fitDescription(data.description);

  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/compare/${slug}`,
      type: "article",
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const data = COMPARE_DATA.find((d) => d.slug === slug);
  if (!data) notFound();

  const others = COMPARE_DATA.filter((d) => d.slug !== data.slug);

  return (
    <PseoLayout
      current="/compare"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Compare", href: "/compare" },
        { label: data.title },
      ]}
      schema={[
        webPageSchema({
          title: data.title,
          description: data.description,
          url: `${SITE_URL}/compare/${data.slug}`,
        }),
        faqSchema(data.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Compare", url: `${SITE_URL}/compare` },
          { name: data.title, url: `${SITE_URL}/compare/${data.slug}` },
        ]),
      ]}
      cta={{
        heading: "Try the research pass on its own",
        body: "Paste 100 keyword ideas and read popularity, difficulty, and competing app count across 109 storefronts — in seconds.",
      }}
    >
      <PageHero kicker="Compare" title={data.title} lead={data.subtitle} />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent">
        <strong className="block font-display text-lg font-bold text-ink">
          {MATURITY_LINE[data.maturityKey]}
        </strong>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {MATURITY_NOTE[data.maturityKey]}
        </p>
      </Card>

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

      {data.faq.length > 0 && (
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
