import { isWordMatchingSearch } from 'utils';

type SelectedTextProps = {
  text: string;
  searchWord: string;
  className?: string;
  classNameContainer?: string;
  tooltipId?: string;
};

export const SelectedText: React.FC<SelectedTextProps> = ({
  text,
  searchWord,
  className,
  classNameContainer,
  tooltipId,
}) => (
  <span className={classNameContainer} data-tooltip-id={tooltipId}>
    {text.split(' ').map((word) =>
      (isWordMatchingSearch(word, searchWord) ? (
        <span className={className} key={word}>
          {word} 
          {' '}
        </span>
      ) : (
        `${word} `
      )))}
  </span>
);
