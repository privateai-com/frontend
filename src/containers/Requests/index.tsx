import { Typography } from 'components';
import { TabToMe } from './TabToMe';
import styles from './styles.module.scss';
import { PageHead } from 'components/PageHead';

export const Requests = () => (
  <div className={styles.requests_container}>
    {/* <div className={styles.requests_header}>
      <Typography
        type="h3"
        className={styles.requests_title}
      >
        Access requests
      </Typography>
    </div> */}
    <PageHead props={{title: 'Access requests'}}>
    </PageHead>
    <TabToMe />
  </div>
);
