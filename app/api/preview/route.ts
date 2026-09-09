import { NextResponse } from "next/server";
import { callTool, isOffline } from "@/lib/backend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { workspaceId } from "@/lib/workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public keyword preview — no subscription required.
 *
 * Accepts a single keyword and a store (default "us"). Checks the shared
 * keyword_metrics cache first; only reaches the provider on a cache miss.
 * Does NOT save anything to any user's keyword list.
 *
 * Rate limiting is intentionally left to the client UI (3-keyword soft wall).
 * Anyone hitting this endpoint directly via curl isn't our conversion target.
 */

const TTL_MS = 24 * 60 * 60 * 1000;

const norm = (s: string) =>
  String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");

export async function POST(req: Request) {
  let body: { keyword?: unknown; store?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const keyword = norm(body.keyword as string);
  const store = norm((body.store as string) ?? "us");

  if (!keyword) {
    return NextResponse.json({ ok: false, error: "keyword required" }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json({ ok: false, error: "database not configured" }, { status: 500 });
  }

  /* ---------------------------------------------------------- 1. cache */

  const { data: cached } = await db
    .from("keyword_metrics")
    .select("keyword, store, popularity, difficulty, apps_count, fetched_at")
    .eq("store", store)
    .eq("keyword", keyword)
    .maybeSingle();

  if (cached && Date.now() - new Date(cached.fetched_at).getTime() < TTL_MS) {
    return NextResponse.json({
      ok: true,
      cached: true,
      keyword: cached.keyword,
      store: cached.store,
      popularity: cached.popularity,
      difficulty: cached.difficulty,
      appsCount: cached.apps_count,
    });
  }

  /* ------------------------------------------- 2. fetch from provider */

  try {
    const ws = await workspaceId();

    await callTool("add_keywords", {
      appId: ws,
      store,
      keywords: [keyword],
      platform: "iphone",
    });

    const listed = await callTool<any>("get_app_keywords", { appId: ws, store });
    const rows: any[] = Array.isArray(listed) ? listed : listed?.keywords ?? [];

    const match = rows.find(
      (r) => norm(r?.keyword) === keyword,
    );

    const result = {
      keyword,
      store,
      popularity: match?.popularity ?? null,
      difficulty: match?.difficulty ?? null,
      apps_count: match?.appsCount ?? null,
      fetched_at: new Date().toISOString(),
    };

    // Write to cache so the next request for the same keyword is instant.
    await db
      .from("keyword_metrics")
      .upsert(result, { onConflict: "keyword,store" });

    return NextResponse.json({
      ok: true,
      cached: false,
      keyword: result.keyword,
      store: result.store,
      popularity: result.popularity,
      difficulty: result.difficulty,
      appsCount: result.apps_count,
    });
  } catch (err) {
    // If the provider is down, serve stale cache rather than an error.
    if (cached) {
      return NextResponse.json({
        ok: true,
        cached: true,
        stale: true,
        keyword: cached.keyword,
        store: cached.store,
        popularity: cached.popularity,
        difficulty: cached.difficulty,
        appsCount: cached.apps_count,
      });
    }

    const offline = isOffline(err);
    return NextResponse.json(
      {
        ok: false,
        offline,
        error: offline
          ? "Keyword service is temporarily unavailable"
          : err instanceof Error ? err.message : String(err),
      },
      { status: offline ? 503 : 500 },
    );
  }
}
