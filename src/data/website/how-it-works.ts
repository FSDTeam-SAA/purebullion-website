export interface JourneyStep {
  title: string;
  description: string;
  icon: string;
  side: "left" | "right";
  /** Desktop top offset (px) inside the 614px timeline frame. */
  top: number;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    title: "Explore the Market",
    description:
      "View market movements, major indexes, and top-performing assets, while staying informed with the latest financial news and important market updates.",
    icon: "/icons/website/how-it-works/step-explore.svg",
    side: "right",
    top: 4,
  },
  {
    title: "Discover & Research",
    description:
      "Find relevant stocks and explore AI powered research, in depth market insights, and key data to identify potential investment opportunities.",
    icon: "/icons/website/how-it-works/step-discover.svg",
    side: "left",
    top: 154,
  },
  {
    title: "Track What Matters",
    description:
      "Add stocks to your watchlist and create personalized alerts to track price movements, market changes, and important updates.",
    icon: "/icons/website/how-it-works/step-track.svg",
    side: "right",
    top: 305,
  },
  {
    title: "Join the Community",
    description:
      "Connect with community members, exchange market perspectives, and explore valuable financial discussions to make more informed investment decisions.",
    icon: "/icons/website/how-it-works/step-community.svg",
    side: "left",
    top: 425,
  },
];

export const MISSION_ITEMS = [
  {
    title: "Our Mission",
    description:
      "To simplify complex financial information and provide members with the tools they need to research, understand, and track the market more effectively.",
    icon: "/icons/website/how-it-works/mission.svg",
  },
  {
    title: "Our Vision",
    description:
      "To create a more informed, connected, and confident financial community supported by intelligent technology and trustworthy research.",
    icon: "/icons/website/how-it-works/vision.svg",
  },
];

export const STRATEGY_CARDS = [
  {
    title: "Independent Insights",
    description: "Information designed to support your own judgment.",
    icon: "/icons/website/how-it-works/card-shield.svg",
  },
  {
    title: "Personalized Experience",
    description: "Follow more the markets and assets relevant to your goal.",
    icon: "/icons/website/how-it-works/card-user.svg",
  },
  {
    title: "Clear Information",
    description: "Understand the reasoning behind important market signals.",
    icon: "/icons/website/how-it-works/card-file.svg",
  },
];
