import { FC } from 'react';
import { Button } from 'components';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';

type EditProfileConfirmProps = {
  onCloseModal: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const EditProfileConfirm: FC<EditProfileConfirmProps> = ({
  onCloseModal, onConfirm,
  isLoading,
}) => (
  <ModalWithLogo
    onClose={onCloseModal}
    classNameModal={styles.modal}
  >
    <div className={styles.body}>
      <span className={styles.text}>
        You have not filled necessary fields,
        so you will not be able to upload files to the system.
      </span>
      <span className={styles.text}>
        Click on the “Save” button once again if you want
        to continue or enter the rest of the information.
      </span>
      <div className={styles.buttons}>
        <Button
          className={styles.confirm}
          onClick={onCloseModal}
        >
          Back to editing
        </Button>
        <Button
          className={styles.cancel}
          onClick={onConfirm}
          isLoading={isLoading}
          theme="secondary"
        >
          Save
        </Button>
      </div>
    </div>
  </ModalWithLogo>
);
