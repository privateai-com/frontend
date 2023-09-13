import React, {
  FC,
} from 'react';
import { ModalBase } from 'components';
import styles from './styles.module.scss';
    
type NotificationProps = {
  description?: string,
  onCloseModal: () => void,
};
    
export const Notification: FC<NotificationProps> = ({
  description = 'Wrong network, please, select Polygon blockchain.',
  onCloseModal,
}) => (
  <ModalBase
    isWithCloseButton
    title="Notification!"
    classNameModal={styles.modal}
    closeModal={onCloseModal}
  >
    <div className={styles.description}>
      {description} 
    </div>
  </ModalBase>
);
