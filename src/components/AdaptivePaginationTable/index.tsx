import { useMemo, useState } from 'react';
import { Column } from 'react-table';

import { Pagination, Table } from 'components';

import { ScreenWidth } from 'appConstants';
import { usePageCount, useScreenWidth } from 'hooks';
import styles from './styles.module.scss';
import { MobileTableItem } from './MobileTableItem';

type Content = {
  id: string;
  name: string;
  [key: string]: string;
};

type Props = {
  columns: object[];
  content: Content[];
  mobileTitle1: string;
  key1: string ;
  mobileTitle2: string;
  key2: string;
  itemsOnPageQuantity?: number;
};

export const AdaptivePaginationTable: React.FC<Props> = ({
  content,
  columns,
  mobileTitle1,
  key1,
  mobileTitle2,
  key2,
  itemsOnPageQuantity = 6,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const initialObj = Object.fromEntries(
    Object.entries(content[0]).map(([key]) => [key, '']),
  );

  const data = useMemo(() => {
    if (content.length >= 6) {
      return content;
    }
    const emptyObjectsCount = itemsOnPageQuantity - content.length;
    const emptyObjects = Array.from(
      { length: emptyObjectsCount },
      () => initialObj,
    );
    return [...content, ...emptyObjects];
  }, []);

  const pageCount = usePageCount(data.length, itemsOnPageQuantity);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return data.slice(sliceStart, sliceEnd);
  }, [currentPageIndex, data]);

  return (
    <div>
      {isMobile ? (
        <div className={styles.table_mobile}>
          {content.map((iter, ind) => (
            <MobileTableItem
              key={iter.id}
              name={iter.name}
              title1={mobileTitle1}
              state1={content[ind][key1]}
              title2={mobileTitle2}
              state2={content[ind][key2]}
            />
          ))}
        </div>
      ) : (
        <>
          <Table
            columns={columns as unknown as Column<object>[]}
            data={tableData}
            className={styles.table}
          />
          <Pagination
            onChange={setCurrentPageIndex}
            pageCount={pageCount}
            className={styles.pagination}
          />
        </>
      )}
    </div>
  );
};
