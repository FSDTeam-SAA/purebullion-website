import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { SignalDetail } from "@/services/signals.service";
import { fmtCompact, fmtNumber, fmtPct, fmtPrice } from "@/lib/format";

export function PriceStatsStrip({ d }: { d: SignalDetail }) {
  const q = d.quote;
  const price = q?.price ?? d.currentPrice;
  const change = q?.change ?? 0;
  const pct = q?.percentChange ?? 0;
  const up = change >= 0;
  const asOf = q?.timestamp
    ? new Date(q.timestamp * 1000).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
    : "";
  const stats = [
    { label: "Market Cap", value: d.keyInformation?.marketCap ? `$${fmtCompact(d.keyInformation.marketCap)}` : "—", tone: "" },
    { label: "P/E Ratio", value: fmtNumber(d.keyInformation?.trailingPE, 1), tone: "" },
    { label: "52W High", value: fmtPrice(q?.fiftyTwoWeekHigh ?? d.keyInformation?.fiftyTwoWeekHigh), tone: "text-pb-up" },
    { label: "52W Low", value: fmtPrice(q?.fiftyTwoWeekLow ?? d.keyInformation?.fiftyTwoWeekLow), tone: "text-pb-down" },
    { label: "Volume", value: fmtCompact(q?.volume), tone: "" },
    { label: "Avg Volume", value: fmtCompact(q?.avgVolume ?? d.keyInformation?.avgVolume3m), tone: "" },
  ];
  return (
    <div className="flex items-center justify-between gap-8 bg-pb-surface px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-4">
          <span className="text-[36px] font-semibold leading-[1.2] text-pb-text">{fmtPrice(price)}</span>
          <span className={`mb-1 flex items-center gap-1 text-[14px] ${up ? "text-pb-up" : "text-pb-down"}`}>
            {up ? "+" : "−"}{Math.abs(change).toFixed(2)} ({fmtPct(pct)}){" "}
            {up ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
          </span>
        </div>
        <span className="text-[14px] font-medium text-pb-muted">{asOf && `As of ${asOf}`}</span>
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
