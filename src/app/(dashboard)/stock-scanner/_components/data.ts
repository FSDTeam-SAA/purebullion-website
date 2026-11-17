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

export const SUMMARY = [
  { label: "Securities scanned", value: "6,021.13" },
  { label: "Matches", value: "9" },
  { label: "New since open", value: "2" },
  { label: "Last run", value: "16:00:04 ET" },
];

export const SORT_OPTIONS = ["Momentum", "Liquidity", "Change", "Price"];

export type Momentum = "Strong" | "Neutral" | "Weak";
export type SignalSetup = "Buy setup" | "Open Signal" | "Watch" | "Hold";

export type ScanRow = {
  id: string;
  company: string;
  ticker: string;
  price: string;
  change: string;
  momentum: Momentum;
  liquidity: string;
  risk: string;
  setup: string;
  signal: SignalSetup;
};

const r = (
  id: string,
  company: string,
  ticker: string,
  price: string,
  change: string,
  momentum: Momentum,
  risk: string,
  setup: string,
  signal: SignalSetup
): ScanRow => ({ id, company, ticker, price, change, momentum, liquidity: "High", risk, setup, signal });

const BO = "Breakout continuation";
const PB = "Pull back to 30-DMA";
const RC = "Range compression";

export const SCAN_ROWS: ScanRow[] = [
  r("PB-2481", "NVIDIA Corp", "NVDA", "$180.80", "+2.80%", "Strong", "Moderate", BO, "Buy setup"),
  r("PB-2480", "Microsoft Corp", "MSFT", "$509.40", "+2.80%", "Strong", "Moderate", BO, "Buy setup"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+2.80%", "Strong", "High", BO, "Buy setup"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+2.80%", "Strong", "High", BO, "Buy setup"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+2.80%", "Strong", "High", BO, "Buy setup"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2479", "Broadcom Inc", "AVGO", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2478", "JPMorgan Chase", "JPM", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2478", "JPMorgan Chase", "JPM", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2478", "JPMorgan Chase", "JPM", "$180.80", "+4.10%", "Strong", "High", PB, "Open Signal"),
  r("PB-2478", "JPMorgan Chase", "JPM", "$180.80", "+4.10%", "Strong", "Medium", RC, "Open Signal"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Uptrend", "Watch"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Uptrend", "Watch"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Uptrend", "Watch"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Trend continuation", "Watch"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Trend continuation", "Watch"),
  r("PB-2477", "Meta Platforms", "META", "$180.80", "+2.00%", "Neutral", "Medium", "Trend continuation", "Watch"),
  r("PB-2473", "Caterpillar Inc", "CAT", "$180.80", "+2.00%", "Neutral", "Low", RC, "Hold"),
  r("PB-2473", "Caterpillar Inc", "CAT", "$180.80", "+3.20%", "Weak", "Low", "Base breakout", "Hold"),
  r("PB-2473", "Caterpillar Inc", "CAT", "$180.80", "+3.20%", "Weak", "Low", "Base breakout", "Hold"),
  r("PB-2473", "Caterpillar Inc", "CAT", "$180.80", "+3.20%", "Weak", "Low", "Base breakout", "Hold"),
];
