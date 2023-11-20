import { ReactNode } from 'react';
import { Column } from 'react-table';
import cx from 'classnames';

import { Table } from 'components';

import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { Article, RequestStatus } from 'types';
import { MobileTable, type ItemMobile } from './MobileTable';
import styles from './styles.module.scss';

type AdaptivePaginationTableProps = {
  columns: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Article[] | any[];
  other?: string | ReactNode;
  itemsOnPageQuantity?: number;
  withPagination?: boolean;
  classNameTableContainer?: string;
  itemsMobile: ItemMobile[];
  pagination?: {
    total: number,
    status?: RequestStatus,
    changeOffset?: (offset: number) => void,
  }
};

export const AdaptivePaginationTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  columns,
  other,
  classNameTableContainer,
  pagination,
  itemsMobile,
}) => {
  const isMobile = useScreenWidth(ScreenWidth.bigMobile);

  if (isMobile) {
    return(
      <MobileTable
        content={content}
        pagination={pagination}
        other={other}
        itemsMobile={itemsMobile}
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
