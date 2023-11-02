import { DataSet } from 'vis-data';

import {
  DatasetEdgeType,
  DatasetNodeType,
  EdgeType,
  GraphResponseType, 
} from 'containers/StorageFile/types';
import { OptId } from 'vis-data/declarations/data-interface';

export const transformDataToNodesAndEdges = (data: GraphResponseType[]) => {
  if (!data?.length) {
    return {
      nodes: new DataSet(),
      edges: new DataSet(),
    } as { nodes: DatasetNodeType, edges: DatasetEdgeType };
  }

  const nodes = new DataSet<Partial<Record<'id', OptId> & { label: string }>>();
  const uniqueNodes = new Set<string>();
  const uniqueEdges: { [key: string]: boolean } = {};
  const edgesData: Record<'id', OptId>[] & Partial<EdgeType>[] = [];

  data.forEach((item) => {
    const headNodeId = item.head;
    const tailNodeId = item.tail;

    if (!uniqueNodes.has(headNodeId)) {
      uniqueNodes.add(headNodeId);
      nodes.add({ id: headNodeId, label: item.head });
    }

    if (!uniqueNodes.has(tailNodeId)) {
      uniqueNodes.add(tailNodeId);
      nodes.add({ id: tailNodeId, label: item.tail });
    }

    const edgeKey = `${headNodeId}-${tailNodeId}`;

    if (!uniqueEdges[edgeKey]) {
      edgesData.push({
        from: headNodeId,
        to: tailNodeId,
        label: item.type,
      });
      uniqueEdges[edgeKey] = true;
    }
  });

  const edges = new DataSet(edgesData);

  return { nodes, edges } as { nodes: DatasetNodeType, edges: DatasetEdgeType };
};

export const transformNodesAndEdgesToData =
  (nodes: DatasetNodeType, edges: DatasetEdgeType) => {
    const data: GraphResponseType[] = [];

    edges.forEach((edge) => {
      const headNode = nodes.get(edge.from);
      const tailNode = nodes.get(edge.to);

      if (headNode && tailNode) {
        const item = {
          head: headNode.label,
          tail: tailNode.label,
          type: edge.label || '',
          meta: {
            spans: [
              [0, 0],
            ],
          },
        };
        
        data.push(item);
      }
    });

    return data;
  };
