import React, {
  ChangeEvent, DragEvent, useCallback, useState, 
} from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import cx from 'classnames';
import Image from 'next/image';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ScreenWidth, imageRegexp } from 'appConstants';
import {
  Button, TextInput, Typography, EditProfileConfirm, 
} from 'components';
import { uploadIcon } from 'assets';
import { useScreenWidth } from 'hooks';
import { RequestStatus } from 'types';
import { useModal } from 'react-modal-hook';

import {
  profileUpdateProfile,
  profileUploadAvatar,
} from 'store/profile/actionCreators';
import {
  ProfileActionTypes,
} from 'store/profile/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo, notification } from 'utils';
import { Footer } from '../Footer';
import styles from './styles.module.scss';
import { UserSchema } from './schema';

type UpdateProfileProps = {
  callbackLater: () => void;
  callbackSuccess: () => void;
};

export const UpdateProfile: React.FC<UpdateProfileProps> = ({
  callbackLater,
  callbackSuccess,
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
  const [username, setUsername] = useState(usernameOld ?? '');
  const [location, setLocation] = useState(normalizeUserInfo(city, country) || '');
  const [socialMediaLink, setSocialMediaLink] = useState(socialLink || '');
  const [organization, setOrganization] = useState(organizationOld || '');
  const [position, setPosition] = useState(positionRedux || '');
  const [researchFields, setResearchFields] = useState(
    researchFieldsOld || '',
  );
  const [isDragging, setIsDragging] = useState(false);
  const [validation, setValidation] = useState<{ 
    success: boolean, 
    error: z.ZodFormattedError<z.infer<typeof UserSchema>, string> | null 
  }>({ success: true, error: null });

  const updateProfile = useCallback((callback?: () => void) => {
    const data = {
      username,
      socialLink: socialMediaLink,
      organization,
      researchFields,
      fullName: realName,
      position,
      country: location,
    };

    dispatch(
      profileUpdateProfile({
        ...data,
        callback: () => {
          callbackSuccess();
          if (callback) callback();
        },
      }),
    );
  }, [
    callbackSuccess, dispatch, location, organization, position,
    realName, researchFields, socialMediaLink, username,
  ]);

  const saveData = useCallback((callback?: () => void) => {
    if (avatar) {
      dispatch(
        profileUploadAvatar({
          file: avatar,
          successCallback: () => updateProfile(callback),
        }),
      );
      return;
    }

    updateProfile(callback);
  }, [avatar, dispatch, updateProfile]);

  const [showEditProfileConfirm, hideEditProfileConfirm] = useModal(() => (
    <EditProfileConfirm 
      onCloseModal={hideEditProfileConfirm}
      isLoading={statusUpdate === RequestStatus.REQUEST}
      onConfirm={() => {
        saveData(hideEditProfileConfirm);
      }} 
    />
  ), [statusUpdate, saveData]);

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
    const data = {
      file: avatar,
      username,
      socialLink: socialMediaLink,
      organization,
      researchFields,
      fullName: realName,
      position,
      country: location,
    };
    const res = UserSchema.safeParse(data);
    setValidation({
      success: res.success,
      error: !res.success ? res.error.format() : null,
    });

    if (res.success) {
      saveData();
    } else {
      showEditProfileConfirm();
      const errorMessages = res.error.errors.map((error) => error.message);
      const combinedErrors = errorMessages.join(', ');
      notification.info({ message: combinedErrors });
    }
  }, [avatar, username, socialMediaLink, organization, 
    researchFields, realName, position, location, saveData, showEditProfileConfirm]);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files;
    checkFile(file);
  }, []);

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
          {avatar ? (
            <Image
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className={styles.avatar}
              width={350}
              height={350}
                // fill
              style={{ objectFit: 'cover' }}
            /> 
          ) : (
            <p>
              {isSmallDesktop
                ? 'Tap to upload your profile picture'
                : 'Upload your profile picture'}
              <span>*</span>
            </p>
          )}
          {!avatar && (
            <>
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
            </>
          )}
        </label>
        <TextInput
          label="Real name"
          value={realName}
          onChangeValue={setRealName}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          isRequired
          isError={validation?.error ? !!validation?.error['fullName'] : false}
        />
        <TextInput
          label="User name"
          value={username}
          onChangeValue={setUsername}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          placeholder={username || `Archonaut#${id}`}
          isError={validation?.error ? !!validation?.error['username'] : false}
        />
        <TextInput
          label="Location (Country and/or City)"
          value={location}
          onChangeValue={setLocation}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          placeholder="e.g., London, UK"
          isError={validation?.error ? !!validation?.error['country'] : false}
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
          label="Social media"
          value={socialMediaLink}
          onChangeValue={setSocialMediaLink}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          isError={validation?.error ? !!validation?.error['socialLink'] : false}
          placeholder="https://"
        />
      </div>
      <div className={cx(styles.wrapper, styles.info3)}>
        <Typography type="h2">Field of activity</Typography>
        <TextInput
          label="Organisation/Institute"
          placeholder="e.g., London Institute of Medical Sciences"
          value={organization}
          onChangeValue={setOrganization}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          isRequired
          isError={validation?.error ? !!validation?.error['organization'] : false}
        />
        <TextInput
          label="Position"
          value={position}
          onChangeValue={setPosition}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          isRequired
          isError={validation?.error ? !!validation?.error['position'] : false}
        />
        <TextInput
          label="Research fields"
          value={researchFields}
          onChangeValue={setResearchFields}
          classNameContainer={styles.input__container}
          classNameLabel={styles.labelInput}
          isRequired
          isError={validation?.error ? !!validation?.error['researchFields'] : false}
        />
      </div>
      <div className={styles.footer}>
        <Footer isEditProfile />
        <div className={styles.button_block}>
          <Button
            theme="secondary"
            className={styles.button}
            onClick={callbackLater}
          >
            Fill in later
          </Button>
          <Button
            className={styles.button}
            onClick={onSaveClick}
            isLoading={statusUpdate === RequestStatus.REQUEST}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
