export const isWordMatchingSearch = (word: string, search: string) => {
  const wordWithoutLastLetter = word.slice(0, -1);
  
  return (
    word.toLowerCase() === search.toLowerCase() ||
    wordWithoutLastLetter.toLowerCase() === search.toLowerCase()
  );
};
