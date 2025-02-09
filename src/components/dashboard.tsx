import { SidebarProvider } from "./sidebar-context";
import { TrialBanner } from "./trial-banner";
import { TriggerSidebarProvider } from "./trigger-sidebar-context";
import { WorkflowCanvas } from "./workflow-canvas";
import { WorkflowHeader } from "./workflow-header";
import { WorkflowSidebar } from "./workflow-sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-zinc-100">
      <TrialBanner />
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          {/* <WorkflowSidebar /> */}
          <TriggerSidebarProvider>
            <main className="flex-1 flex flex-col overflow-hidden">
              <WorkflowHeader />
              <div className="flex-1 flex overflow-auto">
                <WorkflowCanvas />
              </div>
            </main>
          </TriggerSidebarProvider>
        </SidebarProvider>
      </div>
    </div>
  );
}
