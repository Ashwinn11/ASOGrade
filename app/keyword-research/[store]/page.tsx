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
import { faqSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { fitTitle, fitMeta, OG_IMAGE } from "@/lib/seo/meta";
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
  /* Purpose-written, not a trimmed fact. Feeding `info.facts[0]` in here cut
     108 of these 109 descriptions mid-clause, because the facts are written to
     be read on the page rather than at 160 characters in a result. */
  const reachCount = info
    ? STORES.filter(([c]) => c !== store && STORE_INFO[c]?.langCode === info.langCode).length
    : 0;
  const reachPhrase = info
    ? reachCount === 0
      ? `${info.lang} metadata reaches this storefront alone.`
      : `One ${info.lang} keyword field covers ${reachCount + 1} storefronts.`
    : "";
  const description = fitMeta([
    `Score App Store keywords for the ${name} storefront: real search demand, ranking difficulty, and what to put in your 100 characters. ${reachPhrase}`,
    `App Store keyword research for ${name}. Search demand, ranking difficulty, and metadata strategy for a ${tierLabel} market.`,
    `App Store keyword research for the ${name} storefront: demand, difficulty and metadata strategy.`,
  ]);

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

  /* The three facts that make this page different from the other 108.
     Apple localises metadata by language rather than by country, so `reach`
     is the set of storefronts one keyword field is indexed in; it runs from
     24 (English) down to 0 (the 38 single-storefront languages). `script`
     decides how much meaning a character buys in the 100-character field.
     `related` replaces a `.slice(0, 8)` that returned the same eight markets
     on 101 of these pages. */
  const allCodes = STORES.map(([c]) => c);
  const reach = languageReach(code, allCodes);
  const related = relatedStores(code, allCodes, POPULAR);
  const script = scriptOf(info?.langCode ?? "en");
  const isEnglish = info?.langCode === "en";

  const tierLabel = info?.tier === "major"
    ? "Major market"
    : info?.tier === "mid"
    ? "Mid-tier market"
    : "Emerging market";

  /* Counted here rather than reusing `reach` below, because faqItems is built
     before it and the JSON-LD needs the same number the page renders. */
  const reachCount = info
    ? STORES.filter(([c]) => c !== code && STORE_INFO[c]?.langCode === info.langCode).length
    : 0;

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
        {
          q: `How many storefronts does one ${info.lang} keyword field cover?`,
          a:
            reachCount === 0
              ? `Just this one. ${info.lang} is the primary search language in ${name} and in no other App Store storefront, so metadata written for this market earns its return here alone.`
              : `${reachCount + 1}. Apple indexes App Store metadata by language rather than by country, so a single ${info.lang} keyword field is live in ${name} and ${reachCount} other ${reachCount === 1 ? "storefront" : "storefronts"}. Score your candidate list in each of them before committing the 100 characters, because difficulty varies between them even though the metadata does not.`,
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

          <Section title="What to know about this market">
            <Prose>
              {info.facts.map((fact, i) => (
                <p key={i}>{fact}</p>
              ))}
            </Prose>
          </Section>
        </>
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
            {info?.tier === "major"
              ? `${name} is one of the storefronts where difficulty does the deciding. Demand is deep enough that almost any sensible term returns volume, and the question is which of them you can realistically reach.`
              : info?.tier === "mid"
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
              {info?.tier === "major"
                ? `Popularity is calibrated per storefront, so a term that scores 60 here is genuinely deep demand. Above 25 is the floor worth spending characters on.`
                : `Popularity is calibrated per storefront, so scores here read lower than the US for the same term without meaning less. Judge candidates against each other in ${name}, not against your home market, and treat 25 as the floor.`}
            </li>
            <li>
              <strong>Check difficulty.</strong>{" "}
              {info?.tier === "major"
                ? `Filter to difficulty below 60 for an established app and below 45 for a new one. In a market this size the top slots are held by apps with years of install history behind them.`
                : info?.tier === "mid"
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
        title={`Metadata allocation for the ${name} storefront`}
        note={`Three indexable fields, 160 characters between them, and the writing system decides how far they stretch.`}
      >
        <Prose>
          <ul>
            <li>
              <strong>App Name, 30 characters.</strong> Your brand plus the single
              highest-demand term you can defend in {name}. This field carries the most
              ranking weight of the three, so it takes the term you most want and can
              plausibly reach, not the one with the biggest popularity score.
            </li>
            <li>
              <strong>Subtitle, 30 characters.</strong> Two or three secondary terms in{" "}
              {info?.lang ?? "the local language"}. It is indexed and it is also the line a
              searcher reads before deciding to tap, so it has to survive being read as a
              sentence{isEnglish ? "" : ` by a ${info?.lang} speaker`}.
            </li>
            <li>
              <strong>Keyword field, 100 characters.</strong> {SCRIPT_NOTE[script]} Never
              repeat a word already used in the name or subtitle; those are indexed
              already, and the field is the one place where a wasted character is a term
              you could have had.
            </li>
          </ul>
        </Prose>
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
              {info?.tier === "emerging"
                ? `In an emerging market that is a real question to sit with. The counter-argument is difficulty: keyword slots here are cheap enough that a modest localisation can take the top of a category outright, which is not on offer in any market where the language is shared.`
                : `It usually does. Difficulty is measured against the apps that bothered to localise, and in a single-language market that set stays small, so the terms stay reachable for longer than volume alone would suggest.`}
            </p>
          </Prose>
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
