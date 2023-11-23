import { isWordMatchingSearch } from 'utils';

type SelectedTextProps = {
  text: string;
  searchWord: string;
  className?: string;
};

export const SelectedText: React.FC<SelectedTextProps> = ({
  text,
  searchWord,
  className,
}) => (
  <span>
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
