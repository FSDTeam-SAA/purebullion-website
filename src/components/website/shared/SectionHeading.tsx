import { cn } from "@/lib/utils";
import SectionBadge from "./SectionBadge";

interface SectionHeadingProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/** Badge + title + description block, used by nearly every section. */
export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2
        className={cn(
          "text-balance text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[52px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-[768px] text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
