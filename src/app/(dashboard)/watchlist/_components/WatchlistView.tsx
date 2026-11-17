"use client";

import { useState } from "react";
import { SummaryTile } from "../../_components/shared";
import { SUMMARY, SUGGESTIONS, WATCH_ROWS, type Suggestion, type WatchRow } from "./data";
import { TitleRow } from "./TitleRow";
import { ResultsTable } from "./ResultsTable";
import { AddTickerModal } from "./modals/AddTickerModal";

export function WatchlistView() {
  const [rows, setRows] = useState<WatchRow[]>(WATCH_ROWS);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(SUGGESTIONS);

  const add = (s: Suggestion) => {
    const up = !s.change.startsWith("-");
    setRows((r) => [
      ...r,
      {
        ticker: s.ticker,
        company: s.company,
        price: s.price,
        change: s.change,
        volume: s.volume,
        market: up ? "Risk On" : "Risk Off",
        signal: up ? "Buy setup" : "Sell",
        spark: WATCH_ROWS[up ? 2 : 4].spark,
      },
    ]);
    setSuggestions((list) => list.filter((x) => x.ticker !== s.ticker));
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <TitleRow count={rows.length} onAdd={() => setOpen(true)} />
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {SUMMARY.map((s) => (
          <SummaryTile key={s.label} {...s} />
        ))}
      </div>
      <ResultsTable rows={rows} />
      <AddTickerModal open={open} onOpenChange={setOpen} suggestions={suggestions} onAdd={add} />
    </div>
  );
}
