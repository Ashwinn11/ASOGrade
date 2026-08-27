"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Chevron } from "./icons";
import { STORES, POPULAR, ALL_STORES, flagOf, storeName } from "@/lib/types";

type Row = { kind: "head"; label: string } | { kind: "opt"; code: string; name: string };

const Globe = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 8h12M8 1.9c1.6 1.7 2.4 3.8 2.4 6.1S9.6 12.4 8 14.1C6.4 12.4 5.6 10.3 5.6 8S6.4 3.6 8 1.9Z"
      stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export default function StorePicker({ value, onChange, onDark = true }: {
  value: string; onChange: (code: string) => void;
  /** Whether the trigger sits on a dark surface (the workspace) or a light/
   *  coral one (the results panel header). The dropdown panel itself is
   *  always the light surface — only the closed trigger's colours change. */
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const isAll = value === ALL_STORES;

  const rows = useMemo<Row[]>(() => {
    const needle = q.trim().toLowerCase();
    if (needle) {
      const hits: Row[] = STORES
        .filter(([c, n]) => n.toLowerCase().includes(needle) || c.startsWith(needle))
        .map(([code, name]): Row => ({ kind: "opt", code, name }));
      if ("all stores".includes(needle)) hits.unshift({ kind: "opt", code: ALL_STORES, name: "All stores" });
      return hits;
    }
    const pop = STORES.filter(([c]) => POPULAR.includes(c))
      .sort((a, b) => POPULAR.indexOf(a[0]) - POPULAR.indexOf(b[0]));
    const rest = STORES.filter(([c]) => !POPULAR.includes(c));
    return [
      { kind: "opt", code: ALL_STORES, name: "All stores" },
      { kind: "head", label: "Popular" },
      ...pop.map(([code, name]): Row => ({ kind: "opt", code, name })),
      { kind: "head", label: `All ${STORES.length} stores` },
      ...rest.map(([code, name]): Row => ({ kind: "opt", code, name })),
    ];
  }, [q]);

  const options = rows.filter((r): r is Extract<Row, { kind: "opt" }> => r.kind === "opt");

  useEffect(() => { setCursor(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", away);
    return () => window.removeEventListener("mousedown", away);
  }, [open]);

  // keep the highlighted row on screen while arrowing through 180 of them
  useEffect(() => {
    if (!open) return;
    scroller.current?.querySelector('[data-cursor="1"]')?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  const pick = (code: string) => { onChange(code); setOpen(false); setQ(""); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); setQ(""); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(options.length - 1, c + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); const o = options[cursor]; if (o) pick(o.code); }
  };

  let i = -1;

  return (
    <div className="relative min-w-0 shrink-0" ref={wrap}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex min-w-0 max-w-[11rem] cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-colors duration-150 ${
          onDark
            ? "bg-white/8 text-dark-ink hover:bg-white/12"
            : "bg-white text-accent-2 hover:bg-white/85"
        }`}
      >
        <span className="shrink-0">{isAll ? <Globe /> : flagOf(value)}</span>
        <span className="min-w-0 flex-1 truncate text-left text-sm">{storeName(value)}</span>
        <span className="shrink-0 opacity-60">
          <Chevron size={9} />
        </span>
      </button>

      {open && (
        <div
          onKeyDown={onKeyDown}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-30 w-[min(18rem,calc(100vw-2.5rem))] animate-drop rounded-md border border-line bg-surface p-1.5 shadow-3"
        >
          <label className="flex min-w-0 items-center gap-2 border-b border-line px-2.5 pb-2">
            <Search size={14} />
            <input
              autoFocus
              value={q}
              placeholder="Search countries…"
              onChange={(e) => setQ(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            />
          </label>

          <div className="mt-1 max-h-72 min-w-0 overflow-y-auto" ref={scroller}>
            {rows.map((r, k) => {
              if (r.kind === "head") {
                return (
                  <div key={`h${k}`} className="px-2.5 pb-1 pt-2.5 text-2xs font-bold uppercase tracking-[0.06em] text-faint">
                    {r.label}
                  </div>
                );
              }
              i += 1;
              const at = i;
              const selected = r.code === value;
              return (
                <button
                  type="button"
                  key={r.code}
                  data-cursor={at === cursor ? 1 : 0}
                  onMouseEnter={() => setCursor(at)}
                  onClick={() => pick(r.code)}
                  className={`flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-left ${
                    selected ? "bg-tint text-accent-2" : at === cursor ? "bg-hover text-ink" : "text-ink-2"
                  }`}
                >
                  <span className="shrink-0">{r.code === ALL_STORES ? <Globe /> : flagOf(r.code)}</span>
                  <span className="min-w-0 flex-1 truncate text-sm">{r.name}</span>
                  <span className="shrink-0 font-mono text-2xs text-faint">
                    {r.code === ALL_STORES ? `${STORES.length}` : r.code.toUpperCase()}
                  </span>
                </button>
              );
            })}
            {!options.length && (
              <p className="px-3 py-6 text-center text-sm text-faint">No country matches “{q}”.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
