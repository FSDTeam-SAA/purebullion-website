"use client";

import { StatTile } from "../../_components/shared";
import { PanelError } from "../../_components/shared/QueryState";
import { useDashboardOverview } from "@/hooks/useDashboard";
import { fmtNumber, fmtPct } from "@/lib/format";

export function IndexTiles() {
  const { data, isLoading, isError, error, refetch } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-[110px] animate-pulse rounded border border-pb-gold-dark bg-pb-head" />
        ))}
      </div>
    );
  }
  if (isError || !data) return <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
      {data.indices.map((t) => (
        <StatTile
          key={t.symbol}
          label={t.name}
          value={fmtNumber(t.price)}
          change={fmtPct(t.percentChange)}
          trend={t.isPositive ? "up" : "down"}
          spark
          className="h-[110px]"
        />
      ))}
    </div>
  );
}
