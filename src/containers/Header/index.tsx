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

  const name = 'John Doe';

  return (
    <header className={styles.header}>
      <div className={styles.input_wrapper}>
        <TextInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Search"
          isSearch
          classNameInputBox={styles.input_wrapper_input}
        />
        {!!search.length && (
          <ul className={styles.search_result}>
            <li>Result 1</li>
            <li>Result 2</li>
            <li>Result 3</li>
          </ul>
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
