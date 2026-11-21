import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";

export default function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-[120px] lg:pt-[147px]">
      <HeroBackdrop />
      <PageContainer className="relative flex flex-col items-center">
        <div className="flex w-full max-w-[872px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <SectionBadge>PLATFORM OVERVIEW</SectionBadge>
            <h1 className="text-[36px] font-bold leading-[1.2] text-white sm:text-5xl lg:text-[64px]">
              <span className="gold-gradient-text-lg">From Market Noise to</span>
              <br />
              Clear Decisions
            </h1>
          </div>
          <p className="text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
            Discover how Pure Bullion transforms complex market data into clear, actionable
            insights through AI powered research, personal tracking and community
            intelligence.
          </p>
          <GoldButton href="/register" arrow>
            Get Started
          </GoldButton>
        </div>
        <div className="relative mt-6 aspect-[840/473] w-full max-w-[840px] opacity-80">
          <Image
            src="/images/website/how-it-works/hub-graphic.png"
            alt="Pure Bullion connected to news, markets, watchlists, AI analysis, community and research dashboards"
            fill
            priority
            sizes="(min-width: 900px) 840px, 100vw"
            className="object-cover"
          />
        </div>
      </PageContainer>
    </section>
  );
}
