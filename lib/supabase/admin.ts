import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client. Bypasses RLS, so it is the only thing allowed to write
 * `keyword_metrics` — that table deliberately has no insert policy.
 *
 * Server-only. Importing this from a client component would leak the key.
 */
let cached: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  cached ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
