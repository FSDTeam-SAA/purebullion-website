"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CHIPS = ["ALL", "BUY", "SELL", "ALL TYPES", "STOCK", "EFT"];

export function SignalsFilterChips() {
  const [on, setOn] = useState<string[]>(["ALL", "ALL TYPES"]);
  const toggle = (c: string) => setOn((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  return (
    <div className="flex h-[60px] items-center justify-between bg-pb-surface px-6">
      <div className="flex items-center gap-2">
        <span className="mr-1 text-[14px] text-pb-muted">Filters :</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggle(c)}
            className={cn(
              "h-6 rounded-[2px] border px-2 text-[12px] text-pb-text",
              on.includes(c) ? "border-pb-gold-dark bg-gold-gradient-soft" : "border-[#64748b] bg-[#3a4246]"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <button type="button" className="flex h-7 w-[112px] items-center justify-between rounded-[2px] bg-white px-2 text-[12px] text-black">
        Last 30 days <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
