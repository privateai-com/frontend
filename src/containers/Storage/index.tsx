import { useState } from 'react';

import { Button, Typography } from 'components';

import styles from './styles.module.scss';
import { ArticlesTab } from './ArticlesTab';
import { RequestedTab } from './RequestedTab';

enum MyStorageTab {
  articles,
  requested,
}

export const Storage = () => {
  const [tab, setTab] = useState(MyStorageTab.articles);

  return (
    <div className={styles.storage__container}>
      <div className={styles.storage__head}>
        <Typography type="h1">My storage</Typography>
        <div className={styles.storage__head_buttons}>
          <Button
            className={
              tab === MyStorageTab.articles ? undefined : styles.secondary
            }
            onClick={() => setTab(MyStorageTab.articles)}
            theme={tab === MyStorageTab.articles ? 'primary' : 'secondary'}
          >
            My articles
          </Button>
          <Button
            className={
              tab === MyStorageTab.requested ? undefined : styles.secondary
            }
            onClick={() => setTab(MyStorageTab.requested)}
            theme={tab === MyStorageTab.requested ? 'primary' : 'secondary'}
          >
            Requested data
          </Button>
        </div>
      </div>
      {tab === MyStorageTab.articles ? <ArticlesTab /> : <RequestedTab />}
    </div>
  );
};
