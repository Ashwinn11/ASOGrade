import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";

  return {
    rules: [
      {
        // All search engines — full access to public pages
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/billing", "/auth", "/api/", "/onboarding"],
      },
      {
        // AI search, citation, and LLM training crawlers (ChatGPT, Claude, Gemini, Perplexity)
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Claude-SearchBot",
          "anthropic-ai",
          "Google-Extended",
          "Google-CloudVertexBot",
          "GoogleOther",
          "PerplexityBot",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/dashboard", "/billing", "/auth", "/api/", "/onboarding"],
      },
      {
        // Generic aggressive scrapers & non-search bots
        userAgent: ["Bytespider", "Amazonbot", "FacebookBot"],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
