const I = "/icons/website/features";
const P = "/images/website/features";

export const featureCards = [
  { icon: `${I}/feat-ai.svg`, title: "AI Financial Research", description: "Ask questions, summarize the day, and research securities with an AI assistant built for traders." },
  { icon: `${I}/feat-screener.svg`, title: "Stock Screener", description: "Find securities by market cap, sector, momentum, volume, and dozens of configurable criteria." },
  { icon: `${I}/feat-watchlist.svg`, title: "Personal Watchlists", description: "Save stocks and ETFs to organized watchlists and track them across the platform." },
  { icon: `${I}/feat-market.svg`, title: "Market Intelligence", description: "Indexes, sectors, breadth, gainers, losers, earnings, and the economic calendar in one view." },
  { icon: `${I}/feat-news.svg`, title: "Research & News", description: "Curated market briefings, research notes, and educational content from our team." },
  { icon: `${I}/feat-community.svg`, title: "Private Community", description: "Discuss ideas with other active traders in a premium, moderated community." },
];

export const showcaseCards = [
  {
    title: "AI-Powered Market Research",
    description:
      "Turn complex market data into clear, useful insights. Analyze market trends, news, and sentiment, then ask the AI Research Assistant follow-up questions for deeper, data-backed understanding.",
    pills: [
      { icon: `${I}/pill-1.svg`, label: "AI Market Intelligence" },
      { icon: `${I}/pill-2.svg`, label: "AI Financial Assistant" },
    ],
    image: `${P}/ai-research.png`,
    imageStyle: { height: "104.44%", left: "-0.39%", top: "-4.35%", width: "100.79%" },
    aspect: "572 / 460",
  },
  {
    title: "Live Time Insights",
    description:
      "Discover relevant stocks using advanced filters, then organize watchlists, alerts, saved research, and market updates inside one personalized workspace.",
    pills: [
      { icon: `${I}/pill-3.svg`, label: "Advanced Stock Screener" },
      { icon: `${I}/pill-4.svg`, label: "Personalized Workspace" },
    ],
    image: `${P}/live-insights.png`,
    imageStyle: { height: "105.26%", left: "0%", top: "-5.26%", width: "100%" },
    aspect: "576 / 456",
  },
];

export const communitySection = {
  badge: "Private investor community",
  title: "Connect With Investors Who Think Beyond the Noise",
  description:
    "Join a focused, member-only community where investors exchange perspectives, explore research ideas, and better understand changing market conditions.",
  bullets: [
    "Discuss stocks, ETFs, earnings, and important market developments.",
    "Share research ideas, observations, and questions with other investors.",
    "Learn from different perspectives in a focused financial community.",
    "Connect securely with verified Pure Bullion members.",
  ],
  cta: { label: "Explore the Community", href: "/our-community" },
  image: `${P}/community.png`,
  imageStyle: { height: "115%", left: "0.01%", top: "-7.53%", width: "152.31%" },
};

export const membershipSection = {
  badge: "Pure Bullion Membership",
  title: "Bring Smarter Market Research Into Your Daily Routine",
  paragraphs: [
    "Pure Bullion brings market intelligence, AI-powered financial research, stock screening, personalized watchlists, curated news, and investor discussions into one focused workspace. Instead of switching between disconnected platforms, members can access the information and research tools they need from a single dashboard.",
    "Whether you are researching a company, monitoring market movements, reviewing financial news, or exploring new ideas, Pure Bullion helps you work more efficiently and approach the market with greater clarity and confidence.",
  ],
  cta: { label: "View Membership Plans", href: "/pricing" },
  image: `${P}/membership.png`,
  imageStyle: { height: "114.86%", left: "-22.61%", top: "-10.59%", width: "142.72%" },
};

export interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
}

export const testimonialRows: Testimonial[][] = [
  [
    { quote: "“Pure Bullion brings the information I usually search for across multiple platforms into one focused workspace. It makes my daily research process much more organized.”", name: "Phillip W., Long-Term Investor", avatar: `${P}/avatar-1.jpg` },
    { quote: "“The AI Assistant helps me understand market developments and company information more quickly, without replacing my own research and judgment.”", name: "Mike T., Market Researcher", avatar: `${P}/avatar-2.jpg` },
    { quote: "“The combination of market insights, watchlists, research tools, and community discussions gives me a clearer picture of what is happening in the market.”", name: "John P., Retail Investor", avatar: `${P}/avatar-3.jpg` },
    { quote: "“The stock screener makes it easier to narrow down companies and focus my research on the opportunities that match my interests.”", name: "Phillip W., Individual Investor", avatar: `${P}/avatar-4.jpg` },
  ],
  [
    { quote: "“Having market news, company research, and my watchlist in one place helps me stay informed without constantly switching between different tools.”", name: "David K., Market Enthusiast", avatar: `${P}/avatar-5.jpg` },
    { quote: "“The community gives me access to thoughtful market discussions and different investor perspectives without the noise found on most public platforms.”", name: "Phillip W., Community Member", avatar: `${P}/avatar-1.jpg` },
    { quote: "“Pure Bullion provides a structured way to follow the market, research companies, and build a more consistent daily investment routine.”", name: "Carlos R., Self-Directed Investor", avatar: `${P}/avatar-6.jpg` },
    { quote: "“Pure Bullion brings the information I usually search for across multiple platforms into one focused workspace. It makes my daily research process much more organized.”", name: "Phillip W., Long-Term Investor", avatar: `${P}/avatar-1.jpg` },
  ],
];
