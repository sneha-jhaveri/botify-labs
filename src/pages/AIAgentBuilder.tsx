import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Globe, Palette, Mic, Eye, Calendar, Users, Plus, Play, Send } from 'lucide-react';

interface AIAgent {
  id?: string;
  name: string;
  description: string;
  guidelines: string;
  goals: string;
  fallback_message: string;
  primary_color: string;
  custom_icon_url: string;
  font_family: string;
  ui_theme: any;
  tools: any[];
  has_voice_ai: boolean;
  has_vision: boolean;
  has_calendar: boolean;
  has_lead_capture: boolean;
  workflow_config: any;
  is_deployed: boolean;
  deployment_url: string;
}

interface KnowledgeBase {
  id?: string;
  name: string;
  content: string;
  source_type: 'upload' | 'scrape' | 'manual';
  source_url?: string;
  is_editable: boolean;
}

const AIAgentBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState<AIAgent>({
    name: '',
    description: '',
    guidelines: '',
    goals: '',
    fallback_message: 'I apologize, but I cannot assist with that request. Please try rephrasing your question or contact support.',
    primary_color: '#3b82f6',
    custom_icon_url: '',
    font_family: 'Inter',
    ui_theme: {},
    tools: [],
    has_voice_ai: false,
    has_vision: false,
    has_calendar: false,
    has_lead_capture: false,
    workflow_config: {},
    is_deployed: false,
    deployment_url: ''
  });
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [newKnowledge, setNewKnowledge] = useState({ name: '', content: '' });
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { title: 'Basic Info', description: 'Name and description of your AI agent' },
    { title: 'Knowledge Base', description: 'Upload knowledge and configure content' },
    { title: 'Guidelines & Goals', description: 'Set behavior guidelines and objectives' },
    { title: 'Appearance', description: 'Customize look and feel' },
    { title: 'AI Tools', description: 'Configure capabilities and integrations' },
    { title: 'Workflow', description: 'Set up automated workflows (optional)' },
    { title: 'Test & Deploy', description: 'Test your agent and deploy' }
  ];

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSaveAgent = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const agentData = {
        ...agent,
        user_id: user.id,
        tools: JSON.stringify(agent.tools),
        ui_theme: JSON.stringify(agent.ui_theme),
        workflow_config: JSON.stringify(agent.workflow_config)
      };

      const { error } = await supabase
        .from('ai_agents')
        .upsert(agentData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "AI agent saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddKnowledge = async () => {
    if (!newKnowledge.name || !newKnowledge.content) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('knowledge_bases')
        .insert({
          user_id: user.id,
          name: newKnowledge.name,
          content: newKnowledge.content,
          source_type: 'manual',
          is_editable: true
        });

      if (error) throw error;

      setNewKnowledge({ name: '', content: '' });
      // Refresh knowledge bases list
      loadKnowledgeBases();
      
      toast({
        title: "Success!",
        description: "Knowledge base added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadKnowledgeBases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('knowledge_bases')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setKnowledgeBases((data || []) as KnowledgeBase[]);
    } catch (error: any) {
      console.error('Error loading knowledge bases:', error);
    }
  };

  useEffect(() => {
    loadKnowledgeBases();
  }, []);

  const handleTestAgent = async () => {
    if (!testMessage.trim()) return;

    setLoading(true);
    try {
      // This would integrate with OpenAI API through edge function
      setTestResponse(`Test response for: "${testMessage}". This is a placeholder response while the full AI integration is being built.`);
      
      toast({
        title: "Test Complete",
        description: "AI agent responded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                value={agent.name}
                onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                placeholder="e.g., Customer Support Bot"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-description">Description</Label>
              <Textarea
                id="agent-description"
                value={agent.description}
                onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                placeholder="Describe what your AI agent does..."
                rows={3}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add Knowledge Base</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="knowledge-name">Knowledge Base Name</Label>
                  <Input
                    id="knowledge-name"
                    value={newKnowledge.name}
                    onChange={(e) => setNewKnowledge({ ...newKnowledge, name: e.target.value })}
                    placeholder="e.g., Product Documentation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="knowledge-content">Content</Label>
                  <Textarea
                    id="knowledge-content"
                    value={newKnowledge.content}
                    onChange={(e) => setNewKnowledge({ ...newKnowledge, content: e.target.value })}
                    placeholder="Enter knowledge content, FAQs, or procedures..."
                    rows={6}
                  />
                </div>
                <Button onClick={handleAddKnowledge} disabled={loading} className="w-fit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Knowledge Base
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <Label htmlFor="scrape-url">Scrape Website (Optional)</Label>
              </div>
              <div className="flex gap-2">
                <Input
                  id="scrape-url"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  placeholder="https://example.com"
                />
                <Button variant="outline" disabled={!scrapeUrl || loading}>
                  <Upload className="h-4 w-4 mr-2" />
                  Scrape
                </Button>
              </div>
            </div>

            {knowledgeBases.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Existing Knowledge Bases</h4>
                <div className="grid gap-2">
                  {knowledgeBases.map((kb) => (
                    <div key={kb.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{kb.name}</p>
                        <p className="text-sm text-muted-foreground">{kb.source_type}</p>
                      </div>
                      <Badge variant={kb.is_editable ? "default" : "secondary"}>
                        {kb.is_editable ? "Editable" : "Read-only"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guidelines">Guidelines</Label>
              <Textarea
                id="guidelines"
                value={agent.guidelines}
                onChange={(e) => setAgent({ ...agent, guidelines: e.target.value })}
                placeholder="Set behavior guidelines for your AI agent..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                value={agent.goals}
                onChange={(e) => setAgent({ ...agent, goals: e.target.value })}
                placeholder="Define the primary goals and objectives..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fallback">Fallback Message</Label>
              <Textarea
                id="fallback"
                value={agent.fallback_message}
                onChange={(e) => setAgent({ ...agent, fallback_message: e.target.value })}
                placeholder="Message when the AI can't help..."
                rows={2}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={agent.primary_color}
                  onChange={(e) => setAgent({ ...agent, primary_color: e.target.value })}
                  className="w-20"
                />
                <Input
                  value={agent.primary_color}
                  onChange={(e) => setAgent({ ...agent, primary_color: e.target.value })}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Input
                id="font-family"
                value={agent.font_family}
                onChange={(e) => setAgent({ ...agent, font_family: e.target.value })}
                placeholder="Inter, Arial, sans-serif"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-icon">Custom Icon URL</Label>
              <Input
                id="custom-icon"
                value={agent.custom_icon_url}
                onChange={(e) => setAgent({ ...agent, custom_icon_url: e.target.value })}
                placeholder="https://example.com/icon.png"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI Tools & Capabilities</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className={`cursor-pointer transition-colors ${agent.has_voice_ai ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setAgent({ ...agent, has_voice_ai: !agent.has_voice_ai })}>
                <CardContent className="p-4 text-center">
                  <Mic className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-medium">Voice AI</h4>
                  <p className="text-sm text-muted-foreground">Enable voice interactions</p>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer transition-colors ${agent.has_vision ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setAgent({ ...agent, has_vision: !agent.has_vision })}>
                <CardContent className="p-4 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-medium">Vision</h4>
                  <p className="text-sm text-muted-foreground">Process images and documents</p>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-colors ${agent.has_calendar ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setAgent({ ...agent, has_calendar: !agent.has_calendar })}>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-medium">Calendar Integration</h4>
                  <p className="text-sm text-muted-foreground">Schedule meetings and events</p>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-colors ${agent.has_lead_capture ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setAgent({ ...agent, has_lead_capture: !agent.has_lead_capture })}>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-medium">Lead/Info Capture</h4>
                  <p className="text-sm text-muted-foreground">Collect user information</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Workflow Configuration (Optional)</h3>
            <p className="text-muted-foreground">Set up automated workflows and integrations. This step can be skipped.</p>
            <Button variant="outline" onClick={() => setCurrentStep(currentStep + 1)}>
              Skip Workflow Setup
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Test Your AI Agent</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-message">Test Message</Label>
                <div className="flex gap-2">
                  <Input
                    id="test-message"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Ask your AI agent a question..."
                  />
                  <Button onClick={handleTestAgent} disabled={loading || !testMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>

              {testResponse && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">AI Response:</h4>
                  <p>{testResponse}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Deploy Your Agent</h4>
              <div className="flex gap-2">
                <Button onClick={handleSaveAgent} disabled={loading}>
                  <Play className="h-4 w-4 mr-2" />
                  Deploy Agent
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Save as Draft
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Agent Builder</h1>
          <p className="text-muted-foreground">Create your custom AI agent step by step</p>
          <Progress value={progress} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStep
                      ? 'bg-muted'
                      : 'bg-background border'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm opacity-80">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
                
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentBuilder;