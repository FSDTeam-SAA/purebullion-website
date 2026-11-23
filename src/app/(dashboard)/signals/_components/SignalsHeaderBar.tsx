"use client";

import Link from "next/link";
import { Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignalStats } from "@/hooks/useSignals";
import { useSignalsFilters, type SignalTab } from "./SignalsFilterContext";

const TABS: { key: SignalTab; label: string; count: "new" | "open" | "closed" }[] = [
  { key: "NEW", label: "New", count: "new" },
  { key: "OPEN", label: "Open", count: "open" },
  { key: "CLOSED", label: "Closed", count: "closed" },
];

export function SignalsHeaderBar() {
  const { tab, setTab } = useSignalsFilters();
  const { data: stats } = useSignalStats();
  return (
    <div className="flex h-[84px] items-center justify-between border-b border-pb-line bg-pb-sidebar px-6">
      <div className="flex items-center gap-1 rounded-[4px] bg-pb-surface p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "h-[34px] rounded-[4px] px-4 text-[14px] text-pb-text",
              tab === t.key && "border border-pb-gold-dark bg-gold-gradient-soft text-pb-gold"
            )}
          >
            {t.label} {stats?.counts[t.count] ?? ""}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="light" asChild className="h-[52px] w-[194px] rounded-[4px] text-[18px]">
          <Link href="/alerts">
            <Bell className="size-5" /> Alert Settings
          </Link>
        </Button>
        <Button variant="gold" asChild className="h-[52px] w-[190px] rounded-[4px] text-[18px]">
          <Link href="/dashboard">
            <TrendingUp className="size-5" /> Performance
          </Link>
        </Button>
      </div>
    </div>
  );
}
