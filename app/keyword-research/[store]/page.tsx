import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORES, POPULAR, flagOf } from "@/lib/types";
import { STORE_INFO } from "@/lib/seo/countries";
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { fitTitle, fitDescription, OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Pill from "@/app/ui/Pill";
import { LinkCardGrid } from "@/app/ui/LinkCard";

interface Props {
  params: Promise<{ store: string }>;
}

export async function generateStaticParams() {
  return STORES.map(([code]) => ({ store: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { store } = await params;
  const info = STORE_INFO[store];
  const [, name] = STORES.find(([code]) => code === store) ?? [];
  if (!name) return {};

  const tierLabel = info?.tier === "major"
    ? "major"
    : info?.tier === "mid"
    ? "mid-tier"
    : "emerging";

  // Country names run from "US" to "Federated States of Micronesia", so the
  // title is fitted rather than templated once.
  const title = fitTitle([
    `App Store Keyword Research: ${name} (${store.toUpperCase()}) | ASOGrade`,
    `App Store Keyword Research: ${name} | ASOGrade`,
    `ASO Keyword Research: ${name} | ASOGrade`,
    `ASO Keyword Research: ${name}`,
  ]);
  const description = fitDescription(
    info
      ? `${info.facts[0]} Research App Store keywords in the ${name} storefront — popularity, difficulty, and strategy for a ${tierLabel} market.`
      : `App Store keyword research guide for the ${name} (${store.toUpperCase()}) storefront — demand, difficulty, and localization strategy.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `/keyword-research/${store}` },
    openGraph: {
      images: [OG_IMAGE],
      title,
      description,
      url: `${SITE_URL}/keyword-research/${store}`,
      type: "article",
    },
  };
}

export default async function StorefrontPage({ params }: Props) {
  const { store } = await params;
  const storeEntry = STORES.find(([code]) => code === store);
  if (!storeEntry) notFound();

  const [code, name] = storeEntry;
  const info = STORE_INFO[code];
  const isMajor = POPULAR.includes(code);
  const flag = flagOf(code);

  const tierLabel = info?.tier === "major"
    ? "Major market"
    : info?.tier === "mid"
    ? "Mid-tier market"
    : "Emerging market";

  const faqItems = info
    ? [
        {
          q: `What language should I use for App Store keywords in ${name}?`,
          a: `The primary search language in ${name} is ${info.lang}. ${
            info.langCode === "en"
              ? "English metadata works well without additional localisation."
              : `Keywords in ${info.lang} are needed to capture most of the search demand. English-only metadata will miss the majority of ${name} App Store searches.`
          }`,
        },
        {
          q: `Is the ${name} App Store worth targeting?`,
          a: info?.tier === "major"
            ? `Yes — ${name} is one of the highest-volume App Store markets and worth treating as a primary target. Expect higher keyword difficulty than smaller markets.`
            : info?.tier === "mid"
            ? `${name} is a worthwhile secondary target. Keyword difficulty tends to be lower than the major markets for the same search intent, making it a good expansion market.`
            : `${name} is an emerging market with very low keyword difficulty for most categories. The user base is smaller, but competition is minimal — useful for testing keyword strategies with low cost.`,
        },
        {
          q: `How does ${name} keyword difficulty compare to the US?`,
          a: isMajor && code !== "us"
            ? `${name} typically runs 5–20 points lower difficulty than the US for the same keyword categories, despite similar or meaningful search volume. It is often a more accessible target.`
            : code === "us"
            ? `The US is the most competitive App Store market — keyword difficulty is consistently among the highest of any storefront. For the same keywords, secondary markets like UK, Canada, or Australia typically score 5–20 points lower.`
            : `${name}'s keyword difficulty is substantially below major markets for most categories. This makes it a low-effort way to capture App Store users in an underserved market.`,
        },
      ]
    : [];

  return (
    <PseoLayout
      current="/keyword-research"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: name },
      ]}
      schema={[
        webPageSchema({
          title: `App Store Keyword Research: ${name}`,
          description: `App Store keyword research guide for the ${name} (${code.toUpperCase()}) storefront.`,
          url: `${SITE_URL}/keyword-research/${code}`,
        }),
        faqSchema(faqItems),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Keyword Research by Storefront", url: `${SITE_URL}/keyword-research` },
          { name, url: `${SITE_URL}/keyword-research/${code}` },
        ]),
      ]}
      cta={{
        heading: `Research ${name} App Store keywords now`,
        body: `Score keywords in the ${name} storefront — popularity, difficulty, and competing apps count — across 109 markets in one workspace.`,
        label: "Start researching",
      }}
    >
      <PageHero
        badges={
          <>
            {flag && <span aria-hidden="true" className="text-xl leading-none">{flag}</span>}
            <Pill tone={info?.tier === "major" ? "accent" : "neutral"}>{tierLabel}</Pill>
          </>
        }
        title={`App Store Keyword Research: ${name}`}
        lead={
          info
            ? info.facts[0]
            : `A guide to App Store keyword research in the ${name} (${code.toUpperCase()}) storefront — what to know about demand, difficulty, and strategy before you localise.`
        }
      />

      {info && (
        <>
          <Section title="Market overview">
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Storefront code", code.toUpperCase()],
                ["Market tier", tierLabel],
                ["Primary search language", info.lang],
                ["Region", info.region.replace(/-/g, " ")],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0 rounded-md border border-line bg-surface px-4 py-3">
                  <dt className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">{k}</dt>
                  <dd className="mt-1 text-base font-semibold text-ink capitalize break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="What to know about this market">
            <Prose>
              {info.facts.map((fact, i) => (
                <p key={i}>{fact}</p>
              ))}
            </Prose>
          </Section>
        </>
      )}

      <Section title={`How to research keywords in ${name}`}>
        <Prose>
          <p>
            App Store keyword research in {name} follows the same process as any other
            storefront, but the numbers will differ — sometimes dramatically — from what
            you see in your primary market.
          </p>
          <ol>
            <li>
              <strong>Build a candidate list.</strong> Start with your core category
              keywords in {info?.langCode === "en" ? "English" : info?.lang ?? "the local language"},
              add competitor subtitle terms, and include any local-language search terms
              relevant to your app category.
            </li>
            <li>
              <strong>Score for popularity.</strong> Run each candidate in the {name}
              {" "}storefront specifically — popularity scores can differ significantly from
              other markets. Look for terms above 25.
            </li>
            <li>
              <strong>Check difficulty.</strong> Filter to terms with difficulty below{" "}
              {info?.tier === "major"
                ? "60 for an established app, below 45 for a newer app."
                : info?.tier === "mid"
                ? "50 — this market has meaningful volume with consistently lower competition than the major storefronts."
                : "40 — in this emerging market, most keyword slots are accessible even for newer apps."}
            </li>
            <li>
              <strong>Update metadata.</strong> Include the winning terms in your {name}
              {" "}storefront metadata — separate from your primary-market metadata if you
              have localised versions.
            </li>
          </ol>
        </Prose>
      </Section>

      <Section title={`Metadata allocation strategy for ${name}`}>
        <Prose>
          <p>
            When deploying metadata for the {name} storefront in App Store Connect,
            allocate your character budget deliberately across the three indexable fields:
          </p>
          <ul>
            <li>
              <strong>App Name (30 characters):</strong> Place your highest-volume primary
              keyword for {name} alongside your brand name. This field carries the
              strongest ranking weight in Apple&apos;s algorithm.
            </li>
            <li>
              <strong>Subtitle (30 characters):</strong> Feature 2–3 secondary keywords
              describing your core value proposition in {info?.lang ?? "the local language"}.
              The subtitle is visible in search results and directly affects conversion.
            </li>
            <li>
              <strong>Keyword Field (100 characters):</strong> Enter comma-separated single
              words that extend your reach across {name} search queries. Avoid repeating
              words already used in your title or subtitle to prevent wasting character
              budget.
            </li>
          </ul>
        </Prose>
      </Section>

      {faqItems.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={faqItems} />
        </Section>
      )}

      <Section title="Other storefronts to compare">
        <LinkCardGrid
          min={200}
          items={STORES.filter(([c]) => POPULAR.includes(c) && c !== code)
            .slice(0, 8)
            .map(([c, n]) => ({
              href: `/keyword-research/${c}`,
              title: `${flagOf(c)} ${n}`,
            }))}
        />
        <Link
          href="/keyword-research"
          className="mt-4 inline-block text-sm font-semibold text-accent no-underline hover:underline"
        >
          View all 109 storefronts →
        </Link>
      </Section>
    </PseoLayout>
  );
}
