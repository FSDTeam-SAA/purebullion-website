import Image from "next/image";
import SectionHeading from "@/components/website/shared/SectionHeading";
import {
  TESTIMONIALS_ROW_1,
  TESTIMONIALS_ROW_2,
  type Testimonial,
} from "@/data/website/home";

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-5 rounded-[32px] bg-white/10 p-6 shadow-[0_3px_8px_rgba(20,27,52,0.04)] sm:w-[500px]">
      <p className="flex-1 text-base font-medium leading-[1.5] text-pb-text sm:text-xl">{t.quote}</p>
      <Image src="/icons/website/home/testimonial-line.svg" alt="" width={400} height={1} className="h-px w-full" />
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-full bg-white/10 p-1 shadow-[0_4px_8px_rgba(20,27,52,0.08)]">
          <Image src={t.avatar} alt="" width={62} height={62} className="size-[54px] rounded-full object-cover sm:size-[62px]" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="whitespace-nowrap text-lg font-semibold leading-[1.2] text-pb-text sm:text-2xl">{t.name}</p>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="flex rounded-full bg-white/10 p-1 shadow-[0_3px_8px_rgba(20,27,52,0.04)]">
                <Image src="/icons/website/home/star-gold.svg" alt="" width={20} height={20} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <div className="px-4">
        <SectionHeading
          badge="Member Perspectives"
          title="Built for Investors Who Value Clarity"
          description="See how Pure Bullion helps members simplify market research, stay informed, and approach investment decisions with greater confidence."
        />
      </div>
      <div className="relative flex w-full flex-col gap-6 overflow-hidden">
        {[TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2].map((row, i) => (
          <div key={i} className="pb-marquee overflow-hidden">
            <div
              className="pb-marquee-track"
              style={{
                animation: `${i === 0 ? "pb-marquee-left" : "pb-marquee-right"} ${i === 0 ? 60 : 70}s linear infinite`,
              }}
            >
              {[...row, ...row].map((t, k) => (
                <Card key={k} t={t} />
              ))}
            </div>
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(9,8,3) 0%, rgba(9,8,3,0) 10%, rgba(9,8,3,0) 90%, rgb(9,8,3) 100%)",
          }}
        />
      </div>
    </section>
  );
}
