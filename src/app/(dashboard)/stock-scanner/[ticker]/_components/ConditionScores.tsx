import { CardHeader } from "./CardHeader";
import { SCORES } from "./data";

export function ConditionScores() {
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader
        title="Condition scores"
        extra={
          <span className="rounded-[4px] border border-[#c9b83f] px-2 py-1 text-[16px] leading-[1.2] text-[#c9b83f]">
            Composite 78 / 100
          </span>
        }
      />
      <div className="grid gap-2 p-4 md:grid-cols-3">
        {SCORES.map((s) => (
          <div key={s.label} className="flex flex-col gap-[5px] rounded-[8px] bg-[#293033] px-4 py-2">
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-start justify-between text-[12px] font-semibold">
                <span className="leading-[1.5] text-pb-muted">{s.label}</span>
                <span className="gold-gradient-text text-[16px] leading-[1.2]">{s.score}</span>
              </div>
              <div className="overflow-hidden rounded-full bg-[#171d1f]">
                <div className="h-[5px] w-[58px] rounded-full bg-gold-gradient" />
              </div>
            </div>
            <p className="text-[12px] leading-[1.5] text-pb-muted">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
