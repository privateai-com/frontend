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
             console.log(row)
           const rowData = row.original as {
              data: object[];
            };
            prepareRow(row);
           
            return (
              <React.Fragment key={row.getRowProps().key}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell,i) => (
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
                      {/* {
                        i === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                          <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>: <></>
                      } */}
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
         
        </tbody>
      </table>
       {endElementForScroll}
       </>
    );
  },
);
