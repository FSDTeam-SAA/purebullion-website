"use client";

import { PanelCard, Sparkline, StatusPill } from "../../_components/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useDashboardOverview } from "@/hooks/useDashboard";
import { fmtPrice } from "@/lib/format";

const head = "h-12 px-4 text-center text-[14px] font-medium text-pb-text";
const cell = "px-4 py-4 text-center text-[14px] text-pb-muted";
const tone: Record<string, "green" | "gold" | "gray"> = { "BUY Setup": "green", "Open Signal": "gold", Watching: "gray" };

export function WatchlistMovement() {
  const { data, isLoading, isError, error, refetch } = useDashboardOverview();
  const watchlist = data?.watchlistMovement ?? [];
  return (
    <PanelCard
      title="Watchlist movement"
      action={{ label: "Open watchlist", href: "/watchlist" }}
    >
      <Table>
        <TableHeader className="bg-pb-head [&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className={`${head} text-left`}>Ticker</TableHead>
            <TableHead className={head}>Price</TableHead>
            <TableHead className={head}>Change</TableHead>
            <TableHead className={head}>30-day</TableHead>
            <TableHead className={head}>Volume</TableHead>
            <TableHead className={head}>Signal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((r) => (
            <TableRow key={r.symbol} className="border-b border-pb-head hover:bg-white/[0.02]">
              <TableCell className={`${cell} text-left`}>
                <div className="flex items-center justify-between gap-6">
                  <span className="font-medium text-pb-text">{r.symbol}</span>
                  <span>{r.companyName}</span>
                </div>
              </TableCell>
              <TableCell className={cell}>{fmtPrice(r.price)}</TableCell>
              <TableCell className={cell}>{r.change}</TableCell>
              <TableCell className={cell}>
                <Sparkline data={r.sparkline.length > 1 ? r.sparkline : undefined} trend={r.isPositive ? "up" : "down"} width={130} height={36} className="mx-auto h-9 w-[130px]" />
              </TableCell>
              <TableCell className={cell}>{r.volume}</TableCell>
              <TableCell className={cell}>
                <StatusPill tone={tone[r.signalBadge] ?? "gray"} className="rounded-[4px] px-2 py-1 leading-none">
                  {r.signalBadge}
                </StatusPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <PanelLoading />}
      {isError && <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />}
      {!isLoading && !isError && watchlist.length === 0 && <PanelEmpty>Your watchlist is empty. Add tickers to track them here.</PanelEmpty>}
    </PanelCard>
  );
}
