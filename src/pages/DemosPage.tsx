import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import LiveDemo from '@/components/LiveDemo';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import { 
  Play, 
  MessageSquare, 
  Phone, 
  Mail,
  Monitor,
  Smartphone,
  Bot,
  Building,
  Home,
  ShoppingCart,
  Plane,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';

const DemosPage = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [completedDemos, setCompletedDemos] = useState<string[]>([]);

  const demoCategories = [
    {
      id: 'interactive',
      title: 'Interactive Experiences',
      description: 'Try our AI agents live - no signup required',
      icon: Play,
      demos: [
        {
          id: 'banking-chat',
          type: 'chat' as const,
          title: 'Banking Assistant',
          description: 'AI-powered customer support for financial services',
          industry: 'banking',
          features: ['Account inquiries', 'Loan pre-qualification', 'Fraud detection', '24/7 availability']
        },
        {
          id: 'realestate-voice',
          type: 'voice' as const,
          title: 'Real Estate Voice Agent',
          description: 'Smart property assistant that handles calls',
          industry: 'realestate',
          features: ['Property search', 'Viewing scheduling', 'Lead qualification', 'Market analysis']
        },
        {
          id: 'ecommerce-whatsapp',
          type: 'whatsapp' as const,
          title: 'E-commerce WhatsApp Bot',
          description: 'Shopping assistant on WhatsApp',
          industry: 'ecommerce',
          features: ['Product discovery', 'Order tracking', 'Cart recovery', 'Customer support']
        }
      ]
    },
    {
      id: 'workflow',
      title: 'Workflow Builder',
      description: 'See how easy it is to build AI workflows',
      icon: Bot,
      demos: [
        {
          id: 'lead-qualification',
          title: 'Lead Qualification Workflow',
          description: 'Automated lead scoring and routing system',
          industry: 'general',
          complexity: 'Beginner',
          time: '5 min'
        },
        {
          id: 'customer-onboarding',
          title: 'Customer Onboarding',
          description: 'Multi-step onboarding with document collection',
          industry: 'banking',
          complexity: 'Intermediate',
          time: '10 min'
        },
        {
          id: 'support-routing',
          title: 'Smart Support Routing',
          description: 'Intelligent ticket routing and escalation',
          industry: 'general',
          complexity: 'Advanced',
          time: '15 min'
        }
      ]
    }
  ];

  const industryShowcases = [
    {
      icon: Building,
      title: 'Banking & Fintech',
      description: 'KYC automation, fraud detection, and customer onboarding',
      metrics: { efficiency: '85%', cost: '70%', satisfaction: '94%' },
      demoVideo: '/demos/banking-showcase.mp4'
    },
    {
      icon: Home,
      title: 'Real Estate',
      description: 'Lead qualification, property matching, and viewing coordination',
      metrics: { conversion: '65%', response: '<2min', bookings: '300%' },
      demoVideo: '/demos/realestate-showcase.mp4'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Product recommendations, cart recovery, and order management',
      metrics: { recovery: '45%', sales: '35%', tickets: '-80%' },
      demoVideo: '/demos/ecommerce-showcase.mp4'
    },
    {
      icon: Plane,
      title: 'Travel & Airlines',
      description: 'Booking automation, schedule changes, and travel assistance',
      metrics: { bookings: '5x faster', satisfaction: '96%', calls: '-60%' },
      demoVideo: '/demos/travel-showcase.mp4'
    }
  ];

  const handleDemoComplete = (demoId: string) => {
    setCompletedDemos(prev => [...prev, demoId]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-primary-muted/10 to-secondary-glow/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
              <Play className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Live Demos</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              See{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI in Action
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Experience our AI employees live. Try real conversations, build workflows, 
              and see how BotWot AI transforms business operations across industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" onClick={() => setActiveDemo('banking-chat')}>
                Try Live Demo
              </Button>
              <Button variant="outline" size="xl">
                Schedule Personal Demo
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Demo Sessions</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-secondary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Industries</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-accent mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {demoCategories.map((category) => (
            <div key={category.id} className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 text-sm mb-4">
                  <category.icon className="w-4 h-4 text-secondary" />
                  <span className="text-secondary font-medium">{category.title}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">{category.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
              </div>

              {category.id === 'interactive' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.demos.map((demo) => (
                    <div key={demo.id} className="space-y-4">
                      <LiveDemo
                        type={demo.type}
                        title={demo.title}
                        description={demo.description}
                        industry={demo.industry}
                      />
                      
                      {/* Features List */}
                      <div className="bg-muted/30 rounded-xl p-4">
                        <h4 className="font-semibold mb-3 text-sm text-foreground">Key Features:</h4>
                        <div className="space-y-2">
                          {demo.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {category.id === 'workflow' && (
                <div className="space-y-8">
                  <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-4">Interactive Workflow Builder</h3>
                      <p className="text-muted-foreground">Drag, drop, and connect AI blocks to create powerful automation</p>
                    </div>
                    <WorkflowBuilder 
                      isDemo={false} 
                      onComplete={() => handleDemoComplete('workflow-builder')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.demos.map((demo) => (
                      <div key={demo.id} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-foreground mb-2">{demo.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{demo.description}</p>
                          </div>
                          {completedDemos.includes(demo.id) && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{demo.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-3 h-3" />
                            <span>{demo.complexity}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setActiveDemo(demo.id)}
                        >
                          Try This Workflow
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Individual Workflow Demos */}
                  {activeDemo && (
                    <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {category.demos.find(d => d.id === activeDemo)?.title} Demo
                          </h3>
                          <p className="text-muted-foreground">
                            {category.demos.find(d => d.id === activeDemo)?.description}
                          </p>
                        </div>
                        <Button variant="ghost" onClick={() => setActiveDemo(null)}>
                          ✕
                        </Button>
                      </div>
                      
                      <WorkflowBuilder 
                        isDemo={false}
                        industry={category.demos.find(d => d.id === activeDemo)?.industry || 'general'}
                        onComplete={() => {
                          handleDemoComplete(activeDemo);
                          setActiveDemo(null);
                        }}
                      />
                      
                      {/* Demo Details */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-muted/20 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 text-primary">Business Impact</h4>
                          <div className="space-y-2 text-sm">
                            <div>• 75% reduction in response time</div>
                            <div>• 90% accuracy in lead qualification</div>
                            <div>• 24/7 automated processing</div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/20 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 text-secondary">Technical Features</h4>
                          <div className="space-y-2 text-sm">
                            <div>• Natural language processing</div>
                            <div>• Real-time integrations</div>
                            <div>• Advanced AI routing</div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/20 rounded-xl p-4">
                          <h4 className="font-semibold mb-3 text-accent">Use Cases</h4>
                          <div className="space-y-2 text-sm">
                            <div>• Customer service automation</div>
                            <div>• Lead qualification & routing</div>
                            <div>• Document processing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Industry Showcases */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Industry{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Showcases
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how leading companies in each industry are using BotWot AI to transform their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryShowcases.map((showcase, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300">
                {/* Header */}
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <showcase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{showcase.title}</h3>
                      <p className="text-sm text-muted-foreground">{showcase.description}</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Industry Demo */}
                <div className="aspect-video bg-muted/20 border-b border-border/30 overflow-hidden">
                  <WorkflowBuilder 
                    isDemo={true}
                    industry={showcase.title.toLowerCase().split(' ')[0]}
                  />
                </div>

                {/* Metrics */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(showcase.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 group"
                    onClick={() => setActiveDemo(`showcase-${index}`)}
                  >
                    <span>Try {showcase.title} Demo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-hero text-white rounded-3xl p-8 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Build Your Own?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              You've seen what's possible. Now create your own AI employees and transform 
              your business operations with intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-white/20 hover:bg-white/30">
                Start Building Free
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                Schedule Personal Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-12 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Join 10,000+ companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemosPage;