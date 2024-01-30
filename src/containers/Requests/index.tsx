import { PageHead } from 'components/PageHead';
import { TabToMe } from './TabToMe';
import styles from './styles.module.scss';

export const Requests = () => (
  <div className={styles.requests_container}>
    <PageHead title="Access requests" />
    <TabToMe />
  </div>
);
