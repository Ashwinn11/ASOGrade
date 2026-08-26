import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

export const metadata: Metadata = {
  title: "Get Started — App Store Keyword Research Plans & Pricing | ASOGrade",
  description:
    "Choose your ASOGrade plan. Full access to all 109 App Store storefronts, 100 keywords per batch, competitor teardowns, and daily updates — $14.99/mo or $99/yr.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "Get Started — App Store Keyword Research Plans & Pricing | ASOGrade",
    description:
      "Choose your ASOGrade plan. Full access to all 109 App Store storefronts, 100 keywords per batch, competitor teardowns, and daily updates.",
    url: `${SITE_URL}/start`,
    type: "website",
  },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
