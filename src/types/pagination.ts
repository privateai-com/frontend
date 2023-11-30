import { RequestStatus } from 'types';

export type Pagination = {
  limit: number,
  offset: number,
  sortingDirection: 'ASC' | 'DESC',
  sortingField: string,
  search?: string,
};

export type PaginationForHook = {
  total: number,
  offset: number,
  status?: RequestStatus,
  increaseOffset: () => void,
};
