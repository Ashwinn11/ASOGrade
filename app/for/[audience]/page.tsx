import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PERSONAS } from "@/lib/seo/personas";
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
  params: Promise<{ audience: string }>;
}

export async function generateStaticParams() {
  return PERSONAS.map((p) => ({ audience: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { audience } = await params;
  const persona = PERSONAS.find((p) => p.slug === audience);
  if (!persona) return {};

  const title = fitTitle([`${persona.metaTitle ?? persona.title} | ASOGrade`, persona.metaTitle ?? persona.title]);
  const description = fitDescription(persona.description);

  return {
    title,
    description,
    alternates: { canonical: `/for/${audience}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/for/${audience}`,
      type: "article",
    },
  };
}

export default async function PersonaPage({ params }: Props) {
  const { audience } = await params;
  const persona = PERSONAS.find((p) => p.slug === audience);
  if (!persona) notFound();

  const others = PERSONAS.filter((p) => p.slug !== persona.slug);

  return (
    <PseoLayout
      current="/for"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "For", href: "/for" },
        { label: persona.audience },
      ]}
      schema={[
        webPageSchema({
          title: persona.title,
          description: persona.description,
          url: `${SITE_URL}/for/${persona.slug}`,
        }),
        faqSchema(persona.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "For", url: `${SITE_URL}/for` },
          { name: persona.audience, url: `${SITE_URL}/for/${persona.slug}` },
        ]),
      ]}
      cta={{
        heading: "See it with your own keywords",
        body: "Paste your candidate list and read popularity, difficulty, and competing app count across 109 storefronts.",
      }}
    >
      <PageHero kicker="For" title={persona.title} lead={persona.subtitle} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card tone="sunken" className="border-l-[3px] border-l-accent">
          <strong className="block font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
            Good fit if
          </strong>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
            {persona.goodFit.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card tone="sunken" className="border-l-[3px] border-l-[var(--color-muted)]">
          <strong className="block font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
            Not a fit if
          </strong>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
            {persona.notGoodFit.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Prose className="mt-8">
        {persona.breakdown.map((section, idx) => (
          <section key={idx}>
            <h2>{section.heading}</h2>
            {section.points.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}
      </Prose>

      <Section title="How it works for this workflow">
        <Prose>
          <ol>
            {persona.howItWorks.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Prose>
      </Section>

      {persona.faq.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={persona.faq} />
        </Section>
      )}

      <Section title="Other roles">
        <LinkCardGrid
          min={260}
          items={others.map((p) => ({
            href: `/for/${p.slug}`,
            title: p.audience,
            note: p.subtitle,
            cta: "Read more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
