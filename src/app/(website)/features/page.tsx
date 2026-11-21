import type { Metadata } from "next";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FeatureGrid from "@/components/website/features/FeatureGrid";
import FeaturesHero from "@/components/website/features/FeaturesHero";
import ShowcaseCards from "@/components/website/features/ShowcaseCards";
import SplitFeature from "@/components/website/features/SplitFeature";
import TestimonialsMarquee from "@/components/website/features/TestimonialsMarquee";
import { communitySection, membershipSection } from "@/data/website/features";

export const metadata: Metadata = {
  title: "Features | Pure Bullion",
  description:
    "Explore the intelligence, research tools, market data, and community features designed to help you make more informed decisions.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeatureGrid />
      <ShowcaseCards />
      <SplitFeature {...communitySection} />
      <SplitFeature {...membershipSection} imageLeft />
      <TestimonialsMarquee />
      <CtaBanner />
    </>
  );
}
