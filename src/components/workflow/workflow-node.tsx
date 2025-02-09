import { Handle, Position } from "reactflow";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface WorkflowNodeProps {
  data: {
    label: string;
    icon: string | LucideIcon;
    isWebhook?: boolean;
    type?: string;
  };
}

export function WorkflowNode({ data }: WorkflowNodeProps) {
  let IconToRender: LucideIcon | null = null;

  if (typeof data.icon === "string") {
    IconToRender = (Icons as any)[data.icon];
  } else {
    IconToRender = data.icon as LucideIcon;
  }

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
          {IconToRender && <IconToRender className="h-5 w-5 text-zinc-100" />}
        </div>
        <span className="absolute -bottom-5 text-[10px] text-zinc-400 max-w-[80px] text-center truncate">
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
