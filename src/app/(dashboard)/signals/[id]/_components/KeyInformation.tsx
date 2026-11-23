import { PanelCard } from "../../../_components/shared";
import type { SignalDetail } from "@/services/signals.service";
import { fmtCompact, fmtNumber, fmtPrice } from "@/lib/format";

export function KeyInformation({ d }: { d: SignalDetail }) {
  const k = d.keyInformation;
  const keyInfo: [string, string][] = [
    ["Sector", d.profile?.sector || "—"],
    ["Industry", d.profile?.industry || "—"],
    ["Market Cap", k?.marketCap ? `$${fmtCompact(k.marketCap)}` : "—"],
    ["Shares Outstanding", fmtCompact(k?.sharesOutstanding)],
    ["EPS (TTM)", fmtPrice(k?.epsBasicTTM)],
    ["P/E Ratio", fmtNumber(k?.trailingPE, 1)],
    ["Dividend Yield", k?.dividendYield || "—"],
    ["Ex-Divined Date", "—"],
  ];
  return (
    <PanelCard title="Key Information" icon bordered={false} className="rounded-[8px]">
      <dl className="flex flex-col gap-4 bg-pb-surface p-4 pb-6">
        {keyInfo.map(([label, v]) => (
          <div key={label} className="flex items-center justify-between">
            <dt className="text-[20px] text-pb-muted">{label}</dt>
            <dd className="text-[20px] font-semibold text-pb-text">{v}</dd>
          </div>
        ))}
      </dl>
    </PanelCard>
  );
}
