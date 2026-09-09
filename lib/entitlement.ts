import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Entitlement and quota checking for ASOGrade.
 *
 * Authenticated users receive a free quota of up to 5 tracked keywords.
 * Active subscribers have unlimited access across all storefronts.
 */

export const FREE_KEYWORD_LIMIT = 3;

export type Access =
  | { ok: true; userId: string; subscribed: boolean }
  | { ok: false; reason: "signed-out" | "no-subscription" | "unconfigured" };

/**
 * Check if the user is signed in, and whether they have an active subscription.
 * If allowFree is true, signed-in users without a subscription are still granted access.
 */
export async function checkAccess(options: { allowFree?: boolean } = {}): Promise<Access> {
  const sb = await supabaseServer();
  if (!sb) return { ok: false, reason: "unconfigured" };

  const { data: auth } = await sb.auth.getUser();
  const user = auth?.user;
  if (!user) return { ok: false, reason: "signed-out" };

  const db = supabaseAdmin();
  if (!db) return { ok: false, reason: "unconfigured" };

  const { data, error } = await db.rpc("has_active_subscription", { p_user: user.id });
  if (error) {
    console.error("[entitlement] check failed", error.message);
  }

  const subscribed = data === true;

  if (subscribed || options.allowFree) {
    return { ok: true, userId: user.id, subscribed };
  }

  return { ok: false, reason: "no-subscription" };
}

/**
 * Strict subscription check — only active/trialing subscribers are allowed.
 */
export async function requireSubscription(): Promise<Access> {
  return checkAccess({ allowFree: false });
}

/**
 * Check whether a user is allowed to track additional keywords under their quota.
 */
export async function checkKeywordQuota(
  userId: string,
  subscribed: boolean,
  newKeywords: string[],
  store: string,
): Promise<{ ok: true } | { ok: false; error: string; code: "no-subscription" }> {
  if (subscribed) return { ok: true };

  const db = supabaseAdmin();
  if (!db) return { ok: false, error: "Database not configured", code: "no-subscription" };

  // Fetch current user keywords
  const { data: currentRows, error } = await db
    .from("user_keywords")
    .select("keyword, store")
    .eq("user_id", userId);

  if (error) {
    console.error("[entitlement] quota check error", error.message);
    return { ok: false, error: "Could not verify quota", code: "no-subscription" };
  }

  const existingKeys = new Set(
    (currentRows ?? []).map((r) => `${r.store}|${r.keyword.toLowerCase()}`),
  );

  // Count how many truly new keywords will be added
  let willAddCount = 0;
  for (const kw of newKeywords) {
    const key = `${store}|${kw.toLowerCase()}`;
    if (!existingKeys.has(key)) {
      willAddCount++;
    }
  }

  const projectedTotal = existingKeys.size + willAddCount;
  if (projectedTotal > FREE_KEYWORD_LIMIT) {
    return {
      ok: false,
      error: `Free plan limit reached (${existingKeys.size}/${FREE_KEYWORD_LIMIT} keywords used). Upgrade to track unlimited keywords.`,
      code: "no-subscription",
    };
  }

  return { ok: true };
}

/** The HTTP shape for a refusal, so every route answers identically. */
export const refuse = (reason: Exclude<Access, { ok: true }>["reason"], customError?: string) => {
  const body =
    reason === "signed-out"
      ? { ok: false, error: "sign in to continue", code: "signed-out" }
      : reason === "no-subscription"
        ? { ok: false, error: customError ?? "an active subscription is required", code: "no-subscription" }
        : { ok: false, error: "billing is not configured", code: "unconfigured" };
  return Response.json(body, { status: reason === "signed-out" ? 401 : 402 });
};
