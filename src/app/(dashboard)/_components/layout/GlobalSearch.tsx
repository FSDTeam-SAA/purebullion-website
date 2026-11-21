"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useUniverseSearch } from "@/hooks/useWatchlist";
import { fmtPrice } from "@/lib/format";

/** Header search: type a ticker/company, pick a result (or press Enter) to open its scanner page. ⌘K / Ctrl+K focuses it. */
export function GlobalSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value.trim()), 250);
    return () => clearTimeout(t);
  }, [value]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const { data: results = [], isFetching } = useUniverseSearch(debounced);

  function go(symbol: string) {
    const s = symbol.trim().toUpperCase();
    if (!s) return;
    setOpen(false);
    setValue("");
    setDebounced("");
    router.push(`/stock-scanner/${encodeURIComponent(s)}`);
  }

  return (
    <div ref={wrapRef} className="relative hidden w-[261px] lg:block">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(results[0]?.symbol ?? value);
        }}
        className="flex items-center gap-2 rounded border border-pb-gold-dark bg-gold-gradient-soft px-[13px] py-[9px] focus-within:border-pb-gold"
      >
        <Search className="size-5 shrink-0 text-pb-text" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search..."
          aria-label="Search tickers"
          className="min-w-0 flex-1 bg-transparent text-[12px] text-pb-text placeholder:text-pb-text focus:outline-none"
        />
        <kbd className="rounded border border-pb-gold-dark bg-[rgba(231,192,66,0.34)] px-[9px] py-[5px] text-[12px] text-white">⌘K</kbd>
      </form>

      {open && value.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[320px] overflow-y-auto rounded border border-pb-gold-dark bg-pb-sidebar shadow-xl">
          {isFetching && !results.length ? (
            <p className="px-3 py-3 text-[12px] text-pb-muted">Searching…</p>
          ) : results.length ? (
            results.slice(0, 8).map((r) => (
              <button
                key={r.symbol}
                type="button"
                onClick={() => go(r.symbol)}
                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-white/5"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="text-[13px] font-semibold text-pb-text">{r.symbol}</span>
                  <span className="truncate text-[11px] text-pb-muted">{r.name}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end">
                  <span className="text-[12px] text-pb-text">{fmtPrice(r.price)}</span>
                  <span className={`text-[11px] ${r.pct >= 0 ? "text-pb-up" : "text-pb-down"}`}>{r.change}</span>
                </span>
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={() => go(value)}
              className="w-full px-3 py-3 text-left text-[12px] text-pb-muted hover:bg-white/5"
            >
              No match in covered universe — open <span className="font-semibold text-pb-text">{value.trim().toUpperCase()}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
