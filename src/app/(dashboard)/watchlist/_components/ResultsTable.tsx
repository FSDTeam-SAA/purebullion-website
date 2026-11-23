"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Sparkline, StatusPill, TablePagination } from "../../_components/shared";
import { PanelError } from "../../_components/shared/QueryState";
import type { WatchlistItem, WatchlistPage } from "@/services/watchlist.service";
import { cn } from "@/lib/utils";
import { TABS, type Tab } from "./data";

const COLS = ["Ticker", "Company Name", "Price", "Daily Change", "30 day", "Volume", "Market Condition", "Signal Setup", "Action"];

type Props = {
  rows: WatchlistItem[];
  pagination?: WatchlistPage["paginationInfo"];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  tab: Tab;
  onTabChange: (t: Tab) => void;
  page: number;
  onPageChange: (p: number) => void;
  pageSize: number;
  onRemove: (symbol: string) => void;
  removing?: string;
};

const signalTone = (s: string) => (s === "Sell" ? "red" : s === "Hold" ? "gray" : s === "Open Signal" ? "gold" : "green");

function pageList(total: number, current: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: (number | "...")[] = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
}

export function ResultsTable({
  rows, pagination, isLoading, error, onRetry, tab, onTabChange, page, onPageChange, pageSize, onRemove, removing,
}: Props) {
  const visible = rows;
  const total = pagination?.totalData ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(page * pageSize, total);

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
              onClick={() => onTabChange(t)}
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
              const up = r.isPositive;
              return (
                <tr key={r.ticker} className="h-[74px] text-[16px] text-pb-text">
                  <td className="px-4 text-left">{r.ticker}</td>
                  <td className="px-4 text-center">{r.companyName}</td>
                  <td className="px-4 text-center">{r.price}</td>
                  <td className="px-4 text-center">{r.dailyChange}</td>
                  <td className="px-4">
                    <Sparkline data={r.sparkline} trend={up ? "up" : "down"} width={127} height={48} className="mx-auto h-12 w-[127px]" />
                  </td>
                  <td className="px-4 text-center">{r.volume}</td>
                  <td className="px-4 text-center">
                    <StatusPill tone={r.marketCondition === "Risk Off" ? "red" : "green"} className="rounded-[4px] px-[9px] py-[5px] text-[16px] leading-[19px]">
                      {r.marketCondition}
                    </StatusPill>
                  </td>
                  <td className="px-4 text-center">
                    <StatusPill tone={signalTone(r.signalSetup)} className="rounded-[4px] px-[9px] py-[5px] text-[16px] leading-[19px]">
                      {r.signalSetup}
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
                    <button
                      type="button"
                      aria-label={`Remove ${r.ticker}`}
                      disabled={removing === r.ticker}
                      onClick={() => onRemove(r.ticker)}
                      className="ml-3 inline-flex size-6 items-center justify-center text-pb-muted hover:text-pb-down disabled:opacity-50"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <p className="py-10 text-center text-pb-muted">Loading watchlist…</p>}
        {error && <PanelError message={error} onRetry={onRetry} />}
        {!isLoading && !error && visible.length === 0 && (
          <p className="py-10 text-center text-pb-muted">
            {tab === "All" ? "Your watchlist is empty. Click “Add Ticker” to start tracking." : "No tickers match this filter."}
          </p>
        )}
      </div>

      <TablePagination
        page={page}
        onPageChange={(p) => onPageChange(Math.min(Math.max(1, p), totalPages))}
        from={from}
        to={to}
        total={total}
        pages={pageList(totalPages, page)}
        className="px-4 pt-4"
      />
    </section>
  );
}
