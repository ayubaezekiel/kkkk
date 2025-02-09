import {
  Calculator,
  Database,
  DollarSign,
  FunctionSquare,
  GitBranch,
  Link,
  Repeat,
  Send,
  Settings,
} from "lucide-react";

export const TEALISH_NODE_TYPES = {
  STATE_VARIABLE: "state_variable",
  METHOD: "method",
  CONDITION: "condition",
  LOOP: "loop",
  OPERATION: "operation",
  ASSET_TRANSFER: "asset_transfer",
  CONTRACT_CALL: "contract_call",
  PAYMENT: "payment",
  CONFIGURATION: "configuration",
} as const;

export const nodeOptions = [
  {
    type: TEALISH_NODE_TYPES.STATE_VARIABLE,
    label: "State Variable",
    icon: Database,
    defaultCode: "const myVariable: uint64",
  },
  {
    type: TEALISH_NODE_TYPES.METHOD,
    label: "Method",
    icon: FunctionSquare,
    defaultCode: "public myMethod(arg: bytes) {\n    // Method logic\n}",
  },
  {
    type: TEALISH_NODE_TYPES.CONDITION,
    label: "If Condition",
    icon: GitBranch,
    defaultCode: "if (condition) {\n    // If logic\n}",
  },
  {
    type: TEALISH_NODE_TYPES.LOOP,
    label: "Loop",
    icon: Repeat,
    defaultCode: "while (condition) {\n    // Loop logic\n}",
  },
  {
    type: TEALISH_NODE_TYPES.OPERATION,
    label: "Operation",
    icon: Calculator,
    defaultCode: "let result = a + b",
  },
  {
    type: TEALISH_NODE_TYPES.ASSET_TRANSFER,
    label: "Asset Transfer",
    icon: Send,
    defaultCode: "transfer(amount).of(assetId).to(receiver)",
  },
  {
    type: TEALISH_NODE_TYPES.CONTRACT_CALL,
    label: "Contract Call",
    icon: Link,
    defaultCode: 'call(appId).method("methodName")',
  },
  {
    type: TEALISH_NODE_TYPES.PAYMENT,
    label: "Payment",
    icon: DollarSign,
    defaultCode: "pay(amount).to(receiver)",
  },
  {
    type: TEALISH_NODE_TYPES.CONFIGURATION,
    label: "Configuration",
    icon: Settings,
    defaultCode: "// Configuration settings",
  },
];
