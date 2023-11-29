export const getApiQueries = (payload: {
  limit: number;
  offset: number;
  sortingField: string;
  sortingDirection: 'ASC' | 'DESC';
  searchField?: string;
  doneStatus?: boolean;
}) => {
  const {
    limit, offset, sortingField, sortingDirection, searchField, doneStatus, 
  } = payload;
  return `?${new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
    sortingField,
    sortingDirection,
    searchField: searchField ?? '',
    doneStatus: doneStatus ? 'true' : 'false',
  }).toString()}`;
};
