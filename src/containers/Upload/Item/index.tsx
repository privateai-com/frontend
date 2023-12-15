import { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';

import { ScreenWidth, routes } from 'appConstants';
import { documentTextIcon1 } from 'assets';
import { stringLongShortcut } from 'utils';
import { useScreenWidth } from 'hooks';
import { UploadFileStatus } from 'types';

import styles from './styles.module.scss';

type StatusLabelsType = {
  [key in UploadFileStatus]: string;
};

const statusLabels: StatusLabelsType = {
  [UploadFileStatus.COMPLETE]: 'Complete',
  [UploadFileStatus.PUBLISHED]: 'Complete',
  [UploadFileStatus.CREATED]: 'Uploading',
  [UploadFileStatus.PROCESSING]: 'Processing',
  [UploadFileStatus.UPLOADED]: 'Uploaded',
  [UploadFileStatus.QUEUE]: 'Queue',
  [UploadFileStatus.ERROR]: 'Error',
};

type ItemProps = {
  name: string;
  weight: string;
  timeToUploaded: number;
  // timeToProcessing: number;
  onCancel: () => void;
  idArticle?: number;
  percents: number;
  status: UploadFileStatus;
};

export const Item: React.FC<ItemProps> = ({ 
  name, weight, percents, timeToUploaded, status, onCancel,
}) => {
  const isLoaded = percents === 100;
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const isNotebook1024 = useScreenWidth(ScreenWidth.notebook1024);
  const isBigMobile = useScreenWidth(ScreenWidth.bigMobile);
  const statusText = statusLabels[status];

  const getStatusBarWidthStyle: CSSProperties = {
    width: `${percents}%`,
  };

  const getName = () => {
    if (name.length > 50) {
      let maxWidth = 30;
      if (isNotebook1024) maxWidth = 24;
      if (isBigMobile) maxWidth = 20;
      if (isMobile) maxWidth = 20;

      return stringLongShortcut(name, maxWidth, 10);
    }
    return name; 
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_filename_block}>
        <span className={styles.item_filename}>
          {!isMobile && 'File name: '} 
          {' '}
          {getName()}
        </span>
        <span>{`${weight}`}</span>
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
              [styles.item_status_bar_full]: status === UploadFileStatus.COMPLETE ||
                status === UploadFileStatus.PUBLISHED,
              [styles.item_status_bar_uploading]: isLoaded && status === UploadFileStatus.CREATED,
              [styles.item_status_bar_error]: status === UploadFileStatus.ERROR,
            })}
            style={getStatusBarWidthStyle}
          />
        </div>
        <span className={styles.item_percents}>
          {percents}
          %
        </span>
        <div className={styles.item_status}>
          {!isMobile && statusText && (
            <div>
              <span>{statusText}</span>
            </div>
          )}

          {/* {(status === UploadFileStatus.COMPLETE || status === UploadFileStatus.PUBLISHED) && (
            <div>{!isMobile && <span>Complete</span>}</div>
          )}
          {status === UploadFileStatus.CREATED && (
            <div>{!isMobile && <span>Uploading</span>}</div>
          )}
          {status === UploadFileStatus.PROCESSING && (
            <div>{!isMobile && <span>Processing</span>}</div>
          )} */}
          {/* {isLoaded ? (
            <div>{!isMobile && <span>Complete</span>}</div>
          ) : (
            <div>{!isMobile && <span>Processing</span>}</div>
          )} */}
        </div>
        {status === UploadFileStatus.COMPLETE 
        || status === UploadFileStatus.PUBLISHED 
          ? (
            <div className={styles.item_indication_block}>
              {/* <Image
                className={styles.item_complete}
                src={circleCheckIcon}
                alt="icon"
              /> */}
              <button
                className={cx(styles.item_circle, styles.item_circle_complete)}
                onClick={onCancel}
              />
              <Link
                className={styles.item_link_btn}
                href={`${routes.storage.root}`}
              >
                {isMobile ? 'My storage' : 'See in my storage'}
              </Link>
            </div>
          ) : (
            <div className={styles.item_indication_block}>
              <button className={styles.item_circle} onClick={onCancel} />
              <button
                className={styles.item_disabled_btn}
                disabled
              >
                {
                  status === UploadFileStatus.PROCESSING ||
                  status === UploadFileStatus.UPLOADED ||
                  status === UploadFileStatus.ERROR 
                    ? 'See in my storage' :
                    `~ 
                    ${' '}
                    ${Math.max(timeToUploaded, 1)}
                    ${' '}
                    min`
                }
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
