import { useScreenWidth } from 'hooks';
import { ScreenWidth, docRegex } from 'appConstants';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { documentTextIcon1, uploadIcon } from 'assets';
import cx from 'classnames';
import { Typography } from 'components';
import styles from './styles.module.scss';

const DragNDrop = () => {
  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);
  const [doc, setDoc] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function checkFile(file: File[] | FileList | null) {
    if (file && !docRegex.test(file[0]?.name.toLowerCase())) {
      toast.error('Only TXT, DOCX and PDF.');
      return setDoc(null);
    }
    setDoc(file ? file[0] : null);
  }

  const onUploadClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    checkFile(file);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files;
    checkFile(file);
  }, []);

  return (
    <label
      htmlFor="upload"
      className={cx(styles.dnd_btn, {
        [styles.dragOver]: isDragging,
      })}
      onDragOver={() => setIsDragging(true)}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Typography
        className={styles.dnd_title}
        type="h4"
      >
        Add a file
      </Typography>

      <div className={styles.dnd_content}>
        <p className={styles.dnd_text}>
          {doc ? (
            doc.name
          ) : (
            <span>
              {isSmallDesktop
                ? 'Tap to upload your file'
                : 'Drag and drop your file'}
            </span>
          )}
        </p>
        <Image
          src={doc ? documentTextIcon1 : uploadIcon}
          alt="icon"
          className={styles.dnd_img}
        />
        <input
          type="file"
          id="upload"
          onChange={onUploadClick}
          className={styles.dnd_input}
        />
      </div>

      <div className={styles.mock}></div>
    </label>
  );
};

export { DragNDrop };
