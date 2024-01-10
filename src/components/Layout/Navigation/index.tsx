import React, { memo } from 'react';
import cx from 'classnames';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { Sidebar } from './Sidebar';

import styles from './styles.module.scss';

interface NavigationProps {
  isActive: boolean;
  setActive : () => void;
}

export const Navigation: React.FC<NavigationProps> = memo(({ isActive, setActive }) => {
  const isAdaptive = useScreenWidth(ScreenWidth.notebook1024);
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = useCallback(() => {
  //   setIsOpen(() => !isOpen);
  // }, []);
  
  if (!isAdaptive) return <Sidebar />;
  
  return (
    <>
      {/* <button
        className={cx(styles.burger)}
        onClick={toggleMenu}
      >
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </button> */}
      <Sidebar 
        className={cx({ [styles.showSidebar]: isActive })} 
      />
      <button 
        onClick={() => setActive()}
        className={cx(styles.overlay, { [styles.show]: isActive })} 
      />
      
    </>
  );
});
