const I = "/images/website/home";
const C = "/icons/website/home";

export const HERO_CHIPS = [
  { icon: `${C}/ai-magic.svg`, label: "AI Market Intelligence" },
  { icon: `${C}/vital-signs.svg`, label: "Quantitative Signals" },
  { icon: `${C}/clock.svg`, label: "Real Time Data" },
  { icon: `${C}/community.svg`, label: "Active Community" },
];

export const ABOUT_STATS = [
  {
    value: "500+",
    label: "S&P 500 stocks scanned",
    text: "Continuously explore leading U.S. companies through one intelligent research platform.",
    image: `${I}/about-stat-1.png`,
  },
  {
    value: "10+",
    label: "Liquid ETFs covered",
    text: "Track selected high-liquidity ETFs across major sectors and market themes.",
    image: `${I}/about-stat-2.png`,
  },
  {
    value: "24/7",
    label: "AI research access",
    text: "Ask financial questions and access market research whenever you need it.",
    image: `${I}/about-stat-3.png`,
  },
];

export const FEATURES = [
  { icon: `${C}/feature-0.svg`, title: "AI Financial Research", text: "Ask questions, summarize the day, and research securities with an AI assistant built for traders." },
  { icon: `${C}/feature-1.svg`, title: "Stock Screener", text: "Find securities by market cap, sector, momentum, volume, and dozens of configurable criteria." },
  { icon: `${C}/feature-2.svg`, title: "Personal Watchlists", text: "Save stocks and ETFs to organized watchlists and track them across the platform." },
  { icon: `${C}/feature-3.svg`, title: "Market Intelligence", text: "Indexes, sectors, breadth, gainers, losers, earnings, and the economic calendar in one view." },
  { icon: `${C}/feature-4.svg`, title: "Research & News", text: "Curated market briefings, research notes, and educational content from our team." },
  { icon: `${C}/feature-5.svg`, title: "Private Community", text: "Discuss ideas with other active traders in a premium, moderated community." },
];

export const JOURNEY_STEPS = [
  { icon: `${C}/step-1.svg`, title: "Explore the Market", text: "View market movements, major indexes, top performers, and financial news." },
  { icon: `${C}/step-2.svg`, title: "Discover & Research", text: "Find relevant stocks and explore AI-powered research and market insights." },
  { icon: `${C}/step-3.svg`, title: "Track What Matters", text: "Add stocks to your watchlist and create personalized market alerts." },
  { icon: `${C}/step-4.svg`, title: "Join the Community", text: "Connect with members and explore valuable financial discussions." },
];

export const COMMUNITY_POINTS = [
  "Discuss stocks, ETFs, earnings, and important market developments.",
  "Share research ideas, observations, and questions with other investors.",
  "Learn from different perspectives in a focused financial community.",
  "Connect securely with verified Pure Bullion members.",
];

export interface PricingPlan {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  featured?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Essential",
    description: "Perfect for exploring market data and tracking your favourite stocks.",
    monthly: 49,
    yearly: 39,
    features: ["Market overview", "Basic stock screener", "One personalized watchlist", "Basic market alerts"],
  },
  {
    name: "Professional",
    description: "Advanced intelligence and AI powered research for active investors.",
    monthly: 89,
    yearly: 71,
    featured: true,
    features: ["Advanced stock screener", "Unlimited watchlists", "AI-powered market analysis", "Premium research access", "Unlimited watchlists"],
  },
  {
    name: "Elite",
    description: "Complete market intelligence and exclusive access for serious investors.",
    monthly: 149,
    yearly: 119,
    features: ["Advanced AI research tools", "Exclusive market insights", "Priority community access", "Custom alert preferences"],
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
}

const A = `${I}/avatars`;
export const TESTIMONIALS_ROW_1: Testimonial[] = [
  { quote: "“Pure Bullion brings the information I usually search for across multiple platforms into one focused workspace. It makes my daily research process much more organized.”", name: "Phillip W., Long-Term Investor", avatar: `${A}/avatar-1.jpg` },
  { quote: "“The AI Assistant helps me understand market developments and company information more quickly, without replacing my own research and judgment.”", name: "Mike T., Market Researcher", avatar: `${A}/avatar-2.jpg` },
  { quote: "“The combination of market insights, watchlists, research tools, and community discussions gives me a clearer picture of what is happening in the market.”", name: "John P., Retail Investor", avatar: `${A}/avatar-3.jpg` },
  { quote: "“The stock screener makes it easier to narrow down companies and focus my research on the opportunities that match my interests.”", name: "Phillip W., Individual Investor", avatar: `${A}/avatar-4.jpg` },
];

export const TESTIMONIALS_ROW_2: Testimonial[] = [
  { quote: "“Having market news, company research, and my watchlist in one place helps me stay informed without constantly switching between different tools.”", name: "David K., Market Enthusiast", avatar: `${A}/avatar-5.jpg` },
  { quote: "“The community gives me access to thoughtful market discussions and different investor perspectives without the noise found on most public platforms.”", name: "Phillip W., Community Member", avatar: `${A}/avatar-1.jpg` },
  { quote: "“Pure Bullion provides a structured way to follow the market, research companies, and build a more consistent daily investment routine.”", name: "Carlos R., Self-Directed Investor", avatar: `${A}/avatar-6.jpg` },
];

export const NEWS_FEATURED = {
  title: "What’s Moving the Market This Week?",
  text: "A focused look at the economic data, earnings updates, and market trends influencing U.S. stocks and investor sentiment this week.",
  image: `${I}/news-featured.png`,
};

export const NEWS_LIST = [
  { title: "Key Takeaways From This Week’s Market", text: "Review the major index movements, sector performance, economic developments, and notable market stories from the past trading week.", image: `${I}/news-1.png` },
  { title: "What’s Driving the S&P 500 Right Now?", text: "Explore the key market trends, earnings developments, and economic factors shaping the S&P 500 this week.", image: `${I}/news-2.png` },
  { title: "How to Understand Market Sentiment", text: "Learn how news, economic expectations, volatility, and investor behavior can influence overall market direction and short-term price movements.", image: `${I}/news-3.png` },
];
