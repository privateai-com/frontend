import { ReactNode } from 'react';
import { Article, RequestStatus } from 'types';
import { usePagination } from 'hooks';
// import useInfiniteScroll from 'react-infinite-scroll-hook';

import { RequestedDataType } from 'containers/MyRequests/types';
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
  pagination?: {
    total: number,
    status?: RequestStatus,
    changeOffset?: (offset: number) => void,
  }
};

export const MobileTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  pagination,
  other,
  itemsMobile,
}) => {
  // const [sentryRef, { rootRef }] = useInfiniteScroll({
  //   loading: pagination?.isLoading ?? false,
  //   hasNextPage: pagination?.isHasNextPage ?? true,
  //   onLoadMore: pagination?.onLoadMore || (() => {}),
  //   disabled: pagination?.isError,
  //   rootMargin: '0px 0px 40px 0px',
  // });

  const {
    rootRef, endElementForScroll,
  } = usePagination({ 
    total: pagination?.total ?? 0, 
    status: pagination?.status, 
    changeOffset: pagination?.changeOffset,
  });
  
  return (
    <div
      className={styles.table_mobile}
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
        />
      ))}
      {endElementForScroll}
    </div>
  );
};
