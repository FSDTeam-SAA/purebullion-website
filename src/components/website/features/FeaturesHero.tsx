import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";

export default function FeaturesHero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <PageContainer className="relative flex flex-col gap-10 pt-32 lg:gap-[60px] lg:pt-[167px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center lg:gap-[136px]">
          <div className="flex flex-col items-start gap-2 lg:w-[648px] lg:shrink-0">
            <SectionBadge>Platform Features</SectionBadge>
            <h1 className="text-[36px] font-semibold leading-[1.2] text-white sm:text-[44px] lg:text-[52px]">
              Powerful Tools for Clearer Market Research
            </h1>
          </div>
          <div className="flex flex-col items-start gap-6 lg:w-[536px] lg:shrink-0">
            <p className="text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl">
              Explore the intelligence, research tools, market data, and community
              features designed to help you understand the market and make more
              informed decisions.
            </p>
            <GoldButton href="/features#features" arrow>
              Explore the Platform
            </GoldButton>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1096px] rounded-2xl bg-[rgba(192,146,72,0.2)] p-2 shadow-[0_0_40px_rgba(231,192,66,0.15)] sm:p-3">
          <div className="relative aspect-[1072/494] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/website/features/hero-dashboard.png"
              alt="Pure Bullion market overview dashboard"
              width={2172}
              height={724}
              priority
              sizes="(min-width: 1280px) 1072px, 100vw"
              className="absolute max-w-none"
              style={{ height: "100.27%", left: "-1.82%", top: "-0.24%", width: "103.84%" }}
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
