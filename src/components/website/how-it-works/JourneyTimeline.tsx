import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { JOURNEY_STEPS, type JourneyStep } from "@/data/website/how-it-works";
import { cn } from "@/lib/utils";

function StepNode({ icon }: { icon: string }) {
  return (
    <div className="relative z-10 flex size-[60px] shrink-0 items-center justify-center rounded-[34px] bg-[rgba(43,26,0,0.2)] ring-1 ring-pb-bronze/30">
      <Image src={icon} alt="" width={28} height={28} />
    </div>
  );
}

function StepCard({ step }: { step: JourneyStep }) {
  const right = step.side === "right";
  return (
    <div
      className={cn(
        "flex w-full items-center xl:absolute xl:top-[var(--step-top)] xl:w-[615px]",
        right ? "xl:left-[555.5px]" : "xl:left-[0.5px] xl:flex-row-reverse",
      )}
      style={{ "--step-top": `${step.top}px` } as React.CSSProperties}
    >
      <StepNode icon={step.icon} />
      <div className="h-[9px] w-4 shrink-0 bg-[rgba(192,146,72,0.3)] xl:w-[63px]" />
      <div className="min-w-0 flex-1 rounded-lg bg-black/15 p-2 xl:max-w-[492px]">
        <div className="flex flex-col gap-2 p-2">
          <h3 className="text-xl font-semibold leading-[1.2] text-white xl:text-2xl">
            {step.title}
          </h3>
          <p className="text-base leading-[1.5] text-[#a8a8a8] xl:text-xl">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JourneyTimeline() {
  return (
    <PageContainer as="section">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[rgba(46,41,22,0.5)] to-[rgba(36,24,9,0.5)] p-5 sm:p-10">
        <div className="flex flex-col items-center gap-10 xl:gap-[60px]">
          <SectionHeading
            badge="How It Works"
            title="Your Smarter Market Journey"
            description="Discover opportunities, understand the market, and stay informed with powerful tools in one platform."
            descriptionClassName="max-w-[810px]"
          />
          <div className="relative flex w-full flex-col gap-6 xl:block xl:h-[614px] xl:w-[1171px]">
            <div className="absolute bottom-8 left-[29px] top-8 w-[3px] bg-[rgba(192,146,72,0.3)] xl:bottom-auto xl:left-[581.5px] xl:top-[105px] xl:h-[387px] xl:w-[9px]" />
            {JOURNEY_STEPS.map((step) => (
              <StepCard key={step.title} step={step} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
