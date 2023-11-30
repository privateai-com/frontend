import { DataSet } from 'vis-data';
import {
  Edge,
  Network,
  Node,
} from 'vis-network';

export type NodeType = {
  id: string | number;
  label: string;
  size: number;
};

export type EdgeType = {
  id: string | number;
  from: number | string;
  head: string;
  label: string;
  to: number | string;
};

export type DatasetNodeType = DataSet<NodeType, 'id'>;
export type DatasetEdgeType = DataSet<EdgeType, 'id'>;

export interface ExtendedNetwork extends Network {
  body: {
    data: {
      nodes: DataSet<Node>;
      edges: DataSet<Edge>;
    };
  };
}
