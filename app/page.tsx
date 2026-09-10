"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics/react";
import { useUser } from "./components/useUser";
import SignInModal from "./components/SignInModal";
import GrowthGraph from "./components/GrowthGraph";
import { STORES } from "@/lib/types";
import SiteHeader from "./ui/SiteHeader";
import SiteFooter from "./ui/SiteFooter";
import Button from "./ui/Button";
import Faq from "./ui/Faq";
import { Kicker } from "./ui/Pill";
import JsonLd from "./ui/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import { cn } from "./ui/cn";


// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FAQ = [
  {
    q: "Is there a free trial or free plan?",
    a: "Yes — you get 3 free keywords when you sign in, no credit card required. Upgrade anytime to track unlimited keywords across all 109 App Store markets.",
  },
  {
    q: "How is this different from a full ASO suite?",
    a: "A suite does rank tracking, reviews, ad campaigns and reporting, and charges you for all of it. ASOGrade does keyword research only. Paste your keywords, see how many people search them and how hard they are to rank for, then decide what to use. If you need rank tracking and campaign management, get a suite.",
  },
  {
    q: "What are popularity and difficulty?",
    a: "Popularity shows how many people search a keyword on the App Store, on Apple's own 0–100 scale — the same number advertisers bid on, not a guess worked backwards from chart positions. Difficulty shows how hard it is to reach the top spots for that keyword. Both update daily.",
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
    q: "Do I need a published app?",
    a: "No. Scores belong to the keyword and the country, not to your app, so you can research your name, subtitle and keyword field before you launch.",
  },
  {
    q: "Where does the data come from?",
    a: "Popularity comes straight from Apple Search Ads on its own 0 to 100 scale. Difficulty is calculated from the apps currently holding the top spots for that keyword.",
  },
  {
    q: "What is ASO?",
    a: "ASO stands for App Store Optimization. It means choosing the words in your app name, subtitle and keyword field so that your app shows up when people search the App Store. ASOGrade tells you which words to choose.",
  },
];

const PROOF_STATS = [
  { figure: "10K+",  label: "Keywords scored",      sub: "in every App Store market" },
  { figure: "100+",  label: "Apps growing",          sub: "with better keywords" },
  { figure: `${STORES.length}`, label: "App Store markets", sub: "every storefront covered" },
];

const TESTIMONIALS = [
  {
    quote: "Found 15 keywords I never would have thought of. Downloads up 2× the next month.",
    author: "Indie developer, productivity app",
    stars: 5,
  },
  {
    quote: "The competitor teardown alone is worth the price. I could see exactly why my rival was ranking above me.",
    author: "Solo founder, fitness app",
    stars: 5,
  },
  {
    quote: "I updated my keyword field with 3 terms ASOGrade flagged as low-difficulty. Impressions doubled in 10 days.",
    author: "Developer, journaling app",
    stars: 5,
  },
  {
    quote: "Worth it just to stop wasting keywords on searches nobody makes. The difficulty score is brutally honest.",
    author: "Indie dev, finance tools",
    stars: 5,
  },
  {
    quote: "Checked the same keyword across 20 markets in under a minute. Found three countries where I could actually rank.",
    author: "Solo developer, travel app",
    stars: 5,
  },
];

const NAV = [
  { href: "#faq", label: "FAQ" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
];

const WRAP = "mx-auto w-[min(100%-1.5rem,72rem)] min-w-0";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const gs = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const Arrow = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...gs} aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);

const Spark = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z" /></svg>
);

const Star = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95Z" /></svg>
);

