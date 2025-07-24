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
  Zap,
  ChevronLeft,
  ChevronRight,
  Database,
  Workflow,
  Globe,
  Shield,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

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
  const [isInteractive, setIsInteractive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const [aiData, setAiData] = useState({
    // Persona Data
    name: 'Alex',
    role: 'Customer Support Agent',
    personality: 'Professional & Friendly',
    avatar: '🤖',
    tone: 'professional',
    expertise: '',
    
    // Knowledge & SOPs
    knowledgeBase: '',
    procedures: '',
    guidelines: '',
    
    // Abilities
    selectedAbilities: [] as string[],
    customAbilities: '',
    
    // Access & Tools
    channels: [] as string[],
    integrations: [] as string[],
    permissions: '',
    
    // Workflow
    workflowType: '',
    triggers: '',
    actions: ''
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
            setTimeout(() => {
              setIsBuilding(false);
              setIsInteractive(false);
            }, 1000);
          }
        }, step.duration);
      }, buildSteps.slice(0, index).reduce((acc, s) => acc + s.duration, 0));
    });
  };

  const startInteractive = () => {
    setIsInteractive(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsBuilding(false);
  };

  const nextStep = () => {
    if (currentStep < buildSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAiData = (field: string, value: any) => {
    setAiData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAbility = (ability: string) => {
    setAiData(prev => ({
      ...prev,
      selectedAbilities: prev.selectedAbilities.includes(ability)
        ? prev.selectedAbilities.filter(a => a !== ability)
        : [...prev.selectedAbilities, ability]
    }));
  };

  const toggleChannel = (channel: string) => {
    setAiData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const toggleIntegration = (integration: string) => {
    setAiData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const finishBuilding = () => {
    setCompletedSteps([...Array(buildSteps.length).keys()]);
    setIsInteractive(false);
    setIsBuilding(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Define Persona
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white">AI Name</Label>
                <Input
                  value={aiData.name}
                  onChange={(e) => updateAiData('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="Enter AI name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Role</Label>
                <Input
                  value={aiData.role}
                  onChange={(e) => updateAiData('role', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  placeholder="e.g., Customer Support Agent"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Personality & Tone</Label>
              <Textarea
                value={aiData.personality}
                onChange={(e) => updateAiData('personality', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="Describe the AI's personality, communication style, and approach..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Area of Expertise</Label>
              <Input
                value={aiData.expertise}
                onChange={(e) => updateAiData('expertise', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                placeholder="e.g., Technical Support, Sales, HR"
              />
            </div>
          </div>
        );

      case 1: // Add Knowledge & SOPs
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Knowledge Base</Label>
              <Textarea
                value={aiData.knowledgeBase}
                onChange={(e) => updateAiData('knowledgeBase', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                placeholder="Add your company knowledge, FAQs, product information..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Standard Operating Procedures</Label>
              <Textarea
                value={aiData.procedures}
                onChange={(e) => updateAiData('procedures', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                placeholder="Define step-by-step procedures and workflows..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Guidelines & Policies</Label>
              <Textarea
                value={aiData.guidelines}
                onChange={(e) => updateAiData('guidelines', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="Company policies, escalation rules, compliance requirements..."
              />
            </div>
          </div>
        );

      case 2: // Attach Abilities
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Select AI Abilities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Natural Language Processing', 'Sentiment Analysis', 'Multi-language Support', 'Document Processing', 'Image Recognition', 'Voice Recognition', 'Data Analysis', 'Report Generation', 'Calendar Management'].map((ability) => (
                  <Card
                    key={ability}
                    className={`p-3 cursor-pointer transition-all duration-200 ${
                      aiData.selectedAbilities.includes(ability)
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                    }`}
                    onClick={() => toggleAbility(ability)}
                  >
                    <div className="text-sm font-medium text-center">{ability}</div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Custom Abilities</Label>
              <Textarea
                value={aiData.customAbilities}
                onChange={(e) => updateAiData('customAbilities', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="Describe any custom abilities or specialized functions..."
              />
            </div>
          </div>
        );

      case 3: // Configure Access & Tools
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Communication Channels</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Web Chat', 'WhatsApp', 'Email', 'Phone', 'SMS', 'Slack', 'Teams', 'Instagram'].map((channel) => (
                  <Card
                    key={channel}
                    className={`p-3 cursor-pointer transition-all duration-200 ${
                      aiData.channels.includes(channel)
                        ? 'bg-secondary/20 border-secondary text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                    }`}
                    onClick={() => toggleChannel(channel)}
                  >
                    <div className="text-sm font-medium text-center">{channel}</div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-white">Tool Integrations</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['CRM System', 'Helpdesk', 'Calendar', 'Email Platform', 'Analytics', 'Database', 'Payment Gateway', 'Social Media'].map((integration) => (
                  <Card
                    key={integration}
                    className={`p-3 cursor-pointer transition-all duration-200 ${
                      aiData.integrations.includes(integration)
                        ? 'bg-accent/20 border-accent text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                    }`}
                    onClick={() => toggleIntegration(integration)}
                  >
                    <div className="text-sm font-medium text-center">{integration}</div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Access Permissions</Label>
              <Textarea
                value={aiData.permissions}
                onChange={(e) => updateAiData('permissions', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="Define what the AI can access, modify, or control..."
              />
            </div>
          </div>
        );

      case 4: // Connect to Workflow
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Workflow Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Customer Support', 'Sales Pipeline', 'Lead Generation', 'Content Creation', 'Data Processing', 'Task Automation'].map((type) => (
                  <Card
                    key={type}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      aiData.workflowType === type
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                    }`}
                    onClick={() => updateAiData('workflowType', type)}
                  >
                    <div className="text-sm font-medium text-center">{type}</div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Triggers & Events</Label>
              <Textarea
                value={aiData.triggers}
                onChange={(e) => updateAiData('triggers', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="When should this AI be activated? (e.g., new customer inquiry, form submission...)"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Automated Actions</Label>
              <Textarea
                value={aiData.actions}
                onChange={(e) => updateAiData('actions', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
                placeholder="What actions should the AI perform? (e.g., send emails, create tickets, update database...)"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-3xl border border-primary/20 overflow-hidden">
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
                {aiData.avatar}
              </div>
              {(isBuilding || isInteractive) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{aiData.name}</h3>
              <p className="text-primary/80">{aiData.role}</p>
              <p className="text-xs text-white/60">{aiData.personality.split(' ').slice(0, 3).join(' ')}</p>
            </div>
          </div>
          
          {!isBuilding && !isInteractive && (
            <div className="flex gap-3">
              <Button onClick={startInteractive} variant="cta" className="group">
                <User className="w-4 h-4 mr-2" />
                Build AI Employee
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={startBuilding} variant="outline" className="group">
                <Sparkles className="w-4 h-4 mr-2" />
                Auto Build
              </Button>
            </div>
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

        {/* Interactive Builder */}
        {isInteractive && (
          <div className="flex-1 flex flex-col">
            {/* Step Progress */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {buildSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep;
                const isCompleted = completedSteps.includes(index);
                const isPending = index > currentStep && !completedSteps.includes(index);

                return (
                  <div key={step.id} className="text-center">
                    <div className={`
                      relative w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${step.color}
                      flex items-center justify-center transition-all duration-500 cursor-pointer
                      ${isActive ? 'scale-110 ring-4 ring-primary/50' : ''}
                      ${isCompleted ? 'scale-100' : ''}
                      ${isPending ? 'scale-90 opacity-50' : ''}
                    `}
                    onClick={() => setCurrentStep(index)}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                      
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-white/80 font-medium mb-1">
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6 overflow-y-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  {React.createElement(buildSteps[currentStep]?.icon, { className: "w-5 h-5 text-white" })}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {buildSteps[currentStep]?.title}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {buildSteps[currentStep]?.description}
                  </p>
                </div>
              </div>
              
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-white/60 text-sm">
                Step {currentStep + 1} of {buildSteps.length}
              </div>

              {currentStep === buildSteps.length - 1 ? (
                <Button onClick={finishBuilding} variant="cta" className="group">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Finish Building
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={nextStep} variant="cta" className="group">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        )}
        {/* Capabilities Preview */}
        {!isBuilding && !isInteractive && completedSteps.length === 0 && (
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