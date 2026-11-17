import { cn } from "@/lib/utils";

type Tone = "green" | "gold" | "red" | "gray" | "white";

const TONES: Record<Tone, string> = {
  green: "border-pb-up bg-[rgba(0,122,85,0.2)] text-pb-up",
  gold: "border-pb-gold-dark bg-[rgba(231,192,66,0.12)] text-pb-gold",
  red: "border-pb-down bg-[rgba(239,68,68,0.2)] text-pb-down",
  gray: "border-[#64748b] bg-transparent text-[#cbd5e1]",
  white: "border-transparent bg-[#F1F5F9] text-black",
};

/** Small bordered status chip (Strong, Hold, Open Signal, Active, Closed ...). */
export function StatusPill({
  tone = "green",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-[2px] border px-2 py-0.5 text-[12px] leading-normal",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
