import React, { FC, memo } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { privateAILogo } from 'assets';
import { navPathName } from './constants';

import styles from './styles.module.scss';

type SidebarProps = {
  className?: string;
};

export const Sidebar: FC<SidebarProps> = memo(({
  className,
}) => {
  const pathname = usePathname();
  return (
    <div className={cx(styles.sidebar_container, className)}>
      <Image
        src={privateAILogo}
        alt="logo"
        className={styles.sidebar_logo}
      />
      <div className={styles.sidebar_list}>
        {navPathName.map(({ href, title, icon }) => (
          <Link
            href={href}
            key={title}
            className={cx(styles.sidebar_link, {
              [styles.active]: href === pathname,
            })}
          >
            {React.cloneElement(icon, {
              className: cx(styles.svg, {
                [styles.active_svg]: href === pathname,
              }),
            })}
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
});
