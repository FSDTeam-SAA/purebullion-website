import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { HERO_CHIPS } from "@/data/website/home";

/**
 * Pure Bullion Home Hero Section
 * Pixel-perfect implementation matching Figma Node 1:884 (1440x1280)
 */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#090803] pb-24 lg:h-[1280px] lg:pb-0">
      {/* ===================== HERO BACKDROP (FIGMA NODE 1:884 LAYERS) ===================== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Layer 5: Top dark vignette (Figma Ellipse 2: 1440x700 at y=-350, blur 100px) */}
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[1440px] -translate-x-1/2 rounded-full bg-[#090803]/80 blur-[80px]" />

        {/* Layer 3: Central golden ambient glow (Figma Ellipse 10: 1320x1320 at y=623, blur 403px) */}
        <div className="absolute left-1/2 top-[580px] h-[1320px] w-[1320px] -translate-x-1/2 rounded-full bg-[#C09248]/30 blur-[130px]" />

        {/* Layer 0: Horizontal light bar (Figma Group 8: Ellipses 7, 8, 9, 920x200 at y=690, linear-dodge, blur 100px) */}
        <div className="absolute left-1/2 top-[660px] h-[220px] w-[920px] -translate-x-1/2 rounded-full bg-[#C09248]/85 mix-blend-plus-lighter blur-[60px]" />
        <div className="absolute left-1/2 top-[685px] h-[150px] w-[700px] -translate-x-1/2 rounded-full bg-[#E7C042]/70 mix-blend-plus-lighter blur-[45px]" />

        {/* Layer 1: Left floating blob (Figma Ellipse 5: 420x420 at x=220, y=149, linear-dodge, blur 100px) */}
        <div className="absolute left-[calc(50%-500px)] top-[149px] hidden size-[420px] rounded-full bg-[#C09248]/30 mix-blend-plus-lighter blur-[80px] lg:block" />

        {/* Layer 2: Right floating blob (Figma Ellipse 6: 420x420 at x=673, y=298, linear-dodge, blur 100px) */}
        <div className="absolute left-[calc(50%-47px)] top-[298px] hidden size-[420px] rounded-full bg-[#C09248]/30 mix-blend-plus-lighter blur-[80px] lg:block" />

        {/* Layer 4: Vertical architectural fluted pillars (Figma Frame 2147235626: 18 columns of 80px each = 1440px) */}
        <div
          className="absolute inset-0 bg-repeat-x"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255, 230, 150, 0.08) 0px,
              rgba(255, 215, 120, 0.035) 30px,
              rgba(255, 215, 120, 0.01) 56px,
              rgba(0, 0, 0, 0.55) 78px,
              rgba(0, 0, 0, 0.85) 80px
            )`,
            backgroundSize: "80px 100%",
          }}
        />
      </div>

      {/* ===================== HERO FOREGROUND CONTENT ===================== */}
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 pt-36 sm:px-8 lg:pt-[207px]">
        {/* Figma Frame 2147235628: Headline + Subtitle + CTA */}
        <div className="flex w-full max-w-[872px] flex-col items-center text-center">
          {/* Badge & Main Title */}
          <div className="flex flex-col items-center gap-2">
            <SectionBadge className="uppercase tracking-[0.08em]">
              Financial Intelligence Platform
            </SectionBadge>
            <h1 className="text-[40px] font-bold leading-[1.18] text-white sm:text-[56px] lg:text-[72px] lg:leading-[86.4px]">
              <span className="gold-gradient-text-hero">Financial Intelligence,</span>
              <br />
              Built for Better Decisions.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mt-4 max-w-[872px] text-lg font-medium leading-[1.5] text-[#bdbdbd] sm:text-xl lg:text-[24px] lg:leading-[36px]">
            Centralize market intelligence, AI-powered research, stock screening, news and trader
            conversations in one premium workspace.
          </p>

          {/* Button */}
          <div className="mt-6">
            <GoldButton
              href="/features"
              arrow
              className="h-[52px] w-[240px] rounded-lg px-8 py-4 text-base font-medium"
            >
              Explore PureBullion
            </GoldButton>
          </div>
        </div>

        {/* Figma Frame 2147235620: Dashboard Preview Card */}
        <div className="mt-12 w-full max-w-[1096px] rounded-2xl bg-[rgba(192,146,72,0.2)] p-3 shadow-[0_0_60px_rgba(192,146,72,0.12)] sm:p-3 lg:mt-[100px]">
          <div className="relative aspect-[1072/670] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/website/home/hero-dashboard.png"
              alt="Pure Bullion dashboard preview"
              width={2144}
              height={1340}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Layer 9: Bottom organic fade (Figma Ellipse 4: 1920x800 at y=1107, blur 80px) */}
      <div className="pointer-events-none absolute left-1/2 top-[1107px] hidden h-[800px] w-[1920px] -translate-x-1/2 rounded-[50%] bg-[#090803] blur-[80px] lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[220px] bg-gradient-to-t from-[#090803] via-[#090803]/85 to-transparent lg:block" />

      {/* Layer 10: Figma Frame 2147235639 - 4 Feature Chips */}
      <div className="relative mx-auto mt-10 flex max-w-[960px] flex-wrap items-center justify-center gap-3 px-4 lg:absolute lg:bottom-1 lg:left-1/2 lg:-translate-x-1/2 lg:mt-0 lg:w-full lg:flex-nowrap lg:justify-between lg:px-0">
        {HERO_CHIPS.map((chip) => (
          <div
            key={chip.label}
            className="flex h-9 items-center justify-center gap-2.5 rounded-[30px] border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <Image src={chip.icon} alt="" width={20} height={20} className="size-5 shrink-0" />
            <span className="whitespace-nowrap text-base text-[#bababa]">{chip.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
