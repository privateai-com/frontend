import cx from 'classnames';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Button, Typography } from 'components';
import { profileGetProfile } from 'store/profile/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo } from 'utils';
import styles from './styles.module.scss';
import commonStyles from '../common.module.scss';
import { Footer } from '../Footer';
import { ButtonTransparent } from 'components/ButtonTransparent';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { requestSetState } from 'store/request/actionCreators';

export const ProfileInfo = () => {
  const dispatch = useDispatch();


  const isMobile = useScreenWidth(ScreenWidth.bigMobile); 

  useEffect(() => {
    dispatch(profileGetProfile());
  }, [dispatch]);


  useEffect(() => () => {
    if (isMobile) dispatch(requestSetState({ requestsToMe: [] }));
  }, [dispatch, isMobile]);

  const {
    avatarUrl,
    username,
    fullName,
    country,
    city,
    email,
    socialLink,
    organization,
    position,
    researchFields,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  return (
    <>
      <div className={styles.itemWrap}>
        <div className={styles.short_col}>
          <div className={cx(styles.wrapper, styles.info)}>
            <div className={styles.containerAvatar}>
              {avatarUrl && avatarUrl !== '' ? (
                <div className={styles.info_avatar}>
                  <Image
                    src={avatarUrl}
                    alt=""
                    className={styles.info_avatar}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className={styles.no_avatar} />
              )}
            </div>
            <div className={styles.info_wrapper}>
              <div className={styles.info_item}>
                {/* <Typography type="h4">
                  User name/Real name 
                  {' '}
                  <span>*</span>
                </Typography> */}
                <h3 className={commonStyles.h3_style_gray} >
                  User name/Real name 
                </h3>
                <h2 className={commonStyles.h2_style}>
                  {normalizeUserInfo(username)}
                </h2>

                {/* <Typography type="h5">
                  {normalizeUserInfo(fullName, username)}
                </Typography> */}
              </div>
              <div className={styles.info_item}>
                {/* <Typography type="h4">Location (Country and/or City)</Typography> */}
                {/* {normalizeUserInfo(city, country)} */}
                
                <h3 className={commonStyles.h3_style_gray} >
                Location (Country and/or City)
                </h3>
                <p className={commonStyles.p_text} >
                  {normalizeUserInfo(city, country)}
                </p>
                {/* <Typography type="h5">
                  {normalizeUserInfo(city, country)}
                </Typography> */}
              </div>
            </div>
          </div>
          {!isMobile && 
          <Footer isEditProfile={false} className={styles.footer} />}
        </div>
        <div className={styles.long_col}>
          <div className={cx(styles.wrapper, styles.walletWrap)}>
            <div className={styles.walletInner}>
              <div className={cx(styles.walletInfoCol,styles.info_item)}>
                <h4 className={commonStyles.h4_style} >
                  Linked Wallet
                </h4>
                <p className={commonStyles.p_text} >
                KL1s22d1330032d1806...564
                </p>
              </div>
              
              <Button
                  theme='secondary'
                  className={styles.profile__head_button}
                  // onClick={onLinkWalletClick}
                  isLoading={false}
                  // isLoading={status === RequestStatus.REQUEST}
                  // disabled={isMobile}
                  disabled={false}
                >
                  Link your wallet
              </Button>
            </div>
            
            {/* Connect wallet */}
          </div>
          <div className={cx(styles.wrapper, styles.info2)}>
            <h2 className={commonStyles.h2_style}>
              Contact information
            </h2>
            {/* <Typography type="h2" className={styles.subTitle}>Contact information</Typography> */}
            <div className={styles.info_item}>
              <h3 className={commonStyles.h3_style_gray}>
                Email address *
                {/* {' '}
                <span>*</span> */}
              </h3>
              {/* <Typography type="h4">
                Email address 
                {' '}
                <span>*</span>
              </Typography> */}
              <div className={commonStyles.p_text}>
                {email}
              </div>
            
            </div>
            <div className={styles.info_item}>
              <h3 className={commonStyles.h3_style_gray}>
                Social media *
                  {/* {' '}
                  <span>*</span> */}
              </h3>
              {/* <Typography type="h4">Social media</Typography> */}
              <div className={cx(commonStyles.link_style)}>
                {/* map of socials */}
                {socialLink}
              </div>
      
            </div>
          </div>
          <div className={cx(styles.wrapper, styles.info3)}>
            {/* <Typography type="h2" className={styles.subTitle}>Field of activity</Typography> */}
            <h2 className={commonStyles.h2_style}>
              Field of activity
            </h2>
            <div className={styles.info_item}>
              {/* <Typography type="h4">
                Organisation/Institute 
                {' '}
                <span>*</span>
              </Typography> */}
              <h3 className={commonStyles.h3_style_gray}>
                Organisation/Institute *
                  {/* {' '}
                  <span>*</span> */}
              </h3>
              <div className={commonStyles.p_text}>
                {organization}
              </div>
              
            </div>
            <div className={styles.info_item}>
              {/* <Typography type="h4">
                Position 
                {' '}
                <span>*</span>
              </Typography> */}
              <h3 className={commonStyles.h3_style_gray}>
              Position *
                  {/* {' '}
                  <span>*</span> */}
              </h3>
              <div className={commonStyles.p_text}>
                {position}
              </div>
              {/* {position} */}
            </div>
            <div className={styles.info_item}>
              {/* <Typography type="h4">
                Research fields 
                {' '}
                <span>*</span>
              </Typography> */}
              <h3 className={commonStyles.h3_style_gray}>
                Research fields *
                  {/* {' '}
                  <span>*</span> */}
              </h3>
              <div className={commonStyles.p_text}>
                {researchFields}
              </div>
              {/* {researchFields} */}
            </div>
          </div>
          {isMobile && 
          <Footer isEditProfile={false} className={styles.footer} />}
        </div>
      </div>
    
    </>
  );
};
