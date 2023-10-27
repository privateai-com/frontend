import { DataSet } from 'vis-data';

import { DatasetEdgeType, DatasetNodeType, GraphResponseType } from 'containers/StorageFile/types';
import { OptId } from 'vis-data/declarations/data-interface';

export const transformDataToNodesAndEdges = (data: GraphResponseType[]) => {
  const nodes = new DataSet(
    data.map((item, index) => ({
      id: index + 1,
      label: item.head,
      type: item.type,
      tail: item.tail,
    })),
  );

  const edges = new DataSet(
    data.map((item, index) => ({
      from: index + 1,
      to: data.findIndex((el) => el.head === item.tail) + 1,
      label: item.type,
      head: item.head,
    }) as Partial<Record<'id', OptId>>),
  );

  return { nodes, edges } as { nodes: DatasetNodeType, edges: DatasetEdgeType };
};
