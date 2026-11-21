import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { CONNECT_FEATURES } from "@/data/website/community";

export default function ConnectSection() {
  return (
    <PageContainer as="section" className="flex flex-col gap-5">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 items-center justify-center rounded-2xl border-[0.3px] border-pb-bronze bg-[#0b0700] p-6 py-10 lg:py-6">
          <div className="flex w-full max-w-[567px] flex-col items-start gap-4">
            <SectionBadge>Private investor community</SectionBadge>
            <h2 className="text-[28px] font-semibold leading-[1.2] text-white sm:text-[32px] lg:text-[36px]">
              Connect With Traders Who Think Beyond the Noise
            </h2>
            <p className="max-w-[507px] text-base leading-[1.5] text-pb-body">
              Join a focused, member-only community where investors exchange
              perspectives, explore research ideas, and better understand changing
              market conditions.
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-[10px] bg-[rgba(192,146,72,0.1)] p-2">
          <div className="relative aspect-[616/444] w-full overflow-hidden rounded-lg lg:aspect-auto lg:h-[444px]">
            <Image
              src="/images/website/community/community-dashboard.png"
              alt="Pure Bullion community dashboard"
              fill
              sizes="(min-width: 1024px) 616px, 100vw"
              className="object-cover object-left"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CONNECT_FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex gap-2 rounded-2xl border-[0.5px] border-pb-bronze bg-black/25 p-6 shadow-[2px_2px_4px_rgba(213,171,41,0.1)]"
          >
            <div className="flex size-6 shrink-0 items-center justify-center">
              <Image src={f.icon} alt="" width={16} height={16} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-base font-semibold leading-[1.2] text-white">{f.title}</h3>
              <p className="text-xs leading-[1.5] text-[#a8a8a8]">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
