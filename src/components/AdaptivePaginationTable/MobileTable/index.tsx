import { ReactNode } from 'react';
import cx from 'classnames';
import { Article, PaginationForHook } from 'types';
import { usePagination } from 'hooks';

import { RequestedDataType } from 'containers/Storage/MyRequests/types';
import { MobileTableItem } from '../MobileTableItem';

import styles from './styles.module.scss';

export type ItemMobile = {
  title: string | null,
  key: string,
  cell?: (value: ReactNode | RequestedDataType) => string | ReactNode;
};

type AdaptivePaginationTableProps = {
  // eslint-disable-next-line
  content: Article[] | any[];
  other?: string | ReactNode;
  itemsMobile: ItemMobile[];
  pagination?: PaginationForHook;
  className?: string;
};

export const MobileTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  pagination,
  other,
  itemsMobile,
  className,
}) => {
  const {
    rootRef, endElementForScroll,
  } = usePagination({ 
    offset: pagination?.offset ?? 0, 
    total: pagination?.total ?? 0, 
    status: pagination?.status, 
    increaseOffset: pagination ? pagination.increaseOffset : () => {},
  });
  
  return (
    <div
      className={cx(styles.table_mobile, className)}
      ref={rootRef}
    >
      {content.map((iter, ind) => (
        <MobileTableItem
          key={iter.id}
          name={iter.title}
          id={iter.id}
          other={other}
          items={itemsMobile.map(({ title, key, cell }) => ({
            title,
            state: key === 'owner' ? content[ind] : content[ind][key] as string, 
            cell,
          }))}
          href={iter?.href}
        />
      ))}
      {endElementForScroll}
    </div>
  );
};
