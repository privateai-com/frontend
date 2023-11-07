import { DataSet } from 'vis-data';
import { OptId } from 'vis-data/declarations/data-interface';

import {
  DatasetEdgeType,
  DatasetNodeType,
  EdgeType,
} from 'containers/StorageFile/types';
import { GraphResponseType } from 'types';

const initial = {
  nodes: new DataSet(),
  edges: new DataSet(),
} as { nodes: DatasetNodeType, edges: DatasetEdgeType };

export const transformDataToNodesAndEdges = (data: GraphResponseType[]) => {
  if (!data || data?.length === 0) {
    return initial;
  }

  const isStructureValid = data.every((obj) => 
    typeof obj === 'object' &&
    Object.prototype.hasOwnProperty.call(obj, 'subject') &&
    Object.prototype.hasOwnProperty.call(obj, 'verb') &&
    Object.prototype.hasOwnProperty.call(obj, 'object') &&
    Object.prototype.hasOwnProperty.call(obj, 'uncertainty') &&
    Object.prototype.hasOwnProperty.call(obj, 'comment'));

  if (!isStructureValid) {
    return initial;
  }

  const nodes = new DataSet<Partial<Record<'id', OptId> & { label: string }>>();
  const uniqueNodes = new Set<string>();
  const uniqueEdges: { [key: string]: boolean } = {};
  const edgesData: Record<'id', OptId>[] & Partial<EdgeType>[] = [];

  data.forEach((item) => {
    const headNodeId = item.subject?.replace(/\n/g, '');
    const tailNodeId = item.object?.replace(/\n/g, '');

    if (!uniqueNodes.has(headNodeId)) {
      uniqueNodes.add(headNodeId);
      nodes.add({ id: headNodeId, label: item.subject?.replace(/\n/g, '') });
    }

    if (!uniqueNodes.has(tailNodeId)) {
      uniqueNodes.add(tailNodeId);
      nodes.add({ id: tailNodeId, label: item.object?.replace(/\n/g, '') });
    }

    const edgeKey = `${headNodeId}-${tailNodeId}`;

    if (!uniqueEdges[edgeKey]) {
      edgesData.push({
        from: headNodeId,
        to: tailNodeId,
        label: item.verb.replace(/\n/g, ''),
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
          subject: headNode.label,
          object: tailNode.label,
          verb: edge.label,
          uncertainty: 0,
          comment: '',
        };
        
        data.push(item);
      }
    });

    return data;
  };
