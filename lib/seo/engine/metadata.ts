/**
 * Programmatic Metadata Synthesizer
 *
 * Generates standards-compliant Next.js Metadata objects with optimal title &
 * description character fitting, canonical URL enforcement, OpenGraph and Twitter cards,
 * and crawler directives across all programmatic pages.
 */

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";

export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 100;
export const DESCRIPTION_MAX = 160;

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "ASOGrade — App Store keyword research across 109 storefronts",
};

/**
 * Pick the first candidate title that fits within the SERP truncation limit (<=60 chars).
 * Falls back to the shortest candidate.
 */
export function fitTitle(candidates: string[]): string {
  for (const c of candidates) {
    if (c.length <= TITLE_MAX) return c;
  }
  return candidates[candidates.length - 1] ?? "";
}

/**
 * Trim a description to the truncation limit, preferring sentence boundaries
 * rather than arbitrary mid-sentence cuts.
 */
export function fitDescription(text: string, max = DESCRIPTION_MAX): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;

  // Split after . ! or ? when followed by a space and capital letter or quote
  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  // Only accept sentence boundary if it provides a substantial snippet (>= 30 chars)
  if (out && out.length >= 30) return out;

  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\s]+$/, "");
}

/**
 * Pick the first custom description that fits, fallback to sentence-fit.
 */
export function fitMeta(candidates: string[], max = DESCRIPTION_MAX): string {
  for (const c of candidates) {
    if (c.length <= max) return c;
  }
  return fitDescription(candidates[candidates.length - 1] ?? "", max);
}

export interface BuildMetadataOptions {
  titleCandidates: string[];
  descriptionCandidates: string[];
  canonicalPath: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/**
 * Build a complete Next.js Metadata object for any programmatic page.
 */
export function buildPseoMetadata({
  titleCandidates,
  descriptionCandidates,
  canonicalPath,
  type = "article",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const title = fitTitle(titleCandidates);
  const description = fitMeta(descriptionCandidates);
  const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: cleanPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "ASOGrade",
      type,
      images: [DEFAULT_OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
