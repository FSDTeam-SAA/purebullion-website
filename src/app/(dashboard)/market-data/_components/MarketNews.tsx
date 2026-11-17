import Image from "next/image";
import { news } from "./data";

export function MarketNews() {
  return (
    <section className="flex min-w-0 flex-col gap-5 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">Market News</h2>
      {news.map((n) => (
        <article key={n.title} className="flex items-center gap-6 rounded-[8px] bg-[#121719]">
          <Image src={n.image} alt="" width={141} height={106} className="h-[106px] w-[141px] shrink-0 rounded-[8px] object-cover" />
          <div className="flex min-w-0 flex-col gap-4">
            <p className="text-[18px] font-semibold leading-[1.2] text-pb-text">{n.title}</p>
            <p className="flex items-center gap-2 text-[14px] font-medium text-pb-muted">
              {n.source} <span aria-hidden>•</span> {n.time}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
