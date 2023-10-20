/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

import {
  DragFunction, GraphDataType, GraphResponseType, NodeDatum, 
} from '../../types';

export const initialGraphData: GraphDataType = { nodes: [], links: [] };

export const normalizeGraphEdges = (edges: GraphResponseType[]) => {
  const uniqueNodes = new Set<string>();
  const uniqueLinks = new Set<string>();
  const normalizedData: GraphDataType = {
    nodes: [],
    links: [],
  };

  edges.forEach((edge) => {
    const headNodeId = edge.head;
    const typeNodeId = edge.type;
    
    if (!uniqueNodes.has(headNodeId)) {
      uniqueNodes.add(headNodeId);
      normalizedData.nodes.push({ id: headNodeId });
    }
    if (!uniqueNodes.has(typeNodeId)) {
      uniqueNodes.add(typeNodeId);
      normalizedData.nodes.push({ id: typeNodeId });
    }

    const linkString = `${headNodeId}-${typeNodeId}`;

    if (!uniqueLinks.has(linkString)) {
      uniqueLinks.add(linkString);
      normalizedData.links.push({ source: headNodeId, target: typeNodeId });
    }
  });

  return normalizedData;
};

export const drag: DragFunction = (simulation) => {
  function started(
    event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>,
    d: NodeDatum | undefined,
  ) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    if (d) {
      const { x, y } = d;
      d.fx = x;
      d.fy = y;
    }
  }
  
  function dragged(
    event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>,
    d: NodeDatum | undefined,
  ) {
    if (d) {
      const { x, y } = event;
      d.fx = x;
      d.fy = y;
    }
  }
  
  function ended(event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>) {
    if (!event.active) simulation.alphaTarget(0);
  }
  
  return d3.drag<SVGCircleElement, NodeDatum, undefined>()
    .on('start', started as (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>) => void)
    .on('drag', dragged as (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>) => void)
    .on('end', ended as (event: d3.D3DragEvent<SVGCircleElement, NodeDatum, undefined>) => void);
};

export const deleteNodeAndDependentNodes = (
  graphData: GraphDataType,
  nodeIdToDelete: string,
): GraphDataType => {
  const nodesToDelete = new Set<string>();

  nodesToDelete.add(nodeIdToDelete);

  function findDependentNodes(nodeId: string) {
    const dependentLinks = graphData.links.filter((link) => link.source === nodeId);
    // eslint-disable-next-line no-restricted-syntax
    for (const link of dependentLinks) {
      const targetNodeId = link.target as string;
      nodesToDelete.add(targetNodeId);
      findDependentNodes(targetNodeId);
    }
  }

  findDependentNodes(nodeIdToDelete);

  const nodes = graphData.nodes.filter((node) => !nodesToDelete.has(node.id));
  const links = graphData.links.filter(
    (link) => !nodesToDelete.has(link.source as string)
    && !nodesToDelete.has(link.target as string),
  );

  return { nodes, links };
};
