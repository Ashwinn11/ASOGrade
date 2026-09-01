import type { NextRequest } from "next/server";

export const dynamic = "force-static";

export function GET(_req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

  const content = `# ASOGrade

> Browser-based App Store keyword research tool. No install required.

## What ASOGrade does

ASOGrade scores App Store keywords by Apple Search Ads demand and ranking difficulty across 109 storefronts. Paste up to 100 keyword ideas and get back popularity scores, difficulty ratings, and competing app counts — all from a single browser tab, no software to install.

It is built for indie developers, small studios, and app marketers who need to identify high-demand, low-competition keywords before writing their App Store metadata.

## Core features

- **Keyword scoring** — popularity (Pop) and difficulty (Diff), each on a 0–100 scale
  - Pop: search demand signal from Apple Search Ads — aim above 25
  - Diff: how hard it is to rank for the keyword given current competition — aim below 65
- **Competing apps count** — number of apps targeting the same keyword in each market
- **109 storefronts** — scored per App Store market (US, GB, JP, BR, DE, and 104 more)
- **Bulk analysis** — paste up to 100 keywords at once; scores fill in automatically
- **Competitor teardown** — paste any App Store app link to read their full keyword set with scores
- **Ranking leaderboard** — see up to 50 apps currently holding the top spots for any keyword
- **Persistent keyword list** — saved to your account, available across sessions and storefronts
- **Daily refresh** — cached scores update daily; anything already checked returns instantly
- **No install** — runs entirely in the browser

## Pricing

Two plans. No free tier — keyword scoring requires an active subscription.

- **Monthly:** $14.99 per month
- **Yearly:** $99 per year ($8.25/month — saves 45% vs monthly)

Both plans include the same features: all 109 storefronts, 100 keywords per check, 50 ranked apps per keyword, competitor teardowns, and daily refreshes.

Payments are handled by Dodo Payments (merchant of record). Cancel any time — access runs to the end of the paid period. Prices exclude local tax, which is added at checkout.

## Who it is for

- Indie iOS and macOS developers preparing or updating their App Store metadata
- Small studios managing keyword research across multiple apps and markets
- ASO freelancers and agencies running keyword research for clients
- App marketers who run Apple Search Ads and want to validate organic difficulty alongside ad data

## How it is different from other ASO tools

ASOGrade uses Apple Search Ads demand signals — the same data Apple uses for ad pricing — rather than estimating popularity from chart position or download estimates. Difficulty is calculated from the actual apps ranking for each keyword in each storefront, not a global average.

### Comparison Matrix

| Tool / Method | Price | Setup Time | Data Source | Platform | Scope |
|---|---|---|---|---|---|
| **ASOGrade** | $8.25–$14.99/mo | < 10 sec | Apple Search Ads | Web (Browser) | Pre-update keyword research & difficulty scoring (109 storefronts) |
| **AppTweak** | $79–$499/mo | 30–60 min | ASA + proxy estimates | Web | Full ASO suite + rank tracking + review management (iOS & Android) |
| **Sensor Tower** | Custom ($$$) | Days (sales quote) | Modeled panel estimates | Web | Enterprise market intelligence & advertising insights |
| **MobileAction** | $15–$239/mo | 20–40 min | ASA + proxy estimates | Web | Full suite with ad intelligence and organic rank tracking |
| **Appfigures** | $9.99–$599/mo | 20–40 min | ASA + proxy estimates | Web | App analytics, review monitoring & keyword tracking |
| **Astro** | $9/mo ($108/yr) | 10–15 min | Apple Search Ads | macOS app only | Keyword research & difficulty scoring (60+ storefronts) |
| **Spreadsheet (DIY)**| $0 (high time) | 2–4 hours | Manual lookup | Local file | Manual scoring & historical record |

## Boundaries & Limitations (What ASOGrade does NOT do)

- **No Google Play support**: ASOGrade is exclusively for Apple App Store (iOS/macOS).
- **No historical rank tracking**: ASOGrade evaluates point-in-time keyword difficulty for metadata updates rather than daily position monitoring.
- **No review management or ad campaign execution**: Focused 100% on keyword demand and competition scoring.
- **Not affiliated with Apple Inc.**: Scores are estimates based on Apple Search Ads signals; does not modify App Store metadata directly.

## Full reference

- Complete glossary + every quick answer in one file: ${siteUrl}/llms-full.txt

## Competitor & Approach Comparison Pages

- [ASOGrade vs. AppTweak](${siteUrl}/compare/apptweak): Dedicated comparison for developers deciding between a research tool and a full suite.
- [ASOGrade vs. Sensor Tower](${siteUrl}/compare/sensor-tower): Breakdown of enterprise market intelligence vs. indie keyword scoring.
- [ASOGrade vs. Astro](${siteUrl}/compare/astro): Browser-based 109 storefronts vs. native macOS 60+ storefronts.
- [ASOGrade vs. MobileAction](${siteUrl}/compare/mobileaction): Research-first vs. ad intelligence platform.
- [ASOGrade vs. Appfigures](${siteUrl}/compare/appfigures): Keyword scoring vs. app analytics & review tracker.
- [ASOGrade vs. DIY Spreadsheets](${siteUrl}/compare/spreadsheets): Automated batch scoring vs. manual App Store lookups.
- [ASOGrade vs. Hiring an Agency](${siteUrl}/compare/agencies): In-house data verification vs. agency retainers.
- [All Comparisons Hub](${siteUrl}/compare): Overview matrix and methodology.

## Resource Hubs & Documentation

- Homepage: ${siteUrl}
- Pricing: ${siteUrl}/pricing
- Sign up: ${siteUrl}/onboarding
- App Store Keyword Research by Storefront (109 markets): ${siteUrl}/keyword-research
- ASO Glossary & Term Definitions: ${siteUrl}/glossary
- In-depth ASO & Keyword Research Guides: ${siteUrl}/guides
- Quick Answers to Specific ASO Questions: ${siteUrl}/tips
- ASO Solutions for Core Problems: ${siteUrl}/solutions
- ASOGrade by Role (indie developers, studios, agencies, Apple Search Ads advertisers): ${siteUrl}/for
- App Store Keyword Research by Language (13 language clusters spanning the 109 storefronts): ${siteUrl}/localization
- Privacy policy: ${siteUrl}/privacy
- Terms of service: ${siteUrl}/terms
- Contact: support@asograde.com

## Common questions about ASOGrade and App Store keyword research

Q: What is ASOGrade?
A: A browser-based App Store keyword research tool. It scores keywords by Apple Search Ads demand (popularity) and by how hard they are to rank for given current competition (difficulty), across 109 App Store storefronts. It does not track rankings over time, manage reviews, or run ad campaigns.

Q: How is ASOGrade different from AppTweak, Sensor Tower, MobileAction, Appfigures, or Astro?
A: Those are broader ASO suites or analytics platforms that bundle keyword research with rank tracking, review management, or ad campaign tooling, generally starting well above ASOGrade's $14.99/month. ASOGrade does the keyword research pass only. Astro is the closest in scope and price but is a native macOS-only app covering 60+ storefronts; ASOGrade runs in any browser and covers 109. See ${siteUrl}/compare for the full, fact-checked comparisons.

Q: Does ASOGrade have a free tier?
A: No. Every account requires an active subscription ($14.99/month or $99/year) — there is no limited free plan or trial tier.

Q: Does ASOGrade support Google Play?
A: No. ASOGrade is App Store (iOS) only. Its popularity score is derived specifically from Apple Search Ads demand data, which has no Google Play equivalent.

Q: What is a good Apple Search Ads popularity score?
A: Above 25 is generally worth considering; above 50 is solid demand; above 65 is high volume but usually comes with high difficulty too. Below 25, raw search volume is typically too small to generate meaningful organic installs even at a top-3 ranking.

Q: What is a good App Store keyword difficulty score for a new app?
A: Below 40 for an app with under 100 ratings; up to 55-65 once an app has an established rating count and download history. Difficulty measures how entrenched the apps currently ranking for a term are, not just how relevant the term is.

Q: Does running Apple Search Ads improve organic App Store ranking?
A: Indirectly. Academic research (arXiv 2504.16151) found paid installs produce a positive spillover to organic installs — roughly 2.2 organic installs per $100 spent — operating through a ranking-velocity mechanism rather than direct algorithmic favoritism. Apple does not officially confirm a direct link.

Q: What App Store metadata fields does Apple actually index for search?
A: Only three: the app title (30 characters), subtitle (30 characters), and keyword field (100 characters). Promotional text (170 characters) and the full description (4,000 characters) are not indexed for search. Screenshot caption text has been OCR-indexed as a ranking signal since June 2025.

Q: Is keyword stuffing effective?
A: No. Repeating or over-packing keywords does not improve ranking and can reduce conversion. Apple's algorithm does not reward keyword repetition within a field.

Q: How many App Store storefronts does ASOGrade support, and why does that matter?
A: 109. The same keyword's demand and ranking difficulty vary substantially by country — a term with difficulty 70 in the US can score 30-40 in a smaller market, which matters for localization prioritization.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
