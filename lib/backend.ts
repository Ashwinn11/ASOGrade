/**
 * Keyword data provider client (MCP over streamable HTTP).
 *
 * The provider runs locally and is reached through this module only; nothing
 * else in the app talks to it directly.
 */

const ASTRO_URL = process.env.ASTRO_URL ?? "http://127.0.0.1:8089/mcp";
const RATE_PER_MIN = Number(process.env.ASTRO_RATE_PER_MIN ?? 40);
const CALL_TIMEOUT_MS = Number(process.env.ASTRO_TIMEOUT_MS ?? 30_000);

/** Continuous-refill token bucket, keeps us clear of the provider's 60/min cap. */
class TokenBucket {
  private tokens: number;
  private last = Date.now();
  constructor(private capacity: number, private perMin: number) {
    this.tokens = capacity;
  }
  async take(): Promise<void> {
    for (;;) {
      const now = Date.now();
      this.tokens = Math.min(
        this.capacity,
        this.tokens + ((now - this.last) / 60_000) * this.perMin,
      );
      this.last = now;
      if (this.tokens >= 1) {
        this.tokens -= 1;
        return;
      }
      const waitMs = ((1 - this.tokens) / this.perMin) * 60_000;
      await new Promise((r) => setTimeout(r, Math.ceil(waitMs)));
    }
  }
}

const bucket = new TokenBucket(RATE_PER_MIN, RATE_PER_MIN);

export class BackendError extends Error {}

/** The provider returns either bare JSON or an SSE frame; accept both. */
function parseEnvelope(body: string): any {
  const trimmed = body.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  const dataLines = trimmed
    .split("\n")
    .filter((l) => l.startsWith("data:"))
    .map((l) => l.slice(5).trim())
    .filter((l) => l.startsWith("{"));
  if (!dataLines.length) throw new BackendError(`unparseable response: ${body.slice(0, 200)}`);
  return JSON.parse(dataLines[dataLines.length - 1]);
}

let sessionId: string | null = null;
let handshake: Promise<string> | null = null;

async function initSession(): Promise<string> {
  const res = await fetch(ASTRO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "asokit-worker", version: "1.0" },
      },
    }),
  });
  if (!res.ok) throw new BackendError(`initialize failed: HTTP ${res.status}`);
  const sid = res.headers.get("mcp-session-id");
  if (!sid) throw new BackendError("no mcp-session-id returned");
  await res.text();

  await fetch(ASTRO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "Mcp-Session-Id": sid,
    },
    body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  });

  sessionId = sid;
  return sid;
}

/** One in-flight handshake shared by all callers. */
function getSession(): Promise<string> {
  if (sessionId) return Promise.resolve(sessionId);
  if (!handshake) {
    handshake = initSession().finally(() => {
      handshake = null;
    });
  }
  return handshake;
}

let reqId = 100;

async function rawCall(tool: string, args: Record<string, unknown>, sid: string) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CALL_TIMEOUT_MS);
  try {
    const res = await fetch(ASTRO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "Mcp-Session-Id": sid,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: ++reqId,
        method: "tools/call",
        params: { name: tool, arguments: args },
      }),
      signal: ctrl.signal,
    });
    return { status: res.status, body: await res.text() };
  } finally {
    clearTimeout(timer);
  }
}

export interface CallOpts {
  /** Invoked once per real (non-cached) request, for the budget ledger. */
  onCall?: () => void;
}

/**
 * Call a provider tool and return its parsed JSON payload.
 * Retries once on a dropped session and twice on transient failures.
 */
export async function callTool<T = any>(
  tool: string,
  args: Record<string, unknown>,
  opts: CallOpts = {},
): Promise<T> {
  let lastErr: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    await bucket.take();
    opts.onCall?.();

    try {
      const sid = await getSession();
      const { status, body } = await rawCall(tool, args, sid);

      // 400/404 => the session was dropped (restart, idle expiry). Re-handshake.
      if (status === 400 || status === 404) {
        sessionId = null;
        throw new BackendError(`session rejected (HTTP ${status})`);
      }
      if (status >= 500) throw new BackendError(`provider HTTP ${status}`);

      const env = parseEnvelope(body);
      if (env.error) throw new BackendError(`${tool}: ${env.error.message ?? "rpc error"}`);

      const result = env.result;
      if (result?.isError) {
        const msg = result.content?.[0]?.text ?? "tool reported an error";
        throw new BackendError(`${tool}: ${msg}`);
      }

      const text = result?.content?.[0]?.text;
      if (typeof text !== "string") throw new BackendError(`${tool}: empty content`);
      return JSON.parse(text) as T;
    } catch (err) {
      lastErr = err;
      if (attempt < 2) await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
  }
  throw lastErr instanceof Error ? lastErr : new BackendError(String(lastErr));
}


// ------------------------------------------------------------------ shapes
export interface StoreApp {
  appStoreId: string;
  name: string;
  subtitle?: string;
  developer?: string;
  genre?: string;
  iconUrl?: string;
  ranking?: number;
  ratingCount?: number;
  averageRating?: number;
}

