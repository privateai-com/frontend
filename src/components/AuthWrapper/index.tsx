import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { arrowIcon, privateAILogo } from 'assets';
import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

interface AuthWrapperProps {
  className?: string,
  children: ReactNode,
  onClickBack?: () => void;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ 
  className = '', children, onClickBack,
}) => (
  // <div className="" style={{paddingTop: 100, paddingBottom:100}}>


  
  <div className={cx(styles.authWrapper_container, className)}>
    {onClickBack && (
      <ButtonIcon
        onClick={onClickBack}
        image={arrowIcon}
        className={styles.button}
      />
    )}
    {/* <Image
      src={privateAILogo}
      alt="logo"
    /> */}
    {children}
  </div>
  // </div>
);
