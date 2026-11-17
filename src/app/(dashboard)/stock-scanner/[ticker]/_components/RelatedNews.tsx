import Image from "next/image";
import { CardHeader } from "./CardHeader";
import { NEWS } from "./data";

export function RelatedNews() {
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Related news" action={{ label: "View all →", href: "/news-research" }} />
      <ul className="flex flex-col gap-4 p-4">
        {NEWS.map((n) => (
          <li key={n.title} className="flex items-stretch gap-4">
            <div className="relative w-[75px] shrink-0 self-stretch overflow-hidden rounded-[8px] bg-[#d9d9d9]">
              <Image src={n.image} alt="" fill sizes="75px" className="object-cover" />
              <div className="invisible h-[75px]" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <p className="text-[16px] font-semibold leading-[1.2] text-pb-text">{n.title}</p>
              <p className="flex items-center gap-2 text-[14px] font-medium leading-[1.5] text-pb-muted">
                {n.source}
                <span aria-hidden>•</span>
                {n.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
