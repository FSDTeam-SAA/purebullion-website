import {
  IndexTiles,
  ConditionsBanner,
  DailyBriefing,
  ApproachingEntry,
  OpenSignals,
  NewSignals,
  WatchlistMovement,
  RecentlyClosed,
} from "./_components";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <IndexTiles />
      <ConditionsBanner />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DailyBriefing />
        <ApproachingEntry />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OpenSignals />
        <NewSignals />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[987fr_599fr]">
        <WatchlistMovement />
        <RecentlyClosed />
      </div>
    </div>
  );
}
