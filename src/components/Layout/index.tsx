import Head from 'next/head';
import cx from 'classnames';
import Image from 'next/image';

import { bg1, bg2, bg3 } from 'assets';
import { Navigation } from './Navigation';

import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
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

const Layout: React.FC<Props> = ({
  children,
  title,
  meta,
  link,
  className,
  mainClassName,
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
      <Image
        src={bg1}
        alt="bg"
        className={styles.background}
      />
      <Image
        src={bg2}
        alt="bg"
        className={styles.background}
      />
      <Image
        src={bg3}
        alt="bg"
        className={styles.background}
      />

      <Navigation />
      {header}
      <main className={cx(
        styles.page__main, 
        mainClassName, 
      )}
      >
        {children}
      </main>
    </div>
  </>
);

export default Layout;
