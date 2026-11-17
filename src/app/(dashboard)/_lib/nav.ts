export type NavItem = {
  name: string;
  href: string;
  icon: string; // /public/icons/nav/*.svg
  badge?: string;
  gold?: boolean;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ name: "Dashboard", href: "/dashboard", icon: "dashboard" }],
  },
  {
    title: "MARKET INTELLIGENCE",
    items: [
      { name: "Market Data", href: "/market-data", icon: "market-data" },
      { name: "Stock Scanner", href: "/stock-scanner", icon: "stock-scanner" },
      { name: "Signals", href: "/signals", icon: "signals", badge: "01" },
      { name: "Watchlist", href: "/watchlist", icon: "watchlist" },
      { name: "AI Assistant", href: "/ai-assistant", icon: "ai-assistant" },
    ],
  },
  {
    title: "RESEARCH & COMMUNITY",
    items: [
      { name: "News & Research", href: "/news-research", icon: "news-research" },
      { name: "Community", href: "/community", icon: "community" },
    ],
  },
  {
    title: "ACTIVITY",
    items: [{ name: "Alerts", href: "/alerts", icon: "alerts", badge: "01" }],
  },
  {
    title: "ACCOUNTS",
    items: [
      { name: "Subscription", href: "/subscription", icon: "subscription", gold: true },
      { name: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];

export const GREETING_SUBTITLE =
  "Five signals open · three setups approaching trigger · one closed since your last visit";

export type PageHeading = { title: string; subtitle: string };

/** Top-nav heading per route. `null` title => time-of-day greeting. */
export const PAGE_HEADINGS: { match: (path: string) => boolean; heading: PageHeading | null }[] = [
  {
    match: (p) => p === "/signals",
    heading: { title: "Signals", subtitle: "Every signal published by the model, with the full outcome record" },
  },
  {
    match: (p) => p === "/stock-scanner",
    heading: {
      title: "Stock scanner",
      subtitle: "512 securities screened continuously — 502 S&P 500 constituents and 10 liquid ETFs",
    },
  },
  {
    match: (p) => p === "/ai-assistant",
    heading: {
      title: "AI Assistant",
      subtitle: "Your Personal Market Research Partner. Get Insights, analyze data, and make more informed decisions.",
    },
  },
  {
    match: (p) => p === "/subscription",
    heading: { title: "Subscription", subtitle: "Plan, billing and payment history" },
  },
  {
    match: (p) => p === "/settings",
    heading: { title: "Account", subtitle: "Profile, security, notifications and privacy" },
  },
  {
    match: (p) => p === "/alerts",
    heading: {
      title: "Alerts",
      subtitle: "3 unread · signals, market conditions, community and announcements",
    },
  },
];
