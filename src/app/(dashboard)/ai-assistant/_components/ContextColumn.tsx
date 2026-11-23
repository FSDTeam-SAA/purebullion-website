import { conversationQuotes, marketContext, sourcesUsed } from "./data";

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-lg bg-pb-head ${className}`}>
      <h3 className="border-b border-[#293033] px-4 py-4 text-[24px] font-medium leading-[1.2] text-pb-text">{title}</h3>
      {children}
    </section>
  );
}

export function ContextColumn() {
  return (
    <aside className="pb-scroll flex w-full shrink-0 flex-col gap-6 lg:min-h-0 lg:w-[407px] lg:overflow-y-auto">
      <Card title="In This Conversation">
        <div className="flex flex-col gap-1 p-4">
          {conversationQuotes.map((q) => (
            <div key={q.symbol} className="flex h-16 items-start justify-between rounded-lg border border-pb-head bg-[#0c0f10] p-[13px]">
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-semibold leading-[1.2] text-pb-text">{q.symbol}</p>
                <p className="text-[12px] leading-[1.2] text-pb-muted">{q.name}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-[16px] font-bold leading-[1.2] text-pb-text">{q.price}</p>
                <p className={`text-[11px] ${q.up ? "text-[#27c58a]" : "text-[#d94f59]"}`}>{q.change}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Market Context">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4 p-4">
            {marketContext.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[18px] leading-normal">
                <span className="text-pb-muted">{r.label}</span>
                <span className="font-semibold text-pb-text">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card title="Sources used" className="flex-1">
        <div className="flex flex-col gap-4 p-4">
          {sourcesUsed.map((s) => (
            <div key={s.title}>
              <p className="text-[20px] font-medium leading-normal text-pb-text">{s.title}</p>
              <p className="text-[16px] leading-normal text-pb-muted">{s.meta}</p>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
