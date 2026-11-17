import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PanelCardProps = {
  title: string;
  /** show the little signal-bars icon before the title */
  icon?: boolean;
  badge?: React.ReactNode;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** white hairline border (tables) vs. subtle border */
  bordered?: boolean;
  headerExtra?: React.ReactNode;
};

/** Standard dark card with title row — used on nearly every dashboard screen. */
export function PanelCard({
  title,
  icon = false,
  badge,
  action,
  children,
  className,
  bodyClassName,
  bordered = true,
  headerExtra,
}: PanelCardProps) {
  return (
    <section
      className={cn(
        "flex min-w-0 flex-col overflow-hidden bg-pb-card",
        bordered ? "border border-[#cbd5e1]" : "border border-pb-line",
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-[#cbd5e1] px-4 py-3">
        <div className="flex items-center gap-3">
          {icon && <Image src="/icons/nav/signals.svg" alt="" width={20} height={20} />}
          <h2 className="text-[24px] font-normal leading-normal text-pb-text">{title}</h2>
          {badge}
        </div>
        {headerExtra}
        {action && (
          <Link href={action.href} className="text-[12px] text-pb-gold underline underline-offset-2">
            {action.label} <span aria-hidden>›</span>
          </Link>
        )}
      </header>
      <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}
