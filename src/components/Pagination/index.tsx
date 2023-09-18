import React, {
  FC,
  memo,
  useCallback,
  useState,
} from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import cx from 'classnames';
import Image from 'next/image';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { arrowIcon } from 'assets';

import styles from './styles.module.scss';

interface PaginationProps {
  page?: number
  pageCount?: number
  className?: string
  classNamePagination?: string
  classNameDisabled?: string
  onChange?: (page: number) => void
  isHideMoveTo?: boolean;
}

export const Pagination: FC< PaginationProps > = memo(({
  page = 0,
  pageCount = 12,
  className,
  classNamePagination,
  onChange,
  classNameDisabled,
  isHideMoveTo = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);
  const handleChange = useCallback<Required<ReactPaginateProps>['onClick']>(({ nextSelectedPage, selected, isBreak }) => {
    let next = nextSelectedPage;

    if (isBreak && nextSelectedPage !== undefined) {
      if (nextSelectedPage > selected) {
        next = Math.floor((pageCount - 1 - selected) / 2 + selected);
      } else {
        next = Math.floor(selected / 2);
      }
    }

    if (onChange && next !== undefined) {
      onChange(next);
    }
  }, [onChange, pageCount]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const pageNumber = Number(inputValue);
      if (pageNumber >= 1 && pageNumber <= pageCount && onChange) {
        onChange(pageNumber - 1);
        setInputValue('');
      }
    }
  };

  return (
    <div className={cx(styles.pagination_container, className)}>
      <ReactPaginate
        forcePage={page}
        onClick={handleChange}
        pageCount={pageCount || 0}
        pageRangeDisplayed={isSmallDesktop ? 2 : 3}
        marginPagesDisplayed={2}
        className={cx(styles.pagination, classNamePagination)}
        breakClassName={styles.break}
        breakLinkClassName={styles.break_line}
        activeLinkClassName={styles.page_active}
        pageLinkClassName={styles.page}
        nextLinkClassName={styles.arrow_button}
        previousLinkClassName={styles.arrow_button}
        disabledLinkClassName={cx(styles.disabled, classNameDisabled)}
        renderOnZeroPageCount={() => null}
        nextLabel={(
          <Image
            src={arrowIcon}
            width={16}
            height={16}
            alt="copy"
            className={styles.next_arrow}
          />
        )}
        previousLabel={(
          <Image
            src={arrowIcon}
            width={16}
            height={16}
            alt="copy"
            className={styles.prev_arrow}
          />
        )}
      />

      {(!isSmallDesktop && !isHideMoveTo) && (
        <div className={styles.move_to}>
          Move to
          <input
            type="number"
            min="1"
            max={pageCount}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
            className={styles.move_to_input}
          />
          page
        </div>
      )}
    </div>
  );
});
