import { Metadata } from 'next';
import Preloader from '@/components/marketing/Preloader';
import CustomCursor from '@/components/marketing/CustomCursor';
import Navigation from '@/components/marketing/Navigation';
import HeroSection from '@/components/marketing/sections/HeroSection';
import MarqueeTicker from '@/components/marketing/sections/MarqueeTicker';
import ServicesSection from '@/components/marketing/sections/ServicesSection';
import ProcessSection from '@/components/marketing/sections/ProcessSection';
import WorkSection from '@/components/marketing/sections/WorkSection';
import WhyFloxrSection from '@/components/marketing/sections/WhyFloxrSection';
import CTABanner from '@/components/marketing/sections/CTABanner';
import Footer from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: "Floxr | Software That Ships",
  description: "Floxr is entering the market with premium, high-converting digital products and software.",
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      
      {/* We wrap everything in this class so the Preloader can fade it in smoothly */}
      <main className="marketing-page-content opacity-0 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-opacity duration-300">
        <Navigation />
        
        {/* Sections in Exact Order */}
        <HeroSection />
        <MarqueeTicker />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <WhyFloxrSection />
        <CTABanner />
        
        <Footer />
      </main>
    </>
  );
}
