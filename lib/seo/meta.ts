/**
 * Title/description fitting for search results.
 *
 * Google truncates a result around 580px of title, which is roughly 60
 * characters of mixed-case text, and rewrites titles it considers unusable.
 * A templated title is fine until a long value lands in it — "Federated States
 * of Micronesia" pushed one storefront page to 74 characters — so templates
 * pass a list of increasingly short candidates rather than one string, and the
 * first one that fits wins.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/**
 * The shared share card.
 *
 * `app/opengraph-image.png` is picked up by the file convention only for routes
 * that do not export an `openGraph` block of their own — and every pSEO
 * template exports one to set its own title, which silently dropped the image
 * from 159 of 162 pages. Spreading this into each block puts it back.
 */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "ASOGrade — App Store keyword research across 109 storefronts",
};

/**
 * Pick the first candidate that fits, falling back to the shortest one given.
 * Candidates must be ordered longest (most descriptive) to shortest.
 */
export function fitTitle(candidates: string[]): string {
  for (const c of candidates) {
    if (c.length <= TITLE_MAX) return c;
  }
  return candidates[candidates.length - 1] ?? "";
}

/**
 * Trim a description to the truncation limit on a word boundary, so a snippet
 * never ends mid-word. Returns it unchanged when it already fits.
 */
export function fitDescription(text: string, max = DESCRIPTION_MAX): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\s]+$/, "");
}
