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
  profileDeleteWallet,
  profileLinkWallet,
  profileUpdateProfile,
  profileUploadAvatar,
} from 'store/profile/actionCreators';
import {
  ProfileActionTypes,
} from 'store/profile/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo, notification, stringLongShortcut } from 'utils';
import { metamaskConnect } from 'store/metamask/actionCreators';
import { Footer } from '../Footer';
import styles from './styles.module.scss';
import commonStyles from '../common.module.scss';
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
    avatarUrl,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  const statusUpdate = useSelector(profileSelectors.getStatus(ProfileActionTypes.UpdateProfile));

  const isSmallDesktop = useScreenWidth(ScreenWidth.notebook1024);

  const [avatar, setAvatar] = useState<File | null>();
  // eslint-disable-next-line
  const [avatarURI, setAvatarURI] = useState(avatarUrl);
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
      fullName: username,
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

  const isMobile = useScreenWidth(ScreenWidth.bigMobile); 

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
      file: {
        file: avatar,
        avatarUrl,
      },
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
      const errorMessages = res.error.errors.map((error) => error.message.trim()).filter(Boolean);

      if (errorMessages?.length) {
        const combinedErrors = errorMessages.join(', ');
        notification.info({ message: combinedErrors });
      }
    }
  }, [
    avatar, username, socialMediaLink, organization, researchFields,
    realName, position, location, avatarUrl, saveData, showEditProfileConfirm]);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files;
    checkFile(file);
  }, []);

  const onLinkWalletClick = useCallback(() => {
    dispatch(metamaskConnect({
      callback: () => {
        dispatch(profileLinkWallet());
      },
    }));
  }, [dispatch]);

  const onDisconnectLinkWalletClick = useCallback(() => {
    dispatch(profileDeleteWallet());
  }, [dispatch]);

  const walletAddress = useSelector(profileSelectors.getPropAccountInfo('walletAddress'));

  const statusDeleteWallet = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.DeleteWallet),
  );

  const isDeleteLoading = statusDeleteWallet === RequestStatus.REQUEST;

  return (
    <div className={styles.itemWrap}>
      <div className={styles.short_col}>
        <div className={cx(styles.wrapper, styles.info)}>
            
          <div className={styles.containerAvatar}>
            {avatarURI && avatarURI !== '' && !avatar && (
              <label htmlFor="upload" className={styles.info_avatar}>
                <Image
                  src={avatarURI}
                  alt=""
                  className={styles.info_avatar}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </label>
            )}
            {!avatar && !avatarURI && avatarURI === '' && (
              <label htmlFor="upload">
                <div className={styles.no_avatar} />
              </label>
            )}
                
            {avatar && (
            <label htmlFor="upload">
              <Image
                src={URL.createObjectURL(avatar)}
                alt="icon"
                width={350}
                height={350}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                      // fill
                className={styles.info_avatar}
              />
            </label>
            )}
          </div>
          <div className={styles.info_uploadBtns}>
            <label htmlFor="upload" className={styles.uploadBtn}>
              
              {/* <Button theme='secondary'> */}
              Upload new picture
              <input
                style={{
                  position: 'absolute', 
                  opacity: 0,
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
                type="file"
                id="upload"
                onChange={onUploadClick}
                className={styles.info_upload_input}
                accept="image/png, image/jpg, image/jpeg"
              />
              {/* </Button> */}
            </label>
            {/* <Button onClick={()=>{setAvatar(null); setAvatarURI('')}} 
              className={styles.uploadBtn} theme='secondary'>
                Delete
              </Button> */}
          </div>

          <div className={styles.info_wrapper}>
            <div className={styles.info_item}>
              <Typography type="h4">
                Real name/User name
                <span>*</span>
              </Typography>
              <TextInput
                value={username}
                onChangeValue={setUsername}
                classNameContainer={styles.input__container}
                classNameLabel={commonStyles.h3_style_gray}
                placeholder={username || `Archonaut#${id}`}
                isError={validation?.error ? !!validation?.error['username'] : false}
              />
              <Typography type="h4">
                Location (Country and/or City)
                <span>*</span>
              </Typography>
              <TextInput
                value={location}
                onChangeValue={setLocation}
                classNameContainer={styles.input__container}
                classNameLabel={commonStyles.h3_style_gray}
                placeholder="e.g., London, UK"
                isError={validation?.error ? !!validation?.error['country'] : false}
              />
            </div>
          </div>
        </div>
        {!isMobile && 
          <Footer isEditProfile={false} className={styles.footer} />}
      </div>
      <div className={styles.long_col}>
        <div className={cx(styles.wrapper, styles.walletWrap)}>
          <div className={styles.walletInner}>
            <div className={cx(styles.walletInfoCol, styles.info_item)}>
              <h4 className={commonStyles.h4_style}>
                Linked Wallet
              </h4>
              {walletAddress && (
                <p className={commonStyles.p_text}>
                  {stringLongShortcut(walletAddress, 7, 5)}
                </p>
              )}
            </div>
              
            {/* <Button
                  theme='secondary'
                  className={styles.profile__head_button}
                  isLoading={false}
                  disabled={false}
                >
                  Link your wallet
              </Button> */}

            {walletAddress ? (
              <Button
                className={styles.profile__head_button}
                theme="secondary"
                onClick={onDisconnectLinkWalletClick}
                isLoading={isDeleteLoading}
              >
                Disconnect wallet
              </Button>
            ) : (
              <Button
                className={styles.profile__head_button}
                onClick={onLinkWalletClick}
                isLoading={statusUpdate === RequestStatus.REQUEST}
                disabled={isMobile}
              >
                Link your wallet
              </Button>
            )}
          </div>
            
          {/* Connect wallet */}
        </div>
        <div className={cx(styles.wrapper, styles.info2)}>
          <h2 className={commonStyles.h2_style}>
            Contact information
          </h2>
          <div className={styles.info_item}>
            <h3 className={commonStyles.h3_style_gray}>
              Email address *
            </h3>
            <div className={commonStyles.p_text}>
              {email}
            </div>
            
          </div>
          <div className={styles.info_item}>
            <h3 className={commonStyles.h3_style_gray}>
              Social media *
            </h3>            
          </div>
          <TextInput
            value={socialMediaLink}
            onChangeValue={setSocialMediaLink}
            classNameContainer={styles.input__container}
            classNameLabel={commonStyles.h3_style_gray}
            isError={validation?.error ? !!validation?.error['socialLink'] : false}
            placeholder="https://"
          />
        </div>
        <div className={cx(styles.wrapper, styles.info3)}>
          <h2 className={commonStyles.h2_style}>
            Field of activity
          </h2>
          <div className={styles.info_item}>
            <h3 className={commonStyles.h3_style_gray}>
              Organisation/Institute *
            </h3>
              
          </div>
          <TextInput
            placeholder="e.g., London Institute of Medical Sciences"
            value={organization}
            onChangeValue={setOrganization}
            classNameContainer={styles.input__container}
            classNameLabel={commonStyles.h3_style_gray}
            isRequired
            isError={validation?.error ? !!validation?.error['organization'] : false}
          />
          <div className={styles.info_item}>
            <h3 className={commonStyles.h3_style_gray}>
              Position *
            </h3>
          </div>
          <TextInput
            value={position}
            onChangeValue={setPosition}
            classNameContainer={styles.input__container}
            classNameLabel={commonStyles.h3_style_gray}
            isRequired
            isError={validation?.error ? !!validation?.error['position'] : false}
          />
          <div className={styles.info_item}>
            <h3 className={commonStyles.h3_style_gray}>
              Research fields *
            </h3>
          </div>
          <TextInput
            value={researchFields}
            onChangeValue={setResearchFields}
            classNameContainer={styles.input__container}
            classNameLabel={commonStyles.h3_style_gray}
            isRequired
            isError={validation?.error ? !!validation?.error['researchFields'] : false}
          />
          <div className={styles.btnWrap}>
         
            <Button
              theme="secondary"
              onClick={callbackLater}
            >
              Fill in later
            </Button>
            <Button
              className={styles.filledBtn}
              onClick={onSaveClick}
              isLoading={statusUpdate === RequestStatus.REQUEST}
            >
              Save
            </Button>
          </div>
        </div>
        {isMobile && 
          <Footer isEditProfile={false} className={styles.footer} />}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.itemWrap}>
        <div className={styles.short_col}>
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
                <p className={commonStyles.accent_text}>
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
              // classNameLabel={styles.labelInput}
              classNameLabel={commonStyles.h3_style_gray}
              isRequired
              isError={validation?.error ? !!validation?.error['fullName'] : false}
            />
            <TextInput
              label="User name"
              value={username}
              onChangeValue={setUsername}
              classNameContainer={styles.input__container}
              // classNameLabel={styles.labelInput}
              classNameLabel={commonStyles.h3_style_gray}
              placeholder={username || `Archonaut#${id}`}
              isError={validation?.error ? !!validation?.error['username'] : false}
            />
            <TextInput
              label="Location (Country and/or City)"
              value={location}
              onChangeValue={setLocation}
              classNameContainer={styles.input__container}
              // classNameLabel={styles.labelInput}
              classNameLabel={commonStyles.h3_style_gray}
              placeholder="e.g., London, UK"
              isError={validation?.error ? !!validation?.error['country'] : false}
            />
          </div>
        </div>
        <div className={styles.long_col}>
          <div className={cx(styles.wrapper, styles.info2)}>
            <h2 className={commonStyles.h2_style}>Contact information</h2>
            {/* <Typography type="h2">Contact information</Typography> */}
            
            <div className={styles.info__email_block}>
              {/* <div className={styles.info__email_title}>
                Email address
                <span>*</span>
              </div> */}
              <h3 className={commonStyles.h3_style_gray}>
                Email address *
              </h3>
              <div className={commonStyles.p_text}>{email}</div>
            </div>
            <TextInput
              label="Social media"
              value={socialMediaLink}
              onChangeValue={setSocialMediaLink}
              classNameContainer={styles.input__container}
              classNameLabel={commonStyles.h3_style_gray}
              isError={validation?.error ? !!validation?.error['socialLink'] : false}
              placeholder="https://"
            />
          </div>
          <div className={cx(styles.wrapper, styles.info3)}>
            {/* <Typography type="h2">Field of activity</Typography> */}
            <h2 className={commonStyles.h2_style}>Field of activity</h2>
            <TextInput
              label="Organisation/Institute"
              placeholder="e.g., London Institute of Medical Sciences"
              value={organization}
              onChangeValue={setOrganization}
              classNameContainer={styles.input__container}
              classNameLabel={commonStyles.h3_style_gray}
              isRequired
              isError={validation?.error ? !!validation?.error['organization'] : false}
            />
            <TextInput
              label="Position"
              value={position}
              onChangeValue={setPosition}
              classNameContainer={styles.input__container}
              classNameLabel={commonStyles.h3_style_gray}
              isRequired
              isError={validation?.error ? !!validation?.error['position'] : false}
            />
            <TextInput
              label="Research fields"
              value={researchFields}
              onChangeValue={setResearchFields}
              classNameContainer={styles.input__container}
              classNameLabel={commonStyles.h3_style_gray}
              isRequired
              isError={validation?.error ? !!validation?.error['researchFields'] : false}
            />
          </div>

        </div>
      </div>
    
      <div className={styles.footer}>
        <Footer isEditProfile />
        <div className={styles.button_block}>
          {/* <Button
            theme="secondary"
            className={styles.button}
            onClick={callbackLater}
          >
            Fill in later
          </Button> */}

          <div className={styles.btnWrap}>
         
            <Button
              onClick={callbackLater}
            >
              Fill in later
            </Button>
            <Button
              className={styles.filledBtn}
              onClick={onSaveClick}
              isLoading={statusUpdate === RequestStatus.REQUEST}
            >
              Save
            </Button>
          </div>
          {/* <Button
            className={styles.button}
            onClick={onSaveClick}
            isLoading={statusUpdate === RequestStatus.REQUEST}
          >
            Save
          </Button> */}
        </div>
      </div>
    </>
  );
};
