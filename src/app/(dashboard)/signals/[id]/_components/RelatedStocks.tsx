import Image from "next/image";
import { PanelCard } from "../../../_components/shared";
import type { SignalDetail } from "@/services/signals.service";
import { fmtPct, fmtPrice } from "@/lib/format";

const LOGOS = new Set(["PLTR", "NVDA", "TSLA", "AMD", "AVGO"]);

export function RelatedStocks({ d }: { d: SignalDetail }) {
  const related = d.relatedStocks ?? [];
  return (
    <PanelCard title="Related Stocks" icon action={{ label: "View all →", href: "/stock-scanner" }} bordered={false} className="rounded-[8px]">
      <ul className="bg-pb-surface py-1">
        {related.map((r) => (
          <li key={r.symbol} className="grid h-[62px] grid-cols-3 items-center px-4">
            <div className="flex items-center gap-4">
              {LOGOS.has(r.symbol) ? (
                <Image src={`/images/signals-detail/${r.symbol.toLowerCase()}.png`} alt="" width={36} height={36} className="rounded-full" />
              ) : (
                <span className="flex size-9 items-center justify-center rounded-full bg-[#222B2E] text-[12px] text-white">{r.symbol.slice(0, 2)}</span>
              )}
              <span className="text-[16px] text-white">{r.symbol}</span>
            </div>
            <span className="text-center text-[16px] text-pb-text">{fmtPrice(r.price)}</span>
            <span className={`text-center text-[16px] ${r.percentChange >= 0 ? "text-pb-up" : "text-pb-down"}`}>{fmtPct(r.percentChange)}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}
