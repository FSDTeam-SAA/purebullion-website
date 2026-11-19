import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";

export default function AiAnalysis() {
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="AI Market Analysis"
        title="Smarter Market Analysis, Powered by AI"
        description="Understand market trends, company performance, and financial news through clear, AI-powered insights."
        descriptionClassName="max-w-[642px]"
      />
      <div className="w-full max-w-[1120px] rounded-[20px] border-[6px] border-[rgba(192,146,72,0.1)] sm:border-[12px]">
        <div className="relative aspect-[1096/548] w-full overflow-hidden">
          <Image
            src="/images/website/home/ai-market-chart.png"
            alt="AI market intelligence chart"
            fill
            sizes="(min-width: 1280px) 1096px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </PageContainer>
  );
}
