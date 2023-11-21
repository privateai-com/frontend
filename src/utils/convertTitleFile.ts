import { stringLongShortcut } from 'utils';

export const convertTitleFile = (title: string): string => {
  if (title.includes(' ')) return title;
  if (title.length > 25) return stringLongShortcut(title, 20, 4); 
  return title;
};
