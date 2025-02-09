import { Node, Edge } from "reactflow";
import { TEALISH_NODE_TYPES } from "./tealish-nodes";

interface TealishNode extends Node {
  data: {
    type: keyof typeof TEALISH_NODE_TYPES;
    label: string;
    code: string;
  };
}

export function generateTealishCode(
  nodes: TealishNode[],
  edges: Edge[]
): string {
  // Basic Tealish contract structure
  let code = `#pragma version 8

contract WorkflowContract {
    // State variables
    const CREATOR = Global.CreatorAddress
`;

  // Generate state variables first
  const stateVariables = nodes.filter(
    (node) => node.data.type === TEALISH_NODE_TYPES.STATE_VARIABLE
  );

  if (stateVariables.length > 0) {
    code += "\n    // State Variables\n";
    stateVariables.forEach((node) => {
      code += `    ${node.data.code}\n`;
    });
  }

  // Generate methods and their implementation
  const methods = nodes.filter(
    (node) => node.data.type === TEALISH_NODE_TYPES.METHOD
  );

  methods.forEach((method) => {
    code += `\n    ${method.data.code}\n`;

    // Find all nodes connected to this method
    const connectedNodes = findConnectedNodes(method.id, nodes, edges);
    const sortedNodes = sortNodesByExecution(connectedNodes, edges);

    sortedNodes.forEach((node) => {
      // Indent the code properly
      const indentedCode = node.data.code
        .split("\n")
        .map((line) => `        ${line}`)
        .join("\n");
      code += `${indentedCode}\n`;
    });
  });

  // Close the contract
  code += `}`;

  return code;
}

function findConnectedNodes(
  startNodeId: string,
  nodes: TealishNode[],
  edges: Edge[]
): TealishNode[] {
  const connected: TealishNode[] = [];
  const visited = new Set<string>();

  function traverse(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (node) connected.push(node);

    edges
      .filter((edge) => edge.source === nodeId)
      .forEach((edge) => traverse(edge.target));
  }

  traverse(startNodeId);
  return connected;
}

function sortNodesByExecution(
  nodes: TealishNode[],
  edges: Edge[]
): TealishNode[] {
  // Implement topological sort for proper execution order
  // This is a simplified version
  return nodes.sort((a, b) => {
    const aIncoming = edges.filter((e) => e.target === a.id).length;
    const bIncoming = edges.filter((e) => e.target === b.id).length;
    return aIncoming - bIncoming;
  });
}
