import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Check,
  Zap,
  Star,
  Users,
  Building2,
  ArrowRight,
  Crown,
  Shield,
  Clock,
  Globe,
} from "lucide-react";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );

  const plans = [
    {
      id: "base",
      name: "Base Plan",
      description: "Perfect for small teams starting out with AI capabilities.",
      icon: Zap,
      price: 99,
      features: [
        "10,000 AI credits/month",
        "3 users included",
        "$99 setup fee (one-time)",
        "$49.99 per 10,000 additional credits",
        "$24.99/user + 2,500 AI credits/user",
        "External charges billed as actuals",
      ],
      buttonText: "Get Started",
    },
    {
      id: "pro",
      name: "Pro Plan",
      description: "For growing teams with larger AI and user needs.",
      icon: Users,
      price: 299,
      badge: "Popular",
      features: [
        "40,000 AI credits/month",
        "10 users included",
        "$99 setup fee (one-time)",
        "$49.99 per 10,000 additional credits",
        "$24.99/user + 2,500 AI credits/user",
        "External charges billed as actuals",
      ],
      buttonText: "Get Pro",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom plans with higher limits, support, and flexibility.",
      icon: Building2,
      price: "Custom",
      features: [
        "Everything in Pro Plan",
        "Custom AI credit packages",
        "Dedicated support",
        "Priority access to new features",
        "Custom integrations",
        "Enterprise SLA",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Simple{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start free, scale as you grow. No hidden fees.
            </p>

            <div className="inline-flex items-center bg-muted/50 rounded-full p-1 mb-8">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === "annual"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                Annual <Badge className="ml-2 bg-accent">Save 20%</Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative p-8 border-2 transition-all duration-300 hover:shadow-glow ${
                  plan.badge
                    ? "border-primary bg-gradient-ai scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    {typeof plan.price === "number" ? (
                      <>
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <div className="text-2xl font-bold">
                        {plan.price}
                        <div className="text-sm font-normal text-muted-foreground">
                          Contact us
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.badge ? "cta" : "outline"}
                  className="w-full"
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-[#40316a]/90 to-[#3f3364]/70 text-[#e9ecf1] rounded-2xl p-12 text-center max-w-4xl mx-auto border border-[#bfe3da]/30 backdrop-blur-lg shadow-lg shadow-[#332e52]/20">
            <Crown className="w-16 h-16 mx-auto mb-6 text-purple-light" />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of companies using BotWot AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cta"
                size="xl"
                className="border-white/20 text-white"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
