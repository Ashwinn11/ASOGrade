"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Refresh, Search, Trash, Close, Eye, Plus, Chevron } from "../components/icons";
import StorePicker from "../components/StorePicker";
import AccountChip from "../components/AccountChip";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import CoralHeader from "../ui/CoralHeader";
import Notice from "../ui/Notice";
import BrandMark from "../ui/BrandMark";
import Meter, { popBand, diffBand } from "../ui/Meter";
import { Kicker } from "../ui/Pill";
import { useUser } from "../components/useUser";
import { supabase } from "@/lib/supabase/client";
import { ALL_STORES, flagOf, storeName, timeAgo, type KeywordRow, type RankingApp } from "@/lib/types";

/* ------------------------------------------------------------------ utils */

const split = (text: string) =>
  text.split(/[\n,]/).map((k) => k.trim().toLowerCase().replace(/\s+/g, " ")).filter(Boolean);

function Check({ state }: { state: "on" | "off" | "some" }) {
  return (
    <span
      className={`grid size-4 shrink-0 place-items-center rounded-sm border transition-colors duration-150 ${
        state === "off"
          ? "border-line-2 bg-surface text-transparent"
          : "border-accent bg-accent text-white"
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        {state === "some"
          ? <path d="M3 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          : <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </span>
  );
}

/** In the cross-store view the same keyword appears once per store, so a row
 *  is identified by both. */
const keyOf = (r: { keyword: string; store: string }) => `${r.store}|${r.keyword}`;

/** How deep the leaderboard opens, then expands. 50 is the provider's ceiling. */
const TIERS = [10, 50];

/** Where a competitor's store page lives. */
const storeUrl = (id: string, store: string) =>
  `https://apps.apple.com/${store === ALL_STORES ? "us" : store}/app/id${id}`;

/** Compact enough for a table cell: "3m", "2h", "5d", "Aug 12". */
function shortAgo(iso: string | null | undefined): string {
  if (!iso) return "—";
  const secs = (Date.now() - Date.parse(iso)) / 1000;
  if (!Number.isFinite(secs)) return "—";
  if (secs < 60) return "now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  if (secs < 86_400) return `${Math.floor(secs / 3600)}h`;
  if (secs < 7 * 86_400) return `${Math.floor(secs / 86_400)}d`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

type SortKey = "keyword" | "popularity" | "difficulty" | "store" | "addedAt";

/* ------------------------------------------------------------------- page */

export default function Page() {
  const router = useRouter();
  const { user, ready: authReady } = useUser();
  const [store, setStore] = useState("us");
  const [offline, setOffline] = useState(false);
  const [pending, setPending] = useState<string[]>([]);

  const [rows, setRows] = useState<KeywordRow[]>([]);
  const [icons, setIcons] = useState<Record<string, RankingApp[]>>({});
  const [spy, setSpy] = useState<{
    app: { appStoreId: string; name: string | null; subtitle: string | null; developer: string | null; iconUrl: string | null };
    keywords: { keyword: string; popularity: number | null; difficulty: number | null; appsCount: number | null }[];
  } | null>(null);
  const [spyQuery, setSpyQuery] = useState("");
  const [spyPicked, setSpyPicked] = useState<Set<string>>(new Set());

  const [chips, setChips] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [shown, setShown] = useState(10);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "popularity", dir: -1 });

  const [busy, setBusy] = useState<string | null>(null);
  const [scoring, setScoring] = useState(0);   // keywords the backfill is filling in right now
  const [loadingRows, setLoadingRows] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null); // null = not yet known
  const [gate, setGate] = useState(false);   // the "subscription needed" dialog

  /**
   * Every failure goes through here.
   *
   * A missing subscription used to replace the whole workspace with a paywall
   * card, which meant an unsubscribed visitor never saw the thing they were
   * being asked to pay for. Now it only records the fact; the dialog is raised
   * by the action that hit it, so loading the page stays quiet and pressing
   * Check is what explains the wall.
   */
  const fail = (e: unknown, byAction = false) => {
    const msg = e instanceof Error ? e.message : String(e);
    if (/subscription/i.test(msg)) {
      setSubscribed(false);
      setError(null);
      if (byAction) setGate(true);
    } else setError(msg);
  };

  // keywords already fetched, keyed by store, so switching back is instant
  const kwCache = useRef<Map<string, KeywordRow[]>>(new Map());
  const asked = useRef<Set<string>>(new Set());
  const field = useRef<HTMLInputElement>(null);
  const anchor = useRef<number | null>(null); // for shift-click ranges
  const backfilled = useRef<Set<string>>(new Set()); // one retry per keyword per session

  /* ------------------------------------------------------------ loaders */

  useEffect(() => {
    if (authReady && !user) router.replace("/");
  }, [authReady, user, router]);

  /**
   * Ask the same row the API gate asks about, so the workspace knows whether a
   * press will be refused before it makes one. This is a convenience, not the
   * gate: `subscriptions` is readable only by its owner and writable only by
   * the webhook, and every data route checks entitlement server-side regardless
   * of what this says.
   */
  useEffect(() => {
    if (!user) return;
    let alive = true;
    supabase()?.from("subscriptions").select("status")
      .then(({ data }) => {
        if (!alive) return;
        const rows = (data ?? []) as { status: string }[];
        setSubscribed(rows.some((r) => ["active", "trialing"].includes(String(r.status))));
      });
    return () => { alive = false; };
  }, [user]);

  /** Reads straight from our database, so it works with the provider asleep. */
  const loadKeywords = useCallback(async (st: string, force = false) => {
    const cached = kwCache.current.get(st);
    if (cached && !force) { setRows(cached); setError(null); return; }
    if (force) kwCache.current.clear(); // a write in one store also changes "all"

    setLoadingRows(true); setError(null);
    try {
      const url = st === ALL_STORES ? "/api/my-keywords" : `/api/my-keywords?store=${st}`;
      const j = await fetch(url).then((r) => r.json());
      if (!j.ok) throw new Error(j.error ?? "could not load your keywords");
      const list = (j.results as any[]).map((r): KeywordRow => ({
        keyword: String(r.keyword ?? ""),
        store: String(r.store ?? st),
        popularity: r.popularity ?? null,
        difficulty: r.difficulty ?? null,
        appsCount: r.appsCount ?? null,
        lastUpdate: r.fetchedAt ?? null,
        addedAt: r.addedAt ?? null,
      }));
      kwCache.current.set(st, list);
      setRows(list);
      return (j.missing ?? []) as { keyword: string; store: string }[];
    } catch (e) {
      fail(e);
      setRows([]);
      return [];
    } finally {
      setLoadingRows(false);
    }
  }, []);

  /**
   * Anything saved but never scored gets one more attempt per session — which
   * is what makes the "filled in shortly" promise true. The work list is just
   * the gap between the two tables, so a failed attempt is simply retried on
   * the next visit rather than needing a queue of its own.
   */
  const backfill = useCallback(async (owed: { keyword: string; store: string }[]) => {
    const todo = owed.filter((r) => !backfilled.current.has(`${r.store}|${r.keyword}`));
    if (!todo.length) return;
    todo.forEach((r) => backfilled.current.add(`${r.store}|${r.keyword}`));
    setScoring(todo.length);

    const byStore = new Map<string, string[]>();
    for (const r of todo) byStore.set(r.store, [...(byStore.get(r.store) ?? []), r.keyword]);

    let filled = false;
    for (const [st, keywords] of byStore) {
      try {
        const j = await fetch("/api/lookup", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords, store: st, save: false }),
        }).then((r) => r.json());
        if (j.ok) {
          setOffline(!!j.offline);
          setPending(j.pending ?? []);
          if (j.fetched > 0) filled = true;
          // still unreachable, so let a later visit try these again
          if (j.offline) todo.forEach((r) => backfilled.current.delete(`${r.store}|${r.keyword}`));
        }
      } catch { /* the next visit retries */ }
    }
    setScoring(0);
    if (filled) await loadKeywords(store, true);
  }, [store, loadKeywords]);

  useEffect(() => {
    if (!user) return;
    loadKeywords(store).then((owed) => { if (owed?.length) backfill(owed); });
  }, [user, store, loadKeywords, backfill]);
  useEffect(() => { setOpen(null); setPicked(new Set()); anchor.current = null; }, [store]);

  /**
   * Wraps anything the visitor actually pressed.
   *
   * Guarding on the known answer first means an unsubscribed visitor gets the
   * dialog immediately instead of after a round trip that was always going to
   * be refused; a 402 from the route is still handled, since the local answer
   * can be stale.
   */
  const run = useCallback(async (what: string, fn: () => Promise<void>) => {
    if (subscribed === false) { setGate(true); return; }
    setBusy(what); setError(null);
    try { await fn(); }
    catch (e) { fail(e, true); }
    finally { setBusy(null); }
  }, [subscribed]);

  /* ---------------------------------------------------------- tag field */

  const addChips = useCallback((text: string) => {
    const next = split(text);
    if (!next.length) return;
    setChips((cur) => [...cur, ...next.filter((k) => !cur.includes(k))].slice(0, 100));
    setDraft("");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      if (draft.trim()) { e.preventDefault(); addChips(draft); }
      else if (e.key === "Enter" && chips.length) { e.preventDefault(); check(); }
    } else if (e.key === "Backspace" && !draft && chips.length) {
      setChips((cur) => cur.slice(0, -1));
    }
  };

  /* ------------------------------------------------------------ actions */

  /*
   * Claiming a keyword and scoring it are separate jobs, and only the first is
   * fast: the provider spends about three and a half seconds on a keyword it
   * has never seen, most of it fixed cost it pays whether you asked for one or
   * fifteen. Waiting on that before showing anything made every check feel
   * broken. So phase one only writes the keyword down — no provider, back in
   * roughly half a second — and the rows appear unscored. Phase two is the
   * existing backfill, deliberately not awaited, so the field is usable again
   * while the numbers fill themselves in.
   */
  const check = () =>
    run("Checking", async () => {
      const list = draft.trim() ? [...chips, ...split(draft)] : chips;
      if (!list.length || store === ALL_STORES) return;
      const j = await fetch("/api/lookup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: list.slice(0, 100), store, skipFetch: true }),
      }).then((r) => r.json());
      if (!j.ok) throw new Error(j.error ?? "lookup failed");
      setChips([]); setDraft("");
      const owed = await loadKeywords(store, true);
      if (owed?.length) void backfill(owed);
    });

  /**
   * Read a rival's keyword profile. The provider will describe any App Store
   * id without tracking it, so this leaves nothing behind on their side.
   */
  const spyOn = (body: { appStoreId?: string; query?: string; app?: Partial<RankingApp> }) =>
    run("Reading", async () => {
      const j = await fetch("/api/rival-keywords", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, store: store === ALL_STORES ? "us" : store }),
      }).then((r) => r.json());
      if (!j.ok) { setOffline(!!j.offline); throw new Error(j.error ?? "could not read that app"); }
      setSpy({ app: j.app, keywords: j.keywords ?? [] });
      setSpyPicked(new Set());
      setSpyQuery("");
    });

  /**
   * Adopt a rival's keywords.
   *
   * Claiming and scoring are split deliberately. Scoring a hundred unseen
   * keywords costs the provider about a minute, so we take the list first —
   * which is instant — and let the rows appear unscored, then fill them in
   * small batches so the table populates as it goes instead of freezing.
   */
  const adopt = (list: string[]) =>
    run("Adding", async () => {
      if (!list.length) return;
      const target = store === ALL_STORES ? "us" : store;

      // 1. claim them. Pure database work, so the rows show up immediately.
      for (let i = 0; i < list.length; i += 100) {
        await fetch("/api/lookup", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords: list.slice(i, i + 100), store: target, skipFetch: true }),
        });
      }
      setSpyPicked(new Set());
      setSpy(null);
      await loadKeywords(store, true);

      // 2. score them a chunk at a time, refreshing between, so progress shows.
      const CHUNK = 20;
      for (let i = 0; i < list.length; i += CHUNK) {
        const done = Math.min(i + CHUNK, list.length);
        setBusy(list.length > CHUNK ? `Scoring ${done} of ${list.length}` : "Scoring");
        const j = await fetch("/api/lookup", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords: list.slice(i, done), store: target, save: false }),
        }).then((r) => r.json());
        if (j.ok) { setOffline(!!j.offline); setPending(j.pending ?? []); }
        await loadKeywords(store, true);
        if (j.ok && j.offline) break;   // nothing more will land; the backfill retries later
      }
    });

  /** Pulls the provider's current numbers, ignoring our TTL. */
  const recheck = () =>
    run("Rechecking", async () => {
      if (!rows.length) return;
      const byStore = new Map<string, string[]>();
      for (const r of rows) byStore.set(r.store, [...(byStore.get(r.store) ?? []), r.keyword]);
      for (const [st, keywords] of byStore) {
        for (let i = 0; i < keywords.length; i += 100) {
          const j = await fetch("/api/lookup", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keywords: keywords.slice(i, i + 100), store: st, save: false, force: true }),
          }).then((r) => r.json());
          if (j.ok) { setOffline(!!j.offline); setPending(j.pending ?? []); }
        }
      }
      await loadKeywords(store, true);
    });

  const removeKeywords = (items: { keyword: string; store: string }[]) =>
    run(items.length > 1 ? `Removing ${items.length}` : "Removing", async () => {
      if (!items.length) return;
      // Drops this user's pointer only. The cached metrics stay put for
      // everyone else, and nothing reaches the provider.
      await Promise.all(items.map((it) =>
        fetch("/api/my-keywords", {
          method: "DELETE", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: it.keyword, store: it.store }),
        })));
      const gone = new Set(items.map(keyOf));
      setOpen((cur) => (cur && gone.has(cur) ? null : cur));
      setPicked(new Set());
      anchor.current = null;
      await loadKeywords(store, true);
    });

  /* -------------------------------------------------------------- table */

  const view = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = needle ? rows.filter((r) => r.keyword.toLowerCase().includes(needle)) : rows;
    const { key, dir } = sort;
    return [...list].sort((a, b) => {
      if (key === "keyword") return a.keyword.localeCompare(b.keyword) * dir;
      if (key === "addedAt") {
        const at = a.addedAt ? Date.parse(a.addedAt) : 0;
        const bt = b.addedAt ? Date.parse(b.addedAt) : 0;
        return (at - bt) * dir || a.keyword.localeCompare(b.keyword);
      }
      if (key === "store") {
        return (storeName(a.store).localeCompare(storeName(b.store))
          || a.keyword.localeCompare(b.keyword)) * dir;
      }
      const av = a[key] ?? -1, bv = b[key] ?? -1;
      return ((av as number) - (bv as number)) * dir;
    });
  }, [rows, q, sort]);

  /* ----------------------------------------------------------- picking */

  const toggle = (rowKey: string, i: number, shift: boolean) => {
    // read the anchor now: the updater below runs during render, by which point
    // anchor.current would already be this row
    const from = anchor.current;
    anchor.current = i;
    setPicked((cur) => {
      const next = new Set(cur);
      if (shift && from != null) {
        const [a, b] = [from, i].sort((x, y) => x - y);
        const on = !cur.has(rowKey);
        for (let k = a; k <= b; k++) {
          const row = view[k];
          if (!row) continue;
          if (on) next.add(keyOf(row)); else next.delete(keyOf(row));
        }
      } else if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  };

  const visible = view.map(keyOf);
  const allOn = visible.length > 0 && visible.every((k) => picked.has(k));
  const someOn = !allOn && visible.some((k) => picked.has(k));

  const toggleAll = () => {
    setPicked((cur) => {
      if (allOn) { const next = new Set(cur); visible.forEach((k) => next.delete(k)); return next; }
      return new Set([...cur, ...visible]);
    });
    anchor.current = null;
  };

  useEffect(() => {
    if (!picked.size) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPicked(new Set()); anchor.current = null; }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [picked.size]);

  useEffect(() => {
    if (!gate) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setGate(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [gate]);

  /* One call per keyword pulls the whole leaderboard; the sheet reveals it in
     tiers, so "show more" costs nothing. */
  useEffect(() => {
    if (!open || asked.current.has(open)) return;
    const [st, kw] = [open.slice(0, open.indexOf("|")), open.slice(open.indexOf("|") + 1)];
    asked.current.add(open);
    fetch("/api/ranking-apps", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: [kw], store: st }),
    })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setIcons((cur) => ({ ...cur, [open]: j.data[kw] ?? [] })); })
      .catch(() => { asked.current.delete(open); });
  }, [open]);

  useEffect(() => { setShown(TIERS[0]); }, [open]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  /** A clickable column header — the same `HEAD_CELL` label styling, plus a
   *  sort toggle. Lost its markup in the Tailwind pass (the underlying sort
   *  in `view` below was never touched, so data was still being sorted with
   *  no way left to change it — this restores the control, not the logic). */
  const th = (key: SortKey, label: string, className = "") => (
    <button
      type="button"
      onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : -1 }))}
      className={`flex cursor-pointer items-center gap-1 ${className} ${HEAD_CELL} ${
        sort.key === key ? "text-dark-ink/80" : "hover:text-dark-ink/65"
      }`}
    >
      {label}
      {sort.key === key && <span aria-hidden="true">{sort.dir === 1 ? "▲" : "▼"}</span>}
    </button>
  );

  const openRow = open ? rows.find((r) => keyOf(r) === open) ?? null : null;
  const openApps = open ? icons[open] : undefined;

  const nextTier = TIERS.find((t) => t > shown) ?? TIERS[TIERS.length - 1];

  const showStore = store === ALL_STORES;
  const staged = chips.length + (draft.trim() ? 1 : 0);

  /* ------------------------------------------------------------- render */

  /* One grid definition for the header and every row, so they cannot desync.
     The old table used a fixed 258px template inside a 246px container at
     320px, which collapsed the keyword column to zero and grew a scrollbar;
     store, apps and added now drop out below their breakpoints instead.
     Keyword stays `minmax(0,1fr)` — a bounded `65ch` cap was tried and it
     was wrong: a grid container's own tracks don't stretch to fill leftover
     width on their own, so capping the one flexible track left the whole row
     narrower than the panel, and delete/the chevron ended up stranded with
     dead space past them instead of sitting at the panel's actual edge. 1fr
     is what makes the row's last column reach the true right edge.
     Pop/Diff/Apps/Added were 6rem/6rem/3rem/3rem, then 4.5rem/4.5rem/3rem/
     3.25rem — every attempt at fixing the uneven gap between them by
     changing alignment (left vs right) failed for the same reason: with
     unequal column widths, no single alignment can make the visual gap
     between two labels equal, because each grid item stretches to fill its
     whole column by default (`getBoundingClientRect` on the label was
     measuring that stretched box, not the glyphs — which is why an earlier
     "16px/16px/16px, all equal" measurement here was simply wrong). The
     leftover space inside a column always shows up on one side of the label
     or the other; it does not vanish. The only fix that actually holds is
     equal-width columns: all four are the same width below, all four labels
     left-aligned, so the leftover space inside each is the same and the
     small remaining difference is just the label text itself (a few px, not
     tens of px). The meter's own track absorbs whatever room that leaves it.
     Delete and the chevron used to share one grid cell with their own
     tight `gap-1` between them, which is exactly what broke the rule: every
     other pair of items follows the row's `gap-4` and this one pair followed
     a different, smaller number a few pixels away. They're separate columns
     now, sized the same as everything else, so there is one spacing rule for
     the whole row rather than one rule for the data and another for the
     trailing icons. 5.5rem rather than 4rem: the meter's track was reading
     as a sliver too short to show a 0-100 scale meaningfully. Widening all
     six equally (not just Pop/Diff) keeps the one-rule-for-everything
     property intact instead of reopening the mismatch this whole comment is
     about. */
  const ROW =
    "grid min-w-0 items-center gap-4 " +
    "[grid-template-columns:1.25rem_minmax(0,1fr)_4.5rem_4.5rem_1.75rem] " +
    "sm:[grid-template-columns:1.25rem_minmax(0,1fr)_5.5rem_5.5rem_5.5rem_5.5rem_5.5rem_5.5rem]";
  const ROW_ALL =
    "grid min-w-0 items-center gap-4 " +
    "[grid-template-columns:1.25rem_2.5rem_minmax(0,1fr)_4.5rem_4.5rem_1.75rem] " +
    "sm:[grid-template-columns:1.25rem_3rem_minmax(0,1fr)_5.5rem_5.5rem_5.5rem_5.5rem_5.5rem_5.5rem]";

  const HEAD_CELL = "text-2xs font-bold uppercase tracking-[0.06em] text-dark-ink/45";

  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      {/* No pill/card chrome here — the workspace isn't a marketing page, so
          it just gets the two things it needs: the way back to the site,
          and the account menu. Edge to edge like the landing header, not
          centred in a max-width column — brand at the actual left edge,
          account chip at the actual right edge. */}
      <header className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <BrandMark size="sm" />
        <AccountChip onSignIn={() => router.push("/")} />
      </header>

      <main className="mx-auto mt-8 w-[min(100%-1.5rem,72rem)] min-w-0 flex-1">
        <div className="min-w-0">
          <Kicker>Apple Search Ads data</Kicker>
          <h1 className="mt-3 max-w-[22ch] font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
            Build the keyword set you can actually rank for.
          </h1>
          <p className="mt-3 max-w-[62ch] text-md leading-relaxed text-muted">
            Paste messy ideas, score them by storefront, and keep the terms with demand and
            a realistic path into the ranking set.
          </p>
        </div>

        {/* ------------------------------------------------------- composer */}
        <Card tone="dark" pad="sm" className="mt-8">
          <div
            className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg bg-white/6 p-2 sm:flex-nowrap"
            onClick={() => field.current?.focus()}
          >
            <span className="shrink-0 pl-1 text-dark-ink/50"><Search size={17} /></span>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {chips.map((c) => (
                /* A chip paints a background, so it can never be given a width
                   it cannot fill — it truncates instead, which clips the text
                   rather than letting it run outside the pill. */
                <span
                  key={c}
                  className="flex min-w-0 max-w-full items-center gap-1 rounded-full bg-white/12 py-1 pl-3 pr-1 text-xs text-dark-ink"
                >
                  <span className="min-w-0 truncate">{c}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${c}`}
                    className="grid size-4 shrink-0 cursor-pointer place-items-center rounded-full text-dark-ink/60 hover:bg-white/15 hover:text-dark-ink"
                    onClick={(e) => { e.stopPropagation(); setChips((cur) => cur.filter((k) => k !== c)); }}
                  >
                    <Close size={11} />
                  </button>
                </span>
              ))}
              <input
                ref={field}
                value={draft}
                placeholder={chips.length ? "Add another..." : "habit tracker"}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                onPaste={(e) => {
                  const t = e.clipboardData.getData("text");
                  if (/[\n,]/.test(t)) { e.preventDefault(); addChips(t); }
                }}
                className="min-w-0 flex-1 basis-20 bg-transparent py-1.5 text-base text-dark-ink outline-none placeholder:text-dark-ink/35"
              />
            </div>

            <Button
              size="md"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => check()}
              disabled={!staged || !!busy || showStore}
            >
              {busy === "Checking" ? "Checking..." : staged ? `Check ${staged}` : "Check"}
            </Button>
          </div>

          <p className="mt-2.5 px-1 text-xs leading-relaxed text-dark-ink/50">
            {showStore
              ? <>Viewing every store at once. Pick one country to add keywords.</>
              : staged
                ? <>Press <Kbd>Enter</Kbd> again to run. <Kbd>Backspace</Kbd> removes the last one.</>
                : <>Type a keyword and press <Kbd>Enter</Kbd>. Pasting a list works too.</>}
          </p>
        </Card>

        {error && <Notice tone="error" className="mt-4">{error}</Notice>}

        {scoring > 0 && (
          <Notice tone="working" className="mt-4">
            Scoring {scoring} new keyword{scoring === 1 ? "" : "s"} — the dashes fill in shortly.
          </Notice>
        )}

        {offline && (
          <Notice className="mt-4">
            <b className="font-semibold text-ink">Fresh checks are paused.</b> Everything
            already looked up still works
            {pending.length
              ? `, and ${pending.length} new keyword${pending.length === 1 ? "" : "s"} will be scored automatically once checks resume.`
              : ", and new keywords will be scored automatically once checks resume."}
          </Notice>
        )}

        {/* ---------------------------------------------------------- table */}
        <Card tone="dark" pad="none" className="mt-6 overflow-hidden">
          {/* Title and controls are two separate rows rather than one flex-wrap
              row. A `flex-1 min-w-0` title next to shrink-0 controls never
              actually wraps — flex-wrap only breaks a line when items can't be
              compressed to fit, and a min-w-0 flex child can always compress to
              zero, so the title silently shrank to a sliver behind the store
              picker instead of dropping to its own line. */}
          {/* The one coral surface in the workspace — everything else here is
              the dark material. This is the panel's own identity bar, the
              same accent gradient the landing page's primary button and CTA
              band use, so the results table reads as this product's rather
              than a generic dark dashboard. `stack="lg"`: side-by-side above
              that breakpoint, title above controls below it — a `flex-1`
              title block sharing a row with these fixed-width controls has
              no forced wrap otherwise, which is the squish this fixes. */}
          <CoralHeader
            bleed={false}
            stack="lg"
            title={
              rows.length
                ? showStore
                  ? `${rows.length} across ${new Set(rows.map((r) => r.store)).size} stores`
                  : `${rows.length} keywords`
                : "Results"
            }
            subtitle={showStore ? "Comparing every saved storefront" : `Researching ${storeName(store)}`}
            right={
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <StorePicker value={store} onChange={setStore} onDark={false} />

                <label className="flex min-w-0 flex-1 basis-full items-center gap-2 rounded-full bg-white px-3 py-2 text-accent-2/70 lg:basis-auto">
                  <Eye size={14} />
                  <input
                    value={spyQuery}
                    placeholder="Spy on a competitor — paste their link"
                    autoCapitalize="off" autoCorrect="off" spellCheck={false} autoComplete="off"
                    onChange={(e) => setSpyQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && spyQuery.trim()) spyOn({ query: spyQuery.trim() }); }}
                    className="min-w-0 flex-1 bg-transparent text-sm text-accent-2 outline-none placeholder:text-accent-2/60"
                  />
                </label>

                <label className="flex min-w-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-accent-2/70">
                  <Search size={14} />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Filter"
                    className="w-20 min-w-0 bg-transparent text-sm text-accent-2 outline-none placeholder:text-accent-2/60"
                  />
                </label>

                <Button variant="inverse" iconOnly size="sm" title="Recheck all" aria-label="Recheck all"
                  className="shrink-0"
                  onClick={recheck} disabled={!!busy || !rows.length}>
                  <Refresh />
                </Button>
              </div>
            }
          />

          {!rows.length && !loadingRows ? (
            <div className="px-6 py-16 text-center">
              <h3 className="font-display text-lg font-bold text-dark-ink">
                {showStore ? "No keywords in any store yet" : `Nothing checked in ${storeName(store)} yet`}
              </h3>
              <p className="mt-2 text-sm text-dark-ink/55">
                Add a keyword above and it lands here with its pop and diff.
              </p>
            </div>
          ) : (
            <>
              <div className={`${showStore ? ROW_ALL : ROW} border-b border-white/10 px-3 py-2.5`}>
                <span className="cursor-pointer" onClick={toggleAll} title="Select all">
                  <Check state={allOn ? "on" : someOn ? "some" : "off"} />
                </span>
                {showStore && th("store", "Store")}
                {th("keyword", "Keyword")}
                {th("popularity", "Pop")}
                {th("difficulty", "Diff")}
                <span className={`hidden sm:block ${HEAD_CELL}`}>Apps</span>
                {/* `hidden` + `sm:contents` on the wrapper, not the button itself: a
                    bare `flex`/`hidden` pair on one element both set `display` at
                    the same specificity, and which one wins depends on Tailwind's
                    internal class order, not the order they're written here — the
                    exact bug class that broke the Card and Button colour variants
                    earlier. The wrapper hides or disappears from layout; the button
                    inside keeps its own `flex` untouched either way. */}
                <span className="hidden sm:contents">{th("addedAt", "Added")}</span>
                {/* Two placeholder cells, matching the two separate icon
                    columns in the data rows below — see the ROW comment. */}
                <span className="hidden sm:block" />
                <span />
              </div>

              <div className="min-w-0 p-1.5">
                {view.map((r, i) => {
                  const rowKey = keyOf(r);
                  const isOpen = open === rowKey;
                  const on = picked.has(rowKey);
                  return (
                    <div
                      key={rowKey}
                      role="button"
                      tabIndex={0}
                      style={{ animationDelay: `${Math.min(i * 26, 340)}ms` }}
                      onClick={() => setOpen(isOpen ? null : rowKey)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? null : rowKey); }
                      }}
                      className={`${showStore ? ROW_ALL : ROW} animate-fade cursor-pointer rounded-md px-2 py-2.5 transition-colors duration-150 ${
                        on ? "bg-white/12" : "hover:bg-white/6"
                      }`}
                    >
                      <span
                        className="cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); toggle(rowKey, i, e.shiftKey); }}
                      >
                        <Check state={on ? "on" : "off"} />
                      </span>

                      {showStore && (
                        <span className="flex min-w-0 items-center gap-1" title={storeName(r.store)}>
                          <span aria-hidden="true">{flagOf(r.store)}</span>
                          <span className="hidden font-mono text-2xs text-dark-ink/55 sm:inline">
                            {r.store.toUpperCase()}
                          </span>
                        </span>
                      )}

                      <span className="min-w-0 truncate text-sm text-dark-ink" title={r.keyword}>
                        {r.keyword}
                      </span>
                      <Meter value={r.popularity} band={popBand(r.popularity)} onDark />
                      <Meter value={r.difficulty} band={diffBand(r.difficulty)} onDark />
                      <span className="hidden font-mono text-2xs tabular-nums text-dark-ink/60 sm:block">
                        {r.appsCount ?? "—"}
                      </span>
                      <span className="hidden font-mono text-2xs tabular-nums text-dark-ink/60 sm:block"
                        title={r.addedAt ?? ""}>
                        {shortAgo(r.addedAt)}
                      </span>

                      {/* Delete and the chevron are separate grid cells, same
                          as Pop/Diff/Apps/Added — the same rule applied to
                          every item is what makes the row read as one system
                          instead of the data columns following one spacing
                          rule and the trailing icons following another.
                          `variant="dangerGhost"` — no permanent chip, unlike
                          the modal headers' `onColor` close/delete: one row
                          among many is not a lone control on a coral bar,
                          and a box per row read as noise. */}
                      <Button
                        variant="dangerGhost" iconOnly size="sm"
                        disabled={!!busy}
                        title={`Delete “${r.keyword}” from ${storeName(r.store)}`}
                        aria-label={`Delete ${r.keyword} from ${storeName(r.store)}`}
                        onClick={(e) => { e.stopPropagation(); removeKeywords([r]); }}
                        className="hidden sm:flex"
                      >
                        <Trash size={14} />
                      </Button>

                      <span className={`shrink-0 text-dark-ink/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <Chevron size={11} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>

        <footer className="mt-4 flex min-w-0 flex-wrap gap-x-6 gap-y-1 text-xs text-faint">
          <span><b className="font-semibold text-ink-2">Pop</b> how much a keyword is searched · aim above 25</span>
          <span><b className="font-semibold text-ink-2">Diff</b> how hard it is to index for · aim below 65</span>
        </footer>
      </main>

      {/* ------------------------------------------------------ keyword sheet */}
      {openRow && (
        <Modal onClose={() => setOpen(null)} title={openRow.keyword} size="lg" hideClose>
          <CoralHeader
            title={openRow.keyword}
            right={
              <span className="flex shrink-0 items-center gap-1">
                <Button
                  variant="onColor" iconOnly size="sm"
                  disabled={!!busy}
                  onClick={() => removeKeywords([openRow])}
                  aria-label={`Delete ${openRow.keyword}`}
                  title={`Delete ${openRow.keyword}`}
                >
                  <Trash size={15} />
                </Button>
                <Button variant="onColor" iconOnly size="sm" onClick={() => setOpen(null)} aria-label="Close">
                  <Close size={15} />
                </Button>
              </span>
            }
          />

          <div className="min-w-0 rounded-md border border-line bg-sunken px-[18px] py-3.5">
            <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Pop</span>
                <span className="w-24"><Meter value={openRow.popularity} band={popBand(openRow.popularity)} /></span>
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Diff</span>
                <span className="w-24"><Meter value={openRow.difficulty} band={diffBand(openRow.difficulty)} /></span>
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Apps</span>
                <b className="font-mono text-sm tabular-nums text-ink">{openRow.appsCount ?? "—"}</b>
              </span>
            </div>
            <div className="mt-3 min-w-0 border-t border-line pt-3 text-xs text-faint">
              {flagOf(openRow.store)} {storeName(openRow.store)} · checked {timeAgo(openRow.lastUpdate)}
            </div>
          </div>

          {/* overflow-hidden so CoralHeader's own rounded-t-card clips down
              to this card's smaller rounded-md corners, rather than the two
              radii fighting at the seam. */}
          <div className="mt-6 min-w-0 overflow-hidden rounded-md border border-line bg-sunken">
            <CoralHeader
              bleed={false}
              size="sm"
              title="Who holds the top spots"
              right={
                openApps && (
                  <span className="shrink-0 font-mono text-xs text-white/80">
                    {Math.min(shown, openApps.length)} of {openApps.length}
                  </span>
                )
              }
            />

            <div className="max-h-[22rem] min-w-0 overflow-y-auto p-1.5">
              {openApps
                ? openApps.slice(0, shown).map((c, k) => (
                    <div key={c.appStoreId ?? k}
                      className="grid min-w-0 items-center gap-2.5 rounded-sm px-2 py-2 [grid-template-columns:1.5rem_minmax(0,1fr)_auto_1.75rem] hover:bg-hover">
                      <span className="font-mono text-2xs tabular-nums text-faint">{k + 1}</span>
                      <a
                        className="flex min-w-0 items-center gap-2.5 no-underline"
                        href={storeUrl(c.appStoreId, openRow?.store ?? store)}
                        target="_blank" rel="noreferrer" title="Open in the App Store"
                      >
                        {c.iconUrl
                          ? <img src={c.iconUrl} alt="" className="size-8 shrink-0 rounded-md" />
                          : <span className="size-8 shrink-0 rounded-md bg-line" />}
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-ink">{c.name}</span>
                          {c.subtitle && (
                            <small className="block truncate text-2xs text-faint">{c.subtitle}</small>
                          )}
                        </span>
                      </a>
                      <span className="shrink-0 font-mono text-2xs tabular-nums text-faint">
                        {c.ratingCount
                          ? `${(c.ratingCount / 1000).toFixed(c.ratingCount > 99999 ? 0 : 1)}K ★`
                          : "—"}
                      </span>
                      <button
                        type="button"
                        title="See this app's keywords"
                        disabled={!!busy}
                        onClick={() => spyOn({ appStoreId: c.appStoreId, app: c })}
                        className="shrink-0 cursor-pointer rounded-full p-1.5 text-faint transition-colors hover:bg-tint hover:text-accent disabled:opacity-40"
                      >
                        <Eye size={15} />
                      </button>
                    </div>
                  ))
                : (
                  <div className="space-y-2 p-2">
                    {Array.from({ length: 6 }, (_, k) => (
                      <span key={k} className="block h-9 animate-pulse rounded-md bg-line/50" />
                    ))}
                  </div>
                )}
              {openApps && !openApps.length && (
                <p className="px-3 py-6 text-center text-sm text-faint">Nothing came back for this one.</p>
              )}
            </div>

            {openApps && shown < openApps.length && (
              <div className="border-t border-line p-2">
                <Button variant="ghost" size="sm" block onClick={() => setShown(nextTier)}>
                  Show more
                </Button>
              </div>
            )}
            {openApps && openApps.length > 0 && shown >= openApps.length && (
              <p className="border-t border-line px-4 py-3 text-center text-xs text-faint">
                That is as deep as the store ranks this keyword.
              </p>
            )}
          </div>
        </Modal>
      )}

      {/* -------------------------------------------------------- spy panel */}
      {spy && (
        <Modal onClose={() => setSpy(null)} title={spy.app.name ?? "Competitor keywords"} size="lg" hideClose>
          <CoralHeader
            icon={
              spy.app.iconUrl
                ? <img src={spy.app.iconUrl} alt="" className="size-10 shrink-0 rounded-lg" />
                : <span className="size-10 shrink-0 rounded-lg bg-white/20" />
            }
            title={
              <a
                href={storeUrl(spy.app.appStoreId, store)}
                target="_blank" rel="noreferrer"
                className="no-underline hover:underline"
              >
                {spy.app.name ?? spy.app.appStoreId}
              </a>
            }
            subtitle={spy.app.subtitle ?? spy.app.developer ?? ""}
            right={
              <span className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-white/80">{spy.keywords.length} keywords</span>
                <Button variant="onColor" iconOnly size="sm" onClick={() => setSpy(null)} aria-label="Close">
                  <Close size={15} />
                </Button>
              </span>
            }
          />

          {/* Same responsive template as the main table. This one had a fixed
              430px grid with no override at all, so at 375px the header row
              and the keyword rows drifted 110px out of alignment. */}
          <div className="mt-5 grid min-w-0 items-center gap-3 border-b border-line pb-2 [grid-template-columns:1.25rem_minmax(0,1fr)_4.5rem_4.5rem_1.75rem] sm:[grid-template-columns:1.25rem_minmax(0,1fr)_6rem_6rem_3rem_1.75rem]">
            <span
              className="cursor-pointer"
              title="Select all"
              onClick={() => setSpyPicked((cur) =>
                cur.size === spy.keywords.length ? new Set() : new Set(spy.keywords.map((r) => r.keyword)))}
            >
              <Check state={spyPicked.size === 0 ? "off" : spyPicked.size === spy.keywords.length ? "on" : "some"} />
            </span>
            <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Keyword</span>
            <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Pop</span>
            <span className="text-2xs font-bold uppercase tracking-[0.06em] text-faint">Diff</span>
            <span className="hidden text-right text-2xs font-bold uppercase tracking-[0.06em] text-faint sm:block">Apps</span>
            <span />
          </div>

          <div className="max-h-[24rem] min-w-0 overflow-y-auto py-1">
            {spy.keywords.map((r) => {
              const held = rows.some((x) => x.keyword === r.keyword && x.store === store);
              const on = spyPicked.has(r.keyword);
              return (
                <div
                  key={r.keyword}
                  className={`grid min-w-0 items-center gap-3 rounded-sm px-1 py-2 [grid-template-columns:1.25rem_minmax(0,1fr)_4.5rem_4.5rem_1.75rem] sm:[grid-template-columns:1.25rem_minmax(0,1fr)_6rem_6rem_3rem_1.75rem] ${
                    on ? "bg-tint" : "hover:bg-hover"
                  }`}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => setSpyPicked((cur) => {
                      const next = new Set(cur);
                      if (next.has(r.keyword)) next.delete(r.keyword); else next.add(r.keyword);
                      return next;
                    })}
                  >
                    <Check state={on ? "on" : "off"} />
                  </span>
                  <span className="min-w-0 truncate text-sm text-ink" title={r.keyword}>{r.keyword}</span>
                  <Meter value={r.popularity} band={popBand(r.popularity)} />
                  <Meter value={r.difficulty} band={diffBand(r.difficulty)} />
                  <span className="hidden text-right font-mono text-2xs tabular-nums text-faint sm:block">
                    {r.appsCount ?? "—"}
                  </span>
                  <Button
                    variant="primary" iconOnly size="sm" className="shrink-0"
                    disabled={held || !!busy}
                    title={held ? "already in your list" : `Add “${r.keyword}”`}
                    aria-label={held ? "Already in your list" : `Add ${r.keyword}`}
                    onClick={() => adopt([r.keyword])}
                  >
                    {held ? <Check state="on" /> : <Plus size={15} />}
                  </Button>
                </div>
              );
            })}
            {!spy.keywords.length && (
              <p className="px-3 py-6 text-center text-sm text-faint">Nothing came back for this app.</p>
            )}
          </div>

          {spyPicked.size > 0 && (
            <div className="mt-3 flex min-w-0 flex-wrap items-center gap-3 border-t border-line pt-3">
              <span className="font-mono text-xs text-muted">{spyPicked.size} selected</span>
              <Button variant="ghost" size="sm" onClick={() => setSpyPicked(new Set())}>Clear</Button>
              <Button
                size="sm"
                className="ml-auto"
                disabled={!!busy}
                onClick={() => adopt([...spyPicked].filter((k) =>
                  !rows.some((x) => x.keyword === k && x.store === store)))}
              >
                <Plus size={14} /> Add {spyPicked.size}
              </Button>
            </div>
          )}
        </Modal>
      )}

      {/* -------------------------------------------------- subscription gate */}
      {gate && (
        <Modal onClose={() => setGate(false)} title="Subscription needed">
          <BrandMark size="sm" as="span" />
          <p className="mt-5 font-display text-xl font-extrabold leading-tight text-ink">
            Subscription needed
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Scoring keywords needs an active plan. Your lists stay exactly as you left
            them — turn a plan on and everything here starts working immediately.
          </p>

          <div className="mt-5 flex min-w-0 flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm text-muted">
            <span><b className="font-display font-extrabold text-ink">109</b> storefronts</span>
            <span><b className="font-display font-extrabold text-ink">100</b> keywords per check</span>
            <span><b className="font-display font-extrabold text-ink">50</b> ranked apps</span>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <Button href="/start" size="lg" block>See the plans</Button>
            <Button href="/billing" variant="ghost" size="sm" block>Check billing</Button>
          </div>

          <p className="mt-4 text-center text-xs text-faint">$14.99/mo or $99/yr · cancel anytime</p>
        </Modal>
      )}

      {/* ------------------------------------------------------ selection bar */}
      {picked.size > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
          {/* Bounded by the viewport and allowed to wrap. It was `position:
              fixed; left:50%` with three nowrap children and no max-width, so
              below ~620px it ran off both edges at once. */}
          <div className="flex min-w-0 max-w-full animate-rise flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-ink/20 bg-ink px-4 py-2.5 shadow-3">
            <span className="shrink-0 text-sm font-semibold text-white">{picked.size} selected</span>
            <button
              type="button"
              onClick={toggleAll}
              className="hidden shrink-0 cursor-pointer text-sm text-white/70 hover:text-white sm:block"
            >
              {allOn ? "Deselect all" : `Select all ${visible.length}`}
            </button>
            <button
              type="button"
              disabled={!!busy}
              onClick={() => removeKeywords(rows.filter((r) => picked.has(keyOf(r))))}
              className="flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#ff9b90] hover:text-red disabled:opacity-50"
            >
              <Trash size={13} /> {busy?.startsWith("Removing") ? "Deleting…" : `Delete ${picked.size}`}
            </button>
            <button
              type="button"
              title="Clear selection (Esc)"
              aria-label="Clear selection"
              onClick={() => { setPicked(new Set()); anchor.current = null; }}
              className="shrink-0 cursor-pointer rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <Close size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Inline key hint. */
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-sm border border-white/20 bg-white/10 px-1.5 py-0.5 font-sans text-2xs font-semibold text-dark-ink">
      {children}
    </kbd>
  );
}
