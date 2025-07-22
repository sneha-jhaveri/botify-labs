import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageSquare, 
  Bot, 
  Zap,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

interface CapabilityAnimationProps {
  type: 'ai-employee' | 'workflow' | 'multi-channel' | 'dashboard';
  title: string;
  description: string;
}

const CapabilityAnimation: React.FC<CapabilityAnimationProps> = ({ type, title, description }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const aiEmployeeSteps = [
    { icon: Brain, label: 'AI Training', description: 'Neural network processing', color: 'from-blue-500 to-cyan-500' },
    { icon: Bot, label: 'Personality Setup', description: 'Custom behavior patterns', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, label: 'Communication', description: 'Multi-channel deployment', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, label: 'Activation', description: 'Live and ready to serve', color: 'from-orange-500 to-red-500' }
  ];

  const workflowSteps = [
    { icon: Cpu, label: 'Trigger Setup', description: 'Event-based activation', color: 'from-indigo-500 to-blue-500' },
    { icon: Brain, label: 'AI Processing', description: 'Smart decision making', color: 'from-purple-500 to-pink-500' },
    { icon: Database, label: 'Data Integration', description: 'System connections', color: 'from-green-500 to-teal-500' },
    { icon: Cloud, label: 'Deployment', description: 'Cloud execution', color: 'from-orange-500 to-yellow-500' }
  ];

  const multiChannelSteps = [
    { icon: MessageSquare, label: 'WhatsApp', description: 'Business messaging', color: 'from-green-600 to-green-400' },
    { icon: Bot, label: 'Web Chat', description: 'Website integration', color: 'from-blue-500 to-cyan-500' },
    { icon: MessageSquare, label: 'Voice Calls', description: 'Phone conversations', color: 'from-purple-500 to-pink-500' },
    { icon: Brain, label: 'Unified AI', description: 'Consistent experience', color: 'from-gradient-primary' }
  ];

  const dashboardSteps = [
    { icon: Database, label: 'Data Collection', description: 'Real-time metrics', color: 'from-blue-500 to-indigo-500' },
    { icon: Brain, label: 'AI Analysis', description: 'Intelligent insights', color: 'from-purple-500 to-pink-500' },
    { icon: Zap, label: 'Visualization', description: 'Dynamic charts', color: 'from-green-500 to-teal-500' },
    { icon: CheckCircle2, label: 'Actionable', description: 'Smart recommendations', color: 'from-orange-500 to-red-500' }
  ];

  const getSteps = () => {
    switch (type) {
      case 'ai-employee': return aiEmployeeSteps;
      case 'workflow': return workflowSteps;
      case 'multi-channel': return multiChannelSteps;
      case 'dashboard': return dashboardSteps;
      default: return aiEmployeeSteps;
    }
  };

  const steps = getSteps();

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % steps.length;
          if (next === 0) {
            setTimeout(() => setIsAnimating(false), 1000);
          }
          return next;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isAnimating, steps.length]);

  const startAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-3xl border border-primary/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-ai opacity-20" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
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
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm mb-4">{description}</p>
          
          {!isAnimating && (
            <button
              onClick={startAnimation}
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-glow"
            >
              <span>Watch Process</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Animation Steps */}
        {isAnimating && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                const isPending = index > activeStep;

                return (
                  <div key={index} className="text-center">
                    <div className={`
                      relative w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${step.color}
                      flex items-center justify-center transition-all duration-500
                      ${isActive ? 'scale-110 animate-pulse ring-4 ring-primary/50' : ''}
                      ${isCompleted ? 'scale-100' : ''}
                      ${isPending ? 'scale-90 opacity-50' : ''}
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                      
                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="text-sm text-white/90 font-medium mb-1">
                      {step.label}
                    </div>
                    <div className="text-xs text-white/70 leading-tight">
                      {step.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-2 overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-in-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Current Step Details */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  {React.createElement(steps[activeStep]?.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {steps[activeStep]?.label}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {steps[activeStep]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Static Preview */}
        {!isAnimating && (
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-white/80 font-medium">
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CapabilityAnimation;