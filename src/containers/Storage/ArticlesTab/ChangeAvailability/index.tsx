import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { RadioButtons } from 'components';
import { articlesChangeAccess } from 'store/articles/actionCreators';
import { MultiDrop } from 'components/MultiDrop';
// import styles from './styles.module.scss';

export const ChangeAvailability = ({
  id,
  isPublic,
  callBack,
}: {
  id: number;
  isPublic: boolean;
  callBack?: Function;
}) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(
    isPublic ? 'open' : ('closed' as 'open' | 'closed'),
  );

  const onChangeAvailabilityClick = (e: 'open' | 'closed') => {
    const isOpen = e === 'open';
    dispatch(articlesChangeAccess({ articleId: id, isOpen }));
    setValue(e);
    if(callBack) {
      callBack(e);
    }
  };

  return (
  // <RadioButtons
  //   containerClassName={styles.radio_buttons}
  //   options={[
  //     {
  //       value: 'open',
  //       label: 'Open-sourced',
  //     },
  //     {
  //       value: 'closed',
  //       label: 'Permission-based',
  //     },
  //   ]}
  //   currentValue={value}
  //   onChange={onChangeAvailabilityClick}
  // />

  // <div style={{position:'relative'}}>
  //   <select className={styles.select} 
  //    value={value}
  //    onChange={(e)=>onChangeAvailabilityClick(e.target.value as 'open' | 'closed')}>
  //     <option value="open" >
  //       Open-sourced
  //     </option>
  //     <option value="closed">
  //       Permission-based
  //     </option>
  //   </select>
  //   <svg style={{position:'absolute' ,top: '50%', transform: 'translateY(-50%)', right: 14}} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M5.31706 5.84212C4.91865 6.40671 4.08135 6.40671 3.68294 5.84212L0.849358 1.82656C0.381916 1.16413 0.855666 0.250001 1.66641 0.250001L7.33358 0.25C8.14433 0.25 8.61808 1.16413 8.15064 1.82656L5.31706 5.84212Z" fill="#7C859E"></path></svg>
  // </div>

    <MultiDrop props={{ 
      isSelect: true,
      selectValue: value,
      selectOptions: [
        {
          value: 'open',
          label: 'Open-sourced',
        },
        {
          value: 'closed',
          label: 'Permission-based',
        },
      ],
      callBack: onChangeAvailabilityClick,
    }}
    />

  );
};
