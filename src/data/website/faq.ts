export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Pure Bullion?",
    answer:
      "Pure Bullion is a premium market intelligence platform that combines market data, stock research, AI-powered insights, watchlists, alerts, and a private financial community.",
  },
  {
    question: "Does Pure Bullion provide financial advice?",
    answer:
      "No. Pure Bullion provides market intelligence, research and educational content for informational purposes only. It does not execute trades or provide personalized investment advice.",
  },
  {
    question: "How does the AI market analysis work?",
    answer:
      "Our AI assistant summarizes market activity, news and company data into clear, easy-to-read insights. You can also ask your own questions and research securities in plain language.",
  },
  {
    question: "Can I discover stocks using specific criteria?",
    answer:
      "Yes. The stock screener lets you filter securities by market cap, sector, momentum, volume and dozens of other configurable criteria.",
  },
  {
    question: "Can I save my stock-screening filters?",
    answer:
      "Absolutely. Save your favourite filter sets and re-run them any time, then add the results to a personal watchlist to keep tracking them.",
  },
];
