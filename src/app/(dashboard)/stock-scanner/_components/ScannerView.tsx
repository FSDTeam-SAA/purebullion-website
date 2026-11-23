"use client";

import { useState } from "react";
import { SummaryTile } from "../../_components/shared";
import { useDeletePreset, useSavePreset, useScanResults, useScannerPresets, useScannerStats } from "@/hooks/useStockScanner";
import type { ScannerPreset } from "@/services/stockScanner.service";
import { defaultFilterState, fromApiFilters, toApiFilters, type FilterState } from "./data";
import { ResultsHeader } from "./ResultsHeader";
import { FiltersPanel } from "./FiltersPanel";
import { SignalsTable } from "./SignalsTable";
import { SavePresetModal } from "./SavePresetModal";

const PAGE_SIZE = 10;

export function ScannerView() {
  const [sort, setSort] = useState("Momentum");
  const [draft, setDraft] = useState<FilterState>(defaultFilterState);
  const [applied, setApplied] = useState<FilterState>(defaultFilterState);
  const [page, setPage] = useState(1);
  const [saveOpen, setSaveOpen] = useState(false);

  const { data: stats } = useScannerStats();
  const scan = useScanResults({ ...toApiFilters(applied), sort, page, limit: PAGE_SIZE });
  const { data: presets } = useScannerPresets();
  const savePreset = useSavePreset();
  const deletePreset = useDeletePreset();

  const apply = () => {
    setApplied(draft);
    setPage(1);
    scan.refetch();
  };

  const applyPreset = (p: ScannerPreset) => {
    const next = fromApiFilters(p.filters as Record<string, unknown>);
    setDraft(next);
    setApplied(next);
    setPage(1);
  };

  const summary = [
    { label: "Securities scanned", value: stats ? stats.securitiesScanned.toLocaleString("en-US") : "—" },
    { label: "Matches", value: stats ? String(stats.matches) : "—" },
    { label: "New since open", value: stats ? String(stats.newSinceOpen) : "—" },
    { label: "Last run", value: stats?.lastRun ?? "—" },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-6">
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {summary.map((s) => (
          <SummaryTile key={s.label} {...s} />
        ))}
      </div>

      <section className="rounded-[8px] border border-pb-line bg-[#0b0e0f] p-[17px]">
        <ResultsHeader
          sort={sort}
          onSortChange={(v) => {
            setSort(v);
            setPage(1);
          }}
          onRun={apply}
          running={scan.isFetching}
          onSavePreset={() => setSaveOpen(true)}
          presets={presets}
          onApplyPreset={applyPreset}
          onDeletePreset={(id) => deletePreset.mutate(id)}
        />
        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[314px_minmax(0,1fr)]">
          <FiltersPanel value={draft} onChange={setDraft} onApply={apply} />
          <SignalsTable
            result={scan.data}
            isLoading={scan.isLoading}
            error={scan.isError ? (scan.error as Error) : null}
            onRetry={() => scan.refetch()}
            page={page}
            onPageChange={setPage}
          />
        </div>
      </section>

      <SavePresetModal
        open={saveOpen}
        onOpenChange={setSaveOpen}
        saving={savePreset.isPending}
        onSave={(name) =>
          savePreset.mutate(
            { name, filters: toApiFilters(draft) },
            { onSuccess: () => setSaveOpen(false) }
          )
        }
      />
    </div>
  );
}
