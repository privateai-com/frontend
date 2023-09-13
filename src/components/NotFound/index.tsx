import { FC } from 'react';
import { Typography } from 'components/Typography';
import cx from 'classnames';
import styles from './styles.module.scss';

const NotFound: FC = () => (
  <div className={styles.oops__container}>
    <div className={styles.oops__content_box}>
      <Typography
        type="h2"
        className={cx(styles.oops__h2, styles.center, styles.small_letter)}
      >
        Not Found
      </Typography>
      <Typography
        type="p"
        className={cx(styles.oops__p, styles.center, styles.small_letter)}
      >
        Something went wrong.
        <br />
        Please try again later
      </Typography>
    </div>
  </div>
);

export { NotFound };
