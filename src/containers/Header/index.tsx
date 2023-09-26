import React, { useState } from 'react';
import cx from 'classnames';

import {
  ButtonIcon,
  ModalNotification,
  TextInput,
  NotificationContent,
} from 'components';
import { logoutIcon, ringIcon, userIcon } from 'assets';

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
          placeholder="Search"
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
            <span className={styles.search_link}>{'See all search results >'}</span>
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
      <ModalNotification isOpen={isNotificationOpen}>
        <NotificationContent />
      </ModalNotification>
    </header>
  );
};
