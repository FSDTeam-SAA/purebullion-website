import { cn } from "@/lib/utils";

/** BUY / SELL outlined tag used across signals tables & cards. */
export function SideTag({ side, className }: { side: "BUY" | "SELL"; className?: string }) {
  const buy = side === "BUY";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] border px-2 py-0.5 text-[12px] font-medium leading-normal",
        buy
          ? "border-pb-up bg-[rgba(0,122,85,0.2)] text-pb-up"
          : "border-pb-down bg-[rgba(239,68,68,0.2)] text-pb-down",
        className
      )}
    >
      {side}
    </span>
  );
}
