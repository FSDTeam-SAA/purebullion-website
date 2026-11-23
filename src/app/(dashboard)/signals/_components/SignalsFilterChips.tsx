"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSET_OPTIONS, SIDE_OPTIONS, useSignalsFilters } from "./SignalsFilterContext";

const LABEL: Record<string, string> = { all: "ALL", "All types": "ALL TYPES", ETF: "EFT" };
const up = (l: string) => LABEL[l] ?? l.toUpperCase();

export function SignalsFilterChips() {
  const { side, setSide, asset, setAsset } = useSignalsFilters();
  const chips = [
    ...SIDE_OPTIONS.map((o) => ({ label: o.label === "All" ? "ALL" : o.label, on: side === o.value, click: () => setSide(o.value) })),
    ...ASSET_OPTIONS.map((o) => ({ label: up(o.label), on: asset === o.value, click: () => setAsset(o.value) })),
  ];
  return (
    <div className="flex h-[60px] items-center justify-between bg-pb-surface px-6">
      <div className="flex items-center gap-2">
        <span className="mr-1 text-[14px] text-pb-muted">Filters :</span>
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={c.click}
            className={cn(
              "h-6 rounded-[2px] border px-2 text-[12px] text-pb-text",
              c.on ? "border-pb-gold-dark bg-gold-gradient-soft" : "border-[#64748b] bg-[#3a4246]"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <button type="button" className="flex h-7 w-[112px] items-center justify-between rounded-[2px] bg-white px-2 text-[12px] text-black">
        Last 30 days <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
