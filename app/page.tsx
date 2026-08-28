"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import { STORES } from "@/lib/types";
import SiteHeader from "./ui/SiteHeader";
import SiteFooter from "./ui/SiteFooter";
import Button from "./ui/Button";
import Card from "./ui/Card";
import CoralHeader from "./ui/CoralHeader";
import Faq from "./ui/Faq";
import Notice from "./ui/Notice";
import Meter, { popBand, diffBand } from "./ui/Meter";
import Pill, { Kicker } from "./ui/Pill";
import JsonLd from "./ui/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import { cn } from "./ui/cn";


const STOREFRONTS = [
  { code: "US", name: "United States", pop: 67, diff: 38 },
  { code: "GB", name: "United Kingdom", pop: 58, diff: 31 },
  { code: "BR", name: "Brazil", pop: 33, diff: 19 },
];

const SAMPLE = [
  { kw: "habit tracker", pop: 67, diff: 38, apps: 248, added: "2m" },
  { kw: "sleep sounds", pop: 66, diff: 71, apps: 250, added: "14m" },
  { kw: "mood tracker", pop: 53, diff: 60, apps: 247, added: "26m" },
  { kw: "budget planner", pop: 51, diff: 42, apps: 246, added: "1h" },
  { kw: "meal planner", pop: 48, diff: 64, apps: 249, added: "3h" },
  { kw: "daily planner", pop: 47, diff: 68, apps: 248, added: "5h" },
  { kw: "gratitude journal", pop: 34, diff: 28, apps: 243, added: "1d" },
  { kw: "water reminder", pop: 29, diff: 24, apps: 231, added: "2d" },
];

const OPPORTUNITIES = [
  { kw: "budget planner", store: "GB", pop: 51, diff: 42, tone: "best" },
  { kw: "gratitude journal", store: "AU", pop: 34, diff: 28, tone: "good" },
  { kw: "meal planner", store: "US", pop: 48, diff: 64, tone: "watch" },
  { kw: "sleep sounds", store: "CA", pop: 66, diff: 71, tone: "hard" },
];

const span = (vals: number[]) => {
  const lo = Math.min(...vals), hi = Math.max(...vals);
  return (v: number) => (hi === lo ? 0.5 : (v - lo) / (hi - lo));
};
const popAt  = span(OPPORTUNITIES.map((o) => o.pop));
const diffAt = span(OPPORTUNITIES.map((o) => o.diff));


const RIVAL = {
  name: "Finch: Self-Care Pet",
  subtitle: "Daily Journal & Habit Tracker",
  icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/9e/50/589e5087-2232-b59f-32bb-8aac4e8a2432/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/120x0w.webp",
  total: 108,
  keywords: [
    { kw: "finch", pop: 68, diff: 61 },
    { kw: "habit tracker", pop: 67, diff: 67 },
    { kw: "how we feel", pop: 57, diff: 55 },
    { kw: "mental health", pop: 55, diff: 73 },
    { kw: "daylio", pop: 55, diff: 67 },
  ],
};


const HERO_STATS = [
  { figure: "10K+", label: "Keywords scored", sub: "in every App Store market" },
  { figure: "100+", label: "Apps growing", sub: "with better keywords" },
  { figure: "4.5",  label: "Average rating", sub: "from developers who use it", star: true },
];


const gs = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconList = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>
);
const IconTarget = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconGlobe = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></svg>
);
const Spark = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z" /></svg>
);
const Star = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95Z" /></svg>
);
const Arrow = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
const ArrowUpRight = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
const AppleMark = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
);

interface ProductTab {
  id: string;
  tab: string;
  Icon: (p: { size?: number }) => React.ReactElement;
  kicker: string;
  title: string;
  body: string;
  extra: string;
  href: string;
  linkLabel: string;
  visual: "shot" | "rival" | "markets";
}

const PRODUCTS: ProductTab[] = [
  {
    id: "scoring",
    tab: "Keyword Scoring",
    Icon: IconList,
    kicker: "Keyword scoring",
    title: "Score every keyword before you commit to it",
    body: "See exactly how many people search it, and how hard it is to break into the top results. Nothing in your metadata has to be a guess.",
    extra: "Paste up to 100 keywords at once and see which ones you can win.",
    href: "/guides/app-store-keyword-research-workflow",
    linkLabel: "See the workflow",
    visual: "shot",
  },
  {
    id: "teardown",
    tab: "Competitor Teardown",
    Icon: IconTarget,
    kicker: "Competitor teardown",
    title: "Pull any competitor's full keyword list",
    body: "Every app ranking above you already did this research. Paste their App Store link and get their exact keyword list, scored the same way as yours.",
    extra: "Just paste their App Store link. You do not need an app of your own.",
    href: "/guides/competitor-keyword-set",
    linkLabel: "How to read a rival's set",
    visual: "rival",
  },
  {
    id: "markets",
    tab: "Every Storefront",
    Icon: IconGlobe,
    kicker: "Every storefront",
    title: `Check every keyword across all ${STORES.length} markets`,
    body: "The same keyword can be wide open in one country and locked up in another. See where you can actually win before you spend a translation budget finding out.",
    extra: `All ${STORES.length} storefronts are included on every plan.`,
    href: "/keyword-research",
    linkLabel: "Browse the storefronts",
    visual: "markets",
  },
];


