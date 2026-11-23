"use client";

import { useRef, useState } from "react";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { TablePagination } from "../../_components/shared";
import { buildPageList } from "@/lib/page-list";
import { useAlertsList, useMarkAlertRead, useMarkAllAlertsRead } from "@/hooks/useAlerts";
import { AlertRow } from "./AlertRow";
import { AlertTabs } from "./AlertTabs";
import { FeaturedSignal } from "./FeaturedSignal";
import { SettingsPanel } from "./SettingsPanel";
import type { TabKey } from "./data";

const LIMIT = 9;

export function AlertsView() {
  const [tab, setTab] = useState<TabKey>("all");
  const [page, setPage] = useState(1);
  const settingsRef = useRef<HTMLElement>(null);

  const { data, isLoading, isError, refetch } = useAlertsList(tab, page, LIMIT);
  const markAll = useMarkAllAlertsRead();
  const markRead = useMarkAlertRead();

  const alerts = data?.data.alerts ?? [];
  const info = data?.data.paginationInfo;
  const totalPages = data?.meta?.totalPages ?? 1;

  const featured =
    page === 1 && (tab === "all" || tab === "signals")
      ? alerts.find((a) => a.isHighlighted && a.type === "new_signal")
      : undefined;
  const rows = featured ? alerts.filter((a) => a._id !== featured._id) : alerts;

  return (
    <div className="flex flex-col gap-6 p-6">
      <AlertTabs
        counts={data?.data.tabCounts}
        active={tab}
        onChange={(k) => {
          setTab(k);
          setPage(1);
        }}
        onMarkAllRead={() => markAll.mutate()}
        onOpenSettings={() => settingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
      <div className="flex flex-col gap-6 lg:-mt-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 bg-pb-head">
          {isLoading ? (
            <PanelLoading rows={6} />
          ) : isError ? (
            <PanelError message="Could not load alerts." onRetry={() => refetch()} />
          ) : alerts.length === 0 ? (
            <PanelEmpty>No alerts here yet.</PanelEmpty>
          ) : (
            <>
              {featured && <FeaturedSignal alert={featured} />}
              {rows.map((a) => (
                <AlertRow key={a._id} a={a} onRead={(id) => markRead.mutate(id)} />
              ))}
            </>
          )}
          <TablePagination
            from={info?.from ?? 0}
            to={info?.to ?? 0}
            total={info?.total ?? 0}
            page={page}
            pages={buildPageList(page, totalPages)}
            onPageChange={(p) => setPage(Math.min(totalPages, Math.max(1, p)))}
            className="px-6"
          />
        </div>
        <SettingsPanel panelRef={settingsRef} />
      </div>
    </div>
  );
}
