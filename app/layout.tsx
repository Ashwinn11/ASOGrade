import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASOKit - App Store keyword research in your browser",
  description: "Find App Store keywords with Apple Search Ads popularity, ranking difficulty, and storefront-by-storefront context.",
  openGraph: {
    title: "ASOKit - App Store keyword research in your browser",
    description: "Score App Store keyword ideas before they reach your next metadata update.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ASOKit - App Store keyword research in your browser",
    description: "Score App Store keyword ideas before they reach your next metadata update.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..1000&family=Geist+Mono:wght@400..600&family=Outfit:wght@500..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
