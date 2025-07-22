import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  Cpu, 
  Shield,
  Zap,
  Globe,
  Database,
  Cloud,
  Network,
  CheckCircle2,
  Code
} from 'lucide-react';

const TechnologyPage = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const techStack = [
    {
      category: 'AI & ML',
      icon: Brain,
      technologies: ['GPT-4', 'Custom LLMs', 'Neural Networks', 'NLP Processing']
    },
    {
      category: 'Infrastructure', 
      icon: Cloud,
      technologies: ['Kubernetes', 'AWS/Azure/GCP', 'Auto-scaling', 'Edge Computing']
    },
    {
      category: 'Security',
      icon: Shield,
      technologies: ['End-to-end Encryption', 'SOC 2', 'GDPR Compliant', 'Zero Trust']
    },
    {
      category: 'Integration',
      icon: Network,
      technologies: ['REST APIs', 'GraphQL', 'Webhooks', 'SDKs']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Enterprise{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Technology
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Built for scale with military-grade security and 99.99% uptime.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { metric: '98.7%', label: 'AI Accuracy' },
                { metric: '<150ms', label: 'Response Time' },
                { metric: '99.99%', label: 'Uptime SLA' },
                { metric: '95+', label: 'Languages' }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.metric}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Technology Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((stack, index) => (
              <Card key={index} className="p-6 hover:shadow-ai transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <stack.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{stack.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-hero text-white rounded-3xl p-16 text-center max-w-4xl mx-auto">
            <Code className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Build?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get started with our APIs and documentation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                Developer Portal
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white">
                API Reference
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;