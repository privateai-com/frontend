export const isWordMatchingSearch = (word: string, search: string) => {
  if (word.length > 0 && search.length > 0) {
    return word.toLowerCase().includes(search.toLowerCase());
  }
  return false;
};
