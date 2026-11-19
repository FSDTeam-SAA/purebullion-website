import type { Metadata } from "next";
import PricingHero from "@/components/website/pricing/PricingHero";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";

export const metadata: Metadata = {
  title: "Pricing | Pure Bullion",
  description: "Choose the Pure Bullion plan that fits your goals.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
