"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Refresh, Search, Trash, Close } from "../components/icons";
import StorePicker from "../components/StorePicker";
import AccountChip from "../components/AccountChip";
import { useUser } from "../components/useUser";
import { api, rows_ } from "@/lib/client";
import { ALL_STORES, flagOf, storeName, timeAgo, type KeywordRow, type RankingApp } from "@/lib/types";

/* ------------------------------------------------------------------ utils */

// popularity rewards high, difficulty rewards low
const popBand  = (v: number | null) => (v == null ? "na" : v >= 65 ? "hi" : v >= 20 ? "mid" : "lo");
const diffBand = (v: number | null) => (v == null ? "na" : v <= 20 ? "hi" : v <= 65 ? "mid" : "lo");

const split = (text: string) =>
  text.split(/[\n,]/).map((k) => k.trim().toLowerCase().replace(/\s+/g, " ")).filter(Boolean);

function Meter({ value, band }: { value: number | null; band: string }) {
  return (
    <span className={`cell ${band}`}>
      <span className="n">{value ?? "–"}</span>
      <span className="track"><i style={{ width: `${Math.min(100, Math.max(0, value ?? 0))}%` }} /></span>
    </span>
  );
}

function Check({ state }: { state: "on" | "off" | "some" }) {
  return (
    <span className="cb" data-state={state}>
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

type SortKey = "keyword" | "popularity" | "difficulty" | "store";

/* ------------------------------------------------------------------- page */

export default function Page() {
  const router = useRouter();
  const { user, ready: authReady } = useUser();
  const [appId, setAppId] = useState<string | null>(null);
  const [store, setStore] = useState("us");

  const [rows, setRows] = useState<KeywordRow[]>([]);
  const [icons, setIcons] = useState<Record<string, RankingApp[]>>({});

  const [chips, setChips] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [shown, setShown] = useState(10);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "popularity", dir: -1 });

  const [busy, setBusy] = useState<string | null>(null);
  const [loadingRows, setLoadingRows] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // keywords already fetched, keyed by store, so switching back is instant
  const kwCache = useRef<Map<string, KeywordRow[]>>(new Map());
  const asked = useRef<Set<string>>(new Set());
  const field = useRef<HTMLInputElement>(null);
  const anchor = useRef<number | null>(null); // for shift-click ranges

  /* ------------------------------------------------------------ loaders */

  useEffect(() => {
    if (authReady && !user) router.replace("/");
  }, [authReady, user, router]);

  useEffect(() => {
    fetch("/api/workspace")
      .then((r) => r.json())
      .then((j) => (j.ok ? setAppId(j.data.appId) : setError(j.error)))
      .catch(() => setError("Keyword service is not reachable"));
  }, []);

  const loadKeywords = useCallback(async (id: string, st: string, force = false) => {
    const cached = kwCache.current.get(st);
    if (cached && !force) { setRows(cached); setError(null); return; }
    if (force) kwCache.current.clear(); // a write in one store also changes "all"

    setLoadingRows(true); setError(null);
    try {
      const { data } = await api("get_app_keywords",
        st === ALL_STORES ? { appId: id } : { appId: id, store: st });
      const list = rows_(data).map((r): KeywordRow => ({
        keyword: String(r.keyword ?? ""),
        store: String(r.store ?? st),
        popularity: r.popularity ?? null,
        difficulty: r.difficulty ?? null,
        appsCount: r.appsCount ?? null,
        lastUpdate: r.lastUpdate ?? null,
      }));
      kwCache.current.set(st, list);
      setRows(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setRows([]);
    } finally {
      setLoadingRows(false);
    }
  }, []);

  useEffect(() => { if (appId) loadKeywords(appId, store); }, [appId, store, loadKeywords]);
  useEffect(() => { setOpen(null); setPicked(new Set()); anchor.current = null; }, [store]);

  const run = useCallback(async (what: string, fn: () => Promise<void>) => {
    setBusy(what); setError(null);
    try { await fn(); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(null); }
  }, []);

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

  const check = () =>
    run("Checking", async () => {
      const list = draft.trim() ? [...chips, ...split(draft)] : chips;
      if (!appId || !list.length || store === ALL_STORES) return;
      await api("add_keywords", { appId, store, keywords: list.slice(0, 100), platform: "iphone" });
      setChips([]); setDraft("");
      await loadKeywords(appId, store, true);
    });

  const removeKeywords = (items: { keyword: string; store: string }[]) =>
    run(items.length > 1 ? `Removing ${items.length}` : "Removing", async () => {
      if (!appId || !items.length) return;
      // the provider needs a store whenever a keyword exists in more than one,
      // so delete store by store, chunked — one oversized call is the
      // difference between a partial and a clean delete
      const byStore = new Map<string, string[]>();
      for (const it of items) {
        byStore.set(it.store, [...(byStore.get(it.store) ?? []), it.keyword]);
      }
      for (const [st, keywords] of byStore) {
        for (let i = 0; i < keywords.length; i += 50) {
          await api("remove_keywords", { appId, store: st, keywords: keywords.slice(i, i + 50) });
        }
      }
      const gone = new Set(items.map(keyOf));
      setOpen((cur) => (cur && gone.has(cur) ? null : cur));
      setPicked(new Set());
      anchor.current = null;
      await loadKeywords(appId, store, true);
    });

  /* -------------------------------------------------------------- table */

  const view = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = needle ? rows.filter((r) => r.keyword.toLowerCase().includes(needle)) : rows;
    const { key, dir } = sort;
    return [...list].sort((a, b) => {
      if (key === "keyword") return a.keyword.localeCompare(b.keyword) * dir;
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

  const th = (key: SortKey, label: string) => (
    <span className={`srt ${sort.key === key ? "on" : ""}`}
      onClick={() => setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : -1 }))}>
      {label}{sort.key === key && <span className="caret">{sort.dir === 1 ? "▲" : "▼"}</span>}
    </span>
  );

  const openRow = open ? rows.find((r) => keyOf(r) === open) ?? null : null;
  const openApps = open ? icons[open] : undefined;
  const nextTier = TIERS.find((t) => t > shown) ?? TIERS[TIERS.length - 1];

  const showStore = store === ALL_STORES;
  const staged = chips.length + (draft.trim() ? 1 : 0);

  /* ------------------------------------------------------------- render */

  return (
    <div className="page app-workspace">
      <div className="glow" />

      <header className="top">
        <span className="mark">aso<b>kit</b></span>
        <span className="workspace-label">Keyword workspace</span>
        <span className="sp" />
        <AccountChip onSignIn={() => router.push("/")} />
      </header>

      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Apple Search Ads data</span>
          <h1>Build the keyword set you can actually rank for.</h1>
          <p>Paste messy ideas, score them by storefront, and keep the terms with demand and a realistic path into the ranking set.</p>
        </div>

        <div className="command-card">
          <div className="bar" onClick={() => field.current?.focus()}>
            <span className="lead"><Search size={17} /></span>

            <div className="field">
              {chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                  <button aria-label={`Remove ${c}`}
                    onClick={(e) => { e.stopPropagation(); setChips((cur) => cur.filter((k) => k !== c)); }}>
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
              />
            </div>

            <button className="go" onClick={(e) => { e.stopPropagation(); check(); }}
              disabled={!appId || !staged || !!busy || showStore}>
              {busy === "Checking" ? "Checking..." : staged ? `Check ${staged}` : "Check"}
            </button>
          </div>

          <p className="under">
            {showStore
              ? <>Viewing every store at once. Pick one country to add keywords.</>
              : staged
                ? <>Press <kbd>Enter</kbd> again to run. <kbd>Backspace</kbd> removes the last one.</>
                : <>Type a keyword and press <kbd>Enter</kbd>. Pasting a list works too.</>}
          </p>
        </div>

      </section>

      {error && <div className="error">{error}</div>}

      <section className="panel">
        <div className="head">
          <div className="panel-titlegroup">
            <span className="title">
              {rows.length
                ? showStore
                  ? `${rows.length} across ${new Set(rows.map((r) => r.store)).size} stores`
                  : `${rows.length} keywords`
                : "Results"}
            </span>
            <span className="subtitle">{showStore ? "Comparing every saved storefront" : `Researching ${storeName(store)}`}</span>
          </div>
          <span className="sp" />
          <StorePicker value={store} onChange={setStore} />
          <div className="search">
            <Search size={14} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter" />
          </div>
          <button className="btn icon" title="Recheck all"
            onClick={() => appId && loadKeywords(appId, store, true)} disabled={!appId || !!busy}>
            <Refresh />
          </button>
        </div>

        <div className="bar-load" data-on={busy || loadingRows ? 1 : 0}><i /></div>

        {!rows.length && !loadingRows ? (
          <div className="center">
            <div className="ghosts">{[68, 44, 82].map((w, i) => <span key={i} style={{ width: `${w}%` }} />)}</div>
            <h3>{showStore ? "No keywords in any store yet" : `Nothing checked in ${storeName(store)} yet`}</h3>
            <p>Add a keyword above and it lands here with its pop and diff.</p>
          </div>
        ) : (
          <>
            <div className="cols" data-all={showStore ? 1 : 0}>
              <span className="pickcol" onClick={toggleAll} title="Select all">
                <Check state={allOn ? "on" : someOn ? "some" : "off"} />
              </span>
              {showStore && th("store", "Store")}
              {th("keyword", "Keyword")}
              {th("popularity", "Pop")}
              {th("difficulty", "Diff")}
              <span className="apps">Apps</span>
              <span />
              <span />
            </div>

            <div className="list" data-picking={picked.size ? 1 : 0}>
              {view.map((r, i) => {
                const rowKey = keyOf(r);
                const isOpen = open === rowKey;
                const on = picked.has(rowKey);
                const comps = icons[rowKey];
                return (
                  <div key={rowKey}>
                    <div className="krow" role="button" tabIndex={0} data-all={showStore ? 1 : 0}
                      data-open={isOpen ? 1 : 0} data-picked={on ? 1 : 0}
                      style={{ animationDelay: `${Math.min(i * 26, 340)}ms` }}
                      onClick={() => setOpen(isOpen ? null : rowKey)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? null : rowKey); }
                      }}>
                      <span className="pickcol"
                        onClick={(e) => { e.stopPropagation(); toggle(rowKey, i, e.shiftKey); }}>
                        <Check state={on ? "on" : "off"} />
                      </span>

                      {showStore && (
                        <span className="stcell" title={storeName(r.store)}>
                          <span className="fl">{flagOf(r.store)}</span>
                          <span className="cc">{r.store.toUpperCase()}</span>
                        </span>
                      )}

                      <span className="kw">
                        <b title={r.keyword}>{r.keyword}</b>
                      </span>
                      <Meter value={r.popularity} band={popBand(r.popularity)} />
                      <Meter value={r.difficulty} band={diffBand(r.difficulty)} />
                      <span className="apps tnum">{r.appsCount ?? "—"}</span>

                      <button className="kill" disabled={!!busy}
                        title={`Delete “${r.keyword}” from ${storeName(r.store)}`}
                        onClick={(e) => { e.stopPropagation(); removeKeywords([r]); }}>
                        <Trash size={14} />
                      </button>

                      <span className="chev">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      <footer className="legend">
        <span><b>Pop</b> how much a keyword is searched in the App Store · aim above 25</span>
        <span><b>Diff</b> how difficult it is to index for a keyword · aim below 75</span>
      </footer>


      {openRow && (
        <div className="scrim" onClick={() => setOpen(null)}>
          <div className="ksheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <header>
              <div className="who">
                <h2>{openRow.keyword}</h2>
                <span className="where">
                  {flagOf(openRow.store)} {storeName(openRow.store)} · checked {timeAgo(openRow.lastUpdate)}
                </span>
              </div>
                <button className="shut delete" disabled={!!busy}
                  onClick={() => removeKeywords([openRow])} aria-label={`Delete ${openRow.keyword}`}
                  title={`Delete ${openRow.keyword}`}>
                  <Trash size={15} />
                </button>
              <button className="shut" onClick={() => setOpen(null)} aria-label="Close">
                <Close size={15} />
              </button>
            </header>

            <div className="scores">
              <span className="score">
                <span className="sk">Pop</span>
                <Meter value={openRow.popularity} band={popBand(openRow.popularity)} />
              </span>
              <span className="score">
                <span className="sk">Diff</span>
                <Meter value={openRow.difficulty} band={diffBand(openRow.difficulty)} />
              </span>
              <span className="score narrow">
                <span className="sk">Apps</span>
                <b className="tnum">{openRow.appsCount ?? "—"}</b>
              </span>
            </div>

            <div className="board">
              <div className="bhead">
                <span>Who holds the top spots</span>
                {openApps && <span className="tnum">{Math.min(shown, openApps.length)} of {openApps.length}</span>}
              </div>

              <div className="blist">
                {openApps
                  ? openApps.slice(0, shown).map((c, k) => (
                      <div className="comp" key={c.appStoreId ?? k}>
                        <span className="pos tnum">{k + 1}</span>
                        {c.iconUrl ? <img src={c.iconUrl} alt="" /> : <span className="ph" />}
                        <span className="n">{c.name}</span>
                        <span className="s tnum">
                          {c.ratingCount
                            ? `${(c.ratingCount / 1000).toFixed(c.ratingCount > 99999 ? 0 : 1)}K ★`
                            : "—"}
                        </span>
                      </div>
                    ))
                  : <div className="skel">{Array.from({ length: 6 }, (_, k) => <span key={k} />)}</div>}
                {openApps && !openApps.length && <p className="hint">Nothing came back for this one.</p>}
              </div>

              {openApps && shown < openApps.length && (
                <button className="btn more" onClick={() => setShown(nextTier)}>
                  Show {Math.min(nextTier, openApps.length) - shown} more
                </button>
              )}
              {openApps && openApps.length > 0 && shown >= openApps.length && (
                <p className="hint deep">That is as deep as the store ranks this keyword.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {picked.size > 0 && (
        <div className="selbar">
          <span className="cnt">{picked.size} selected</span>
          <button className="ghost" onClick={toggleAll}>
            {allOn ? "Deselect all" : `Select all ${visible.length}`}
          </button>
          <span className="div" />
          <button className="wipe" disabled={!!busy}
            onClick={() => removeKeywords(rows.filter((r) => picked.has(keyOf(r))))}>
            <Trash size={13} /> {busy?.startsWith("Removing") ? "Deleting…" : `Delete ${picked.size}`}
          </button>
          <button className="x" title="Clear selection (Esc)"
            onClick={() => { setPicked(new Set()); anchor.current = null; }}>
            <Close size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
