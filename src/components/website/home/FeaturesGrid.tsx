import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { FEATURES } from "@/data/website/home";

export default function FeaturesGrid() {
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="Features"
        title="Everything You Need to Invest Smarter"
        description="Stop juggling tabs. Pure Bullion brings research, screening, and conversation together."
        descriptionClassName="max-w-[642px]"
      />
      <div className="relative grid w-full sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={[
              "flex flex-col items-start gap-5 border-[rgba(192,146,72,0.2)] p-6",
              i % 3 !== 2 ? "lg:border-r" : "",
              i < 3 ? "lg:border-b" : "",
              i % 2 === 0 ? "sm:max-lg:border-r" : "",
              i < 4 ? "sm:max-lg:border-b" : "",
            ].join(" ")}
          >
            <div className="rounded bg-[rgba(192,146,72,0.1)] p-3">
              <Image src={f.icon} alt="" width={32} height={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold leading-[1.2] text-white">{f.title}</h3>
              <p className="text-base font-medium leading-[1.5] text-[#a8a8a8]">{f.text}</p>
            </div>
          </div>
        ))}
        <Image src="/icons/website/star.svg" alt="" width={20} height={20} className="absolute left-[calc(33.333%-10px)] top-1/2 hidden -translate-y-1/2 lg:block" />
        <Image src="/icons/website/star.svg" alt="" width={20} height={20} className="absolute left-[calc(66.666%-10px)] top-1/2 hidden -translate-y-1/2 lg:block" />
      </div>
    </PageContainer>
  );
}
