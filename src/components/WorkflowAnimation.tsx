import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Database, 
  Bot, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Settings,
  Sparkles
} from 'lucide-react';

interface ConnectionStep {
  id: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  delay: number;
}

const WorkflowAnimation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [connections, setConnections] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps: ConnectionStep[] = [
    { id: 'trigger', name: 'Form Submit', icon: Database, position: { x: 20, y: 50 }, color: 'from-blue-500 to-cyan-500', delay: 0 },
    { id: 'ai', name: 'AI Analysis', icon: Bot, position: { x: 50, y: 20 }, color: 'from-purple-500 to-pink-500', delay: 1000 },
    { id: 'crm', name: 'Update CRM', icon: Database, position: { x: 80, y: 50 }, color: 'from-green-500 to-emerald-500', delay: 2000 },
    { id: 'email', name: 'Send Email', icon: Mail, position: { x: 50, y: 80 }, color: 'from-orange-500 to-red-500', delay: 3000 },
    { id: 'whatsapp', name: 'WhatsApp Msg', icon: MessageSquare, position: { x: 20, y: 80 }, color: 'from-indigo-500 to-purple-500', delay: 4000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) {
          setConnections(current => [...current, prev]);
          return prev + 1;
        } else {
          setIsCompleted(true);
          setTimeout(() => {
            setActiveStep(0);
            setConnections([]);
            setIsCompleted(false);
          }, 2000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-indigo-900/30 rounded-3xl border border-primary/20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connectionIndex) => {
          const start = steps[connectionIndex];
          const end = steps[connectionIndex + 1];
          if (!end) return null;

          const startX = (start.position.x / 100) * 100;
          const startY = (start.position.y / 100) * 100;
          const endX = (end.position.x / 100) * 100;
          const endY = (end.position.y / 100) * 100;

          return (
            <g key={`connection-${connectionIndex}`}>
              <defs>
                <linearGradient id={`gradient-${connectionIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={`url(#gradient-${connectionIndex})`}
                strokeWidth="3"
                filter="url(#glow)"
                className="animate-pulse"
              />
              {/* Animated Data Flow */}
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath xlinkHref={`#path-${connectionIndex}`} />
                </animateMotion>
              </circle>
              <path
                id={`path-${connectionIndex}`}
                d={`M ${startX}% ${startY}% L ${endX}% ${endY}%`}
                fill="none"
                stroke="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Workflow Steps */}
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isActive = index <= activeStep;
        const isCurrentStep = index === activeStep;

        return (
          <div
            key={step.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              left: `${step.position.x}%`,
              top: `${step.position.y}%`,
              transform: isActive ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
              opacity: isActive ? 1 : 0.3
            }}
          >
            <div className={`
              relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} 
              flex items-center justify-center shadow-2xl border-2 border-white/20
              ${isCurrentStep ? 'animate-pulse ring-4 ring-primary/50' : ''}
              ${isActive ? 'shadow-glow' : ''}
              transition-all duration-500
            `}>
              <IconComponent className="w-7 h-7 text-white drop-shadow-lg" />
              
              {/* Status Indicator */}
              {index < activeStep && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Processing Indicator */}
              {isCurrentStep && (
                <div className="absolute -top-1 -right-1 w-4 h-4">
                  <div className="w-full h-full bg-yellow-400 rounded-full animate-ping" />
                  <div className="absolute inset-0 w-full h-full bg-yellow-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
            
            {/* Step Label */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                {step.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Completion Effect */}
      {isCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 text-center animate-scale-in">
            <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">Workflow Complete!</h3>
            <p className="text-green-300 text-sm">All integrations connected successfully</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 rounded-full"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-white/80">
            Connecting Applications: {activeStep + 1}/{steps.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAnimation;