import { HeroSection } from "@/components/sections/HeroSection";
import { QuickAccessTools } from "@/components/sections/QuickAccessTools";
import { HealthAZPreview } from "@/components/sections/HealthAZPreview";
import { TrendingTopics } from "@/components/sections/TrendingTopics";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { DailyHealthDose } from "@/components/sections/DailyHealthDose";
import { LearningPathsPreview } from "@/components/sections/LearningPathsPreview";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { StatsSection } from "@/components/sections/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessTools />
      <HealthAZPreview />
      <TrendingTopics />
      <FeaturesShowcase />
      <DailyHealthDose />
      <LearningPathsPreview />
      <TrustBanner />
      <StatsSection />
    </>
  );
}
