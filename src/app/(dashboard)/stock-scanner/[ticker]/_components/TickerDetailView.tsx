"use client";

import { PanelError, PanelLoading } from "../../../_components/shared";
import { useScannerDetail } from "@/hooks/useStockScanner";
import { DetailHeader } from "./DetailHeader";
import { PriceChartCard } from "./PriceChartCard";
import { ConditionScores } from "./ConditionScores";
import { ActiveSignalCard } from "./ActiveSignalCard";
import { SignalHistoryTable } from "./SignalHistoryTable";
import { KeyDataCard } from "./KeyDataCard";
import { ContinueCard } from "./ContinueCard";
import { RelatedNews } from "./RelatedNews";

export function TickerDetailView({ ticker }: { ticker: string }) {
  const { data: d, isLoading, isError, error, refetch } = useScannerDetail(ticker);

  if (isLoading)
    return (
      <div className="p-6">
        <PanelLoading rows={8} />
      </div>
    );
  if (isError || !d)
    return (
      <div className="p-6">
        <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />
      </div>
    );

  return (
    <div className="flex flex-col">
      <DetailHeader ticker={ticker} d={d} />
      <div className="grid items-start gap-6 px-6 pb-6 pt-6 xl:grid-cols-[minmax(0,1034fr)_minmax(0,553fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <PriceChartCard d={d} />
          <ConditionScores d={d} />
          <ActiveSignalCard d={d} />
          <SignalHistoryTable ticker={ticker} d={d} />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <KeyDataCard d={d} />
          <ContinueCard ticker={ticker} d={d} />
          <RelatedNews d={d} />
        </div>
      </div>
    </div>
  );
}
