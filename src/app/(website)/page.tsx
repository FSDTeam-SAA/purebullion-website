import AboutIntro from "@/components/website/home/AboutIntro";
import AiAnalysis from "@/components/website/home/AiAnalysis";
import CommunityMembership from "@/components/website/home/CommunityMembership";
import FeaturesGrid from "@/components/website/home/FeaturesGrid";
import HomeHero from "@/components/website/home/HomeHero";
import JourneySection from "@/components/website/home/JourneySection";
import NewsInsights from "@/components/website/home/NewsInsights";
import PricingSection from "@/components/website/home/PricingSection";
import Testimonials from "@/components/website/home/Testimonials";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutIntro />
      <FeaturesGrid />
      <JourneySection />
      <CommunityMembership />
      <AiAnalysis />
      <PricingSection />
      <Testimonials />
      <FaqSection />
      <NewsInsights />
      <CtaBanner />
    </>
  );
}
