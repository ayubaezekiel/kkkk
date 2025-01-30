import { Button } from "@/components/ui/button";

export function TrialBanner() {
  return (
    <div className="flex items-center justify-between bg-zinc-900 px-4 py-1.5 text-xs text-zinc-400 border-b border-zinc-800">
      <div className="flex items-center space-x-2">
        <span>You need atleast 1000 TealGen Token to continue</span>
        <span className="text-zinc-600">•</span>
        <span>Balance: 250</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="default"
          className="h-6 px-3 text-xs text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Buy Token
        </Button>
        <Button
          size="sm"
          variant="default"
          className="h-6 px-3 text-xs text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
