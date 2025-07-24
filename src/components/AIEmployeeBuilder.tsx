import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  User, 
  MessageSquare, 
  Phone, 
  Mail, 
  Settings, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuildStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  duration: number;
}

const AIEmployeeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [aiPersonality, setAiPersonality] = useState({
    name: 'Alex',
    role: 'Customer Support Agent',
    personality: 'Professional & Friendly',
    avatar: '🤖'
  });

  const buildSteps: BuildStep[] = [
    {
      id: 'persona',
      title: 'Define Persona',
      description: 'Setting personality, tone, and communication style',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      duration: 2000
    },
    {
      id: 'knowledge',
      title: 'Add Knowledge & SOPs',
      description: 'Training on company knowledge base and procedures',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      duration: 3000
    },
    {
      id: 'abilities',
      title: 'Attach Abilities',
      description: 'Configuring AI capabilities and skills',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      duration: 2500
    },
    {
      id: 'access',
      title: 'Configure Access & Tools',
      description: 'Setting up permissions and integrating tools',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      duration: 2000
    },
    {
      id: 'workflow',
      title: 'Connect to Workflow',
      description: 'Integrating into business processes and automation',
      icon: ArrowRight,
      color: 'from-indigo-500 to-purple-500',
      duration: 1500
    }
  ];

  const startBuilding = () => {
    setIsBuilding(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    
    buildSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, index]);
          if (index === buildSteps.length - 1) {
            setTimeout(() => setIsBuilding(false), 1000);
          }
        }, step.duration);
      }, buildSteps.slice(0, index).reduce((acc, s) => acc + s.duration, 0));
    });
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-3xl border border-primary/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-ai opacity-20" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* AI Employee Preview */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl shadow-2xl animate-glow-pulse">
                {aiPersonality.avatar}
              </div>
              {isBuilding && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{aiPersonality.name}</h3>
              <p className="text-primary/80">{aiPersonality.role}</p>
              <p className="text-xs text-white/60">{aiPersonality.personality}</p>
            </div>
          </div>
          
          {!isBuilding && (
            <Button onClick={startBuilding} variant="cta" className="group">
              <Sparkles className="w-4 h-4 mr-2" />
              Build AI Employee
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        {/* Build Progress */}
        {isBuilding && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {buildSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep;
                const isCompleted = completedSteps.includes(index);
                const isPending = index > currentStep;

                return (
                  <div key={step.id} className="text-center">
                    <div className={`
                      relative w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${step.color}
                      flex items-center justify-center transition-all duration-500
                      ${isActive ? 'scale-110 animate-pulse ring-4 ring-primary/50' : ''}
                      ${isCompleted ? 'scale-100' : ''}
                      ${isPending ? 'scale-90 opacity-50' : ''}
                    `}>
                      <IconComponent className="w-6 h-6 text-white" />
                      
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="text-xs text-white/80 font-medium mb-1">
                      {step.title}
                    </div>
                    <div className="text-xs text-white/60 leading-tight">
                      {step.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Step Details */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  {React.createElement(buildSteps[currentStep]?.icon, { className: "w-5 h-5 text-white" })}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {buildSteps[currentStep]?.title}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {buildSteps[currentStep]?.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Completion State */}
        {!isBuilding && completedSteps.length === buildSteps.length && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Zap className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">AI Employee Ready!</h3>
              <p className="text-white/80 mb-6">Alex is now live and ready to help your customers</p>
              <Button variant="cta" onClick={() => setCompletedSteps([])}>
                Create Another AI Employee
              </Button>
            </div>
          </div>
        )}

        {/* Capabilities Preview */}
        {!isBuilding && completedSteps.length === 0 && (
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-sm text-white font-medium">Chat Support</div>
              <div className="text-xs text-white/60">24/7 customer assistance</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Phone className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-sm text-white font-medium">Voice Calls</div>
              <div className="text-xs text-white/60">Natural phone conversations</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-sm text-white font-medium">Email Support</div>
              <div className="text-xs text-white/60">Automated email responses</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEmployeeBuilder;