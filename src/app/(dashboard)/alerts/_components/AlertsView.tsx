"use client";

import { useMemo, useRef, useState } from "react";
import { TablePagination } from "../../_components/shared";
import { AlertRow } from "./AlertRow";
import { AlertTabs } from "./AlertTabs";
import { FeaturedSignal } from "./FeaturedSignal";
import { SettingsPanel } from "./SettingsPanel";
import { initialAlerts, type TabKey } from "./data";

export function AlertsView() {
  const [tab, setTab] = useState<TabKey>("all");
  const [alerts, setAlerts] = useState(initialAlerts);
  const [page, setPage] = useState(1);
  const settingsRef = useRef<HTMLElement>(null);

  const visible = useMemo(() => alerts.filter((a) => tab === "all" || a.category === tab), [alerts, tab]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <AlertTabs
        active={tab}
        onChange={setTab}
        onMarkAllRead={() => setAlerts((l) => l.map((a) => ({ ...a, unread: false })))}
        onOpenSettings={() => settingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
      <div className="flex flex-col gap-6 lg:-mt-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 bg-pb-head">
          {(tab === "all" || tab === "signals") && <FeaturedSignal />}
          {visible.map((a) => (
            <AlertRow key={a.id} a={a} />
          ))}
          <TablePagination from={1} to={9} total={120} page={page} onPageChange={(p) => setPage(Math.min(17, p))} className="px-6" />
        </div>
        <SettingsPanel panelRef={settingsRef} />
      </div>
    </div>
  );
}
