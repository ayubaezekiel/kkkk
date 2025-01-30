import {
  Home,
  FolderGit2,
  User2,
  Settings2,
  FileText,
  Variable,
  HelpCircle,
} from "lucide-react";
import type React from "react"; // Added import for React

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-col space-y-1", // Changed to flex-col
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2 px-4 py-2 h-10 font-normal hover:bg-zinc-800", // Adjusted padding and height
            "w-full text-zinc-400 hover:text-zinc-100" // Added text colors
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export const defaultNavItems = [
  {
    title: "Overview",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Personal",
    href: "/personal",
    icon: User2,
  },
  {
    title: "Admin Panel",
    href: "/admin",
    icon: Settings2,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "Variables",
    href: "/variables",
    icon: Variable,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];
