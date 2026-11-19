import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { ABOUT_STATS } from "@/data/website/home";
import TextLink from "./TextLink";

export default function AboutIntro() {
  return (
    <PageContainer as="section" className="flex flex-col gap-10 lg:gap-[60px]">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:justify-between">
        <SectionBadge>About Pure Bullion</SectionBadge>
        <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-[984px]">
          <p className="text-2xl font-semibold leading-[1.2] text-pb-muted sm:text-[30px] lg:text-[36px]">
            Pure Bullion brings market intelligence, AI-powered research, stock screening, financial
            news, personalized watchlists, and an active investor community together giving retail
            investors a clearer, more focused way to understand the market.
          </p>
          <TextLink href="/how-it-works">See exactly how signals are generated</TextLink>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {ABOUT_STATS.map((s) => (
          <div
            key={s.value}
            className="flex min-h-[260px] flex-col justify-between gap-8 rounded-md bg-[rgba(192,146,72,0.08)] p-5 lg:h-[321px]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-5xl font-semibold leading-[1.2] text-pb-text lg:text-[60px]">{s.value}</p>
                <div className="flex items-center gap-1">
                  <Image src="/icons/website/dot.svg" alt="" width={6} height={6} />
                  <p className="text-base font-medium leading-[1.2] text-pb-text">{s.label}</p>
                </div>
              </div>
              <div className="relative size-[96px] shrink-0 rounded shadow-[0_0_4px_rgba(255,233,70,0.15)] lg:size-[120px]">
                <Image src={s.image} alt="" fill sizes="120px" className="rounded object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Image src="/icons/website/home/divider-line.svg" alt="" width={400} height={1} className="h-px w-full" />
              <p className="text-base leading-[1.5] text-pb-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
