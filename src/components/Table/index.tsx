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
import { RequestStatus } from 'types';

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
  pagination?: {
    total: number,
    status?: RequestStatus,
    changeOffset?: (offset: number) => void,
  }
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
      changeOffset: pagination?.changeOffset,
    });

    return (
      <table
        {...getTableProps()}
        className={cx(styles.table, className)}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
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
                      {...cell.getCellProps()}
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
          {endElementForScroll}
        </tbody>
      </table>
    );
  },
);
