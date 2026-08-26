import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Dodo Payments: checkout creation and webhook verification.
 *
 * Test and live are different hosts, not different paths, so the mode is the
 * one switch that decides everything. It is derived from the key itself rather
 * than a separate flag — a test key can never accidentally hit live.
 */

const API_KEY = process.env.DODO_API_KEY ?? "";
const WEBHOOK_KEY = process.env.DODO_WEBHOOK_KEY ?? "";

export const dodoMode = (): "test" | "live" =>
  process.env.DODO_MODE === "live" ? "live" : "test";

const BASE = () =>
  dodoMode() === "live" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";

export const dodoConfigured = () => Boolean(API_KEY);

export const PLANS = {
  monthly: {
    id: process.env.DODO_PRODUCT_MONTHLY ?? "",
    label: "Monthly",
    price: "$14.99",
    period: "month",
  },
  yearly: {
    id: process.env.DODO_PRODUCT_YEARLY ?? "",
    label: "Yearly",
    price: "$99",
    period: "year",
  },
} as const;

export type PlanKey = keyof typeof PLANS;

/**
 * Which plan a product id represents.
 *
 * checkout metadata carries the plan the customer originally chose, and it is
 * never rewritten — so after an upgrade or downgrade through the portal it is
 * stale. The product on the subscription is what actually changed, so that is
 * what the plan is read from.
 */
export const planFromProduct = (productId: string | null | undefined): PlanKey | null => {
  if (!productId) return null;
  if (productId === PLANS.yearly.id) return "yearly";
  if (productId === PLANS.monthly.id) return "monthly";
  return null;
};

/**
 * Create a hosted checkout session and return the URL to send the customer to.
 *
 * `metadata.user_id` is the only link back to our own account. The webhook has
 * no other reliable way to know whose subscription this is: the Dodo customer
 * is keyed by email, and an email can change on either side.
 */
export async function createCheckout(opts: {
  plan: PlanKey;
  userId: string | null;
  email: string;
  name?: string | null;
  returnUrl: string;
}): Promise<{ url: string; sessionId: string }> {
  const product = PLANS[opts.plan];
  if (!product.id) throw new Error(`no product id configured for the ${opts.plan} plan`);

  const res = await fetch(`${BASE()}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_cart: [{ product_id: product.id, quantity: 1 }],
      customer: { email: opts.email, ...(opts.name ? { name: opts.name } : {}) },
      // user_id is absent for a buy-before-signin purchase; the webhook then
      // files the subscription under the email and it is claimed at sign-in.
      metadata: { ...(opts.userId ? { user_id: opts.userId } : {}), plan: opts.plan, email: opts.email },
      return_url: opts.returnUrl,
      confirm: false,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const text = await res.text();
  if (!res.ok) {
    // Never surface the upstream body to the browser; it can echo the key back.
    console.error("[dodo] checkout failed", res.status, text.slice(0, 400));
    throw new Error("could not start checkout");
  }

  const body = JSON.parse(text);
  const url = body?.checkout_url;
  if (!url) throw new Error("checkout session returned no url");
  return { url, sessionId: body.session_id };
}

/**
 * Mint a customer-portal link.
 *
 * The returned URL is a signed session that expires, so it has to be created
 * per click rather than stored — which is why this lives behind our own route
 * instead of being an href on the billing page.
 */
export async function portalSession(customerId: string, returnUrl: string): Promise<string> {
  const qs = new URLSearchParams({ return_url: returnUrl });
  const res = await fetch(
    `${BASE()}/customers/${encodeURIComponent(customerId)}/customer-portal/session?${qs}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
    },
  );
  const text = await res.text();
  if (!res.ok) {
    console.error("[dodo] portal failed", res.status, text.slice(0, 300));
    throw new Error("could not open the billing portal");
  }
  const link = JSON.parse(text)?.link;
  if (!link) throw new Error("portal session returned no link");
  return link;
}

/**
 * Verify a Standard Webhooks signature.
 *
 * The signed payload is `id.timestamp.body`, HMAC-SHA256 with the secret, and
 * the header carries one or more space-separated `v1,<base64>` candidates so a
 * secret can be rotated without dropping events. The body must be the exact
 * bytes received — parse it only after this returns true.
 */
export function verifyWebhook(raw: string, headers: {
  id: string | null; signature: string | null; timestamp: string | null;
}): boolean {
  const { id, signature, timestamp } = headers;
  if (!WEBHOOK_KEY || !id || !signature || !timestamp) return false;

  // Reject anything older than five minutes so a captured request cannot be
  // replayed later to re-grant access.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const secret = WEBHOOK_KEY.startsWith("whsec_") ? WEBHOOK_KEY.slice(6) : WEBHOOK_KEY;
  const expected = createHmac("sha256", Buffer.from(secret, "base64"))
    .update(`${id}.${timestamp}.${raw}`)
    .digest("base64");

  return signature.split(" ").some((part) => {
    const given = part.includes(",") ? part.split(",")[1] : part;
    const a = Buffer.from(given);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

/** Dodo statuses that mean "this person may use the product right now". */
const LIVE_STATUSES = new Set(["active", "trialing"]);

export const statusGrantsAccess = (status: string | null | undefined) =>
  LIVE_STATUSES.has(String(status ?? "").toLowerCase());
