import { Row } from 'react-table';

export interface ArticlesRowProps<T extends object = ArticlesType> {
  row: Row<T>;
  className?: string;
}

export interface ArticlesType {
  id: string;
  name: string;
  status: string;
  core: string;
}
