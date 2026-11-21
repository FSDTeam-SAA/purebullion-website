import Image from "next/image";
import { CardHeader } from "./CardHeader";
import type { ScannerDetail } from "@/services/stockScanner.service";
import { timeAgo } from "@/lib/format";

export function RelatedNews({ d }: { d: ScannerDetail }) {
  const NEWS = d.relatedNews ?? [];
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Related news" action={{ label: "View all →", href: "/news-research" }} />
      <ul className="flex flex-col gap-4 p-4">
        {NEWS.length === 0 && <li className="text-[14px] text-pb-muted">No recent news.</li>}
        {NEWS.map((n) => (
          <li key={n.id} className="flex items-stretch gap-4">
            <div className="relative w-[75px] shrink-0 self-stretch overflow-hidden rounded-[8px] bg-[#d9d9d9]">
              {n.imageUrl && <Image src={n.imageUrl} alt="" fill sizes="75px" className="object-cover" unoptimized />}
              <div className="invisible h-[75px]" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <p className="text-[16px] font-semibold leading-[1.2] text-pb-text">{n.title}</p>
              <p className="flex items-center gap-2 text-[14px] font-medium leading-[1.5] text-pb-muted">
                {n.source}
                <span aria-hidden>•</span>
                {timeAgo(n.publishedAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
