export const getApiQueries = (payload: {
  limit: number;
  offset: number;
  sortingField: string;
  sortingDirection: 'ASC' | 'DESC';
  searchField?: string;
  search?: string | string[];
  doneStatus?: boolean;
}) => {
  const {
    limit, offset, sortingField, sortingDirection, searchField, doneStatus, 
    search,
  } = payload;
  return `?${new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
    sortingField,
    sortingDirection,
    searchField: searchField ?? '',
    search: search as string ?? '',
    doneStatus: doneStatus ? 'true' : 'false',
  }).toString()}`;
};
