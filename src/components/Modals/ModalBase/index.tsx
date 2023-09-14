import React, {
  ReactNode,
  FC,
} from 'react';
import cx from 'classnames';
import { ButtonIcon } from 'components';
import { closeModalIcon } from 'assets';
import styles from './styles.module.scss';
  
type ModalBaseProps = {
  children: ReactNode,
  classNameModal?: string,
  isWarning?: boolean,
  isWithCloseButton?: boolean,
  closeModal: () => void,
};
  
export const ModalBase: FC<ModalBaseProps> = ({
  children, classNameModal = '',
  isWarning, isWithCloseButton, closeModal,
}) => (
  <div
    className={cx(styles.outside_container)}
  >
    <div
      className={cx(
        styles.modal_container, 
        {
          [styles.warning]: isWarning,
        },
        classNameModal,
      )}
    >
      {isWithCloseButton && (
        <ButtonIcon 
          className={cx(styles.buttonClose)} 
          onClick={closeModal} 
          image={closeModalIcon}
        />
      )}
      {children} 
    </div>
  </div>
);