const BENEFITS = [
  {
    id: "visibility",
    title: "Stop guessing which keywords work",
    body: [
      { t: "Most of the keywords you are considering are not worth using. ", b: false },
      { t: "ASOGrade shows you which ones people are actually searching", b: true },
      { t: ", and you put those in your metadata.", b: false },
    ],
    stat: "90%",
    statLabel: "of users see more app impressions within the first week after updating their metadata.",
    tags: ["Keyword scoring", "Opportunity map"],
    visual: "map" as const,
  },
  {
    id: "rivals",
    title: "See every keyword your competitors use",
    body: [
      { t: "Every app above you already did this research. ", b: false },
      { t: "Paste their App Store link", b: true },
      { t: " and you get their whole keyword list, scored just like yours.", b: false },
    ],
    stat: "2×",
    statLabel: "the impressions one developer got after changing their keywords.",
    tags: ["Competitor teardown"],
    visual: "rival" as const,
  },
  {
    id: "markets",
    title: "Get found in countries nobody targets",
    body: [
      { t: "A keyword you cannot win at home is often ", b: false },
      { t: "wide open abroad", b: true },
      { t: ". Score your list in every market and see where you can rank today.", b: false },
    ],
    stat: "3×",
    statLabel: "more countries sending installs after one pass across every storefront.",
    tags: ["Every storefront"],
    visual: "markets" as const,
  },
];


interface Category {
  id: string;
  label: string;
  lead: string;
  read: string;
  href: string;
  rows: { kw: string; pop: number; diff: number }[];
}

