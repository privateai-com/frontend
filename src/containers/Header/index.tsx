import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

export const Header = () => (
  <header
    className={styles.header}
  >
    <Link href="/">
      Logo
    </Link>
  </header>
);
