import type { Metadata } from "next";

/**
 * Private, like the dashboard, and previously inheriting the root layout's
 * metadata for the same reason: it exported none of its own. A page showing
 * somebody's subscription, invoice reference and billing address should never
 * have carried `index, follow` and a canonical pointing at the marketing home.
 */
export const metadata: Metadata = {
  title: "Billing — ASOGrade",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
