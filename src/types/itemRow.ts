import { Row } from 'react-table';

export interface ItemRowProps<T extends object> {
  row: Row<T>;
  className?: string;
}
