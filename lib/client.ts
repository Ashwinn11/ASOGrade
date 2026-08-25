/** Browser-side helpers for talking to our own API routes. */

export async function api(tool: string, args: Record<string, unknown> = {}) {
  const res = await fetch("/api/tool", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, args }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "request failed");
  return json as { data: any; ms: number };
}

/** Responses arrive as a bare array or wrapped under one of these keys. */
export function rows_(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const k of ["keywords", "results", "apps", "rankings"]) {
      if (Array.isArray(data[k])) return data[k];
    }
  }
  return [];
}

