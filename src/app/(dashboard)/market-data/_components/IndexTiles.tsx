"use client";

import { StatTile } from "../../_components/shared";
import { PanelError } from "../../_components/shared/QueryState";
import { fmtNumber, fmtPct } from "@/lib/format";
import { useIndices } from "@/hooks/useMarketData";
import { tileLabel } from "./data";

export function IndexTiles() {
  const { data, isLoading, isError, refetch } = useIndices();

  if (isError) return <PanelError onRetry={() => refetch()} />;

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 2xl:grid-cols-6">
      {isLoading || !data
        ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-[100px] animate-pulse rounded bg-pb-head" />)
        : data.map((t) => (
            <StatTile
              key={t.symbol}
              label={tileLabel[t.symbol] ?? t.label}
              value={fmtNumber(t.price)}
              change={fmtPct(t.percentChange)}
              trend={t.percentChange >= 0 ? "up" : "down"}
              spark
              className="h-[100px]"
            />
          ))}
    </div>
  );
}
