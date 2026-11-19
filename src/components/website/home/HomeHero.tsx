import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { HERO_CHIPS } from "@/data/website/home";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-24 lg:h-[1280px] lg:pb-0">
      <HeroBackdrop />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 pt-36 sm:px-8 lg:pt-[207px]">
        <div className="flex w-full max-w-[872px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <SectionBadge>Financial Intelligence Platform</SectionBadge>
              <h1 className="text-[40px] font-bold leading-[1.2] text-white sm:text-[56px] lg:text-[72px]">
                <span className="gold-gradient-text-lg">Financial Intelligence,</span>
                <br />
                Built for Better Decisions.
              </h1>
            </div>
            <p className="text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
              Centralize market intelligence, AI-powered research, stock screening, news and trader
              conversations in one premium workspace.
            </p>
          </div>
          <GoldButton href="/features" arrow>
            Explore PureBullion
          </GoldButton>
        </div>

        <div className="mt-12 w-full max-w-[1096px] rounded-2xl bg-[rgba(192,146,72,0.2)] p-2 sm:p-3 lg:mt-[100px]">
          <div className="relative aspect-[819/512] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/website/home/hero-dashboard.png"
              alt="Pure Bullion dashboard preview"
              width={1638}
              height={1092}
              priority
              className="absolute left-0 top-0 h-[106.64%] w-full max-w-none"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[300px] bg-gradient-to-b from-transparent to-[#090803] lg:block" />

      <div className="relative mx-auto mt-10 flex max-w-[960px] flex-wrap items-center justify-center gap-3 px-4 lg:absolute lg:inset-x-0 lg:bottom-1 lg:mt-0 lg:flex-nowrap lg:justify-between lg:px-0">
        {HERO_CHIPS.map((chip) => (
          <div
            key={chip.label}
            className="flex items-center justify-center gap-2.5 rounded-[30px] bg-white/5 px-4 py-2"
          >
            <Image src={chip.icon} alt="" width={20} height={20} />
            <span className="whitespace-nowrap text-base text-[#bababa]">{chip.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
