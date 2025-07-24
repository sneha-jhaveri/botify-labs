import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Workflow, 
  MessageSquare, 
  BarChart3, 
  Zap,
  Bot,
  PhoneCall,
  Mail,
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Globe,
  Database,
  Shield,
  Cpu,
  Network,
  Activity
} from 'lucide-react';

// Intelligent Animation Component with Advanced Interactions
const IntelligentFeatureDemo = ({ feature, isActive, onActivate }: { 
  feature: any; 
  isActive: boolean; 
  onActivate: () => void;
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [dataFlow, setDataFlow] = useState<Array<{ id: number; progress: number; speed: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  // Initialize data flow animations
  useEffect(() => {
    if (isActive || isHovered) {
      const flows = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        progress: Math.random() * 100,
        speed: 0.5 + Math.random() * 2
      }));
      setDataFlow(flows);
      
      const interval = setInterval(() => {
        setDataFlow(prev => prev.map(flow => ({
          ...flow,
          progress: (flow.progress + flow.speed) % 100
        })));
        setAnimationStep(prev => (prev + 1) % 6);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isActive, isHovered]);

  const getIntelligentAnimation = () => {
    switch (feature.animationType) {
      case 'ai-employee':
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 rounded-3xl overflow-hidden">
            {/* Advanced Neural Network */}
            <div className="absolute inset-0">
              {/* Input Layer */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-4">
                {['Voice', 'Text', 'Image'].map((input, i) => (
                  <div key={input} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      isActive || isHovered ? 'bg-primary scale-110 shadow-glow' : 'bg-muted'
                    }`} style={{ animationDelay: `${i * 200}ms` }} />
                    <span className="text-xs text-muted-foreground">{input}</span>
                  </div>
                ))}
              </div>

              {/* Hidden Layers - Dynamic Neural Network */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="grid grid-cols-3 gap-6">
                  {[...Array(12)].map((_, i) => {
                    const distance = Math.sqrt(
                      Math.pow(mousePosition.x - 50, 2) + Math.pow(mousePosition.y - 50, 2)
                    );
                    const scale = isHovered ? Math.max(0.8, 1.5 - distance / 100) : 1;
                    
                    return (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          isActive || isHovered ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ 
                          transform: `scale(${scale})`,
                          opacity: isHovered ? Math.max(0.3, 1 - distance / 150) : 1,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Output Layer */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
                {['Response', 'Action', 'Learn'].map((output, i) => (
                  <div key={output} className="flex items-center space-x-3">
                    <span className="text-xs text-muted-foreground">{output}</span>
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      (isActive || isHovered) && animationStep > i ? 'bg-primary scale-110 shadow-glow' : 'bg-muted'
                    }`} style={{ animationDelay: `${i * 300 + 1000}ms` }} />
                  </div>
                ))}
              </div>

              {/* Dynamic Connections */}
              <svg className="absolute inset-0 w-full h-full">
                {dataFlow.map((flow, i) => (
                  <g key={flow.id}>
                    {/* Animated connection lines */}
                    <path
                      d={`M ${20 + i * 5} ${40 + i * 8} Q ${50} ${30 + i * 6} ${80 - i * 5} ${60 - i * 8}`}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className={`text-primary/40 transition-all duration-500 ${
                        isActive || isHovered ? 'opacity-100' : 'opacity-20'
                      }`}
                      strokeDasharray="8,4"
                      strokeDashoffset={-flow.progress * 2}
                    />
                    {/* Data packets */}
                    <circle
                      r="3"
                      fill="currentColor"
                      className="text-primary"
                      opacity={isActive || isHovered ? 0.8 : 0.3}
                    >
                      <animateMotion dur="3s" repeatCount="indefinite">
                        <path d={`M ${20 + i * 5} ${40 + i * 8} Q ${50} ${30 + i * 6} ${80 - i * 5} ${60 - i * 8}`} />
                      </animateMotion>
                    </circle>
                  </g>
                ))}
              </svg>

              {/* AI Processing Indicator */}
              {(isActive || isHovered) && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-3 h-3 text-primary animate-pulse" />
                    <span>Processing: {Math.round(animationStep * 16.67)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'workflow':
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/20 rounded-3xl overflow-hidden">
            {/* Intelligent Workflow Builder */}
            <div className="absolute inset-0 p-6">
              {/* Workflow Nodes */}
              <div className="flex justify-between items-center h-full">
                {[
                  { icon: Zap, label: 'Trigger', type: 'start' },
                  { icon: Brain, label: 'AI Process', type: 'process' },
                  { icon: Network, label: 'Decision', type: 'decision' },
                  { icon: CheckCircle2, label: 'Action', type: 'action' },
                  { icon: TrendingUp, label: 'Result', type: 'end' }
                ].map((node, i) => {
                  const isProcessing = (isActive || isHovered) && animationStep >= i;
                  const hoverDistance = Math.abs(mousePosition.x - (i * 25 + 10));
                  const hoverScale = isHovered ? Math.max(1, 1.3 - hoverDistance / 50) : 1;
                  
                  return (
                    <div key={node.label} className="flex flex-col items-center space-y-3">
                      <div
                        className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                          isProcessing 
                            ? 'border-secondary bg-secondary/20 scale-110 shadow-glow' 
                            : 'border-muted bg-background hover:border-secondary/50'
                        }`}
                        style={{ transform: `scale(${hoverScale})` }}
                      >
                        <node.icon className={`w-6 h-6 transition-all duration-300 ${
                          isProcessing ? 'text-secondary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <span className="text-xs text-center text-muted-foreground font-medium">
                        {node.label}
                      </span>
                      
                      {/* Status indicator */}
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isProcessing ? 'bg-secondary animate-pulse' : 'bg-muted'
                      }`} />
                      
                      {/* Connection to next node */}
                      {i < 4 && (
                        <div className="absolute top-1/2 transform -translate-y-1/2" 
                             style={{ left: `${(i + 1) * 20 - 2}%` }}>
                          <ArrowRight 
                            className={`w-6 h-6 transition-all duration-500 ${
                              isProcessing ? 'text-secondary scale-110' : 'text-muted'
                            }`}
                          />
                          {/* Data flow animation */}
                          {isProcessing && (
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary/30 overflow-hidden">
                              <div className="w-4 h-full bg-secondary animate-[slide-in-right_1s_ease-in-out_infinite]" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Performance Metrics */}
              {(isActive || isHovered) && (
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-3 border border-secondary/20">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                      <div className="text-secondary font-bold">{Math.round(animationStep * 2.5)}ms</div>
                      <div className="text-muted-foreground">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-secondary font-bold">99.{95 + animationStep}%</div>
                      <div className="text-muted-foreground">Success</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'multi-channel':
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-accent/5 via-accent/10 to-accent/20 rounded-3xl overflow-hidden">
            {/* Multi-Channel Orchestration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Central AI Orchestrator */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center transition-all duration-1000 ${
                  isActive || isHovered ? 'scale-110 shadow-glow' : 'scale-100'
                }`}>
                  <Bot className="w-10 h-10 text-white" />
                  
                  {/* Pulse rings */}
                  {(isActive || isHovered) && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" />
                      <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                </div>
                
                {/* Channel Nodes */}
                {[
                  { icon: MessageSquare, label: 'WhatsApp', angle: 0, color: '#25D366' },
                  { icon: PhoneCall, label: 'Voice', angle: 60, color: '#FF6B6B' },
                  { icon: Mail, label: 'Email', angle: 120, color: '#4ECDC4' },
                  { icon: Globe, label: 'Web', angle: 180, color: '#45B7D1' },
                  { icon: Bot, label: 'Telegram', angle: 240, color: '#0088CC' },
                  { icon: Network, label: 'API', angle: 300, color: '#96CEB4' }
                ].map(({ icon: Icon, label, angle, color }, i) => {
                  const isChannelActive = (isActive || isHovered) && (animationStep % 6) === i;
                  const hoverEffect = isHovered ? 
                    Math.max(0.8, 1.2 - Math.abs(mousePosition.x - 50) / 100) : 1;
                  
                  return (
                    <div key={label}>
                      {/* Channel Node */}
                      <div
                        className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                          isChannelActive ? 'scale-110 shadow-lg' : 'scale-100'
                        }`}
                        style={{
                          transform: `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg) scale(${hoverEffect})`,
                          backgroundColor: isChannelActive ? color + '20' : 'white',
                          borderColor: isChannelActive ? color : '#e5e7eb'
                        }}
                      >
                        <Icon 
                          className="w-6 h-6" 
                          style={{ color: isChannelActive ? color : '#6b7280' }}
                        />
                      </div>
                      
                      {/* Channel Label */}
                      <div
                        className="absolute text-xs font-medium transition-all duration-300"
                        style={{
                          transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`,
                          color: isChannelActive ? color : '#6b7280'
                        }}
                      >
                        {label}
                      </div>
                      
                      {/* Data Connection */}
                      {(isActive || isHovered) && (
                        <svg 
                          className="absolute top-1/2 left-1/2 w-40 h-40 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="-60"
                            stroke={color}
                            strokeWidth="2"
                            opacity={isChannelActive ? 0.8 : 0.2}
                            strokeDasharray="6,4"
                            className="transition-all duration-500"
                          >
                            {isChannelActive && (
                              <animate
                                attributeName="stroke-dashoffset"
                                values="0;-20"
                                dur="1s"
                                repeatCount="indefinite"
                              />
                            )}
                          </line>
                        </svg>
                      )}
                    </div>
                  );
                })}
                
                {/* Message Flow Indicators */}
                {(isActive || isHovered) && dataFlow.slice(0, 3).map((flow, i) => (
                  <div
                    key={flow.id}
                    className="absolute w-2 h-2 bg-accent rounded-full opacity-60"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${flow.progress * 3.6}deg) translateY(-${40 + i * 10}px)`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Channel Statistics */}
            {(isActive || isHovered) && (
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-xl p-3 border border-accent/20">
                <div className="text-xs">
                  <div className="flex items-center space-x-2 mb-1">
                    <Activity className="w-3 h-3 text-accent" />
                    <span className="text-accent font-bold">{6 + animationStep}</span>
                    <span className="text-muted-foreground">Channels Active</span>
                  </div>
                  <div className="text-muted-foreground">
                    {Math.round(120 + animationStep * 15)} msg/min
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'dashboard':
        return (
          <div className="relative w-full h-80 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 rounded-3xl overflow-hidden p-6">
            {/* Intelligent Dashboard */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {[
                { 
                  icon: TrendingUp, 
                  title: 'Performance', 
                  value: () => `${85 + animationStep * 2}%`,
                  trend: '+12.5%',
                  chart: 'line'
                },
                { 
                  icon: Users, 
                  title: 'Active Users', 
                  value: () => `${1.2 + (animationStep * 0.1)}K`,
                  trend: '+8.2%',
                  chart: 'bar'
                },
                { 
                  icon: Activity, 
                  title: 'Response Time', 
                  value: () => `${45 - animationStep}ms`,
                  trend: '-15.3%',
                  chart: 'area'
                },
                { 
                  icon: Database, 
                  title: 'Data Processed', 
                  value: () => `${2.8 + (animationStep * 0.2)}M`,
                  trend: '+22.1%',
                  chart: 'donut'
                }
              ].map(({ icon: Icon, title, value, trend, chart }, i) => {
                const isWidgetActive = (isActive || isHovered);
                const hoverIntensity = isHovered ? 
                  Math.max(0.5, 1.5 - Math.abs((mousePosition.x + mousePosition.y) / 2 - 50) / 50) : 1;
                
                return (
                  <div
                    key={title}
                    className={`bg-background/50 backdrop-blur-sm rounded-xl p-4 border transition-all duration-500 cursor-pointer ${
                      isWidgetActive ? 'border-primary/30 shadow-lg scale-105' : 'border-primary/10 scale-100'
                    }`}
                    style={{ 
                      transform: `scale(${isHovered ? hoverIntensity : 1})`,
                      opacity: isHovered ? hoverIntensity : 1
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 transition-all duration-300 ${
                        isWidgetActive ? 'text-primary scale-110' : 'text-muted-foreground'
                      }`} />
                      <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                        isWidgetActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {trend}
                      </span>
                    </div>
                    
                    <div className={`text-2xl font-bold mb-1 transition-all duration-300 ${
                      isWidgetActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {value()}
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">{title}</div>
                    
                    {/* Mini Chart Visualization */}
                    <div className="h-8 relative overflow-hidden">
                      {chart === 'line' && (
                        <svg className="w-full h-full">
                          <polyline
                            points="0,6 8,4 16,7 24,3 32,5 40,2 48,6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-all duration-500 ${
                              isWidgetActive ? 'text-primary opacity-100' : 'text-muted opacity-50'
                            }`}
                          />
                        </svg>
                      )}
                      
                      {chart === 'bar' && (
                        <div className="flex items-end justify-between h-full space-x-1">
                          {[3, 6, 4, 8, 5, 7, 6].map((height, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-t transition-all duration-500 ${
                                isWidgetActive ? 'bg-primary' : 'bg-muted'
                              }`}
                              style={{ 
                                height: `${height * 4}px`,
                                animationDelay: `${idx * 100}ms`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Insights Panel */}
            {(isActive || isHovered) && (
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl p-3 border border-primary/20 max-w-48">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium">AI Insights</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Performance trending upward. Optimal response times detected.
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return <div className="w-full h-80 bg-muted/20 rounded-3xl" />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative cursor-pointer group"
      onClick={onActivate}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main animation content */}
      <div className={`transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
        {getIntelligentAnimation()}
      </div>
      
      {/* Interactive overlay effects */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isHovered ? 
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)` : 
            'transparent'
        }}
      />
      
      {/* Status indicators */}
      {!isActive && !isHovered && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-background/95 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-foreground border border-primary/20 shadow-lg">
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-primary" />
              <span>Click to start intelligent demo</span>
            </div>
          </div>
        </div>
      )}
      
      {isActive && (
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground border border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live Demo Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: Brain,
      title: 'AI Employee Builder',
      description: 'Drag-and-drop agent creation with voice, chat, logic, decision trees, and API integrations.',
      animationType: 'ai-employee' as const,
      capabilities: [
        'Visual agent designer',
        'Multi-modal AI (text, voice, vision)',
        'Custom personality & training',
        'Enterprise-grade security'
      ],
      color: 'primary',
      stats: { users: '12K+', accuracy: '99.2%', speed: '< 100ms' }
    },
    {
      icon: Workflow,
      title: 'Workflow Automation (iAWO)',
      description: 'No-code visual builder with blocks for triggers, logic, AI actions, and channels.',
      animationType: 'workflow' as const,
      capabilities: [
        'Drag-and-drop workflow design',
        'Smart triggers & conditions',
        'Multi-step automation',
        'Real-time monitoring'
      ],
      color: 'secondary',
      stats: { workflows: '50K+', efficiency: '89%', time_saved: '40hrs/week' }
    },
    {
      icon: MessageSquare,
      title: 'Multi-Channel Orchestration',
      description: 'WhatsApp, Instagram, Voice, Web, Email — deploy instantly across all channels.',
      animationType: 'multi-channel' as const,
      capabilities: [
        'Unified conversation management',
        'Cross-channel context',
        'Instant deployment',
        'Analytics & insights'
      ],
      color: 'accent',
      stats: { channels: '15+', messages: '2M+', response_time: '< 2s' }
    },
    {
      icon: BarChart3,
      title: 'Dashboard Builder',
      description: 'Prompt-based dashboard builder for ops, analytics, lead management and more.',
      animationType: 'dashboard' as const,
      capabilities: [
        'Natural language dashboards',
        'Real-time data visualization',
        'Custom KPI tracking',
        'Export & sharing'
      ],
      color: 'primary',
      stats: { dashboards: '8K+', insights: '150+', update_freq: 'Real-time' }
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 text-sm mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Platform Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Everything Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Team
            </span>{' '}
            Needs
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            From simple chatbots to complex multi-agent workflows. Build, deploy, and scale 
            your AI employees with enterprise-grade tools designed for the future of work.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow transition-all duration-500 ${
                      activeFeature === index ? 'scale-110' : 'scale-100'
                    } ${
                      feature.color === 'primary' ? 'bg-gradient-primary' :
                      feature.color === 'secondary' ? 'bg-gradient-secondary' :
                      'bg-gradient-to-r from-accent to-accent-glow'
                    }`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          feature.color === 'primary' ? 'bg-primary' :
                          feature.color === 'secondary' ? 'bg-secondary' :
                          'bg-accent'
                        }`} />
                        <span className="text-sm text-muted-foreground font-medium">
                          Enterprise Ready
                        </span>
                        {activeFeature === index && (
                          <div className="flex items-center space-x-2 text-xs text-primary font-medium">
                            <Activity className="w-3 h-3" />
                            <span>Live Demo Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats Display */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-background/50 to-muted/20 rounded-xl border border-primary/10">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-2xl font-bold ${
                          feature.color === 'primary' ? 'text-primary' :
                          feature.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`}>
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div 
                        key={capIndex} 
                        className={`flex items-center space-x-3 transition-all duration-300 ${
                          activeFeature === index ? 'translate-x-1' : 'translate-x-0'
                        }`}
                        style={{ transitionDelay: `${capIndex * 100}ms` }}
                      >
                        <CheckCircle2 className={`w-5 h-5 transition-all duration-300 ${
                          activeFeature === index ? 'scale-110' : 'scale-100'
                        } ${
                          feature.color === 'primary' ? 'text-primary' :
                          feature.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`} />
                        <span className="text-foreground font-medium">{capability}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      variant={feature.color === 'primary' ? 'default' : feature.color === 'secondary' ? 'secondary' : 'demo'} 
                      size="lg" 
                      className="group"
                      onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                    >
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>{activeFeature === index ? 'Stop Demo' : 'Try Interactive Demo'}</span>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="group">
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Watch Video</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Interactive Demo */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <IntelligentFeatureDemo
                  feature={feature}
                  isActive={activeFeature === index}
                  onActivate={() => setActiveFeature(activeFeature === index ? null : index)}
                />

                {/* Enhanced Floating Elements */}
                <div className={`absolute -top-6 -left-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-primary/30 shadow-glow scale-110 animate-bounce' 
                    : 'bg-primary/20 animate-float'
                }`}>
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                
                <div className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-secondary/30 shadow-glow scale-110 animate-spin' 
                    : 'bg-secondary/20 animate-float'
                }`} style={{ animationDelay: '1s' }}>
                  <Zap className="w-6 h-6 text-secondary" />
                </div>

                {/* Performance Indicators */}
                {activeFeature === index && (
                  <>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground border border-primary/20 animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Live Demo</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-foreground border border-primary/20 animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>Response: &lt; 100ms</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Build Your First AI Employee?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of companies already using BotWot AI to automate their workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl">
                Start Building Free
              </Button>
              <Button variant="outline" size="xl">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;