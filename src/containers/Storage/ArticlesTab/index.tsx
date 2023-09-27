import { useMemo, useState } from 'react';
import { Column } from 'react-table';

import {
  Button,
  Pagination,
  Table,
  TextInput,
} from 'components';

import { ScreenWidth, routes } from 'appConstants';
import { usePageCount, useScreenWidth } from 'hooks';
import styles from './styles.module.scss';

import { content, initialObj } from './data';
import { useColumns } from './columns';
import { Article } from './Article';

const itemsOnPageQuantity = 6;

export const ArticlesTab = () => {
  const [search, setSearch] = useState('');
  const columns = useColumns();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  
  const data = useMemo(() => {
    if (content.length >= 6) {
      return content;
    } 
    const emptyObjectsCount = 6 - content.length;
    const emptyObjects = Array.from({ length: emptyObjectsCount }, () => (initialObj));
    return [...content, ...emptyObjects];
  }, []);
  const pageCount = usePageCount(data.length, itemsOnPageQuantity);
  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return data.slice(sliceStart, sliceEnd);
  }, [currentPageIndex, data]);
  
  return (
    <>
      <div className={styles.storage__search}>
        <TextInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Search by file name"
          isSearch
          classNameInputBox={styles.input}
        />
        <Button
          className={styles.upload}
          href={routes.uploadActivity.root}
        >
          <span className={styles.plus_icon} />
          Upload new file
        </Button>
      </div>

      {isMobile ? (
        <div className={styles.table_mobile}>
          {content.map(({
            id, name, status, core,
          }) => (
            <Article
              key={id}
              name={name}
              status={status}
              core={core}
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
      
    </>
  );
};
