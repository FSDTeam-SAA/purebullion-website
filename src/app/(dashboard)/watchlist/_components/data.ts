export type Signal = "Buy setup" | "Hold" | "Sell";
export type MarketCondition = "Risk On" | "Risk Off";

export type WatchRow = {
  ticker: string;
  company: string;
  price: string;
  change: string;
  volume: string;
  market: MarketCondition;
  signal: Signal;
  spark: number[];
};

const A = [6, 7, 5, 8, 7, 9, 8, 10, 9, 11, 10, 12, 14, 13, 18, 22, 28, 34];
const B = [8, 9, 6, 8, 7, 10, 9, 8, 11, 10, 12, 11, 13, 15, 14, 20, 26, 34];
const C = [5, 7, 6, 9, 7, 8, 11, 9, 10, 12, 10, 13, 12, 15, 17, 16, 24, 34];

export const SUMMARY = [
  { label: "Tickers tracked", value: "6,021.13" },
  { label: "With open signals", value: "9" },
  { label: "Up today", value: "2" },
  { label: "Average move", value: "+0.84%" },
];

export const WATCH_ROWS: WatchRow[] = [
  { ticker: "NVDA", company: "NVIDIA Crop", price: "$182.42", change: "+2.80%", volume: "214.8 M", market: "Risk On", signal: "Buy setup", spark: A },
  { ticker: "AAPL", company: "Apple Inc.", price: "$150.25", change: "+1.45%", volume: "89.5 M", market: "Risk Off", signal: "Hold", spark: B },
  { ticker: "AMZN", company: "Amazon.com Inc.", price: "$120.75", change: "+0.50%", volume: "107.2 M", market: "Risk On", signal: "Buy setup", spark: C },
  { ticker: "TSLA", company: "Tesla Inc.", price: "$225.05", change: "+3.20%", volume: "50.3 M", market: "Risk On", signal: "Buy setup", spark: B },
  { ticker: "GOOGL", company: "Alphabet Inc.", price: "$2768.75", change: "-1.10%", volume: "1.5 M", market: "Risk Off", signal: "Sell", spark: A },
  { ticker: "AMD", company: "Advanced Micro Devices", price: "$103.15", change: "+3.50%", volume: "29.1 M", market: "Risk On", signal: "Buy setup", spark: C },
  { ticker: "DIS", company: "The Walt Disney Company", price: "$121.40", change: "-0.75%", volume: "16.8 M", market: "Risk Off", signal: "Sell", spark: A },
];

export type Suggestion = {
  ticker: string;
  company: string;
  change: string;
  price: string;
  volume: string;
};

export const SUGGESTIONS: Suggestion[] = [
  { ticker: "AVGO", company: "Broadcom Inc", change: "+1.97%", price: "$180.80", volume: "21.4 M" },
  { ticker: "UNH", company: "UnitedHealth Grp", change: "+1.27%", price: "$509.40", volume: "3.2 M" },
  { ticker: "CAT", company: "Caterpillar Inc", change: "+1.16%", price: "$180.80", volume: "2.9 M" },
  { ticker: "LLY", company: "Eli Lilly & Co", change: "-0.71%", price: "$780.10", volume: "2.4 M" },
];

export const TABS = ["All", "With signal", "Movers"] as const;
export type Tab = (typeof TABS)[number];
