import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  ShoppingCart, 
  Plane, 
  GraduationCap, 
  Heart,
  Crown,
  MessageSquare,
  Phone,
  Mail,
  Bot,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';

const UseCasesSection = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      icon: Building,
      title: 'Banking & Fintech',
      subtitle: 'Smart Financial Services',
      description: 'AI agents for lead scoring, collections, fraud alerts, and customer onboarding',
      color: 'primary',
      features: [
        'Automated KYC processing',
        'Intelligent fraud detection',
        'Lead scoring & qualification',
        'Collections & payment reminders',
        'Customer support automation'
      ],
      metrics: [
        { label: 'Faster Onboarding', value: '10x' },
        { label: 'Cost Reduction', value: '70%' },
        { label: 'Fraud Detection', value: '99.8%' }
      ],
      channels: [MessageSquare, Phone, Mail, Bot]
    },
    {
      icon: Home,
      title: 'Real Estate',
      subtitle: 'Intelligent Property Services',
      description: 'Smart voice agents for site booking, lead profiling, and property management',
      color: 'secondary',
      features: [
        'Automated site visit booking',
        'Lead qualification & scoring',
        'Property recommendation engine',
        'Follow-up automation',
        'Document collection'
      ],
      metrics: [
        { label: 'Lead Conversion', value: '85%' },
        { label: 'Response Time', value: '<1min' },
        { label: 'Site Bookings', value: '300%' }
      ],
      channels: [Phone, MessageSquare, Mail, Bot]
    },
    {
      icon: ShoppingCart,
      title: 'Ecommerce',
      subtitle: 'Conversational Commerce',
      description: 'Cart recovery, conversational product discovery, and intelligent order management',
      color: 'accent',
      features: [
        'Personalized product recommendations',
        'Cart abandonment recovery',
        'Order status automation',
        'Customer service chatbots',
        'Inventory notifications'
      ],
      metrics: [
        { label: 'Cart Recovery', value: '45%' },
        { label: 'Sales Increase', value: '35%' },
        { label: 'Support Tickets', value: '-80%' }
      ],
      channels: [MessageSquare, Bot, Mail, Phone]
    },
    {
      icon: Plane,
      title: 'Travel & Airlines',
      subtitle: 'Seamless Travel Experience',
      description: 'AI Voice booking, customer reschedule flow, and travel assistance',
      color: 'primary',
      features: [
        'Voice-powered booking',
        'Flight change automation',
        'Travel recommendations',
        'Emergency assistance',
        'Loyalty program management'
      ],
      metrics: [
        { label: 'Booking Speed', value: '5x' },
        { label: 'Customer Satisfaction', value: '96%' },
        { label: 'Call Volume', value: '-60%' }
      ],
      channels: [Phone, MessageSquare, Bot, Mail]
    },
    {
      icon: GraduationCap,
      title: 'Education',
      subtitle: 'AI-Powered Learning',
      description: 'Multilingual teaching assistants and comprehensive parent dashboards',
      color: 'secondary',
      features: [
        'Personalized tutoring',
        'Assignment assistance',
        'Parent communication',
        'Progress tracking',
        'Multilingual support'
      ],
      metrics: [
        { label: 'Learning Efficiency', value: '65%' },
        { label: 'Parent Engagement', value: '90%' },
        { label: 'Teacher Time Saved', value: '40%' }
      ],
      channels: [MessageSquare, Bot, Mail, Phone]
    },
    {
      icon: Heart,
      title: 'Healthcare',
      subtitle: 'Intelligent Patient Care',
      description: 'KYC processing, appointment agents, follow-ups, and health monitoring',
      color: 'accent',
      features: [
        'Appointment scheduling',
        'Medication reminders',
        'Symptom assessment',
        'Insurance verification',
        'Follow-up care'
      ],
      metrics: [
        { label: 'Appointment Efficiency', value: '80%' },
        { label: 'Patient Satisfaction', value: '92%' },
        { label: 'No-shows Reduction', value: '50%' }
      ],
      channels: [Phone, MessageSquare, Bot, Mail]
    },
    {
      icon: Crown,
      title: 'Concierge/UHNWI',
      subtitle: 'White-Glove Service',
      description: 'Premium voice + WhatsApp experiences for high-net-worth individuals',
      color: 'primary',
      features: [
        'Personal assistant AI',
        'Lifestyle management',
        'Travel coordination',
        'Event planning',
        'Priority support'
      ],
      metrics: [
        { label: 'Response Time', value: '<30s' },
        { label: 'Service Quality', value: '99%' },
        { label: 'Client Retention', value: '98%' }
      ],
      channels: [Phone, MessageSquare, Mail, Bot]
    }
  ];

  const currentUseCase = useCases[activeUseCase];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 text-sm mb-6">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium">Industry Solutions</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            BotWot AI for{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Your Industry
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover how leading companies across industries are transforming their operations 
            with intelligent AI employees tailored to their specific needs.
          </p>
        </div>

        {/* Interactive Use Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Industry Selector */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              {useCases.map((useCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveUseCase(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeUseCase === index
                      ? 'bg-gradient-ai border border-primary/20 shadow-ai'
                      : 'bg-card/50 border border-border/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeUseCase === index
                        ? useCase.color === 'primary' ? 'bg-gradient-primary text-white' :
                          useCase.color === 'secondary' ? 'bg-gradient-secondary text-white' :
                          'bg-gradient-to-r from-accent to-accent-glow text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <useCase.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        activeUseCase === index ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{useCase.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Use Case Details */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 lg:p-12 shadow-ai">
              {/* Header */}
              <div className="flex items-start space-x-6 mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow ${
                  currentUseCase.color === 'primary' ? 'bg-gradient-primary' :
                  currentUseCase.color === 'secondary' ? 'bg-gradient-secondary' :
                  'bg-gradient-to-r from-accent to-accent-glow'
                }`}>
                  <currentUseCase.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {currentUseCase.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    {currentUseCase.description}
                  </p>
                  
                  {/* Channels */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground">Channels:</span>
                    {currentUseCase.channels.map((Channel, index) => (
                      <div key={index} className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                        <Channel className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {currentUseCase.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className={`w-5 h-5 ${
                          currentUseCase.color === 'primary' ? 'text-primary' :
                          currentUseCase.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`} />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Impact Metrics</h4>
                  <div className="space-y-4">
                    {currentUseCase.metrics.map((metric, index) => (
                      <div key={index} className="bg-background/50 rounded-xl p-4 border border-border/30">
                        <div className={`text-2xl font-bold ${
                          currentUseCase.color === 'primary' ? 'text-primary' :
                          currentUseCase.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant={currentUseCase.color === 'primary' ? 'default' : currentUseCase.color === 'secondary' ? 'secondary' : 'demo'} 
                  size="lg"
                  className="group flex-1"
                >
                  <span>Try {currentUseCase.title} Demo</span>
                  <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>
                
                <Button variant="outline" size="lg" className="group">
                  <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Book Consultation</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Companies Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <div className="text-muted-foreground">Industries Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">10M+</div>
            <div className="text-muted-foreground">Interactions Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;