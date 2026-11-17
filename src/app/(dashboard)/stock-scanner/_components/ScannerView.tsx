"use client";

import { useState } from "react";
import { SummaryTile } from "../../_components/shared";
import { SUMMARY } from "./data";
import { ResultsHeader } from "./ResultsHeader";
import { FiltersPanel } from "./FiltersPanel";
import { SignalsTable } from "./SignalsTable";

export function ScannerView() {
  const [sort, setSort] = useState("Momentum");

  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-6">
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {SUMMARY.map((s) => (
          <SummaryTile key={s.label} {...s} />
        ))}
      </div>

      <section className="rounded-[8px] border border-pb-line bg-[#0b0e0f] p-[17px]">
        <ResultsHeader sort={sort} onSortChange={setSort} />
        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[314px_minmax(0,1fr)]">
          <FiltersPanel />
          <SignalsTable />
        </div>
      </section>
    </div>
  );
}
