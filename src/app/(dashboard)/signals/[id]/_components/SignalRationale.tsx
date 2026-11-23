import { PanelCard } from "../../../_components/shared";
import type { SignalDetail } from "@/services/signals.service";

export function SignalRationale({ d }: { d: SignalDetail }) {
  const c = d.conditionDetails ?? {};
  const rationaleFacts: [string, string][] = [
    ["Market condition at publication", c.marketConditionAtPublication ?? "—"],
    ["Momentum", c.momentum ?? "—"],
    ["Technical confirmation", c.technicalConfirmation ?? "—"],
    ["Relative strength", c.relativeStrength ?? "—"],
    ["Volatility regime", c.volatilityRegime ?? "—"],
    ["Liquidity", c.liquidity ?? "—"],
  ];
  return (
    <PanelCard title="Signal Rationale" icon bordered={false} className="rounded-[8px]">
      <div className="flex flex-col gap-2 p-4">
        <p className="mb-1 text-[12px] text-pb-muted">{d.rationaleTitle || d.signalRationale}</p>
        <div className="grid grid-cols-2 gap-2">
          {rationaleFacts.map(([l, v]) => (
            <div key={l} className="flex min-h-16 flex-col gap-1 rounded-[4px] bg-[#222B2E] p-4 pb-2 pt-2">
              <span className="text-[10px] text-pb-muted">{l}</span>
              <span className="text-[12px] font-semibold leading-[14px] text-pb-text">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}
