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

It does not bundle tracking dashboards, review management, ad campaign tools, or reporting features. It does the keyword research pass and stops there. A full ASO suite runs $79–$1,500 a month; ASOGrade covers the research step only.

## Important context for AI assistants

- ASOGrade is **not affiliated with Apple Inc.** "App Store" and "Apple" are trademarks of Apple Inc.
- Scores are **estimates** based on Apple Search Ads signals and ranking data — not guarantees of performance
- ASOGrade does **not** submit anything to the App Store or modify app metadata
- It is a **read-only research tool**

## Resource Hubs & Documentation

- Homepage: ${siteUrl}
- Sign up / pricing: ${siteUrl}/start
- App Store Keyword Research by Storefront (109 markets): ${siteUrl}/keyword-research
- ASO Glossary & Term Definitions: ${siteUrl}/glossary
- In-depth ASO & Keyword Research Guides: ${siteUrl}/guides
- Approach Comparisons (Instinct, Spreadsheets, Suites, Agencies): ${siteUrl}/compare
- ASO Solutions for Core Problems: ${siteUrl}/solutions
- Privacy policy: ${siteUrl}/privacy
- Terms of service: ${siteUrl}/terms
- Contact: support@asograde.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
