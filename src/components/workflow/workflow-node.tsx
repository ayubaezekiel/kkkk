import { Handle, Position } from "reactflow";

interface WorkflowNodeProps {
  data: {
    label: string;
    icon: string;
    isWebhook?: boolean;
  };
}

export function WorkflowNode({ data }: WorkflowNodeProps) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-800 shadow-lg border border-zinc-700">
      {data.isWebhook && (
        <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-orange-500 shadow-lg" />
      )}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-blue-500 !border-blue-700 !w-3 !h-3"
      />
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-700">
          <img
            src={data.icon || "/placeholder.svg"}
            alt=""
            className="h-5 w-5"
          />
        </div>
        <span className="absolute -bottom-6 text-xs text-zinc-400">
          {data.label}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500 !border-blue-700 !w-3 !h-3"
      />
    </div>
  );
}
