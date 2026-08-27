import type { Metadata } from "next";
import Link from "next/link";
import { STORES } from "@/lib/types";
import { OG_IMAGE, fitMeta } from "@/lib/seo/meta";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import SiteHeader from "../ui/SiteHeader";
import Faq from "../ui/Faq";
import JsonLd from "../ui/JsonLd";
import BuyPlans from "./BuyPlans";
import { MONTHLY, YEARLY, PER_MONTH_ON_YEARLY, SAVING, YEAR_AT_MONTHLY } from "../ui/Plans";

/**
 * The public pricing page.
 *
 * This content used to be the signed-out branch of /onboarding, which made /onboarding
 * two pages wearing one route: an onboarding funnel for people with an account
 * and a pricing page for everybody else. That is why its title was "Plans &
 * Pricing" — a funnel titled after the only part of it a crawler could see —
 * and why a private, JavaScript-gated flow was sitting in the sitemap at
 * priority 0.8.
 *
 * Splitting them lets each one be good at its job. This page is a plain server
 * component: no client bundle, no auth check, no redirect, so the price is in
 * the first byte of HTML for anyone — reader or crawler — who asks what this
 * costs. /onboarding is now noindex and does nothing but convert.
 *
 * The buy buttons are the one client island on it (see BuyPlans). They used to
 * be links to /onboarding, which sent someone who had just chosen a plan into a
 * six-question onboarding funnel before showing them the same price again;
 * they now open checkout, signing in first if they need to. This is also where
 * the onboarding flow lets out, so it is the only paywall in the product.
 *
 * Stripped to the transaction. It carried a price-anchor box, a paragraph of
 * positioning and a five-question FAQ under the cards, plus a nav bar and a
 * footer — a page of reading and thirty exits placed between somebody who came
 * to subscribe and the button they came to press. Everybody who reaches this
 * either walked the landing page or just answered six questions; none of them
 * needs the product explained again. Headline, price, what you get, buy. The
 * wordmark is the only way out, on purpose.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

const TITLE = `ASOGrade Pricing — $${MONTHLY}/mo or $${YEARLY}/yr`;

/* Was 178 characters, the only description on the site over the 160 Google
   renders, so it was the only one being cut in the result it was written for. */
const DESCRIPTION = fitMeta([
  `App Store keyword research for $${PER_MONTH_ON_YEARLY} a month on the yearly plan. All ${STORES.length} storefronts, ` +
    `100 keywords a check, competitor teardowns. No free tier.`,
  `App Store keyword research from $${PER_MONTH_ON_YEARLY} a month. All ${STORES.length} storefronts and ` +
    `competitor teardowns on both plans.`,
]);

/* Below the buttons, and that placement is the whole argument.
 *
 * This page was deliberately stripped to the transaction, and the reasoning in
 * the block above still holds for everyone who arrives from the landing page or
 * out of onboarding. It does not hold for the third audience, which has no way
 * in from either: somebody searching what an ASO tool costs. For them a
 * 125-word page with one heading, no other heading, and three links was never
 * going to rank, and the query is the most commercial one this site has.
 *
 * So the transaction keeps the top of the page untouched — headline, price,
 * buy, in the first screen, in that order — and the reading goes underneath it
 * where a buyer never has to walk through it. The FAQ is <details>, so it costs
 * no vertical space until opened and adds no exits. Still no nav, still no
 * footer: the objection to those was thirty ways out of a checkout, and that
 * objection is right.
 */
const FAQ = [
  {
    q: "Is there a free trial?",
    a: `No, and there is no free tier either. Every keyword you score costs a live Apple Search Ads lookup and a ranking pass over the storefront, so there is no version of this that is free to run. The yearly plan works out at $${PER_MONTH_ON_YEARLY} a month if you want the cheapest way in.`,
  },
  {
    q: "What is the difference between the monthly and yearly plans?",
    a: `Price only. Both plans include all ${STORES.length} storefronts, 100 keywords a check, 50 ranked apps behind any keyword, competitor teardowns and daily refreshes. Monthly is $${MONTHLY}. Yearly is $${YEARLY} billed once, against $${YEAR_AT_MONTHLY} for twelve monthly payments, so it saves $${SAVING}.`,
  },
  {
    q: "How does this compare to a full ASO suite?",
    a: "Suites run $79 to $300 a month and most of what you pay for is rank tracking, review analysis, ad campaign management and reporting. ASOGrade does the keyword research pass and stops there. If you need the tracking and campaign tooling, a suite is the better buy and priced accordingly.",
  },
  {
    q: "Can I cancel?",
    a: "Any time, from the billing page. Access runs to the end of the period you have already paid for, and nothing renews after that. Your keyword list stays on your account if you come back.",
  },
  {
    q: "Is tax included?",
    a: "No. Prices exclude local tax, which is calculated and added at checkout based on where you are. Payments are handled by Dodo Payments as merchant of record, so your invoice comes from them.",
  },
  {
    q: "What does it not do?",
    a: "Rank tracking over time, review analysis, ad campaign management, and A/B testing of screenshots. It is a read-only research tool: it never submits anything to the App Store or changes your metadata for you.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/pricing`,
    type: "website",
    images: [OG_IMAGE],
  },
};


export default function Pricing() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader links={[]} />

      <main className="mx-auto my-10 w-[min(100%-1.5rem,44rem)] min-w-0 flex-1">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
          One price, every storefront
        </h1>

        <BuyPlans />

        <p className="mt-8 text-xs leading-relaxed text-faint">
          Cancel any time. Prices exclude tax; local tax is added at checkout.
          Payments handled securely by Dodo Payments.{" "}
          <Link className="text-accent underline underline-offset-2" href="/terms">Terms of Service</Link>{" "}
          and{" "}
          <Link className="text-accent underline underline-offset-2" href="/privacy">Privacy Policy</Link>.
        </p>

        {/* Everything from here down is for the search visitor. A buyer has
            already pressed a button two screens up. */}
        <section className="mt-16 min-w-0 border-t border-line pt-10">
          <h2 className="font-display text-xl font-extrabold leading-tight tracking-tight text-ink">
            {`What $${MONTHLY} a month buys`}
          </h2>
          <p className="mt-4 max-w-[62ch] text-md leading-relaxed text-muted">
            Both plans are the same product. There is no feature held back for a
            higher tier, because there is no higher tier. You get keyword scoring
            across all {STORES.length} App Store storefronts, with popularity taken
            from Apple Search Ads and difficulty calculated from the apps currently
            ranking for the term in that specific market. You can score 100 keywords
            in a pass, open the 50 apps sitting behind any one of them, and paste a
            competitor&apos;s App Store link to read their entire keyword set the
            same way. Scores cache and refresh daily.
          </p>
          <p className="mt-4 max-w-[62ch] text-md leading-relaxed text-muted">
            The alternative most people weigh this against is a full ASO suite at
            $79 to $300 a month. Those are better tools if you need rank tracking,
            review analysis or campaign management, and most of their price is those
            things. This does the research pass and stops.
          </p>
        </section>

        <section className="mt-14 min-w-0">
          <h2 className="font-display text-xl font-extrabold leading-tight tracking-tight text-ink">
            Pricing questions
          </h2>
          <Faq className="mt-5" items={FAQ} collapsible />
        </section>
      </main>

      <JsonLd
        data={[
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "ASOGrade", url: SITE_URL },
            { name: "Pricing", url: `${SITE_URL}/pricing` },
          ]),
        ]}
      />
    </div>
  );
}
