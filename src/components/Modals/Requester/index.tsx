import { Typography } from 'components';
import { ModalBase } from '../ModalBase';
import styles from './styles.module.scss';
import { avatarImage } from 'assets';
import Image from 'next/image';

type Props = {
  avatar: string;
  name: string;
  contry: string;
  organization: string;
  position: string;
  fields: string[];
  socialMedia: string;
};

const Requester: React.FC<Props> = ({
  avatar,
  name,
  contry,
  organization,
  position,
  fields,
  socialMedia,
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
      text: fields.join(','),
    },
  ];

  return (
    <ModalBase closeModal={() => {}}>
      <Typography
        type="h3"
        className={styles.requester_title}
      >
        Requester
      </Typography>
      <div className={styles.requester_wrapper}>
        <Image
          className={styles.requester_image}
          src={avatarImage}
          alt={name}
        />
        <div className={styles.requester_content}>
          <h4 className={styles.requester_name}>{name}</h4>
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
            <a className={styles.block_text}>{socialMedia}</a>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export { Requester };
