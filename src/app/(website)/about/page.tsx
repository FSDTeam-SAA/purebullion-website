import type { Metadata } from "next";
import AboutFeatures from "@/components/website/about/AboutFeatures";
import AboutHero from "@/components/website/about/AboutHero";
import AboutStats from "@/components/website/about/AboutStats";
import MissionVision from "@/components/website/about/MissionVision";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";

export const metadata: Metadata = {
  title: "About Us | Pure Bullion",
  description:
    "Pure Bullion brings market intelligence, AI research and an investor community together.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <MissionVision />
      <AboutFeatures />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
