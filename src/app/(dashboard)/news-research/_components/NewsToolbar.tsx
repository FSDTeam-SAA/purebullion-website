"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { categories, type Category } from "./data";

type Props = { query: string; onQuery: (v: string) => void; active: Category; onActive: (c: Category) => void };

export function NewsToolbar({ query, onQuery, active, onActive }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative w-full lg:w-[551px]">
        <Image src="/icons/news-research/search.svg" alt="" width={20} height={20} className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search news"
          className="h-[38px] rounded-lg border border-[rgba(139,147,184,0.1)] bg-white/10 py-[9px] pl-[41px] pr-3 font-['Space_Grotesk',sans-serif] text-[12px] text-pb-text placeholder:text-[#8b93b8] focus-visible:ring-pb-gold-dark"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onActive(c)}
            className={cn(
              "rounded-md border bg-[#1a1e23] px-3 py-2 text-[14px] font-medium leading-[1.2]",
              c === active ? "border-[#d4a843] text-[#d4a843]" : "border-[#2a3038] text-[#c8cdd4]"
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
