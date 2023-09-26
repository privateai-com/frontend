import React, { useState, useCallback } from 'react';
import cx from 'classnames';

import { arrowIcon } from 'assets';
import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

interface PaginationProps {
  pageCount: number;
  onChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount, onChange, className,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = useCallback(() => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
      if (onChange) onChange(currentPage + 1);
    }
  }, [currentPage, onChange, pageCount]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (onChange) onChange(currentPage - 1);
    }
  }, [currentPage, onChange]);

  return (
    <div className={cx(styles.pagination, className)}>
      <ButtonIcon
        onClick={goToPrevPage}
        image={arrowIcon}
        className={styles.button}
        isDisabled={currentPage === 0}
      />
      <span>
        {`Page ${currentPage + 1} of ${pageCount}`}
      </span>
      <ButtonIcon
        onClick={goToNextPage}
        image={arrowIcon}
        className={styles.button}
        isDisabled={currentPage === pageCount - 1}
      />
    </div>
  );
};
