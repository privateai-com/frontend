import Image from 'next/image';
import { circleCheckIcon, documentTextIcon1 } from 'assets';
import Link from 'next/link';
import { ScreenWidth, routes } from 'appConstants';
import { CSSProperties } from 'react';
import cx from 'classnames';
import { useScreenWidth } from 'hooks';
import styles from './styles.module.scss';

type ItemProps = {
  name: string;
  weight: number;
  percents: number;
};

export const Item: React.FC<ItemProps> = ({ name, weight, percents }) => {
  const isLoaded = percents === 100;
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const getStatusBarWidthStyle: CSSProperties = {
    width: `${percents}%`,
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_filename_block}>
        <span className={styles.item_filename}>
          {!isMobile && 'File name: '} 
          {' '}
          {name}
        </span>
        <span>{`${weight} MB`}</span>
      </div>
      <div className={styles.item_status_block}>
        <Image
          className={styles.item_doc_icon}
          src={documentTextIcon1}
          alt="icon"
        />
        <div className={styles.item_status_bar}>
          <div
            className={cx(styles.item_status_bar_fill, {
              [styles.item_status_bar_full]: isLoaded,
            })}
            style={getStatusBarWidthStyle}
          />
        </div>
        <span className={styles.item_percents}>
          {percents}
          %
        </span>
        <div className={styles.item_status}>
          {isLoaded ? (
            <div>{!isMobile && <span>Complete</span>}</div>
          ) : (
            <div>{!isMobile && <span>Processing</span>}</div>
          )}
        </div>
        {isLoaded ? (
          <div className={styles.item_indication_block}>
            <Image
              className={styles.item_complete}
              src={circleCheckIcon}
              alt="icon"
            />
            <Link
              className={styles.item_link_btn}
              href={routes.storage.root}
            >
              {isMobile ? 'My storage' : 'See in my storage'}
            </Link>
          </div>
        ) : (
          <div className={styles.item_indication_block}>
            <div className={styles.item_circle} />
            <button
              className={styles.item_disabled_btn}
              disabled
            >
              ~ 25 min
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
