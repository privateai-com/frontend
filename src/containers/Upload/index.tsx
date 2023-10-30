import { Button, Typography } from 'components';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { articlesCreateArticle } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';
import { data } from './data';

export const Upload = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const dispatch = useDispatch();

  const status = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.CreateArticle),
  );
  const isLoading = status === RequestStatus.REQUEST;

  const onConfirmClick = () => {
    if (!doc) return;
    dispatch(articlesCreateArticle({
      file: doc,
      callback: () => {
        setDoc(null);
      },
    }));
  };

  const onClearClick = () => {
    setDoc(null);
  };

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
                className={styles.upload_btn}
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
                {data.map(({
                  id, name, percents, weight, 
                }) => (
                  <Item
                    key={id}
                    name={name}
                    percents={percents}
                    weight={weight}
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
