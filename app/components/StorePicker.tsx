"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "./icons";
import { STORES, POPULAR, ALL_STORES, flagOf, storeName } from "@/lib/types";

type Row = { kind: "head"; label: string } | { kind: "opt"; code: string; name: string };

const Globe = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 8h12M8 1.9c1.6 1.7 2.4 3.8 2.4 6.1S9.6 12.4 8 14.1C6.4 12.4 5.6 10.3 5.6 8S6.4 3.6 8 1.9Z"
      stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export default function StorePicker({ value, onChange }: {
  value: string; onChange: (code: string) => void;
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
    <div className="picker" ref={wrap}>
      <button className="trigger" data-open={open ? 1 : 0} onClick={() => setOpen((o) => !o)}>
        <span className="fl">{isAll ? <Globe /> : flagOf(value)}</span>
        <span className="nm">{storeName(value)}</span>
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1 4.5 4.5 8 1" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="pop" onKeyDown={onKeyDown}>
          <div className="q">
            <Search size={14} />
            <input autoFocus value={q} placeholder="Search countries…"
              onChange={(e) => setQ(e.target.value)} />
          </div>

          <div className="scroll" ref={scroller}>
            {rows.map((r, k) => {
              if (r.kind === "head") return <div className="grp" key={`h${k}`}>{r.label}</div>;
              i += 1;
              const at = i;
              return (
                <button className="opt" key={r.code}
                  data-on={r.code === value ? 1 : 0} data-cursor={at === cursor ? 1 : 0}
                  onMouseEnter={() => setCursor(at)} onClick={() => pick(r.code)}>
                  <span className="fl">{r.code === ALL_STORES ? <Globe /> : flagOf(r.code)}</span>
                  <span className="nm">{r.name}</span>
                  <span className="cc">{r.code === ALL_STORES ? `${STORES.length}` : r.code.toUpperCase()}</span>
                </button>
              );
            })}
            {!options.length && <p className="none">No country matches “{q}”.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
