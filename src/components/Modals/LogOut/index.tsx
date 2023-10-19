import { Button } from 'components/Button';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { routes } from 'appConstants';
import { authLogout } from 'store/auth/actionCreators';

type LogOutProps = {
  onClose: () => void;
};

export const LogOut: React.FC<LogOutProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const callback = useCallback(() => {
    router.push(routes.home.root);
  }, [router]);

  const onClickLogout = useCallback(() => {
    dispatch(authLogout({ callback }));
  }, [callback, dispatch]);

  return (
    <ModalWithLogo onClose={onClose}>
      <div className={styles.logout}>
        <div className={styles.logout__title}>
          Are you sure you want to to sign out of your account?
        </div>
        <div className={styles.logout__btn_block}>
          <Button
            className={styles.logout__btn}
            onClick={onClickLogout}
          >
            Confirm
          </Button>
          <Button
            className={styles.logout__btn}
            onClick={onClose}
            theme="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </ModalWithLogo>
  );
};
