import { cn } from "@/lib/utils";

/** Small gold-tinted count chip used next to card titles. */
export function CountBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-[4px] border border-pb-gold-dark bg-[linear-gradient(105deg,rgba(164,130,38,0.2)_0%,rgba(231,192,66,0.2)_31%,rgba(255,245,202,0.2)_45%,rgba(213,171,41,0.2)_61%,rgba(167,132,36,0.2)_82%)] px-2 py-1 text-[12px] font-medium leading-none text-pb-text",
        className
      )}
    >
      {children}
    </span>
  );
}
