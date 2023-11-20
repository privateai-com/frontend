export const formatDateFromTimestamp = (timestamp: number | string | undefined): string => {
  if (!timestamp) return '';
  const date = new Date(Number(timestamp) * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}/${month}/${day}`;
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
