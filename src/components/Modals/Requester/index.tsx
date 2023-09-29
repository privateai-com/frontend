import { Button, Typography } from 'components';
import { avatarImage } from 'assets';
import Image from 'next/image';
import Link from 'next/link';
import { ModalBase } from '../ModalBase';
import styles from './styles.module.scss';

type RequesterProps = {
  avatar: string;
  name: string;
  contry: string;
  organization: string;
  position: string;
  fields: string[];
  socialMedia: string;
  onCloseModal: () => void;
};

const Requester: React.FC<RequesterProps> = ({
  // avatar,
  name,
  contry,
  organization,
  position,
  fields,
  socialMedia,
  onCloseModal,
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
      text: fields.join(', '),
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
          <Image
            className={styles.requester_image}
            src={avatarImage}
            alt={name}
          />
          <div className={styles.requester_content}>
            <Typography
              type="h4"
              className={styles.requester_name}
            >
              {name}
            </Typography>
            <span className={styles.requester_country}>{contry}</span>
            {blocks.map((block) => (
              <div
                className={styles.block_wrapper}
                key={block.text}
              >
                <span className={styles.block_title}>{block.title}</span>
                <span className={styles.block_text}>{block.text}</span>
              </div>
            ))}
            <div className={styles.block_wrapper}>
              <span className={styles.block_title}>Social Media</span>
              <a
                href="https:/facebook.com/profile"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                className={styles.block_text}
                {socialMedia}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.access_wrapper}>
          <div className={styles.access_title}>
            Do you want to open your file this user?
          </div>
          <div className={styles.access_btns_block}>
            <Button isMobileAdaptive> Grant access</Button>
            <Button
              isMobileAdaptive
              theme="grey"
            >
              {' '}
              Decline access
            </Button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export { Requester };
