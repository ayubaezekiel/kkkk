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
    title: "Trigger manually",
    description:
      "Runs the flow on clicking a button in n8n. Good for getting started quickly",
  },
  {
    icon: AppWindow,
    title: "On app event",
    description:
      "Runs the flow when something happens in an app like Telegram, Notion or Airtable",
    hasSubmenu: true,
  },
  {
    icon: Clock,
    title: "On a schedule",
    description: "Runs the flow every day, hour, or custom interval",
  },
  {
    icon: Webhook,
    title: "On webhook call",
    description: "Runs the flow on receiving an HTTP request",
  },
  {
    icon: FormInput,
    title: "On form submission",
    description:
      "Generate webforms in n8n and pass their responses to the workflow",
  },
  {
    icon: GitFork,
    title: "When called by another workflow",
    description:
      "Runs the flow when called by the Execute Workflow node from a different workflow",
  },
  {
    icon: MessageSquare,
    title: "On chat message",
    description:
      "Runs the flow when a user sends a chat message. For use with AI nodes",
  },
  {
    icon: MoreHorizontal,
    title: "Other ways...",
    description: "Runs the flow on workflow errors, file changes, etc.",
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
