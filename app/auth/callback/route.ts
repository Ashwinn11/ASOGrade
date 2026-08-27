import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Where the OAuth provider sends the user back with a one-time code. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const sb = await supabaseServer();
    const { error } = (await sb?.auth.exchangeCodeForSession(code)) ?? { error: null };
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
    return NextResponse.redirect(new URL(`/?authError=${encodeURIComponent(error.message)}`, url.origin));
  }

  const denied = url.searchParams.get("error_description") ?? "sign-in was cancelled";
  return NextResponse.redirect(new URL(`/?authError=${encodeURIComponent(denied)}`, url.origin));
}
