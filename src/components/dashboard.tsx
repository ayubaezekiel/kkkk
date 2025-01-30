import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrialBanner } from "./trial-banner";
import { defaultNavItems, SidebarNav } from "./sidebar-nav";
import { TriggerSidebarProvider } from "./trigger-sidebar-context";
import { WorkflowHeader } from "./workflow-header";
import { WorkflowCanvas } from "./workflow-canvas";
import { TriggerSidebar } from "./trigger-sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-zinc-100">
      <TrialBanner />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900">
          <div className="p-4 mb-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-30%20at%2017-58-15%20Workflow%20Automation%20-%20n8n-47ucCpeaEIzq5Pi0X8QZlnsKLru0S5.png"
              alt="n8n Logo"
              className="h-8"
            />
          </div>
          <SidebarNav items={defaultNavItems} />
        </aside>
        <TriggerSidebarProvider>
          <main className="flex-1 flex flex-col overflow-hidden">
            <WorkflowHeader />
            <Tabs defaultValue="editor" className="flex-1 flex flex-col">
              <TabsList className="bg-zinc-900 border-b border-zinc-800 rounded-none h-10 px-4">
                <TabsTrigger
                  value="editor"
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800"
                >
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="executions"
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800"
                >
                  Executions
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="editor"
                className="flex-1 p-0 m-0 data-[state=active]:flex"
              >
                <WorkflowCanvas />
                <TriggerSidebar />
              </TabsContent>
              <TabsContent
                value="executions"
                className="data-[state=active]:flex-1"
              >
                <div className="p-4">Executions content</div>
              </TabsContent>
            </Tabs>
          </main>
        </TriggerSidebarProvider>
      </div>
    </div>
  );
}
