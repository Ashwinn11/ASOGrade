import type { NextRequest } from "next/server";

/**
 * IndexNow key file. The filename (minus .txt) IS the key — Bing/Yandex/Seznam
 * fetch this exact path to confirm whoever submits URLs for asograde.com
 * actually controls the domain, before trusting an IndexNow submission.
 * Never change the key without updating every place that submits with it.
 */
export const dynamic = "force-static";

export function GET(_req: NextRequest) {
  return new Response("8d79891d0a37e3315a8dabeb127d32f3", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
