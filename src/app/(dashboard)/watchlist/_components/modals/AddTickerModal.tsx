"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PbModal } from "../../../_components/shared";
import { cn } from "@/lib/utils";
import type { Suggestion } from "../data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: Suggestion[];
  onAdd: (s: Suggestion) => void;
};

export function AddTickerModal({ open, onOpenChange, suggestions, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = q
    ? suggestions.filter((s) => s.ticker.toLowerCase().includes(q) || s.company.toLowerCase().includes(q))
    : suggestions;

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
        Suggested from your scanner matches
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
                  onClick={() => onAdd(s)}
                  className="h-[34px] rounded-[4px] border border-[#293033] bg-[#050606] px-4 text-[14px] font-bold text-white hover:border-pb-gold-dark"
                >
                  Add
                </button>
              </div>
            </li>
          );
        })}
        {list.length === 0 && <li className="py-4 text-center text-[14px] text-pb-muted">No matches.</li>}
      </ul>
    </PbModal>
  );
}
