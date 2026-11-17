export type OpenSignal = {
  id: string;
  side: "BUY" | "SELL";
  ticker: string;
  company: string;
  entry: string;
  target: string;
  stop: string;
  progress: string;
  progressPct: number;
  opened: string;
  rr: string;
  confidence: string;
  hold: string;
  rationale: string;
};

const R1 =
  "Price cleared a six-session consolidation on 1.9x average volume while relative strength versus the S&P 500 made a new 20-day high. Momentum, trend and volume conditions aligned at the close.";

export const openSignals: OpenSignal[] = [
  { id: "PB-2481", side: "BUY", ticker: "NVDA", company: "NVIDIA Corp", entry: "$180.80", target: "$194.00", stop: "$175.40", progress: "+0.90% from entry", progressPct: 9, opened: "Sep 18, 2026 · 10:14 ET", rr: "1 : 2.44", confidence: "High", hold: "3–10 sessions", rationale: R1 },
  { id: "PB-2480", side: "BUY", ticker: "MSFT", company: "Microsoft Corp", entry: "$509.40", target: "$538.00", stop: "$496.20", progress: "+1.76% from entry", progressPct: 9, opened: "Sep 16, 2026 · 09:52 ET", rr: "1 : 2.17", confidence: "High", hold: "5–15 sessions", rationale: R1 },
  { id: "PB-2480", side: "BUY", ticker: "AVGO", company: "Broadcom Inc", entry: "$388.10", target: "$412.00", stop: "$378.00", progress: "+2.71% from entry", progressPct: 9, opened: "Sep 15, 2026 · 14:31 ET", rr: "1 : 2.37", confidence: "Moderate", hold: "3–10 sessions", rationale: "Momentum extension confirmed after an earnings gap held above the gap floor for five sessions. Risk is defined just beneath the gap boundary." },
];

export type SignalRow = {
  id: string;
  side: "BUY" | "SELL";
  ticker: string;
  company: string;
  entry: string;
  target: string;
  stop: string;
  last: string;
  ret: string;
  rr: string;
  status: "Active" | "Closed";
  date: string;
};

const row = (id: string, side: "BUY" | "SELL", ticker: string, company: string, ret: string, rr: string, status: "Active" | "Closed", date: string, n: Partial<SignalRow> = {}): SignalRow => ({
  id, side, ticker, company, entry: "$180.80", target: "$194.00", stop: "$175.40", last: "$182.42", ret, rr, status, date, ...n,
});

export const signalRows: SignalRow[] = [
  row("PB-2481", "BUY", "NVDA", "NVIDIA C…", "+0.90%", "1:2.44", "Active", "Sep 18, 2026"),
  row("PB-2480", "BUY", "MSFT", "Microsoft…", "+1.76%", "1:2.17", "Active", "Sep 16, 2026", { entry: "$509.40", target: "$538.00", stop: "$496.20", last: "$518.36" }),
  row("PB-2479", "BUY", "AVGO", "Broadcom…", "+2.71%", "1:2.37", "Active", "Sep 15, 2026"),
  row("PB-2479", "BUY", "AVGO", "Broadcom…", "+2.71%", "1:2.37", "Active", "Sep 15, 2026"),
  row("PB-2478", "BUY", "JPM", "JPMorgan…", "+2.44%", "1:2.22", "Active", "Sep 12, 2026"),
  row("PB-2478", "BUY", "JPM", "JPMorgan…", "+2.44%", "1:2.22", "Active", "Sep 12, 2026"),
  row("PB-2477", "SELL", "META", "Meta Platf…", "+2.14%", "1:2.44", "Closed", "Sep 11, 2026"),
  row("PB-2477", "SELL", "META", "Meta Platf…", "+2.14%", "1:2.44", "Closed", "Sep 11, 2026"),
  row("PB-2473", "BUY", "CAT", "Caterpillar…", "+5.73%", "1:2.25", "Closed", "Sep 10, 2026"),
  row("PB-2473", "BUY", "CAT", "Caterpillar…", "+5.73%", "1:2.25", "Closed", "Sep 10, 2026"),
];
