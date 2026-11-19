import Image from "next/image";
import PageContainer from "../shared/PageContainer";
import SectionHeading from "../shared/SectionHeading";
import { aboutFeatures } from "@/data/website/about";

export default function AboutFeatures() {
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="Features"
        title="Everything You Need to Invest Smarter"
        description="Stop juggling tabs. Pure Bullion brings research, screening, and conversation together."
        descriptionClassName="max-w-[642px]"
      />
      <div className="relative grid w-full gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {aboutFeatures.map((f) => (
          <div key={f.title} className="flex flex-col items-start gap-5 p-6">
            <div className="flex items-center justify-center rounded bg-[rgba(192,146,72,0.1)] p-3">
              <Image src={f.icon} alt="" width={32} height={32} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold leading-[1.2] text-white">{f.title}</h3>
              <p className="text-base font-medium leading-[1.5] text-[#a8a8a8]">{f.text}</p>
            </div>
          </div>
        ))}
        {[1, 2].map((n) => (
          <Image
            key={n}
            src="/icons/website/about/star.svg"
            alt=""
            width={20}
            height={20}
            className="absolute top-1/2 hidden size-5 -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{ left: `${(n / 3) * 100}%` }}
          />
        ))}
      </div>
    </PageContainer>
  );
}
