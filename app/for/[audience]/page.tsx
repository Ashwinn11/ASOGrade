import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PERSONA_ENTITIES,
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  SITE_URL,
  type PersonaEntity,
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
  params: Promise<{ audience: string }>;
}

export async function generateStaticParams() {
  return PERSONA_ENTITIES.map((p) => ({ audience: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { audience } = await params;
  const persona = getPseoEntity("persona", audience) as PersonaEntity | null;
  if (!persona) return {};

  return buildPseoMetadata({
    titleCandidates: [
      `${persona.metaTitle ?? persona.title} | ASOGrade`,
      persona.metaTitle ?? persona.title,
    ],
    descriptionCandidates: [persona.description],
    canonicalPath: persona.canonicalPath,
    type: "article",
  });
}

export default async function PersonaPage({ params }: Props) {
  const { audience } = await params;
  const persona = getPseoEntity("persona", audience) as PersonaEntity | null;
  if (!persona) notFound();

  const others = PERSONA_ENTITIES.filter((p) => p.slug !== persona.slug);

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: persona.title,
      description: persona.description,
      url: `${SITE_URL}${persona.canonicalPath}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "For", url: `${SITE_URL}/for` },
      { name: persona.audience, url: `${SITE_URL}${persona.canonicalPath}` },
    ]),
    buildFaqSchema(persona.faq ?? []),
  ]);

  return (
    <PseoLayout
      current="/for"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "For", href: "/for" },
        { label: persona.audience },
      ]}
      schema={jsonLdGraph}
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

      {persona.faq && persona.faq.length > 0 && (
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
