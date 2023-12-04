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
  const url = new URLSearchParams({
    limit: `${limit}`,
    offset: `${offset}`,
    sortingField,
    sortingDirection,
    doneStatus: doneStatus ? 'true' : 'false',
  });
  if (searchField) {
    url.append('searchField', searchField);
  }
  if (search) {
    url.append('search', search as string);
  }
  return `?${url.toString()}`;
};
