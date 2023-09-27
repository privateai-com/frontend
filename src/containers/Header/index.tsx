import React, { useState } from 'react';
import cx from 'classnames';

import { ButtonIcon, TextInput, Requester } from 'components';
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
      <Requester
        name="John Doe"
        contry="London, UK (GMT +0)"
        organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
        position="Head of neurosurgery laboratory"
        fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
        socialMedia="https:/facebook.com/profile"
        avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
        onCloseModal={() => {}}
      />
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
