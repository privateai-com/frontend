import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ButtonIcon, TextInput, SelectedText, LogOut } from 'components';
import { logoutIcon, ringIcon, userIcon } from 'assets';
import { routes } from 'appConstants';
import { authLogout } from 'store/auth/actionCreators';
import { accountSelectors } from 'store/account/selectors';

import { Notification } from './Notification';

import styles from './styles.module.scss';
import { useModal } from 'react-modal-hook';

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
  const username = useSelector(accountSelectors.getProp('username'));

  const onNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const [showLogout, hideLogout] = useModal(() => (
    <LogOut onClose={hideLogout} />
  ));

  const onRedirectClick = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

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
      <span>{username}</span>
      <ButtonIcon
        className={styles.button}
        image={userIcon}
        onClick={onRedirectClick}
      />
      <ButtonIcon
        className={cx(styles.button, { [styles.active]: true })}
        image={ringIcon}
        onClick={onNotificationClick}
      />
      <ButtonIcon
        className={styles.button}
        image={logoutIcon}
        onClick={showLogout}
      />
      <Notification isOpen={isNotificationOpen} />
    </header>
  );
};
