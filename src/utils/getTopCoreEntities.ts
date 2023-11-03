import { transformDataToNodesAndEdges } from 'containers/StorageFile/Graph/utils';
import { GraphResponseType } from 'types';
import { getTopEdges } from './getTopEdges';

export const getTopCoreEntities = (data: GraphResponseType[]): string => {
  const { nodes, edges } = transformDataToNodesAndEdges(data);
  const topEdges = getTopEdges(edges.get(), nodes.get());
  const coreEntities = topEdges.map(({ label }) => label).join(', ');
  return coreEntities;
};
