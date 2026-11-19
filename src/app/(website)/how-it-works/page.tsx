import type { Metadata } from "next";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";
import HowItWorksHero from "@/components/website/how-it-works/HowItWorksHero";
import JourneyTimeline from "@/components/website/how-it-works/JourneyTimeline";
import MissionVision from "@/components/website/how-it-works/MissionVision";
import StrategyCards from "@/components/website/how-it-works/StrategyCards";

export const metadata: Metadata = {
  title: "How It Works | Pure Bullion",
  description:
    "Discover how Pure Bullion turns complex market data into clear, actionable insights.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <JourneyTimeline />
      <MissionVision />
      <StrategyCards />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
