import { FilterChip } from "./FilterChip";
import type { FilterGroup } from "./data";

type Props = {
  group: FilterGroup;
  selected: string[];
  onToggle: (option: string) => void;
  onAny: () => void;
};

export function ChipGroup({ group, selected, onToggle, onAny }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-medium uppercase leading-[11px] tracking-[0.14em] text-[#697370]">{group.label}</p>
      <div className="flex flex-wrap gap-2">
        {group.hasAny && <FilterChip label="Any" selected={selected.length === 0} onClick={onAny} />}
        {group.options.map((o) => (
          <FilterChip key={o} label={o} selected={selected.includes(o)} onClick={() => onToggle(o)} />
        ))}
      </div>
    </div>
  );
}
