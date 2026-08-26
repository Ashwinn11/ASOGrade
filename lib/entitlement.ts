import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * One answer to "may this request use the product", used by every data route.
 *
 * There is no free tier, so this is a hard gate rather than a quota: signed out
 * or unsubscribed both mean no. Kept in one place because a second copy of this
 * rule is how a paywall quietly develops a hole.
 */

export type Access =
  | { ok: true; userId: string }
  | { ok: false; reason: "signed-out" | "no-subscription" | "unconfigured" };

export async function requireSubscription(): Promise<Access> {
  const sb = await supabaseServer();
  if (!sb) return { ok: false, reason: "unconfigured" };

  const { data: auth } = await sb.auth.getUser();
  const user = auth?.user;
  if (!user) return { ok: false, reason: "signed-out" };

  const db = supabaseAdmin();
  if (!db) return { ok: false, reason: "unconfigured" };

  // Asked of the database rather than assembled here: the same function backs
  // any future job or admin view, so they cannot drift apart.
  const { data, error } = await db.rpc("has_active_subscription", { p_user: user.id });
  if (error) {
    console.error("[entitlement] check failed", error.message);
    return { ok: false, reason: "no-subscription" };
  }

  return data === true
    ? { ok: true, userId: user.id }
    : { ok: false, reason: "no-subscription" };
}

/** The HTTP shape for a refusal, so every route answers identically. */
export const refuse = (reason: Exclude<Access, { ok: true }>["reason"]) => {
  const body =
    reason === "signed-out"
      ? { ok: false, error: "sign in to continue", code: "signed-out" }
      : reason === "no-subscription"
        ? { ok: false, error: "an active subscription is required", code: "no-subscription" }
        : { ok: false, error: "billing is not configured", code: "unconfigured" };
  return Response.json(body, { status: reason === "signed-out" ? 401 : 402 });
};
