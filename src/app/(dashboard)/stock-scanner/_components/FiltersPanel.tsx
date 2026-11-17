"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChipGroup } from "./ChipGroup";
import { StopDistanceSlider } from "./StopDistanceSlider";
import { ENTRY_GROUP, EXIT_GROUP, FILTER_GROUPS, RISK_REWARD_OPTIONS, type FilterGroup } from "./data";

const divider = <div className="h-px w-full bg-[#1b2227]" />;

const initialState = (groups: FilterGroup[]) =>
  Object.fromEntries(groups.map((g) => [g.key, g.selected])) as Record<string, string[]>;

export function FiltersPanel() {
  const upper = FILTER_GROUPS;
  const lower = [ENTRY_GROUP, EXIT_GROUP];
  const [sel, setSel] = useState<Record<string, string[]>>(() => initialState([...upper, ...lower]));
  const [stop, setStop] = useState(6);
  const [rr, setRr] = useState("1 : 1.80");
  const [applied, setApplied] = useState(false);

  const count = useMemo(() => Object.values(sel).reduce((n, v) => n + v.length, 0) + 1, [sel]);

  const toggle = (key: string, option: string) =>
    setSel((s) => ({
      ...s,
      [key]: s[key].includes(option) ? s[key].filter((o) => o !== option) : [...s[key], option],
    }));
  const clear = (key: string) => setSel((s) => ({ ...s, [key]: [] }));
  const reset = () => {
    setSel(Object.fromEntries([...upper, ...lower].map((g) => [g.key, []])));
    setStop(6);
    setRr("1 : 1.80");
  };

  const renderGroup = (g: FilterGroup) => (
    <div key={g.key} className="flex flex-col gap-4">
      <ChipGroup group={g} selected={sel[g.key]} onToggle={(o) => toggle(g.key, o)} onAny={() => clear(g.key)} />
      {divider}
    </div>
  );

  return (
    <aside className="flex flex-col gap-4 rounded-[8px] border border-pb-line bg-[#0b0e0f] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-pb-text" />
          <h2 className="text-[18px] font-semibold leading-[22px] text-pb-text">Filters</h2>
        </div>
        <button type="button" onClick={reset} className="text-[13px] text-[#697370] hover:text-pb-text">
          Reset
        </button>
      </div>
      {divider}

      {upper.map(renderGroup)}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-medium uppercase leading-[11px] tracking-[0.14em] text-[#697370]">Risk Parameters</p>
          <StopDistanceSlider value={stop} onChange={setStop} />
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium leading-[17px] text-pb-text">Min risk / reward</p>
            <Select value={rr} onValueChange={setRr}>
              <SelectTrigger className="h-[33px] rounded border-[#293033] bg-[#121719] px-3 text-[14px] text-pb-text shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[#293033] bg-[#121719] font-raleway text-pb-text">
                {RISK_REWARD_OPTIONS.map((o) => (
                  <SelectItem key={o} value={o} className="focus:bg-[#293033] focus:text-pb-text">
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {divider}
      </div>

      {lower.map(renderGroup)}

      <Button
        variant="gold"
        onClick={() => setApplied(true)}
        className="mt-2 h-[51px] w-full rounded-[4px] text-[16px] font-medium"
      >
        Apply {count} filter
      </Button>
      {applied && <p className="sr-only" role="status">Filters applied</p>}
    </aside>
  );
}
