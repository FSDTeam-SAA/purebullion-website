import { StockHeader } from "./_components/StockHeader";
import { PriceStatsStrip } from "./_components/PriceStatsStrip";
import { ChartCard } from "./_components/ChartCard";
import { RelatedStocks } from "./_components/RelatedStocks";
import { KeyInformation } from "./_components/KeyInformation";
import { LatestNews } from "./_components/LatestNews";
import { SignalRationale } from "./_components/SignalRationale";
import { SignalTimeline } from "./_components/SignalTimeline";

export default function SignalDetailPage() {
  return (
    <div className="flex min-h-full flex-col pb-8">
      <StockHeader />
      <PriceStatsStrip />
      <div className="grid grid-cols-1 gap-6 px-6 pt-6 xl:grid-cols-[minmax(0,1fr)_553px]">
        <div className="flex min-w-0 flex-col gap-6">
          <ChartCard />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LatestNews />
            <SignalRationale />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <RelatedStocks />
          <KeyInformation />
        </div>
      </div>
      <div className="px-6 pt-6">
        <SignalTimeline />
      </div>
    </div>
  );
}
