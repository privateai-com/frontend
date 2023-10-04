import { routes } from 'appConstants';
import { Button, Typography } from 'components';
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
    <Button
      href={routes.home.root}
      className={styles.not_found_link}
    >
      Back to home
    </Button>
  </div>
);

export { NotFound };
