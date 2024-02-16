import React, { FC, ReactNode, useState } from 'react';
import Head from 'next/head';
import cx from 'classnames';

import { MenuBtn } from 'components/MenuBtn';
import { CookieAccept } from 'components/CookieAccept';
import { useRouter } from 'next/router';
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

interface IntermediateComponentProps {
  children: ReactNode;
}

const IntermediateComponent: React.FC<IntermediateComponentProps> = ({ children }) => {
  const [isActive, setActive] = useState(false);

  return (
    <>
      {children && React.cloneElement(
        children as React.ReactElement, 
        setActive,
        <MenuBtn callBack={() => { setActive(!isActive); }} />,
      )}
      <Navigation isActive={isActive} setActive={() => { setActive(!isActive); }} />
      {/* Other elements and components */}
    </>
  );
};

export const Layout: FC<Props> = ({
  children,
  title,
  meta,
  link,
  className = '',
  mainClassName = '',
  header,
}) => {
  const path = useRouter().asPath;
  return (
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
     
        {header && (
        <IntermediateComponent>
          {header}
        </IntermediateComponent>
        )}
        {/* <Navigation isActive={true} setActive={()=>{}} /> */}

        {/* {header} */}
        <main 
          className={cx(
            styles.page__main, 
            mainClassName,
            path && path === '/profile' && styles.page__profile,
          )}
        >
          {children}
        </main>
        <CookieAccept />
      </div>
    </>
  );
};
