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
  title?: string,
  classNameModal?: string,
  classNameTitle?: string,
  isWarning?: boolean,
  isWithCloseButton?: boolean,
  closeModal: () => void,
};
  
export const ModalBase: FC<ModalBaseProps> = ({
  children, classNameModal = '', title, classNameTitle = '',
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
      {title && (
      <div
        className={cx(styles.header_container)}
      >
        <span className={cx(styles.title, classNameTitle)}>{title}</span>
      </div> 
      )}
      {isWithCloseButton && (
      <ButtonIcon 
        className={cx(styles.buttonClose)} 
        onClick={closeModal} 
        image={closeModalIcon} 
        width={24} 
        height={24}
      />
      )}
      {children} 
    </div>
  </div>
);
