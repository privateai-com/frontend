import React, { memo, useCallback, useState } from 'react';
import cx from 'classnames';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { Sidebar } from './Sidebar';

import styles from './styles.module.scss';

export const Navigation = memo(() => {
  const isAdaptive = useScreenWidth(ScreenWidth.notebook1024);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);
  
  if (!isAdaptive) return <Sidebar />;
  
  return (
    <>
      <button
        className={cx(styles.burger)}
        onClick={toggleMenu}
      >
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </button>
      <Sidebar 
        className={cx({ [styles.showSidebar]: isOpen })} 
      />
      <button 
        className={cx(styles.overlay, { [styles.show]: isOpen })} 
        onClick={toggleMenu} 
      />
    </>
  );
});
