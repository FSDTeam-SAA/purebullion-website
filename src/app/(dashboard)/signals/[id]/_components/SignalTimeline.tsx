import { PanelCard } from "../../../_components/shared";
import { timeline } from "./data";

export function SignalTimeline() {
  return (
    <PanelCard title="Signal Timeline" icon bordered={false} className="rounded-[8px]">
      <ol className="flex flex-col gap-3 bg-pb-surface/40 p-4 pb-6">
        {timeline.map(([title, desc], i) => (
          <li key={title} className="relative flex gap-2">
            <span className="relative z-10 mt-0 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-pb-gold bg-pb-base">
              <span className="size-2 rounded-full bg-pb-gold" />
            </span>
            {i < timeline.length - 1 && <span className="absolute left-[10px] top-5 h-[43px] w-px bg-pb-gold-dark" />}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-pb-text">{title}</span>
                <span className="text-[12px] text-pb-muted">Aug 14, 2026</span>
              </div>
              <p className="mt-2 text-[12px] text-pb-muted">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </PanelCard>
  );
}
