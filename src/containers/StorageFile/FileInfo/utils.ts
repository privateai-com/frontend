export const formatDate = (inputDate: string): string => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  
  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  
  return `${day} ${month} ${year}`;
};

export const convertToBytesString = (num: number): string => {
  if (num >= 1) {
    return `${num.toFixed(2)} MB`;
  } 
  return `${(num * 1024).toFixed(2)} KB`;
};
