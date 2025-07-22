import React, { useCallback, useState } from 'react';
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
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
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
  CheckCircle2
} from 'lucide-react';

interface WorkflowBuilderProps {
  isDemo?: boolean;
  industry?: string;
  onComplete?: () => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ isDemo = true, industry = 'general', onComplete }) => {
  const getIndustryNodes = (industryType: string) => {
    const nodeConfigs = {
      banking: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 5 },
            data: { 
              label: 'Loan Application',
              description: 'Customer submits loan application with documents'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 120 },
            data: { 
              label: 'Document Analysis',
              description: 'AI processes income statements, credit history, and KYC'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 240 },
            data: { 
              label: 'Credit Check',
              description: 'Automated credit score verification and risk assessment'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 240 },
            data: { 
              label: 'Pre-approval',
              description: 'AI generates loan terms and approval conditions'
            }
          },
          {
            id: '5',
            type: 'output',
            position: { x: 250, y: 360 },
            data: { 
              label: 'Customer Notification',
              description: 'Automated approval/rejection with next steps'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Process' },
          { id: 'e2-3', source: '2', target: '3', label: 'Verify' },
          { id: 'e2-4', source: '2', target: '4', label: 'Qualify' },
          { id: 'e3-5', source: '3', target: '5', label: 'Decline' },
          { id: 'e4-5', source: '4', target: '5', label: 'Approve' }
        ]
      },
      ecommerce: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 5 },
            data: { 
              label: 'Cart Abandonment',
              description: 'Customer leaves items in cart without purchasing'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 120 },
            data: { 
              label: 'Trigger Analysis',
              description: 'AI analyzes cart value, user behavior, and timing'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 240 },
            data: { 
              label: 'Email Campaign',
              description: 'Personalized email with product recommendations'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 240 },
            data: { 
              label: 'WhatsApp Outreach',
              description: 'Smart messaging with discount offer'
            }
          },
          {
            id: '5',
            type: 'output',
            position: { x: 250, y: 360 },
            data: { 
              label: 'Recovery Success',
              description: 'Customer completes purchase or receives follow-up'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Analyze' },
          { id: 'e2-3', source: '2', target: '3', label: 'High Value' },
          { id: 'e2-4', source: '2', target: '4', label: 'Mobile User' },
          { id: 'e3-5', source: '3', target: '5', label: 'Convert' },
          { id: 'e4-5', source: '4', target: '5', label: 'Recover' }
        ]
      },
      realestate: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 5 },
            data: { 
              label: 'Property Inquiry',
              description: 'Lead expresses interest in property listing'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 120 },
            data: { 
              label: 'Lead Qualification',
              description: 'AI assesses budget, timeline, and preferences'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 240 },
            data: { 
              label: 'Property Matching',
              description: 'Algorithm finds suitable properties in database'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 240 },
            data: { 
              label: 'Schedule Viewing',
              description: 'Automated booking with calendar integration'
            }
          },
          {
            id: '5',
            type: 'output',
            position: { x: 250, y: 360 },
            data: { 
              label: 'Agent Handoff',
              description: 'Qualified lead assigned to specialist agent'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Qualify' },
          { id: 'e2-3', source: '2', target: '3', label: 'Search' },
          { id: 'e2-4', source: '2', target: '4', label: 'Ready' },
          { id: 'e3-5', source: '3', target: '5', label: 'Match' },
          { id: 'e4-5', source: '4', target: '5', label: 'Book' }
        ]
      },
      general: {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 250, y: 5 },
            data: { 
              label: 'Customer Inquiry',
              description: 'Incoming customer request via chat, voice, or form'
            }
          },
          {
            id: '2',
            position: { x: 250, y: 120 },
            data: { 
              label: 'AI Analysis',
              description: 'Process intent, extract key information, and classify request'
            }
          },
          {
            id: '3',
            position: { x: 100, y: 240 },
            data: { 
              label: 'Route to Human',
              description: 'Complex requests requiring human expertise'
            }
          },
          {
            id: '4',
            position: { x: 400, y: 240 },
            data: { 
              label: 'Auto Response',
              description: 'AI generates appropriate response based on context'
            }
          },
          {
            id: '5',
            type: 'output',
            position: { x: 250, y: 360 },
            data: { 
              label: 'Customer Resolution',
              description: 'Issue resolved with follow-up tracking'
            }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2', label: 'Process' },
          { id: 'e2-3', source: '2', target: '3', label: 'Complex' },
          { id: 'e2-4', source: '2', target: '4', label: 'Simple' },
          { id: 'e3-5', source: '3', target: '5', label: 'Resolve' },
          { id: 'e4-5', source: '4', target: '5', label: 'Complete' }
        ]
      }
    };

    const config = nodeConfigs[industryType as keyof typeof nodeConfigs] || nodeConfigs.general;
    
    const styledNodes = config.nodes.map((node, index) => ({
      ...node,
      style: {
        background: index === 0 ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))' :
                   index === config.nodes.length - 1 ? 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))' :
                   'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '600',
        padding: '16px',
        minWidth: '180px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px)'
      }
    }));

    const styledEdges: Edge[] = config.edges.map(edge => ({
      ...edge,
      animated: true,
      style: { 
        stroke: 'hsl(var(--primary))', 
        strokeWidth: 3
      },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    }));

    return { nodes: styledNodes, edges: styledEdges };
  };

  const { nodes: initialNodes, edges: initialEdges } = getIndustryNodes(industry);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isBuilding, setIsBuilding] = useState(false);

  const onConnect = useCallback((params: Connection) => {
    const newEdge: Edge = {
      ...params,
      id: `${params.source}-${params.target}`,
      animated: true,
      style: { 
        stroke: 'hsl(var(--primary))', 
        strokeWidth: 3
      },
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const handleBuildWorkflow = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      onComplete?.();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">
          {isDemo ? 'Interactive Workflow Demo' : `${industry} AI Workflow Builder`}
        </h3>
        <p className="text-muted-foreground">
          {isDemo 
            ? 'See how AI agents process and route customer interactions automatically'
            : 'Drag nodes to customize your workflow. Connect blocks to create intelligent automation.'
          }
        </p>
      </div>

      <div className="h-96 bg-gradient-to-br from-background via-primary-muted/5 to-secondary-glow/5 rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
          nodesDraggable={!isDemo}
          nodesConnectable={!isDemo}
          elementsSelectable={!isDemo}
          connectionLineStyle={{ 
            stroke: 'hsl(var(--primary))', 
            strokeWidth: 3,
            strokeDasharray: '5,5'
          }}
          defaultEdgeOptions={{
            animated: true,
            style: { 
              stroke: 'hsl(var(--primary))', 
              strokeWidth: 3 
            }
          }}
          className="rounded-2xl"
          proOptions={{ hideAttribution: true }}
        >
          <Background 
            color="hsl(var(--muted-foreground))" 
            gap={24} 
            size={2}
            variant={BackgroundVariant.Dots}
            className="opacity-30"
          />
          <Controls 
            showInteractive={!isDemo}
            className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg"
          />
          {!isDemo && (
            <MiniMap 
              nodeColor="hsl(var(--primary))"
              nodeStrokeColor="hsl(var(--border))"
              className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg"
              maskColor="rgba(0,0,0,0.1)"
            />
          )}
        </ReactFlow>
      </div>

      {!isDemo && (
        <div className="mt-8 flex justify-center">
          <Button 
            variant="cta" 
            size="xl"
            onClick={handleBuildWorkflow}
            disabled={isBuilding}
            className="min-w-48 shadow-glow"
          >
            {isBuilding ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Building Workflow...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Deploy AI Workflow
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;