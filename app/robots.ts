import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

  return {
    rules: [
      {
        // All search engines — full access to public pages
        userAgent: "*",
        allow: "/",
        disallow: ["/app", "/billing", "/auth", "/api/"],
      },
      {
        // AI search bots (ChatGPT, Perplexity, Claude) — allow for citations
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Claude-SearchBot",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: ["/app", "/billing", "/auth", "/api/"],
      },
      {
        // AI training crawlers — block (opt out of training data)
        userAgent: [
          "GPTBot",
          "anthropic-ai",
          "Google-Extended",
          "Google-CloudVertexBot",
          "CCBot",
          "Bytespider",
          "Amazonbot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
