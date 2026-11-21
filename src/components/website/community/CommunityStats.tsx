import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import {
  COMMUNITY_STATS,
  COMMUNITY_WIDE_STAT,
  type CommunityStat,
} from "@/data/website/community";

const ICON = "/icons/website/community";
const CARD_BG = (deg: number) =>
  `linear-gradient(${deg}deg, rgba(129,97,48,0.1) 0.5%, rgba(255,198,109,0.1) 51.9%, rgba(136,104,53,0.1) 99.5%)`;
const GHOST_BG = (deg: number) =>
  `linear-gradient(${deg}deg, rgba(207,163,45,0.07) 5.2%, rgba(255,212,72,0.07) 35.2%, rgba(255,255,255,0.07) 53.3%, rgba(249,200,49,0.07) 74.6%, rgba(208,163,39,0.07) 101.2%)`;

function StatCard({
  stat,
  wide = false,
  ghostPos,
  deg,
  ghostDeg,
  className = "",
}: {
  stat: CommunityStat;
  wide?: boolean;
  ghostPos: string;
  deg: number;
  ghostDeg: number;
  className?: string;
}) {
  return (
    <div
      className={`relative h-[256px] overflow-hidden rounded-2xl p-6 ${className}`}
      style={{ backgroundImage: CARD_BG(deg) }}
    >
      <div className="relative z-10 flex flex-col gap-2 leading-[1.2]">
        <p className="text-[40px] font-semibold text-white lg:text-[52px]">{stat.value}</p>
        <p className="text-xl text-[#a8a8a8] lg:text-2xl">{stat.label}</p>
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap bg-clip-text font-[Roboto,sans-serif] font-medium leading-[1.2] text-transparent ${
          wide ? "text-[200px] lg:text-[300px]" : "text-[200px]"
        } ${ghostPos}`}
        style={{ backgroundImage: GHOST_BG(ghostDeg) }}
      >
        {stat.ghost}
      </div>
      <Image
        src={`${ICON}/${wide ? "dots-top-wide" : "dots-top"}.svg`}
        alt=""
        width={wide ? 227 : 160}
        height={wide ? 83 : 59}
        className={`absolute mix-blend-hard-light ${wide ? "left-[593px] top-[-24px]" : "left-[243px] top-[-5px]"} -scale-x-100`}
      />
      <Image
        src={`${ICON}/${wide ? "dots-bottom-wide" : "dots-bottom"}.svg`}
        alt=""
        width={wide ? 139 : 90}
        height={wide ? 51 : 33}
        className={`absolute left-0 -scale-y-100 mix-blend-hard-light ${wide ? "top-[268px]" : "top-[224px]"}`}
      />
    </div>
  );
}

function JoinTile() {
  return (
    <div
      className="relative h-[316px] overflow-hidden rounded-2xl"
      style={{ backgroundImage: CARD_BG(252) }}
    >
      <Image
        src={`${ICON}/join-glow.svg`}
        alt=""
        width={380}
        height={311}
        className="absolute left-[32px] top-[-10px] max-w-none"
      />
      <Image
        src={`${ICON}/join-circle.svg`}
        alt=""
        width={232}
        height={232}
        className="absolute bottom-[-0.92px] left-[6.62px] max-w-none"
      />
      <span className="gold-gradient-text absolute left-[79px] top-[189px] whitespace-nowrap text-xl font-semibold leading-[1.2]">
        Join Now
      </span>
    </div>
  );
}

export default function CommunityStats() {
  const ghostPositions = [
    { pos: "left-[251px] top-[241px]", deg: 248, ghost: 70 },
    { pos: "left-[298.5px] top-[234px]", deg: 248, ghost: 76 },
    { pos: "left-[280px] top-[230px]", deg: 248, ghost: 77 },
  ];
  return (
    <PageContainer as="section" className="flex flex-col items-center gap-10 lg:gap-[60px]">
      <SectionHeading
        badge="BUILT FOR INVESTORS"
        title="A Community Driven by Shared Knowledge"
        description="Discover meaningful conversations, different market perspectives, and valuable insights from investors with diverse levels of experience."
        descriptionClassName="max-w-[742px]"
      />
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_STATS.map((stat, i) => (
            <StatCard
              key={stat.value}
              stat={stat}
              ghostPos={ghostPositions[i].pos}
              deg={ghostPositions[i].deg}
              ghostDeg={-ghostPositions[i].ghost}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:mx-12 lg:grid-cols-[392px_1fr]">
          <JoinTile />
          <StatCard
            stat={COMMUNITY_WIDE_STAT}
            wide
            ghostPos="left-[511.5px] top-[274px]"
            deg={236}
            ghostDeg={-66}
            className="!h-[316px]"
          />
        </div>
      </div>
    </PageContainer>
  );
}
