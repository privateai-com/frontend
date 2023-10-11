import * as d3 from 'd3';

export type NodeDatum = d3.SimulationNodeDatum & {
  id: string;
};

export interface GraphDataType {
  nodes: NodeDatum[];
  links: d3.SimulationLinkDatum<NodeDatum>[];
}

export type GraphResponseType = {
  head: string;
  tail: string;
  type: string;
  meta: {
    spans: number[][];
  };
};

type Simulation = d3.Simulation<NodeDatum, undefined>;

export type DragFunction = (simulation: Simulation) =>
d3.DragBehavior<SVGCircleElement, NodeDatum, undefined>;
