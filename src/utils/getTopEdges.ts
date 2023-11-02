import { EdgeType, NodeType } from 'containers/StorageFile/types';

export const getTopEdges = (edges: EdgeType[], nodes: NodeType[], topCount = 5) => {
  const edgeCounts = new Map<string, number>();

  edges.forEach((edge) => {
    const edgeId = `${edge.from}-${edge.to}`;
    const count = edgeCounts.get(edgeId) || 0;
    edgeCounts.set(edgeId, count + 1);
  });

  const nodeLabels = new Map<string, { label: string, count: number }>();

  nodes.forEach((node) => {
    const nodeId = node.id;
    const label = node.label || '';
    const count = edges.reduce((total, edge) => {
      if (edge.from === nodeId || edge.to === nodeId) {
        return total + (edgeCounts.get(`${edge.from}-${edge.to}`) || 0);
      }
      return total;
    }, 0);
    nodeLabels.set(nodeId.toString(), { label, count });
  });

  const sortedNodes = [...nodeLabels.entries()].sort((a, b) => b[1].count - a[1].count);
  const topNodes = sortedNodes.slice(0, topCount).map(([nodeId, { label, count }]) => ({
    id: nodeId,
    label,
    count,
  }));
  return topNodes;
};
