import { helpCircleIcon } from 'assets';
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import cx from 'classnames';
import styles from './styles.module.scss';

type HelpProps = {
  children: string | ReactNode;
};

const Help: React.FC<HelpProps> = ({ children }) => {
  const [isShowed, setIsShowed] = useState(false);
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const ref = useRef<HTMLImageElement>(null);

  const getStyle = () => {
    if (!ref.current) return;

    const leftPos = ref.current.getBoundingClientRect().left;
    const windowWidth = window.innerWidth;
    const length = windowWidth - leftPos;

    return length > 320 ? { left: 35 } : { right: 35 };
  };
  
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isMobile ? (
        <div className={styles.help}>
          <Image
            src={helpCircleIcon}
            alt="help"
            ref={ref}
          />
          <div
            className={styles.help_text}
            style={getStyle()}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className={styles.help_mobile}>
          <Image
            onClick={() => setIsShowed(true)}
            src={helpCircleIcon}
            alt="help"
          />
          <button
            className={cx(styles.help_bc_mobile, { [styles.showed]: isShowed })}
            onClick={() => setIsShowed(false)}
          >
            <div className={styles.help_text_mobile}>{children}</div>
          </button>
        </div>
      )}
    </>
  );
};

export { Help };
