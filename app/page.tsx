import HeroShowroom from "@/components/sections/HeroShowroom";
import BrandMarquee from "@/components/sections/BrandMarquee";
import CollectionSection from "@/components/sections/CollectionSection";
import StorySection from "@/components/sections/StorySection";
import HowItWorks from "@/components/sections/HowItWorks";
import ChauffeurBand from "@/components/sections/ChauffeurBand";
import LocationsSection from "@/components/sections/LocationsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import PressStrip from "@/components/sections/PressStrip";
import JournalSection from "@/components/sections/JournalSection";
import ClosingCta from "@/components/sections/ClosingCta";

export default function Home() {
  return (
    <>
      <HeroShowroom />
      <BrandMarquee />
      <CollectionSection />
      <StorySection />
      <HowItWorks />
      <ChauffeurBand />
      <LocationsSection />
      <ReviewsSection />
      <PressStrip />
      <JournalSection />
      <ClosingCta />
    </>
  );
}
