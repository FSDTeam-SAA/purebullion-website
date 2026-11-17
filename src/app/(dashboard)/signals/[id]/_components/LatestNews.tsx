import Image from "next/image";
import { PanelCard } from "../../../_components/shared";
import { news } from "./data";

export function LatestNews() {
  return (
    <PanelCard title="latest News" icon action={{ label: "View all →", href: "/news-research" }} bordered={false} className="rounded-[8px]">
      <div className="flex flex-col gap-4 p-4">
        {news.map((n) => (
          <article key={n.title} className="flex items-center gap-4 rounded-[8px] bg-pb-surface">
            <Image src={`/images/signals-detail/${n.img}`} alt="" width={75} height={75} className="size-[75px] shrink-0 rounded-[8px] object-cover" unoptimized />
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="text-[16px] font-semibold leading-[1.2] text-pb-text">{n.title}</h3>
              <p className="text-[14px] font-medium text-pb-muted">
                {n.src} <span className="mx-1">•</span> {n.time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PanelCard>
  );
}
