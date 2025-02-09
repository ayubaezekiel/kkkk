import { Button } from "@/components/ui/button";
import { ReactNode } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
import { generateTealishCode } from "./workflow/tealish-generator";
import { nodeOptions } from "./workflow/tealish-nodes";
import { WorkflowNode } from "./workflow/workflow-node";
import { WorkflowSidebar } from "./workflow/workflow-sidebar";

const nodeTypes = {
  workflow: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "workflow",
    position: { x: 250, y: 200 },
    data: {
      label: nodeOptions[0].label,
      icon: nodeOptions[0].icon,
      type: nodeOptions[0].type,
      code: nodeOptions[0].defaultCode,
      isWebhook: false,
    },
  },
  {
    id: "2",
    type: "workflow",
    position: { x: 450, y: 200 },
    data: {
      label: nodeOptions[1].label,
      icon: nodeOptions[1].icon,
      type: nodeOptions[1].type,
      code: nodeOptions[1].defaultCode,
    },
  },
  {
    id: "3",
    type: "workflow",
    position: { x: 650, y: 200 },
    data: {
      label: nodeOptions[4].label,
      icon: nodeOptions[4].icon,
      type: nodeOptions[4].type,
      code: nodeOptions[4].defaultCode,
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

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const [generatedCode, setGeneratedCode] = useState("");
  const [isJsonPaneOpen, setIsJsonPaneOpen] = useState(true);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setEdges]
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

  // Add this effect to update code when nodes or edges change
  useEffect(() => {
    const code = generateTealishCode(nodes, edges);
    setGeneratedCode(code);
  }, [nodes, edges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = document
        .querySelector(".react-flow-wrapper")
        ?.getBoundingClientRect();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (!reactFlowBounds) return;

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Updated node creation to properly handle icon
      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: "workflow",
        position,
        data: {
          label: data.data.label,
          icon: data.data.icon,
          type: data.data.type,
          code: data.data.code,
          isWebhook: data.data.isWebhook || false, // Add isWebhook support
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [project, nodes.length, setNodes]
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <WorkflowSidebar />

      <div className="relative flex-1 bg-zinc-900">
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
          onDragOver={onDragOver}
          onDrop={onDrop}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.2}
          maxZoom={4}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          connectionLineType={ConnectionLineType.SmoothStep}
          className="react-flow-wrapper"
        >
          <Background color="rgb(82 82 82 / 0.25)" size={2} gap={10} />

          <Controls
            className="!bottom-4 !left-4 !top-auto"
            showInteractive={false}
          />
        </ReactFlow>
      </div>

      <div
        className={`border-l border-zinc-800 flex flex-col overflow-auto transition-all duration-300 ${
          isJsonPaneOpen ? "w-[500px]" : "w-[30px]"
        }`}
      >
        <button
          onClick={() => setIsJsonPaneOpen(!isJsonPaneOpen)}
          className="p-2 hover:bg-zinc-800 transition-colors"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isJsonPaneOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isJsonPaneOpen && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Generated Tealish Code
            </h3>
            <pre className="bg-zinc-900 p-4 rounded-md text-sm font-mono text-zinc-100 overflow-auto">
              {generatedCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
