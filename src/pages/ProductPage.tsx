import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import LiveDemo from '@/components/LiveDemo';
import InteractiveAIBuilder from '@/components/InteractiveAIBuilder';
import InteractiveAnalyticsDashboard from '@/components/InteractiveAnalyticsDashboard';
import InteractiveCRM from '@/components/InteractiveCRM';
import InteractiveSocialMedia from '@/components/InteractiveSocialMedia';
import { 
  Brain, 
  Workflow, 
  MessageSquare, 
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Play,
  Zap,
  Bot,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Target,
  UserCheck,
  Share2
} from 'lucide-react';

const ProductPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Employee Builder',
      description: 'Drag-and-drop agent creation with advanced AI capabilities',
      details: [
        'Visual no-code interface',
        'Multi-modal AI (text, voice, vision)',
        'Custom personality training',
        'Enterprise-grade security',
        'Real-time testing & debugging'
      ],
      demo: 'builder'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation (iAWO)',
      description: 'Intelligent Autonomous Workflow Orchestration',
      details: [
        'Smart triggers & conditions',
        'Multi-step automation',
        'Cross-platform integration',
        'Real-time monitoring',
        'Auto-optimization'
      ],
      demo: 'workflow'
    },
    {
      icon: MessageSquare,
      title: 'Multi-Channel Orchestration',
      description: 'Deploy across all communication channels instantly',
      details: [
        'WhatsApp Business API',
        'Voice & Phone integration',
        'Email automation',
        'Web chat widgets',
        'Instagram & Social'
      ],
      demo: 'channels'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Prompt-based dashboard builder with real-time insights',
      details: [
        'Natural language queries',
        'Real-time data visualization',
        'Custom KPI tracking',
        'Performance analytics',
        'Export & reporting'
      ],
      demo: 'analytics'
    },
    {
      icon: Target,
      title: 'Functional CRM & Marketing',
      description: 'Complete customer lifecycle management with intelligent automation',
      details: [
        'Lead scoring & qualification',
        'Automated follow-up sequences',
        'Customer journey mapping',
        'Sales pipeline optimization',
        'Marketing campaign automation'
      ],
      demo: 'crm'
    },
    {
      icon: Share2,
      title: 'Social Media Management',
      description: 'AI-powered social media automation and engagement',
      details: [
        'Multi-platform publishing',
        'Content generation & scheduling',
        'Audience engagement automation',
        'Performance analytics',
        'Influencer collaboration tools'
      ],
      demo: 'social'
    }
  ];

  const techSpecs = [
    {
      icon: Bot,
      title: 'Micro LLM Engine',
      description: 'Task-specific AI models that run 10x faster and cost 90% less than GPT-4',
      metrics: ['10ms response time', '90% cost reduction', '99.9% accuracy']
    },
    {
      icon: Globe,
      title: 'Global Deployment',
      description: 'Deploy in 100+ countries with local compliance and data residency',
      metrics: ['100+ countries', 'GDPR compliant', '99.99% uptime']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with SOC 2 compliance and end-to-end encryption',
      metrics: ['SOC 2 certified', '256-bit encryption', 'Zero trust architecture']
    },
    {
      icon: Users,
      title: 'Multi-Agent Teams',
      description: 'Orchestrate teams of AI agents that work together seamlessly',
      metrics: ['Unlimited agents', 'Team coordination', 'Load balancing']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-primary-muted/10 to-secondary-glow/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Product Suite</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Everything Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Team
              </span>{' '}
              Needs
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              From simple chatbots to complex multi-agent workflows. Build, deploy, and scale 
              your AI employees with enterprise-grade tools designed for the future of work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl">
                Start Free Trial
              </Button>
              <Button variant="outline" size="xl">
                Book Demo
              </Button>
            </div>
          </div>

          {/* Interactive Workflow Demo */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Try Building a Workflow Right Now</h2>
              <p className="text-muted-foreground">Real drag-and-drop interface - no signup required</p>
            </div>
            <WorkflowBuilder isDemo={false} />
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                          Enterprise Ready
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature Details */}
                    <div className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button variant="default" size="lg" className="group">
                        <span>Try {feature.title}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <Button variant="outline" size="lg" className="group">
                        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Watch Demo</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {feature.demo === 'workflow' && (
                    <WorkflowBuilder isDemo={true} />
                  )}
                  
                  {feature.demo === 'channels' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <LiveDemo
                        type="chat"
                        title="Web Chat Demo"
                        description="Try our banking assistant"
                        industry="banking"
                      />
                      <LiveDemo
                        type="whatsapp"
                        title="WhatsApp Bot"
                        description="Real estate lead qualification"
                        industry="realestate"
                      />
                    </div>
                  )}

                  {feature.demo === 'builder' && (
                    <InteractiveAIBuilder />
                  )}

                  {feature.demo === 'analytics' && (
                    <InteractiveAnalyticsDashboard />
                  )}

                  {feature.demo === 'crm' && (
                    <InteractiveCRM />
                  )}

                  {feature.demo === 'social' && (
                    <InteractiveSocialMedia />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built for{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Enterprise Scale
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry-leading performance, security, and reliability that enterprises trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center group hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <spec.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-bold text-foreground mb-2">{spec.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{spec.description}</p>
                
                <div className="space-y-2">
                  {spec.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">
                      {metric}
                    </div>
                  ))}
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using BotWot AI to automate their workflows 
              and scale their operations with intelligent AI employees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-white/20 hover:bg-white/30">
                Start Building Free
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                Book Enterprise Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-12 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;