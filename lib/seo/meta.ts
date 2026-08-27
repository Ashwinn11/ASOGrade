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
 * Trim a description to the truncation limit, preferring a sentence boundary.
 *
 * The word-boundary version of this shipped 133 of 162 descriptions ending
 * mid-clause: "…based on the strength of", "…ranking results, and keyword
 * difficulty — 109", "…to display their app at the top of search". That string
 * is the snippet somebody reads before deciding whether to click, so it has to
 * be a finished thought rather than the first 160 characters of one.
 *
 * Whole sentences first, as many as fit. Only a first sentence that is itself
 * over the limit falls back to the word-boundary cut, and that case is the one
 * the caller should fix with a purpose-written description instead.
 */
export function fitDescription(text: string, max = DESCRIPTION_MAX): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;

  // Split after . ! or ? when the next character starts a new sentence, so
  // "e.g. 'colour'" and "0–100" are not mistaken for sentence ends.
  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;

  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\s]+$/, "");
}

/**
 * Pick the first purpose-written description that fits, longest first.
 *
 * The counterpart to `fitTitle`. A template that can say the same thing at two
 * lengths should offer both here rather than hand a paragraph to
 * `fitDescription` and hope the cut lands somewhere sensible.
 */
export function fitMeta(candidates: string[], max = DESCRIPTION_MAX): string {
  for (const c of candidates) {
    if (c.length <= max) return c;
  }
  return fitDescription(candidates[candidates.length - 1] ?? "", max);
}
