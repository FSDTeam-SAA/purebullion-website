"use client";

import { PanelCard, SideTag } from "../../_components/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CountBadge } from "./CountBadge";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useDashboardOverview } from "@/hooks/useDashboard";
import { fmtPrice } from "@/lib/format";

const head = "h-12 px-4 text-[14px] font-medium text-pb-text";
const cell = "px-4 py-3 text-[14px] text-pb-muted";

export function OpenSignals() {
  const { data, isLoading, isError, error, refetch } = useDashboardOverview();
  const openSignals = data?.openSignals ?? [];
  return (
    <PanelCard title="Open signals" icon badge={<CountBadge>{openSignals.length} open</CountBadge>} action={{ label: "Manage", href: "/signals" }}>
      <Table>
        <TableHeader className="bg-pb-head [&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className={head}>Signal</TableHead>
            <TableHead className={`${head} text-center`}>Entry</TableHead>
            <TableHead className={`${head} text-center`}>Stop</TableHead>
            <TableHead className={`${head} text-center`}>Last</TableHead>
            <TableHead className={`${head} text-center`}>From entry</TableHead>
            <TableHead className={`${head} text-center`}>Progress</TableHead>
            <TableHead className={`${head} text-center`}>Opened</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {openSignals.map((r, i) => (
            <TableRow key={r.signalId ?? i} className="border-b border-pb-head hover:bg-white/[0.02]">
              <TableCell className={cell}>
                <div className="flex items-center gap-2">
                  <SideTag side={r.type} className="rounded-[4px] px-2 py-1 leading-none" />
                  <span className="font-medium text-pb-text">{r.symbol}</span>
                  <span className="ml-auto pl-6 text-right">{r.companyName}</span>
                </div>
              </TableCell>
              <TableCell className={`${cell} text-center`}>{fmtPrice(r.entry)}</TableCell>
              <TableCell className={`${cell} text-center`}>{fmtPrice(r.stopLoss)}</TableCell>
              <TableCell className={`${cell} text-center`}>{fmtPrice(r.last)}</TableCell>
              <TableCell className={`${cell} text-center text-[12px]`}>{r.fromEntry}</TableCell>
              <TableCell className={cell}>
                <div className="h-2 w-[72px] overflow-hidden rounded-full bg-pb-head">
                  <div className="h-full rounded-full bg-pb-up" style={{ width: `${Math.max(r.progress, 8)}%` }} />
                </div>
              </TableCell>
              <TableCell className={`${cell} w-[90px] text-center`}>{r.openedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <PanelLoading />}
      {isError && <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />}
      {!isLoading && !isError && openSignals.length === 0 && <PanelEmpty>No open signals right now.</PanelEmpty>}
    </PanelCard>
  );
}