const AppleMark = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Landing() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [signIn, setSignIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("authError");
    if (e) {
      setAuthError(e);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const openSignIn = () => {
    track("signin_modal_opened", { source: "hero_cta" });
    setSignIn(true);
  };

  const handleDashboard = () => {
    track("hero_cta_clicked");
    user ? router.push("/dashboard") : openSignIn();
  };

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

      <SiteHeader links={NAV} actions={
        <Button
          size="md"
          onClick={handleDashboard}
          disabled={!ready}
        >
          {user ? "Dashboard" : "Get started"}
        </Button>
      } />

      {authError && (
        <div className={cn(WRAP, "mt-4")}>
          <div className="rounded-card border border-red/30 bg-red/10 px-4 py-3 text-sm text-red">
            Sign-in failed: {authError}
          </div>
        </div>
      )}

      <main id="main" className="min-w-0">

        {/* --------------------------------------------------------- 1 · Hero */}
        <section id="product" className="min-w-0 scroll-mt-24 border-b border-line">
          <div className={cn(WRAP, "pb-10 pt-16 sm:pb-14 sm:pt-24")}>
            <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

              {/* Left: copy */}
              <div className="min-w-0">
                <Kicker>App Store Optimization</Kicker>
                <h1
                  className="mt-4 max-w-[22ch] font-display text-3xl font-extrabold leading-[1.03] tracking-tight text-ink sm:text-4xl"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Find keywords your competitors are missing.
                </h1>
                <p className="mt-5 max-w-[42ch] text-md leading-relaxed text-muted">
                  The right keywords turn searches into downloads. See which ones
                  you're missing, and how many people are already typing them, in
                  under a minute.
                </p>

                <div className="mt-8 flex min-w-0 flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    onClick={handleDashboard}
                    disabled={!ready}
                  >
                    {user ? "Go to dashboard" : "Score my keywords free"}
                  </Button>
                  <Button
                    href="/pricing"
                    variant="ghost"
                    size="lg"
                  >
                    View pricing
                  </Button>
                </div>
                {!user && (
                  <p className="mt-2.5 text-xs text-faint">
                    3 free keywords · No credit card required
                  </p>
                )}

                {/* Outcome proof, placed right under the CTA so it backs the promise before the click */}
                <div className="mt-6 flex items-start gap-2.5">
                  <div className="flex shrink-0 gap-0.5 pt-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} />)}
                  </div>
                  <p className="max-w-[38ch] text-sm leading-relaxed text-muted">
                    <span className="text-ink-2">
                      "Found 15 keywords I never would have thought of. Downloads up 2× the next month."
                    </span>{" "}
                    <span className="text-faint">— Indie developer, productivity app</span>
                  </p>
                </div>

                {/* Apple Search Ads credibility callout */}
                <div className="mt-9 flex items-start gap-4 border-t border-line/70 pt-6">
                  <div className="shrink-0 text-ink pt-0.5">
                    <AppleMark size={36} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-ink sm:text-lg">
                      Powered by Apple Search Ads
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      The same number advertisers bid on, scored across all {STORES.length} markets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: organic search growth graph */}
              <div className="min-w-0">
                <GrowthGraph onGetStarted={handleDashboard} />
              </div>

            </div>
          </div>
        </section>


        {/* ----------------------------------------------------- 2 · Social proof */}
        <section aria-label="Social proof" className="border-b border-line">
          <div className={cn(WRAP, "py-12 sm:py-16")}>

            {/* Stats row */}
            <dl className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-3">
              {PROOF_STATS.map((s) => (
                <div key={s.label} className="min-w-0 bg-surface px-6 py-7 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="min-w-0">
                    <span className="block font-display text-3xl font-extrabold leading-none tracking-tight text-accent-2">
                      {s.figure}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-ink">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-faint">
                      {s.sub}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Testimonials — auto-scrolling marquee */}
            <div className="relative mt-10 min-w-0 overflow-hidden">
              {/* Edge fades */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(to_right,var(--color-bg),transparent)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(to_left,var(--color-bg),transparent)]" />
              {/* Track — two identical sets so the loop is seamless */}
              <div className="flex gap-4 [animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <div
                    key={i}
                    className="w-72 shrink-0"
                    aria-hidden={i >= TESTIMONIALS.length}
                  >
                    <blockquote className="h-full rounded-card border border-line bg-surface p-6 shadow-1">
                      <div className="mb-3 flex gap-0.5 text-accent">
                        {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} />)}
                      </div>
                      <p className="text-md leading-relaxed text-ink-2">
                        "{t.quote}"
                      </p>
                      <footer className="mt-4 text-xs text-faint">{t.author}</footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* -------------------------------------------------------- 3 · FAQ */}
        <section
          id="faq"
          className={cn(WRAP, "mt-20 grid scroll-mt-24 gap-8 lg:grid-cols-[minmax(0,.62fr)_minmax(0,1fr)]")}
        >
          <div className="min-w-0">
            <Kicker>FAQ</Kicker>
            <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              Common questions
            </h2>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
              Can't find an answer?{" "}
              <Link href="/guides" className="text-accent underline-offset-2 hover:underline">
                Read the guides
              </Link>.
            </p>
          </div>
          <Faq items={FAQ} collapsible />
          <JsonLd data={faqSchema(FAQ)} />
        </section>


        {/* ---------------------------------------------------- 4 · Final CTA */}
        <section className={cn(WRAP, "my-24 min-w-0")}>
          <div className="overflow-hidden rounded-card border border-tint-line bg-tint p-8 sm:p-12">
            <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="min-w-0">
                <h2
                  className="max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Ready to find your best keywords?
                </h2>
                <ul className="mt-6 flex min-w-0 list-none flex-col gap-2.5">
                  {[
                    "Your first scores in under a minute",
                    `All ${STORES.length} storefronts included`,
                    "Cancel anytime, no contract",
                  ].map((p) => (
                    <li key={p} className="flex min-w-0 items-center gap-2.5 text-sm text-ink-2">
                      <span className="shrink-0 text-accent"><Spark size={12} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex min-w-0 flex-wrap gap-4">
                  <Link
                    href="/guides"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent no-underline hover:text-accent-2"
                  >
                    <Arrow size={14} /> Read the ASO guides
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted no-underline hover:text-ink"
                  >
                    <Arrow size={14} /> View pricing
                  </Link>
                </div>
              </div>

              <div className="min-w-0 flex flex-col items-start gap-3 lg:items-end">
                <Button
                  size="lg"
                  onClick={() => {
                    track("hero_cta_clicked");
                    user ? router.push("/dashboard") : setSignIn(true);
                  }}
                  disabled={!ready}
                >
                  {user ? "Go to dashboard" : "Score my keywords free"}
                </Button>
                {!user && (
                  <span className="text-xs text-faint">
                    3 keywords free · No credit card required
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />

      {signIn && <SignInModal onClose={() => setSignIn(false)} next="/onboarding" />}
    </div>
  );
}
