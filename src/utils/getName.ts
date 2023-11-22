export const getName = (
  realName: string | null | undefined, 
  userName: string | null | undefined, 
  id: number,
): string => {
  if (!realName && !userName) return `Archonaut#${id}`;
  if (realName && !userName) return realName;
  return userName ?? '-';
};
