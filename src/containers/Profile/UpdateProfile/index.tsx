import React, {
  ChangeEvent, DragEvent, useCallback, useState, 
} from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';
import Image from 'next/image';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ScreenWidth, imageRegexp } from 'appConstants';
import { Button, TextInput, Typography } from 'components';
import { uploadIcon } from 'assets';
import { useScreenWidth } from 'hooks';
import { RequestStatus } from 'types';

import {
  profileUpdateProfile,
  profileUploadAvatar,
} from 'store/profile/actionCreators';
import {
  ProfileActionTypes,
} from 'store/profile/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo } from 'utils';
import { Footer } from '../Footer';
import styles from './styles.module.scss';

type UpdateProfileProps = {
  isEditProfile: boolean;
  setIsEditProfile: (value: boolean) => void;
};

export const UpdateProfile: React.FC<UpdateProfileProps> = ({
  isEditProfile,
  setIsEditProfile,
}) => {
  const dispatch = useDispatch();
  
  const {
    email,
    id,
    fullName,
    username: usernameOld,
    country,
    city,
    socialLink,
    organization: organizationOld,
    position: positionRedux,
    researchFields: researchFieldsOld,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  const statusUpdate = useSelector(profileSelectors.getStatus(ProfileActionTypes.UpdateProfile));

  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);

  const [avatar, setAvatar] = useState<File | null>();
  const [realName, setRealName] = useState(fullName || '');
  const [username, setUsername] = useState(usernameOld || '');
  const [location, setLocation] = useState(normalizeUserInfo(city, country) || '');
  const [socialMediaLink, setSocialMediaLink] = useState(socialLink || '');
  const [organization, setOrganization] = useState(organizationOld || '');
  const [position, setPosition] = useState(positionRedux || '');
  const [researchFields, setResearchFields] = useState(
    researchFieldsOld || '',
  );
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

  const onSaveClick = useCallback(() => {
    if (avatar) {
      dispatch(
        profileUploadAvatar({
          file: avatar,
        }),
      );
    }

    dispatch(
      profileUpdateProfile({
        city: '',
        username,
        socialLink: socialMediaLink,
        organization,
        researchFields,
        fullName: realName,
        phone: '',
        scientificTitle: '',
        position,
        country: location,
        timeZone: '',
        callback: () => {
          setIsEditProfile(false);
        },
      }),
    );
  }, [avatar, dispatch, location, username, socialMediaLink, 
    organization, researchFields, realName, position, setIsEditProfile]);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files;
    checkFile(file);
  }, []);

  const isDisabled = !realName ||
    !email ||
    !position ||
    !researchFields ||
    !organization;

  return (
    <>
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
            {avatar ? (
              'Uploaded'
            ) : (
              <>
                {isSmallDesktop
                  ? 'Tap to upload your profile picture'
                  : 'Upload your profile picture'}
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
          placeholder={username || `Archonaut#${id}`}
        />
        <TextInput
          label="Location (Country and/or City)"
          value={location}
          onChangeValue={setLocation}
          classNameContainer={styles.input__container}
          placeholder="e.g., London, UK"
        />
      </div>
      <div className={cx(styles.wrapper, styles.info2)}>
        <Typography type="h2">Contact information</Typography>
        <div className={styles.info__email_block}>
          <div className={styles.info__email_title}>
            Email address
            <span>*</span>
          </div>
          <div>{email}</div>
        </div>
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
          value={organization}
          onChangeValue={setOrganization}
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
        <Footer isEditProfile={isEditProfile} />
        <div className={styles.button_block}>
          <Button
            theme="secondary"
            className={styles.button}
            onClick={() => setIsEditProfile(false)}
          >
            Fill in later
          </Button>
          <Button
            className={styles.button}
            onClick={onSaveClick}
            isLoading={statusUpdate === RequestStatus.REQUEST}
            disabled={isDisabled}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
