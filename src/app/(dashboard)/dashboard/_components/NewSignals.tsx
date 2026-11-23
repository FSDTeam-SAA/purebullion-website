"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { PanelCard, SideTag } from "../../_components/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CountBadge } from "./CountBadge";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useDashboardOverview } from "@/hooks/useDashboard";
import { fmtPrice } from "@/lib/format";

const head = "h-12 px-4 text-center text-[14px] font-medium text-pb-text";
const cell = "px-4 py-3 text-center text-[14px] text-pb-muted";

export function NewSignals() {
  const { data, isLoading, isError, error, refetch } = useDashboardOverview();
  const newSignals = data?.newSignals ?? [];
  return (
    <PanelCard title="New signals" icon badge={<CountBadge>{newSignals.length} New</CountBadge>} action={{ label: "All signals", href: "/signals" }}>
      <Table>
        <TableHeader className="bg-pb-head [&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className={`${head} text-left`}>Signal</TableHead>
            <TableHead className={head}>Entry</TableHead>
            <TableHead className={head}>Target</TableHead>
            <TableHead className={head}>Stop</TableHead>
            <TableHead className={head}>Last</TableHead>
            <TableHead className={head}>R:R</TableHead>
            <TableHead className={head}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newSignals.map((r, i) => (
            <TableRow key={r.signalId ?? i} className="border-b border-pb-head hover:bg-white/[0.02]">
              <TableCell className={`${cell} text-left`}>
                <div className="flex items-center gap-2">
                  <SideTag side={r.type} className="rounded-[4px] px-2 py-1 leading-none" />
                  <span className="font-medium text-pb-text">{r.symbol}</span>
                  <span className="ml-auto pl-6 text-right">{r.companyName}</span>
                </div>
              </TableCell>
              <TableCell className={cell}>{fmtPrice(r.entry)}</TableCell>
              <TableCell className={cell}>{fmtPrice(r.target)}</TableCell>
              <TableCell className={cell}>{fmtPrice(r.stopLoss)}</TableCell>
              <TableCell className={cell}>{fmtPrice(r.last)}</TableCell>
              <TableCell className={`${cell} text-[12px]`}>{r.riskReward}</TableCell>
              <TableCell className={cell}>
                <Link href={r.actionUrl || `/signals/${r.signalId}`} className="inline-flex items-center gap-1 text-pb-gold underline underline-offset-2">
                  <Eye className="size-4" />
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <PanelLoading />}
      {isError && <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />}
      {!isLoading && !isError && newSignals.length === 0 && <PanelEmpty>No new signals.</PanelEmpty>}
    </PanelCard>
  );
}
