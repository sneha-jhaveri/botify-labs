import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import UseCasesSection from '@/components/UseCasesSection';
import InteractiveSection from '@/components/InteractiveSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InteractiveSection />
      <FeaturesSection />
      <UseCasesSection />
    </div>
  );
};

export default Index;
