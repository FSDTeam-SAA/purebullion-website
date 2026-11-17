import { Button } from "@/components/ui/button";

export function TitleRow({ count, onAdd }: { count: number; onAdd: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-[24px] font-bold leading-none text-pb-text">Watchlist</h1>
        <p className="text-[12px] leading-[14px] text-pb-muted">{count - 1} of unlimited tickers · updated at the close</p>
      </div>
      <div className="flex gap-4">
        <Button variant="light" className="h-[51px] rounded-[8px] px-8 text-[16px] font-medium">
          Export
        </Button>
        <Button variant="gold" onClick={onAdd} className="h-[51px] rounded-[8px] px-8 text-[16px] font-medium">
          Add Ticker
        </Button>
      </div>
    </div>
  );
}
