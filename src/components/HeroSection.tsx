import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlayCircle, 
  ArrowRight, 
  Bot, 
  MessageSquare, 
  Phone, 
  Zap,
  Brain,
  Workflow,
  Users,
  TrendingUp
} from 'lucide-react';
import aiDashboardHero from '@/assets/ai-dashboard-hero.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingElements = [
    { icon: Bot, label: 'AI Agents', delay: '0s', position: 'top-20 left-20' },
    { icon: MessageSquare, label: 'Chat AI', delay: '0.5s', position: 'top-32 right-32' },
    { icon: Phone, label: 'Voice AI', delay: '1s', position: 'bottom-40 left-32' },
    { icon: Workflow, label: 'Automation', delay: '1.5s', position: 'bottom-20 right-20' },
    { icon: Users, label: 'Multi-Agent', delay: '2s', position: 'top-48 left-1/2' },
    { icon: TrendingUp, label: 'Analytics', delay: '2.5s', position: 'bottom-32 right-1/2' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary-muted/20 to-secondary-glow/20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-ai opacity-50" />
      
      {/* Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} animate-float opacity-0`}
            style={{
              animationDelay: element.delay,
              animationFillMode: 'forwards',
            }}
          >
            <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-ai hover:shadow-glow transition-all duration-500 group">
              <element.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {element.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm">
              <Brain className="w-4 h-4 text-primary animate-glow-pulse" />
              <span className="text-primary font-medium">Next-Gen AI Employee Platform</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-hero bg-clip-text text-transparent leading-tight block">
                  Build Your
                </span>
                <span className="bg-gradient-hero bg-clip-text text-transparent leading-tight block">
                  AI Employee.
                </span>
                <span className="text-foreground leading-tight block">
                  Automate Anything.
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Let AI agents handle your sales, support, onboarding, outreach and more. 
                <span className="text-primary font-semibold"> No coding required.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" className="group">
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="hero" size="xl" className="group">
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">AI Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={`relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-ai border border-primary/20 bg-gradient-ai backdrop-blur-sm">
              <img 
                src={aiDashboardHero} 
                alt="AI Dashboard Platform Interface" 
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay with Stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Floating Stats Cards */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3 text-center border border-border/50">
                  <div className="text-lg font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3 text-center border border-border/50">
                  <div className="text-lg font-bold text-secondary">Multi</div>
                  <div className="text-xs text-muted-foreground">Channel</div>
                </div>
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3 text-center border border-border/50">
                  <div className="text-lg font-bold text-accent">Smart</div>
                  <div className="text-xs text-muted-foreground">Learning</div>
                </div>
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full animate-ai-orbit">
              <div className="absolute inset-2 bg-primary rounded-full animate-glow-pulse"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-secondary/20 rounded-full animate-ai-orbit" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
              <div className="absolute inset-1 bg-secondary rounded-full animate-glow-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;