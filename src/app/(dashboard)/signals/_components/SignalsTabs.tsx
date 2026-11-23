"use client";

import { cn } from "@/lib/utils";
import { useSignalStats } from "@/hooks/useSignals";
import { useSignalsFilters, type SignalTab } from "./SignalsFilterContext";

const TABS: { key: SignalTab; k: string; count: "new" | "open" | "closed" }[] = [
  { key: "NEW", k: "New", count: "new" },
  { key: "OPEN", k: "Open", count: "open" },
  { key: "CLOSED", k: "Closed", count: "closed" },
];

export function SignalsTabs() {
  const { tab, setTab } = useSignalsFilters();
  const { data: stats } = useSignalStats();
  return (
    <div className="mt-4 flex gap-8 border-b border-pb-line px-0 pb-3">
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => setTab(t.key)}
          className={cn("text-[16px] font-medium", tab === t.key ? "text-pb-gold" : "text-pb-text")}
        >
          {t.k} <span className="ml-1 text-[14px]">{stats?.counts[t.count] ?? ""}</span>
        </button>
      ))}
    </div>
  );
}
