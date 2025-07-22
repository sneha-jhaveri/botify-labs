import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import LiveDemo from '@/components/LiveDemo';
import { 
  Brain, 
  Workflow, 
  MessageSquare, 
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  Bot,
  Users,
  TrendingUp
} from 'lucide-react';

const InteractiveSection = () => {
  const [activeTab, setActiveTab] = useState('workflow');
  const [completedWorkflow, setCompletedWorkflow] = useState(false);

  const tabs = [
    {
      id: 'workflow',
      title: 'Build Workflows',
      subtitle: 'Drag & Drop Builder',
      icon: Workflow,
      description: 'Create complex AI workflows with simple drag-and-drop'
    },
    {
      id: 'chat',
      title: 'Live AI Chat',
      subtitle: 'Banking Assistant',
      icon: MessageSquare,
      description: 'Try our AI employees in real conversation'
    },
    {
      id: 'voice',
      title: 'Voice AI Demo',
      subtitle: 'Real Estate Agent',
      icon: Brain,
      description: 'Experience natural voice conversations'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2 text-sm mb-6">
            <Play className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium">Interactive Experience</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Don't Just Read About It —{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Try It Live
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience the power of BotWot AI firsthand. Build workflows, chat with AI employees, 
            and see how easy it is to automate your business processes.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center mb-8 bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 p-4 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{tab.title}</div>
                  <div className="text-xs opacity-75">{tab.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-3xl p-8">
            {/* Tab Description */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                {tabs.find(t => t.id === activeTab)?.title}
              </h3>
              <p className="text-muted-foreground">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>

            {/* Interactive Content */}
            {activeTab === 'workflow' && (
              <div className="space-y-6">
                <WorkflowBuilder 
                  isDemo={false}
                  onComplete={() => setCompletedWorkflow(true)}
                />
                
                {completedWorkflow && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center animate-fade-in">
                    <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="font-bold mb-2">Workflow Complete!</h4>
                    <p className="text-muted-foreground mb-4">
                      You just built a real AI workflow. Ready to create your own?
                    </p>
                    <Button variant="cta">
                      Start Building Your AI Team
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LiveDemo
                  type="chat"
                  title="Banking AI Assistant"
                  description="Handles account inquiries and loan applications"
                  industry="banking"
                />
                
                <div className="space-y-6">
                  <h4 className="font-semibold text-foreground">What This Demo Shows:</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Natural conversation flow</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Context understanding</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Industry-specific knowledge</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Real-time responses</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-xl p-4">
                    <h5 className="font-medium mb-2">Try asking:</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• "I need a business loan"</li>
                      <li>• "Check my account balance"</li>
                      <li>• "Help with investment options"</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LiveDemo
                  type="voice"
                  title="Real Estate Voice Agent"
                  description="Handles property inquiries and bookings"
                  industry="realestate"
                />
                
                <div className="space-y-6">
                  <h4 className="font-semibold text-foreground">Voice AI Capabilities:</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Natural speech recognition</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Emotion detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Multi-language support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Interrupt handling</span>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/10 rounded-xl p-4">
                    <h5 className="font-medium mb-2">Voice Features:</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Custom voice personas</li>
                      <li>• Real-time conversation</li>
                      <li>• Call routing & escalation</li>
                      <li>• CRM integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Interactive Sessions</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-secondary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">User Satisfaction</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Always Available</div>
            </div>
            <div className="text-center bg-gradient-ai backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Industries Served</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Impressed? Your AI Team is Just Minutes Away
            </h3>
            <p className="text-muted-foreground mb-8">
              Sign up now and start building your first AI employee in under 10 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" className="group">
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Book Personal Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;