"use client";

import Image from "next/image";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { timeAgo } from "@/lib/format";
import { useMarketNews } from "@/hooks/useMarketData";

export function MarketNews() {
  const { data, isLoading, isError, refetch } = useMarketNews(3);
  const news = (data ?? []).slice(0, 3);
  return (
    <section className="flex min-w-0 flex-col gap-5 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">Market News</h2>
      {isLoading && <PanelLoading rows={3} />}
      {isError && <PanelError onRetry={() => refetch()} />}
      {!isLoading && !isError && news.length === 0 && <PanelEmpty />}
      {news.map((n) => (
        <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer">
        <article className="flex items-center gap-6 rounded-[8px] bg-[#121719]">
          <Image src={n.imageUrl || "/images/market-data/news-1.png"} alt="" width={141} height={106} unoptimized className="h-[106px] w-[141px] shrink-0 rounded-[8px] object-cover" />
          <div className="flex min-w-0 flex-col gap-4">
            <p className="text-[18px] font-semibold leading-[1.2] text-pb-text">{n.title}</p>
            <p className="flex items-center gap-2 text-[14px] font-medium text-pb-muted">
              {n.source} <span aria-hidden>•</span> {timeAgo(n.publishedAt)}
            </p>
          </div>
        </article>
        </a>
      ))}
    </section>
  );
}
