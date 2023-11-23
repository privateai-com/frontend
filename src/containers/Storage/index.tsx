import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, Typography } from 'components';
import { useScreenWidth } from 'hooks';
import { ScreenWidth, routes, queryTab } from 'appConstants';
import { plusIcon } from 'assets';
import { ArticlesTab } from './ArticlesTab';
import { MyRequests } from './MyRequests';
import { UploadButton } from './uploadButton';

import styles from './styles.module.scss';

enum MyStorageTab {
  articles,
  requested,
}

export const Storage = () => {
  const [tab, setTab] = useState(MyStorageTab.articles);
  const isMobile = useScreenWidth(ScreenWidth.notebook1024);
  const router = useRouter();
  
  useEffect(() => {
    const { storageTab } = router.query;
    if (typeof storageTab === 'string' && storageTab === queryTab.storageRequestedData) {
      setTab(MyStorageTab.requested);
    }
  }, [router.query]);

  return (
    <div className={styles.storage__container}>
      <div className={styles.storage__head}>
        <div className={styles.storage__title_block}>
          <Typography
            className={styles.storage__title}
            type="h1"
          >
            My storage
          </Typography>
          {isMobile && <UploadButton />}
        </div>
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
        {!isMobile && (
          <Button
            className={styles.buttonUpload}
            href={routes.uploadActivity.root}
            theme="primary"
          >
            <Image 
              src={plusIcon} 
              alt="icon plus" 
              width={20} 
              height={20} 
              className={styles.icon} 
            /> 
            <span className={styles.buttonTitle}>
              Upload new file
            </span>
          </Button>
        )}
      </div>
      {tab === MyStorageTab.articles ? <ArticlesTab /> : <MyRequests />}
    </div>
  );
};
