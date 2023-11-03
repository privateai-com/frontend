import { Article } from 'types';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import styles from './styles.module.scss';
import { MobileTableItem } from '../MobileTableItem';

type AdaptivePaginationTableProps = {
  // eslint-disable-next-line
  content: Article[] | any[];
  mobileTitle1: string;
  key1: string;
  mobileTitle2: string;
  key2: string;
  pagination?: {
    isHasNextPage: boolean;
    isLoading: boolean;
    isError: boolean;
    onLoadMore: () => void;
  }
};

export const MobileTable: React.FC<AdaptivePaginationTableProps> = ({
  content,
  mobileTitle1,
  key1,
  mobileTitle2,
  key2,
  pagination,
}) => {
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: pagination?.isLoading ?? false,
    hasNextPage: pagination?.isHasNextPage ?? true,
    onLoadMore: pagination?.onLoadMore || (() => {}),
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: pagination?.isError,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 40px 0px',
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
          title1={mobileTitle1}
          state1={content[ind][key1 as keyof Article] as string}
          title2={mobileTitle2}
          state2={content[ind][key2 as keyof Article] as string}
        />
      ))}
      {(pagination?.isLoading || pagination?.isHasNextPage) && (
      <div ref={sentryRef} />
      )}
    </div>
  );
};
