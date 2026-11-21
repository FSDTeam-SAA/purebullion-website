import Image from "next/image";
import GoldButton from "../shared/GoldButton";
import HeroBackdrop from "../shared/HeroBackdrop";
import SectionBadge from "../shared/SectionBadge";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center gap-10 px-4 pb-16 pt-36 sm:px-8 lg:min-h-[686px] lg:flex-row lg:justify-between lg:px-0 lg:pb-0 lg:pt-[167px]">
        <div className="flex w-full flex-col items-start gap-6 lg:w-[640px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <SectionBadge>About Purebullion</SectionBadge>
              <h1 className="text-[36px] font-bold leading-[1.2] text-white sm:text-[48px] lg:w-[688px] lg:text-[64px]">
                <span className="gold-gradient-text-lg">Building a Smarter </span>
                Way <span className="gold-gradient-text-lg"> </span>
                to Understand the Market
              </h1>
            </div>
            <p className="text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
              Access market intelligence, AI-powered research, personalized
              tracking, and community insights through one clear and connected
              platform.
            </p>
          </div>
          <GoldButton href="/features" arrow>
            Explore the Platform
          </GoldButton>
        </div>
        <div className="relative aspect-[656/425] w-full max-w-[656px] shrink-0 overflow-hidden">
          <Image
            src="/images/website/about/hero-laptop.png"
            alt="Pure Bullion platform on a laptop"
            width={1672}
            height={941}
            priority
            className="absolute left-[-13.05%] top-[-4.76%] h-[109.42%] w-[125.96%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
