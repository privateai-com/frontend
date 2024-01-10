import styles from './styles.module.scss';

type TitleWithArrowsProps = {
  title: string;
  onClick: () => void;
};

const TitleWithArrows: React.FC<TitleWithArrowsProps> = ({ title, onClick }) => (
  <button className={styles.title_wrapper} onClick={onClick}>
    <span className={styles.title_title}>{title}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M5.31706 5.84212C4.91865 6.40671 4.08135 6.40671 3.68294 5.84212L0.849358 1.82656C0.381916 1.16413 0.855666 0.250001 1.66641 0.250001L7.33358 0.25C8.14433 0.25 8.61808 1.16413 8.15064 1.82656L5.31706 5.84212Z" fill="#7C859E" />
    </svg>
    {/* <Image src={chevronArrowIcons} alt="arrow" /> */}
  </button>
);

export { TitleWithArrows };
