import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { RadioButtons } from 'components';
import { articlesChangeAccess } from 'store/articles/actionCreators';
import styles from './styles.module.scss';

export const ChangeAvailability = ({
  id,
  isPublic,
}: {
  id: number;
  isPublic: boolean;
}) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(
    isPublic ? 'open' : ('closed' as 'open' | 'closed'),
  );

  const onChangeAvailabilityClick = (e: 'open' | 'closed') => {
    const isOpen = e === 'open';
    dispatch(articlesChangeAccess({ articleId: id, isOpen }));
    setValue(e);
  };

  return (
    <RadioButtons
      containerClassName={styles.radio_buttons}
      options={[
        {
          value: 'open',
          label: 'Open-sourced',
        },
        {
          value: 'closed',
          label: 'Permission-based',
        },
      ]}
      currentValue={value}
      onChange={onChangeAvailabilityClick}
    />
  );
};
