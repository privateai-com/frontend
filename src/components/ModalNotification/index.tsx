import {
  memo,
} from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode,
  isOpen: boolean,
};

const ModalNotification = memo(({
  children,
  isOpen,
}: ModalProps) => (
  <div
    className={cx(
      styles.modalNot_container,
      isOpen ? styles.visible : styles.hidden,
    )}
  >
    {children}
  </div>
));

export { ModalNotification };