const CATEGORIES: Category[] = [
  {
    id: "health",
    label: "Health & Fitness",
    lead: "Crowded at the top, wide open once you get specific.",
    read: "The two most obvious keywords are also the two hardest. \u201Cgratitude journal\u201D and \u201Cwater reminder\u201D get a third of the searches at a third of the difficulty.",
    href: "/guides/low-competition-app-store-keywords",
    rows: [
      { kw: "habit tracker", pop: 67, diff: 67 },
      { kw: "sleep sounds", pop: 66, diff: 71 },
      { kw: "mood tracker", pop: 53, diff: 60 },
      { kw: "gratitude journal", pop: 34, diff: 28 },
      { kw: "water reminder", pop: 29, diff: 24 },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    lead: "People here know what they want, and difficulty drops fast.",
    read: "Searches stay steady all the way down the list, so the last keyword is almost as good as the first. Difficulty more than halves.",
    href: "/guides/evaluate-keyword-difficulty",
    rows: [
      { kw: "budget planner", pop: 51, diff: 42 },
      { kw: "expense tracker", pop: 49, diff: 55 },
      { kw: "savings goal", pop: 31, diff: 26 },
      { kw: "bill reminder", pop: 28, diff: 22 },
      { kw: "net worth tracker", pop: 22, diff: 18 },
    ],
  },
  {
    id: "productivity",
    label: "Productivity",
    lead: "The biggest keywords are the least worth chasing.",
    read: "\u201Cto do list\u201D gets the searches but you cannot win it. A new app gets found on keywords like \u201Cfocus timer\u201D and \u201Ctime blocking\u201D.",
    href: "/guides/app-store-keyword-research-workflow",
    rows: [
      { kw: "to do list", pop: 62, diff: 79 },
      { kw: "daily planner", pop: 47, diff: 68 },
      { kw: "note taking", pop: 44, diff: 57 },
      { kw: "focus timer", pop: 38, diff: 33 },
      { kw: "time blocking", pop: 21, diff: 19 },
    ],
  },
  {
    id: "games",
    label: "Games",
    lead: "Genre keywords belong to studios with ad budgets.",
    read: "Every genre keyword here is above 70 difficulty. \u201Cmerge game\u201D and \u201Ccozy game\u201D sit thirty points lower and still get searched.",
    href: "/guides/low-competition-app-store-keywords",
    rows: [
      { kw: "puzzle games", pop: 64, diff: 81 },
      { kw: "idle game", pop: 58, diff: 74 },
      { kw: "word game", pop: 55, diff: 70 },
      { kw: "merge game", pop: 41, diff: 49 },
      { kw: "cozy game", pop: 27, diff: 31 },
    ],
  },
  {
    id: "education",
    label: "Education",
    lead: "A few giant keywords, and a long tail nobody targets.",
    read: "The top two belong to apps with hundreds of millions of installs. Everything under 40 difficulty you can reach in one release.",
    href: "/guides/multi-storefront-keyword-research",
    rows: [
      { kw: "language learning", pop: 58, diff: 72 },
      { kw: "math solver", pop: 47, diff: 61 },
      { kw: "flashcards", pop: 42, diff: 38 },
      { kw: "study planner", pop: 31, diff: 27 },
      { kw: "kids reading", pop: 29, diff: 24 },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    lead: "Plain utilities, low competition, users who stay.",
    read: "\u201Cpacking list\u201D gets half the searches of \u201Cflight tracker\u201D at under a third of the difficulty, and nobody bids on it.",
    href: "/guides/apple-search-ads-popularity",
    rows: [
      { kw: "flight tracker", pop: 54, diff: 63 },
      { kw: "trip planner", pop: 46, diff: 52 },
      { kw: "currency converter", pop: 43, diff: 49 },
      { kw: "offline maps", pop: 39, diff: 44 },
      { kw: "packing list", pop: 24, diff: 18 },
    ],
  },
];

const catStats = (rows: Category["rows"]) => [
  { n: String(Math.max(...rows.map((r) => r.pop))), label: "most searched" },
  { n: String(Math.min(...rows.map((r) => r.diff))), label: "easiest to rank for" },
  { n: `${rows.filter((r) => r.diff <= 40).length} of ${rows.length}`, label: "you can win" },
];

const CLOSING_POINTS = [
  "Your first scores in under a minute",
  `All ${STORES.length} storefronts included`,
  "Cancel anytime, no contract",
];

const CLOSING_LINKS = [
  { href: "/solutions", label: "What it solves" },
  { href: "/guides", label: "ASO guides" },
];

const FAQ = [
  {
    q: "How is this different from a full ASO suite?",
    a: "A suite does rank tracking, reviews, ad campaigns and reporting, and charges you for all of it. ASOGrade does keyword research only. Paste your keywords, see how many people search them and how hard they are to rank for, then decide what to use. If you need rank tracking and campaign management, get a suite.",
  },
  {
    q: "Is there a free trial or free plan?",
    a: "No. ASOGrade runs on real Apple Search Ads data, which costs money to keep current — a crippled free tier would just mean stale numbers for everyone, so we skip it and price it fairly instead. Cancel anytime, no contract.",
  },
  {
    q: "What is ASO?",
    a: "ASO stands for App Store Optimization. It means choosing the words in your app name, subtitle and keyword field so that your app shows up when people search the App Store. ASOGrade tells you which words to choose.",
  },
  {
    q: "What are popularity and difficulty?",
    a: "Popularity shows how many people search a keyword on the App Store. Difficulty shows how hard it is to reach the top spots for it. Both are scored from 0 to 100.",
  },
  {
    q: "Do I need a published app?",
    a: "No. Scores belong to the keyword and the country, not to your app, so you can research your name, subtitle and keyword field before you launch.",
  },
  {
    q: "Can I see which keywords a competitor ranks for?",
    a: "Yes. Paste their App Store link and you get every keyword they rank for, each scored for popularity and difficulty. An established app usually returns around a hundred.",
  },
  {
    q: "Can I check the same keyword in several countries?",
    a: `Yes. Look at one country at a time, or use the all-store view to compare your list across all ${STORES.length} App Store markets at once.`,
  },
  {
    q: "Where does the data come from?",
    a: "Popularity comes straight from Apple Search Ads on its own 0 to 100 scale. It is the same number advertisers bid on, not a guess worked backwards from chart positions. Difficulty is calculated from the apps currently holding the top spots for that keyword. Both update daily.",
  },
];

const NAV = [
  { href: "#product", label: "Product" },
  { href: "#examples", label: "Examples" },
  { href: "/guides", label: "Guides" },
  { href: "#faq", label: "FAQ" },
];


const WRAP = "mx-auto w-[min(100%-1.5rem,72rem)] min-w-0";

const DARK_SURFACE =
  "bg-[radial-gradient(circle_at_85%_0%,rgba(255,207,188,.16),transparent_38%),linear-gradient(140deg,var(--color-dark-1),var(--color-dark-2)_60%,var(--color-dark-3))]";


function BandHeading({
  kicker,
  title,
  lead,
  onDark = false,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  onDark?: boolean;
}) {
  return (
    <div className="mx-auto min-w-0 max-w-[46rem] text-center">
      {kicker && <Kicker tone={onDark ? "onDark" : "accent"}>{kicker}</Kicker>}
      <h2
        className={cn(
          "font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl",
          onDark ? "text-dark-ink" : "text-ink",
          kicker && "mt-4",
        )}
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-[52ch] text-md leading-relaxed",
            onDark ? "text-dark-ink/70" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}


function TabStrip({
  items,
  active,
  onSelect,
  label,
  variant = "text",
}: {
  items: { id: string; label: string; Icon?: (p: { size?: number }) => React.ReactElement }[];
  active: string;
  onSelect: (id: string) => void;
  label: string;
  /** `coral` sits inside a CoralHeader; `text` sits on the page background. */
  variant?: "text" | "coral";
}) {
  const coral = variant === "coral";
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "flex min-w-0 gap-2",
        coral
          ? "flex-col items-stretch sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2.5"
          : "flex-wrap justify-center sm:gap-3",
      )}
    >
      {items.map((item) => {
        const on = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={on}
            aria-controls={`panel-${item.id}`}
            onClick={() => onSelect(item.id)}
            className={cn(
              "flex min-w-0 cursor-pointer items-center gap-2.5 rounded-full border text-sm font-semibold",
              "transition-[background-color,color,border-color,box-shadow] duration-150 ease-brand",
              coral ? "px-3.5 py-2 text-left" : "px-4 py-2",
              on
                ? coral
                  ? "border-transparent bg-white text-accent-2 shadow-1"
                  : "border-transparent bg-accent text-white shadow-1"
                : coral
                  ? "border-transparent bg-transparent text-white/80 hover:bg-white/15 hover:text-white"
                  : "border-transparent bg-transparent text-muted hover:text-ink",
            )}
          >
            {item.Icon && (
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-150",
                  on
                    ? "bg-tint text-accent"
                    : coral
                      ? "bg-white/15 text-white/80"
                      : "bg-sunken text-faint",
                )}
              >
                <item.Icon size={15} />
              </span>
            )}
            <span className="min-w-0 leading-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Landing() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [signIn, setSignIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const enter = () => (user ? router.push("/dashboard") : setSignIn(true));

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("authError");
    if (e) {
      setAuthError(e);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);


  const Cta = ({ size = "lg" }: { size?: "md" | "lg" }) => (
    <Button size={size} onClick={enter} disabled={!ready}>
      {user ? "Dashboard" : "Score My Keywords"}
    </Button>
  );

  const SignInNote = () =>
    user ? null : (
      <span className="block text-xs leading-relaxed text-faint">
        No card, no spam — just Google sign-in.
      </span>
    );

  return (
    <div className={cn(
      "min-w-0 bg-no-repeat",
      "bg-[linear-gradient(180deg,var(--color-tint-2),var(--color-tint)_45%,transparent)]",
      "bg-[length:100%_60rem]",
    )}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:shadow-2"
      >
        Skip to content
      </a>

      <SiteHeader links={NAV} actions={<Cta size="md" />} />

      {authError && (
        <div className={cn(WRAP, "mt-4")}>
          <Notice tone="error">Sign-in failed: {authError}</Notice>
        </div>
      )}

      <main id="main" className="min-w-0">
        {/* ------------------------------------------------------- 1 · hero */}
        <section className="min-w-0 border-b border-line">
          <div className={cn(WRAP, "py-16 text-center sm:py-24")}>  
            <h1
              className="mx-auto max-w-[32ch] font-display text-3xl font-extrabold leading-[1.03] tracking-tight text-ink sm:text-4xl"
            >
              Stop Guessing Which App Store
              <br />
              Keywords Actually Work
            </h1>
            <p className="mx-auto mt-6 max-w-[46ch] text-md leading-relaxed text-muted">
              ASOGrade scores every keyword with real Apple Search Ads demand —
              the same numbers advertisers bid on, not a guess — across all{" "}
              {STORES.length} App Store markets.
            </p>

            <div className="mt-9 flex min-w-0 flex-wrap justify-center gap-3">
              <Cta />
            </div>
            <div className="mt-4">
              <SignInNote />
            </div>

            <div className="mx-auto mt-12 min-w-0 max-w-[40rem] border-t border-line pt-9 text-center">
              <p className="flex min-w-0 flex-wrap items-center justify-center gap-3 font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                <span className="shrink-0 -translate-y-0.5" aria-hidden="true">
                  <AppleMark size={28} />
                </span>
                Powered by Apple Search Ads
              </p>
              <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
                Popularity comes straight from Apple Search Ads. It is the same
                number advertisers bid on, and we score it separately in all{" "}
                {STORES.length} markets.
              </p>
            </div>

            <dl className="mx-auto mt-11 grid min-w-0 max-w-[52rem] grid-cols-1 gap-px overflow-hidden rounded-card bg-accent-2 shadow-2 sm:grid-cols-3">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="min-w-0 bg-accent px-5 py-7 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="min-w-0">
                    <span className="flex min-w-0 items-center justify-center gap-1.5 font-display text-4xl font-extrabold leading-none tracking-tight text-white">
                      {s.figure}
                      {s.star && (
                        <span className="shrink-0 -translate-y-px text-white/90" aria-hidden="true">
                          <Star size={22} />
                        </span>
                      )}
                    </span>
                    <span className="mt-2.5 block text-sm font-semibold leading-snug text-white">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/70">
                      {s.sub}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="product" className={cn(WRAP, "mt-20 scroll-mt-24")}>
          <ProductSwitcher />
        </section>


        {/* Problem, before the benefits that solve it. */}
        <section className={cn("mt-24 min-w-0 border-y border-ink", DARK_SURFACE)}>
          <div className={cn(WRAP, "py-14 sm:py-16")}>
            <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:gap-16">
              <div className="relative mx-auto min-w-0 w-[min(100%,11rem)]">

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-[18%] inset-y-[6%] blur-3xl"
                  style={{
                    background:
                      "radial-gradient(58% 42% at 50% 34%, rgba(240,163,130,.34), transparent 72%)",
                  }}
                />
                <img
                  src="/appstore.webp"
                  alt="An iPhone showing an App Store search for “habit tracker” and the apps returned for it."
                  width={1419}
                  height={2796}
                  loading="lazy"
                  decoding="async"
                  className="relative block h-auto w-full"
                />
              </div>

              <div className="min-w-0">
                <Kicker tone="onDark">Why ASO matters</Kicker>
                <h2
                  className="mt-4 max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-tight text-dark-ink sm:text-3xl"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Most App Store downloads start with a search
                </h2>
                <p className="mt-4 max-w-[52ch] text-md leading-relaxed text-dark-ink/70">
                  Apple puts it at around 70% of how visitors find apps. Rank
                  for the words they actually type, and you become one of the
                  results they are already looking at. That is a real
                  download, from someone who was already searching for what
                  you built.
                </p>

              </div>
            </div>
          </div>
        </section>

        {BENEFITS.map((b) => (
          <section key={b.id} id={b.id} className={cn(WRAP, "mt-24 scroll-mt-24")}>
            <BenefitBand item={b} />
          </section>
        ))}

        {/* Objection handling sits right after the benefits that earn it — this
            is a paid-only product with no free tier, so the FAQ answering that
            needs to reach a visitor before the deep-dive category tables lose
            them, not after. */}
        <section
          id="faq"
          className={cn(WRAP, "mt-24 grid scroll-mt-24 gap-8 lg:grid-cols-[minmax(0,.62fr)_minmax(0,1fr)]")}
        >
          <div className="min-w-0">
            <Kicker>FAQ</Kicker>
            <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              Common questions
            </h2>
          </div>
          <Faq items={FAQ} collapsible />
          <JsonLd data={faqSchema(FAQ)} />
        </section>

        <section id="examples" className={cn(WRAP, "mt-24 scroll-mt-24")}>
          <BandHeading
            title="The gap in your category"
            lead="Every category has a different spread between what is popular and what is actually winnable. These are real keyword sets, not customer results — pick yours and see the gap."
          />
          <WorkedExamples />
        </section>

        <section className={cn(WRAP, "mt-24 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]")}>
          <div className="min-w-0">
            <h2
              className="max-w-[16ch] font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-4xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Ready for more installs?
            </h2>

            <ul className="mt-8 flex min-w-0 list-none flex-col gap-3">
              {CLOSING_POINTS.map((p) => (
                <li key={p} className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-accent"><Spark size={14} /></span>
                  <span className="min-w-0 text-md leading-relaxed text-ink-2">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex min-w-0 flex-col gap-2.5">
              {CLOSING_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-w-0 items-center gap-2 text-md font-semibold text-accent no-underline hover:text-accent-2"
                >
                  <Arrow size={15} /> {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-9 flex min-w-0 flex-wrap items-center gap-3">
              <Cta />
            </div>
            <div className="mt-4">
              <SignInNote />
            </div>
          </div>

          <ProductShot />
        </section>
      </main>

      <SiteFooter />

      {signIn && <SignInModal onClose={() => setSignIn(false)} next="/onboarding" />}
    </div>
  );
}

function ProductSwitcher() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const current = PRODUCTS.find((p) => p.id === active) ?? PRODUCTS[0];

  const VISUALS = {
    shot: <ProductShot />,
    rival: <RivalPanel />,
    markets: <MarketPanel />,
  };

  return (
    <Card pad="none" className="min-w-0 overflow-hidden">
      <CoralHeader
        bleed={false}
        center={
          <TabStrip
            variant="coral"
            label="What it does"
            items={PRODUCTS.map((p) => ({ id: p.id, label: p.tab, Icon: p.Icon }))}
            active={active}
            onSelect={setActive}
          />
        }
      />

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        key={current.id}
        className="grid min-w-0 animate-fade items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12"
      >
        <div className="order-2 min-w-0 lg:order-1">{VISUALS[current.visual]}</div>

        <div className="order-1 min-w-0 lg:order-2">
          <Kicker>{current.kicker}</Kicker>
          <h2 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-2xl">
            {current.title}
          </h2>
          <p className="mt-4 text-md leading-relaxed text-muted">{current.body}</p>
          <p className="mt-4 text-md leading-relaxed text-muted">{current.extra}</p>
          <div className="mt-7">
            <Link
              href={current.href}
              className="inline-flex items-center gap-1.5 text-md font-semibold text-accent no-underline hover:text-accent-2"
            >
              {current.linkLabel} <Arrow size={15} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

function BenefitBand({ item }: { item: (typeof BENEFITS)[number] }) {
  const VISUALS = {
    map: <OpportunityMap />,
    rival: <RivalPanel />,
    markets: <MarketPanel />,
  };

  return (
    <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div className="min-w-0">
        <h2
          className="max-w-[18ch] font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {item.title}
        </h2>

        <p className="mt-5 max-w-[46ch] text-md leading-relaxed text-muted">
          {item.body.map((seg, i) =>
            seg.b ? (
              <b key={i} className="font-semibold text-ink">{seg.t}</b>
            ) : (
              <span key={i}>{seg.t}</span>
            ),
          )}
        </p>

        <div className="mt-8 flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 rounded-r-card border-l-[3px] border-accent bg-tint px-6 py-5">
          <b className="font-display text-3xl font-extrabold leading-none tracking-tight text-accent-2">
            {item.stat}
          </b>
          <span className="min-w-0 flex-1 text-sm leading-relaxed text-ink-2">{item.statLabel}</span>
        </div>

        <div className="mt-6 flex min-w-0 flex-wrap items-center gap-2.5">
          <span className="text-2xs font-bold uppercase tracking-[0.08em] text-faint">Product:</span>
          {item.tags.map((t) => (
            <Pill key={t} tone="accent">{t}</Pill>
          ))}
        </div>
      </div>

      <div className="min-w-0">{VISUALS[item.visual]}</div>
    </div>
  );
}


function WorkedExamples() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];
  const stats = catStats(cat.rows);

  return (
    <div className="mt-10 min-w-0">
      <TabStrip
        label="Categories"
        items={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
        active={active}
        onSelect={setActive}
      />

      <div
        role="tabpanel"
        id={`panel-${cat.id}`}
        aria-labelledby={`tab-${cat.id}`}
        key={cat.id}
        className="mt-10 min-w-0 animate-fade"
      >
        <div className="grid min-w-0 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label} pad="lg" className="min-w-0">
              <span className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-accent"><ArrowUpRight size={16} /></span>
                <b className="font-display text-2xl font-extrabold leading-none text-ink">{s.n}</b>
              </span>
              <span className="mt-2.5 block text-sm leading-relaxed text-muted">{s.label}</span>
            </Card>
          ))}
        </div>

        <Card pad="lg" className="mt-4 grid min-w-0 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className={cn("min-w-0 self-start overflow-hidden rounded-md border border-ink", DARK_SURFACE)}>
            <div className="grid min-w-0 items-center gap-3 border-b border-white/10 px-4 py-3 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]">
              <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">
                {cat.label}
              </span>
              <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Pop</span>
              <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Diff</span>
            </div>
            <div className="min-w-0 p-2">
              {cat.rows.map((r) => (
                <div
                  key={r.kw}
                  className="grid min-w-0 items-center gap-3 rounded-md px-2 py-2.5 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]"
                >
                  <span className="min-w-0 truncate text-sm text-dark-ink">{r.kw}</span>
                  <Meter value={r.pop} band={popBand(r.pop)} onDark />
                  <Meter value={r.diff} band={diffBand(r.diff)} onDark />
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-sm leading-relaxed text-faint">{cat.lead}</p>
            <p
              className="mt-4 font-display text-lg font-extrabold leading-snug text-ink"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {cat.read}
            </p>
            <div className="mt-7">
              <Button variant="secondary" href={cat.href}>
                Read the guide <Arrow size={14} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}



function RivalPanel() {
  return (
    <Card tone="dark" pad="none" className="min-w-0 overflow-hidden">
      <div className="flex min-w-0 flex-wrap items-center gap-3 border-b border-white/10 p-4">
        <img
          src={RIVAL.icon}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="size-10 shrink-0 rounded-lg"
        />
        <span className="min-w-0 flex-1">
          <b className="block truncate text-base font-semibold text-dark-ink">{RIVAL.name}</b>
          <em className="block truncate text-xs not-italic text-dark-ink/60">{RIVAL.subtitle}</em>
        </span>
        <span className="shrink-0 basis-full font-mono text-2xs text-dark-ink/60 sm:basis-auto">
          {RIVAL.total} keywords
        </span>
      </div>

      <div className="min-w-0 p-2">
        {RIVAL.keywords.map((r) => (
          <div
            key={r.kw}
            className="grid min-w-0 items-center gap-3 rounded-md px-2 py-2.5 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]"
          >
            <span className="min-w-0 truncate text-sm text-dark-ink">{r.kw}</span>
            <Meter value={r.pop} band={popBand(r.pop)} onDark />
            <Meter value={r.diff} band={diffBand(r.diff)} onDark />
          </div>
        ))}
      </div>

      <p className="border-t border-white/10 px-4 py-3 text-2xs leading-relaxed text-dark-ink/55">
        Five of the {RIVAL.total} keywords this app ranks for.
      </p>
    </Card>
  );
}

function MarketPanel() {
  const rows = [
    { code: "US", flag: "🇺🇸", name: "United States", pop: 51, diff: 42 },
    { code: "GB", flag: "🇬🇧", name: "United Kingdom", pop: 44, diff: 31 },
    { code: "BR", flag: "🇧🇷", name: "Brazil", pop: 33, diff: 19 },
    { code: "PL", flag: "🇵🇱", name: "Poland", pop: 27, diff: 14 },
  ];

  return (
    <Card tone="dark" pad="none" className="min-w-0 overflow-hidden">
      <CoralHeader
        bleed={false}
        stack="sm"
        title="budget planner"
        subtitle="One keyword, four storefronts"
        right={
          <span className="shrink-0 self-start rounded-full bg-white px-3 py-1 text-2xs text-accent-2 sm:self-auto">
            All-store view
          </span>
        }
      />

      <div className="grid min-w-0 items-center gap-3 border-b border-white/10 px-4 py-2.5 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]">
        <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Storefront</span>
        <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Pop</span>
        <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Diff</span>
      </div>

      <div className="min-w-0 p-2">
        {rows.map((r) => (
          <div
            key={r.code}
            className="grid min-w-0 items-center gap-3 rounded-md px-2 py-2.5 [grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem] sm:[grid-template-columns:minmax(0,1fr)_7rem_7rem]"
          >
            <span className="flex min-w-0 items-center gap-2 text-sm text-dark-ink">
              <span aria-hidden="true" className="shrink-0">{r.flag}</span>
              <span className="min-w-0 truncate">{r.name}</span>
            </span>
            <Meter value={r.pop} band={popBand(r.pop)} onDark />
            <Meter value={r.diff} band={diffBand(r.diff)} onDark />
          </div>
        ))}
      </div>

      <p className="border-t border-white/10 px-4 py-3 text-2xs leading-relaxed text-dark-ink/55">
        The same keyword gets half the searches and is a third as hard, four
        countries down.
      </p>
    </Card>
  );
}

function ProductShot() {
  const cols =
    "grid min-w-0 items-center gap-3 [grid-template-columns:minmax(0,1fr)_4.5rem_4.5rem] " +
    "sm:[grid-template-columns:minmax(0,1fr)_5.5rem_5.5rem_3rem_3.5rem]";

  return (
    <div className="min-w-0" aria-label="ASOGrade keyword workspace preview">
      <Card tone="dark" pad="none" className="min-w-0 overflow-hidden">
        <CoralHeader
          bleed={false}
          stack="sm"
          title={`${SAMPLE.length * 32} keywords`}
          subtitle="Researching United States"
          right={
            <span className="shrink-0 self-start rounded-full bg-white px-3 py-1 text-2xs text-accent-2 sm:self-auto">
              🇺🇸 United States
            </span>
          }
        />

        <div className={`${cols} border-b border-white/10 px-4 py-2.5`}>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Keyword</span>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Pop</span>
          <span className="text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">Diff</span>
          <span className="hidden text-right text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45 sm:block">Apps</span>
          <span className="hidden text-right text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45 sm:block">Added</span>
        </div>

        <div className="min-w-0 p-2" role="table" aria-label="Sample keyword scores">
          {SAMPLE.map((row, i) => (
            <div
              key={row.kw}
              role="row"
              className={`${cols} animate-fade rounded-md px-2 py-2.5`}
              style={{ animationDelay: `${140 + i * 70}ms` }}
            >
              <span className="min-w-0 truncate text-sm text-dark-ink">{row.kw}</span>
              <Meter value={row.pop} band={popBand(row.pop)} onDark />
              <Meter value={row.diff} band={diffBand(row.diff)} onDark />
              <span className="hidden text-right font-mono text-2xs tabular-nums text-dark-ink/60 sm:block">{row.apps}</span>
              <span className="hidden text-right font-mono text-2xs tabular-nums text-dark-ink/60 sm:block">{row.added}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-3 grid min-w-0 grid-cols-3 gap-2">
        {STOREFRONTS.map((store) => (
          <Card key={store.code} tone="dark" pad="sm" className="min-w-0">
            <span className="block font-mono text-2xs text-dark-ink/50">{store.code}</span>
            <b className="mt-0.5 block text-sm font-semibold text-dark-ink [overflow-wrap:anywhere]">
              {store.name}
            </b>
            <small className="mt-0.5 block text-2xs text-dark-ink/55">
              {store.pop} pop · {store.diff} diff
            </small>
          </Card>
        ))}
      </div>
    </div>
  );
}


const TONE: Record<string, string> = {
  best: "bg-green/85",
  good: "bg-green/85",
  watch: "bg-amber/90",
  hard: "bg-red/85",
};


function OpportunityMap() {
  return (
    <Card tone="dark" pad="sm" className="min-w-0 overflow-hidden">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs font-semibold text-dark-ink/70">
        <span>Opportunity map</span>
        <b className="font-mono text-2xs font-semibold text-dark-ink">popularity × difficulty</b>
      </div>

      <div
        className="relative mt-4 min-h-[31rem] min-w-0 overflow-hidden rounded-lg border border-white/14 sm:min-h-[28rem]"
        style={{
          background:
            "linear-gradient(135deg, rgba(40,200,150,.16), transparent 38%)," +
            "linear-gradient(315deg, rgba(201,100,67,.2), transparent 36%)," +
            "rgba(255,255,255,.035)",
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,rgba(0,0,0,.24))]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)," +
              "linear-gradient(180deg, rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-1/2 h-px bg-white/16" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-[10%] left-1/2 w-px bg-white/16" />

        <span className="absolute left-4 top-4 text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">
          higher demand
        </span>
        <span className="absolute bottom-3.5 right-4 text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45">
          easier to win
        </span>

        {OPPORTUNITIES.map((item, i) => {
          const x = diffAt(item.diff);
          const y = popAt(item.pop);
          const left = x > 0.5;   // low difficulty sits right, so a high x is the left half
          return (
            <span
              key={item.kw}
              style={{ "--x": x, "--y": y, animationDelay: `${i * 80}ms` } as React.CSSProperties}
              className={[
                "absolute inline-flex animate-fade items-baseline gap-1.5 whitespace-nowrap",
                "rounded-full border border-white/20 px-2.5 py-1.5 text-white shadow-2",
                // phone: anchor to the near edge, spread popularity over the height
                "top-[calc((10+(1-var(--y))*80)*1%)] -translate-y-1/2",
                left ? "left-1.5" : "right-1.5",
                // desktop: centre on the true coordinate
                "sm:left-[calc((20+(1-var(--x))*56)*1%)] sm:right-auto",
                "sm:top-[calc((24+(1-var(--y))*54)*1%)] sm:-translate-x-1/2 sm:-translate-y-1/2",
                TONE[item.tone],
              ].join(" ")}
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 self-center rounded-full bg-current opacity-90" />
              <b className="text-xs font-bold">{item.kw}</b>
              <em className="font-mono text-2xs not-italic text-white/75">
                {item.pop}/{item.diff}
              </em>
            </span>
          );
        })}
      </div>
    </Card>
  );
}
