import { PanelCard } from "../../../_components/shared";
import { keyInfo } from "./data";

export function KeyInformation() {
  return (
    <PanelCard title="Key Information" icon bordered={false} className="rounded-[8px]">
      <dl className="flex flex-col gap-4 bg-pb-surface p-4 pb-6">
        {keyInfo.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="text-[20px] text-pb-muted">{k}</dt>
            <dd className="text-[20px] font-semibold text-pb-text">{v}</dd>
          </div>
        ))}
      </dl>
    </PanelCard>
  );
}
