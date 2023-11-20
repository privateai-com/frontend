import { DataSet } from 'vis-data';

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
