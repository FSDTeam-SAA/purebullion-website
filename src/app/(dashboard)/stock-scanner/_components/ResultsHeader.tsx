"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_OPTIONS } from "./data";

type Props = { sort: string; onSortChange: (v: string) => void };

export function ResultsHeader({ sort, onSortChange }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-[24px] font-semibold leading-[1.2] text-white">Results</h1>

      <div className="flex items-center gap-3">
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger
            aria-label="Sort results"
            className="h-auto w-auto gap-[10px] rounded-[4px] border-[#697370] bg-transparent px-2 py-1 text-[16px] font-normal leading-[1.2] text-[#697370] shadow-none focus:ring-0 [&>span]:line-clamp-none [&>svg]:hidden"
          >
            <span>Sort : </span>
            <SelectValue />
            <Image src="/icons/stock-scanner/chevron-down.svg" alt="" width={24} height={24} />
          </SelectTrigger>
          <SelectContent className="border-[#293033] bg-[#121719] font-raleway text-pb-text">
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o} value={o} className="focus:bg-[#293033] focus:text-pb-text">
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="button"
          aria-label="Filters"
          className="flex items-center rounded-[4px] bg-[#697370] p-[6px] hover:bg-[#7a8582]"
        >
          <Image src="/icons/stock-scanner/filter.svg" alt="" width={24} height={24} />
        </button>
      </div>

      <div className="flex items-end gap-4">
        <Button variant="light" className="h-[51px] rounded-[8px] px-8 text-[16px] font-medium">
          Save preset
        </Button>
        <Button variant="gold" className="h-[51px] rounded-[8px] px-8 text-[16px] font-medium">
          <Image src="/icons/stock-scanner/scan.svg" alt="" width={20} height={20} className="!size-5" />
          Run scan
        </Button>
      </div>
    </div>
  );
}
