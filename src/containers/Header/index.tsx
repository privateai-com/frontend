import React, {
  FormEvent,
  useCallback, useEffect, useRef, useState,
} from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import {
  ButtonIcon, TextInput, 
  // SelectedText, 
  LogOut, 
} from 'components';
import { logoutIcon, ringIcon, userIcon } from 'assets';
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
import { Notification } from './Notification';

import styles from './styles.module.scss';

// const results = [
//   'A brief history of the antibiotics era',
//   'Antibiotic resistance',
//   'The effectiveness of frequent antibiotic use',
//   'A brief history of the antibiotics era',
//   'Antibiotic resistance',
// ];

export const Header = () => {
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

  const onNotificationClick = useCallback(() => {
    setIsNotificationOpen((prevState) => !prevState);
  }, []);

  const [showLogout, hideLogout] = useModal(() => (
    <LogOut onClose={hideLogout} />
  ));

  const onRedirectClick = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

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
      <form className={styles.input_wrapper} onSubmit={handleSubmit}>
        <TextInput
          value={search as string}
          onChangeValue={handleChange}
          placeholder={isMobile ? 'Search' : 'Global search'}
          isSearch
          isClearable
          classNameInputBox={cx(styles.input_wrapper_input, {
            [styles.input_wrapper_input_filled]: !!search.length,
          })}
        />
        {/* {!!search.length && (
          <div className={styles.search_result}>
            <ul className={styles.search_list}>
              {results.map((result, i) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                >
                  <SelectedText
                    // eslint-disable-next-line react/no-array-index-key
                    key={`result_${i}`}
                    text={result}
                    searchWord={search}
                    className={styles.selected}
                  />
                </li>
              ))}
            </ul>
            <Link
              href={`${routes.knowledge.root}/?search=${search}`}
              className={styles.search_link}
            >
              {'See all search results >'}
            </Link>
          </div>
        )} */}
      </form>
      <span className={styles.username}>{getName(fullName, username, userId) ?? ''}</span>
      <ButtonIcon
        className={styles.button}
        image={userIcon}
        onClick={onRedirectClick}
        width={30}
        height={30}
      />
      <ButtonIcon
        className={cx(styles.button, { [styles.active]: !!notifications.length })}
        image={ringIcon}
        onClick={onNotificationClick}
        ref={buttonRef}
        isDisabled={notifications.length === 0}
      />
      <ButtonIcon
        className={styles.button}
        image={logoutIcon}
        onClick={showLogout}
      />
      {userId && (
        <Notification
          ref={ref}
          userId={userId}
          isOpen={isNotificationOpen}
          onDeleteNotification={onDeleteNotification}
          notifications={notifications}
        />
      )}
    </header>
  );
};
