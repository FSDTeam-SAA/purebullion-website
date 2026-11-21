import { cn } from "@/lib/utils";
import HeroBackdrop from "./HeroBackdrop";
import SectionBadge from "./SectionBadge";

interface PageHeroProps {
  badge: string;
  /** Gold gradient part of the headline */
  goldTitle: string;
  /** White part of the headline (rendered on a second line) */
  whiteTitle?: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

/** Centered hero used by the inner pages (privacy, terms, contact, news…). */
export default function PageHero({
  badge,
  goldTitle,
  whiteTitle,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <HeroBackdrop />
      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-4 pb-16 pt-36 text-center sm:pt-40 lg:pb-24">
        <SectionBadge>{badge}</SectionBadge>
        <h1 className="text-[36px] font-bold leading-[1.2] sm:text-[48px] lg:text-[64px]">
          <span className="gold-gradient-text-lg">{goldTitle}</span>
          {whiteTitle && (
            <>
              <br />
              <span className="text-white">{whiteTitle}</span>
            </>
          )}
        </h1>
        <p className="max-w-[820px] text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
