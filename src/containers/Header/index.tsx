import React, { useState } from 'react';
import cx from 'classnames';

import { ButtonIcon, TextInput } from 'components';
import Link from 'next/link';
import { logoutIcon, ringIcon, userIcon } from 'assets';
import { routes } from 'appConstants';
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
  const [search, setSearch] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const onNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const inputClassNames = search.length
    ? `${styles.input_wrapper_input}, ${styles.input_wrapper_input_filled}`
    : styles.input_wrapper_input;

  const isWordMatchingSearch = (word: string) => word.toLowerCase() === search.toLowerCase();

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
              {results.map((result, i) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                >
                  {result.split(' ').map((word) => {
                    if (isWordMatchingSearch(word)) {
                      return (
                        <>
                          <span className={styles.selected}>{word}</span>
                          {' '}
                        </>
                      );
                    }
                    return `${word} `;
                  })}
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
      <Notification isOpen={isNotificationOpen} />
    </header>
  );
};
