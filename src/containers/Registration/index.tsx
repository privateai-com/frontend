import { useModal } from 'react-modal-hook';

import { Button, ProfileSuccess } from 'components';

import styles from './styles.module.scss';

export const Registration = () => {
  const [show, hide] = useModal(() => (
    <ProfileSuccess
      onClickCancel={hide}
      onClickUpload={hide}
      onClickBrowse={hide}
    />
  ), []);
  return (
    <div className={styles.registration__container}>
      Registration
      <Button onClick={show}>Confirm</Button>
      <Button href="/">Confirm</Button>
      <Button theme="secondary">Confirm</Button>
      <Button href="/" theme="secondary">Confirm</Button>
    </div>
  );
};
