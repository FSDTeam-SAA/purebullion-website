"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PanelEmpty, PanelError, PanelLoading, SideTag } from "../../_components/shared";
import { useSignalList } from "@/hooks/useSignals";
import type { Signal } from "@/services/signals.service";
import { fmtDate, fmtPct, fmtPrice } from "@/lib/format";
import { useSignalsFilters } from "./SignalsFilterContext";

function Price({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] uppercase text-pb-text">{label}</span>
      <span className={`text-[24px] ${tone}`}>{value}</span>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] text-pb-muted">{label}</span>
      <span className="text-[14px] font-semibold text-pb-text">{value}</span>
    </div>
  );
}

function SignalCard({ s }: { s: Signal }) {
  const progressPct = Math.min(100, Math.max(0, s.progressToTarget ?? 0));
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-[8px] border border-pb-line bg-pb-card">
      <header className="flex items-start justify-between border-b border-pb-line p-4 pb-3">
        <div className="flex items-center gap-4">
          <SideTag side={s.type} className="px-2 py-[7px]" />
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-semibold text-pb-text">{s.symbol}</span>
            <span className="text-[12px] text-pb-muted">{s.companyName}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-[2px] border border-pb-gold-dark px-2 py-0.5 text-[12px] text-pb-gold">{s.status === "Active" ? "OPEN" : s.status}</span>
          <span className="text-[12px] text-pb-muted">{s.signalId}</span>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4 border-b border-pb-line px-3 py-4">
        <Price label="Entry" value={fmtPrice(s.entry)} tone="text-pb-text" />
        <Price label="Target" value={fmtPrice(s.target)} tone="text-pb-up" />
        <Price label="Stop loss" value={fmtPrice(s.stopLoss)} tone="text-pb-down" />
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-pb-text">Progress to target</span>
          <span className="text-[16px] text-pb-up">{fmtPct(s.returnPct)} from entry</span>
        </div>
        <div className="mt-3 h-1 rounded-full bg-pb-surface">
          <div className="h-1 rounded-full bg-pb-up" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-4 pb-4 pt-5">
        <Meta label="Opened" value={fmtDate(s.openedAt)} />
        <Meta label="Risk / reward" value={s.riskReward ?? "—"} />
        <Meta label="Confidence" value={s.confidence ?? "—"} />
        <Meta label="Typical hold" value={s.typicalHold ?? "—"} />
      </div>
      <div className="px-4 pb-4 pt-2">
        <p className="text-[12px] uppercase text-pb-muted">Signal rationale</p>
        <p className="mt-3 text-[13px] leading-[18px] text-pb-muted">{s.signalRationale}</p>
      </div>
      <footer className="mt-auto flex items-center justify-between border-t border-pb-line px-4 py-3">
        <Link href={`/signals/${s.signalId}`} className="text-[13px] font-semibold text-pb-gold">
          Open full signal detail
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="outline-white" className="h-8 rounded-[4px] border-pb-line bg-pb-surface px-4 text-[13px]">
            <Link href={`/stock-scanner/${s.symbol}`}>Analysis</Link>
          </Button>
          <Button asChild variant="outline-white" className="h-8 rounded-[4px] border-pb-line bg-pb-surface px-4 text-[13px]">
            <Link href="/ai-assistant">Ask AI</Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}

export function OpenSignalCards() {
  const { tab, side, asset } = useSignalsFilters();
  const { data, isLoading, isError, error, refetch } = useSignalList({
    status: tab,
    type: side,
    assetType: asset,
    limit: 3,
  });
  if (isLoading) return <PanelLoading rows={3} />;
  if (isError) return <PanelError message={(error as Error)?.message} onRetry={() => refetch()} />;
  if (!data?.signals.length) return <PanelEmpty>No signals match the current filters.</PanelEmpty>;
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {data.signals.map((s) => (
        <SignalCard key={s._id} s={s} />
      ))}
    </div>
  );
}
