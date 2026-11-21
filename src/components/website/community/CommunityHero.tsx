import Image from "next/image";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import SectionBadge from "@/components/website/shared/SectionBadge";

const ICON = "/icons/website/community";

function Diamond({ left, children }: { left: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute top-0 flex size-[407.25px] items-center justify-center"
      style={{ left }}
    >
      <div className="relative size-[288px] -rotate-[45.86deg]">{children}</div>
    </div>
  );
}

export default function CommunityHero() {
  return (
    <section className="relative overflow-hidden lg:-mb-[60px]">
      <HeroBackdrop />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-16 pt-36 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[60px] lg:pb-[78px] lg:pt-[167px]">
        <div className="flex w-full max-w-[622px] flex-col items-start gap-6">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <SectionBadge>PURE BULLION COMMUNITY</SectionBadge>
              <h1 className="text-[40px] font-bold leading-[1.2] sm:text-[52px] lg:w-[688px] lg:text-[64px]">
                <span className="gold-gradient-text-lg">Learn, Connect and</span>
                <br />
                <span className="text-white">Grow Together</span>
              </h1>
            </div>
            <p className="text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
              Join a community where members exchange knowledge, discuss financial
              topics, and explore valuable market information together.
            </p>
          </div>
          <GoldButton href="/register" arrow>
            Join the Community
          </GoldButton>
        </div>

        <div className="mx-auto h-[252px] w-[346px] shrink-0 sm:h-[330px] sm:w-[452px] lg:mx-0 lg:h-[407px] lg:w-[558px]">
          <div className="relative h-[407px] w-[558px] origin-top-left scale-[0.62] sm:scale-[0.81] lg:scale-100">
            <Diamond left={0}>
              <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_0_8px_rgba(201,190,155,0.35)]">
                <Image
                  src="/images/website/community/handshake.png"
                  alt="Two investors shaking hands"
                  width={616}
                  height={924}
                  className="absolute left-[0.06%] top-[-159.13%] h-[320.69%] w-[213.79%] max-w-none"
                />
              </div>
            </Diamond>
            <Diamond left={75.25}>
              <Image
                src={`${ICON}/diamond-outline-1.svg`}
                alt=""
                width={290}
                height={290}
                className="absolute inset-[0_-0.69%_-0.69%_0] size-auto max-w-none"
              />
            </Diamond>
            <Diamond left={150.5}>
              <Image
                src={`${ICON}/diamond-outline-2.svg`}
                alt=""
                width={289}
                height={289}
                className="absolute inset-[0_-0.17%_-0.17%_0] size-auto max-w-none"
              />
            </Diamond>
            <Image src={`${ICON}/dot-lg.svg`} alt="" width={16} height={16} className="absolute left-[363.74px] top-[84.62px]" />
            <Image src={`${ICON}/dot-lg-2.svg`} alt="" width={16} height={16} className="absolute left-[466.74px] top-[278.62px]" />
            <Image src={`${ICON}/dot-md.svg`} alt="" width={9} height={9} className="absolute left-[357.74px] top-[320.62px]" />
            <Image src={`${ICON}/dot-sm.svg`} alt="" width={8} height={8} className="absolute left-[486.74px] top-[130.62px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
