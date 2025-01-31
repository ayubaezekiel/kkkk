import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Theme } from "@radix-ui/themes";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Theme>
        <ReactFlowProvider>
          <RouterProvider router={router} />
        </ReactFlowProvider>
      </Theme>
    </StrictMode>
  );
}
