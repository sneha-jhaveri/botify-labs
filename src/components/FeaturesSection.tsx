import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Globe,
  Database,
  Shield,
  Cpu,
  Network,
  Activity
} from 'lucide-react';

// Advanced Animation Component
const AnimatedFeatureDemo = ({ feature, isActive, onActivate }: { 
  feature: any; 
  isActive: boolean; 
  onActivate: () => void;
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate particles for active animation
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
      
      // Animation sequence
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 4);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const getAnimationContent = () => {
    switch (feature.animationType) {
      case 'ai-employee':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl overflow-hidden">
            {/* Neural Network Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-1000 ${
                      isActive ? 'bg-primary animate-pulse' : 'bg-muted'
                    }`}
                    style={{ 
                      animationDelay: `${i * 200}ms`,
                      transform: isActive ? 'scale(1.2)' : 'scale(0.8)'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(6)].map((_, i) => (
                <line
                  key={i}
                  x1={`${20 + (i % 3) * 30}%`}
                  y1="30%"
                  x2={`${35 + (i % 2) * 30}%`}
                  y2="70%"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-primary/30 transition-all duration-1000 ${
                    isActive ? 'opacity-100' : 'opacity-20'
                  }`}
                  strokeDasharray="10,5"
                  style={{
                    animationDelay: `${i * 300}ms`
                  }}
                />
              ))}
            </svg>
          </div>
        );
        
      case 'workflow':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-secondary/5 to-secondary/20 rounded-2xl overflow-hidden">
            {/* Workflow Steps */}
            <div className="absolute inset-0 flex items-center justify-around p-8">
              {['Start', 'Process', 'AI Logic', 'Output'].map((step, i) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                      isActive && animationStep >= i
                        ? 'border-secondary bg-secondary/20 scale-110'
                        : 'border-muted bg-background'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                      isActive && animationStep >= i ? 'bg-secondary' : 'bg-muted'
                    }`} />
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">{step}</span>
                  
                  {/* Arrow to next step */}
                  {i < 3 && (
                    <ArrowRight 
                      className={`w-4 h-4 mt-4 transition-all duration-500 ${
                        isActive && animationStep > i 
                          ? 'text-secondary translate-x-1' 
                          : 'text-muted'
                      }`}
                      style={{ transform: 'rotate(90deg)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'multi-channel':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-accent/5 to-accent/20 rounded-2xl overflow-hidden">
            {/* Channel Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Central AI Hub */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center transition-all duration-1000 ${
                  isActive ? 'scale-110 shadow-glow' : 'scale-100'
                }`}>
                  <Bot className="w-8 h-8 text-white" />
                </div>
                
                {/* Channel Icons */}
                {[
                  { icon: MessageSquare, angle: 0, label: 'Chat' },
                  { icon: PhoneCall, angle: 90, label: 'Voice' },
                  { icon: Mail, angle: 180, label: 'Email' },
                  { icon: Globe, angle: 270, label: 'Web' }
                ].map(({ icon: Icon, angle, label }, i) => (
                  <div
                    key={label}
                    className={`absolute w-10 h-10 rounded-full bg-background border-2 border-accent/30 flex items-center justify-center transition-all duration-1000 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
                    }`}
                    style={{
                      transform: `rotate(${angle}deg) translateY(-60px) rotate(-${angle}deg) ${
                        isActive ? 'scale(1.1)' : 'scale(0.9)'
                      }`,
                      animationDelay: `${i * 200}ms`
                    }}
                  >
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                ))}
                
                {/* Pulse Rings */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-accent/20 animate-ping" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border border-accent/10 animate-ping" style={{ animationDelay: '0.5s' }} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'dashboard':
        return (
          <div className="relative w-full h-64 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl overflow-hidden p-6">
            {/* Dashboard Widgets */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {[
                { icon: TrendingUp, value: '↗ 24%', label: 'Growth' },
                { icon: Users, value: '1.2K', label: 'Users' },
                { icon: Activity, value: '99.9%', label: 'Uptime' },
                { icon: Database, value: '2.5M', label: 'Records' }
              ].map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-primary/10 transition-all duration-1000 ${
                    isActive ? 'transform scale-105 shadow-lg' : 'scale-95 opacity-70'
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <Icon className={`w-5 h-5 mb-2 transition-colors duration-500 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className={`text-lg font-bold transition-colors duration-500 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <div className="w-full h-64 bg-muted/20 rounded-2xl" />;
    }
  };

  return (
    <div 
      className="relative cursor-pointer group"
      onClick={onActivate}
    >
      {/* Animated particles */}
      {isActive && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/40 rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Main animation content */}
      <div className={`transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
        {getAnimationContent()}
      </div>
      
      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        !isActive ? 'block' : 'hidden'
      }`} />
      
      {/* Click to activate hint */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-foreground border border-primary/20">
            Click to activate
          </div>
        </div>
      )}
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
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
      color: 'primary',
      stats: { users: '12K+', accuracy: '99.2%', speed: '< 100ms' }
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
      color: 'secondary',
      stats: { workflows: '50K+', efficiency: '89%', time_saved: '40hrs/week' }
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
      color: 'accent',
      stats: { channels: '15+', messages: '2M+', response_time: '< 2s' }
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
      color: 'primary',
      stats: { dashboards: '8K+', insights: '150+', update_freq: 'Real-time' }
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

        {/* Interactive Features Grid */}
        <div className="space-y-20">
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
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow transition-all duration-500 ${
                      activeFeature === index ? 'scale-110' : 'scale-100'
                    } ${
                      feature.color === 'primary' ? 'bg-gradient-primary' :
                      feature.color === 'secondary' ? 'bg-gradient-secondary' :
                      'bg-gradient-to-r from-accent to-accent-glow'
                    }`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          feature.color === 'primary' ? 'bg-primary' :
                          feature.color === 'secondary' ? 'bg-secondary' :
                          'bg-accent'
                        }`} />
                        <span className="text-sm text-muted-foreground font-medium">
                          Enterprise Ready
                        </span>
                        {activeFeature === index && (
                          <div className="flex items-center space-x-2 text-xs text-primary font-medium">
                            <Activity className="w-3 h-3" />
                            <span>Live Demo Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats Display */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-background/50 to-muted/20 rounded-xl border border-primary/10">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-2xl font-bold ${
                          feature.color === 'primary' ? 'text-primary' :
                          feature.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`}>
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div 
                        key={capIndex} 
                        className={`flex items-center space-x-3 transition-all duration-300 ${
                          activeFeature === index ? 'translate-x-1' : 'translate-x-0'
                        }`}
                        style={{ transitionDelay: `${capIndex * 100}ms` }}
                      >
                        <CheckCircle2 className={`w-5 h-5 transition-all duration-300 ${
                          activeFeature === index ? 'scale-110' : 'scale-100'
                        } ${
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
                      onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                    >
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>{activeFeature === index ? 'Stop Demo' : 'Try Interactive Demo'}</span>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="group">
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Watch Video</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Interactive Demo */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <AnimatedFeatureDemo
                  feature={feature}
                  isActive={activeFeature === index}
                  onActivate={() => setActiveFeature(activeFeature === index ? null : index)}
                />

                {/* Enhanced Floating Elements */}
                <div className={`absolute -top-6 -left-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-primary/30 shadow-glow scale-110 animate-bounce' 
                    : 'bg-primary/20 animate-float'
                }`}>
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                
                <div className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-secondary/30 shadow-glow scale-110 animate-spin' 
                    : 'bg-secondary/20 animate-float'
                }`} style={{ animationDelay: '1s' }}>
                  <Zap className="w-6 h-6 text-secondary" />
                </div>

                {/* Performance Indicators */}
                {activeFeature === index && (
                  <>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground border border-primary/20 animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Live Demo</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-foreground border border-primary/20 animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>Response: &lt; 100ms</span>
                      </div>
                    </div>
                  </>
                )}
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