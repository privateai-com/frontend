import { Button, Typography } from 'components';
import styles from './styles.module.scss';
import { RequestTab } from './RequestTab';

const Requests = () => (
  <div className={styles.requests_container}>
    <div className={styles.requests_header}>
      <Typography
        type="h3"
        className={styles.requests_title}
      >
        Access requests
      </Typography>
      <div className={styles.requests_btn_block}>
        <Button className={styles.requests_btn_to_me}>Requests to me</Button>
        <Button theme='secondary' className={styles.requests_btn_my}>My requests</Button>
      </div>
    </div>
    <RequestTab />
  </div>
);

export { Requests };
