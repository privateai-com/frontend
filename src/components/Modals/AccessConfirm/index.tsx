import { FC } from 'react';
import { Button } from 'components';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';

type AccessConfirmProps = {
  onCloseModal: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const AccessConfirm: FC<AccessConfirmProps> = ({
  onCloseModal, onConfirm,
  isLoading,
}) => (
  <ModalWithLogo
    onClose={onCloseModal}
  >
    <div className={styles.body}>
      <span className={styles.title}>
        Are you sure you want to request access to this file?
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
