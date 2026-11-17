import { cn } from "@/lib/utils";
import { Sparkline } from "./Sparkline";

type StatTileProps = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  spark?: boolean;
  className?: string;
};

/** Gradient-bordered metric tile (index tiles, scanner/watchlist summary tiles). */
export function StatTile({ label, value, change, trend = "up", spark = false, className }: StatTileProps) {
  const up = trend === "up";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded border border-pb-gold-dark p-4",
        spark
          ? up
            ? "bg-[linear-gradient(135deg,#1f150d_0%,#0d1a14_100%)]"
            : "bg-[linear-gradient(135deg,#1f150d_0%,#1c0d0d_100%)]"
          : "bg-[linear-gradient(135deg,#1f150d_0%,#140d0f_100%)]",
        className
      )}
    >
      <div className="relative z-10 flex flex-col gap-2">
        <p className="text-[12px] text-pb-text">{label}</p>
        <p className="text-[20px] font-bold leading-[1.2] text-pb-text">{value}</p>
        {change && (
          <span
            className={cn(
              "w-fit rounded-[2px] px-1 py-1 text-[12px] leading-none",
              up ? "bg-[rgba(0,122,85,0.2)] text-pb-up" : "bg-[rgba(239,68,68,0.2)] text-pb-down"
            )}
          >
            {change}
          </span>
        )}
      </div>
      {spark && <Sparkline trend={trend} fill className="absolute bottom-4 right-4 h-[68px] w-[190px] max-w-[60%]" />}
    </div>
  );
}
