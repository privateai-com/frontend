import { ReactNode } from 'react';
import { Column } from 'react-table';
import cx from 'classnames';

import { Table } from 'components';

import { Article, PaginationForHook } from 'types';
import { MobileTable, type ItemMobile } from './MobileTable';
import styles from './styles.module.scss';

type AdaptivePaginationTableProps = {
  columns: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Article[] | any[];
  other?: string | ReactNode;
  itemsOnPageQuantity?: number;
  withPagination?: boolean;
  isMobile: boolean;
  classNameTableContainer?: string;
  itemsMobile: ItemMobile[];
  pagination?: PaginationForHook;
  classNameMobile?: string;
};

export const AdaptivePaginationTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  columns,
  other,
  classNameTableContainer,
  pagination,
  itemsMobile,
  isMobile,
  classNameMobile,
}) => {
  if (isMobile) {
    return(
      <MobileTable
        content={content}
        pagination={pagination}
        other={other}
        itemsMobile={itemsMobile}
        className={classNameMobile}
      />
    );
  } 

  return (
    <Table
      columns={columns as unknown as Column<object>[]}
      data={content}
      className={cx(styles.table, classNameTableContainer)}
      pagination={pagination}
    />
  );
};
