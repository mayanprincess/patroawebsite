import AboutSection from "@/components/about/AboutSection";
import AerialBanner from "@/components/aerial/AerialBanner";
import CtaSection from "@/components/cta/CtaSection";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/hero/HeroSection";
import IndustriesSection from "@/components/industries/IndustriesSection";
import LngCaseStudy from "@/components/lng/LngCaseStudy";
import MarineBunkeringSection from "@/components/marine/MarineBunkeringSection";
import MissionSection from "@/components/mission/MissionSection";
import MoreThanFuelSection from "@/components/more-than-fuel/MoreThanFuelSection";
import Navbar from "@/components/navbar/Navbar";
import ProductsSection from "@/components/products/ProductsSection";
import ServicesSection from "@/components/services/ServicesSection";
import StatsSection from "@/components/stats/StatsSection";
import WhyPetroaSection from "@/components/why-petroa/WhyPetroaSection";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col bg-petroa-bg">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <StatsSection />
        <AerialBanner />
        <ServicesSection />
        <ProductsSection />
        <IndustriesSection />
        <MarineBunkeringSection />
        <LngCaseStudy />
        <MoreThanFuelSection />
        <WhyPetroaSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
