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

// export type DatasetNodeType = 
//   DataSet<{ id: number | string; label: string; type: string; tail: string; }, 'id'>;

// export type DatasetNodeType = DataSet<{
//   id: OptId;
//   label: string;
//   type: string;
//   tail: string;
// }, 'id'>;

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
