export type FilterGroup = {
  key: string;
  label: string;
  options: string[];
  /** options selected by default */
  selected: string[];
  /** show "Any" chip first */
  hasAny?: boolean;
};

export const FILTER_GROUPS: FilterGroup[] = [
  { key: "market", label: "Market Condition", options: ["Risk-On", "Neutral", "Risk-Off"], selected: ["Risk-On"], hasAny: true },
  { key: "price", label: "Price Behavior", options: ["Breakout", "Pullback", "Reversal", "Range"], selected: ["Breakout"], hasAny: true },
  { key: "liquidity", label: "Liquidity", options: ["High", "Medium"], selected: ["High"], hasAny: true },
  { key: "momentum", label: "Momentum", options: ["Strong", "Improving", "Weak"], selected: ["Strong"], hasAny: true },
  { key: "technical", label: "Technical Condition", options: ["Above 20-DMA", "Above 50-DMA", "RS new high"], selected: ["Above 20-DMA"], hasAny: true },
];

export const ENTRY_GROUP: FilterGroup = {
  key: "entry",
  label: "Entry Condition",
  options: ["Retest hold", "Gap hold", "Level reclaim"],
  selected: ["Gap hold"],
  hasAny: true,
};

export const EXIT_GROUP: FilterGroup = {
  key: "exit",
  label: "Exit Condition",
  options: ["Target / stop", "+ time stop", "+ RS deterioration"],
  selected: ["+ RS deterioration"],
};

export const RISK_REWARD_OPTIONS = ["1 : 1.50", "1 : 1.80", "2 : 1.00", "1 : 2.50"];

export const SORT_OPTIONS = ["Momentum", "Liquidity", "Change", "Price"];


/** group key -> API query key */
export const API_KEY: Record<string, string> = {
  market: "marketCondition",
  price: "priceBehavior",
  liquidity: "liquidity",
  momentum: "momentum",
  technical: "technicalCondition",
  entry: "entryCondition",
  exit: "exitCondition",
};

export const ALL_GROUPS: FilterGroup[] = [...FILTER_GROUPS, ENTRY_GROUP, EXIT_GROUP];

export type FilterState = { sel: Record<string, string[]>; stop: number; rr: string };

export const defaultFilterState = (): FilterState => ({
  sel: Object.fromEntries(ALL_GROUPS.map((g) => [g.key, [...g.selected]])),
  stop: 6,
  rr: "1 : 1.80",
});

/** Multi-select chips -> comma-separated API values (omitted = Any). */
export function toApiFilters(f: FilterState) {
  const out: Record<string, string | number> = {};
  for (const g of ALL_GROUPS) {
    const v = f.sel[g.key] ?? [];
    if (v.length) out[API_KEY[g.key]] = v.join(",");
  }
  out.maxStopDistance = f.stop;
  out.minRiskReward = f.rr;
  return out;
}

/** Saved preset filters -> chip state. */
export function fromApiFilters(filters: Record<string, unknown>): FilterState {
  const base = defaultFilterState();
  const sel: Record<string, string[]> = {};
  for (const g of ALL_GROUPS) {
    const raw = filters[API_KEY[g.key]];
    sel[g.key] =
      typeof raw === "string" && raw && raw !== "Any" ? raw.split(",").map((x) => x.trim()).filter(Boolean) : [];
  }
  return {
    sel,
    stop: typeof filters.maxStopDistance === "number" ? filters.maxStopDistance : base.stop,
    rr: typeof filters.minRiskReward === "string" ? filters.minRiskReward : base.rr,
  };
}
