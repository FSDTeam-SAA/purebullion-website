"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToWatchlist } from "@/hooks/useSignals";
import type { SignalDetail } from "@/services/signals.service";

export function StockHeader({ d }: { d: SignalDetail }) {
  const add = useAddToWatchlist();
  const name = d.profile?.name || d.quote?.name || d.companyName || d.symbol;
  const meta = [d.symbol, d.quote?.exchange || d.profile?.exchange, d.profile?.sector, d.profile?.industry].filter(Boolean).join("  •  ");
  return (
    <div className="flex items-start justify-between gap-6 border-b border-pb-line px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[14px] text-pb-text">
          <Link href="/signals" aria-label="Back" className="flex size-8 items-center justify-center rounded-[4px] bg-pb-surface">
            <ChevronLeft className="size-4" />
          </Link>
          <Link href="/signals">Signals</Link>
          <ChevronRight className="size-4" />
          <span className="font-semibold text-pb-gold">{name}</span>
        </div>
        <div className="mt-1 flex items-center gap-4">
          <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-[8px] bg-white text-[18px] font-bold text-black">
            {d.symbol.slice(0, 2)}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[36px] font-semibold leading-[1.2] text-pb-text">{name}</h1>
            <p className="whitespace-pre text-[12px] text-pb-muted">{meta}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="light"
          disabled={add.isPending}
          onClick={() => add.mutate({ symbol: d.symbol, companyName: name })}
          className="h-[52px] rounded-[4px] px-8 text-[18px]"
        >
          <Plus className="size-5" /> Add to watchlist
        </Button>
        <Button variant="light" asChild className="h-[52px] rounded-[4px] px-8 text-[18px]">
          <Link href="/alerts">
            <Bell className="size-5" /> Set Alert
          </Link>
        </Button>
        <Button variant="gold" asChild className="h-[52px] rounded-[4px] px-8 text-[18px]">
          <Link href="/ai-assistant">
            <Sparkles className="size-5" /> Ask AI About {d.symbol}
          </Link>
        </Button>
      </div>
    </div>
  );
}
