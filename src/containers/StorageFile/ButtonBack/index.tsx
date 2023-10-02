import { memo, FC, useCallback } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { backArrowIcon } from 'assets';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

type ButtonBackProps = {
  title: string;
  className?: string;
};

export const ButtonBack: FC<ButtonBackProps> = memo(({
  title,
  className = '',
}) => {
  const router = useRouter();
  const onBackNavigate = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button
      className={cx(
        styles.button_back__container,
        className,
      )}
      onClick={onBackNavigate}
    >
      <Image
        src={backArrowIcon}
        alt="button icon"
      />
      {title}
    </button>
  );
});
