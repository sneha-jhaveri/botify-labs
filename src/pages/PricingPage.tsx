import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Star,
  Zap,
  Shield,
  Users,
  Phone,
  MessageSquare,
  Bot,
  Database,
  Cloud,
  Building,
  ArrowRight
} from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for trying out AI employees',
      credits: '1,000 AI credits/month',
      features: [
        'Basic chat & voice agents',
        'Simple workflow builder',
        'Email support',
        '2 active agents',
        'Basic analytics',
        'Community access'
      ],
      limitations: [
        'No WhatsApp integration',
        'No custom branding',
        'Limited workflow complexity'
      ],
      cta: 'Start Free',
      popular: false,
      variant: 'outline' as const
    },
    {
      name: 'Growth',
      price: '₹8,500',
      period: 'per 10K credits',
      description: 'Scale your AI workforce',
      credits: '10,000+ AI credits',
      features: [
        'All Starter features',
        'Multi-channel deployment',
        'Advanced workflow builder',
        'Custom AI personalities',
        'Priority support',
        'Advanced analytics',
        'API access',
        'WhatsApp integration',
        '10 active agents',
        'Custom branding'
      ],
      limitations: [],
      cta: 'Start Growing',
      popular: true,
      variant: 'cta' as const
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored pricing',
      description: 'Built for large organizations',
      credits: 'Unlimited credits',
      features: [
        'All Growth features',
        'Unlimited agents',
        'On-premise deployment',
        'Custom LLM training',
        'Dedicated support',
        'SLA guarantees',
        'Advanced security',
        'Custom integrations',
        'White-label solutions',
        'Team management'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      variant: 'outline' as const
    }
  ];

  const addOns = [
    {
      icon: Phone,
      name: 'Voice Credits',
      description: 'Additional voice call minutes',
      price: '₹2/minute'
    },
    {
      icon: MessageSquare,
      name: 'WhatsApp Business',
      description: 'Premium WhatsApp features',
      price: '₹500/month'
    },
    {
      icon: Bot,
      name: 'Custom AI Model',
      description: 'Train your own specialized model',
      price: 'From ₹50,000'
    },
    {
      icon: Shield,
      name: 'On-Premise',
      description: 'Deploy on your infrastructure',
      price: 'Custom'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Simple Pricing</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Start{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Free
              </span>
              . Scale as You Grow.
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build your first AI employee for free. Pay only for what you use as your AI workforce grows.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`
                relative bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8
                ${plan.popular ? 'ring-2 ring-primary/30 scale-105' : ''}
                hover:shadow-glow transition-all duration-300
              `}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <span className="text-sm font-medium text-primary">{plan.credits}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center space-x-3 opacity-60">
                      <X className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button variant={plan.variant} size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Power{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Add-ons
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enhance your AI employees with specialized capabilities and premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <addon.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                <div className="text-primary font-bold">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What are AI credits and how are they consumed?",
                a: "AI credits are used for all AI operations - chat messages, voice minutes, workflow executions, and API calls. 1 chat message ≈ 1 credit, 1 voice minute ≈ 10 credits."
              },
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at your next billing cycle."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee for all paid plans. Credits are non-refundable but don't expire."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees ever. You only pay for the credits you use and any add-ons you choose."
              },
              {
                q: "Can I get a custom enterprise plan?",
                a: "Absolutely! Contact our sales team for custom pricing, features, and deployment options tailored to your needs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <h3 className="font-bold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-hero text-white rounded-3xl p-8 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Build Your AI Team?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start with our free plan and scale as your AI workforce grows. No commitments, no hidden fees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-white/20 hover:bg-white/30">
                Start Building Free
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;