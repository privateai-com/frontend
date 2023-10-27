import {
  FC,
} from 'react';
import { useModal } from 'react-modal-hook';

import {
  Button,
  Requester,
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
  owner,
  status,
} = {
  name: 'Newest breakthroughs in gene therapy',
  field: 'Gene therapy',
  availability: 'Permission based',
  created: '20 May 2023',
  modified: '20 May 2023',
  dataSize: '345 MB',
  accessRequests: '2',
  sharedUser: '5',
  owner: 'Dave Johns',
  status: 'Permission required',
};

interface FileInfoProps {
  onEditClick: () => void;
  isVipUser: boolean;
}

export const FileInfo: FC<FileInfoProps> = ({ onEditClick, isVipUser }) => {
  const [showRequester, hideRequester] = useModal(
    () => (
      <Requester
        avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
        name="John Doe"
        contry="London, UK (GMT +0)"
        organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
        position="Head of neurosurgery laboratory"
        fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
        socialMedia="https:/facebook.com/profile"
        onCloseModal={() => {
          hideRequester();
        }}
      />
    ),
    [],
  );
  return (
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
          {isVipUser && (
            <div className={styles.storageFile__item}>
              Owner: 
              <button onClick={showRequester} className={styles.storageFile__item_button}>
                {owner}
              </button>
            </div>
          )}
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
            {isVipUser ? (
              <div className={styles.storageFile__item_info}>
                Status
                <span>{status}</span>
              </div>
            ) : (
              <>
                <div className={styles.storageFile__item_info}>
                  Pending access requests
                  <span>{accessRequests}</span>
                </div>
                <div className={styles.storageFile__item_info}>
                  Shared with
                  <span>{`${sharedUser} users`}</span>
                </div>
              </>
            )}
          </div>
        </div> 
      </div>
      <div className={styles.storageFile__buttons}>
        <Button theme="secondary" onClick={onEditClick}>Edit</Button>
        <Button>Publish</Button>
      </div>
    </>
  );
};
