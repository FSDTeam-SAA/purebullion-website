import { DetailHeader } from "./DetailHeader";
import { PriceChartCard } from "./PriceChartCard";
import { ConditionScores } from "./ConditionScores";
import { ActiveSignalCard } from "./ActiveSignalCard";
import { SignalHistoryTable } from "./SignalHistoryTable";
import { KeyDataCard } from "./KeyDataCard";
import { ContinueCard } from "./ContinueCard";
import { RelatedNews } from "./RelatedNews";

export function TickerDetailView({ ticker }: { ticker: string }) {
  return (
    <div className="flex flex-col">
      <DetailHeader ticker={ticker} />
      <div className="grid items-start gap-6 px-6 pb-6 pt-6 xl:grid-cols-[minmax(0,1034fr)_minmax(0,553fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <PriceChartCard />
          <ConditionScores />
          <ActiveSignalCard />
          <SignalHistoryTable ticker={ticker} />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <KeyDataCard />
          <ContinueCard ticker={ticker} />
          <RelatedNews />
        </div>
      </div>
    </div>
  );
}
