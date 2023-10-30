export const getApiQueries = (payload: {
  limit: number;
  offset: number;
  sortingField: string;
  sortingDirection: 'ASC' | 'DESC';
  searchField?: string;
}) => {
  const {
    limit, offset, sortingField, sortingDirection, searchField, 
  } =
    payload;
  return `?limit=${limit}&offset=${offset}&sortingField=${sortingField}&sortingDirection=${sortingDirection}&searchField=${searchField}`;
};
