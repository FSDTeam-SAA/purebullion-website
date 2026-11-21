import type { Metadata } from "next";
import CommunityHero from "@/components/website/community/CommunityHero";
import CommunityStats from "@/components/website/community/CommunityStats";
import ConnectSection from "@/components/website/community/ConnectSection";
import StrategySection from "@/components/website/community/StrategySection";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";

export const metadata: Metadata = {
  title: "Community | Pure Bullion",
  description:
    "Join a community where members exchange knowledge, discuss financial topics, and explore valuable market information together.",
};

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <CommunityStats />
      <ConnectSection />
      <StrategySection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
