import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { STRATEGY_FEATURES } from "@/data/website/community";

export default function StrategySection() {
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="BUILT AROUND YOU"
        title="Your Strategy Always Stays Yours"
        description="Pure Bullion supports your research process with useful intelligence and personalized tools."
        descriptionClassName="max-w-[642px]"
      />
      <div className="flex w-full flex-col gap-6">
        {[STRATEGY_FEATURES.slice(0, 2), STRATEGY_FEATURES.slice(2)].map((row, r) => (
          <div
            key={r}
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
              r === 0 ? "lg:grid-cols-[470px_1fr]" : "lg:grid-cols-[1fr_470px]"
            }`}
          >
            {row.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center gap-5 rounded-2xl border border-pb-bronze bg-[rgba(45,40,37,0.2)] p-6 text-center"
              >
                <div className="rounded-full bg-[rgba(192,146,72,0.1)] p-3">
                  <Image src={f.icon} alt="" width={32} height={32} />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <h3 className="text-xl font-semibold leading-[1.2] text-white">{f.title}</h3>
                  <p className="mx-auto max-w-[472px] text-base font-medium leading-[1.5] text-[#a8a8a8]">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
