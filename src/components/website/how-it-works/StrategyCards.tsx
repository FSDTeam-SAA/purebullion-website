import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { STRATEGY_CARDS } from "@/data/website/how-it-works";

export default function StrategyCards() {
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="BUILT AROUND YOU"
        title="Your Strategy Always Stays Yours"
        description="Pure Bullion supports your research process with useful intelligence and personalized tools."
        descriptionClassName="max-w-[642px]"
      />
      <div className="grid w-full gap-6 md:grid-cols-3">
        {STRATEGY_CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-center gap-5 rounded-2xl border border-pb-bronze bg-gradient-to-b from-[rgba(71,47,13,0.05)] to-[rgba(206,135,32,0.05)] p-6 text-center"
          >
            <div className="flex size-14 items-center justify-center rounded bg-[rgba(192,146,72,0.1)]">
              <Image src={card.icon} alt="" width={32} height={32} className="h-8 w-auto" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold leading-[1.2] text-white">{card.title}</h3>
              <p className="text-base font-medium leading-[1.5] text-[#a8a8a8]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
