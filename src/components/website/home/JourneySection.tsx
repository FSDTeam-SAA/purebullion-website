import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { JOURNEY_STEPS } from "@/data/website/home";

export default function JourneySection() {
  return (
    <PageContainer as="section">
      <div className="relative flex flex-col gap-10 overflow-hidden rounded-3xl bg-gradient-to-b from-[#2e2916] to-[#241809] p-6 sm:p-10 lg:flex-row lg:justify-center lg:gap-[120px]">
        <Image
          src="/images/website/home/journey-star.svg"
          alt=""
          width={560}
          height={800}
          aria-hidden
          className="pointer-events-none absolute bottom-[-300px] left-[-380px] hidden max-w-none rotate-[20deg] mix-blend-hard-light lg:block"
        />
        <div className="relative flex flex-col items-start justify-center gap-4 lg:w-[553px] lg:shrink-0">
          <SectionBadge>How It Works</SectionBadge>
          <h2 className="text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[52px]">
            Your Smarter Market Journey
          </h2>
          <p className="text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl">
            Discover opportunities, understand the market, and stay informed with powerful tools in one platform.
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-4 lg:w-[492px] lg:shrink-0">
          {JOURNEY_STEPS.map((s) => (
            <div key={s.title} className="flex items-start gap-4 rounded-lg p-2 sm:gap-6">
              <div className="flex shrink-0 items-center rounded-[34px] bg-black/25 p-4">
                <Image src={s.icon} alt="" width={28} height={28} />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <h3 className="text-xl font-semibold leading-[1.2] text-white">{s.title}</h3>
                <p className="text-base font-medium leading-[1.5] text-[#a8a8a8]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
