import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { MISSION_ITEMS } from "@/data/website/how-it-works";

export default function MissionVision() {
  return (
    <PageContainer as="section">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[120px]">
        <div className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[520px] lg:h-[620px] lg:min-w-px lg:flex-1">
          <Image
            src="/images/website/how-it-works/mission-laptop.png"
            alt="Professional using a laptop with a holographic market dashboard"
            fill
            sizes="(min-width: 1024px) 552px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-6 lg:w-[648px] lg:shrink-0">
          <div className="flex flex-col items-start gap-4">
            <SectionBadge>OUR MISSION &amp; VISION</SectionBadge>
            <h2 className="text-[28px] font-bold leading-[1.2] text-white sm:text-4xl">
              Built for Better Decisions.
            </h2>
            <p className="text-lg leading-[1.5] text-pb-body lg:text-xl">
              Our mission is to make market intelligence clear and accessible, while building a
              trusted financial community powered by research.
            </p>
          </div>
          {MISSION_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-[10px] bg-[rgba(192,146,72,0.1)] p-5 lg:gap-6"
            >
              <div className="flex shrink-0 items-center justify-center rounded-[51px] bg-[#211e1a] p-4 backdrop-blur-[12px]">
                <Image src={item.icon} alt="" width={32} height={32} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="text-xl font-semibold leading-[1.2] text-white lg:text-2xl">
                  {item.title}
                </h3>
                <p className="text-base leading-[1.5] text-pb-body lg:text-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
