import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import {
  ButtonIcon, TextInput, SelectedText, LogOut, 
} from 'components';
import { logoutIcon, ringIcon, userIcon } from 'assets';
import { routes } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';
import {
  profileNotification,
  profileGetProfile,
  profileNotificationMarkAsView,
  profileNotificationSubscribe,
} from 'store/profile/actionCreators';

import { useOnClickOutside } from 'hooks';
import { Notification } from './Notification';

import styles from './styles.module.scss';

const results = [
  'A brief history of the antibiotics era',
  'Antibiotic resistance',
  'The effectiveness of frequent antibiotic use',
  'A brief history of the antibiotics era',
  'Antibiotic resistance',
];

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsNotificationOpen(false), buttonRef);
  
  const username = useSelector(profileSelectors.getPropAccountInfo('username'));
  const fullName = useSelector(profileSelectors.getPropAccountInfo('fullName'));
  const userId = useSelector(profileSelectors.getPropAccountInfo('id'));
  const notifications = useSelector(profileSelectors.getProp('notifications'));

  const onNotificationClick = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

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
    dispatch(profileNotificationSubscribe());
  }, [dispatch, userId]);

  const onDeleteNotification = useCallback((requestId: number) => {
    dispatch(profileNotificationMarkAsView({ requestId }));
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.input_wrapper}>
        <TextInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Global search"
          isSearch
          isClearable
          classNameInputBox={cx(styles.input_wrapper_input, {
            [styles.input_wrapper_input_filled]: !!search.length,
          })}
        />
        {!!search.length && (
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
        )}
      </div>
      <span className={styles.username}>{fullName || username}</span>
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
