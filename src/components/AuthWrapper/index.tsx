import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { privateAILogo } from 'assets';

import styles from './styles.module.scss';

interface AuthWrapperProps {
  className?: string,
  children: ReactNode,
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ 
  className = '', children,
}) => (
  <div className={cx(styles.authWrapper_container, className)}>
    <Image
      src={privateAILogo}
      alt="logo"
    />
    {children}
  </div>
);
