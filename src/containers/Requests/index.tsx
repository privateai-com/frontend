import { useState } from 'react';
import { Button, Typography } from 'components';
import { TabToMe } from './TabToMe';
import { MyRequests } from '../MyRequests';
import styles from './styles.module.scss';

enum RequestsTab {
  ToMe,
  My,
}
export const Requests = () => {
  const [tab, setTab] = useState(RequestsTab.ToMe);
  return (
    <div className={styles.requests_container}>
      <div className={styles.requests_header}>
        <Typography
          type="h3"
          className={styles.requests_title}
        >
          Access requests
        </Typography>
        <div className={styles.requests_btn_block}>
          <Button 
            className={styles.requests_btn_to_me}
            onClick={() => setTab(RequestsTab.ToMe)}
            theme={tab === RequestsTab.ToMe ? 'primary' : 'secondary'}
          >
            Requests to me
          </Button>
          <Button  
            className={styles.requests_btn_my}
            onClick={() => setTab(RequestsTab.My)}
            theme={tab === RequestsTab.My ? 'primary' : 'secondary'}
          >
            My requests
          </Button>
        </div>
      </div>
      {tab === RequestsTab.ToMe && (
        <TabToMe />
      )}
      {tab === RequestsTab.My && (
        <MyRequests />
      )}
    </div>
  );
};
