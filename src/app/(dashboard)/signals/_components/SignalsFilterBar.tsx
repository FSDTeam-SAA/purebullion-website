"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_OPTIONS, SIDE_OPTIONS, useSignalsFilters } from "./SignalsFilterContext";

export function SignalsFilterBar() {
  const { side, setSide, asset, setAsset } = useSignalsFilters();
  const chips = [
    ...SIDE_OPTIONS.map((o) => ({ label: o.label, on: side === o.value, click: () => setSide(o.value) })),
    ...ASSET_OPTIONS.map((o) => ({ label: o.label, on: asset === o.value, click: () => setAsset(o.value) })),
  ];
  return (
    <div className="flex h-[66px] items-center justify-between rounded-[8px] border border-pb-line bg-pb-card px-4">
      <div className="flex items-center gap-3">
        <span className="mr-2 text-[10px] tracking-[0.2em] text-pb-muted">FILTER</span>
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={c.click}
            className={cn(
              "h-[30px] rounded-[4px] border px-3 text-[13px] font-semibold",
              c.on ? "border-pb-gold-dark bg-[rgba(231,192,66,0.12)] text-pb-gold" : "border-pb-line bg-pb-surface text-pb-text"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <button type="button" className="flex h-[30px] items-center gap-2 rounded-[4px] border border-pb-line bg-pb-surface px-3 text-[12px] font-semibold text-pb-text">
        Last 30 days <ChevronDown className="size-3" />
      </button>
    </div>
  );
}
