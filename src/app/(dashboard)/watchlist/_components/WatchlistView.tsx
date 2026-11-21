"use client";

import { useState } from "react";
import { SummaryTile } from "../../_components/shared";
import { PAGE_SIZE, TAB_TO_API, type Tab } from "./data";
import { TitleRow } from "./TitleRow";
import { ResultsTable } from "./ResultsTable";
import { AddTickerModal } from "./modals/AddTickerModal";
import {
  useAddTicker,
  useExportWatchlist,
  useRemoveTicker,
  useWatchlist,
  useWatchlistStats,
} from "@/hooks/useWatchlist";

export function WatchlistView() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("All");
  const [page, setPage] = useState(1);

  const list = useWatchlist({ tab: TAB_TO_API[tab], page, limit: PAGE_SIZE });
  const stats = useWatchlistStats();
  const add = useAddTicker();
  const remove = useRemoveTicker();
  const exporter = useExportWatchlist();

  const s = stats.data;
  const summary = [
    { label: "Tickers tracked", value: s ? String(s.tickersTracked) : "—" },
    { label: "With open signals", value: s ? String(s.withOpenSignals) : "—" },
    { label: "Up today", value: s ? String(s.upToday) : "—" },
    { label: "Average move", value: s?.averageMove ?? "—" },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <TitleRow
        limitInfo={s?.limitInfo ?? "Loading…"}
        onAdd={() => setOpen(true)}
        onExport={() => exporter.mutate("csv")}
        exporting={exporter.isPending}
      />
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {summary.map((t) => (
          <SummaryTile key={t.label} {...t} />
        ))}
      </div>
      <ResultsTable
        rows={list.data?.watchlist ?? []}
        pagination={list.data?.paginationInfo}
        isLoading={list.isLoading}
        error={list.isError ? (list.error as Error).message : undefined}
        onRetry={() => list.refetch()}
        tab={tab}
        onTabChange={(t) => {
          setTab(t);
          setPage(1);
        }}
        page={page}
        onPageChange={setPage}
        pageSize={PAGE_SIZE}
        onRemove={(symbol) => remove.mutate(symbol)}
        removing={remove.isPending ? (remove.variables as string) : undefined}
      />
      <AddTickerModal
        open={open}
        onOpenChange={setOpen}
        watched={new Set((list.data?.watchlist ?? []).map((r) => r.ticker))}
        adding={add.isPending ? add.variables?.symbol : undefined}
        onAdd={(symbol, companyName) => add.mutate({ symbol, companyName })}
      />
    </div>
  );
}
