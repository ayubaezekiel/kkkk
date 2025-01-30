"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTriggerSidebar } from "./trigger-sidebar-context";

export function WorkflowCanvas() {
  const { setIsOpen } = useTriggerSidebar();

  return (
    <div className="relative flex-1 bg-zinc-900 overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(82 82 82 / 0.25) 1px, transparent 0)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "-1px -1px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-32 w-32 border-2 border-dashed border-zinc-700 bg-transparent hover:bg-zinc-800/50 flex flex-col gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-8 w-8 text-zinc-500" />
          <span className="text-xs text-zinc-500">Add first step...</span>
        </Button>
      </div>
    </div>
  );
}
