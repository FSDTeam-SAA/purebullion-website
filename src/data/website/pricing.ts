export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  /** Yearly total (two months free). */
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Essential",
    description: "Perfect for exploring market data and tracking your favourite stocks.",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "Market overview",
      "Basic stock screener",
      "One personalized watchlist",
      "Basic market alerts",
    ],
  },
  {
    name: "Professional",
    description: "Advanced intelligence and AI powered research for active investors.",
    monthlyPrice: 89,
    yearlyPrice: 890,
    highlighted: true,
    features: [
      "Advanced stock screener",
      "Unlimited watchlists",
      "AI-powered market analysis",
      "Premium research access",
      "Unlimited watchlists",
    ],
  },
  {
    name: "Elite",
    description: "Complete market intelligence and exclusive access for serious investors.",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    features: [
      "Advanced AI research tools",
      "Exclusive market insights",
      "Priority community access",
      "Custom alert preferences",
    ],
  },
];
