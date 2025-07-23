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
  const [executingActions, setExecutingActions] = useState<string[]>([]);
  const [dataStream, setDataStream] = useState<{ id: string; value: string; color: string }[]>([]);

  const steps: ConnectionStep[] = [
    { 
      id: 'ticket', 
      name: 'Ticket Analysis', 
      icon: AlertTriangle, 
      position: { x: 15, y: 35 }, 
      color: 'from-red-500 to-orange-500', 
      delay: 0,
      aiAction: 'Processing incoming ticket...',
      dataPoints: ['Priority: High', 'Category: Billing', 'Sentiment: -0.8']
    },
    { 
      id: 'brain', 
      name: 'AI Decision Engine', 
      icon: Brain, 
      position: { x: 50, y: 15 }, 
      color: 'from-purple-500 to-pink-500', 
      delay: 1000,
      aiAction: 'Analyzing customer context...',
      dataPoints: ['Model: GPT-4', 'Confidence: 94%', 'Processing: 247ms']
    },
    { 
      id: 'history', 
      name: 'Data Mining', 
      icon: Database, 
      position: { x: 85, y: 35 }, 
      color: 'from-blue-500 to-cyan-500', 
      delay: 2000,
      aiAction: 'Retrieving customer history...',
      dataPoints: ['Records: 1,247', 'LTV: $12,450', 'Tier: Premium']
    },
    { 
      id: 'decision', 
      name: 'Smart Router', 
      icon: Settings, 
      position: { x: 50, y: 55 }, 
      color: 'from-yellow-500 to-orange-500', 
      delay: 3000,
      aiAction: 'Routing to optimal channel...',
      dataPoints: ['Route: VIP Support', 'ETA: 2 min', 'Success: 97%']
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp Deploy', 
      icon: MessageSquare, 
      position: { x: 25, y: 80 }, 
      color: 'from-green-600 to-emerald-600', 
      delay: 4000,
      aiAction: 'Crafting personalized message...',
      dataPoints: ['Template: Apology_VIP', 'Language: EN', 'Tone: Empathetic']
    },
    { 
      id: 'email', 
      name: 'Email Automation', 
      icon: Mail, 
      position: { x: 75, y: 80 }, 
      color: 'from-indigo-500 to-purple-500', 
      delay: 5000,
      aiAction: 'Generating compensation offer...',
      dataPoints: ['Discount: 25%', 'Validity: 30 days', 'Personalized: Yes']
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) {
          // Set AI thinking state
          setAiThinking(true);
          
          // Add current action to executing actions
          setExecutingActions(current => [...current, steps[prev + 1].aiAction]);
          
          // Add data stream
          setDataStream(current => [
            ...current,
            ...steps[prev + 1].dataPoints.map((point, index) => ({
              id: `${steps[prev + 1].id}-${index}`,
              value: point,
              color: `hsl(${Math.random() * 360}, 70%, 60%)`
            }))
          ]);
          
          setTimeout(() => {
            setAiThinking(false);
            setConnections(current => [...current, prev]);
          }, 800);
          
          return prev + 1;
        } else {
          // Reset without completion screen
          setTimeout(() => {
            setActiveStep(0);
            setConnections([]);
            setExecutingActions([]);
            setDataStream([]);
          }, 1000);
          return 0;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Clean up data stream periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      setDataStream(current => current.slice(-15)); // Keep only last 15 items
      setExecutingActions(current => current.slice(-3)); // Keep only last 3 actions
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative w-full h-96 rounded-3xl border border-primary/20 overflow-hidden bg-transparent">
      {/* Minimal Neural Network Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-cyan-900/10" />
      </div>
      
      {/* AI Brain Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl ${aiThinking ? 'animate-pulse scale-110' : ''} transition-all duration-500`}>
          <Brain className="w-10 h-10 text-white" />
          {aiThinking && (
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin" />
          )}
        </div>
        {aiThinking && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap animate-fade-in">
            AI Processing...
          </div>
        )}
      </div>

      {/* Data Stream Visualization */}
      <div className="absolute bottom-4 left-4 right-4 space-y-1 max-h-20 overflow-hidden">
        {dataStream.slice(-5).map((data, index) => (
          <div 
            key={data.id}
            className="text-xs bg-black/60 text-white px-2 py-1 rounded border-l-2 animate-slide-in-right"
            style={{ borderLeftColor: data.color, animationDelay: `${index * 0.1}s` }}
          >
            {data.value}
          </div>
        ))}
      </div>

      {/* Executing Actions Panel */}
      <div className="absolute top-4 right-4 space-y-2 max-w-xs">
        {executingActions.slice(-2).map((action, index) => (
          <div 
            key={`action-${index}`}
            className="bg-primary/90 text-white text-xs px-3 py-2 rounded-lg border border-primary/30 backdrop-blur-sm animate-fade-in flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            <span>{action}</span>
          </div>
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
            <g key={`connection-${start.id}-${end.id}`}>
              <defs>
                <linearGradient id={`gradient-${connectionIndex}-${start.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                </linearGradient>
                <filter id={`glow-${connectionIndex}`}>
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
                stroke={`url(#gradient-${connectionIndex}-${start.id})`}
                strokeWidth="3"
                filter={`url(#glow-${connectionIndex})`}
                className="animate-pulse"
              />
              {/* Animated Data Flow */}
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="2s" repeatCount="indefinite">
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
            
            {/* Step Label with Live AI Actions */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                {step.name}
              </div>
              {isCurrentStep && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 mt-1 space-y-1">
                  <div className="bg-primary/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded border border-primary/30 whitespace-nowrap animate-fade-in flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span>{step.aiAction}</span>
                  </div>
                  {step.dataPoints.map((point, pointIndex) => (
                    <div 
                      key={pointIndex}
                      className="bg-black/70 backdrop-blur-sm text-cyan-300 text-[9px] px-2 py-0.5 rounded border border-cyan-500/30 whitespace-nowrap animate-fade-in"
                      style={{ animationDelay: `${pointIndex * 0.2}s` }}
                    >
                      {point}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}


      {/* Neural Activity Progress */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64">
        <div className="bg-black/30 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-1000 rounded-full relative"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-white/80 font-medium">
            AI Neural Processing: {Math.round(((activeStep + 1) / steps.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAnimation;