import { NextResponse } from "next/server";
import { requireSubscription, refuse } from "@/lib/entitlement";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A signed-in user's saved list. Pure Postgres on both verbs — it never
 * touches the provider, so the list loads and edits fine with the provider's
 * machine switched off.
 */

async function currentUser() {
  const sb = await supabaseServer();
  const { data } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  return data.user ?? null;
}

export async function GET(req: Request) {
  // No free tier: every data route is behind a live subscription.
  const access = await requireSubscription();
  if (!access.ok) return refuse(access.reason);

  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: true, results: [] });

  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: false, error: "database is not configured" }, { status: 500 });

  const store = new URL(req.url).searchParams.get("store");

  let q = db
    .from("user_keywords")
    .select("keyword, store, added_at, attempts")
    .eq("user_id", user.id)
    .order("added_at", { ascending: false });
  if (store) q = q.eq("store", store);

  const { data: mine, error } = await q;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!mine?.length) return NextResponse.json({ ok: true, results: [] });

  // Join to the shared cache by hand: PostgREST can't express this one across
  // a composite key without a foreign key we deliberately don't have.
  const { data: metrics } = await db
    .from("keyword_metrics")
    .select("keyword, store, popularity, difficulty, apps_count, fetched_at")
    .in("keyword", [...new Set(mine.map((r) => r.keyword))]);

  const byKey = new Map((metrics ?? []).map((m) => [`${m.store}|${m.keyword}`, m]));

  // A saved keyword with no cached metrics is work still owed. The gap between
  // these two tables is the retry queue — no third table needed.
  // Three failed round trips to the provider is enough — after that the
  // keyword is almost certainly one it cannot score, and retrying it on every
  // visit just burns the rate limit.
  const MAX_ATTEMPTS = 3;
  const missing = mine
    .filter((r) => !byKey.has(`${r.store}|${r.keyword}`) && (r.attempts ?? 0) < MAX_ATTEMPTS)
    .map((r) => ({ keyword: r.keyword, store: r.store }));

  return NextResponse.json({
    ok: true,
    missing,
    results: mine.map((r) => {
      const m = byKey.get(`${r.store}|${r.keyword}`);
      return {
        keyword: r.keyword,
        store: r.store,
        addedAt: r.added_at,
        popularity: m?.popularity ?? null,
        difficulty: m?.difficulty ?? null,
        appsCount: m?.apps_count ?? null,
        fetchedAt: m?.fetched_at ?? null,
      };
    }),
  });
}

export async function DELETE(req: Request) {
  // No free tier: every data route is behind a live subscription.
  const access = await requireSubscription();
  if (!access.ok) return refuse(access.reason);

  const user = await currentUser();
  if (!user) return NextResponse.json({ ok: false, error: "sign in first" }, { status: 401 });

  const { keyword, store } = await req.json().catch(() => ({}) as any);
  if (!keyword || !store) {
    return NextResponse.json({ ok: false, error: "keyword and store required" }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: false, error: "database is not configured" }, { status: 500 });

  // Only ever removes the pointer. The cached metrics stay for everyone else.
  const { error } = await db
    .from("user_keywords")
    .delete()
    .eq("user_id", user.id)
    .eq("keyword", String(keyword).toLowerCase())
    .eq("store", String(store).toLowerCase());

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
