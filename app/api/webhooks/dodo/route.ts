import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyWebhook, statusGrantsAccess, planFromProduct } from "@/lib/dodo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Dodo subscription webhook — the only thing that grants or removes access.
 *
 * The signature is checked against the raw bytes before anything is parsed, and
 * writes go through the service role because `subscriptions` has no user-facing
 * write policy: a customer must never be able to mark themselves paid.
 *
 * Dodo's published docs do not pin down the field names inside `data`, so each
 * value is read from a few plausible paths and the whole payload is logged on
 * the first events. Once a real event confirms the shape, the fallbacks can go.
 */

const EVENTS_GRANT = new Set([
  "subscription.active",
  "subscription.renewed",
  "subscription.unpaused",
  "subscription.plan_changed",
  "subscription.updated",
]);

const EVENTS_REVOKE = new Set([
  "subscription.cancelled",
  "subscription.expired",
  "subscription.failed",
  "subscription.on_hold",
  "subscription.paused",
]);

const pick = (obj: any, ...paths: string[]) => {
  for (const p of paths) {
    const v = p.split(".").reduce((o: any, k) => (o == null ? o : o[k]), obj);
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return null;
};

export async function POST(req: Request) {
  // Must be the exact bytes that were signed, so read text before any parsing.
  const raw = await req.text();

  const ok = verifyWebhook(raw, {
    id: req.headers.get("webhook-id"),
    signature: req.headers.get("webhook-signature"),
    timestamp: req.headers.get("webhook-timestamp"),
  });
  if (!ok) {
    console.warn("[dodo webhook] rejected: bad signature");
    return new Response("invalid signature", { status: 401 });
  }

  let evt: any;
  try {
    evt = JSON.parse(raw);
  } catch {
    return new Response("bad json", { status: 400 });
  }

  const type = String(evt?.type ?? "");
  if (!type.startsWith("subscription.")) {
    return Response.json({ received: true, ignored: type });
  }

  const data = evt?.data ?? {};
  console.log("[dodo webhook]", type, JSON.stringify(data).slice(0, 900));

  const userId = pick(data, "metadata.user_id", "subscription.metadata.user_id");
  const subscriptionId = pick(data, "subscription_id", "subscription.subscription_id", "id");

  // Bought before signing in: no user yet. File it under the email so the
  // account can claim it at sign-in. Only a missing email is unrecoverable.
  const email = pick(data, "metadata.email", "customer.email", "email");
  if (!userId && !email) {
    console.error("[dodo webhook] no user_id and no email", type, subscriptionId);
    return Response.json({ received: true, warning: "unattributable" });
  }

  const db = supabaseAdmin();
  if (!db) return new Response("database not configured", { status: 500 });

  const reported = pick(data, "status", "subscription.status");
  // Trust the event type over the status string: a `cancelled` event can still
  // carry status "active" while the paid period runs out, and the event is the
  // thing that actually changed.
  const status = EVENTS_REVOKE.has(type)
    ? String(reported ?? "cancelled")
    : EVENTS_GRANT.has(type) && statusGrantsAccess(reported ?? "active")
      ? "active"
      : String(reported ?? "unknown");

  const periodEnd = pick(data, "next_billing_date", "subscription.next_billing_date", "expires_at");

  // Keyed on the subscription id, never on the user: matching by user meant a
  // second purchase overwrote the first one's row, leaving a live subscription
  // at Dodo that we no longer tracked.
  if (!subscriptionId) {
    console.error("[dodo webhook] event carries no subscription id", type);
    return Response.json({ received: true, warning: "no subscription id" });
  }

  // Dodo fires several events for the same subscription at once — active,
  // renewed and updated all landed in the same second. Reading first and then
  // inserting let two handlers both see "no row" and both insert, so one lost
  // to the unique constraint and 500'd. Let Postgres resolve it instead.

  const { error } = await db.from("subscriptions").upsert({
    user_id: userId,
    email,
    status,
    // Product first: after an upgrade or downgrade the metadata still names the
    // plan bought originally, while the product is the thing that changed.
    plan: planFromProduct(pick(data, "product_id", "subscription.product_id"))
          ?? pick(data, "metadata.plan"),
    dodo_customer_id: pick(data, "customer.customer_id", "customer_id", "customer.email"),
    dodo_subscription_id: subscriptionId,
    current_period_end: periodEnd ? new Date(periodEnd).toISOString() : null,
    cancel_at_period_end: Boolean(pick(data, "cancel_at_next_billing_date", "cancel_at_period_end")),
    updated_at: new Date().toISOString(),
  }, { onConflict: "dodo_subscription_id" });

  if (error) {
    // A missing user is permanent: the account was deleted, and no number of
    // retries brings it back. Record it against the email and acknowledge, so
    // Dodo stops hammering the endpoint over something that cannot succeed.
    if (/foreign key/i.test(error.message)) {
      console.warn("[dodo webhook] user is gone; filing against email", subscriptionId);
      const { error: second } = await db.from("subscriptions").upsert({
        user_id: null, email, status,
        plan: planFromProduct(pick(data, "product_id", "subscription.product_id")) ?? pick(data, "metadata.plan"),
        dodo_customer_id: pick(data, "customer.customer_id", "customer_id"),
        dodo_subscription_id: subscriptionId,
        current_period_end: periodEnd ? new Date(periodEnd).toISOString() : null,
        cancel_at_period_end: Boolean(pick(data, "cancel_at_next_billing_date", "cancel_at_period_end")),
        updated_at: new Date().toISOString(),
      }, { onConflict: "dodo_subscription_id" });
      if (second) console.error("[dodo webhook] orphan write failed", second.message);
      return Response.json({ received: true, warning: "user no longer exists" });
    }
    // Anything else is worth a retry: losing this write means someone paid and
    // has no access.
    console.error("[dodo webhook] upsert failed", error.message);
    return new Response("could not record subscription", { status: 500 });
  }

  return Response.json({ received: true, type, status });
}
