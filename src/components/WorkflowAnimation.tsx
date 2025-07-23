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
  Sparkles,
  Brain,
  Eye,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface ConnectionStep {
  id: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  delay: number;
  aiAction: string;
  dataPoints: string[];
}

const WorkflowAnimation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [connections, setConnections] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const steps: ConnectionStep[] = [
    { 
      id: 'ticket', 
      name: 'Analyze', 
      icon: AlertTriangle, 
      position: { x: 15, y: 35 }, 
      color: 'from-red-500 to-orange-500', 
      delay: 0,
      aiAction: 'Processing...',
      dataPoints: []
    },
    { 
      id: 'brain', 
      name: 'Think', 
      icon: Brain, 
      position: { x: 50, y: 15 }, 
      color: 'from-purple-500 to-pink-500', 
      delay: 1000,
      aiAction: 'Analyzing...',
      dataPoints: []
    },
    { 
      id: 'history', 
      name: 'Research', 
      icon: Database, 
      position: { x: 85, y: 35 }, 
      color: 'from-blue-500 to-cyan-500', 
      delay: 2000,
      aiAction: 'Retrieving...',
      dataPoints: []
    },
    { 
      id: 'decision', 
      name: 'Decide', 
      icon: Settings, 
      position: { x: 50, y: 55 }, 
      color: 'from-yellow-500 to-orange-500', 
      delay: 3000,
      aiAction: 'Routing...',
      dataPoints: []
    },
    { 
      id: 'whatsapp', 
      name: 'Execute', 
      icon: MessageSquare, 
      position: { x: 25, y: 80 }, 
      color: 'from-green-600 to-emerald-600', 
      delay: 4000,
      aiAction: 'Messaging...',
      dataPoints: []
    },
    { 
      id: 'email', 
      name: 'Complete', 
      icon: Mail, 
      position: { x: 75, y: 80 }, 
      color: 'from-indigo-500 to-purple-500', 
      delay: 5000,
      aiAction: 'Finalizing...',
      dataPoints: []
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) {
          setAiThinking(true);
          setTimeout(() => {
            setAiThinking(false);
            setConnections(current => [...current, prev]);
          }, 600);
          return prev + 1;
        } else {
          setTimeout(() => {
            setActiveStep(0);
            setConnections([]);
          }, 800);
          return 0;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Central AI Brain */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-xl ${aiThinking ? 'animate-pulse scale-110' : ''} transition-all duration-500`}>
          <Brain className="w-8 h-8 text-white" />
          {aiThinking && (
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-spin" />
          )}
        </div>
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
            <g key={`connection-${start.id}-${end.id}`}>
              <defs>
                <linearGradient id={`gradient-${connectionIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={`url(#gradient-${connectionIndex})`}
                strokeWidth="2"
                className="animate-pulse"
              />
              {/* Data Flow Pulse */}
              <circle r="3" fill="hsl(var(--primary))">
                <animateMotion dur="1.5s" repeatCount="indefinite">
                  <mpath xlinkHref={`#path-${start.id}-${end.id}`} />
                </animateMotion>
              </circle>
              <path
                id={`path-${start.id}-${end.id}`}
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
              transform: isActive ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.7)',
              opacity: isActive ? 1 : 0.4
            }}
          >
            <div className={`
              relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} 
              flex items-center justify-center shadow-lg border border-white/20
              ${isCurrentStep ? 'animate-pulse ring-2 ring-primary/30' : ''}
              transition-all duration-500
            `}>
              <IconComponent className="w-6 h-6 text-white" />
              
              {/* Active Processing Indicator */}
              {isCurrentStep && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="w-full h-full bg-yellow-400 rounded-full animate-ping" />
                </div>
              )}
              
              {/* Completed Indicator */}
              {index < activeStep && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            {/* Clean Step Label */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-xs font-medium text-foreground/80 whitespace-nowrap">
                {step.name}
              </div>
            </div>
          </div>
        );
      })}


    </div>
  );
};

export default WorkflowAnimation;