import { NextResponse } from "next/server";
import { callTool } from "@/lib/backend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The scratchpad every visitor lands on.
 *
 * Popularity and difficulty are properties of a keyword in a store, not of an
 * app — a placeholder app scores a keyword exactly like a published one does.
 * So nobody has to add an app: we keep one placeholder open and hang the
 * keywords off it.
 */
const NAME = "ASOKit Scratchpad";

let opening: Promise<{ appId: string; name: string }> | null = null;

async function open() {
  const listed = await callTool<any>("list_apps", {});
  const apps: any[] = Array.isArray(listed) ? listed : listed?.apps ?? [];

  const found = apps.find((a) => a?.name === NAME);
  if (found) return { appId: String(found.appId ?? found.appStoreId ?? ""), name: NAME };

  const made = await callTool<any>("add_app", { temporary: true, name: NAME, platform: "iphone" });
  return { appId: String(made?.appStoreId ?? made?.appId ?? ""), name: NAME };
}

export async function GET() {
  try {
    // one in-flight lookup, shared: concurrent visitors must not each create one
    opening ??= open().catch((err) => { opening = null; throw err; });
    const ws = await opening;
    if (!ws.appId) { opening = null; throw new Error("workspace has no id"); }
    return NextResponse.json({ ok: true, data: ws });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const offline = /fetch failed|ECONNREFUSED|initialize failed/i.test(message);
    return NextResponse.json(
      { ok: false, error: offline ? "Keyword service is not reachable" : message },
      { status: offline ? 503 : 500 },
    );
  }
}
