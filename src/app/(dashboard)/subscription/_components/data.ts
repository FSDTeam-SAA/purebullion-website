export type Invoice = { id: string; date: string; description: string; amount: string; status: "Paid" };

export const currentPlan = {
  name: "Professional",
  tags: [
    { label: "ACTIVE", tone: "green" as const },
    { label: "FOUNDING RATE LOCKED", tone: "gold" as const },
  ],
  description: "Signals, scanner, alerts, unlimited AI research and full performance history.",
  price: "$99",
  priceNote: "per month",
  meta: [
    { label: "Billing cycle", value: "Monthly" },
    { label: "Status", value: "Active" },
    { label: "Next billing date", value: "Oct 19, 2026" },
    { label: "Payment method", value: "Visa •••• 4242" },
  ],
};

export const invoices: Invoice[] = [
  { id: "PB-2481", date: "Sep 18, 2026", description: "Professional · monthly", amount: "$89.00", status: "Paid" },
  { id: "PB-2480", date: "Sep 16, 2026", description: "Professional · monthly", amount: "$89.00", status: "Paid" },
  { id: "PB-2479", date: "Sep 15, 2026", description: "Professional · monthly", amount: "$89.00", status: "Paid" },
  { id: "PB-2479", date: "Sep 15, 2026", description: "Professional · monthly", amount: "$89.00", status: "Paid" },
  { id: "PB-2478", date: "Sep 12, 2026", description: "Essential · monthly", amount: "$49.00", status: "Paid" },
];

export type Plan = {
  id: "essential" | "professional" | "elite";
  name: string;
  blurb: string;
  monthly: string;
  yearly: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    blurb: "Perfect for exploring market data and tracking your favourite stocks.",
    monthly: "$49",
    yearly: "$490",
    features: ["Market overview", "Basic stock screener", "One personalized watchlis", "Basic market alerts"],
  },
  {
    id: "professional",
    name: "Professional",
    blurb: "Advanced intelligence and AI powered research for active investors.",
    monthly: "$89",
    yearly: "$890",
    features: [
      "Advanced stock screener",
      "Unlimited watchlists",
      "AI-powered market analysis",
      "Premium research access",
      "Unlimited watchlists",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    blurb: "Complete market intelligence and exclusive access for serious investors.",
    monthly: "$149",
    yearly: "$1,490",
    features: ["Advanced AI research tools", "Exclusive market insights", "Priority community access", "Custom alert preferences"],
  },
];

export const foundingMember = {
  text: "You are member #388 of 1,000. Your $99 rate is locked for as long as the subscription stays continuously active, and Institutional features are included until September 2027.",
  progress: 16,
  caption: "388 of 1,000 spots claimed",
};

export const cancelInfo = {
  text: "Two clicks, no phone call, effective at the end of the period. You keep access until Oct 19, 2026 and your data is retained for 90 days.",
  link: "Read the full policy →",
};

export const helpInfo = {
  text: "Billing questions are answered within one business day.",
  cta: "Contact Billings",
};

export const cancelReasons = [
  "Too expensive",
  "Not using it enough",
  "Missing features",
  "Switching to another service",
  "Other",
];

export const downgradeLosses = [
  "Quantitative buy and sell signals",
  "The stock and ETF scanner",
  "Real-time signal alerts",
  "Full performance history",
  "Community posting",
];

export const upgradeSummary = [
  { label: "New rate", value: "$149 / month" },
  { label: "Charged today", value: "$50.00 prorated" },
  { label: "Effective", value: "Immediately" },
  { label: "Next full charge", value: "Oct 19, 2026" },
];
