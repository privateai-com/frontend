import React, { FC, memo } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type ProgressBarProps = {
  progress: number;
  className?: string;
};

export const ProgressBar: FC<ProgressBarProps> = memo(({
  progress,
  className,
}) => {
  const percentage = Math.min(Math.max(progress, 0), 100);
  return (
    <div className={cx(styles.progress_bar_container, className)}>
      <p>{`${percentage}%`}</p>
      <div
        className={cx(styles.progress_bar, {
          [styles.complete]: percentage === 100,
        })}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});
