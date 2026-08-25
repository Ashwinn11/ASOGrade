import { NextResponse } from "next/server";
import { callTool } from "@/lib/backend";
import type { RankingApp } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The leaderboard for a keyword: who currently holds its top spots.
 *
 * Each keyword costs one upstream search call, so we always pull the deepest
 * list the provider will give (50 — it silently ignores anything higher) and
 * cache that. Asking for the first 10 and then all 50 is one call, not two.
 */
const DEPTH = 50;
const TTL_MS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; apps: RankingApp[] }>();

function fromCache(key: string): RankingApp[] | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > TTL_MS) { cache.delete(key); return null; }
  return hit.apps;
}

export async function POST(req: Request) {
  const { keywords = [], store = "us", limit = DEPTH } = await req.json();
  if (!Array.isArray(keywords) || !keywords.length) {
    return NextResponse.json({ ok: false, error: "keywords required" }, { status: 400 });
  }

  const want = Math.min(DEPTH, Math.max(1, Number(limit) || DEPTH));
  const out: Record<string, RankingApp[]> = {};
  const misses: string[] = [];

  for (const kw of keywords.slice(0, 30) as string[]) {
    const hit = fromCache(`${store}:${kw}`);
    if (hit) out[kw] = hit.slice(0, want);
    else misses.push(kw);
  }

  await Promise.all(
    misses.map(async (kw) => {
      try {
        const res = await callTool<{ apps: RankingApp[] }>("search_app_store", {
          keyword: kw, store, limit: DEPTH,
        });
        const apps = res.apps ?? [];
        cache.set(`${store}:${kw}`, { at: Date.now(), apps });
        out[kw] = apps.slice(0, want);
      } catch {
        out[kw] = [];
      }
    }),
  );

  return NextResponse.json({
    ok: true, data: out, depth: DEPTH, cached: keywords.length - misses.length,
  });
}
