export interface NewsTopic {
  title: string;
  description: string;
  icon: string;
  /** Icon is a bare 40px glyph that needs the gold tile behind it. */
  tile?: boolean;
}

export interface NewsArticle {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface NewsCategory {
  title: string;
  icon: string;
}

export const NEWS_HERO = {
  badge: "Market News & Research",
  goldTitle: "Market Insights",
  whiteTitle: " That Keep You Informed",
  description:
    "See how Pure Bullion helps members simplify market research, stay informed, and approach investment decisions with greater confidence.",
  image: "/images/website/news/hero-city-chart.png",
};

export const NEWS_WEEKLY = {
  badge: "Weekly Market Insights",
  title: "Understand What’s Moving the Market This Week",
  description:
    "Explore the latest economic data, earnings updates, market trends, and investor sentiment shaping U.S. stocks so you can clearly understand the key developments influencing the market this week.",
  featured: {
    title: "What’s Moving the Market This Week?",
    description:
      "A focused look at the economic data, earnings updates, and market trends influencing U.S. stocks and investor sentiment this week.",
    image: "/images/website/news/featured-market.png",
  },
};

export const NEWS_TOPICS: NewsTopic[] = [
  {
    title: "Economic Data",
    description:
      "Explore key reports on inflation, employment, consumer spending, and economic growth shaping the U.S. market this week.",
    icon: "/icons/website/news/economic-data.svg",
  },
  {
    title: "Earnings Updates",
    description:
      "Review the latest company earnings results and discover how business performance is affecting market activity.",
    icon: "/icons/website/news/earnings-updates.svg",
  },
  {
    title: "Market Trends",
    description:
      "Understand important movements across major indexes, sectors, and stocks influencing the direction of the market.",
    icon: "/icons/website/news/market-trends.svg",
  },
  {
    title: "Traders Sentiment",
    description:
      "Discover how current news, economic conditions, and market performance are shaping investor confidence and expectations.",
    icon: "/icons/website/news/traders-sentiment.svg",
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "Key Takeaways From This Week’s Market",
    description:
      "Review the major index movements, sector performance, economic developments, and notable market stories from the past trading week, with clear insights into the factors influencing market activity and overall investor sentiment.",
    image: "/images/website/news/article-key-takeaways.png",
    href: "/news",
  },
  {
    title: "What’s Driving the S&P 500 Right Now?",
    description:
      "Explore the key market trends, earnings developments, and economic factors shaping the S&P 500 this week, along with the major events influencing index performance, sector movements, and overall investor sentiment.",
    image: "/images/website/news/article-sp500.png",
    href: "/news",
  },
  {
    title: "How to Understand Market Sentiment",
    description:
      "Learn how news, economic expectations, market volatility, and investor behavior can influence overall market direction, shape investor sentiment, and drive short-term price movements across major indexes and sectors.",
    image: "/images/website/news/article-sentiment.png",
    href: "/news",
  },
];

export const NEWS_CATEGORIES_HEADING = {
  badge: "EXPLORE BY TOPIC",
  title: "Find the Insights That Matter to You",
  description: "Browse market information and educational content based on your interests.",
};

export const NEWS_CATEGORIES: NewsCategory[] = [
  { title: "Market Updates", icon: "/icons/website/news/market-updates.svg" },
  { title: "Stocks", icon: "/icons/website/news/stocks.svg" },
  { title: "ETFs", icon: "/icons/website/news/etfs.svg" },
  { title: "Company Earnings", icon: "/icons/website/news/company-earnings.svg" },
  { title: "Economic News", icon: "/icons/website/news/economic-news.svg" },
  { title: "Commodities", icon: "/icons/website/news/commodities.svg" },
  { title: "AI Research", icon: "/icons/website/news/ai-research.svg" },
  { title: "Financial Education", icon: "/icons/website/news/financial-education.svg" },
];
