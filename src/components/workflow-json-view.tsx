import { useState } from "react";
import type { Node, Edge } from "reactflow";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

interface WorkflowJsonViewProps {
  nodes: Node[];
  edges: Edge[];
}

export function WorkflowJsonView({ nodes, edges }: WorkflowJsonViewProps) {
  const [copied, setCopied] = useState(false);

  const workflow = {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  };

  const jsonString = JSON.stringify(workflow, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col overflow-auto bg-zinc-900">
      <div className="flex h-12 items-center justify-between border-b border-zinc-800 px-4">
        <h2 className="text-sm font-medium text-zinc-100">Workflow JSON</h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy JSON"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-4 p-4">
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-400">Nodes</h3>
            <pre className="rounded-lg bg-zinc-800 p-4">
              <code className="text-xs text-zinc-100">
                {JSON.stringify(workflow.nodes, null, 2)}
              </code>
            </pre>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-400">Edges</h3>
            <pre className="rounded-lg bg-zinc-800 p-4">
              <code className="text-xs text-zinc-100">
                {JSON.stringify(workflow.edges, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
