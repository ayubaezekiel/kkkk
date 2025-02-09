"use client";

import {
  Search,
  MousePointer2,
  AppWindow,
  Clock,
  Webhook,
  FormInput,
  GitFork,
  MessageSquare,
  MoreHorizontal,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
} from "lucide-react";
import type React from "react"; // Import React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

interface TriggerOption {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  hasSubmenu?: boolean;
}

const triggerOptions: TriggerOption[] = [
  {
    icon: MousePointer2,
    title: "Create Smart Contract",
    description:
      "Deploy a new smart contract to the blockchain with customizable parameters",
  },
  {
    icon: AppWindow,
    title: "Asset Management",
    description:
      "Handle asset creation, transfer, opt-in, and opt-out operations",
    hasSubmenu: true,
  },
  {
    icon: Clock,
    title: "Time-locked Operations",
    description: "Schedule contract operations with time-based conditions",
  },
  {
    icon: Webhook,
    title: "Contract Interactions",
    description: "Execute specific contract methods and handle state changes",
  },
  {
    icon: FormInput,
    title: "Contract Parameters",
    description:
      "Configure and modify contract parameters, state variables, and access controls",
  },
  {
    icon: GitFork,
    title: "Multi-signature Operations",
    description:
      "Handle multi-party transactions and approval workflows for contract operations",
  },
  {
    icon: MessageSquare,
    title: "Event Monitoring",
    description:
      "Track and respond to contract events, state changes, and transaction confirmations",
  },
  {
    icon: MoreHorizontal,
    title: "Advanced Operations",
    description:
      "Handle upgrades, emergency stops, and complex contract interactions",
    hasSubmenu: true,
  },
];

export function WorkflowSidebar() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300",
        isCollapsed ? "w-16" : "w-80"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-30%20at%2017-58-15%20Workflow%20Automation%20-%20n8n-47ucCpeaEIzq5Pi0X8QZlnsKLru0S5.png"
          alt="n8n Logo"
          className="h-8"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-zinc-800"
          onClick={toggle}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div
        className={cn("flex-col gap-4 p-4", isCollapsed ? "hidden" : "flex")}
      >
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search nodes..."
            className="pl-8 bg-zinc-800/50 border-zinc-700 h-9 text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {triggerOptions.map((option, i) => (
            <Button
              key={i}
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-zinc-800",
                isCollapsed ? "h-10 px-2" : "px-3 py-4 h-auto text-left"
              )}
            >
              <div
                className={cn(
                  "flex gap-3",
                  isCollapsed && "flex-col items-center gap-1"
                )}
              >
                <option.icon
                  className={cn(
                    "text-zinc-400 shrink-0",
                    isCollapsed ? "h-4 w-4" : "h-5 w-5 mt-0.5"
                  )}
                />
                {!isCollapsed && (
                  <div className="space-y-1 min-w-0 max-w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {option.title}
                      </span>
                      {option.hasSubmenu && (
                        <ChevronRight className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 font-normal break-words whitespace-normal overflow-wrap-anywhere">
                      {option.description}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 border-t border-zinc-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full gap-2 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10",
            isCollapsed ? "justify-center px-2" : "justify-start px-4"
          )}
        >
          <Sparkles className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Ask AI</span>}
        </Button>
      </div>
    </aside>
  );
}
