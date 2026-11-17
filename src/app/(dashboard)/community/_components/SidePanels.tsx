import { ANNOUNCEMENTS, TRENDING } from "./data";

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-4">
    <h2 className="text-[24px] font-semibold leading-[1.2] text-white">{title}</h2>
    {children}
  </section>
);

const itemTitle = "text-[16px] font-semibold leading-[1.2] text-pb-text";
const itemMeta = "text-[12px] font-medium leading-[1.5] text-pb-muted";

export function SidePanels() {
  return (
    <div className="flex w-[453px] shrink-0 flex-col gap-4">
      <Card title="Announcements">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.title} className="flex flex-col gap-2">
            <p className={itemTitle}>{a.title}</p>
            <p className={itemMeta}>{a.date}</p>
          </div>
        ))}
      </Card>
      <Card title="Trending discussions">
        {TRENDING.map((t, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className={itemTitle}>{t.title}</p>
            <div className={`flex items-center gap-2 ${itemMeta}`}>
              <span>{t.tag}</span>
              <span className="flex items-center gap-2">
                <span className="size-[3px] rounded-full bg-pb-muted" />
                {t.comments}
              </span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
