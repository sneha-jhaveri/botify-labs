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
  Panel,
  Handle,
  Position
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
  Users,
  Minus,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
  Trash2,
  Copy,
  Edit3
} from 'lucide-react';

interface WorkflowBuilderProps {
  isDemo?: boolean;
  industry?: string;
  onComplete?: () => void;
}

interface NodeData {
  label: string;
  description: string;
  isMinimized?: boolean;
  type?: string;
  icon?: string;
}

// Custom Node Component with minimize/maximize functionality
const CustomNode = ({ data, id }: { data: NodeData; id: string }) => {
  const [isMinimized, setIsMinimized] = useState(data.isMinimized || false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection Handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-white border-2 border-primary shadow-lg"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-white border-2 border-primary shadow-lg"
      />
      
      {/* Node Content */}
      <div className={`
        bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900
        border-2 border-primary/20 rounded-2xl shadow-xl
        backdrop-blur-xl transition-all duration-300
        ${isHovered ? 'shadow-2xl border-primary/40 scale-[1.02]' : ''}
        ${isMinimized ? 'w-[80px] h-[40px] min-w-0 min-h-0' : 'w-[200px] h-auto min-w-[200px] min-h-[80px]'}
        max-w-[250px] overflow-hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-border/50">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs flex-shrink-0">
              {data.icon || '🔧'}
            </div>
            {!isMinimized && (
              <span className="font-semibold text-xs truncate">
                {data.label}
              </span>
            )}
          </div>
          
          {/* Controls */}
          <Button
            variant="ghost"
            size="sm"
            className="w-5 h-5 p-0 opacity-60 hover:opacity-100 flex-shrink-0"
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          </Button>
        </div>
        
        {/* Content */}
        {!isMinimized && (
          <div className="p-2">
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {data.description}
            </p>
          </div>
        )}
        
        {/* Status Indicator */}
        <div className="absolute -top-1 -right-1">
          <div className="w-2 h-2 bg-green-500 rounded-full border border-white shadow-sm"></div>
        </div>
        
        {/* Hover Actions */}
        {isHovered && !isMinimized && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-50">
            <div className="bg-black/90 backdrop-blur-xl rounded-lg px-2 py-1 flex items-center space-x-1 shadow-xl">
              <Button variant="ghost" size="sm" className="w-5 h-5 p-0 text-white hover:text-primary">
                <Info className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="w-5 h-5 p-0 text-white hover:text-primary">
                <Edit3 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="w-5 h-5 p-0 text-white hover:text-destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="w-5 h-5 p-0 text-white hover:text-primary">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Node types configuration
const nodeTypes = {
  custom: CustomNode,
};

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ isDemo = true, industry = 'general', onComplete }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(industry);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [showTemplates, setShowTemplates] = useState(!isDemo);
  const [isQuickActionsMinimized, setIsQuickActionsMinimized] = useState(false);

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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Loan Application',
              description: 'Customer submits via web portal',
              icon: '💳',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 140 },
            data: { 
              label: 'Document AI',
              description: 'Extract data from PDFs using advanced OCR',
              icon: '🤖',
              type: 'ai'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 140 },
            data: { 
              label: 'Zoho CRM',
              description: 'Create lead record and track progress',
              icon: '🔗',
              type: 'integration'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 260 },
            data: { 
              label: 'Credit API',
              description: 'External credit check and scoring',
              icon: '⚡',
              type: 'service'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 100, y: 380 },
            data: { 
              label: 'DocuSign',
              description: 'Send documents for e-signature',
              icon: '✍️',
              type: 'integration'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 400, y: 380 },
            data: { 
              label: 'Stripe',
              description: 'Process payment securely',
              icon: '💳',
              type: 'payment'
            }
          },
          {
            id: '7',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { 
              label: 'Twilio SMS',
              description: 'Notify approval status via SMS',
              icon: '📱',
              type: 'output'
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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Cart Abandoned',
              description: 'Shopify webhook trigger for abandoned carts',
              icon: '🛒',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 250, y: 140 },
            data: { 
              label: 'AI Analysis',
              description: 'Analyze user behavior and purchase intent',
              icon: '🧠',
              type: 'ai'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 100, y: 260 },
            data: { 
              label: 'Gmail API',
              description: 'Send personalized recovery email',
              icon: '📧',
              type: 'integration'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 400, y: 260 },
            data: { 
              label: 'WhatsApp API',
              description: 'Send personalized WhatsApp message',
              icon: '💬',
              type: 'integration'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 250, y: 380 },
            data: { 
              label: 'Google Sheets',
              description: 'Log campaign performance data',
              icon: '📊',
              type: 'storage'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 100, y: 500 },
            data: { 
              label: 'Facebook Ads',
              description: 'Launch retargeting campaign',
              icon: '🎯',
              type: 'marketing'
            }
          },
          {
            id: '7',
            type: 'custom',
            position: { x: 400, y: 500 },
            data: { 
              label: 'Conversion',
              description: 'Track success metrics and ROI',
              icon: '✅',
              type: 'output'
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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Property Inquiry',
              description: 'Website form submission and lead capture',
              icon: '🏠',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 250, y: 140 },
            data: { 
              label: 'Zoho CRM',
              description: 'Create new lead record with property details',
              icon: '🔗',
              type: 'integration'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 100, y: 260 },
            data: { 
              label: 'AI Qualifier',
              description: 'Budget & preference analysis using ML',
              icon: '🎯',
              type: 'ai'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 400, y: 260 },
            data: { 
              label: 'WhatsApp Bot',
              description: 'Initial qualification chat automation',
              icon: '💬',
              type: 'messaging'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 100, y: 380 },
            data: { 
              label: 'Google Calendar',
              description: 'Schedule property viewing appointments',
              icon: '📅',
              type: 'scheduling'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 400, y: 380 },
            data: { 
              label: 'Gmail Follow-up',
              description: 'Send property matches and updates',
              icon: '📧',
              type: 'email'
            }
          },
          {
            id: '7',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { 
              label: 'Agent Assignment',
              description: 'Route hot leads to specialist agents',
              icon: '👤',
              type: 'output'
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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Multi-Channel',
              description: 'Email, chat, phone, social media inputs',
              icon: '💬',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 250, y: 140 },
            data: { 
              label: 'AI Triage',
              description: 'Smart intent detection and categorization',
              icon: '🧠',
              type: 'ai'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 100, y: 260 },
            data: { 
              label: 'Zendesk',
              description: 'Create and manage support tickets',
              icon: '🎫',
              type: 'integration'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 400, y: 260 },
            data: { 
              label: 'Slack Alert',
              description: 'Notify support team instantly',
              icon: '💻',
              type: 'communication'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 250, y: 380 },
            data: { 
              label: 'Google Sheets',
              description: 'Log interaction data and analytics',
              icon: '📊',
              type: 'storage'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { 
              label: 'Gmail Follow-up',
              description: 'Automated resolution and feedback',
              icon: '📧',
              type: 'output'
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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Lead Capture',
              description: 'Website, ads, referrals, and form submissions',
              icon: '🎯',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 140 },
            data: { 
              label: 'Salesforce',
              description: 'Create opportunity and track pipeline',
              icon: '⚡',
              type: 'crm'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 140 },
            data: { 
              label: 'HubSpot',
              description: 'Lead scoring & intelligent routing',
              icon: '🚀',
              type: 'marketing'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 260 },
            data: { 
              label: 'LinkedIn API',
              description: 'Social prospecting and lead enrichment',
              icon: '🔗',
              type: 'social'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 100, y: 380 },
            data: { 
              label: 'Calendly',
              description: 'Schedule demos and meetings',
              icon: '📅',
              type: 'scheduling'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 400, y: 380 },
            data: { 
              label: 'Gmail Sequence',
              description: 'Automated nurture campaigns',
              icon: '📧',
              type: 'email'
            }
          },
          {
            id: '7',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { 
              label: 'Deal Closed',
              description: 'Revenue generated and tracked',
              icon: '🤝',
              type: 'output'
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
            type: 'custom',
            position: { x: 250, y: 20 },
            data: { 
              label: 'Campaign Launch',
              description: 'Multi-channel activation and coordination',
              icon: '🎯',
              type: 'input'
            }
          },
          {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 140 },
            data: { 
              label: 'Mailchimp',
              description: 'Email campaign automation',
              icon: '📧',
              type: 'email'
            }
          },
          {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 140 },
            data: { 
              label: 'Facebook Ads',
              description: 'Social media advertising campaigns',
              icon: '📘',
              type: 'advertising'
            }
          },
          {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 260 },
            data: { 
              label: 'Google Ads',
              description: 'Search and display campaigns',
              icon: '🔍',
              type: 'advertising'
            }
          },
          {
            id: '5',
            type: 'custom',
            position: { x: 100, y: 380 },
            data: { 
              label: 'Instagram API',
              description: 'Content automation and posting',
              icon: '📸',
              type: 'social'
            }
          },
          {
            id: '6',
            type: 'custom',
            position: { x: 400, y: 380 },
            data: { 
              label: 'Analytics',
              description: 'Performance tracking and optimization',
              icon: '📊',
              type: 'analytics'
            }
          },
          {
            id: '7',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { 
              label: 'Lead Generation',
              description: 'Qualified prospects and conversions',
              icon: '🎯',
              type: 'output'
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
    
    const styledNodes: Node[] = config.nodes.map((node) => ({
      ...node,
      style: {
        padding: '0',
        border: 'none',
        background: 'transparent',
        fontSize: '14px',
        fontWeight: '500'
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

  const addCustomNode = useCallback((label: string, icon: string, type: string = 'integration', category: string = 'integration') => {
    const newNode: Node = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 200 },
      data: { 
        label,
        description: `${category === 'ai' ? 'AI-powered' : 'Custom'} ${type} with advanced configuration`,
        icon,
        type,
        category
      },
      style: {
        padding: '0',
        border: 'none',
        background: 'transparent',
        fontSize: '14px',
        fontWeight: '500'
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
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-primary/10">
            <div className="text-center flex-1">
              <h3 className="text-2xl font-bold mb-2">Choose Your AI Workflow Template</h3>
              <p className="text-muted-foreground">Select an industry template to get started quickly</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(false)}
              className="ml-4"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-6">
          
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
        </div>
      )}
      
      {/* Minimized Template Selector */}
      {!showTemplates && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-3 border border-primary/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Templates Available</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(true)}
              className="h-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
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
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-3xl border-2 border-primary/20 overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.1,
            minZoom: 0.5,
            maxZoom: 1.5
          }}
          attributionPosition="bottom-left"
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          connectionLineStyle={{ 
            stroke: 'hsl(var(--primary))', 
            strokeWidth: 3,
            strokeDasharray: '8,8'
          }}
          defaultEdgeOptions={{
            animated: true,
            style: { 
              stroke: 'hsl(var(--primary))', 
              strokeWidth: 3 
            }
          }}
          className="rounded-3xl"
          proOptions={{ hideAttribution: true }}
          panOnScroll={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background 
            color="hsl(var(--muted-foreground))" 
            gap={40} 
            size={2}
            variant={BackgroundVariant.Dots}
            className="opacity-30"
          />
          
          <Controls 
            showInteractive={!isDemo}
            className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl m-2 sm:m-4 overflow-hidden"
          />
          
          {!isDemo && (
            <MiniMap 
              nodeColor="hsl(var(--primary))"
              nodeStrokeColor="hsl(var(--primary))"
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl m-2 sm:m-4 overflow-hidden hidden sm:block"
              maskColor="rgba(255,255,255,0.1)"
              pannable={true}
              zoomable={true}
            />
          )}

          {/* Enhanced Floating Action Panel */}
          {!isDemo && (
            <Panel position="top-right" className="m-2 sm:m-4">
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl space-y-4 max-w-[90vw] sm:max-w-none">
                {/* Minimized State */}
                {isQuickActionsMinimized ? (
                  <div className="p-4 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Quick Actions
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 opacity-60 hover:opacity-100"
                        onClick={() => setIsQuickActionsMinimized(false)}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Full State */
                  <div className="p-4 sm:p-6 min-w-[200px] sm:min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Quick Actions
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {nodes.length} nodes
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 opacity-60 hover:opacity-100"
                          onClick={() => setIsQuickActionsMinimized(true)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      {/* AI Actions */}
                      <div>
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
                          <Brain className="w-4 h-4 mr-2" />
                          AI Actions
                        </h5>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Text Generator', '🤖', 'text-generation', 'ai')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">AI Text Generator</span>
                            <Badge variant="secondary" className="text-xs ml-1">AI</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Sentiment Analysis', '🎭', 'sentiment', 'ai')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Sentiment Analysis</span>
                            <Badge variant="secondary" className="text-xs ml-1">AI</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Intent Recognition', '🧠', 'intent', 'ai')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Intent Recognition</span>
                            <Badge variant="secondary" className="text-xs ml-1">AI</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Voice AI', '🗣️', 'voice', 'ai')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Voice AI</span>
                            <Badge variant="secondary" className="text-xs ml-1">AI</Badge>
                          </Button>
                        </div>
                      </div>

                      {/* Triggers */}
                      <div>
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Triggers
                        </h5>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Webhook Trigger', '🔔', 'webhook', 'trigger')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Webhook Trigger</span>
                            <Badge variant="secondary" className="text-xs ml-1">TRIGGER</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Schedule Trigger', '⏰', 'schedule', 'trigger')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Schedule Trigger</span>
                            <Badge variant="secondary" className="text-xs ml-1">TRIGGER</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Form Submit', '📝', 'form', 'trigger')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Form Submit</span>
                            <Badge variant="secondary" className="text-xs ml-1">TRIGGER</Badge>
                          </Button>
                        </div>
                      </div>

                      {/* Integrations */}
                      <div>
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
                          <Layers3 className="w-4 h-4 mr-2" />
                          Integrations
                        </h5>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Zoho CRM', '🔗', 'crm', 'integration')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Zoho CRM</span>
                            <Badge variant="secondary" className="text-xs ml-1">CRM</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('WhatsApp Business', '💬', 'messaging', 'integration')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">WhatsApp Business</span>
                            <Badge variant="secondary" className="text-xs ml-1">MSG</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Gmail API', '📧', 'email', 'integration')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Gmail API</span>
                            <Badge variant="secondary" className="text-xs ml-1">EMAIL</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Google Sheets', '📊', 'storage', 'integration')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Google Sheets</span>
                            <Badge variant="secondary" className="text-xs ml-1">DATA</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Slack API', '💻', 'communication', 'integration')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Slack API</span>
                            <Badge variant="secondary" className="text-xs ml-1">TEAM</Badge>
                          </Button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
                          <GitBranch className="w-4 h-4 mr-2" />
                          Actions
                        </h5>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Send Email', '📤', 'email-send', 'action')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Send Email</span>
                            <Badge variant="secondary" className="text-xs ml-1">ACTION</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('HTTP Request', '🌐', 'http', 'action')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">HTTP Request</span>
                            <Badge variant="secondary" className="text-xs ml-1">ACTION</Badge>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start hover:shadow-lg transition-all duration-300" 
                            onClick={() => addCustomNode('Delay', '⏳', 'delay', 'action')}
                          >
                            <Plus className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left truncate">Delay</span>
                            <Badge variant="secondary" className="text-xs ml-1">ACTION</Badge>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4 space-y-2">
                        <h5 className="text-sm font-semibold text-muted-foreground mb-2">Workflow Tools</h5>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            // Simulate workflow configuration
                            alert('Opening workflow configuration panel...');
                          }}
                        >
                          <Settings className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="truncate">Configure Workflow</span>
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            // Simulate code export
                            const workflowCode = `// Generated workflow code
const workflow = {
  nodes: ${JSON.stringify(nodes, null, 2)},
  edges: ${JSON.stringify(edges, null, 2)}
};`;
                            navigator.clipboard.writeText(workflowCode);
                            alert('Workflow code copied to clipboard!');
                          }}
                        >
                          <Code className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="truncate">Export to Code</span>
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            // Simulate workflow test
                            setIsConfiguring(true);
                            setDeploymentProgress(0);
                            const interval = setInterval(() => {
                              setDeploymentProgress(prev => {
                                if (prev >= 100) {
                                  clearInterval(interval);
                                  setTimeout(() => {
                                    setIsConfiguring(false);
                                    alert('Workflow test completed successfully!');
                                  }, 500);
                                  return 100;
                                }
                                return prev + 20;
                              });
                            }, 300);
                          }}
                        >
                          <Play className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="truncate">Test Workflow</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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