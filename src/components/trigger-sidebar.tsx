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
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useTriggerSidebar } from "./trigger-sidebar-context";
import { cn } from "@/lib/utils";
import type React from "react"; // Added import for React

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

export function TriggerSidebar() {
  const { isOpen, setIsOpen } = useTriggerSidebar();

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 flex flex-col transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{
        // Adjust top position to account for the header height
        top: "calc(30px + 56px + 40px)", // trial banner + workflow header + tabs
      }}
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-lg font-medium">What triggers this workflow?</h2>
          <p className="text-sm text-zinc-400">
            A trigger is a step that starts your workflow
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-zinc-800"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search nodes..."
            className="pl-8 bg-zinc-800/50 border-zinc-700 h-9 text-sm"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {triggerOptions.map((option, i) => (
            <Button
              key={i}
              variant="ghost"
              className="w-full justify-start px-4 py-6 h-auto text-left space-y-1 hover:bg-zinc-800"
            >
              <div className="flex gap-3">
                <option.icon className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.title}</span>
                    {option.hasSubmenu && (
                      <ChevronRight className="h-4 w-4 text-zinc-600" />
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 font-normal">
                    {option.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 border-t border-zinc-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
        >
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </Button>
      </div>
    </div>
  );
}
