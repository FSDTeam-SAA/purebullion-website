"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sectors } from "./data";

const periods = ["1d%", "1w%", "1m%"];

export function SectorBreadthCard() {
  const [period, setPeriod] = useState("1d%");
  const scale = period === "1d%" ? 1 : period === "1w%" ? 0.7 : 0.45;
  return (
    <section className="flex flex-1 flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-medium text-pb-text">Market Breadth</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-6 w-auto gap-1 rounded border-white/10 bg-[#121719] px-2 text-[11px] text-pb-text">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#121719] text-pb-text">
            {periods.map((p) => (
              <SelectItem key={p} value={p} className="text-[12px]">
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ul className="flex flex-1 flex-col justify-between">
        {sectors.map((s) => (
          <li key={s.name} className="flex items-center gap-4 text-[12px] text-pb-text">
            <span className="w-[156px] shrink-0 truncate">{s.name}</span>
            <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#1B2227]">
              <div className="h-full rounded-full bg-[#00D68F]" style={{ width: `${s.pct * scale}%` }} />
            </div>
            <span className="w-[44px] shrink-0 text-right text-[11px] text-pb-up">{s.change}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
