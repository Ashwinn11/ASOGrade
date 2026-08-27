/**
 * Join class names, dropping anything falsy.
 *
 * Deliberately not a Tailwind-aware merger: the components in this folder are
 * written so that callers add classes (layout, margin) rather than override
 * them, so last-wins string concatenation is enough and there is no dependency
 * to keep current.
 */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
