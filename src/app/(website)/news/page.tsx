import type { Metadata } from "next";
import CtaBanner from "@/components/website/shared/CtaBanner";
import FaqSection from "@/components/website/shared/FaqSection";
import NewsCategories from "@/components/website/news/NewsCategories";
import NewsHero from "@/components/website/news/NewsHero";
import WeeklyInsights from "@/components/website/news/WeeklyInsights";

export const metadata: Metadata = {
  title: "Market News & Research | Pure Bullion",
  description:
    "Stay informed with weekly market insights, economic data, earnings updates and AI research from Pure Bullion.",
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <WeeklyInsights />
      <NewsCategories />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
