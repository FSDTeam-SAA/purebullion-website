import { cn } from "@/lib/utils";
import GoldButton from "./GoldButton";
import PageContainer from "./PageContainer";
import SectionBadge from "./SectionBadge";

/** "Ready to Make Smarter Market Decisions?" banner shown above the footer. */
export default function CtaBanner({ className }: { className?: string }) {
  return (
    <PageContainer as="section" className={className}>
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-[#57491b] px-6 py-10 shadow-[0_0_30px_rgba(255,200,20,0.25)] lg:px-20",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/website/shared/cta-bg.png)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(36,32,17,0.9)] to-[rgba(55,49,33,0.9)]"
        />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <SectionBadge>JOIN PURE BULLION</SectionBadge>
          <h2 className="text-balance text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[52px]">
            Ready to Make Smarter Market Decisions?
          </h2>
          <p className="max-w-[810px] text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl">
            Join Pure Bullion to access AI powered research, market intelligence,
            personalized tracking, and a private financial community all in one
            place.
          </p>
        </div>
        <GoldButton href="/register" arrow className="relative mt-2 min-w-[278px]">
          Become a Member
        </GoldButton>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_24px_rgba(0,0,0,0.25)]" />
      </div>
    </PageContainer>
  );
}
