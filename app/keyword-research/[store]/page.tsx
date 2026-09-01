import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORES, POPULAR, flagOf } from "@/lib/types";
import {
  STORE_INFO,
  relatedStores,
  languageReach,
  scriptOf,
  SCRIPT_NOTE,
} from "@/lib/seo/countries";
import {
  getPseoEntity,
  buildPseoMetadata,
  buildUnifiedGraphSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  generateStorefrontInsights,
  getStorefrontContextualLinks,
  SITE_URL,
  type StorefrontEntity,
} from "@/lib/seo/engine";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import Prose from "@/app/ui/Prose";
import Faq from "@/app/ui/Faq";
import Pill from "@/app/ui/Pill";
import Card from "@/app/ui/Card";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const dynamicParams = true;
export const revalidate = 86400;

interface Props {
  params: Promise<{ store: string }>;
}

export async function generateStaticParams() {
  return STORES.map(([code]) => ({ store: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { store } = await params;
  const entity = getPseoEntity("storefront", store) as StorefrontEntity | null;
  const storeEntry = STORES.find(([code]) => code === store.toLowerCase());
  if (!storeEntry || !entity) return {};

  const [, name] = storeEntry;
  const reachCount = entity.marketMetrics.languageReachCount;
  const reachPhrase =
    reachCount === 0
      ? `${entity.lang} metadata reaches this storefront alone.`
      : `One ${entity.lang} keyword field covers ${reachCount + 1} storefronts.`;

  return buildPseoMetadata({
    titleCandidates: [
      `App Store Keyword Research: ${name} (${store.toUpperCase()}) | ASOGrade`,
      `App Store Keyword Research: ${name} | ASOGrade`,
      `ASO Keyword Research: ${name} | ASOGrade`,
      `ASO Keyword Research: ${name}`,
    ],
    descriptionCandidates: [
      `Score App Store keywords for the ${name} storefront: real search demand, ranking difficulty, and what to put in your 100 characters. ${reachPhrase}`,
      `App Store keyword research for ${name}. Search demand, ranking difficulty, and metadata strategy for a ${entity.tier} market.`,
      `App Store keyword research for the ${name} storefront: demand, difficulty and metadata strategy.`,
    ],
    canonicalPath: `/keyword-research/${store.toLowerCase()}`,
    type: "article",
  });
}

export default async function StorefrontPage({ params }: Props) {
  const { store } = await params;
  const code = store.toLowerCase();
  const storeEntry = STORES.find(([c]) => c === code);
  if (!storeEntry) notFound();

  const [, name] = storeEntry;
  const entity = getPseoEntity("storefront", code) as StorefrontEntity;
  const info = STORE_INFO[code];
  const isMajor = POPULAR.includes(code);
  const flag = flagOf(code);

  const allCodes = STORES.map(([c]) => c);
  const reach = languageReach(code, allCodes);
  const related = relatedStores(code, allCodes, POPULAR);
  const script = scriptOf(info?.langCode ?? "en");
  const isEnglish = info?.langCode === "en";

  const tierLabel =
    entity.tier === "major"
      ? "Major market"
      : entity.tier === "mid"
      ? "Mid-tier market"
      : "Emerging market";

  const { directAnswer, metadataPlaybook, metricsAnalysis } =
    generateStorefrontInsights(entity);

  const contextualLinks = getStorefrontContextualLinks(code);

  const faqItems = entity.faq ?? [];

  const jsonLdGraph = buildUnifiedGraphSchema([
    buildWebPageSchema({
      title: `App Store Keyword Research: ${name} (${code.toUpperCase()})`,
      description: entity.description,
      url: `${SITE_URL}/keyword-research/${code}`,
    }),
    buildBreadcrumbSchema([
      { name: "ASOGrade", url: SITE_URL },
      { name: "Keyword Research by Storefront", url: `${SITE_URL}/keyword-research` },
      { name, url: `${SITE_URL}/keyword-research/${code}` },
    ]),
    buildFaqSchema(faqItems),
  ]);

  return (
    <PseoLayout
      current="/keyword-research"
      trail={[
        { label: "ASOGrade", href: "/" },
        { label: "Keyword Research", href: "/keyword-research" },
        { label: name },
      ]}
      schema={jsonLdGraph}
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
            <Pill tone={entity.tier === "major" ? "accent" : "neutral"}>{tierLabel}</Pill>
          </>
        }
        title={`App Store Keyword Research: ${name}`}
        lead={
          info
            ? info.facts[0]
            : `A guide to App Store keyword research in the ${name} (${code.toUpperCase()}) storefront — what to know about demand, difficulty, and strategy before you localise.`
        }
      />

      {/* AEO / GEO Direct Answer Block */}
      <Card tone="sunken" className="mt-6 border-l-[3px] border-l-accent" pad="md">
        <div className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-accent">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          {directAnswer.heading}
        </div>
        <p className="mt-2 text-base font-medium leading-relaxed text-ink">
          {directAnswer.summary}
        </p>
        {directAnswer.takeaways && (
          <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
            {directAnswer.takeaways.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Section title="Market overview &amp; metrics">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Storefront code", code.toUpperCase()],
            ["Market tier", tierLabel],
            ["Primary search language", entity.lang],
            [
              "Storefronts this metadata reaches",
              reach.length === 0
                ? "1 (this one only)"
                : `${reach.length + 1} storefronts`,
            ],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0 rounded-md border border-line bg-surface px-4 py-3">
              <dt className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">{k}</dt>
              <dd className="mt-1 text-base font-semibold text-ink capitalize break-words">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {info && (
        <Section title="What to know about this market">
          <Prose>
            {info.facts.map((fact, i) => (
              <p key={i}>{fact}</p>
            ))}
          </Prose>
        </Section>
      )}

      <Section
        title={`How to research keywords in ${name}`}
        note={
          isEnglish
            ? `English metadata is indexed here, so this is a research pass rather than a localisation project.`
            : `Search here happens in ${info?.lang ?? "the local language"}, so the candidate list has to be built in that language, not translated from an English one.`
        }
      >
        <Prose>
          <p>
            {entity.tier === "major"
              ? `${name} is one of the storefronts where difficulty does the deciding. Demand is deep enough that almost any sensible term returns volume, and the question is which of them you can realistically reach.`
              : entity.tier === "mid"
              ? `${name} rewards a second pass. Volume is real but competition has not caught up with it, so terms that are locked in the major storefronts are often still open here.`
              : `${name} is small enough that difficulty stops being the constraint. Most keyword slots are reachable; the work is finding the terms that are searched at all.`}
          </p>
          <ol>
            <li>
              <strong>Build the candidate list in {info?.lang ?? "the local language"}.</strong>{" "}
              {isEnglish
                ? `Start from your existing English list, then add the terms competitors use in their ${name} subtitle. Regional word choice matters more than spelling: the algorithm treats British and American spellings alike, but it will not connect two different words for the same thing.`
                : `Translating an English list is the common mistake. Pull the terms from ${name} App Store listings and from what competitors put in their subtitle, because ${info?.lang} search habits rarely map word for word onto English ones.`}
            </li>
            <li>
              <strong>Score for popularity in this storefront specifically.</strong>{" "}
              {entity.tier === "major"
                ? `Popularity is calibrated per storefront, so a term that scores 60 here is genuinely deep demand. Above 25 is the floor worth spending characters on.`
                : `Popularity is calibrated per storefront, so scores here read lower than the US for the same term without meaning less. Judge candidates against each other in ${name}, not against your home market, and treat 25 as the floor.`}
            </li>
            <li>
              <strong>Check difficulty.</strong>{" "}
              {entity.tier === "major"
                ? `Filter to difficulty below 60 for an established app and below 45 for a new one. In a market this size the top slots are held by apps with years of install history behind them.`
                : entity.tier === "mid"
                ? `Filter to difficulty below 50. This market carries meaningful volume with consistently less competition than the major storefronts, which is the whole reason to work it.`
                : `Filter to difficulty below 40, though you will find much of the list sits far below that. In a market this size a new app can take top slots on terms that would be unreachable elsewhere.`}
            </li>
            <li>
              <strong>Write the metadata for {name}.</strong>{" "}
              {reach.length === 0
                ? `${info?.lang ?? "This language"} is used by this storefront alone, so this metadata does one job and can be tuned to it without trading anything off.`
                : `The same ${info?.lang} metadata is indexed in ${reach.length + 1} storefronts, so a term you add here is working in all of them. Score your list in the largest of those before you commit the 100 characters.`}
            </li>
          </ol>
        </Prose>
      </Section>

      <Section
        title={`Metadata allocation blueprint for ${name}`}
        note={`Three indexable fields, 160 characters total. Optimize every character for ${entity.lang}.`}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-line bg-surface p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              App Name (30 chars)
            </h3>
            <p className="mt-2 text-sm text-ink-2 leading-relaxed">
              {metadataPlaybook.titleStrategy}
            </p>
          </div>
          <div className="rounded-md border border-line bg-surface p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Subtitle (30 chars)
            </h3>
            <p className="mt-2 text-sm text-ink-2 leading-relaxed">
              {metadataPlaybook.subtitleStrategy}
            </p>
          </div>
          <div className="rounded-md border border-line bg-surface p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Keywords (100 chars)
            </h3>
            <p className="mt-2 text-sm text-ink-2 leading-relaxed">
              {metadataPlaybook.keywordFieldStrategy}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          {SCRIPT_NOTE[script]} {metricsAnalysis.scriptAdvantage}
        </p>
      </Section>

      {reach.length > 0 ? (
        <Section
          title={`Where your ${info?.lang} metadata also ranks`}
          note={`Apple indexes metadata by language, not by country. One ${info?.lang} keyword field is live in ${reach.length + 1} storefronts.`}
        >
          <Prose>
            <p>
              Writing {info?.lang} metadata for {name} is not a single-market decision. The
              same 100 characters are indexed in {reach.length} other{" "}
              {reach.length === 1 ? "storefront" : "storefronts"}, where the same terms
              carry different demand and, more usefully, different difficulty. A term that
              is closed in {name} is frequently open in the smaller markets on this list,
              and it costs nothing extra to rank there.
            </p>
          </Prose>
          <ul className="mt-4 flex list-none flex-wrap gap-2">
            {reach.map((c) => (
              <li key={c} className="min-w-0">
                <Link
                  href={`/keyword-research/${c}`}
                  className="inline-block rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink no-underline transition-colors duration-150 ease-brand hover:border-tint-line hover:bg-hover"
                >
                  {flagOf(c)} {STORE_INFO[c]?.name ?? c.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section
          title={`${info?.lang ?? "This language"} reaches this storefront only`}
          note={`No other App Store market searches in ${info?.lang ?? "this language"}, which changes the economics of localising for it.`}
        >
          <Prose>
            <p>
              Most localisation decisions are made across a group of storefronts: one
              Spanish keyword field is indexed in fifteen markets, one Arabic field in
              fourteen. {info?.lang ?? "This language"} is not one of those. The work you
              do here earns its return in {name} alone, so the market has to justify the
              translation on its own.
            </p>
            <p>
              {entity.tier === "emerging"
                ? `In an emerging market that is a real question to sit with. The counter-argument is difficulty: keyword slots here are cheap enough that a modest localisation can take the top of a category outright, which is not on offer in any market where the language is shared.`
                : `It usually does. Difficulty is measured against the apps that bothered to localise, and in a single-language market that set stays small, so the terms stay reachable for longer than volume alone would suggest.`}
            </p>
          </Prose>
        </Section>
      )}

      {/* Contextual Cross-Cluster Linking Section */}
      {(contextualLinks.languageCluster || contextualLinks.relatedGuides.length > 0) && (
        <Section title="Related ASO guides &amp; localization resources">
          <div className="grid gap-4 sm:grid-cols-2">
            {contextualLinks.languageCluster && (
              <Card tone="surface" pad="md" className="border-l-[3px] border-l-accent">
                <span className="text-2xs font-bold uppercase tracking-wider text-accent">
                  {contextualLinks.languageCluster.badge}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-ink">
                  <Link href={contextualLinks.languageCluster.href} className="hover:underline">
                    {contextualLinks.languageCluster.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-2">
                  {contextualLinks.languageCluster.description}
                </p>
              </Card>
            )}
            {contextualLinks.relatedGuides.slice(0, 1).map((g) => (
              <Card key={g.href} tone="surface" pad="md">
                <span className="text-2xs font-bold uppercase tracking-wider text-muted">
                  ASO Guide
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-ink">
                  <Link href={g.href} className="hover:underline">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-2">{g.description}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {faqItems.length > 0 && (
        <Section title="Frequently asked questions">
          <Faq items={faqItems} />
        </Section>
      )}

      <Section
        title={`Storefronts to compare with ${name}`}
        note={`Markets that search in ${info?.lang ?? "the same language"} come first, then neighbours in the same region.`}
      >
        <LinkCardGrid
          min={200}
          items={related.map((r) => ({
            href: `/keyword-research/${r.code}`,
            title: `${flagOf(r.code)} ${r.name}`,
            note: r.reason,
          }))}
        />
        <Link
          href="/keyword-research"
          className="mt-4 inline-block text-sm font-semibold text-accent no-underline hover:underline"
        >
          View all {STORES.length} storefronts →
        </Link>
      </Section>
    </PseoLayout>
  );
}
