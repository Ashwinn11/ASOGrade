import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createCheckout, dodoConfigured, PLANS, type PlanKey } from "@/lib/dodo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Start a subscription.
 *
 * Deliberately works signed out: payment comes before the account. The email
 * typed here is what the subscription is filed under until the buyer signs in
 * and claims it, so it is the single most important field in the request — the
 * sign-in step afterwards nudges them to the same address.
 *
 * A signed-in caller overrides it with their real address; they already have an
 * account and there is nothing to claim later.
 */
export async function POST(req: Request) {
  if (!dodoConfigured()) {
    return NextResponse.json({ ok: false, error: "billing is not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const plan = String(body?.plan ?? "") as PlanKey;
  if (!(plan in PLANS)) {
    return NextResponse.json({ ok: false, error: "unknown plan" }, { status: 400 });
  }

  const sb = await supabaseServer();
  const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  const user = auth?.user ?? null;

  // Signed in before onboarding, so the address is Google's, not typed.
  const email = String(user?.email ?? "").trim().toLowerCase();
  if (!user || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "sign in first" }, { status: 401 });
  }

  // Refuse if this account already has live access. Without this a second
  // checkout creates a second subscription at Dodo and the customer is billed
  // twice — the client guard is a convenience, this is the one that counts.
  const guard = supabaseAdmin();
  if (guard) {
    const { data: already } = await guard.rpc("has_active_subscription", { p_user: user.id });
    if (already === true) {
      return NextResponse.json(
        { ok: false, error: "this account already has an active subscription", code: "already-subscribed" },
        { status: 409 },
      );
    }
  }

  /* The onboarding answers used to be written here. They are not any more:
     filing them at the sale meant nobody who answered the questions and then
     merely looked at the price was ever recorded, so they were asked all six
     again next time. /api/onboarding records them the moment the last question
     is answered — this handler sells, and does nothing else. */

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const { url } = await createCheckout({
      plan,
      userId: user.id,
      email,
      name: (user.user_metadata?.full_name as string) ?? null,
      // The account already exists, so checkout returns straight to the work.
      returnUrl: `${origin}/dashboard?welcome=1`,
    });
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ ok: false, error: "could not start checkout" }, { status: 502 });
  }
}
