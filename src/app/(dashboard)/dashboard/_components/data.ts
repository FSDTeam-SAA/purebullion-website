export type Side = "BUY" | "SELL";

export const indexTiles = [
  { label: "S&P 500", value: "6,412.88", change: "+0.45%", trend: "up" },
  { label: "NASDAQ", value: "21,877.30", change: "+0.66%", trend: "up" },
  { label: "DOW", value: "46,219.05", change: "-0.19%", trend: "down" },
  { label: "RUSSELL 2000", value: "2,488.71", change: "+0.45%", trend: "up" },
  { label: "VIX", value: "14.62", change: "-3.37%", trend: "down" },
] as const;

export const briefing = {
  updated: "Updated 15 mins ago",
  title: "Breadth improves as megacap leadership broadens into industrials",
  body: "Advancers outpaced decliners by nearly two to one, and for the first time in three weeks the equal-weight index outperformed the cap-weighted benchmark. Industrials led at +1.42% with participation spread across 62% of the sector rather than concentrated in four or five names.",
  chips: [
    { label: "Breadth", value: "2.1 : 1", tone: "green" },
    { label: "Sector leader", value: "Industrials +1.42%", tone: "green" },
    { label: "Laggard", value: "Energy −1.13%", tone: "red" },
  ],
} as const;

export const approaching: { side: Side; ticker: string; note: string; trigger: string; distance: string }[] = [
  { side: "BUY", ticker: "COST", note: "Target reached", trigger: "$931.00", distance: "0.96%" },
  { side: "BUY", ticker: "LLY", note: "Eli Lilly & Co", trigger: "$874.00", distance: "1.42%" },
  { side: "SELL", ticker: "XLF", note: "Financial Select SPDR", trigger: "$55.40", distance: "0.87%" },
  { side: "BUY", ticker: "UNH", note: "Closed on exit rule", trigger: "$55.40", distance: "0.87%" },
];

export const openSignals = [
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", stop: "$175.40", last: "$182.42", from: "+0.90%", progress: 6, opened: "Sep 18, 2026" },
  { ticker: "MSFT", name: "Microsoft Corp", entry: "$509.40", stop: "$496.20", last: "$518.36", from: "+1.76%", progress: 38, opened: "Sep 16, 2026" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", stop: "$175.40", last: "$182.42", from: "+2.71%", progress: 62, opened: "Sep 15, 2026" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", stop: "$175.40", last: "$182.42", from: "+2.44%", progress: 85, opened: "Sep 12, 2026" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", stop: "$175.40", last: "$182.42", from: "+2.14%", progress: 100, opened: "Sep 11, 2026" },
];

export const newSignals = [
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", rr: "1:2.44" },
  { ticker: "MSFT", name: "Microsoft Corp", entry: "$509.40", target: "$538.00", stop: "$496.20", last: "$518.36", rr: "1:2.44" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", rr: "1:2.44" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", rr: "1:2.44" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", rr: "1:2.44" },
  { ticker: "NVDA", name: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", rr: "1:2.44" },
];

export const watchlist: {
  ticker: string; name: string; price: string; change: string; volume: string;
  signal: "BUY Setup" | "Open Signal" | "Watching"; spark: number[];
}[] = [
  { ticker: "NVDA", name: "NVIDIA Corp", price: "$182.42", change: "+2.80%", volume: "214.8M", signal: "BUY Setup", spark: [10, 12, 9, 14, 11, 16, 13, 15, 18, 20, 24, 30, 36] },
  { ticker: "MSFT", name: "Microsoft Corp", price: "$518.36", change: "+1.19%", volume: "22.4M", signal: "Open Signal", spark: [8, 10, 7, 13, 10, 12, 15, 14, 17, 21, 26, 32, 38] },
  { ticker: "AAPL", name: "Microsoft Corp", price: "$246.18", change: "-0.74%", volume: "48.9M", signal: "Watching", spark: [10, 8, 12, 9, 11, 14, 12, 16, 18, 17, 22, 28, 34] },
  { ticker: "AMZN", name: "Apple Inc", price: "$238.04", change: "-0.74%", volume: "48.9M", signal: "BUY Setup", spark: [6, 9, 7, 11, 9, 13, 10, 15, 17, 20, 25, 31, 36] },
  { ticker: "JPM", name: "Amazon.com Inc", price: "$312.55", change: "+1.18%", volume: "38.2M", signal: "Open Signal", spark: [9, 11, 8, 12, 10, 15, 13, 14, 19, 22, 24, 30, 35] },
];

export const recentlyClosed: { side: Side; ticker: string; note: string; held: string; result: string }[] = [
  { side: "BUY", ticker: "CAT", note: "Target reached", held: "9 sessions", result: "+5.73%" },
  { side: "BUY", ticker: "UNH", note: "Closed on exit rule", held: "11 sessions", result: "+3.25%" },
  { side: "SELL", ticker: "XLE", note: "Target reached", held: "11 sessions", result: "+3.94%" },
  { side: "BUY", ticker: "UNH", note: "Closed on exit rule", held: "11 sessions", result: "+3.25%" },
];
