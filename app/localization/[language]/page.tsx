import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALIZATIONS } from "@/lib/seo/localization";
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Card from "@/app/ui/Card";
import Pill from "@/app/ui/Pill";
import { LinkCardGrid } from "@/app/ui/LinkCard";

interface Props {
  params: Promise<{ language: string }>;
}

export async function generateStaticParams() {
  return LOCALIZATIONS.map((l) => ({ language: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const loc = LOCALIZATIONS.find((l) => l.slug === language);
  if (!loc) return {};

  const title = fitTitle([`${loc.metaTitle ?? loc.title} | ASOGrade`, loc.metaTitle ?? loc.title]);
  const description = fitDescription(loc.description);

  return {
    title,
    description,
    alternates: { canonical: `/localization/${language}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/localization/${language}`,
      type: "article",
    },
  };
}

export default async function LocalizationPage({ params }: Props) {
  const { language } = await params;
  const loc = LOCALIZATIONS.find((l) => l.slug === language);
  if (!loc) notFound();

  const others = LOCALIZATIONS.filter((l) => l.slug !== loc.slug);

  return (
    <PseoLayout
      current="/localization"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Localization", href: "/localization" },
        { label: loc.language },
      ]}
      schema={[
        webPageSchema({
          title: loc.title,
          description: loc.description,
          url: `${SITE_URL}/localization/${loc.slug}`,
        }),
        faqSchema(loc.faq),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Localization", url: `${SITE_URL}/localization` },
          { name: loc.language, url: `${SITE_URL}/localization/${loc.slug}` },
        ]),
      ]}
      cta={{
        heading: `Score your keywords across every ${loc.language} storefront`,
        body: "Paste your candidate list and check real demand and difficulty in each market, in seconds.",
      }}
    >
      <PageHero
        kicker="Localization"
        badges={<Pill>{loc.storefronts.length} storefronts</Pill>}
        title={loc.title}
        lead={loc.subtitle}
      />

      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent">
        <strong className="block font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
          Storefronts covered
        </strong>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {loc.storefronts.map((s) => (
            <Link
              key={s.code}
              href={`/keyword-research/${s.code}`}
              className="rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-ink no-underline transition-colors duration-150 hover:border-accent hover:text-accent"
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

      {loc.faq.length > 0 && (
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
            note: l.subtitle,
            cta: "Read more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
