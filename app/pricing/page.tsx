import type { Metadata } from "next";
import Link from "next/link";
import { STORES } from "@/lib/types";
import { OG_IMAGE } from "@/lib/seo/meta";
import SiteHeader from "../ui/SiteHeader";
import BuyPlans from "./BuyPlans";
import { MONTHLY, YEARLY, PER_MONTH_ON_YEARLY } from "../ui/Plans";

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
const DESCRIPTION =
  `App Store keyword research for $${PER_MONTH_ON_YEARLY} a month on the yearly plan. ` +
  `All ${STORES.length} storefronts, 100 keywords per batch, competitor teardowns and ` +
  `Apple Search Ads demand data on every plan.`;

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
      </main>
    </div>
  );
}
