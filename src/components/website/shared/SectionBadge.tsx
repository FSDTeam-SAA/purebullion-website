import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/** Small gold pill with the "sparks" icon that sits above every section title. */
export default function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-[42px] border-[0.5px] border-[rgba(192,146,72,0.2)] bg-[rgba(192,146,72,0.05)] px-3 py-1.5 shadow-[0_0_4px_rgba(242,179,80,0.1)]",
        className,
      )}
    >
      <Image src="/icons/website/sparks.svg" alt="" width={16} height={16} />
      <span className="whitespace-nowrap text-sm leading-[1.2] text-pb-bronze">
        {children}
      </span>
    </div>
  );
}
