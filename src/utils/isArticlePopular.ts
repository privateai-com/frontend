export const isArticlePopular = (count1: number | undefined, count2: number | undefined) => {
  if (typeof count1 !== 'undefined' && typeof count2 !== 'undefined') {
    return +count1 > 20 && count1 > 5 * count2;
  } 
  return false;
};
