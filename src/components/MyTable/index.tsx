import { ReactNode, useMemo, useState } from 'react';
import { Column } from 'react-table';

import {
  Pagination, Table, 
} from 'components';

import { ScreenWidth } from 'appConstants';
import { usePageCount, useScreenWidth } from 'hooks';
import styles from './styles.module.scss';
import { MobileTableItem } from './MobileTableItem';

type Props = {
  columns: object[];
  content: object[];
  name: string;
  mobileTitle1: string;
  mobileState1: string | ReactNode;
  mobileTitle2: string;
  mobileState2: string | ReactNode;
  children?: string | ReactNode;
  itemsOnPageQuantity?: number;
};

export const MyTable: React.FC<Props> = ({
  content,
  columns,
  name,
  mobileTitle1,
  mobileState1,
  mobileTitle2,
  mobileState2,
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
          {content.map(() => (
            <MobileTableItem
              key={name}
              name={name}
              title1={mobileTitle1}
              state1={mobileState1}
              title2={mobileTitle2}
              state2={mobileState2}
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
