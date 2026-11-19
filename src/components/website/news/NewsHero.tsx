import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { NEWS_HERO } from "@/data/website/news";

export default function NewsHero() {
  return (
    <section className="relative overflow-hidden pb-6 lg:-mb-[60px] lg:pb-5">
      <HeroBackdrop />
      <PageContainer className="relative flex flex-col items-center gap-10 pt-36 lg:gap-[60px] lg:pt-[167px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionBadge>{NEWS_HERO.badge}</SectionBadge>
          <h1 className="max-w-[1014px] text-balance text-[36px] font-semibold leading-[1.2] text-white sm:text-[44px] lg:text-[52px]">
            <span className="gold-gradient-text-lg">{NEWS_HERO.goldTitle}</span>
            {NEWS_HERO.whiteTitle}
          </h1>
          <div className="flex max-w-[768px] flex-col items-center gap-6">
            <p className="text-base leading-[1.5] text-pb-body sm:text-xl">
              {NEWS_HERO.description}
            </p>
            <GoldButton href="/news#latest" arrow>
              All Market News
            </GoldButton>
          </div>
        </div>
        <div className="relative aspect-[1119/644] w-full max-w-[1119px] overflow-hidden rounded-2xl">
          <Image
            src={NEWS_HERO.image}
            alt="City skyline with a rising market chart"
            fill
            priority
            sizes="(min-width: 1280px) 1119px, 100vw"
            className="object-cover"
          />
        </div>
      </PageContainer>
    </section>
  );
}
