export type GraphResponseType = {
  head: string;
  tail: string;
  type: string;
  meta: {
    spans: number[][];
  };
};
