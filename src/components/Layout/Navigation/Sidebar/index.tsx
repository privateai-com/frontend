import { FC, cloneElement, memo } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { privateAILogo } from 'assets';

import logoPrivateAI from '../../../../assets/img/icons/logoPrivateAI.svg';
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
      <div className="" style={{padding: 30, width: '100%', position: 'sticky', top: 0}}>
        <Image
          src={logoPrivateAI}
          alt="logo"
          className={styles.sidebar_logo}
          width={210}
          height={66}
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
              {cloneElement(icon, {
                className: cx(styles.svg, {
                  [styles.active_svg]: href === pathname,
                }),
              })}
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
