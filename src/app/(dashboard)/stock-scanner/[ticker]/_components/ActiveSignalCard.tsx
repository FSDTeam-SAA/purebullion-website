import { SideTag } from "../../../_components/shared";
import { CardHeader } from "./CardHeader";
import { ACTIVE_SIGNAL as S } from "./data";

export function ActiveSignalCard() {
  return (
    <section className="overflow-hidden rounded-[8px] border border-[#171d1f] bg-[#121719]">
      <CardHeader title="Active signal" action={{ label: "Full detail →", href: "/signals" }} />
      <div className="p-4">
        <div className="overflow-hidden rounded-[12px] border border-[#293033] bg-[#171d1f]">
          <div className="flex items-center gap-3 p-4">
            <SideTag side={S.side} className="rounded-[4px] px-2 py-1 font-medium" />
            <div className="flex flex-1 flex-col gap-1 leading-[1.5]">
              <p className="text-[18px] font-bold text-pb-text">{S.ticker}</p>
              <p className="text-[12px] font-medium text-pb-muted">{S.company}</p>
            </div>
            <div className="flex flex-col items-end gap-[5px]">
              <span className="rounded-[4px] border border-[#d7a43a] bg-[rgba(255,245,202,0.1)] px-2 py-1 text-[12px] font-medium text-[#c9b83f]">
                OPEN
              </span>
              <span className="text-[12px] leading-[1.5] text-pb-muted">{S.id}</span>
            </div>
          </div>

          <div className="flex border-y border-[#293033] font-medium leading-[1.2]">
            {[
              { label: "ENTRY", value: S.entry, color: "text-pb-text" },
              { label: "TARGET", value: S.target, color: "text-pb-up" },
              { label: "STOP LOSS", value: S.stop, color: "text-[#d94f59]" },
            ].map((m) => (
              <div key={m.label} className="flex flex-1 flex-col gap-[10px] p-3">
                <p className="text-[14px] text-pb-muted">{m.label}</p>
                <p className={`text-[24px] ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[10px] p-4">
            <div className="flex items-start justify-between font-semibold">
              <span className="text-[12px] leading-[1.5] text-pb-muted">Progress to target</span>
              <span className="text-[16px] leading-[1.2] text-pb-up">{S.progress}</span>
            </div>
            <div className="overflow-hidden rounded-full bg-[#171d1f]">
              <div className="h-[5px] w-[58px] rounded-full bg-pb-up" />
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {S.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-[5px]">
                  <p className="text-[12px] font-medium leading-[1.5] text-pb-muted">{f.label}</p>
                  <p className="text-[14px] font-bold leading-[1.2] text-pb-text">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[6px] border-t border-[#171d1f] pt-4 text-[12px] leading-[1.5]">
              <p className="text-[#58676e]">SIGNAL RATIONALE</p>
              <p className="font-medium text-[#8d999d]">{S.rationale}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#293033] p-4">
            <a href="/signals" className="gold-gradient-text text-[12px] font-bold leading-[1.2]">
              Open full signal detail
            </a>
            <div className="flex gap-2">
              {["Analysis", "Ask AI"].map((b) => (
                <button
                  key={b}
                  type="button"
                  className="rounded-[4px] border border-[#171d1f] bg-[#293033] px-4 py-2 text-[12px] font-semibold leading-[1.2] text-pb-text hover:bg-[#343d41]"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
