import { stringLongShortcut } from 'utils';

export const convertTitleFile = (title: string, limit: number = 20): string => {
  if (title.includes(' ')) return title;
  if (title.length > limit + 4) return stringLongShortcut(title, limit, 4); 
  return title;
};
