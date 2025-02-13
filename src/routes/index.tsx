import Dashboard from "@/components/dashboard";
import { Callout, Heading, IconButton, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-40" />
      <Callout.Root
        color="blue"
        style={{
          position: "fixed",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
        className="z-50 flex max-w-md max-h-28"
      >
        <Callout.Icon>
          <IconButton color="blue" variant="ghost" radius="full">
            <TriangleAlert />
          </IconButton>
        </Callout.Icon>
        <Callout.Text color="blue">
          <Heading className="mb-4">Under Development</Heading>
          <Text>
            This page is currently under development. Please check back later or
            stay tuned with any of our socials.
          </Text>
        </Callout.Text>
      </Callout.Root>
      <Dashboard />
    </>
  );
}
