import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { COMMUNITY_POINTS } from "@/data/website/home";
import TextLink from "./TextLink";

function Shot({
  src,
  alt,
  imgClass,
}: {
  src: string;
  alt: string;
  imgClass: string;
}) {
  return (
    <div className="h-[260px] w-full rounded-[10px] bg-[rgba(192,146,72,0.1)] p-2 sm:h-[360px] lg:h-[460px] lg:flex-1">
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Image src={src} alt={alt} width={1600} height={1000} className={`absolute max-w-none ${imgClass}`} />
      </div>
    </div>
  );
}

export default function CommunityMembership() {
  return (
    <PageContainer as="section" className="flex flex-col gap-16 lg:gap-[120px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[120px]">
        <div className="flex flex-col items-start justify-center gap-6 lg:w-[648px] lg:shrink-0">
          <div className="flex w-full flex-col items-start gap-4">
            <SectionBadge>Private investor community</SectionBadge>
            <h2 className="text-[28px] font-semibold leading-[1.2] text-white sm:text-[32px] lg:text-[36px]">
              Connect With Investors Who Think Beyond the Noise
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-base leading-[1.5] text-pb-body">
                Join a focused, member-only community where investors exchange perspectives, explore
                research ideas, and better understand changing market conditions.
              </p>
              <ul className="flex flex-col gap-3">
                {COMMUNITY_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-base leading-[1.2] text-pb-body">
                    <Image src="/icons/website/home/check-circle.svg" alt="" width={16} height={16} className="shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <TextLink href="/our-community">Explore the Community</TextLink>
        </div>
        <Shot
          src="/images/website/home/community-screen.png"
          alt="Pure Bullion community preview"
          imgClass="left-[0.01%] top-[-7.53%] h-[115%] w-[152.31%]"
        />
      </div>

      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-[120px]">
        <Shot
          src="/images/website/home/membership-dashboard.png"
          alt="Pure Bullion membership dashboard"
          imgClass="left-[-22.61%] top-[-10.59%] h-[114.86%] w-[142.72%]"
        />
        <div className="flex flex-col items-start justify-center gap-6 lg:w-[648px] lg:shrink-0">
          <div className="flex flex-col items-start gap-4">
            <SectionBadge>Pure Bullion Membership</SectionBadge>
            <h2 className="text-[28px] font-semibold leading-[1.2] text-white sm:text-[32px] lg:text-[36px]">
              Bring Smarter Market Research Into Your Daily Routine
            </h2>
            <div className="flex flex-col gap-4 text-base leading-[1.5] text-pb-body">
              <p>
                Pure Bullion brings market intelligence, AI-powered financial research, stock screening,
                personalized watchlists, curated news, and investor discussions into one focused
                workspace. Instead of switching between disconnected platforms, members can access the
                information and research tools they need from a single dashboard.
              </p>
              <p>
                Whether you are researching a company, monitoring market movements, reviewing financial
                news, or exploring new ideas, Pure Bullion helps you work more efficiently and approach
                the market with greater clarity and confidence.
              </p>
            </div>
          </div>
          <TextLink href="/pricing">View Membership Plans</TextLink>
        </div>
      </div>
    </PageContainer>
  );
}
