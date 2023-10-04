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
  <>
    {text.split(' ').map((word) =>
      (isWordMatchingSearch(word, searchWord) ? (
        <>
          <span className={className}>{word}</span>
          {' '}
        </>
      ) : (
        `${word} `
      )))}
  </>
);
