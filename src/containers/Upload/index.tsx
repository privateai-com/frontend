import { filesize } from 'filesize';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { Button, Typography } from 'components';
import { useScreenWidth, useVipUser } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { RequestStatus } from 'types';

import { articlesCreate } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import styles from './styles.module.scss';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';

export const Upload = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const dispatch = useDispatch();
  const isVipUser = useVipUser();

  const upload = useSelector(
    articlesSelectors.getProp('upload'),
  );
  const status = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.CreateArticle),
  );
  const isLoading = status === RequestStatus.REQUEST;

  const onConfirmClick = () => {
    if (!doc) return;
    dispatch(articlesCreate({
      file: doc,
      callback: () => {
      },
    }));
    setDoc(null);
  };

  const onClearClick = () => {
    setDoc(null);
  };

  const timeToUploaded = Math.ceil(Object.values(upload)
    .reduce((sum, item) => sum + item.size, 0) / 1_000_000 / 60);

  return (
    <div className={styles.upload}>
      <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography>
      <div className={styles.upload_wrapper}>
        <div className={styles.upload_dnd_block}>
          <DragNDrop
            doc={doc}
            setDoc={setDoc}
            isDisabled={isVipUser}
          />
        </div>
        <span className={styles.upload_notice}>
          * - name of the file will be displayed on the platform after the
          upload, rename it beforehand if necessary
        </span>
        {doc ? (
          <div className={styles.upload_btn_block}>
            <Button
              className={styles.upload_btns}
              onClick={onConfirmClick}
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button
              className={styles.upload_btns}
              theme="secondary"
              onClick={onClearClick}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        ) : (
          // eslint-disable-next-line
          <>
            {!isMobile && (
              <label
                htmlFor="upload"
                className={cx(styles.upload_btn, {
                  [styles.disabled]: isVipUser,
                })}
              >
                Select a file from local directory
                <input
                  type="file"
                  id="upload"
                  className={styles.upload_input}
                />
              </label>
            )}
          </>
        )}
        <div className={styles.statuses}>
          <Typography
            className={styles.statuses_title}
            type="h4"
          >
            Statuses
          </Typography>
          <div className={styles.statuses_items}>
            <div className={styles.statuses_wrapper}>
              <div className={styles.statuses_content}>
                {Object.values(upload).map(({
                  id, fileName, percentUpload, size, idArticle, 
                }) => (
                  <Item
                    key={id}
                    name={fileName}
                    percents={percentUpload}
                    weight={filesize(size, { standard: 'jedec' })}
                    idArticle={idArticle}
                    timeToUploaded={timeToUploaded}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {' '}
    </div>
  );
};
