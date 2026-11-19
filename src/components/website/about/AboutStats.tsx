import Image from "next/image";
import PageContainer from "../shared/PageContainer";
import SectionBadge from "../shared/SectionBadge";
import { aboutIntro, aboutStats } from "@/data/website/about";

export default function AboutStats() {
  return (
    <PageContainer as="section" className="flex flex-col gap-10 lg:gap-[60px]">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
        <SectionBadge>About Pure Bullion</SectionBadge>
        <p className="text-xl font-semibold leading-[1.2] text-pb-muted sm:text-[28px] lg:w-[984px] lg:text-[36px]">
          {aboutIntro}
        </p>
      </div>
      <div className="grid gap-6 lg:h-[321px] lg:grid-cols-3">
        {aboutStats.map((s) => (
          <div
            key={s.label}
            className="flex min-h-[260px] flex-col justify-between gap-6 rounded-md bg-[rgba(192,146,72,0.08)] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-5xl font-semibold leading-[1.2] text-pb-text lg:text-[60px]">
                  {s.value}
                </p>
                <div className="flex items-center gap-1">
                  <Image src="/icons/website/about/dot.svg" alt="" width={6} height={6} />
                  <p className="text-base font-medium leading-[1.2] text-pb-text">{s.label}</p>
                </div>
              </div>
              <div className="relative size-24 shrink-0 rounded shadow-[0_0_4px_rgba(255,233,70,0.15)] sm:size-[120px]">
                <Image src={s.image} alt="" fill sizes="120px" className="rounded object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Image
                src="/icons/website/about/line.svg"
                alt=""
                width={400}
                height={1}
                className="h-px w-full"
                unoptimized
              />
              <p className="text-base leading-[1.5] text-pb-muted">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
