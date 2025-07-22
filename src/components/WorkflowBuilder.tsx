import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  Phone, 
  Mail, 
  Workflow, 
  Database,
  Zap,
  Bot,
  Play,
  Plus,
  Settings,
  CheckCircle2
} from 'lucide-react';

// Custom Node Components
const TriggerNode = ({ data }: { data: any }) => (
  <div className="bg-gradient-primary text-white rounded-xl p-4 min-w-[160px] shadow-glow border-2 border-primary-glow">
    <div className="flex items-center space-x-2 mb-2">
      <Zap className="w-5 h-5" />
      <span className="font-semibold">Trigger</span>
    </div>
    <p className="text-sm opacity-90">{data.label}</p>
    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary" />
  </div>
);

const AINode = ({ data }: { data: any }) => (
  <div className="bg-gradient-secondary text-white rounded-xl p-4 min-w-[180px] shadow-glow border-2 border-secondary-glow">
    <div className="flex items-center space-x-2 mb-2">
      <Brain className="w-5 h-5" />
      <span className="font-semibold">AI Processing</span>
    </div>
    <p className="text-sm opacity-90">{data.label}</p>
    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-secondary" />
    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-secondary" />
  </div>
);

const ActionNode = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-r from-accent to-accent-glow text-white rounded-xl p-4 min-w-[160px] shadow-glow border-2 border-accent-glow">
    <div className="flex items-center space-x-2 mb-2">
      {data.type === 'message' && <MessageSquare className="w-5 h-5" />}
      {data.type === 'call' && <Phone className="w-5 h-5" />}
      {data.type === 'email' && <Mail className="w-5 h-5" />}
      {data.type === 'database' && <Database className="w-5 h-5" />}
      <span className="font-semibold">Action</span>
    </div>
    <p className="text-sm opacity-90">{data.label}</p>
    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-accent" />
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  ai: AINode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 50, y: 100 },
    data: { label: 'New WhatsApp Message' },
  },
  {
    id: '2',
    type: 'ai',
    position: { x: 300, y: 100 },
    data: { label: 'Analyze Intent & Extract Info' },
  },
  {
    id: '3',
    type: 'ai',
    position: { x: 580, y: 50 },
    data: { label: 'Lead Qualification' },
  },
  {
    id: '4',
    type: 'action',
    position: { x: 850, y: 50 },
    data: { label: 'Send to CRM', type: 'database' },
  },
  {
    id: '5',
    type: 'action',
    position: { x: 850, y: 150 },
    data: { label: 'Send Follow-up Message', type: 'message' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#8B5CF6', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#06B6D4', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    label: 'Qualified Lead',
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 },
    label: 'Needs More Info',
  },
];

interface WorkflowBuilderProps {
  isDemo?: boolean;
  onComplete?: () => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ isDemo = false, onComplete }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPlaying, setIsPlaying] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const playWorkflow = () => {
    setIsPlaying(true);
    // Simulate workflow execution
    setTimeout(() => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    }, 3000);
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type,
      position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 100 },
      data: { 
        label: type === 'trigger' ? 'New Trigger' : 
               type === 'ai' ? 'AI Process' : 
               'New Action',
        type: type === 'action' ? 'message' : undefined
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-[500px] w-full bg-background border border-border rounded-xl overflow-hidden shadow-ai">
      {/* Toolbar */}
      <div className="bg-gradient-ai backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-foreground">Real Estate Lead Qualification Bot</h3>
            {isDemo && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Interactive Demo</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!isDemo && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('trigger')}
                  className="flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Trigger</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('ai')}
                  className="flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>AI</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('action')}
                  className="flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Action</span>
                </Button>
              </>
            )}
            
            <Button 
              variant={isPlaying ? "outline" : "cta"} 
              size="sm" 
              onClick={playWorkflow}
              disabled={isPlaying}
              className="flex items-center space-x-1"
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Test Run</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted/20"
      >
        <Controls className="bg-background border border-border rounded-lg" />
        <MiniMap 
          className="bg-background border border-border rounded-lg"
          nodeColor="#8B5CF6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Background color="#ddd" gap={20} size={1} />
      </ReactFlow>

      {/* Status Overlay when Playing */}
      {isPlaying && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-primary text-white rounded-xl p-6 text-center shadow-glow">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Workflow Executing...</h4>
            <p className="text-sm opacity-90">Processing lead through AI pipeline</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;