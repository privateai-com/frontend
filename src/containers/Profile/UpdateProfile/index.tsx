import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';
import Image from 'next/image';

import { ScreenWidth, imageRegexp } from 'appConstants';
import { Button, TextInput, Typography } from 'components';

import { uploadIcon } from 'assets';
import { useScreenWidth } from 'hooks';
import styles from './styles.module.scss';

export const UpdateProfile = () => {
  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [realName, setRealName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [position, setPosition] = useState('');
  const [researchFields, setResearchFields] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  function checkFile(file: File[] | FileList | null) {
    if (file && !imageRegexp.test(file[0]?.name.toLowerCase())) {
      toast.error('Only JPG, PNG and JPEG.');
      return setAvatar(null);
    }
    setAvatar(file ? file[0] : null);
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

  const onSaveClick = useCallback(() => {
    
  }, []);

  return (
    <div className={styles.create_profile__container}>
      <div className={styles.profile__head}>
        <Typography type="h1">My profile</Typography>
        <Button className={styles.profile__head_button}>Link your wallet</Button>
      </div>
      <div className={cx(styles.wrapper, styles.info)}>
        <label
          htmlFor="upload"
          className={cx(styles.info_upload_btn, {
            [styles.dragOver]: isDragging,
          })}
          onDragOver={() => setIsDragging(true)}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <p>
            {avatar ? 'Uploaded' : (
              <>
                {isSmallDesktop ? 'Tap to upload your profile picture' : 'Upload your profile picture'}
                <span>*</span>
              </>
            )}
          </p>
          <Image
            src={uploadIcon}
            alt="icon"
            className={styles.info_upload_img}
          />
          <input
            type="file"
            id="upload"
            onChange={onUploadClick}
            className={styles.info_upload_input}
            accept="image/png, image/jpg, image/jpeg"
          />
        </label>
        <TextInput
          label="Real name"
          value={realName}
          onChangeValue={setRealName}
          classNameContainer={styles.input__container}
          isRequired
        />
        <TextInput
          label="User name"
          value={username}
          onChangeValue={setUsername}
          classNameContainer={styles.input__container}
        />
        <TextInput
          label="Location (Country and/or City)"
          value={location}
          onChangeValue={setLocation}
          classNameContainer={styles.input__container}
        />
  
        {/* {logoFile && (
                  <div className={styles.upload_file}>
                    <Image
                      src={URL.createObjectURL(logoFile)}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.upload_file_image}
                    />
                    <span>{logoFile?.name}</span>
                  </div>
                )} */}
      </div>
      <div className={cx(styles.wrapper, styles.info2)}>
        <Typography type="h2">Contact information</Typography>
        <TextInput
          label="Email address"
          value={email}
          onChangeValue={setEmail}
          classNameContainer={styles.input__container}
          isRequired
        />
        <TextInput
          label="Social media links"
          value={socialMediaLink}
          onChangeValue={setSocialMediaLink}
          classNameContainer={styles.input__container}
        />
      </div>
      <div className={cx(styles.wrapper, styles.info3)}>
        <Typography type="h2">Field of activity</Typography>
        <TextInput
          label="Organisation/Institute"
          value={organisation}
          onChangeValue={setOrganisation}
          classNameContainer={styles.input__container}
          isRequired
        />
        <TextInput
          label="Position"
          value={position}
          onChangeValue={setPosition}
          classNameContainer={styles.input__container}
          isRequired
        />
        <TextInput
          label="Research fields"
          value={researchFields}
          onChangeValue={setResearchFields}
          classNameContainer={styles.input__container}
          isRequired
        />
      </div>
      <div className={styles.footer}>
        <ul className={styles.footer_list}>
          <li>
            <span>*</span>
            Data owners like to see who they share their data with.
            Fill in as much information as you can to maximize your chances
            of being granted data access upon request.
          </li>
          <li>
            <span>*</span>
            Publishing to Archon requires full user information.
          </li>
        </ul>
        <Button
          theme="secondary"
          className={styles.footer_button}
        >
          Fill in later
        </Button>
        <Button
          className={styles.footer_button}
          onClick={onSaveClick}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
