import React, {
  FormEvent,
  ReactNode,
  useCallback, useEffect, useRef, useState,
} from 'react';
import cx from 'classnames';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from 'react-modal-hook';

import {
  ButtonIcon, 
  TextInput,
  LogOut, 
} from 'components';
import {
  logoPrivateAI,
  logoutIcon, ringIcon, userIcon, 
} from 'assets';
import { ScreenWidth, routes } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';
import {
  profileNotification,
  profileGetProfile,
  profileNotificationMarkAsView,
  profileNotificationSubscribe,
} from 'store/profile/actionCreators';
import { getName } from 'utils';
import { useOnClickOutside, useScreenWidth } from 'hooks';
import { MultiDrop } from 'components/MultiDrop';
import { Notification } from './Notification';
import { BonusPointsManager } from './BonusPointsManager';

import styles from './styles.module.scss';

export const Header = ({ children }:{ children?:ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useScreenWidth(ScreenWidth.bigMobile); 

  const { query: { search: searchDefault }, pathname } = router;

  const [search, setSearch] = useState(searchDefault ?? '');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsNotificationOpen(false), buttonRef);
  
  const username = useSelector(profileSelectors.getPropAccountInfo('username'));
  const fullName = useSelector(profileSelectors.getPropAccountInfo('fullName'));
  const userId = useSelector(profileSelectors.getPropAccountInfo('id'));
  const notifications = useSelector(profileSelectors.getProp('notifications'));
  const {
    avatarUrl,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  const onNotificationClick = useCallback(() => {
    setIsNotificationOpen((prevState) => !prevState);
  }, []);

  const [showLogout, hideLogout] = useModal(() => (
    <LogOut onClose={hideLogout} />
  ));

  // const onRedirectClick = useCallback(() => {
  //   router.push(routes.profile.root);
  // }, [router]);

  useEffect(() => {
    dispatch(profileGetProfile());
    dispatch(profileNotification());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(profileNotificationSubscribe());
    }
  }, [dispatch, userId]);

  const onDeleteNotification = useCallback((requestId: number) => {
    dispatch(profileNotificationMarkAsView({ 
      requestId,
      callback: () => {
        if (notifications.length <= 1) {
          setIsNotificationOpen(false); 
        }
      },
    }));
  }, [dispatch, notifications.length]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: routes.knowledge.root,
      query: { search },
    });
  }, [router, search]);

  const handleChange = useCallback((text: string) => {
    if (text === '') {
      setSearch(text); 
      if (pathname === routes.knowledge.root) {
        router.push({
          pathname: routes.knowledge.root,
        });
      }
    } else {
      setSearch(text); 
    }
  }, [pathname, router]);

  useEffect(() => {
    const newUrl = router.asPath;
    let history = [];
    const pageHistory = sessionStorage.getItem('pageHistory');
    if (pageHistory) {
      history = JSON.parse(pageHistory);
    }
    if (history.length > 1) {
      const isUrlInHistory = history[1].includes(newUrl);
      
      if (!isUrlInHistory) {
        const updatedHistory = [...history, router.asPath].slice(-2);
        sessionStorage.setItem('pageHistory', JSON.stringify(updatedHistory));
      }
    } else {
      const updatedHistory = [...history, router.asPath];
      sessionStorage.setItem('pageHistory', JSON.stringify(updatedHistory));
    }
  }, [router.asPath]);

  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <Link href="/knowledge">
          <Image
            src={logoPrivateAI}
            alt="logo"
            style={{ marginTop: -14, marginBottom: -14 }}
          />
        </Link>
      </div>
      <form className={styles.input_wrapper} onSubmit={handleSubmit}>
        <TextInput
          value={search as string}
          onChangeValue={handleChange}
          placeholder={isMobile ? 'Search' : 'Search'}
          isSearch
          isClearable
          classNameInputBox={cx(styles.input_wrapper_input, {
            [styles.input_wrapper_input_filled]: !!search.length,
          })}
        />
      </form>
     
      <BonusPointsManager />

      <div className={styles.header_right_col}>
        <ButtonIcon
          className={cx(styles.button, { [styles.active]: !!notifications.length })}
          image={ringIcon}
          onClick={onNotificationClick}
          ref={buttonRef}
          isDisabled={false}
          // isDisabled={notifications.length === 0}
        />

        <div className={styles.multiDrop_wrap}>
          <MultiDrop
            props={{
              isCustom: true,
              showArrow: true,
              btnContent: (
                <div className={styles.profileButton} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex', flexDirection: 'column', marginLeft: 35, marginRight: 15, 
                    }}
                  >
                    <span
                      className={styles.username}
                      style={{
                        textAlign: 'right',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 700,
                        color: '#7C859E',
                      }}
                    >
                      {getName(fullName, username, userId) ?? ''}
                    </span>
                    <span
                      style={{
                        textAlign: 'right',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        color: '#BBC0CE',
                      }}
                    >
                      Profile menu
                    </span>

                  </div>
                  <Image
                    style={{ borderRadius: '100%', overflow: 'hidden' }}
                    src={avatarUrl || userIcon}
                    width={41}
                    height={41}
                    alt=""
                  />
                </div>
              ),
              btnList: [
                <Link href="/profile">Settings</Link>,
                <button onClick={showLogout} style={{ width: '100%', textAlign: 'left' }}>
                  <Image
                    src={logoutIcon}
                    alt="button icon"
                    priority 
                    width={18}
                    height={18}
                  />
                  Logout
                </button>,
              ],
            }}
          />
        </div>
        <div style={{ marginLeft: 20 }}>
          {children}
        </div>
      </div>

      {userId && (
        <Notification
          ref={ref}
          userId={userId}
          isOpen={isNotificationOpen}
          toggleFun={() => setIsNotificationOpen((prev) => !prev)}
          onDeleteNotification={onDeleteNotification}
          notifications={notifications}
        />
      )}
      
    </header>
  );
};