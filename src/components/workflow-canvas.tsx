import { Button } from "@/components/ui/button";
import { ReactNode } from "@tanstack/react-router";
import { AlertTriangle, Link, Plus, Send, Trash2, Webhook } from "lucide-react";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  type Connection,
  ConnectionLineType,
  Controls,
  type Edge,
  MarkerType,
  type Node,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { WorkflowJsonView } from "./workflow-json-view";
import { WorkflowNode } from "./workflow/workflow-node";

const nodeTypes = {
  workflow: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "workflow",
    position: { x: 250, y: 200 },
    data: {
      label: "Webhook",
      icon: Webhook,
      isWebhook: true,
    },
  },
  {
    id: "2",
    type: "workflow",
    position: { x: 450, y: 200 },
    data: {
      label: "Create URL string",
      icon: Link,
    },
  },
  {
    id: "3",
    type: "workflow",
    position: { x: 650, y: 200 },
    data: {
      label: "Respond to Webhook",
      icon: Send,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const nodeOptions = [
  { type: "webhook", label: "Webhook", icon: Webhook },
  { type: "url", label: "Create URL", icon: Link },
  { type: "response", label: "Response", icon: Send },
];

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setEdges]
  );

  const addNode = useCallback(
    (type: string, label: string, icon: ReactNode) => {
      const position = project({ x: 100, y: 100 });
      const newNode: Node = {
        id: `node-${nodes.length + 1}`,
        type: "workflow",
        position,
        data: {
          label,
          icon,
          isWebhook: type === "webhook",
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes.length, project, setNodes]
  );

  const deleteSelectedNodes = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) =>
      eds.filter((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        return !(sourceNode?.selected || targetNode?.selected);
      })
    );
  }, [nodes, setNodes, setEdges]);

  // Handle keyboard shortcuts
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        !((event.target as HTMLElement)?.nodeName === "INPUT")
      ) {
        deleteSelectedNodes();
      }
    },
    [deleteSelectedNodes]
  );

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="flex flex-1 overflow-auto">
      <div className="relative flex-1 bg-zinc-900">
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          {nodeOptions.map((option) => (
            <Button
              key={option.type}
              size="sm"
              variant="ghost"
              className="h-8 gap-2 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
              onClick={() => addNode(option.type, option.label, option.icon)}
            >
              <Plus className="h-4 w-4" />
              <option.icon className="h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>

        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-2 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
            onClick={deleteSelectedNodes}
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 gap-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-400"
          >
            <AlertTriangle className="h-4 w-4" />
            Test workflow
          </Button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.2}
          maxZoom={4}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background color="rgb(82 82 82 / 0.25)" size={24} gap={24} />
          <Controls
            className="!bottom-4 !left-4 !top-auto"
            showInteractive={false}
          />
        </ReactFlow>
      </div>

      <div className="w-[500px] border-l border-zinc-800 flex flex-col overflow-auto">
        <WorkflowJsonView nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
