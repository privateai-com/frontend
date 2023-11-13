import { FC, ReactNode } from 'react';
import Head from 'next/head';
import cx from 'classnames';

import { Navigation } from './Navigation';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode,
  header?: ReactNode,
  title?: string,
  meta?: {
    name: string,
    content: string,
  },
  link?: {
    rel: string,
    href: string,
  },
  className?: string,
  mainClassName?: string,
};

export const Layout: FC<Props> = ({
  children,
  title,
  meta,
  link,
  className = '',
  mainClassName = '',
  header,
}) => (
  <>
    <Head>
      {title &&
        (<title>{title}</title>)}
      {meta &&
        (<meta name={meta.name} content={meta.content} />)}
      {link &&
        (<link rel={link.rel} href={link.href} />)}
    </Head>
    <div 
      className={cx(
        styles.page_container, 
        className, 
      )}
    >
      <Navigation />
      {header}
      <main 
        className={cx(
          styles.page__main, 
          mainClassName, 
        )}
      >
        {children}
      </main>
    </div>
  </>
);
