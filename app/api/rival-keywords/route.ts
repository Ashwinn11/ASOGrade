import { NextResponse } from "next/server";
import { requireSubscription, refuse } from "@/lib/entitlement";
import { callTool, isOffline } from "@/lib/backend";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A competitor's keyword profile.
 *
 * The provider will describe any App Store ID, tracked or not, so this needs
 * no add_app and leaves nothing behind. The answer depends only on the app and
 * the store, never on who asked, so one fetch serves every user forever.
 */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Row = { keyword: string; popularity: number | null; difficulty: number | null; appsCount: number | null };

const idFromUrl = (v: string) =>
  (v.match(/\/id(\d{6,})/) ?? v.match(/^\s*(\d{6,})\s*$/))?.[1] ?? null;

export async function POST(req: Request) {
  // No free tier: every data route is behind a live subscription.
  const access = await requireSubscription();
  if (!access.ok) return refuse(access.reason);

  const { appStoreId, query, store = "us", app: given } = await req.json().catch(() => ({}) as any);
  const st = String(store).toLowerCase();

  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: false, error: "database is not configured" }, { status: 500 });

  /* ------------------------------------------------- 1. work out which app */

  let id: string | null = appStoreId ? String(appStoreId) : null;
  let found: any = null;

  /*
   * Deliberately link-only. Resolving a typed name means guessing which app
   * was meant, and a wrong guess silently returns a different app's keywords —
   * which looks like real data and isn't. The provider's own docs say to paste
   * the App Store URL, so we ask for the same thing.
   */
  if (!id && query) id = idFromUrl(String(query));
  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Paste an App Store link — for example apps.apple.com/us/app/…/id123456789" },
      { status: 400 },
    );
  }

  /* ------------------------------------------------------------ 2. cache */

  const { data: hit } = await db
    .from("rival_keywords")
    .select("name, subtitle, developer, icon_url, keywords, fetched_at")
    .eq("app_store_id", id)
    .eq("store", st)
    .maybeSingle();

  if (hit && Date.now() - new Date(hit.fetched_at).getTime() < TTL_MS) {
    // An entry cached from a bare id has no name or icon. If the caller knows
    // them, fill the gap now rather than showing a raw number forever.
    const filler = hit.name || given?.name ? null : await appDetails(id, st);
    const merged = {
      name: hit.name ?? given?.name ?? filler?.name ?? null,
      subtitle: hit.subtitle ?? given?.subtitle ?? filler?.subtitle ?? null,
      developer: hit.developer ?? given?.developer ?? filler?.developer ?? null,
      icon_url: hit.icon_url ?? given?.iconUrl ?? filler?.iconUrl ?? null,
    };
    const gained = (["name", "subtitle", "developer", "icon_url"] as const)
      .some((k) => !hit[k] && merged[k]);
    if (gained) {
      await db.from("rival_keywords").update(merged).eq("app_store_id", id).eq("store", st);
    }
    return NextResponse.json({ ok: true, cached: true, app: shapeApp(id, merged), keywords: hit.keywords as Row[] });
  }

  /* ---------------------------------------------------------- 3. go fetch */

  try {
    // The caller usually knows the name and icon already — a leaderboard row
    // carries them — so prefer that over guessing from a search.
    if (!found && given?.name) found = given;

    // Fill in the app's own details when we were handed a bare id.
    if (!found) found = await appDetails(id, st);

    const out = await callTool<any>("get_keyword_suggestions", {
      appId: id, store: st, highPopularity: false,
    });
    const raw: any[] = Array.isArray(out) ? out : out?.suggestions ?? out?.keywords ?? [];

    // The provider pads some phrases with repeated spaces ("habit  tracker"),
    // which collapse into duplicates once normalised — keep the strongest.
    const best = new Map<string, Row>();
    for (const r of raw) {
      const keyword = String(r.text ?? r.keyword ?? "").replace(/\s+/g, " ").trim().toLowerCase();
      if (!keyword) continue;
      const row: Row = {
        keyword,
        popularity: r.popularity ?? null,
        difficulty: r.difficulty ?? null,
        appsCount: r.appsCount ?? null,
      };
      const seen = best.get(keyword);
      if (!seen || (row.popularity ?? 0) > (seen.popularity ?? 0)) best.set(keyword, row);
    }
    const keywords: Row[] = [...best.values()]
      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

    const row = {
      app_store_id: id,
      store: st,
      name: found?.name ?? hit?.name ?? null,
      subtitle: found?.subtitle ?? hit?.subtitle ?? null,
      developer: found?.developer ?? hit?.developer ?? null,
      icon_url: found?.iconUrl ?? hit?.icon_url ?? null,
      keywords,
      fetched_at: new Date().toISOString(),
    };
    await db.from("rival_keywords").upsert(row, { onConflict: "app_store_id,store" });

    return NextResponse.json({ ok: true, cached: false, app: shapeApp(id, row), keywords });
  } catch (err) {
    // A week-old profile still beats an error page.
    if (hit) {
      return NextResponse.json({ ok: true, cached: true, stale: true, app: shapeApp(id, hit), keywords: hit.keywords as Row[] });
    }
    return offlineOr(err, "could not read that app's keywords");
  }
}

/**
 * Name, developer and artwork for an App Store id.
 *
 * The provider's search takes a keyword, not an id — searching for the digits
 * returns whatever apps happen to match that string, never the app itself, so
 * the old exact-id `.find()` always came back empty and the header fell back to
 * showing the raw number. Apple's own lookup resolves an id directly, costs
 * nothing against the provider's rate limit, and answers while the provider's
 * machine is asleep.
 */
async function appDetails(id: string, store: string) {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}&country=${encodeURIComponent(store)}`,
      { signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return null;
    const hit = (await res.json())?.results?.[0];
    if (!hit || String(hit.trackId) !== id) return null;
    return {
      name: hit.trackName ?? null,
      subtitle: null,
      developer: hit.artistName ?? null,
      iconUrl: hit.artworkUrl512 ?? hit.artworkUrl100 ?? hit.artworkUrl60 ?? null,
    };
  } catch {
    return null;   // cosmetics: never let this fail the keyword payload
  }
}

function shapeApp(id: string, r: any) {
  return {
    appStoreId: id,
    name: r.name ?? null,
    subtitle: r.subtitle ?? null,
    developer: r.developer ?? null,
    iconUrl: r.icon_url ?? r.iconUrl ?? null,
  };
}

function offlineOr(err: unknown, fallback: string) {
  const down = isOffline(err);
  return NextResponse.json(
    { ok: false, offline: down, error: down ? "Keyword service is not reachable" : fallback },
    { status: down ? 503 : 500 },
  );
}
