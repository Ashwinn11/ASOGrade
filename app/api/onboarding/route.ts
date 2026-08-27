import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Record that the questions are answered.
 *
 * The answers used to be written from the checkout handler, which meant they
 * were only ever saved by someone who reached the payment step — anybody who
 * answered all six questions and then went to look at the price left no trace,
 * and was asked the same six again on their next visit. Completion is a fact
 * about the account, not about the sale, so it is recorded here at the moment
 * it happens.
 *
 * Written with the service role: the table's only policy lets an account read
 * its own row, and nothing client-side is trusted to set `completed_at`.
 */
export async function POST(req: Request) {
  const sb = await supabaseServer();
  const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  const user = auth?.user ?? null;
  if (!user) {
    return NextResponse.json({ ok: false, error: "sign in first" }, { status: 401 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json({ ok: false, error: "storage is not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const a = (body?.answers ?? {}) as Record<string, unknown>;
  const one = (v: unknown) => (typeof v === "string" && v ? v : null);

  const row = {
    user_id: user.id,
    email: String(user.email ?? "").trim().toLowerCase() || null,
    goal: one(a.goal),
    has_app: one(a.has_app),
    revenue: one(a.revenue),
    aso_maturity: one(a.aso_maturity),
    localization: one(a.localization),
    struggles: Array.isArray(a.struggles) ? a.struggles.filter((x) => typeof x === "string") : null,
    completed_at: new Date().toISOString(),
  };

  /* One row per account, enforced by a partial unique index on user_id. The
     old checkout handler inserted unconditionally, which is how one account
     ended up with several rows saying different things about the same person. */
  const { error } = await db
    .from("onboarding_answers")
    .upsert(row, { onConflict: "user_id" });

  if (error) {
    console.error("[onboarding]", error.message);
    return NextResponse.json({ ok: false, error: "could not save your answers" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
