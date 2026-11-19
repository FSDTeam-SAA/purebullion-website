import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import { showcaseCards } from "@/data/website/features";

export default function ShowcaseCards() {
  return (
    <PageContainer as="section" className="grid gap-6 lg:grid-cols-2">
      {showcaseCards.map((card) => (
        <div
          key={card.title}
          className="flex rounded-2xl bg-[rgba(192,146,72,0.1)] p-3 backdrop-blur-[6px] lg:h-[560px]"
        >
          <div className="flex w-full flex-col gap-6 overflow-hidden rounded-xl bg-black/50 px-4 pt-6 backdrop-blur-[10px] sm:px-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold leading-[1.2] text-white sm:text-[32px]">{card.title}</h3>
              <p className="leading-[1.5] text-white">{card.description}</p>
              <div className="flex flex-wrap gap-3">
                {card.pills.map((pill) => (
                  <div
                    key={pill.label}
                    className="flex items-center justify-center gap-1.5 rounded-[57px] bg-[rgba(192,146,72,0.1)] px-3 py-2"
                  >
                    <Image src={pill.icon} alt="" width={16} height={16} />
                    <span className="whitespace-nowrap text-sm leading-[1.2] text-pb-bronze">{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full shrink-0 rounded-xl" style={{ aspectRatio: card.aspect }}>
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={1374}
                  height={1145}
                  sizes="(min-width: 1024px) 576px, 100vw"
                  className="absolute max-w-none"
                  style={card.imageStyle}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </PageContainer>
  );
}
