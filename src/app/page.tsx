import { HeroSection } from "@/components/sections/HeroSection";
import { QuickAccessTools } from "@/components/sections/QuickAccessTools";
import { HealthAZPreview } from "@/components/sections/HealthAZPreview";
import { TrendingTopics } from "@/components/sections/TrendingTopics";
import { DailyHealthDose } from "@/components/sections/DailyHealthDose";
import { LearningPathsPreview } from "@/components/sections/LearningPathsPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessTools />
      <HealthAZPreview />
      <TrendingTopics />
      <DailyHealthDose />
      <LearningPathsPreview />
    </>
  );
}
