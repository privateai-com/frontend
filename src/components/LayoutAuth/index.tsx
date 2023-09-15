import Head from 'next/head';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode,
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

const LayoutAuth: React.FC<Props> = ({
  children,
  title,
  meta,
  link,
  className,
  mainClassName,
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

export default LayoutAuth;
