import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  TrendingUp,
} from "lucide-react";
import WorkflowAnimation from "@/components/WorkflowAnimation";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingElements = [
    { icon: Bot, label: "AI Agents", delay: "0s", position: "top-20 left-20" },
    {
      icon: MessageSquare,
      label: "Chat AI",
      delay: "0.5s",
      position: "top-32 right-32",
    },
    {
      icon: Phone,
      label: "Voice AI",
      delay: "1s",
      position: "bottom-40 left-32",
    },
    {
      icon: Workflow,
      label: "Automation",
      delay: "1.5s",
      position: "bottom-20 right-20",
    },
    {
      icon: Users,
      label: "Multi-Agent",
      delay: "2s",
      position: "top-48 left-1/2",
    },
    {
      icon: TrendingUp,
      label: "Analytics",
      delay: "2.5s",
      position: "bottom-32 right-1/2",
    },
  ];

  return (
    <section className="relative mt-10 min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple/5 via-mint/20 to-teal/10 opacity-70" />

      {/* Floating AI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} animate-float opacity-0`}
            style={{
              animationDelay: element.delay,
              animationFillMode: "forwards",
            }}
          >
            <div className="bg-mint backdrop-blur-sm border border-teal/30 rounded-xl p-3 shadow-lg hover:shadow-xl hover:border-purple/20 transition-all duration-500 group">
              <element.icon className="w-6 h-6 text-purple group-hover:text-purple-light group-hover:scale-110 transition-all" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                {element.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            {/* Main Headline */}
            <div className="space-y-6 mt-10">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-purple-dark leading-tight block">
                  Build Your
                </span>
                <span className="bg-gradient-to-r from-purple via-purple-light to-purple-dark bg-clip-text text-transparent leading-tight block">
                  AI Employee.
                </span>
                <span className="text-purple leading-tight">
                  Automate Anything.
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-purple/80 max-w-2xl leading-relaxed">
                Let AI agents handle your sales, support, onboarding, outreach
                and more.
                <span className="text-purple-dark font-semibold">
                    No coding required.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                className="bg-purple hover:bg-purple-light text-mint shadow-lg group"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-purple text-purple hover:bg-purple/10 group"
              >
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-12 pt-8">
              <div className="text-center bg-mint/50 backdrop-blur-sm rounded-xl p-4 border border-teal/20">
                <div className="text-2xl font-bold text-purple">10K+</div>
                <div className="text-sm text-purple-dark font-medium">
                  AI Employees
                </div>
              </div>
              <div className="text-center bg-mint/50 backdrop-blur-sm rounded-xl p-4 border border-teal/20">
                <div className="text-2xl font-bold text-purple">500+</div>
                <div className="text-sm text-purple-dark font-medium">
                  Companies
                </div>
              </div>
              <div className="text-center bg-mint/50 backdrop-blur-sm rounded-xl p-4 border border-teal/20">
                <div className="text-2xl font-bold text-purple">99.9%</div>
                <div className="text-sm text-purple-dark font-medium">
                  Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className={`relative ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <WorkflowAnimation />

            {/* Orbiting Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple/20 rounded-full animate-ai-orbit">
              <div className="absolute inset-2 bg-purple rounded-full animate-glow-pulse shadow-lg"></div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 w-8 h-8 bg-teal/30 rounded-full animate-ai-orbit"
              style={{
                animationDirection: "reverse",
                animationDuration: "15s",
              }}
            >
              <div className="absolute inset-1 bg-teal rounded-full animate-glow-pulse shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
