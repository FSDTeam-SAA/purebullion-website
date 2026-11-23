import Image from "next/image";
import { PanelCard } from "../../../_components/shared";
import type { SignalDetail } from "@/services/signals.service";
import { timeAgo } from "@/lib/format";

export function LatestNews({ d }: { d: SignalDetail }) {
  const news = d.news ?? [];
  return (
    <PanelCard title="latest News" icon action={{ label: "View all →", href: "/news-research" }} bordered={false} className="rounded-[8px]">
      <div className="flex flex-col gap-4 p-4">
        {news.length === 0 && <p className="text-[14px] text-pb-muted">No recent news.</p>}
        {news.map((n) => (
          <article key={n.id} className="flex items-center gap-4 rounded-[8px] bg-pb-surface">
            {n.imageUrl ? (
              <Image src={n.imageUrl} alt="" width={75} height={75} className="size-[75px] shrink-0 rounded-[8px] object-cover" unoptimized />
            ) : (
              <div className="size-[75px] shrink-0 rounded-[8px] bg-[#222B2E]" />
            )}
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="text-[16px] font-semibold leading-[1.2] text-pb-text">{n.title}</h3>
              <p className="text-[14px] font-medium text-pb-muted">
                {n.source} <span className="mx-1">•</span> {timeAgo(n.publishedAt)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PanelCard>
  );
}
