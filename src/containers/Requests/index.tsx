import { Typography } from 'components';
import { TabToMe } from './TabToMe';
import styles from './styles.module.scss';

export const Requests = () => (
  <div className={styles.requests_container}>
    <div className={styles.requests_header}>
      <Typography
        type="h3"
        className={styles.requests_title}
      >
        Access requests
      </Typography>
    </div>
    <TabToMe />
  </div>
);
