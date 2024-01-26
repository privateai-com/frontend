import React, {
  FC, ReactNode, memo, useEffect, 
} from 'react';
// import useInfiniteScroll from 'react-infinite-scroll-hook';
import cx from 'classnames';
import {
  Column,
  Row,
  TableInstance,
  useExpanded,
  useRowSelect,
  useTable,
} from 'react-table';
import { usePagination } from 'hooks';
import { PaginationForHook } from 'types';

import Link from 'next/link';
import styles from './styles.module.scss';

interface SelectedRowIdsProps {
  [k: string]: boolean;
}

interface TableProps {
  columns: Column<object>[];
  columnsExpanded?: Column<object>[];
  data: object[];
  className?: string;
  expandedTableClassName?: string;
  tdOpenClassName?: string;
  tdOpenExpandedClassName?: string;
  getSelectedExpandedRows?: (args0: {
    selectedRowIds: SelectedRowIdsProps;
    selectedFlatRows: object[];
  }) => void;
  getActiveExpandedRows?: (args0: { selectedIndexRow: number | null }) => void;
  expandedChildren?: (row?: object) => ReactNode;
  expandedChildrenTop?: (row?: object) => ReactNode;
  pagination?: PaginationForHook
}

export const Table: FC<TableProps> = memo(
  ({
    columns,
    data,
    className,
    expandedTableClassName,
    columnsExpanded,
    getSelectedExpandedRows,
    expandedChildren,
    expandedChildrenTop,
    tdOpenClassName,
    tdOpenExpandedClassName,
    getActiveExpandedRows,
    pagination,
  }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
      state: { selectedRowIds, expanded },
    }: TableInstance<object> & {
      selectedFlatRows?: Array<Row<object>>;
      state: { selectedRowIds?: SelectedRowIdsProps; expanded?: object };
    } = useTable(
      {
        columns,
        data,
      },
      useExpanded,
      useRowSelect,
    );

    useEffect(() => {
      if (
        getSelectedExpandedRows &&
        selectedRowIds &&
        selectedFlatRows?.length
      ) {
        getSelectedExpandedRows({
          selectedRowIds,
          selectedFlatRows: selectedFlatRows.map(
            (d: { original: object }) => d.original,
          ),
        });
      }
    }, [
      expanded,
      getSelectedExpandedRows,
      rows,
      selectedFlatRows,
      selectedRowIds,
    ]);

    useEffect(() => {
      if (getActiveExpandedRows && expanded && Object.keys(expanded).length) {
        getActiveExpandedRows({
          selectedIndexRow: +Object.keys(expanded)[0],
        });
      } else if (getActiveExpandedRows) {
        getActiveExpandedRows({
          selectedIndexRow: null,
        });
      }
    }, [expanded, getActiveExpandedRows]);

    const {
      rootRef, endElementForScroll,
    } = usePagination({ 
      total: pagination?.total ?? 0, 
      status: pagination?.status, 
      offset: pagination?.offset ?? 0,
      increaseOffset: pagination ? pagination.increaseOffset : () => {},
    });

    return (
      <>
        <table
          {...getTableProps()}
          className={cx(styles.table, className)}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th 
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })}
                  >
                    {column.render('Header') as ReactNode}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} ref={rootRef}>
            {rows.map((row: Row<object> & { isExpanded?: boolean }) => {
              const rowData = row.original as {
                data: object[];
              };
              prepareRow(row);
           
              return (
                <React.Fragment key={row.getRowProps().key}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        className={cx(tdOpenClassName, {
                          [styles.td_open]: row.isExpanded,
                        })}
                      >
                        {cell.render('Cell') as ReactNode}
                      </td>
                    ))}
                  </tr>
                  {row.isExpanded && columnsExpanded && rowData?.data && (
                  <tr>
                    <td
                      colSpan={row.cells.length}
                      className={cx(styles.td_clear, tdOpenExpandedClassName)}
                    >
                      {expandedChildrenTop && expandedChildrenTop(rowData)}
                      <Table
                        className={expandedTableClassName}
                        columns={columnsExpanded}
                        data={rowData.data}
                        getSelectedExpandedRows={getSelectedExpandedRows}
                      />
                      {expandedChildren && expandedChildren(rowData)}
                    </td>
                  </tr>
                  )}
                </React.Fragment>
              );
            })}
            {rows.length === 0 && (
            <tr style={{ minHeight: '100%' }}>
              <td style={{ width: '100%', flexBasis: '100%' }}>
                <div className={styles.noData}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none">
                    <circle cx="71" cy="71" r="71" fill="#4659FE" fillOpacity="0.08" />
                    <path d="M40 42.5H57L63 47.5H98.5C102.918 47.5 106.5 51.0817 106.5 55.5V56.5V65.5H56L43 100H40C36.6863 100 34 97.3137 34 94V48.5C34 45.1863 36.6863 42.5 40 42.5Z" fill="white" />
                    <path d="M106.632 65.2V53.4588C106.632 50.1451 103.946 47.4588 100.632 47.4588H62.6437L59.5311 44.3446C58.0307 42.8434 55.9953 42 53.8728 42H40C36.6863 42 34 44.6863 34 48V93C34 96.866 37.134 100 41 100H42.8659M106.632 65.2H121.6C122.286 65.2 122.768 65.8753 122.546 66.5244L111.992 97.2976C111.438 98.9142 109.917 100 108.208 100H42.8659M106.632 65.2H58.6026C56.9319 65.2 55.4371 66.2385 54.8541 67.8042L42.8659 100" stroke="#7C859E" strokeWidth="3" />
                  </svg>
                  <h3>
                    Nothing here yet...
                  </h3>
                  <p>
                    This list is currently empty. 
                    Check out the 
                    {' '}
                    <Link href="/knowledge">Knowledge base</Link>
                    {' '}
                    and feel free to upload your research data in the 
                    &quot;
                    <Link href="/storage">My storage</Link>
                    &quot; section to discover more features.
                  </p>
                
                </div>
              </td>  
            </tr>
            )}
          </tbody>
        </table>
        {endElementForScroll}
      </>
    );
  },
);
