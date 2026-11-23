import Image from "next/image";
import type { NewsArticle } from "@/services/news.service";

export function ArticleRow({ a }: { a: NewsArticle }) {
  return (
    <article className="flex flex-col items-stretch gap-6 rounded-lg bg-pb-surface px-4 py-3 md:flex-row md:items-center">
      <div className="relative h-[184px] w-full shrink-0 overflow-hidden rounded-lg bg-[#d9d9d9] md:w-[245px]">
        {a.imageUrl && <Image src={a.imageUrl} alt={a.title} fill sizes="245px" unoptimized className="object-cover" />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
        <h3 className="text-[18px] font-semibold leading-[1.2] text-pb-text">{a.title}</h3>
        <div className="h-[72px] overflow-hidden text-[14px] font-medium leading-[1.5] text-pb-muted">
          <p>{a.summary}</p>
        </div>
        <p className="flex items-center gap-2 text-[14px] font-medium leading-[1.5] text-pb-text">
          {a.source}
          <span aria-hidden className="size-[3px] rounded-full bg-pb-text" />
          {a.timeAgo}
        </p>
        <span className="w-fit rounded-md border border-[#2a3038] bg-[#1a1e23] px-3 py-2 text-[14px] font-medium leading-[1.2] text-[#cacaca]">{a.formattedCategory}</span>
      </div>
    </article>
  );
}
