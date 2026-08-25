import { NextResponse } from "next/server";
import { callTool } from "@/lib/backend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Only these reach the provider. Everything else is rejected. */
const ALLOWED = new Set([
  "add_keywords",
  "get_app_keywords",
  "remove_keywords",
]);

export async function POST(req: Request) {
  let body: { tool?: string; args?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const { tool, args = {} } = body;
  if (!tool || !ALLOWED.has(tool)) {
    return NextResponse.json({ ok: false, error: `tool not allowed: ${tool}` }, { status: 400 });
  }

  const startedAt = Date.now();
  try {
    const data = await callTool(tool, args);
    return NextResponse.json({ ok: true, tool, ms: Date.now() - startedAt, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const offline = /fetch failed|ECONNREFUSED|initialize failed/i.test(message);
    return NextResponse.json(
      {
        ok: false,
        tool,
        ms: Date.now() - startedAt,
        error: offline ? "Keyword service is not reachable" : message,
      },
      { status: offline ? 503 : 500 },
    );
  }
}
