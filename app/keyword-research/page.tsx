import type { Metadata } from "next";
import Link from "next/link";
import { STORES, POPULAR, flagOf } from "@/lib/types";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

/* Retitled to lead with the modifier rather than the head term.
   Five pages carried "app store keyword research" in title and H1 while the
   homepage, which has the most internal links on the domain, carried it in
   neither. The homepage now owns the bare term; every page below it leads with
   what makes it different — by storefront, how-to, fast, affordable. */
export const metadata: Metadata = {
  title: `App Store Keyword Research by Storefront: ${STORES.length} Markets`,
  description:
    "App Store keyword research guides for all 109 storefronts — which markets have the best demand-to-difficulty ratio, from the US to emerging markets.",
  alternates: { canonical: "/keyword-research" },
  openGraph: {
    images: [OG_IMAGE],
    title: `App Store Keyword Research by Storefront: ${STORES.length} Markets`,
    description:
      "App Store keyword research guides for all 109 storefronts. Find out which markets have the best demand-to-difficulty ratio for your category.",
    url: `${SITE_URL}/keyword-research`,
    type: "website",
  },
};

const popular = STORES.filter(([code]) => POPULAR.includes(code));
const others = STORES.filter(([code]) => !POPULAR.includes(code));

const TIERS = [
  {
    name: "Tier 1: Major Markets",
    body: "Markets with highest search volume and deepest competition (US, GB, DE, JP, CN). Target keywords with difficulty below 55–60 for established apps, or prioritise high-intent long-tail phrases.",
  },
  {
    name: "Tier 2: Mid-Tier Markets",
    body: "Strong purchasing power with 10–25 point lower keyword difficulty than the US (CA, AU, FR, IT, ES, BR, KR). Highest ROI for secondary English metadata and first-phase local language translations.",
  },
  {
    name: "Tier 3: Emerging Markets",
    body: "Fast-growing smartphone markets with minimal ranking barriers (IN, ID, VN, NG, MX, TR). Ideal for testing keyword candidate sets and capturing organic volume with early market authority.",
  },
];

export default function KeywordResearchHub() {
  return (
    <PseoLayout
      current="/keyword-research"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Keyword Research by Storefront" }]}
      schema={[
        collectionPageSchema({
          title: "App Store Keyword Research by Storefront",
          description:
            "App Store keyword research guides for all 109 storefronts, covering market tier, primary language, and keyword strategy for each market.",
          url: `${SITE_URL}/keyword-research`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Keyword Research by Storefront", url: `${SITE_URL}/keyword-research` },
        ]),
      ]}
      cta={{
        heading: "Research keywords across all 109 storefronts",
        body: "Score any keyword for popularity and difficulty in any storefront. Paste 100 ideas and read the numbers — no install required.",
        label: "Start keyword research",
      }}
    >
      <PageHero
        title="App Store Keyword Research by Storefront"
        lead="The same keyword scores differently in every market. These guides cover all 109 App Store storefronts — market tier, primary search language, and what to expect from demand and difficulty in each."
      />

      <Section title="Major markets" note="The highest-volume storefronts, and the most competitive.">
        <StoreGrid stores={popular} />
      </Section>

      <Section
        title="All other storefronts"
        note="Mid-tier and emerging markets — often dramatically lower keyword difficulty for the same search intent."
      >
        <StoreGrid stores={others} />
      </Section>

      <Section title="Storefront strategy & tier classification">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
          {TIERS.map((t) => (
            <Card key={t.name}>
              <strong className="block text-lg font-bold text-accent">{t.name}</strong>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Related localization & keyword guides">
        <LinkCardGrid
          items={[
            {
              href: "/guides/multi-storefront-keyword-research",
              title: "Multi-Storefront Keyword Research",
              note: "How to prioritise markets and find keyword opportunities across 109 App Stores.",
              cta: "Read guide",
            },
            {
              href: "/glossary/localization-aso",
              title: "ASO Localization Guide",
              note: "How local language metadata unlocks lower difficulty in international markets.",
              cta: "Read definition",
            },
            {
              href: "/solutions/international-markets",
              title: "Storefront Prioritization Solution",
              note: "Deciding which countries to target before paying for translation.",
              cta: "Read solution",
            },
          ]}
        />
      </Section>
    </PseoLayout>
  );
}

/** A dense, wrapping grid of storefront links. */
function StoreGrid({ stores }: { stores: [string, string][] }) {
  return (
    <ul className="grid list-none gap-2 [grid-template-columns:repeat(auto-fill,minmax(min(190px,100%),1fr))]">
      {stores.map(([code, name]) => (
        <li key={code} className="min-w-0">
          <Link
            href={`/keyword-research/${code}`}
            className="flex min-w-0 items-center gap-2 rounded-md border border-line bg-surface px-3 py-2.5 no-underline transition-colors duration-150 hover:border-tint-line hover:bg-hover"
          >
            <span aria-hidden="true" className="shrink-0 text-base leading-none">
              {flagOf(code)}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{name}</span>
            <span className="shrink-0 font-mono text-2xs text-faint">{code.toUpperCase()}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
