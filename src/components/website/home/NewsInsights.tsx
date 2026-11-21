import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { NEWS_FEATURED, NEWS_LIST } from "@/data/website/home";
import TextLink from "./TextLink";

export default function NewsInsights() {
  return (
    <PageContainer as="section" className="flex flex-col gap-10 lg:gap-[60px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start justify-center gap-4 lg:w-[648px]">
          <SectionBadge>Market News &amp; Research</SectionBadge>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[52px]">
            Market Insights That Keep You Informed
          </h2>
        </div>
        <div className="flex flex-col items-start justify-center gap-6 lg:w-[536px]">
          <p className="text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl">
            See how Pure Bullion helps members simplify market research, stay informed, and approach
            investment decisions with greater confidence.
          </p>
          <GoldButton href="/news" arrow>
            All Market News
          </GoldButton>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <article className="flex flex-col overflow-hidden rounded-lg bg-[rgba(192,146,72,0.05)] lg:w-[541px] lg:shrink-0">
          <div className="relative min-h-[240px] flex-1">
            <Image src={NEWS_FEATURED.image} alt="" fill sizes="(min-width: 1024px) 541px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col items-start gap-2 p-5 lg:h-[164px]">
            <h3 className="text-2xl font-semibold leading-[1.2] text-white">{NEWS_FEATURED.title}</h3>
            <p className="line-clamp-2 text-lg leading-[1.5] text-pb-body">{NEWS_FEATURED.text}</p>
            <TextLink href="/news">Read Article</TextLink>
          </div>
        </article>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {NEWS_LIST.map((n) => (
            <article
              key={n.title}
              className="flex flex-col overflow-hidden rounded-lg bg-[rgba(192,146,72,0.05)] sm:flex-row"
            >
              <div className="relative h-[180px] shrink-0 sm:h-auto sm:w-[200px]">
                <Image src={n.image} alt="" fill sizes="200px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-2 p-5">
                <h3 className="text-2xl font-semibold leading-[1.2] text-white">{n.title}</h3>
                <p className="line-clamp-2 text-lg leading-[1.5] text-pb-body">{n.text}</p>
                <TextLink href="/news">Read Article</TextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
