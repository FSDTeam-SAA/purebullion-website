"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PbModal } from "../../../_components/shared";
import { cn } from "@/lib/utils";
import { useUniverseSearch, useWatchlistSuggestions } from "@/hooks/useWatchlist";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watched: Set<string>;
  adding?: string;
  onAdd: (symbol: string, companyName: string) => void;
};

type Row = { ticker: string; company: string; change: string; added: boolean };

export function AddTickerModal({ open, onOpenChange, watched, adding, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const suggestions = useWatchlistSuggestions(open);
  const search = useUniverseSearch(debounced);
  const searching = debounced.length > 0;

  const list: Row[] = searching
    ? (search.data ?? []).map((u) => ({ ticker: u.symbol, company: u.name, change: u.change, added: watched.has(u.symbol) }))
    : (suggestions.data ?? []).map((s) => ({
        ticker: s.symbol,
        company: s.name,
        change: s.change,
        added: s.isAdded || watched.has(s.symbol),
      }));
  const loading = searching ? search.isFetching : suggestions.isLoading;

  return (
    <PbModal
      open={open}
      onOpenChange={(o) => {
        if (!o) setQuery("");
        onOpenChange(o);
      }}
      title="Add to watchlist"
      className="max-w-[500px] rounded-[4px]"
      footer={
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="px-3 py-2 text-[14px] font-bold text-white hover:text-pb-gold"
        >
          Cancel
        </button>
      }
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-pb-muted" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the covered universe..."
          className="h-[44px] rounded-[4px] border-[#293033] bg-[#080b0c] pl-10 text-[14px] text-pb-text placeholder:text-pb-muted focus-visible:ring-pb-gold-dark"
        />
      </div>

      <p className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-wide text-pb-muted">
        {searching ? "Search results" : "Suggested from your scanner matches"}
      </p>
      <ul className="flex flex-col gap-[10px]">
        {list.map((s) => {
          const up = !s.change.startsWith("-");
          return (
            <li
              key={s.ticker}
              className="flex items-center justify-between rounded-[8px] border border-[#1b2227] bg-[#121719] px-4 py-3"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold leading-[1.2] text-white">{s.ticker}</span>
                <span className="text-[14px] leading-[1.2] text-pb-muted">{s.company}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn("text-[14px]", up ? "text-pb-up" : "text-pb-down")}>{s.change}</span>
                <button
                  type="button"
                  disabled={s.added || adding === s.ticker}
                  onClick={() => onAdd(s.ticker, s.company)}
                  className="h-[34px] rounded-[4px] border border-[#293033] bg-[#050606] px-4 text-[14px] font-bold text-white hover:border-pb-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {s.added ? "Added" : adding === s.ticker ? "Adding…" : "Add"}
                </button>
              </div>
            </li>
          );
        })}
        {loading && <li className="py-4 text-center text-[14px] text-pb-muted">Loading…</li>}
        {!loading && list.length === 0 && <li className="py-4 text-center text-[14px] text-pb-muted">No matches.</li>}
      </ul>
    </PbModal>
  );
}
