"use client";

import { useParams } from "next/navigation";
import { PanelError, PanelLoading } from "../../_components/shared";
import { useSignalDetail } from "@/hooks/useSignals";
import { StockHeader } from "./_components/StockHeader";
import { PriceStatsStrip } from "./_components/PriceStatsStrip";
import { ChartCard } from "./_components/ChartCard";
import { RelatedStocks } from "./_components/RelatedStocks";
import { KeyInformation } from "./_components/KeyInformation";
import { LatestNews } from "./_components/LatestNews";
import { SignalRationale } from "./_components/SignalRationale";
import { SignalTimeline } from "./_components/SignalTimeline";

export default function SignalDetailPage() {
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params?.id ?? "");
  const { data: d, isLoading, isError, error, refetch } = useSignalDetail(id);

  if (isLoading) return <div className="p-6"><PanelLoading rows={8} /></div>;
  if (isError || !d)
    return (
      <div className="p-6">
        <PanelError message={(error as Error)?.message || "Signal not found"} onRetry={() => refetch()} />
      </div>
    );

  return (
    <div className="flex min-h-full flex-col pb-8">
      <StockHeader d={d} />
      <PriceStatsStrip d={d} />
      <div className="grid grid-cols-1 gap-6 px-6 pt-6 xl:grid-cols-[minmax(0,1fr)_553px]">
        <div className="flex min-w-0 flex-col gap-6">
          <ChartCard d={d} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LatestNews d={d} />
            <SignalRationale d={d} />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <RelatedStocks d={d} />
          <KeyInformation d={d} />
        </div>
      </div>
      <div className="px-6 pt-6">
        <SignalTimeline d={d} />
      </div>
    </div>
  );
}
