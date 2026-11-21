import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { cn } from "@/lib/utils";

interface SplitFeatureProps {
  badge: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  bullets?: string[];
  cta: { label: string; href: string };
  image: string;
  imageStyle: React.CSSProperties;
  imageLeft?: boolean;
}

/** Text column + cropped image panel (community & membership sections). */
export default function SplitFeature({
  badge,
  title,
  description,
  paragraphs,
  bullets,
  cta,
  image,
  imageStyle,
  imageLeft = false,
}: SplitFeatureProps) {
  return (
    <PageContainer as="section">
      <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-[120px]">
        <div className={cn("flex flex-col justify-center gap-6 lg:w-[648px] lg:shrink-0", imageLeft && "lg:order-2")}>
          <div className="flex flex-col items-start gap-4">
            <SectionBadge>{badge}</SectionBadge>
            <h2 className="text-[28px] font-semibold leading-[1.2] text-white sm:text-[32px] lg:text-[36px]">{title}</h2>
            <div className="flex flex-col gap-4 leading-[1.5] text-pb-body">
              {description && <p>{description}</p>}
              {paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {bullets && (
                <ul className="flex flex-col gap-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 leading-[1.2]">
                      <Image src="/icons/website/features/check.svg" alt="" width={16} height={16} className="shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Link
            href={cta.href}
            className="inline-flex w-fit items-center gap-1 border-b border-pb-bronze pb-0.5 text-lg font-medium leading-[1.2] text-pb-bronze transition hover:brightness-125"
          >
            {cta.label}
            <Image src="/icons/website/features/arrow-gold.svg" alt="" width={20} height={20} />
          </Link>
        </div>
        <div className={cn("flex-1 rounded-[10px] bg-[rgba(192,146,72,0.1)] p-2", imageLeft && "lg:order-1")}>
          <div className="relative h-[260px] w-full overflow-hidden rounded-lg sm:h-[360px] lg:h-[444px]">
            <Image
              src={image}
              alt=""
              width={1586}
              height={992}
              sizes="(min-width: 1024px) 552px, 100vw"
              className="absolute max-w-none"
              style={imageStyle}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
