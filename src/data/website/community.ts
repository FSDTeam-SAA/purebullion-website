const ICON = "/icons/website/community";

export interface CommunityStat {
  value: string;
  label: string;
  ghost: string;
}

export const COMMUNITY_STATS: CommunityStat[] = [
  { value: "10K+", label: "Active Members", ghost: "10K" },
  { value: "5K+", label: "Daily Discussions", ghost: "5K" },
  { value: "24/7", label: "Stocks Followed", ghost: "24" },
];

export const COMMUNITY_WIDE_STAT: CommunityStat = {
  value: "500+",
  label: "Stocks Followed",
  ghost: "500+",
};

export interface ConnectFeature {
  title: string;
  description: string;
  icon: string;
}

export const CONNECT_FEATURES: ConnectFeature[] = [
  {
    title: "Discuss Market Topics",
    description:
      "Discuss stocks, ETFs, company earnings, financial news, and important market developments while exchanging knowledge and perspectives with other community members.",
    icon: `${ICON}/icon-market.svg`,
  },
  {
    title: "Share Research and Ideas",
    description:
      "Share research ideas, market observations, and financial questions while exchanging knowledge and perspectives with other community members.",
    icon: `${ICON}/icon-share.svg`,
  },
  {
    title: "Learn Together",
    description:
      "Learn from different perspectives, shared experiences and thoughtful financial discussions while connecting with knowledgeable community members and exploring a wider understanding.",
    icon: `${ICON}/icon-learn.svg`,
  },
  {
    title: "Connect Safely",
    description:
      "Connect securely with verified Pure Bullion members, share valuable knowledge, and build meaningful relationships within a trusted financial community.",
    icon: `${ICON}/icon-safe.svg`,
  },
];

export interface StrategyFeature {
  title: string;
  description: string;
  icon: string;
}

export const STRATEGY_FEATURES: StrategyFeature[] = [
  {
    title: "Explore Discussions",
    description:
      "Discover conversations about stocks, market trends, news, and financial topics.",
    icon: `${ICON}/feature-discuss.svg`,
  },
  {
    title: "Ask Questions",
    description:
      "Ask the community questions and receive helpful information from other members.",
    icon: `${ICON}/feature-ask.svg`,
  },
  {
    title: "Stay Informed",
    description:
      "Follow relevant topics and discover useful market updates through community discussions.",
    icon: `${ICON}/feature-informed.svg`,
  },
  {
    title: "Share Knowledge",
    description:
      "Contribute your ideas, experiences, and understanding of different financial subjects.",
    icon: `${ICON}/feature-knowledge.svg`,
  },
];
