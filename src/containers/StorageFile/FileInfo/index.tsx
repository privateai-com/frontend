import {
  FC,
} from 'react';

import {
  Button,
  Typography,
} from 'components';

import styles from './styles.module.scss';

const {
  name,
  field,
  availability,
  created,
  modified,
  dataSize,
  accessRequests,
  sharedUser,
} = {
  name: 'Newest breakthroughs in gene therapy',
  field: 'Gene therapy',
  availability: 'Permission based',
  created: '20 May 2023',
  modified: '20 May 2023',
  dataSize: '345 MB',
  accessRequests: '2',
  sharedUser: '5',
};

interface FileInfoProps {
  onEditClick: () => void;
}

export const FileInfo: FC<FileInfoProps> = ({ onEditClick }) => (
  <>
    <div className={styles.storageFile__file}>
      <Typography type="h1">File information</Typography>
      <div className={styles.storageFile__wrapper}>
        <div className={styles.storageFile__item}>
          File name:
          <span>{name}</span>
        </div>
        <div className={styles.storageFile__item}>
          Field: 
          <span>
            {field}
          </span>
        </div>
        <div className={styles.storageFile__item}>
          Availability : 
          <span>
            {availability}
          </span>
        </div>
        <div className={styles.storageFile__item_wrapper}>
          <div className={styles.storageFile__item_date}>
            <div className={styles.storageFile__item_date_item}>
              Created
              <span>{created}</span>
            </div>
            <div className={styles.storageFile__item_date_item}>
              Modified
              <span>{modified}</span>
            </div>
            <div className={styles.storageFile__item_date_item}>
              Data Size
              <span>{dataSize}</span>
            </div>
          </div>
          <div className={styles.storageFile__item_info}>
            Pending access requests
            <span>{accessRequests}</span>
          </div>
          <div className={styles.storageFile__item_info}>
            Shared with
            <span>{`${sharedUser} users`}</span>
          </div>
        </div>
      </div> 
    </div>
    <div className={styles.storageFile__buttons}>
      <Button theme="secondary" onClick={onEditClick}>Edit</Button>
      <Button>Publish</Button>
    </div>
  </>
);
