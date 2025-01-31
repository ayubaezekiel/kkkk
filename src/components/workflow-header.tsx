import { Select } from "@radix-ui/themes";
import { Plus, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";

export function WorkflowHeader() {
  return (
    <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-800">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
        <Input
          className="h-8 w-[200px] bg-transparent border-none focus-visible:ring-0 px-2 text-sm"
          placeholder="My workflow"
          defaultValue="My workflow"
        />
      </div>
      <div className="flex items-center gap-2">
        <Toggle
          aria-label="Toggle active state"
          className="h-8 data-[state=on]:bg-zinc-800"
        >
          Inactive
        </Toggle>
        <Button variant="outline" size="sm" className="h-8 border-zinc-700">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="default" size="sm" className="h-8">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>

        <ChooseNetwork />
      </div>
    </div>
  );
}

function ChooseNetwork() {
  return (
    <Select.Root defaultValue="TESTNET">
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="TESTNET">TestNet</Select.Item>
        <Select.Item value="MAINNET">MainNet</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
