import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import { 
  Building2, 
  Home, 
  ShoppingCart, 
  Plane, 
  GraduationCap, 
  Heart, 
  Crown,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Brain,
  Bot,
  MessageSquare,
  Phone,
  Mail,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react';

const UseCasesPage = () => {
  const [activeUseCase, setActiveUseCase] = useState('banking');
  const [showWorkflow, setShowWorkflow] = useState(false);

  const useCases = [
    {
      id: 'banking',
      icon: Building2,
      title: 'Banking & Fintech',
      description: 'Transform financial services with intelligent automation',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400',
      features: [
        'KYC Document Processing',
        'Fraud Detection & Alerts',
        'Loan Pre-qualification',
        'Account Opening Automation',
        'Customer Onboarding',
        'Collections & Recovery'
      ],
      metrics: {
        'Processing Time': '85% faster',
        'Cost Reduction': '70% savings',
        'Customer Satisfaction': '94% rating',
        'Fraud Detection': '99.2% accuracy'
      },
      workflows: [
        'Lead Qualification → Credit Check → Documentation → Approval',
        'Fraud Alert → Investigation → Customer Notification → Resolution',
        'Account Opening → KYC → Verification → Activation'
      ]
    },
    {
      id: 'realestate',
      icon: Home,
      title: 'Real Estate',
      description: 'Streamline property operations and client management',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      textColor: 'text-green-400',
      features: [
        'Lead Qualification',
        'Property Matching',
        'Viewing Coordination',
        'Market Analysis',
        'Contract Management',
        'Client Communication'
      ],
      metrics: {
        'Lead Conversion': '65% increase',
        'Response Time': '<2 minutes',
        'Bookings': '300% growth',
        'Client Satisfaction': '92% rating'
      },
      workflows: [
        'Lead Capture → Qualification → Property Match → Viewing Schedule',
        'Market Analysis → Pricing → Listing → Client Outreach',
        'Contract → Documentation → Legal Review → Closing'
      ]
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Boost sales with personalized shopping experiences',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
      features: [
        'Product Recommendations',
        'Cart Abandonment Recovery',
        'Order Status Updates',
        'Customer Support Chat',
        'Inventory Management',
        'Return Processing'
      ],
      metrics: {
        'Cart Recovery': '45% improvement',
        'Sales Growth': '35% increase',
        'Support Tickets': '80% reduction',
        'Customer Retention': '68% improvement'
      },
      workflows: [
        'Product Discovery → Recommendations → Cart → Checkout',
        'Cart Abandonment → Email → WhatsApp → Recovery',
        'Order → Fulfillment → Tracking → Delivery Confirmation'
      ]
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel & Airlines',
      description: 'Enhance travel experiences with smart automation',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      textColor: 'text-orange-400',
      features: [
        'Booking Automation',
        'Schedule Changes',
        'Travel Assistance',
        'Loyalty Management',
        'Emergency Support',
        'Itinerary Planning'
      ],
      metrics: {
        'Booking Speed': '5x faster',
        'Customer Satisfaction': '96% rating',
        'Support Calls': '60% reduction',
        'Revenue Growth': '25% increase'
      },
      workflows: [
        'Search → Price Compare → Book → Confirmation',
        'Check-in → Boarding Pass → Gate Updates → Flight Status',
        'Delay Alert → Rebooking → Compensation → Resolution'
      ]
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Education',
      description: 'Revolutionize learning with AI-powered education',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      textColor: 'text-indigo-400',
      features: [
        'Student Assessment',
        'Personalized Learning',
        'Parent Communication',
        'Administrative Tasks',
        'Attendance Tracking',
        'Performance Analytics'
      ],
      metrics: {
        'Learning Efficiency': '40% improvement',
        'Teacher Time Saved': '30% reduction',
        'Student Engagement': '85% increase',
        'Parent Satisfaction': '91% rating'
      },
      workflows: [
        'Assessment → Analysis → Personalized Plan → Progress Tracking',
        'Attendance → Parent Notification → Follow-up → Resolution',
        'Assignment → Grading → Feedback → Improvement Suggestions'
      ]
    },
    {
      id: 'healthcare',
      icon: Heart,
      title: 'Healthcare',
      description: 'Improve patient care with intelligent automation',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
      features: [
        'Appointment Scheduling',
        'Patient Intake',
        'Insurance Verification',
        'Follow-up Care',
        'Prescription Management',
        'Emergency Protocols'
      ],
      metrics: {
        'Wait Times': '50% reduction',
        'Administrative Costs': '40% savings',
        'Patient Satisfaction': '93% rating',
        'Care Quality': '28% improvement'
      },
      workflows: [
        'Symptom Check → Triage → Appointment → Care Plan',
        'Insurance → Verification → Authorization → Treatment',
        'Treatment → Recovery → Follow-up → Outcome Tracking'
      ]
    },
    {
      id: 'luxury',
      icon: Crown,
      title: 'Luxury & Concierge',
      description: 'Deliver premium experiences with white-glove service',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      textColor: 'text-yellow-400',
      features: [
        'Personal Assistant Services',
        'VIP Experience Management',
        'Exclusive Access Coordination',
        'Lifestyle Management',
        'Event Planning',
        'Travel Concierge'
      ],
      metrics: {
        'Client Satisfaction': '98% rating',
        'Response Time': '<30 seconds',
        'Request Fulfillment': '99.5% success',
        'Retention Rate': '95% annually'
      },
      workflows: [
        'Request → Assessment → Sourcing → Execution → Follow-up',
        'Event Planning → Vendor Coordination → Execution → Feedback',
        'Travel → Itinerary → Reservations → Support → Experience'
      ]
    }
  ];

  const currentUseCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-primary-muted/5 to-secondary-glow/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Industry Solutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              AI{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transformation
              </span>
              {' '}by Industry
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Discover how leading companies across industries are using BotWot AI to automate 
              complex workflows and deliver exceptional customer experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" onClick={() => setShowWorkflow(true)}>
                <Zap className="w-5 h-5 mr-2" />
                Build Custom Workflow
              </Button>
              <Button variant="outline" size="xl">
                <Globe className="w-5 h-5 mr-2" />
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Use Case Explorer */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Industry Selector */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6">Choose Your Industry</h3>
              <div className="space-y-3">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.id}
                    onClick={() => setActiveUseCase(useCase.id)}
                    className={`
                      w-full text-left p-4 rounded-xl border transition-all duration-300 group
                      ${activeUseCase === useCase.id 
                        ? `${useCase.bgColor} ${useCase.borderColor} shadow-glow` 
                        : 'bg-muted/20 border-border/30 hover:bg-muted/40'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${activeUseCase === useCase.id 
                          ? `bg-gradient-to-r ${useCase.color}` 
                          : 'bg-muted'
                        }
                      `}>
                        <useCase.icon className={`w-5 h-5 ${
                          activeUseCase === useCase.id ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          activeUseCase === useCase.id ? useCase.textColor : 'text-foreground'
                        }`}>
                          {useCase.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {useCase.features.length} Solutions
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Use Case Details */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentUseCase.color} flex items-center justify-center`}>
                      <currentUseCase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{currentUseCase.title}</h2>
                      <p className="text-muted-foreground text-lg">{currentUseCase.description}</p>
                    </div>
                  </div>
                  <Badge className={`${currentUseCase.bgColor} ${currentUseCase.textColor} border-none`}>
                    Live Solutions
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(currentUseCase.metrics).map(([key, value]) => (
                    <div key={key} className="bg-background/50 rounded-xl p-4 text-center border border-border/30">
                      <div className={`text-xl font-bold ${currentUseCase.textColor} mb-1`}>{value}</div>
                      <div className="text-xs text-muted-foreground">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold mb-4 flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-primary" />
                      AI Capabilities
                    </h4>
                    <div className="space-y-3">
                      {currentUseCase.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle2 className={`w-4 h-4 ${currentUseCase.textColor}`} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                      Workflow Examples
                    </h4>
                    <div className="space-y-3">
                      {currentUseCase.workflows.map((workflow, index) => (
                        <div key={index} className="text-sm bg-background/30 rounded-lg p-3 border border-border/20">
                          {workflow}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="cta" 
                    className="flex-1"
                    onClick={() => setShowWorkflow(true)}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Build {currentUseCase.title} Workflow
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="w-5 h-5 mr-2" />
                    View Case Studies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Builder Modal */}
      {showWorkflow && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl border border-primary/20 w-full max-w-6xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div>
                <h3 className="text-2xl font-bold">Build {currentUseCase.title} Workflow</h3>
                <p className="text-muted-foreground">Drag and connect AI blocks to create intelligent automation</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowWorkflow(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <WorkflowBuilder 
                isDemo={false}
                industry={currentUseCase.id}
                onComplete={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Success{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from companies that transformed their operations with BotWot AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                company: 'FinanceFirst Bank',
                industry: 'Banking',
                result: '85% faster loan processing',
                quote: 'BotWot AI revolutionized our customer onboarding. What used to take days now happens in minutes.',
                metrics: ['70% cost reduction', '94% satisfaction', '99.2% accuracy']
              },
              {
                company: 'PropTech Solutions',
                industry: 'Real Estate',
                result: '300% increase in bookings',
                quote: 'Our AI agents handle 80% of inquiries automatically, letting our team focus on closing deals.',
                metrics: ['65% conversion rate', '<2min response', '92% satisfaction']
              },
              {
                company: 'ShopSmart E-commerce',
                industry: 'Retail',
                result: '45% cart recovery rate',
                quote: 'The personalized shopping assistant increased our sales by 35% in just 3 months.',
                metrics: ['35% sales growth', '80% fewer tickets', '68% retention']
              }
            ].map((story, index) => (
              <div key={index} className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{story.company}</h4>
                      <p className="text-sm text-muted-foreground">{story.industry}</p>
                    </div>
                    <div className="text-2xl font-bold text-primary">{story.result}</div>
                  </div>
                  <blockquote className="text-muted-foreground italic mb-4">
                    "{story.quote}"
                  </blockquote>
                </div>
                
                <div className="space-y-2">
                  {story.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm">{metric}</span>
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
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using BotWot AI to automate workflows 
              and deliver exceptional experiences in their industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="bg-white/20 hover:bg-white/30">
                <Brain className="w-5 h-5 mr-2" />
                Start Building Your Solution
              </Button>
              <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                <Users className="w-5 h-5 mr-2" />
                Schedule Industry Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-12 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Deploy in Days</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;