import { Button, Typography } from 'components';
import Image from 'next/image';
import { ModalBase } from '../ModalBase';
import styles from './styles.module.scss';

type RequesterProps = {
  id: number;
  avatarUrl: string;
  name: string;
  contry: string;
  organization: string;
  position: string;
  fields: string;
  socialMedia: string;
  questionFooter?: string;
  confirmButtonLabel?: string;
  onConfirmButton?: () => void;
  cancelButtonLabel?: string;
  onCancelButton?: () => void;
  onCloseModal: () => void;
  isHideButoons?: boolean;
};

const Requester: React.FC<RequesterProps> = ({
  id,
  avatarUrl,
  name,
  contry,
  organization,
  position,
  fields,
  socialMedia,
  questionFooter = 'Do you want to open your file this user?',
  confirmButtonLabel = 'Grant access',
  onConfirmButton,
  cancelButtonLabel = 'Decline access',
  onCancelButton,
  onCloseModal,
  isHideButoons = false,
}) => {
  const blocks = [
    {
      title: 'Organisation/Institute',
      text: organization,
    },
    {
      title: 'Position',
      text: position,
    },
    {
      title: 'Research fields',
      text: fields,
    },
  ];

  return (
    <ModalBase
      closeModal={onCloseModal}
      isWithCloseButton
    >
      <div className={styles.requester_wrapper}>
        <Typography
          type="h3"
          className={styles.requester_title}
        >
          Requester
        </Typography>
        <div className={styles.requester_content_wrapper}>
          <div className={styles.requester_image}>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <span />
            )}
          </div>
          <div className={styles.requester_content}>
            <Typography
              type="h4"
              className={styles.requester_name}
            >
              {name || `Archonaut#${id}`}
            </Typography>
            <span className={styles.requester_country}>{contry}</span>
            {blocks.map((block) => (
              <div
                className={styles.block_wrapper}
                key={block.title}
              >
                <span className={styles.block_title}>{block.title}</span>
                <span className={styles.block_text}>{block.text}</span>
              </div>
            ))}
            <div className={styles.block_wrapper}>
              <span className={styles.block_title}>Social Media</span>
              <a
                href={socialMedia}
                target="_blank"
                rel="noreferrer"
                className={styles.block_text}
              >
                {socialMedia}
              </a>
            </div>
          </div>
        </div>
        {!isHideButoons && (
          <div className={styles.access_wrapper}>
            <div className={styles.access_title}>
              {questionFooter}
            </div>
            <div className={styles.access_btns_block}>
              <Button
                isMobileAdaptive
                onClick={onConfirmButton}
              >
                {confirmButtonLabel}
              </Button>
              <Button
                isMobileAdaptive
                theme="grey"
                onClick={onCancelButton}
              >
                {cancelButtonLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalBase>
  );
};

export { Requester };
