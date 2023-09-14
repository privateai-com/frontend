import React, { FC } from 'react';
import Image from 'next/image';

import {
  ModalBase,
  Typography, 
} from 'components';
import { documentTextIcon, searchDocumentIcon } from 'assets';

import styles from './styles.module.scss';
      
type ProfileSuccessProps = {
  onClickCancel: () => void,
  onClickUpload: () => void,
  onClickBrowse: () => void,
};
      
export const ProfileSuccess: FC<ProfileSuccessProps> = ({
  onClickCancel, onClickUpload, onClickBrowse,
}) => (
  <ModalBase
    isWithCloseButton
    classNameModal={styles.modal}
    closeModal={onClickCancel}
  >
    <Typography type="h3">
      Congratulations! Your PRIVATEAI account is ready,
      and you can proceed to explore the features and functionalities offered by the platform.
    </Typography>
    <Typography type="h2">What do you want to do?</Typography>
    <div className={styles.buttons_wrapper}>
      <button onClick={onClickUpload}>
        Upload my data
        <Image
          src={documentTextIcon}
          alt="button icon"
        />
      </button>
      <button onClick={onClickBrowse}>
        Browse PRIVATEAI data
        <Image
          src={searchDocumentIcon}
          alt="button icon"
        />
      </button>
    </div>
  </ModalBase>
);
