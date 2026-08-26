import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { portalSession, dodoConfigured } from "@/lib/dodo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mint a Dodo customer-portal link for the signed-in account.
 *
 * The link is a signed, expiring session, so it cannot be a static href — it
 * has to be created per click. The customer id is read from our own row rather
 * than taken from the request, so nobody can ask for somebody else's portal by
 * passing a different id.
 */
export async function POST() {
  if (!dodoConfigured()) {
    return NextResponse.json({ ok: false, error: "billing is not configured" }, { status: 503 });
  }

  const sb = await supabaseServer();
  const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  const user = auth?.user;
  if (!user) return NextResponse.json({ ok: false, error: "sign in first" }, { status: 401 });

  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 500 });

  const { data: sub } = await db
    .from("subscriptions")
    .select("dodo_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const customerId = sub?.dodo_customer_id;
  // A customer only exists once something has been bought. Anyone else has
  // nothing to manage, and saying so beats a broken portal.
  if (!customerId || !String(customerId).startsWith("cus_")) {
    return NextResponse.json(
      { ok: false, error: "no billing account yet", code: "no-customer" },
      { status: 404 },
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asograde.com";
  try {
    const link = await portalSession(customerId, `${origin}/billing`);
    return NextResponse.json({ ok: true, url: link });
  } catch (err) {
    console.error("[portal]", err);
    return NextResponse.json({ ok: false, error: "could not open the billing portal" }, { status: 502 });
  }
}
