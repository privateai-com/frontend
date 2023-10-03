import { ReactNode } from 'react';

export type Content = {
  id: string;
  name: string;
  [key: string]: string | ReactNode;
};
