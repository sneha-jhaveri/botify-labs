import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Workflow, 
  MessageSquare, 
  BarChart3, 
  Zap,
  Bot,
  PhoneCall,
  Mail,
  ArrowRight,
  CheckCircle2,
  Play
} from 'lucide-react';
import CapabilityAnimation from '@/components/CapabilityAnimation';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Employee Builder',
      description: 'Drag-and-drop agent creation with voice, chat, logic, decision trees, and API integrations.',
      animationType: 'ai-employee' as const,
      capabilities: [
        'Visual agent designer',
        'Multi-modal AI (text, voice, vision)',
        'Custom personality & training',
        'Enterprise-grade security'
      ],
      color: 'primary'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation (iAWO)',
      description: 'No-code visual builder with blocks for triggers, logic, AI actions, and channels.',
      animationType: 'workflow' as const,
      capabilities: [
        'Drag-and-drop workflow design',
        'Smart triggers & conditions',
        'Multi-step automation',
        'Real-time monitoring'
      ],
      color: 'secondary'
    },
    {
      icon: MessageSquare,
      title: 'Multi-Channel Orchestration',
      description: 'WhatsApp, Instagram, Voice, Web, Email — deploy instantly across all channels.',
      animationType: 'multi-channel' as const,
      capabilities: [
        'Unified conversation management',
        'Cross-channel context',
        'Instant deployment',
        'Analytics & insights'
      ],
      color: 'accent'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Builder',
      description: 'Prompt-based dashboard builder for ops, analytics, lead management and more.',
      animationType: 'dashboard' as const,
      capabilities: [
        'Natural language dashboards',
        'Real-time data visualization',
        'Custom KPI tracking',
        'Export & sharing'
      ],
      color: 'primary'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Platform Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Everything Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Team
            </span>{' '}
            Needs
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            From simple chatbots to complex multi-agent workflows. Build, deploy, and scale 
            your AI employees with enterprise-grade tools designed for the future of work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow ${
                      feature.color === 'primary' ? 'bg-gradient-primary' :
                      feature.color === 'secondary' ? 'bg-gradient-secondary' :
                      'bg-gradient-to-r from-accent to-accent-glow'
                    }`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          feature.color === 'primary' ? 'bg-primary' :
                          feature.color === 'secondary' ? 'bg-secondary' :
                          'bg-accent'
                        }`} />
                        <span className="text-sm text-muted-foreground font-medium">
                          Enterprise Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center space-x-3">
                        <CheckCircle2 className={`w-5 h-5 ${
                          feature.color === 'primary' ? 'text-primary' :
                          feature.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`} />
                        <span className="text-foreground font-medium">{capability}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      variant={feature.color === 'primary' ? 'default' : feature.color === 'secondary' ? 'secondary' : 'demo'} 
                      size="lg" 
                      className="group"
                    >
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

              {/* Visual Animation */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <CapabilityAnimation
                  type={feature.animationType}
                  title={`${feature.title} in Action`}
                  description="Watch how our AI technology transforms your business processes"
                />

                {/* Floating Icons */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center animate-float">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Build Your First AI Employee?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of companies already using BotWot AI to automate their workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl">
                Start Building Free
              </Button>
              <Button variant="outline" size="xl">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;