"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  from?: number;
  to?: number;
  total?: number;
  page?: number;
  pages?: (number | "...")[];
  onPageChange?: (page: number) => void;
  className?: string;
};

/** "Showing 1 to 9 of 120 results" + [<] [1] [2] [3] [...] [17] [>] */
export function TablePagination({
  from = 1,
  to = 9,
  total = 120,
  page = 1,
  pages = [1, 2, 3, "...", 17],
  onPageChange,
  className,
}: TablePaginationProps) {
  const box = "flex size-10 items-center justify-center rounded border border-[#64748b] text-[14px] text-pb-text";
  return (
    <div className={cn("flex items-center justify-between gap-4 px-4 py-4", className)}>
      <p className="text-[16px] text-pb-muted">
        Showing {from} to {to} of {total} results
      </p>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Previous page" className={cn(box, "border-transparent bg-white text-black")} onClick={() => onPageChange?.(Math.max(1, page - 1))}>
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className={box}>…</span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange?.(p)}
              className={cn(box, p === page && "border-transparent bg-pb-gold text-black")}
            >
              {p}
            </button>
          )
        )}
        <button type="button" aria-label="Next page" className={cn(box)} onClick={() => onPageChange?.(page + 1)}>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
