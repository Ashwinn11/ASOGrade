import { callTool } from "@/lib/backend";

/**
 * The single placeholder app every lookup hangs off.
 *
 * Popularity and difficulty belong to a keyword in a store, not to an app, so
 * one shared scratchpad serves everybody — and a keyword already on it is
 * re-tracked in milliseconds instead of costing an upstream fetch.
 */
const NAME = "ASOKit Scratchpad";

let opening: Promise<string> | null = null;

export function workspaceId(): Promise<string> {
  opening ??= (async () => {
    const listed = await callTool<any>("list_apps", {});
    const apps: any[] = Array.isArray(listed) ? listed : listed?.apps ?? [];
    const found = apps.find((a) => a?.name === NAME);
    if (found) return String(found.appId ?? found.appStoreId ?? "");

    const made = await callTool<any>("add_app", { temporary: true, name: NAME, platform: "iphone" });
    return String(made?.appStoreId ?? made?.appId ?? "");
  })().catch((err) => { opening = null; throw err; });
  return opening;
}

/**
 * Some provider tools only accept keywords it is already tracking. Our cache
 * means we can hold a keyword the scratchpad has since lost, so anything with
 * that requirement has to re-assert it first. Already-tracked is a no-op.
 */
export async function ensureTracked(keyword: string, store: string) {
  const appId = await workspaceId();
  await callTool("add_keywords", { appId, store, keywords: [keyword], platform: "iphone" });
  return appId;
}
