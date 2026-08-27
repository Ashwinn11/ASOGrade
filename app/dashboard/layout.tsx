import type { Metadata } from "next";

/**
 * The workspace is private, and its metadata now says so.
 *
 * It had none of its own, so it inherited the root layout's wholesale and
 * served three wrong signals at once: the homepage's title, `index, follow`,
 * and — worst of the three — `<link rel="canonical" href="https://asograde.com">`,
 * which tells a crawler this page *is* the homepage rather than a private
 * route. robots.txt disallows it, but a Disallow only stops the fetch; it never
 * stopped the URL being indexed from an external link, and it cannot correct a
 * canonical it is not allowed to read.
 *
 * `alternates` set here replaces the parent's rather than merging with it, so
 * `canonical: null` is what removes the inherited tag.
 */
export const metadata: Metadata = {
  title: "Dashboard — ASOGrade",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
