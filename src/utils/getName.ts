export const getName = (realName: string, userName: string, id: number) => {
  if (!realName && !userName) return `Archonaut#${id}`;
  if (realName && !userName) return realName;
  return userName;
};
