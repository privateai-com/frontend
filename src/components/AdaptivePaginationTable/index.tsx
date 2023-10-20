import { useMemo, useState } from 'react';
import { Column } from 'react-table';
import cx from 'classnames';

import { Pagination, Table } from 'components';

import { ScreenWidth } from 'appConstants';
import { usePageCount, useScreenWidth } from 'hooks';
import { Content } from 'types';
import styles from './styles.module.scss';
import { MobileTableItem } from './MobileTableItem';

type AdaptivePaginationTableProps = {
  columns: object[];
  content: Content[];
  mobileTitle1: string;
  key1: string;
  mobileTitle2: string;
  key2: string;
  itemsOnPageQuantity?: number;
  withPagination?: boolean;
  classNameTableContainer?: string;
};

export const AdaptivePaginationTable: React.FC<
AdaptivePaginationTableProps
> = ({
  content,
  columns,
  mobileTitle1,
  key1,
  mobileTitle2,
  key2,
  itemsOnPageQuantity = 6,
  withPagination = false,
  classNameTableContainer,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const initialObj = useMemo(
    () =>
      (content.length
        ? Object.fromEntries(
          Object.entries(content[0]).map(([key]) => [
            key,
            '',
          ]),
        )
        : {}),
    [content],
  );

  const data = useMemo(() => {
    if (content.length >= itemsOnPageQuantity || isMobile) {
      return content;
    }
    const emptyObjectsCount = itemsOnPageQuantity - content.length;
    const emptyObjects = Array.from(
      { length: emptyObjectsCount },
      () => initialObj,
    );
    return [...content, ...emptyObjects];
  }, [content, initialObj, isMobile, itemsOnPageQuantity]);

  const pageCount = usePageCount(data.length, itemsOnPageQuantity);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return data.slice(sliceStart, sliceEnd);
  }, [currentPageIndex, data, itemsOnPageQuantity]);

  return (
    <div>
      {isMobile ? (
        <div className={styles.table_mobile}>
          {tableData.map((iter, ind) => (
            <MobileTableItem
              key={iter.id}
              name={iter.name}
              title1={mobileTitle1}
              state1={tableData[ind][key1]}
              title2={mobileTitle2}
              state2={tableData[ind][key2]}
            />
          ))}
        </div>
      ) : (
        <>
          <Table
            columns={columns as unknown as Column<object>[]}
            data={tableData}
            className={cx(styles.table, classNameTableContainer)}
          />
          {withPagination && (
            <Pagination
              onChange={setCurrentPageIndex}
              pageCount={pageCount}
              className={styles.pagination}
            />
          )}
        </>
      )}
    </div>
  );
};
