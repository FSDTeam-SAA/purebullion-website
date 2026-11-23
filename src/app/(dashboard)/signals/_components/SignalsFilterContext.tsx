"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SignalTab = "NEW" | "OPEN" | "CLOSED";
export type SideFilter = "all" | "BUY" | "SELL";
export type AssetFilter = "all" | "Stock" | "ETF";

type Ctx = {
  tab: SignalTab;
  setTab: (t: SignalTab) => void;
  side: SideFilter;
  setSide: (s: SideFilter) => void;
  asset: AssetFilter;
  setAsset: (a: AssetFilter) => void;
  page: number;
  setPage: (p: number) => void;
};

const SignalsFilterCtx = createContext<Ctx | null>(null);

/** Shared filter state for the signals page: tab/chips/filter bar all drive the same queries. */
export function SignalsFilterProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<SignalTab>("OPEN");
  const [side, setSideState] = useState<SideFilter>("all");
  const [asset, setAssetState] = useState<AssetFilter>("all");
  const [page, setPage] = useState(1);

  const value = useMemo<Ctx>(
    () => ({
      tab,
      setTab,
      side,
      setSide: (s) => {
        setSideState(s);
        setPage(1);
      },
      asset,
      setAsset: (a) => {
        setAssetState(a);
        setPage(1);
      },
      page,
      setPage,
    }),
    [tab, side, asset, page]
  );
  return <SignalsFilterCtx.Provider value={value}>{children}</SignalsFilterCtx.Provider>;
}

export function useSignalsFilters() {
  const ctx = useContext(SignalsFilterCtx);
  if (!ctx) throw new Error("useSignalsFilters must be used inside SignalsFilterProvider");
  return ctx;
}

export const SIDE_OPTIONS: { label: string; value: SideFilter }[] = [
  { label: "All", value: "all" },
  { label: "BUY", value: "BUY" },
  { label: "SELL", value: "SELL" },
];
export const ASSET_OPTIONS: { label: string; value: AssetFilter }[] = [
  { label: "All types", value: "all" },
  { label: "Stock", value: "Stock" },
  { label: "ETF", value: "ETF" },
];
