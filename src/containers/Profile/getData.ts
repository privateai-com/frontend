export const getData = (data1: string | null | undefined, data2: string | null | undefined) => {
  if (data1 && data2) return `${data2}, ${data1}`;
  if (data1) return data1;
  if (data2) return data2;
  return '';
};
