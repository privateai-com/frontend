import { Column } from 'react-table';
import cx from 'classnames';

import { Table } from 'components';

import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { Article } from 'types';
import { MobileTable } from './MobileTable';
import styles from './styles.module.scss';

type AdaptivePaginationTableProps = {
  columns: object[];
  // eslint-disable-next-line
  content: Article[] | any[];
  mobileTitle1: string;
  key1: string;
  mobileTitle2: string;
  key2: string;
  itemsOnPageQuantity?: number;
  withPagination?: boolean;
  classNameTableContainer?: string;
  pagination?: {
    isHasNextPage: boolean;
    isLoading: boolean;
    isError: boolean;
    onLoadMore: () => void;
  }
};

export const AdaptivePaginationTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  columns,
  mobileTitle1,
  key1,
  mobileTitle2,
  key2,
  classNameTableContainer,
  pagination,
}) => {
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  return (
    <div>
      {isMobile ? (
        <MobileTable
          content={content}
          pagination={pagination}
          mobileTitle1={mobileTitle1}
          key1={key1}
          mobileTitle2={mobileTitle2}
          key2={key2}
        />
      ) : (
        <Table
          columns={columns as unknown as Column<object>[]}
          data={content}
          className={cx(styles.table, classNameTableContainer)}
          pagination={pagination}
        />
      )}
    </div>
  );
};
