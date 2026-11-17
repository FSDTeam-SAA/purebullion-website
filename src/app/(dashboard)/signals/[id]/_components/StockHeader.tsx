import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StockHeader() {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-pb-line px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[14px] text-pb-text">
          <Link href="/signals" aria-label="Back" className="flex size-8 items-center justify-center rounded-[4px] bg-pb-surface">
            <ChevronLeft className="size-4" />
          </Link>
          <Link href="/signals">Signals</Link>
          <ChevronRight className="size-4" />
          <span className="font-semibold text-pb-gold">Apple Inc.</span>
        </div>
        <div className="mt-1 flex items-center gap-4">
          <div className="relative size-12 overflow-hidden rounded-[8px] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Apple" src="/images/signals-detail/apple.png" className="absolute left-[-54.68%] top-[-29.7%] h-[158.33%] w-[211.34%] max-w-none" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[36px] font-semibold leading-[1.2] text-pb-text">Apple Inc.</h1>
            <p className="whitespace-pre text-[12px] text-pb-muted">{"AAPL  •  NASDAQ  •  Technology  •  Consumer Electronics"}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button variant="light" className="h-[52px] rounded-[4px] px-8 text-[18px]">
          <Plus className="size-5" /> Add to watchlist
        </Button>
        <Button variant="light" className="h-[52px] rounded-[4px] px-8 text-[18px]">
          <Bell className="size-5" /> Set Alert
        </Button>
        <Button variant="gold" asChild className="h-[52px] rounded-[4px] px-8 text-[18px]">
          <Link href="/ai-assistant">
            <Sparkles className="size-5" /> Ask AI About AAPL
          </Link>
        </Button>
      </div>
    </div>
  );
}
