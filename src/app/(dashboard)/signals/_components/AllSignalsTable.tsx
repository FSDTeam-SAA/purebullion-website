"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelEmpty, PanelError, PanelLoading, SideTag, StatusPill, TablePagination } from "../../_components/shared";
import { useSignalList } from "@/hooks/useSignals";
import { fmtDate, fmtPct, fmtPrice } from "@/lib/format";
import { buildPages, pageRange } from "@/lib/pagination";
import { useSignalsFilters } from "./SignalsFilterContext";

const COLS = ["ID", "Signal", "", "Entry", "Target", "Stop", "Last / exit", "Return", "R:R", "STATUS", "DATE", "Action"];

export function AllSignalsTable() {
  const { side, asset, page, setPage } = useSignalsFilters();
  const { data, isLoading, isError, error, refetch } = useSignalList({ status: "all", type: side, assetType: asset, page, limit: 9 });
  const rows = data?.signals ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  return (
    <section className="overflow-hidden rounded-[8px] border border-white bg-pb-card">
      <header className="flex items-center justify-between border-b border-white px-4 py-4">
        <div className="flex items-center gap-4">
          <Image src="/icons/nav/signals.svg" alt="" width={20} height={20} />
          <h2 className="text-[24px] font-normal text-pb-text">All Signals</h2>
        </div>
        <span className="text-[12px] text-pb-gold underline">{meta?.total ?? 0} total</span>
      </header>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-pb-head hover:bg-pb-head">
            {COLS.map((c, i) => (
              <TableHead key={i} className={`h-[50px] text-[16px] font-normal text-pb-text ${i >= 3 ? "text-center" : ""}`}>
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r._id} className="h-[50px] border-b border-pb-line hover:bg-pb-surface/40">
              <TableCell className="text-[16px] text-pb-text">{r.signalId}</TableCell>
              <TableCell className="w-[80px]"><SideTag side={r.type} className="px-2 py-1 text-[14px]" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-8">
                  <span className="w-[56px] text-[16px] text-pb-text">{r.symbol}</span>
                  <span className="max-w-[140px] truncate text-[16px] text-pb-muted">{r.companyName}</span>
                </div>
              </TableCell>
              {[fmtPrice(r.entry), fmtPrice(r.target), fmtPrice(r.stopLoss), fmtPrice(r.lastExit ?? r.currentPrice)].map((v, k) => (
                <TableCell key={k} className="text-center text-[16px] text-pb-text">{v}</TableCell>
              ))}
              <TableCell className="text-center text-[14px] text-pb-muted">{fmtPct(r.returnPct)}</TableCell>
              <TableCell className="text-center text-[16px] text-pb-muted">{r.riskReward ?? "—"}</TableCell>
              <TableCell className="text-center">
                <StatusPill tone={r.status !== "CLOSED" ? "green" : "gray"} className={r.status !== "CLOSED" ? "border-transparent bg-[#E8FFF6] px-3 py-1 text-[14px] text-[#007A55]" : "border-transparent bg-[#F1F5F9] px-3 py-1 text-[14px] text-[#475569]"}>
                  {r.status === "CLOSED" ? "Closed" : "Active"}
                </StatusPill>
              </TableCell>
              <TableCell className="text-center text-[16px] text-pb-text">{fmtDate(r.openedAt)}</TableCell>
              <TableCell className="text-center">
                <Link href={`/signals/${r.signalId}`} className="inline-flex items-center gap-2 text-[16px] text-pb-gold underline">
                  <Eye className="size-4" /> Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <PanelLoading rows={5} />}
      {isError && <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />}
      {!isLoading && !isError && rows.length === 0 && <PanelEmpty>No signals found.</PanelEmpty>}
      <TablePagination
        page={page}
        pages={buildPages(page, totalPages)}
        onPageChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))}
        {...pageRange(meta)}
        className="px-4 py-4"
      />
    </section>
  );
}
