import type { Metadata } from "next";
import { LOCALIZATIONS } from "@/lib/seo/localization";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { OG_IMAGE } from "@/lib/seo/meta";
import { SITE_URL } from "@/lib/seo/site";
import PseoLayout from "@/app/ui/PseoLayout";
import Section, { PageHero } from "@/app/ui/Section";
import { LinkCardGrid } from "@/app/ui/LinkCard";

export const metadata: Metadata = {
  title: "App Store Keyword Research by Language | ASOGrade",
  description:
    "App Store keyword research organized by language, not just by country — dialect, script, and register differences across the storefronts that share each language.",
  alternates: { canonical: "/localization" },
  openGraph: {
    images: [OG_IMAGE],
    title: "App Store Keyword Research by Language | ASOGrade",
    description:
      "App Store keyword research organized by language, not just by country — dialect, script, and register differences across the storefronts that share each language.",
    url: `${SITE_URL}/localization`,
    type: "website",
  },
};

export default function LocalizationHub() {
  return (
    <PseoLayout
      current="/localization"
      trail={[{ label: "ASOGrade", href: "/" }, { label: "Localization" }]}
      schema={[
        collectionPageSchema({
          title: "App Store Keyword Research by Language",
          description:
            "Dialect, script, and register differences across the App Store storefronts that share each language.",
          url: `${SITE_URL}/localization`,
        }),
        breadcrumbSchema([
          { name: "ASOGrade", url: SITE_URL },
          { name: "Localization", url: `${SITE_URL}/localization` },
        ]),
      ]}
      cta={{
        heading: "Score the same keyword across every storefront that speaks it",
        body: "Paste your candidate list once and check demand and difficulty across any of the 109 storefronts.",
      }}
    >
      <PageHero
        title="App Store Keyword Research by Language"
        lead="Our 109 storefront pages are organized by country. This is the other axis: what stays the same and what genuinely changes — vocabulary, script, register, difficulty — when one language spans several App Store markets."
      />

      <Section>
        <LinkCardGrid
          min={280}
          items={LOCALIZATIONS.map((l) => ({
            href: `/localization/${l.slug}`,
            title: l.language,
            note: l.subtitle,
            badge: `${l.storefronts.length} storefront${l.storefronts.length === 1 ? "" : "s"}`,
            cta: "Read more",
          }))}
        />
      </Section>
    </PseoLayout>
  );
}
