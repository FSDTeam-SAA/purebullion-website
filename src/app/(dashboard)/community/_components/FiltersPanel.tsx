"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SORTS, TOPICS, type SortKey, type Topic } from "./data";

type Props = {
  topic: Topic;
  sort: SortKey;
  onTopic: (t: Topic) => void;
  onSort: (s: SortKey) => void;
  onApply: () => void;
  onReset: () => void;
};

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-[6px] border bg-[#1a1e23] px-3 py-2 text-[14px] font-medium leading-[1.2] transition-colors",
        active ? "border-[#d4a843] text-[#d4a843]" : "border-[#2a3038] text-[#c8cdd4] hover:border-[#d4a843]/50"
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <div className="h-px w-full bg-[#1e2329]" />;
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-['Montserrat',sans-serif] text-[9px] font-semibold uppercase leading-normal tracking-[1.2px] text-[#666e7a]">
    {children}
  </p>
);

export function FiltersPanel({ topic, sort, onTopic, onSort, onApply, onReset }: Props) {
  return (
    <aside className="flex w-[360px] shrink-0 flex-col gap-4 self-start rounded-xl border border-[#1e2329] bg-[#0f1114] px-4 py-5">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/community/filter.svg" alt="" className="size-4" />
          <h2 className="font-['Montserrat',sans-serif] text-[18px] font-bold text-white">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="font-['Montserrat',sans-serif] text-[13px] font-medium text-[#666e7a] hover:text-white"
        >
          Reset
        </button>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <Label>Topics:</Label>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Chip key={t} active={topic === t} onClick={() => onTopic(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <Label>Sort:</Label>
        <div className="flex gap-2">
          {SORTS.map((s) => (
            <Chip key={s} active={sort === s} onClick={() => onSort(s)}>
              {s}
            </Chip>
          ))}
        </div>
      </div>
      <Divider />
      <div className="pt-2">
        <Button variant="gold" className="h-[51px] w-full rounded-lg px-8 text-[16px]" onClick={onApply}>
          Apply filter
        </Button>
      </div>
    </aside>
  );
}
