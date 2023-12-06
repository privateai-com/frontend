import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
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
  const isBigMobile = useScreenWidth(ScreenWidth.bigMobile);
  const router = useRouter();
  
  useEffect(() => {
    const { storageTab } = router.query;
    if (typeof storageTab === 'string' && storageTab === queryTab.storageRequestedData) {
      setTab(MyStorageTab.requested);
    }
  }, [router.query]);

  const onTabArticles = useCallback(() => {
    setTab(MyStorageTab.articles);
    const { pathname } = router;
    router.replace({ pathname, query: {} }, undefined, { shallow: true });
  }, [router]);

  const onTabRequested = useCallback(() => {
    setTab(MyStorageTab.requested);
    router.push(`?storageTab=${queryTab.storageRequestedData}`, undefined, { shallow: true });
  }, [router]);

  return (
    <div className={styles.storage__container}>
      <div className={cx(styles.storage__head)}>
        <div className={cx(
          styles.storage__title_block,
        )}
        >
          <Typography
            className={cx(styles.storage__title)}
            type="h1"
          >
            My storage
          </Typography>
          {isMobile && tab === MyStorageTab.articles && <UploadButton />}
        </div>
        <div className={cx(styles.storage__head_buttons)}>
          <Button
            className={
              tab === MyStorageTab.articles ? undefined : styles.secondary
            }
            onClick={onTabArticles}
            theme={tab === MyStorageTab.articles ? 'primary' : 'secondary'}
          >
            My articles
          </Button>
          <Button
            className={
              tab === MyStorageTab.requested ? undefined : styles.secondary
            }
            onClick={onTabRequested}
            theme={tab === MyStorageTab.requested ? 'primary' : 'secondary'}
          >
            Requested data
          </Button>
        </div>
        {!isMobile && tab === MyStorageTab.articles && (
          <Link
            className={styles.buttonUpload}
            href={routes.uploadActivity.root}
            type="button"
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
          </Link>
        )}
      </div>
      {tab === MyStorageTab.articles 
        ? <ArticlesTab isMobile={isBigMobile} /> 
        : <MyRequests isMobile={isBigMobile} />}
    </div>
  );
};
