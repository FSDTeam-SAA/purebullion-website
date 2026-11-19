import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { featureCards } from "@/data/website/features";

export default function FeatureGrid() {
  return (
    <PageContainer as="section" id="features" className="flex flex-col gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="Features"
        title="Everything You Need to Invest Smarter"
        description="Stop juggling tabs. Pure Bullion brings research, screening, and conversation together."
        descriptionClassName="max-w-[642px]"
      />
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((card) => (
          <div key={card.title} className="flex flex-col items-start gap-5 p-6">
            <div className="flex items-center justify-center rounded bg-[rgba(192,146,72,0.1)] p-3">
              <Image src={card.icon} alt="" width={32} height={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold leading-[1.2] text-white">{card.title}</h3>
              <p className="font-medium leading-[1.5] text-[#a8a8a8]">{card.description}</p>
            </div>
          </div>
        ))}
        {[0, 1].map((i) => (
          <Image
            key={i}
            src="/icons/website/features/star-divider.svg"
            alt=""
            width={20}
            height={20}
            className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block"
            style={{ left: `calc(${(i + 1) * 33.3333}% - 10px)` }}
          />
        ))}
      </div>
    </PageContainer>
  );
}
