import { ArrowUpRight } from "lucide-react";
import { stats } from "./data";

export function PriceStatsStrip() {
  return (
    <div className="flex items-center justify-between gap-8 bg-pb-surface px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-4">
          <span className="text-[36px] font-semibold leading-[1.2] text-pb-text">$225.33</span>
          <span className="mb-1 flex items-center gap-1 text-[14px] text-pb-up">
            +4.76 (+2.16%) <ArrowUpRight className="size-4" />
          </span>
        </div>
        <span className="text-[14px] font-medium text-pb-muted">As of Nov 10, 2025, 09:42 AM ET</span>
      </div>
      <div className="grid w-full max-w-[1110px] grid-cols-6 gap-6 px-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span className="text-[14px] text-pb-muted">{s.label}</span>
            <span className={`text-[16px] font-semibold ${s.tone || "text-pb-text"}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
