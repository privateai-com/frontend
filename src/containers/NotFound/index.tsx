import { routes } from 'appConstants';
import { Typography } from 'components';
import Link from 'next/link';
import styles from './styles.module.scss';

const NotFound = () => (
  <div className={styles.not_found}>
    <Typography
      className={styles.not_found_title}
      type="h3"
    >
      404
    </Typography>
    <span className={styles.not_found_subtitle}>ERROR</span>
    <span className={styles.not_found_text}>
      Sorry, we were unable to find that page
    </span>
    <Link
      className={styles.not_found_link}
      href={routes.home.root}
    >
      Back to home
    </Link>
  </div>
);

export { NotFound };
