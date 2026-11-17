import { PanelCard } from "../../../_components/shared";
import { rationaleFacts } from "./data";

export function SignalRationale() {
  return (
    <PanelCard title="Signal Rationale" icon bordered={false} className="rounded-[8px]">
      <div className="flex flex-col gap-2 p-4">
        <p className="mb-1 text-[12px] text-pb-muted">Reversal attempt from a multi-month base with improving relative strength.</p>
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
