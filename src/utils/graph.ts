import { GraphResponseType } from 'types';

export const listTitleGraphs = (data: GraphResponseType[]): string => data.map((item) => item.head).join(', ');
