import { LineChart } from "lucide-react";
import { featuredSignal as s } from "./data";

export function FeaturedSignal() {
  return (
    <div className="border-b border-pb-head bg-[#293033] p-6">
      <div className="flex items-start gap-[14px]">
        <div className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] border border-pb-gold-dark bg-[#3a3218]">
          <LineChart className="size-[17px] text-pb-gold" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="rounded-[5px] border border-pb-gold-dark bg-[#3a3218] px-[9px] py-1 text-[11px] font-bold tracking-[0.88px]">
              <span className="gold-gradient-text">{s.label}</span>
            </span>
            <span className="text-[12px] text-[#697370]">{s.time}</span>
          </div>
          <p className="text-[18px] font-bold text-[#e7e9e8]">{s.company}</p>
          <div className="flex h-[74px] overflow-hidden rounded-[10px] border border-[#697370]">
            {s.metrics.map((m, i) => (
              <div key={m.label} className={`flex flex-1 flex-col gap-[9px] pl-[14px] pt-[14px] ${i > 0 ? "border-l border-[#697370]" : ""}`}>
                <p className="text-[11px] font-bold tracking-[1.54px] text-pb-muted">{m.label}</p>
                <p className={`text-[18px] font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {s.chips.map((c, i) => (
              <span
                key={c}
                className={
                  i === 0
                    ? "rounded border border-pb-up bg-[#293033] px-2 py-1 text-[12px] font-semibold text-[#2ec18d]"
                    : "rounded border border-[#697370] px-2 py-1 text-[12px] font-semibold text-[#e7e9e8]"
                }
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
