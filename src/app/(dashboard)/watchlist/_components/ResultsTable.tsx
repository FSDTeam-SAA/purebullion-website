"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkline, StatusPill, TablePagination } from "../../_components/shared";
import { cn } from "@/lib/utils";
import { TABS, type Tab, type WatchRow } from "./data";

const COLS = ["Ticker", "Company Name", "Price", "Daily Change", "30 day", "Volume", "Market Condition", "Signal Setup", "Action"];

export function ResultsTable({ rows }: { rows: WatchRow[] }) {
  const [tab, setTab] = useState<Tab>("All");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    if (tab === "With signal") return rows.filter((r) => r.signal === "Buy setup" || r.signal === "Sell");
    if (tab === "Movers") return rows.filter((r) => Math.abs(parseFloat(r.change)) >= 2);
    return rows;
  }, [rows, tab]);

  const isAll = tab === "All" && visible.length === 7;

  return (
    <section className="rounded-[8px] border border-pb-line bg-[#0b0e0f] px-[17px] pb-4 pt-[7px]">
      <div className="flex items-center justify-between py-0">
        <h2 className="py-2 text-[24px] font-semibold leading-[1.2] text-white">Results</h2>
        <div role="tablist" aria-label="Filter results" className="flex gap-3 rounded-[4px] bg-[#121719] p-2">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === tab}
              type="button"
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={cn(
                "rounded-[4px] border px-[9px] py-[5px] text-[16px] leading-[19px]",
                t === tab ? "border-pb-gold text-pb-gold" : "border-[#697370] text-[#697370] hover:text-pb-text"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto pb-scroll">
        <table className="w-full min-w-[1100px] table-fixed border-collapse">
          <thead>
            <tr className="h-[57px] border-b border-[#cbd5e1] bg-pb-head text-[20px] font-medium text-pb-text">
              {COLS.map((c, i) => (
                <th key={c} className={cn("px-4 font-medium", i === 0 ? "text-left" : "text-center")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => {
              const up = !r.change.startsWith("-");
              return (
                <tr key={r.ticker} className="h-[74px] text-[16px] text-pb-text">
                  <td className="px-4 text-left">{r.ticker}</td>
                  <td className="px-4 text-center">{r.company}</td>
                  <td className="px-4 text-center">{r.price}</td>
                  <td className="px-4 text-center">{r.change}</td>
                  <td className="px-4">
                    <Sparkline data={r.spark} trend={up ? "up" : "down"} width={127} height={48} className="mx-auto h-12 w-[127px]" />
                  </td>
                  <td className="px-4 text-center">{r.volume}</td>
                  <td className="px-4 text-center">
                    <StatusPill tone="green" className="rounded-[4px] px-[9px] py-[5px] text-[16px] leading-[19px]">
                      {r.market}
                    </StatusPill>
                  </td>
                  <td className="px-4 text-center">
                    <StatusPill tone="green" className="rounded-[4px] px-[9px] py-[5px] text-[16px] leading-[19px]">
                      {r.signal}
                    </StatusPill>
                  </td>
                  <td className="px-4 text-center">
                    <Link
                      href={`/stock-scanner/${r.ticker}`}
                      aria-label={`View ${r.ticker}`}
                      className="inline-flex size-6 items-center justify-center"
                    >
                      <Image src="/icons/watchlist/eye.svg" alt="" width={24} height={24} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && <p className="py-10 text-center text-pb-muted">No tickers match this filter.</p>}
      </div>

      {isAll ? (
        <TablePagination page={page} onPageChange={setPage} className="px-4 pt-4" />
      ) : (
        <TablePagination
          page={1}
          from={visible.length ? 1 : 0}
          to={visible.length}
          total={visible.length}
          pages={[1]}
          className="px-4 pt-4"
        />
      )}
    </section>
  );
}
