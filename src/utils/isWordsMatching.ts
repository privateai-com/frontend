export const isWordMatchingSearch = (word: string, search: string) => {
  const wordWithoutlastLetter = word.slice(0, -1);
  
  return (
    word.toLowerCase() === search.toLowerCase() ||
    wordWithoutlastLetter.toLowerCase() === search.toLowerCase()
  );
};
