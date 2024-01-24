import React, {
  ChangeEvent, DragEvent, useCallback, useState, FC, useEffect, 
} from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import { documentTextIcon1, uploadIcon } from 'assets';
import { notification } from 'utils';
import { useScreenWidth } from 'hooks';
import { ScreenWidth, docRegex, errorsNotification } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';

import styles from './styles.module.scss';

type DragNDropProps = {
  doc: File | null;
  setDoc: (doc: File | null) => void;
  className?: string;
  isDisabled?: boolean;
  onConfirmClick?: (doc: File | null) => void;
};

export const DragNDropFullPage: FC<DragNDropProps> = ({
  doc, setDoc, className, isDisabled, onConfirmClick,
}) => {
  // eslint-disable-next-line
  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);
  const [isShow, setShow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const userFilledAllInfo = useSelector(profileSelectors.getPropAccountInfo('userFilledAllInfo'));

  const checkFile = useCallback(
    (file: File[] | FileList | null) => {
      if (file && !docRegex.test(file[0]?.name.toLowerCase())) {
        toast.error('Only TXT, DOCX and PDF.');
        return setDoc(null);
      }
      if (!userFilledAllInfo) {
        notification.info({ message: errorsNotification.profileNotFilled });
        return;
      }
      setDoc(file ? file[0] : null);
      if(onConfirmClick) {
        onConfirmClick(file ? file[0] : null);
      }
    },
    [userFilledAllInfo, setDoc],
  );

  const onUploadClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      checkFile(file);
    },
    [checkFile],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files;
      checkFile(file);
      setIsDragging(false);
      setShow(() => false);
    },
    [checkFile],
  );

  const onDragPrevent = (e: DragEvent<HTMLLabelElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  function showDropZone() {
    setShow(() => true);
  }

  useEffect(() => {
    window.addEventListener('dragenter', () => {
      showDropZone();
    });
  }, []);

  return (
    <div
        // htmlFor="upload"
      className={cx(styles.dnd_btn, className, {
        [styles.dragOver]: isDragging,
        [styles.disabled]: isDisabled,
        doc,
      })}
    >
      {/* <Typography
        className={styles.dnd_title}
        type="h4"
      >
        Add a file*
      </Typography>
    */}

      <div className={`${styles.dnd_wrapper} ${isShow ? styles.show : styles.hidden}`}> 
        <label
          className={styles.dnd_content}
          htmlFor="upload"
          onDragOver={onDragPrevent}
          onDragEnter={onDragPrevent}
          onDragLeave={() => {
            setIsDragging(false);
            setShow(false);
          }}
          onDrop={handleDrop}
        >
          {doc ? (
            <span className={styles.dnd_file_name}>{doc.name}</span>
          ) : (
            <p className={styles.dnd_text}>
              <span>
                {/* {isSmallDesktop
                  ? 'Tap to upload your file'
                  : 'Drag and drop your file'} */}
              </span>
            </p>
          )}
          <Image
            src={doc ? documentTextIcon1 : uploadIcon}
            alt="icon"
              // width={40}
            className={styles.dnd_img}
          />
          <input
            type="file"
            id="upload"
            onChange={onUploadClick}
            className={styles.dnd_input}
          />
        </label>
      </div>
      {/* 
      <span className={styles.dnd_notice}>
        * - name of the file will be displayed on the platform after the
        upload, rename it beforehand if necessary
      </span>
      <div className="" style={{ width: '100%' }}>
        {children} */}
      {/* </div> */}
       
      {/* <div className={styles.mock} /> */}
    </div>
  );
};
