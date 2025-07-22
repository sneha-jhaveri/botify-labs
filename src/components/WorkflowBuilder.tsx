import React, { useCallback, useState, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  MessageSquare, 
  Phone, 
  Mail, 
  Database,
  Zap,
  Bot,
  Play,
  Plus,
  Loader2,
  CheckCircle2,
  Settings,
  Layers3,
  GitBranch,
  Sparkles,
  Code,
  Timer,
  Users
} from 'lucide-react';

interface WorkflowBuilderProps {
  isDemo?: boolean;
  industry?: string;
  onComplete?: () => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ isDemo = true, industry = 'general', onComplete }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(industry);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [showTemplates, setShowTemplates] = useState(!isDemo);

  const templates = [
    {
      id: 'banking',
      name: 'Banking & Fintech',
      icon: '🏦',
      description: 'KYC automation, loan processing, fraud detection with Zoho CRM',
      complexity: 'Advanced',
      time: '15 min',
      color: 'from-blue-500 to-cyan-500',
      integrations: ['Zoho CRM', 'DocuSign', 'Stripe', 'Twilio']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: '🛒',
      description: 'Cart recovery with WhatsApp, Gmail & Google Sheets analytics',
      complexity: 'Intermediate',
      time: '10 min',
      color: 'from-purple-500 to-pink-500',
      integrations: ['WhatsApp Business', 'Gmail', 'Google Sheets', 'Shopify']
    },
    {
      id: 'realestate',
      name: 'Real Estate',
      icon: '🏠',
      description: 'Lead qualification with Zoho, scheduling via Google Calendar',
      complexity: 'Intermediate',
      time: '12 min',
      color: 'from-green-500 to-emerald-500',
      integrations: ['Zoho CRM', 'Google Calendar', 'WhatsApp', 'Gmail']
    },
    {
      id: 'general',
      name: 'Customer Support',
      icon: '💬',
      description: 'Multi-channel support with Zendesk, Slack & email automation',
      complexity: 'Beginner',
      time: '8 min',
      color: 'from-orange-500 to-red-500',
      integrations: ['Zendesk', 'Slack', 'Gmail', 'Google Sheets']
    },
    {
      id: 'sales',
      name: 'Sales Automation',
      icon: '💼',
      description: 'Lead nurturing with Salesforce, HubSpot & automated follow-ups',
      complexity: 'Advanced',
      time: '18 min',
      color: 'from-indigo-500 to-purple-500',
      integrations: ['Salesforce', 'HubSpot', 'Gmail', 'LinkedIn', 'Calendly']
    },
    {
      id: 'marketing',
      name: 'Marketing Campaigns',
      icon: '📈',
      description: 'Multi-channel campaigns with Mailchimp, social media automation',
      complexity: 'Intermediate',
      time: '14 min',
      color: 'from-pink-500 to-rose-500',
      integrations: ['Mailchimp', 'Facebook Ads', 'Google Ads', 'Instagram', 'Analytics']
    }
  ];

  const getIndustryNodes = (industryType: string) => {
    const nodeConfigs = {
      banking: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '💳 Loan Application',
              description: 'Customer submits via web portal'
            }
          },
          {
            id: '2',
            position: { x: 100, y: 140 },
            data: { 
              label: '🤖 Document AI',
              description: 'Extract data from PDFs'
            }
          },
          {
            id: '3',
            position: { x: 400, y: 140 },
            data: { 
              label: '🔗 Zoho CRM',
              description: 'Create lead record'
            }
          },
          {
            id: '4',
            position: { x: 250, y: 260 },
            data: { 
              label: '⚡ Credit API',
              description: 'External credit check'
            }
          },
          {
            id: '5',
            position: { x: 100, y: 380 },
            data: { 
              label: '✍️ DocuSign',
              description: 'Send for e-signature'
            }
          },
          {
            id: '6',
            position: { x: 400, y: 380 },
            data: { 
              label: '💳 Stripe',
              description: 'Process payment'
            }
          },
          {
            id: '7',
            type: 'output',
            position: { x: 250, y: 500 },
            data: { 
              label: '📱 Twilio SMS',
              description: 'Notify approval status'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Extract' },
          { id: 'e1-3', source: '1', target: '3', label: 'Create Lead' },
          { id: 'e2-4', source: '2', target: '4', label: 'Check Credit' },
          { id: 'e3-4', source: '3', target: '4', label: 'Verify' },
          { id: 'e4-5', source: '4', target: '5', label: 'Approved' },
          { id: 'e4-6', source: '4', target: '6', label: 'Payment' },
          { id: 'e5-7', source: '5', target: '7', label: 'Signed' },
          { id: 'e6-7', source: '6', target: '7', label: 'Paid' }
        ]
      },
      ecommerce: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '🛒 Cart Abandoned',
              description: 'Shopify webhook trigger'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 140 },
            data: { 
              label: '🧠 AI Analysis',
              description: 'Analyze user behavior'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 260 },
            data: { 
              label: '📧 Gmail API',
              description: 'Send recovery email'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 260 },
            data: { 
              label: '💬 WhatsApp API',
              description: 'Send personalized message'
            }
          },
          {
            id: '5',
            position: { x: 250, y: 380 },
            data: { 
              label: '📊 Google Sheets',
              description: 'Log campaign data'
            }
          },
          {
            id: '6',
            position: { x: 100, y: 500 },
            data: { 
              label: '🎯 Facebook Ads',
              description: 'Retargeting campaign'
            }
          },
          {
            id: '7',
            type: 'output',
            position: { x: 400, y: 500 },
            data: { 
              label: '✅ Conversion',
              description: 'Track success metrics'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Analyze' },
          { id: 'e2-3', source: '2', target: '3', label: 'Email User' },
          { id: 'e2-4', source: '2', target: '4', label: 'WhatsApp' },
          { id: 'e2-5', source: '2', target: '5', label: 'Log Data' },
          { id: 'e3-6', source: '3', target: '6', label: 'Retarget' },
          { id: 'e4-7', source: '4', target: '7', label: 'Convert' },
          { id: 'e6-7', source: '6', target: '7', label: 'Success' }
        ]
      },
      realestate: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '🏠 Property Inquiry',
              description: 'Website form submission'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 140 },
            data: { 
              label: '🔗 Zoho CRM',
              description: 'Create new lead'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 260 },
            data: { 
              label: '🎯 AI Qualifier',
              description: 'Budget & preference analysis'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 260 },
            data: { 
              label: '💬 WhatsApp Bot',
              description: 'Initial qualification chat'
            }
          },
          {
            id: '5',
            position: { x: 100, y: 380 },
            data: { 
              label: '📅 Google Calendar',
              description: 'Schedule viewing'
            }
          },
          {
            id: '6',
            position: { x: 400, y: 380 },
            data: { 
              label: '📧 Gmail Follow-up',
              description: 'Send property matches'
            }
          },
          {
            id: '7',
            type: 'output',
            position: { x: 250, y: 500 },
            data: { 
              label: '👤 Agent Assignment',
              description: 'Hot lead to specialist'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Create Lead' },
          { id: 'e2-3', source: '2', target: '3', label: 'Qualify' },
          { id: 'e2-4', source: '2', target: '4', label: 'Chat' },
          { id: 'e3-5', source: '3', target: '5', label: 'Schedule' },
          { id: 'e4-6', source: '4', target: '6', label: 'Follow-up' },
          { id: 'e5-7', source: '5', target: '7', label: 'Assign' },
          { id: 'e6-7', source: '6', target: '7', label: 'Convert' }
        ]
      },
      general: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '💬 Multi-Channel',
              description: 'Email, chat, phone, social'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 140 },
            data: { 
              label: '🧠 AI Triage',
              description: 'Smart intent detection'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 260 },
            data: { 
              label: '🎫 Zendesk',
              description: 'Create support ticket'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 260 },
            data: { 
              label: '💻 Slack Alert',
              description: 'Notify support team'
            }
          },
          {
            id: '5',
            position: { x: 250, y: 380 },
            data: { 
              label: '📊 Google Sheets',
              description: 'Log interaction data'
            }
          },
          {
            id: '6',
            type: 'output',
            position: { x: 250, y: 500 },
            data: { 
              label: '📧 Gmail Follow-up',
              description: 'Automated resolution'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Analyze' },
          { id: 'e2-3', source: '2', target: '3', label: 'Ticket' },
          { id: 'e2-4', source: '2', target: '4', label: 'Alert' },
          { id: 'e3-5', source: '3', target: '5', label: 'Log' },
          { id: 'e4-5', source: '4', target: '5', label: 'Track' },
          { id: 'e5-6', source: '5', target: '6', label: 'Follow-up' }
        ]
      },
      sales: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '🎯 Lead Capture',
              description: 'Website, ads, referrals'
            }
          },
          {
            id: '2',
            position: { x: 100, y: 140 },
            data: { 
              label: '⚡ Salesforce',
              description: 'Create opportunity'
            }
          },
          {
            id: '3',
            position: { x: 400, y: 140 },
            data: { 
              label: '🚀 HubSpot',
              description: 'Lead scoring & routing'
            }
          },
          {
            id: '4',
            position: { x: 250, y: 260 },
            data: { 
              label: '🔗 LinkedIn API',
              description: 'Social prospecting'
            }
          },
          {
            id: '5',
            position: { x: 100, y: 380 },
            data: { 
              label: '📅 Calendly',
              description: 'Schedule demos'
            }
          },
          {
            id: '6',
            position: { x: 400, y: 380 },
            data: { 
              label: '📧 Gmail Sequence',
              description: 'Nurture campaign'
            }
          },
          {
            id: '7',
            type: 'output',
            position: { x: 250, y: 500 },
            data: { 
              label: '🤝 Deal Closed',
              description: 'Revenue generated'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Create' },
          { id: 'e1-3', source: '1', target: '3', label: 'Score' },
          { id: 'e2-4', source: '2', target: '4', label: 'Research' },
          { id: 'e3-4', source: '3', target: '4', label: 'Enrich' },
          { id: 'e4-5', source: '4', target: '5', label: 'Book' },
          { id: 'e4-6', source: '4', target: '6', label: 'Nurture' },
          { id: 'e5-7', source: '5', target: '7', label: 'Convert' },
          { id: 'e6-7', source: '6', target: '7', label: 'Close' }
        ]
      },
      marketing: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 20 },
            data: { 
              label: '🎯 Campaign Launch',
              description: 'Multi-channel activation'
            }
          },
          {
            id: '2',
            position: { x: 100, y: 140 },
            data: { 
              label: '📧 Mailchimp',
              description: 'Email campaign'
            }
          },
          {
            id: '3',
            position: { x: 400, y: 140 },
            data: { 
              label: '📘 Facebook Ads',
              description: 'Social advertising'
            }
          },
          {
            id: '4',
            position: { x: 250, y: 260 },
            data: { 
              label: '🔍 Google Ads',
              description: 'Search campaigns'
            }
          },
          {
            id: '5',
            position: { x: 100, y: 380 },
            data: { 
              label: '📸 Instagram API',
              description: 'Content automation'
            }
          },
          {
            id: '6',
            position: { x: 400, y: 380 },
            data: { 
              label: '📊 Analytics',
              description: 'Performance tracking'
            }
          },
          {
            id: '7',
            type: 'output',
            position: { x: 250, y: 500 },
            data: { 
              label: '🎯 Lead Generation',
              description: 'Qualified prospects'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Email' },
          { id: 'e1-3', source: '1', target: '3', label: 'Social' },
          { id: 'e1-4', source: '1', target: '4', label: 'Search' },
          { id: 'e2-5', source: '2', target: '5', label: 'Content' },
          { id: 'e3-6', source: '3', target: '6', label: 'Track' },
          { id: 'e4-6', source: '4', target: '6', label: 'Measure' },
          { id: 'e5-7', source: '5', target: '7', label: 'Convert' },
          { id: 'e6-7', source: '6', target: '7', label: 'Optimize' }
        ]
      }
    };

    const config = nodeConfigs[industryType as keyof typeof nodeConfigs] || nodeConfigs.general;
    
    const styledNodes: Node[] = config.nodes.map((node, index) => ({
      ...node,
      style: {
        background: index === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                   index === config.nodes.length - 1 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                   'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        padding: '20px',
        minWidth: '200px',
        minHeight: '80px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        display: 'flex' as const,
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        textAlign: 'center' as const
      }
    }));

    const styledEdges: Edge[] = config.edges.map((edge, index) => ({
      ...edge,
      animated: true,
      style: { 
        stroke: '#667eea', 
        strokeWidth: 4,
        filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#667eea',
        width: 25,
        height: 25
      },
      labelStyle: {
        fill: '#1a1a1a',
        fontWeight: 700,
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif'
      },
      labelBgStyle: {
        fill: 'rgba(255, 255, 255, 0.95)',
        fillOpacity: 1,
        rx: 12,
        ry: 12
      }
    }));

    return { nodes: styledNodes, edges: styledEdges };
  };

  const { nodes: initialNodes, edges: initialEdges } = getIndustryNodes(selectedTemplate);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = getIndustryNodes(selectedTemplate);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [selectedTemplate, setNodes, setEdges]);

  const onConnect = useCallback((params: Connection) => {
    if (params.source && params.target) {
      const newEdge: Edge = {
        id: `${params.source}-${params.target}-${Date.now()}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: true,
        style: { 
          stroke: '#667eea', 
          strokeWidth: 4,
          filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#667eea',
          width: 25,
          height: 25
        }
      };
      setEdges((eds) => addEdge(newEdge, eds));
    }
  }, [setEdges]);

  const addCustomNode = useCallback((label: string, icon: string) => {
    const newNode: Node = {
      id: `custom-${Date.now()}`,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 200 },
      data: { 
        label: `${icon} ${label}`,
        description: 'Custom integration node'
      },
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        padding: '20px',
        minWidth: '200px',
        minHeight: '80px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        display: 'flex' as const,
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        textAlign: 'center' as const
      }
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleDeploy = () => {
    setIsConfiguring(true);
    setDeploymentProgress(0);
    
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsConfiguring(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  return (
    <div className="space-y-8">
      {/* Template Selector */}
      {showTemplates && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Choose Your AI Workflow Template</h3>
            <p className="text-muted-foreground">Select an industry template to get started quickly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  selectedTemplate === template.id 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{template.icon}</div>
                  <h4 className="font-bold mb-2">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <Badge variant="outline" className="text-xs">{template.complexity}</Badge>
                      <span className="text-muted-foreground">{template.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.integrations?.slice(0, 3).map((integration, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{integration}</Badge>
                      ))}
                      {template.integrations && template.integrations.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{template.integrations.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Workflow Builder Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentTemplate.color} flex items-center justify-center text-2xl shadow-lg`}>
            {currentTemplate.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {isDemo ? 'Interactive Workflow Demo' : `${currentTemplate.name} Workflow`}
            </h3>
            <p className="text-muted-foreground">
              {isDemo 
                ? 'See how AI agents process customer interactions'
                : 'Drag nodes to customize, connect blocks to build your automation'
              }
            </p>
          </div>
        </div>
        
        {!isDemo && (
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span>Setup: {currentTemplate.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers3 className="w-4 h-4" />
              <span>{currentTemplate.complexity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>{nodes.length} Nodes</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Workflow Canvas */}
      <div className="relative h-[500px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-3xl border-2 border-primary/20 overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          connectionLineStyle={{ 
            stroke: '#667eea', 
            strokeWidth: 4,
            strokeDasharray: '8,8'
          }}
          defaultEdgeOptions={{
            animated: true,
            style: { 
              stroke: '#667eea', 
              strokeWidth: 4 
            }
          }}
          className="rounded-3xl"
          proOptions={{ hideAttribution: true }}
        >
          <Background 
            color="#94a3b8" 
            gap={30} 
            size={3}
            variant={BackgroundVariant.Dots}
            className="opacity-40"
          />
          
          <Controls 
            showInteractive={!isDemo}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl m-4"
          />
          
          {!isDemo && (
            <MiniMap 
              nodeColor="#667eea"
              nodeStrokeColor="#4338ca"
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl m-4"
              maskColor="rgba(255,255,255,0.1)"
            />
          )}

          {/* Enhanced Floating Action Panel */}
          {!isDemo && (
            <Panel position="top-right" className="m-4">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl space-y-3">
                <h4 className="text-sm font-semibold mb-3">Add Integrations</h4>
                <Button variant="outline" size="sm" className="w-full" onClick={() => addCustomNode('Zoho CRM', '🔗')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Zoho CRM
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => addCustomNode('WhatsApp', '💬')}>
                  <Plus className="w-4 h-4 mr-2" />
                  WhatsApp API
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => addCustomNode('Gmail', '📧')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Gmail API
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => addCustomNode('Google Sheets', '📊')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Google Sheets
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={() => addCustomNode('Slack', '💻')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Slack
                </Button>
                <div className="border-t pt-3 mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Code className="w-4 h-4 mr-2" />
                    Export Code
                  </Button>
                </div>
              </div>
            </Panel>
          )}
        </ReactFlow>
      </div>

      {/* Deploy Section */}
      {!isDemo && (
        <div className="text-center space-y-6">
          {isConfiguring ? (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-xl font-bold">Deploying AI Workflow...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${deploymentProgress}%` }}
                />
              </div>
              <p className="text-muted-foreground">
                {deploymentProgress < 30 && "Initializing AI modules..."}
                {deploymentProgress >= 30 && deploymentProgress < 60 && "Training neural networks..."}
                {deploymentProgress >= 60 && deploymentProgress < 90 && "Setting up integrations..."}
                {deploymentProgress >= 90 && "Finalizing deployment..."}
              </p>
            </div>
          ) : (
            <Button 
              variant="cta" 
              size="xl"
              onClick={handleDeploy}
              className="px-12 py-4 text-lg shadow-2xl hover:shadow-glow transition-all duration-300"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Deploy AI Workflow to Production
              <Users className="w-6 h-6 ml-3" />
            </Button>
          )}
          
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Auto-scaling</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;