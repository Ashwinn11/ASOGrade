import { NextResponse } from "next/server";
import { requireSubscription, refuse } from "@/lib/entitlement";
import { callTool, isOffline } from "@/lib/backend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { RankingApp } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Who holds the top spots for a keyword.
 *
 * Each keyword costs one upstream search, and the answer is identical for
 * everyone asking about that keyword in that store — so it caches in Postgres
 * alongside the other shared data. It used to live in this process's memory,
 * which on serverless means a cold empty cache per instance and therefore
 * almost no hits at all.
 */
const TTL_MS = 6 * 60 * 60 * 1000;
const DEPTH = 50;        // the provider clamps a single search to 50 results
const MAX_KEYWORDS = 30; // one request should not fan out further than this

export async function POST(req: Request) {
  // No free tier: every data route is behind a live subscription.
  const access = await requireSubscription();
  if (!access.ok) return refuse(access.reason);

  const { keywords = [], store = "us", limit = DEPTH } = await req.json().catch(() => ({}) as any);
  if (!Array.isArray(keywords) || !keywords.length) {
    return NextResponse.json({ ok: false, error: "keywords required" }, { status: 400 });
  }

  const st = String(store).toLowerCase();
  const want = Math.min(DEPTH, Math.max(1, Number(limit) || DEPTH));
  const asked = [...new Set(keywords.map((k: unknown) => String(k).toLowerCase()))].slice(0, MAX_KEYWORDS);

  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: false, error: "database is not configured" }, { status: 500 });

  const out: Record<string, RankingApp[]> = {};

  const { data: cached } = await db
    .from("keyword_rankings")
    .select("keyword, apps, fetched_at")
    .eq("store", st)
    .in("keyword", asked);

  const cutoff = Date.now() - TTL_MS;
  const fresh = new Set<string>();
  for (const row of cached ?? []) {
    if (new Date(row.fetched_at).getTime() > cutoff) {
      out[row.keyword] = (row.apps as RankingApp[]).slice(0, want);
      fresh.add(row.keyword);
    }
  }

  const misses = asked.filter((k) => !fresh.has(k));
  let offline = false;

  await Promise.all(
    misses.map(async (keyword) => {
      try {
        const res = await callTool<{ apps: RankingApp[] }>("search_app_store", {
          keyword, store: st, limit: DEPTH,
        });
        const apps = (res.apps ?? []).slice(0, DEPTH);
        await db.from("keyword_rankings").upsert(
          { keyword, store: st, apps, fetched_at: new Date().toISOString() },
          { onConflict: "keyword,store" },
        );
        out[keyword] = apps.slice(0, want);
      } catch (err) {
        offline ||= isOffline(err);
        // Better a six-hour-old board than an empty one.
        const stale = (cached ?? []).find((r) => r.keyword === keyword);
        out[keyword] = stale ? (stale.apps as RankingApp[]).slice(0, want) : [];
      }
    }),
  );

  return NextResponse.json({ ok: true, data: out, offline, cached: asked.length - misses.length });
}
