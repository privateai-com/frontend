import { FC } from 'react';
import { Button } from 'components';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';

type RevokeAPIKeyProps = {
  onCloseModal: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const RevokeAPIKey: FC<RevokeAPIKeyProps> = ({
  onCloseModal,
  onConfirm,
  isLoading,
}) => (
  <ModalWithLogo
    onClose={onCloseModal}
  >
    <div className={styles.body}>
      <span className={styles.title}>
        Revoke API key?
      </span>
      <span className={styles.description}>
        You are about to revoke your API key. 
        You will not be able to use it anymore.
        Are you sure you want to proceed?
      </span>
      <div className={styles.buttons}>
        <Button
          className={styles.confirm}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Confirm
        </Button>
        <Button
          className={styles.cancel}
          onClick={onCloseModal}
          theme="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  </ModalWithLogo>
);
