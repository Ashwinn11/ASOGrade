import type { Metadata } from "next";

/**
 * /onboarding is the onboarding funnel, and nothing else.
 *
 * It used to carry the title "Plans & Pricing — App Store Keyword Research"
 * with a canonical, an OG card and a sitemap entry at priority 0.8 — the
 * metadata of a marketing page, on a route that is gated behind Google sign-in
 * and renders a questionnaire. A crawler got a spinner; a visitor arriving from
 * search got a sign-in redirect; and the tab of a person halfway through the
 * questions read as a price list.
 *
 * That page exists properly now at /pricing, which is server-rendered, indexed
 * and canonical for everything commercial. This one is deliberately invisible:
 * noindex, no canonical, out of the sitemap and disallowed in robots.txt. The
 * title is what it should have been all along — the name of what the visitor is
 * actually doing.
 */
export const metadata: Metadata = {
  title: "Get started — ASOGrade",
  description:
    "Set up your ASOGrade account: a few questions about your app and how you pick keywords today.",
  robots: { index: false, follow: false },
  /* Replaces the root layout's `canonical: "/"` rather than merging with it.
     Without this the funnel served `<link rel="canonical" href="…/">`, telling
     any crawler that reached it that this page is the homepage. */
  alternates: { canonical: null },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
