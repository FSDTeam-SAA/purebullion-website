import { cn } from "@/lib/utils";

type Props = { label: string; selected: boolean; onClick: () => void };

export function FilterChip({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-[33px] whitespace-nowrap rounded border px-3 text-[14px] leading-[17px] transition-colors",
        selected
          ? "border-pb-gold bg-pb-gold/10 text-pb-gold"
          : "border-[#293033] bg-[#121719] text-pb-text hover:border-[#3b464a]"
      )}
    >
      {label}
    </button>
  );
}
