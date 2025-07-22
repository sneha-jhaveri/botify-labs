import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import UseCasesSection from '@/components/UseCasesSection';
import InteractiveSection from '@/components/InteractiveSection';
import FuturisticSection from '@/components/FuturisticSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FuturisticSection />
      <InteractiveSection />
      <FeaturesSection />
      <UseCasesSection />
    </div>
  );
};

export default Index;
