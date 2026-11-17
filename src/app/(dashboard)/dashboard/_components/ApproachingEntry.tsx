import { PanelCard, SideTag } from "../../_components/shared";
import { CountBadge } from "./CountBadge";
import { approaching } from "./data";

export function ApproachingEntry() {
  return (
    <PanelCard
      title="Approaching entry"
      icon
      badge={<CountBadge>3</CountBadge>}
      className="bg-[linear-gradient(-90deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.56)_38%,rgba(0,0,0,0.9)_100%)]"
    >
      {approaching.map((r, i) => (
        <div key={i} className="grid grid-cols-3 items-center border-b border-pb-head px-3 py-1">
          <div className="flex flex-col gap-1 p-2">
            <div className="flex items-center gap-1">
              <SideTag side={r.side} className="rounded-[4px] px-2 py-1 leading-none" />
              <span className="text-[14px] font-medium text-pb-muted">{r.ticker}</span>
            </div>
            <span className="truncate text-[14px] text-pb-muted">{r.note}</span>
          </div>
          <div className="flex flex-col gap-1 p-2 text-center font-medium text-pb-muted">
            <span className="text-[12px] leading-normal">Trigger</span>
            <span className="text-[16px] leading-[1.2]">{r.trigger}</span>
          </div>
          <div className="flex flex-col gap-1 p-2 text-right">
            <span className="text-[12px] leading-normal text-pb-muted">Distance</span>
            <span className="gold-gradient-text text-[16px] font-medium leading-[1.2]">{r.distance}</span>
          </div>
        </div>
      ))}
    </PanelCard>
  );
}
