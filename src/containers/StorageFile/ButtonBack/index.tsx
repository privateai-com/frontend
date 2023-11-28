import { memo, FC, useCallback } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { backArrowIcon } from 'assets';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

type ButtonBackProps = {
  title: string;
  className?: string;
  isEdit: boolean;
  onEdit: () => void;
};

export const ButtonBack: FC<ButtonBackProps> = memo(({
  title,
  className = '',
  isEdit,
  onEdit,
}) => {
  const router = useRouter();
  const onBackNavigate = useCallback(() => {
    if (isEdit) {
      onEdit();
      return;
    }
    router.back();
  }, [isEdit, onEdit, router]);

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
