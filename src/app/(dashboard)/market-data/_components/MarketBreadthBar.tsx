import { marketBreadth } from "./data";

const items = [
  { label: "Advancing", value: marketBreadth.advancing, dot: "bg-pb-up" },
  { label: "Unchanged", value: marketBreadth.unchanged, dot: "bg-[#6b7479]" },
  { label: "Declining", value: marketBreadth.declining, dot: "bg-pb-down" },
];

export function MarketBreadthBar() {
  return (
    <section className="flex flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[14px] font-medium text-pb-text">Market Breadth</h2>
      <div className="flex h-2 w-full overflow-hidden rounded-full">
        <div className="bg-pb-up" style={{ width: "39%" }} />
        <div className="bg-[#6b7479]" style={{ width: "23%" }} />
        <div className="bg-pb-down" style={{ width: "38%" }} />
      </div>
      <div className="flex items-start justify-between">
        {items.map((i) => (
          <div key={i.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[12px] text-pb-muted">
              <span className={`size-2 rounded-full ${i.dot}`} />
              {i.label}
            </div>
            <span className="pl-4 text-[12px] font-semibold text-pb-text">{i.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
