import Head from 'next/head';
import cx from 'classnames';
import styles from './styles.module.scss';
import { Navigation } from './Navigation';

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
      <Navigation />
      <main className={cx(
        styles.page__main, 
        mainClassName, 
      )}
      >
        {header}
        {children}
      </main>
    </div>
  </>
);

export default Layout;
