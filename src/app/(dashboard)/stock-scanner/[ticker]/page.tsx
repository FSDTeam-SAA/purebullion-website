import { TickerDetailView } from "./_components/TickerDetailView";

export default function StockScannerTickerPage({ params }: { params: { ticker: string } }) {
  return <TickerDetailView ticker={decodeURIComponent(params.ticker).toUpperCase()} />;
}
