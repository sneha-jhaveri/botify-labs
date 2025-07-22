import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  Zap,
  Plus,
  Edit3,
  Mic,
  Eye,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface BuildStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  duration: number;
}

const InteractiveAIBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [aiPersonality, setAiPersonality] = useState({
    name: 'Sarah',
    role: 'Customer Support Agent',
    personality: 'Professional & Friendly',
    avatar: '👩‍💼',
    voice: 'Natural',
    language: 'English'
  });

  const buildSteps: BuildStep[] = [
    {
      id: 'personality',
      title: 'AI Personality Setup',
      description: 'Configuring communication style and expertise',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      duration: 2000
    },
    {
      id: 'training',
      title: 'Neural Training',
      description: 'Processing knowledge base and learning patterns',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      duration: 3000
    },
    {
      id: 'channels',
      title: 'Multi-Channel Setup',
      description: 'Configuring WhatsApp, Voice, Email channels',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      duration: 2500
    },
    {
      id: 'integration',
      title: 'System Integration',
      description: 'Connecting to CRM, databases, and APIs',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      duration: 2000
    },
    {
      id: 'deployment',
      title: 'AI Deployment',
      description: 'Going live and ready to serve customers',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      duration: 1500
    }
  ];

  const startBuilding = () => {
    setIsBuilding(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPaused(false);
    
    buildSteps.forEach((step, index) => {
      setTimeout(() => {
        if (!isPaused) {
          setCurrentStep(index);
          setTimeout(() => {
            setCompletedSteps(prev => [...prev, index]);
            if (index === buildSteps.length - 1) {
              setTimeout(() => setIsBuilding(false), 1000);
            }
          }, step.duration);
        }
      }, buildSteps.slice(0, index).reduce((acc, s) => acc + s.duration, 0));
    });
  };

  const pauseBuilding = () => {
    setIsPaused(!isPaused);
  };

  const resetDemo = () => {
    setIsBuilding(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPaused(false);
  };

  const editPersonality = (field: string, value: string) => {
    setAiPersonality(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-3xl border border-primary/20 overflow-hidden">
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
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl shadow-2xl animate-glow-pulse">
                {aiPersonality.avatar}
              </div>
              {isBuilding && !isPaused && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-white">{aiPersonality.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => editPersonality('name', prompt('Enter name:') || aiPersonality.name)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-primary/80 text-lg">{aiPersonality.role}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-white/60 flex items-center">
                  <Mic className="w-3 h-3 mr-1" />
                  {aiPersonality.voice} Voice
                </span>
                <span className="text-xs text-white/60">{aiPersonality.personality}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isBuilding && (
              <Button onClick={startBuilding} variant="cta" size="lg" className="group">
                <Play className="w-5 h-5 mr-2" />
                Build AI Employee
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            
            {isBuilding && (
              <>
                <Button onClick={pauseBuilding} variant="outline" size="sm" className="text-white border-white/20">
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button onClick={resetDemo} variant="outline" size="sm" className="text-white border-white/20">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Build Progress */}
        {isBuilding && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {buildSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep && !isPaused;
                const isCompleted = completedSteps.includes(index);
                const isPending = index > currentStep;

                return (
                  <div key={step.id} className="text-center">
                    <div className={`
                      relative w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${step.color}
                      flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-105
                      ${isActive ? 'scale-110 animate-pulse ring-4 ring-primary/50' : ''}
                      ${isCompleted ? 'scale-100' : ''}
                      ${isPending ? 'scale-90 opacity-50' : ''}
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                      
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="text-sm text-white/90 font-medium mb-1">
                      {step.title}
                    </div>
                    <div className="text-xs text-white/70 leading-tight">
                      {step.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-in-out"
                style={{ width: `${((currentStep + 1) / buildSteps.length) * 100}%` }}
              />
            </div>

            {/* Current Step Details */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  {React.createElement(buildSteps[currentStep]?.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {buildSteps[currentStep]?.title}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {buildSteps[currentStep]?.description}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-white/60">
                Step {currentStep + 1} of {buildSteps.length} • {isPaused ? 'Paused' : 'In Progress'}
              </div>
            </div>
          </div>
        )}

        {/* Completion State */}
        {!isBuilding && completedSteps.length === buildSteps.length && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-scale-in">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Zap className="w-12 h-12 text-white animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{aiPersonality.name} is Live!</h3>
              <p className="text-white/80 mb-6">Your AI employee is ready to handle customer interactions</p>
              <div className="flex justify-center space-x-4">
                <Button variant="cta" onClick={resetDemo}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Another
                </Button>
                <Button variant="outline" className="text-white border-white/20">
                  <Eye className="w-4 h-4 mr-2" />
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Initial State - Capabilities Preview */}
        {!isBuilding && completedSteps.length === 0 && (
          <div className="flex-1 grid grid-cols-3 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-black/30 transition-colors cursor-pointer">
              <MessageSquare className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-sm text-white font-medium mb-2">Multi-Channel Support</div>
              <div className="text-xs text-white/60">WhatsApp, Voice, Email, Web</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-black/30 transition-colors cursor-pointer">
              <Brain className="w-10 h-10 text-secondary mx-auto mb-3" />
              <div className="text-sm text-white font-medium mb-2">AI Intelligence</div>
              <div className="text-xs text-white/60">Natural conversations & decisions</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-black/30 transition-colors cursor-pointer">
              <Settings className="w-10 h-10 text-accent mx-auto mb-3" />
              <div className="text-sm text-white font-medium mb-2">System Integration</div>
              <div className="text-xs text-white/60">CRM, APIs, Databases</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveAIBuilder;