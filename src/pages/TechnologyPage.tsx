import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Cpu, 
  Shield,
  Zap,
  Network,
  Database,
  Cloud,
  Code,
  Lock,
  Globe,
  MessageSquare,
  Phone,
  Bot,
  Workflow,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const TechnologyPage = () => {
  const technologies = [
    {
      icon: Brain,
      title: 'Proprietary Micro LLMs',
      description: 'Task-specific AI models that run 10x faster and cost 90% less than general-purpose LLMs',
      features: [
        'Industry-specific training',
        'Sub-second response times',
        'Cost-optimized inference',
        'Continuous learning'
      ],
      stats: { speed: '10x faster', cost: '90% cheaper', accuracy: '95%+' }
    },
    {
      icon: Workflow,
      title: 'Multi-modal Agent Engine',
      description: 'Unified orchestration layer that seamlessly handles voice, text, and visual interactions',
      features: [
        'Voice-to-text processing',
        'Emotion detection',
        'Context switching',
        'Memory persistence'
      ],
      stats: { channels: '5+', uptime: '99.9%', latency: '<100ms' }
    },
    {
      icon: Database,
      title: 'AI Agent Memory System',
      description: 'Advanced memory architecture that learns from every interaction and improves over time',
      features: [
        'Conversation history',
        'User preference learning',
        'Contextual awareness',
        'Feedback integration'
      ],
      stats: { retention: '100%', learning: 'Real-time', capacity: 'Unlimited' }
    },
    {
      icon: Phone,
      title: 'Voice AI Technology',
      description: 'Human-like voice synthesis with customizable personalities and emotional intelligence',
      features: [
        'Natural speech patterns',
        'Emotion synthesis',
        'Multi-language support',
        'Voice cloning'
      ],
      stats: { languages: '25+', quality: 'Studio-grade', latency: '<200ms' }
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance-ready infrastructure',
      features: [
        'End-to-end encryption',
        'SOC 2 compliance',
        'GDPR ready',
        'Data residency options'
      ],
      stats: { encryption: 'AES-256', compliance: 'SOC 2', uptime: '99.99%' }
    },
    {
      icon: Code,
      title: 'API-First Architecture',
      description: 'Comprehensive APIs and webhooks for seamless integration with your existing systems',
      features: [
        'RESTful APIs',
        'Real-time webhooks',
        'SDK libraries',
        'Custom integrations'
      ],
      stats: { endpoints: '50+', response: '<50ms', uptime: '99.9%' }
    }
  ];

  const architecture = [
    {
      layer: 'User Interface',
      description: 'Drag-and-drop workflow builder, dashboard, and management console',
      technologies: ['React', 'TypeScript', 'WebRTC', 'Socket.io']
    },
    {
      layer: 'AI Orchestration',
      description: 'Intelligent routing, context management, and multi-modal processing',
      technologies: ['Node.js', 'Python', 'TensorFlow', 'PyTorch']
    },
    {
      layer: 'Micro LLM Engine',
      description: 'Optimized language models for specific tasks and industries',
      technologies: ['Custom Models', 'ONNX', 'TensorRT', 'CUDA']
    },
    {
      layer: 'Integration Layer',
      description: 'APIs, webhooks, and connectors for third-party systems',
      technologies: ['REST APIs', 'GraphQL', 'Kafka', 'Redis']
    },
    {
      layer: 'Infrastructure',
      description: 'Scalable cloud infrastructure with global deployment options',
      technologies: ['Kubernetes', 'Docker', 'AWS', 'Azure']
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
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Advanced Technology</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              The{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Engine
              </span>
              {' '}Behind AI Magic
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the cutting-edge technology stack that powers BotWot AI's intelligent automation platform.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 hover:shadow-glow transition-all duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
                  {Object.entries(tech.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              System{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Architecture
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on a modern, scalable architecture designed for enterprise-grade performance and reliability
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {architecture.map((layer, index) => (
                <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{layer.layer}</h3>
                      <p className="text-muted-foreground text-sm">{layer.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-primary/30">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Performance at Scale</h2>
            <p className="text-xl text-muted-foreground">
              Built to handle millions of interactions with enterprise-grade reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { metric: '99.99%', label: 'Uptime SLA' },
              { metric: '<100ms', label: 'Response Time' },
              { metric: '10M+', label: 'Interactions/Day' },
              { metric: '50+', label: 'Concurrent Users' }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Security & Compliance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade security built into every layer of our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Lock,
                title: 'Data Protection',
                features: ['End-to-end encryption', 'Zero-trust architecture', 'Data residency options', 'Secure key management']
              },
              {
                icon: Shield,
                title: 'Compliance',
                features: ['SOC 2 Type II', 'GDPR compliant', 'HIPAA ready', 'ISO 27001 certified']
              },
              {
                icon: Globe,
                title: 'Infrastructure',
                features: ['Multi-region deployment', 'Auto-scaling', 'Disaster recovery', '24/7 monitoring']
              }
            ].map((section, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
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
              Experience the Technology
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              See our advanced AI technology in action. Book a technical deep-dive with our engineering team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-white/20 hover:bg-white/30">
                Schedule Tech Demo
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;