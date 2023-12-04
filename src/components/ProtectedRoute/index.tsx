import React, { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks';
import { Loader } from 'components';

import styles from './styles.module.css';

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuth = useAuth();

  useEffect(() => {
    // Check if the user is authenticated, redirect to login if not.
    if (!isAuth) {
      router.push('/login'); // Redirect to the login page.
    }
  }, [isAuth, router]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isAuth ? <>{children}</> : (
    <div className={styles.container}>
      <Loader size={64} />
    </div>
  );
};
