import { cn } from "@/lib/utils";

type SummaryTileProps = {
  label: string;
  value: string;
  className?: string;
};

/** Dark "space" summary tile (label + bold value) used on the scanner and watchlist headers. */
export function SummaryTile({ label, value, className }: SummaryTileProps) {
  return (
    <div
      className={cn(
        "rounded-[8px] border border-[#ffe8d9] bg-[linear-gradient(rgba(0,0,0,0.86),rgba(0,0,0,0.86)),linear-gradient(144deg,#a48226_0%,#e7c042_31%,#fff5ca_45%,#d5ab29_61%,#a78424_82%)] p-4",
        className
      )}
    >
      <div className="flex flex-col gap-[3px] text-pb-text">
        <p className="text-[12px] font-medium leading-normal">{label}</p>
        <p className="text-[20px] font-bold leading-[1.2]">{value}</p>
      </div>
    </div>
  );
}
