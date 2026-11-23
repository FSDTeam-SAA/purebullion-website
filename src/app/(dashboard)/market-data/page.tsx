import { IndexTiles } from "./_components/IndexTiles";
import { MarketChartCard } from "./_components/MarketChartCard";
import { MarketBreadthBar } from "./_components/MarketBreadthBar";
import { SectorBreadthCard } from "./_components/SectorBreadthCard";
import { MoversTable } from "./_components/MoversTable";
import { UpcomingEarnings } from "./_components/UpcomingEarnings";
import { MarketNews } from "./_components/MarketNews";

export default function MarketDataPage() {
  return (
    <div className="flex flex-col gap-6 px-6 pb-10 pt-6">
      <IndexTiles />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1139fr)_minmax(0,449fr)]">
        <MarketChartCard />
        <div className="flex flex-col gap-4">
          <MarketBreadthBar />
          <SectorBreadthCard />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <MoversTable title="Top Gainers" kind="gainers" />
        <MoversTable title="Top Losers" kind="losers" />
        <MoversTable title="Most Active" kind="most-active" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[794px_minmax(0,1fr)]">
        <UpcomingEarnings />
        <MarketNews />
      </div>
    </div>
  );
}
