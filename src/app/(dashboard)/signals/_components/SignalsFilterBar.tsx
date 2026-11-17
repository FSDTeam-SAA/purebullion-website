"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CHIPS = ["All", "BUY", "SELL", "All types", "Stock", "ETF"];

export function SignalsFilterBar() {
  const [on, setOn] = useState<string[]>(["All", "All types"]);
  const toggle = (c: string) => setOn((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  return (
    <div className="flex h-[66px] items-center justify-between rounded-[8px] border border-pb-line bg-pb-card px-4">
      <div className="flex items-center gap-3">
        <span className="mr-2 text-[10px] tracking-[0.2em] text-pb-muted">FILTER</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggle(c)}
            className={cn(
              "h-[30px] rounded-[4px] border px-3 text-[13px] font-semibold",
              on.includes(c) ? "border-pb-gold-dark bg-[rgba(231,192,66,0.12)] text-pb-gold" : "border-pb-line bg-pb-surface text-pb-text"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <button type="button" className="flex h-[30px] items-center gap-2 rounded-[4px] border border-pb-line bg-pb-surface px-3 text-[12px] font-semibold text-pb-text">
        Last 30 days <ChevronDown className="size-3" />
      </button>
    </div>
  );
}
