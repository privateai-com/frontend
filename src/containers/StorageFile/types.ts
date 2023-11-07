import { DataSet } from 'vis-data';
import { OptId } from 'vis-data/declarations/data-interface';

import { GraphResponseType } from 'types';

export type NodeType = {
  id: string | number;
  label: string;
};

export type EdgeType = {
  from: number | string;
  head: string;
  label: string;
  to: number | string;
};
// Node[] | DataInterfaceNodes | undefined
export type DatasetNodeType = DataSet<Partial<Record<'id', OptId>> & GraphResponseType & { label: string } & Node[]>;

export type DatasetEdgeType = DataSet<Partial<Record<'id', OptId>> & GraphResponseType & EdgeType>;
