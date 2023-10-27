import { DataSet } from 'vis-data';
import { OptId } from 'vis-data/declarations/data-interface';

export type GraphResponseType = {
  head: string;
  tail: string;
  type: string;
  meta: {
    spans: number[][];
  };
};

export type DatasetNodeType = 
  DataSet<{ id: number; label: string; type: string; tail: string; }, 'id'>;

export type EdgeType = {
  from: number;
  head: string;
  label: string;
  to: number;
};

export type DatasetEdgeType = DataSet<Partial<Record<'id', OptId>> & GraphResponseType & EdgeType, 'id'>;
