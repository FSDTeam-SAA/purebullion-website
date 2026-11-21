import Image from "next/image";
import PageContainer from "../shared/PageContainer";
import SectionBadge from "../shared/SectionBadge";
import { missionVision } from "@/data/website/about";

export default function MissionVision() {
  return (
    <PageContainer as="section">
      <div className="flex flex-col gap-10 overflow-hidden rounded-3xl lg:flex-row lg:items-center lg:gap-[120px]">
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[420px] lg:h-[620px] lg:min-w-px lg:flex-1">
          <Image
            src="/images/website/about/mission.png"
            alt="Pure Bullion mission"
            fill
            sizes="(min-width: 1024px) 570px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-6 lg:w-[648px] lg:shrink-0">
          <div className="flex flex-col items-start gap-4">
            <SectionBadge>OUR MISSION &amp; VISION</SectionBadge>
            <h2 className="text-[28px] font-bold leading-[1.2] text-white sm:text-[36px]">
              Built for Better Decisions.
            </h2>
            <p className="text-lg leading-[1.5] text-pb-body sm:text-xl">
              Our mission is to make market intelligence clear and accessible,
              while building a trusted financial community powered by research.
            </p>
          </div>
          {missionVision.map((m) => (
            <div
              key={m.title}
              className="flex items-start gap-4 rounded-[10px] bg-[rgba(192,146,72,0.1)] p-5 sm:gap-6"
            >
              <div className="flex shrink-0 items-center justify-center rounded-full bg-[#211e1a] p-4 backdrop-blur-[12px]">
                <Image src={m.icon} alt="" width={32} height={32} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="text-xl font-semibold leading-[1.2] text-white sm:text-2xl">
                  {m.title}
                </h3>
                <p className="text-base leading-[1.5] text-pb-body sm:text-xl">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
