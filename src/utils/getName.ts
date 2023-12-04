export const getName = (
  realName: string | null | undefined, 
  userName: string | null | undefined, 
  id: number | undefined,
): string => {
  // if (!realName && !userName) return `Archonaut#${id}`;
  // if (realName && !userName) return realName;
  // return userName ?? '-';
  if (userName) return userName;
  if (realName) return realName;
  if (id) return `Archonaut#${id}`;
  return '-';
};
