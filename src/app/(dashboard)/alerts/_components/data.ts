export type AlertCategory = "signals" | "market" | "community" | "announcements";
export type AlertIcon = "chart" | "trend" | "message" | "bell";

export type AlertItem = {
  id: string;
  category: AlertCategory;
  icon: AlertIcon;
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
};

export const tabs = [
  { key: "all", label: "All", count: 8 },
  { key: "signals", label: "Signals", count: 4 },
  { key: "market", label: "Market", count: 2 },
  { key: "community", label: "Community", count: 1 },
  { key: "announcements", label: "Announcements", count: 1 },
] as const;
export type TabKey = (typeof tabs)[number]["key"];

export const featuredSignal = {
  label: "NEW SIGNAL",
  time: "14 min ago",
  company: "Microsoft (MSFT)",
  metrics: [
    { label: "ENTRY", value: "$509.40", color: "text-pb-text" },
    { label: "TARGET", value: "$538.00", color: "text-pb-up" },
    { label: "STOP LOSS", value: "$496.20", color: "text-[#d94f59]" },
  ],
  chips: ["BUY", "Open signal", "MSFT analysis"],
};

const riskOn = { title: "Market condition changed to Risk-On", detail: "Breadth, trend and volatility conditions all improved at the close" };
const cat = { title: "Signal closed: Caterpillar (CAT)", detail: "Target reached · +5.73% from entry over 9 sessions" };
const rina = { title: "Rina K. replied to your post", detail: "“That matches what I’m seeing on the equal-weight comparison…”" };
const scanner = { title: "Scanner update: two new exit conditions", detail: "Volatility expansion and relative-strength deterioration are now available" };

export const initialAlerts: AlertItem[] = [
  { id: "a1", category: "signals", icon: "chart", title: "Signal approaching entry: Costco (COST)", detail: "BUY trigger at $931.00 — currently 0.96% away", time: "38 min ago", unread: true },
  { id: "a2", category: "market", icon: "trend", ...riskOn, time: "2h ago", unread: true },
  { id: "a3", category: "market", icon: "trend", ...riskOn, time: "2h ago", unread: true },
  { id: "a4", category: "signals", icon: "chart", ...cat, time: "4h ago" },
  { id: "a5", category: "signals", icon: "chart", ...cat, time: "4h ago" },
  { id: "a6", category: "community", icon: "message", ...rina, time: "6h ago" },
  { id: "a7", category: "community", icon: "message", ...rina, time: "6h ago" },
  { id: "a8", category: "market", icon: "trend", title: "Watchlist mover: NVDA +2.80%", detail: "Volume running 1.9x the 30-day average", time: "7h ago" },
  { id: "a9", category: "announcements", icon: "bell", ...scanner, time: "Yesterday" },
  { id: "a10", category: "announcements", icon: "bell", ...scanner, time: "Yesterday" },
  { id: "a11", category: "announcements", icon: "bell", ...scanner, time: "Yesterday" },
  { id: "a12", category: "signals", icon: "chart", title: "Signal closed: UnitedHealth (UNH)", detail: "Closed on exit rule · +3.25% over 11 sessions", time: "2d ago" },
];

export type ToggleSetting = { key: string; label: string; on: boolean; soon?: boolean };

export const notificationSettings: ToggleSetting[] = [
  { key: "new-signals", label: "New signals", on: true },
  { key: "proximity", label: "Signal proximity", on: true },
  { key: "closed", label: "Signal closed", on: true },
  { key: "market", label: "Market condition change", on: true },
  { key: "watchlist", label: "Watchlist movers", on: false },
  { key: "community", label: "Community replies", on: true },
  { key: "announcements", label: "Announcements", on: true },
  { key: "weekly", label: "Weekly wrap email", on: false },
];

export const channelSettings: ToggleSetting[] = [
  { key: "in-platform", label: "In-platform", on: false },
  { key: "email", label: "Email", on: false },
  { key: "push", label: "Browser push", on: false },
  { key: "sms", label: "SMS", on: false, soon: true },
];
