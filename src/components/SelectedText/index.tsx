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
}) => {
  if (!searchWord || searchWord.trim() === '') {
    return (
      <span className={classNameContainer} data-tooltip-id={tooltipId}>
        {text}
      </span>
    );
  }

  const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchWord})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={classNameContainer} data-tooltip-id={tooltipId}>
      {parts.map((part) =>
        (regex.test(part) ? (
          <span className={className} key={`part_${part}`}>
            {part}
          </span>
        ) : (
          <span key={`part_${part}`}>{part}</span>
        )))}
    </span>
  );
};
