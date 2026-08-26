import { NextResponse } from "next/server";
import { requireSubscription, refuse } from "@/lib/entitlement";
import { callTool, isOffline } from "@/lib/backend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { workspaceId } from "@/lib/workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A keyword lookup.
 *
 * The cache is the product; the provider is a background detail. Anything we
 * have already seen is served straight from Postgres, which means it keeps
 * working while the provider's machine is asleep. Only genuine misses reach
 * out, and if that fails we still return everything we know plus an honest
 * note about what is missing.
 */

/** The provider refreshes on a daily cadence, so matching it is enough. */
const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_KEYWORDS = 100;

type Metric = {
  keyword: string;
  store: string;
  popularity: number | null;
  difficulty: number | null;
  appsCount: number | null;
  fetchedAt: string;
  fresh: boolean;
};

const clean = (list: unknown): string[] =>
  Array.isArray(list)
    ? [...new Set(
        list.map((k) => String(k).trim().toLowerCase().replace(/\s+/g, " ")).filter(Boolean),
      )].slice(0, MAX_KEYWORDS)
    : [];

const shape = (row: any, fresh: boolean): Metric => ({
  keyword: row.keyword,
  store: row.store,
  popularity: row.popularity,
  difficulty: row.difficulty,
  appsCount: row.apps_count,
  fetchedAt: row.fetched_at,
  fresh,
});

export async function POST(req: Request) {
  // No free tier: every data route is behind a live subscription.
  const access = await requireSubscription();
  if (!access.ok) return refuse(access.reason);

  let body: { keywords?: unknown; store?: unknown; save?: unknown; force?: unknown; skipFetch?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const keywords = clean(body.keywords);
  const store = String(body.store ?? "us").toLowerCase();
  if (!keywords.length) {
    return NextResponse.json({ ok: false, error: "keywords required" }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "database is not configured" },
      { status: 500 },
    );
  }

  /* ---------------------------------------------------------- 1. cache */

  const { data: cached } = await db
    .from("keyword_metrics")
    .select("keyword, store, popularity, difficulty, apps_count, fetched_at")
    .eq("store", store)
    .in("keyword", keywords);

  const cutoff = Date.now() - TTL_MS;
  const have = new Map<string, Metric>();
  for (const row of cached ?? []) {
    have.set(row.keyword, shape(row, new Date(row.fetched_at).getTime() > cutoff));
  }

  // Claiming a keyword and scoring it are separate jobs. `skipFetch` does only
  // the first, so a big batch lands in the user's list instantly and the scores
  // arrive afterwards instead of holding the request open for a minute.
  // `force` is the Recheck button: ignore the TTL and re-ask for everything.
  const skipFetch = body.skipFetch === true;
  const stale = skipFetch
    ? []
    : body.force === true
      ? keywords
      : keywords.filter((k) => !have.get(k)?.fresh);
  const hits = keywords.length - stale.length;   // answered without touching the provider

  /* -------------------------------------------------- 2. fill the gaps */

  let offline = false;
  if (stale.length) {
    try {
      const ws = await workspaceId();

      // New keywords get fetched; ones the scratchpad already tracks come back
      // as "Already tracked" in a few milliseconds and cost nothing upstream.
      const added = await callTool<any>("add_keywords", {
        appId: ws, store, keywords: stale, platform: "iphone",
      });

      const fetchedAt = new Date().toISOString();
      const norm = (k: unknown) => String(k ?? "").replace(/\s+/g, " ").trim().toLowerCase();
      const wanted = new Set(stale);
      const found = new Map<string, { popularity: number | null; difficulty: number | null; apps_count: number | null }>();

      // Freshly fetched rows carry their scores in this very response.
      const results: any[] = added?.results ?? [];
      for (const r of results) {
        if (r?.skipped || r?.success === false) continue;
        const keyword = norm(r.keyword);
        if (!wanted.has(keyword)) continue;
        found.set(keyword, {
          popularity: r.popularity ?? null,
          difficulty: r.difficulty ?? null,
          apps_count: r.appsCount ?? null,   // absent here; the next refresh fills it
        });
      }

      /*
       * add_keywords answers with popularity and difficulty but never
       * appsCount, and rows the scratchpad already held come back as 0/0. Both
       * gaps are only readable through get_app_keywords, which returns the
       * whole corpus for the store with no way to narrow it.
       *
       * This used to run only when something was skipped, on the theory that
       * the full read was expensive. It is not — 183 keywords come back in
       * about 140ms — and skipping it meant a brand new keyword was always
       * saved with a null appsCount, which then filled itself in on the next
       * visit once the keyword counted as already tracked. That is the
       * "I had to hit refresh" bug. Always pay the 140ms.
       */
      {
        const listed = await callTool<any>("get_app_keywords", { appId: ws, store });
        const rows: any[] = Array.isArray(listed) ? listed : listed?.keywords ?? [];
        for (const r of rows) {
          const keyword = norm(r?.keyword);
          if (!wanted.has(keyword)) continue;
          found.set(keyword, {
            popularity: r.popularity ?? null,
            difficulty: r.difficulty ?? null,
            apps_count: r.appsCount ?? null,
          });
        }
      }

      const upserts = [...found.entries()].map(([keyword, v]) => ({
        keyword, store, ...v, fetched_at: fetchedAt,
      }));

      if (upserts.length) {
        await db.from("keyword_metrics").upsert(upserts, { onConflict: "keyword,store" });
        for (const row of upserts) have.set(row.keyword, shape(row, true));
      }
    } catch (err) {
      // Serving stale beats serving nothing, so swallow this and report it.
      offline = isOffline(err);
      if (!offline) {
        return NextResponse.json(
          { ok: false, error: err instanceof Error ? err.message : String(err) },
          { status: 500 },
        );
      }
    }
  }

  /* ------------------------------------------- 3. remember it for them */

  if (body.save !== false) {
    const sb = await supabaseServer();
    const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
    if (auth?.user) {
      await db.from("user_keywords").upsert(
        keywords.map((keyword) => ({ user_id: auth.user!.id, keyword, store })),
        { onConflict: "user_id,keyword,store", ignoreDuplicates: true },
      );
    }
  }

  const out = keywords.map((k) => have.get(k)).filter(Boolean) as Metric[];
  const pending = keywords.filter((k) => !have.has(k));

  // Count failed attempts so a keyword the provider will never score stops
  // being retried on every visit. Only when we actually reached the provider —
  // an offline round trip is not the keyword's fault.
  if (pending.length && !offline && !skipFetch) {
    await db.rpc("bump_keyword_attempts", { p_store: store, p_keywords: pending })
      .then(undefined, () => {});
  }

  return NextResponse.json({
    ok: true,
    store,
    results: out,
    pending,           // asked for, never seen, and the provider was unreachable
    offline,
    cacheHits: hits,
    fetched: stale.length - pending.length,
  });
}

