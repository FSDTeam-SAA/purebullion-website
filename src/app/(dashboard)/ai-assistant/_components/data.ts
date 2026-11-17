export type ChatItem = { id: string; title: string };

export const todayChats: ChatItem[] = [
  { id: "msft", title: "Why is Microsoft Moving Today?" },
  { id: "msft-aapl", title: "Compare MSFT an AAPL" },
  { id: "semis", title: "Risks in Semiconductors" },
];

export const earlierChats: ChatItem[] = [
  { id: "wrap", title: "Summarize the weekly wrap" },
  { id: "cat", title: "What closed the CAT signal?" },
  { id: "rs", title: "Explain relative strength" },
  { id: "energy", title: "Energy sector breakdown" },
];

export const marketCards = [
  { symbol: "MSFT", change: "+1.19%", price: "$518.36", trend: "up" as const, color: "#27c58a" },
  { symbol: "XLK", change: "+0.76%", price: "$281.44", trend: "up" as const, color: "#27c58a" },
  { symbol: "QQQ", change: "+0.65%", price: "$531.77", trend: "down" as const, color: "#d94f59" },
];

export const sparkData = {
  MSFT: [6, 10, 7, 12, 9, 13, 9, 15, 12, 17, 14, 19],
  XLK: [4, 12, 8, 16, 10, 18, 12, 14, 8, 9, 6, 5],
  QQQ: [10, 4, 12, 3, 16, 17, 9, 12, 7, 13, 6, 8],
};

export const actionChips = ["View signal PB-2480", "MSFT analysis", "Related news"];

export const suggestedPrompts = [
  "What’s happening with the S&P 500 today?",
  "Summarize today’s market news.",
  "Compare Microsoft and Apple.",
];

export const conversationQuotes = [
  { symbol: "MSFT", name: "Microsoft Corp", price: "$518.36", change: "+1.19%", up: true },
  { symbol: "XLK", name: "Technology Select Sector SPDR", price: "$281.44", change: "+0.76%", up: true },
  { symbol: "QQQ", name: "Invesco QQQ Trust", price: "$531.77", change: "+0.65%", up: true },
  { symbol: "AAPL", name: "Apple Inc", price: "$246.18", change: "-0.74%", up: false },
];

export const marketContext = [
  { label: "Market condition", value: "Risk-On" },
  { label: "Breadth", value: "2.1 : 1" },
  { label: "VIX", value: "14.62 (−3.37%)" },
  { label: "Sector rank, tech", value: "2 of 11" },
  { label: "Open signals", value: "5" },
];

export const sourcesUsed = [
  { title: "Market data snapshot", meta: "Sep 19 · 16:00 ET" },
  { title: "Signal PB-2480", meta: "Published Sep 16" },
  { title: "Daily briefing", meta: "Sep 19 · 08:05 ET" },
  { title: "Sector performance", meta: "Sep 19 close" },
];

export const CANNED_REPLY =
  "Here is a quick research view based on the latest Pure Bullion market data snapshot. This is research only — it is not investment advice and I cannot place trades.";
