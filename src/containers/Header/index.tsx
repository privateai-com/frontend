import React, { useState } from 'react';
import cx from 'classnames';

import { ButtonIcon, TextInput } from 'components';
import Link from 'next/link';
import { logoutIcon, ringIcon, userIcon } from 'assets';
import { routes } from 'appConstants';
import { Notification } from './Notification';
import { NotificationContent } from './NotificationContent';

import styles from './styles.module.scss';

export const Header = () => {
  const [search, setSearch] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const onNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const inputClassNames = search.length
    ? `${styles.input_wrapper_input}, ${styles.input_wrapper_input_filled}`
    : styles.input_wrapper_input;

  const name = 'John Doe';

  return (
    <header className={styles.header}>
      <div className={styles.input_wrapper}>
        <TextInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Global search"
          isSearch
          isClearable
          classNameInputBox={inputClassNames}
        />
        {!!search.length && (
          <div className={styles.search_result}>
            <ul className={styles.search_list}>
              <li>Result 1</li>
              <li>Result 2</li>
              <li>Result 3</li>
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
      <span>{name}</span>
      <ButtonIcon
        className={styles.button}
        image={userIcon}
        onClick={() => {}}
      />
      <ButtonIcon
        className={cx(styles.button, { [styles.active]: true })}
        image={ringIcon}
        onClick={onNotificationClick}
      />
      <ButtonIcon
        className={styles.button}
        image={logoutIcon}
        onClick={() => {}}
      />
      <Notification isOpen={isNotificationOpen}>
        <NotificationContent />
      </Notification>
    </header>
  );
};
