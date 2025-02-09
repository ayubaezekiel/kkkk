import { Button } from "@/components/ui/button";
import { nodeOptions } from "./tealish-nodes";
import { useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";

export function WorkflowSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: string, nodeData: any) => {
      event.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify({
          type: "workflow",
          data: {
            label: nodeData.label,
            icon: nodeData.icon.name,
            code: nodeData.code,
            type: nodeType,
          },
        })
      );
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  return (
    <div
      className={`border-r border-zinc-800 flex flex-col overflow-hidden transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-[48px]"
      }`}
    >
      <div className="flex items-center justify-between p-2 border-b border-zinc-800">
        {isSidebarOpen && (
          <h2 className="text-sm font-medium text-zinc-400">Workflow Nodes</h2>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 hover:bg-zinc-800 rounded transition-colors ml-auto"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 p-2 overflow-y-auto">
        {nodeOptions.map((option) => (
          <div
            key={option.type}
            className="cursor-grab rounded-lg transition-colors hover:bg-zinc-800/50"
            draggable
            onDragStart={(e) =>
              onDragStart(e, option.type, {
                label: option.label,
                icon: option.icon,
                code: option.defaultCode,
              })
            }
          >
            <div className="p-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1 rounded bg-zinc-800">
                  <option.icon className="h-4 w-4 text-zinc-300" />
                </div>
                {isSidebarOpen && (
                  <span className="text-sm font-medium text-zinc-200">
                    {option.label}
                  </span>
                )}
              </div>
              {isSidebarOpen && (
                <p className="text-xs text-zinc-500 pl-7">
                  {getNodeDescription(option.type)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getNodeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    state_variable: "Define contract state variables and constants",
    method: "Create contract methods and functions",
    condition: "Add conditional logic and branching",
    loop: "Implement loops and iterations",
    operation: "Perform mathematical or logical operations",
    asset_transfer: "Handle asset transfers between accounts",
    contract_call: "Make calls to other smart contracts",
    payment: "Process payments and transactions",
    configuration: "Set up contract configuration and parameters",
  };

  return descriptions[type] || "No description available";
}
