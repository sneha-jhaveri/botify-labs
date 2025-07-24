import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Brain, 
  TrendingUp, 
  CreditCard, 
  Mail,
  Phone,
  Home,
  ShoppingCart,
  Building,
  Plane,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Target,
  Instagram,
  MessageCircle,
  PhoneCall,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrchestrationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'pending' | 'active' | 'completed';
  type: 'customer' | 'ai' | 'action';
  channel?: {
    name: string;
    icon: React.ElementType;
    color: string;
  };
}

interface OrchestrationAnimationProps {
  industry: 'banking' | 'realestate' | 'ecommerce' | 'travel';
}

const OrchestrationAnimation = ({ industry }: OrchestrationAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [customerInterested, setCustomerInterested] = useState<boolean | null>(null);
  const [animationCycle, setAnimationCycle] = useState(0);

  const industryConfigs = {
    banking: {
      title: 'Banking Customer Journey',
      description: 'AI-powered loan application and qualification process',
      color: 'from-blue-500 to-blue-600',
      steps: [
        {
          id: 'query',
          title: 'Customer Inquiry',
          description: 'Customer asks about personal loan options',
          icon: MessageSquare,
          status: 'pending' as const,
          type: 'customer' as const,
          channel: {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'text-green-500'
          }
        },
        {
          id: 'analysis',
          title: 'AI Analysis',
          description: 'AI analyzes credit profile and eligibility',
          icon: Brain,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Engine',
            icon: Brain,
            color: 'text-purple-500'
          }
        },
        {
          id: 'assessment',
          title: 'Interest Assessment',
          description: 'AI determines customer intent level',
          icon: Target,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Voice Call',
            icon: PhoneCall,
            color: 'text-blue-500'
          }
        }
      ],
      interestedPath: [
        {
          id: 'approval',
          title: 'Pre-Approval',
          description: 'AI generates pre-approval offer',
          icon: CheckCircle2,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Email',
            icon: Mail,
            color: 'text-orange-500'
          }
        },
        {
          id: 'application',
          title: 'Application Link',
          description: 'Send secure application portal link',
          icon: CreditCard,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'SMS',
            icon: Smartphone,
            color: 'text-blue-500'
          }
        }
      ],
      notInterestedPath: [
        {
          id: 'nurture1',
          title: 'Educational Content',
          description: 'Send financial wellness tips',
          icon: Mail,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'LinkedIn',
            icon: Linkedin,
            color: 'text-blue-600'
          }
        },
        {
          id: 'nurture2',
          title: 'Follow-up Campaign',
          description: 'Schedule rate alerts and promotions',
          icon: TrendingUp,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Facebook',
            icon: Facebook,
            color: 'text-blue-500'
          }
        }
      ]
    },
    realestate: {
      title: 'Real Estate Lead Journey',
      description: 'AI-powered property search and viewing coordination',
      color: 'from-green-500 to-green-600',
      steps: [
        {
          id: 'query',
          title: 'Property Inquiry',
          description: 'Customer asks about available properties',
          icon: MessageSquare,
          status: 'pending' as const,
          type: 'customer' as const,
          channel: {
            name: 'Instagram',
            icon: Instagram,
            color: 'text-pink-500'
          }
        },
        {
          id: 'analysis',
          title: 'AI Matching',
          description: 'AI analyzes preferences and budget',
          icon: Brain,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Engine',
            icon: Brain,
            color: 'text-purple-500'
          }
        },
        {
          id: 'assessment',
          title: 'Interest Level',
          description: 'AI gauges buying intent and timeline',
          icon: Target,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'Website Chat',
            icon: Globe,
            color: 'text-blue-500'
          }
        }
      ],
      interestedPath: [
        {
          id: 'viewing',
          title: 'Schedule Viewing',
          description: 'Book property viewing appointment',
          icon: Home,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'AI Voice Call',
            icon: PhoneCall,
            color: 'text-green-500'
          }
        },
        {
          id: 'agent',
          title: 'Agent Handoff',
          description: 'Connect with qualified agent',
          icon: Phone,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'text-green-500'
          }
        }
      ],
      notInterestedPath: [
        {
          id: 'newsletter',
          title: 'Market Updates',
          description: 'Subscribe to market insights',
          icon: Mail,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Email',
            icon: Mail,
            color: 'text-orange-500'
          }
        },
        {
          id: 'alerts',
          title: 'Property Alerts',
          description: 'Set up automated property alerts',
          icon: TrendingUp,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'SMS',
            icon: Smartphone,
            color: 'text-blue-500'
          }
        }
      ]
    },
    ecommerce: {
      title: 'E-commerce Shopping Journey',
      description: 'AI-powered product recommendation and purchase flow',
      color: 'from-purple-500 to-purple-600',
      steps: [
        {
          id: 'query',
          title: 'Product Search',
          description: 'Customer searches for specific product',
          icon: MessageSquare,
          status: 'pending' as const,
          type: 'customer' as const,
          channel: {
            name: 'Facebook Messenger',
            icon: Facebook,
            color: 'text-blue-500'
          }
        },
        {
          id: 'analysis',
          title: 'AI Recommendation',
          description: 'AI analyzes preferences and history',
          icon: Brain,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Engine',
            icon: Brain,
            color: 'text-purple-500'
          }
        },
        {
          id: 'assessment',
          title: 'Purchase Intent',
          description: 'AI evaluates buying signals',
          icon: Target,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Voice Call',
            icon: PhoneCall,
            color: 'text-blue-500'
          }
        }
      ],
      interestedPath: [
        {
          id: 'discount',
          title: 'Special Offer',
          description: 'Apply personalized discount',
          icon: CheckCircle2,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'text-green-500'
          }
        },
        {
          id: 'checkout',
          title: 'Quick Checkout',
          description: 'Send one-click purchase link',
          icon: ShoppingCart,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'SMS',
            icon: Smartphone,
            color: 'text-blue-500'
          }
        }
      ],
      notInterestedPath: [
        {
          id: 'alternatives',
          title: 'Alternative Products',
          description: 'Suggest similar products',
          icon: Mail,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Email',
            icon: Mail,
            color: 'text-orange-500'
          }
        },
        {
          id: 'retargeting',
          title: 'Retargeting Campaign',
          description: 'Add to remarketing sequence',
          icon: TrendingUp,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Instagram',
            icon: Instagram,
            color: 'text-pink-500'
          }
        }
      ]
    },
    travel: {
      title: 'Travel Booking Journey',
      description: 'AI-powered trip planning and booking assistance',
      color: 'from-orange-500 to-orange-600',
      steps: [
        {
          id: 'query',
          title: 'Travel Inquiry',
          description: 'Customer asks about vacation packages',
          icon: MessageSquare,
          status: 'pending' as const,
          type: 'customer' as const,
          channel: {
            name: 'Twitter',
            icon: Twitter,
            color: 'text-blue-400'
          }
        },
        {
          id: 'analysis',
          title: 'AI Planning',
          description: 'AI analyzes preferences and budget',
          icon: Brain,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'AI Engine',
            icon: Brain,
            color: 'text-purple-500'
          }
        },
        {
          id: 'assessment',
          title: 'Booking Intent',
          description: 'AI assesses travel timeline',
          icon: Target,
          status: 'pending' as const,
          type: 'ai' as const,
          channel: {
            name: 'Website Chat',
            icon: Globe,
            color: 'text-blue-500'
          }
        }
      ],
      interestedPath: [
        {
          id: 'quote',
          title: 'Custom Quote',
          description: 'Generate personalized travel quote',
          icon: CheckCircle2,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Email',
            icon: Mail,
            color: 'text-orange-500'
          }
        },
        {
          id: 'booking',
          title: 'Booking Portal',
          description: 'Send secure booking link',
          icon: Plane,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'text-green-500'
          }
        }
      ],
      notInterestedPath: [
        {
          id: 'inspiration',
          title: 'Travel Inspiration',
          description: 'Send destination guides',
          icon: Mail,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'Instagram',
            icon: Instagram,
            color: 'text-pink-500'
          }
        },
        {
          id: 'deals',
          title: 'Deal Alerts',
          description: 'Subscribe to travel deals',
          icon: TrendingUp,
          status: 'pending' as const,
          type: 'action' as const,
          channel: {
            name: 'SMS',
            icon: Smartphone,
            color: 'text-blue-500'
          }
        }
      ]
    }
  };

  const config = industryConfigs[industry];
  
  const getFullSteps = () => {
    const baseSteps = [...config.steps];
    if (customerInterested === true) {
      return [...baseSteps, ...config.interestedPath];
    } else if (customerInterested === false) {
      return [...baseSteps, ...config.notInterestedPath];
    }
    return baseSteps;
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setCustomerInterested(null);
    
    const steps = config.steps;
    
    const animateStep = (stepIndex: number) => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        
        if (stepIndex === steps.length - 1) {
          // Decision point
          setTimeout(() => {
            const interested = Math.random() > 0.5;
            setCustomerInterested(interested);
            
            const nextSteps = interested ? config.interestedPath : config.notInterestedPath;
            
            nextSteps.forEach((_, nextIndex) => {
              setTimeout(() => {
                setCurrentStep(steps.length + nextIndex);
                if (nextIndex === nextSteps.length - 1) {
                  setTimeout(() => setIsAnimating(false), 1000);
                }
              }, (nextIndex + 1) * 1500);
            });
          }, 1500);
        } else {
          setTimeout(() => animateStep(stepIndex + 1), 1500);
        }
      }
    };
    
    animateStep(0);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsAnimating(true);
    setCustomerInterested(null);
    setAnimationCycle(prev => prev + 1);
  };

  // No auto-start - only manual interaction

  const getStepStatus = (stepIndex: number): 'pending' | 'active' | 'completed' => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (type: string, status: string) => {
    if (status === 'completed') return 'text-primary bg-primary/10 border-primary/30';
    if (status === 'active') return 'text-white bg-gradient-to-r ' + config.color + ' border-transparent animate-pulse';
    
    switch (type) {
      case 'customer': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'ai': return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      case 'action': return 'text-green-500 bg-green-500/10 border-green-500/30';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const steps = getFullSteps();

  return (
    <div className="bg-gradient-to-br from-muted/30 to-background border border-border/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${config.color} text-white relative`}>
        <h3 className="text-xl font-bold mb-2">{config.title}</h3>
        <p className="text-white/90 text-sm mb-4">{config.description}</p>
        
        {/* Live indicator */}
        <div className="flex items-center space-x-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${isAnimating ? 'bg-green-400 animate-pulse' : 'bg-white/40'}`}></div>
          <span className="text-sm text-white/90">
            {isAnimating ? 'Live Demo Running' : 'Demo Paused'}
          </span>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={startAnimation}
            disabled={isAnimating}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            {isAnimating ? 'Running...' : 'Restart Journey'}
          </Button>
          <Button
            onClick={resetAnimation}
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Steps Visualization - Vertical Layout */}
      <div className="p-6 space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isDecisionPoint = index === 2 && customerInterested !== null;
          
          return (
            <div key={`${step.id}-${index}`} className="relative">
              <div className="flex items-center space-x-4">
                {/* Step Indicator */}
                <div className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 flex-shrink-0
                  ${getStepColor(step.type, status)}
                `}>
                  <step.icon className="w-6 h-6" />
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-semibold text-sm ${
                      status === 'active' ? 'text-primary' : 
                      status === 'completed' ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </h4>
                    
                    {status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                    
                    {status === 'active' && (
                      <Clock className="w-4 h-4 text-primary animate-spin" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  
                  {/* Platform/Channel Indicator */}
                  {step.channel && (
                    <div className={`inline-flex items-center space-x-2 bg-muted/10 rounded-full px-3 py-1 transition-all duration-500 ${
                      status === 'active' ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                    }`}>
                      <step.channel.icon className={`w-4 h-4 ${step.channel.color}`} />
                      <span className="text-xs font-medium text-muted-foreground">
                        via {step.channel.name}
                      </span>
                    </div>
                  )}
                  
                  {/* Decision Indicator */}
                  {isDecisionPoint && (
                    <div className="mt-2 inline-flex items-center space-x-1 bg-secondary/10 rounded-full px-2 py-1">
                      <AlertCircle className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary font-medium">
                        Decision: {customerInterested ? 'Interested' : 'Not Ready'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className={`absolute left-6 top-12 w-px h-8 transition-all duration-500 ${
                  status === 'completed' ? 'bg-primary' : 'bg-border'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results Summary */}
      {!isAnimating && customerInterested !== null && (
        <div className="mx-6 mb-6 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-sm">Journey Complete</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            {customerInterested 
              ? 'Customer was routed to conversion flow with personalized offers'
              : 'Customer entered nurturing sequence for future engagement'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrchestrationAnimation;