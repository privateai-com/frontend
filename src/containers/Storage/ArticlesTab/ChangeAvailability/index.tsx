import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { RadioButtons } from 'components';
import { articlesChangeAccess } from 'store/articles/actionCreators';
import { MultiDrop } from 'components/MultiDrop';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
// import styles from './styles.module.scss';

export const ChangeAvailability = ({
  id,
  isPublic,
  hasFullValue = false,
  callBack,
}: {
  id: number;
  isPublic: boolean;
  hasFullValue?: boolean;
  callBack?: Function;
}) => {
  const dispatch = useDispatch();
  const isMobile = useScreenWidth(ScreenWidth.mobile);

  const [value, setValue] = useState(
    isPublic ? 'open' : ('closed' as 'open' | 'closed'),
  );

  useEffect(() => {
    setValue(isPublic ? 'open' : ('closed' as 'open' | 'closed'));
  }, [isPublic]);

  const onChangeAvailabilityClick = (e: string) => {
    const isOpen = e === 'open';
    dispatch(articlesChangeAccess({ articleId: id, isOpen }));
    setValue(e as 'open' | 'closed');
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
      fullValue: !isMobile ? hasFullValue : false,
      selectValue: value,
      selectOptions: [
        {
          value: 'open',
          label: (
            <span style={{
              padding: 0, display: 'flex', alignItems: 'center', gap: 10, 
            }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                <path d="M15.0312 7.32812C13.1484 7.32812 11.6172 5.67188 11.6172 3.63281C11.6172 1.625 13.1562 0 15.0312 0C16.9219 0 18.4531 1.60156 18.4531 3.61719C18.4531 5.66406 16.9219 7.32812 15.0312 7.32812ZM5.97656 7.41406C4.34375 7.41406 3.00781 5.96094 3.00781 4.16406C3.00781 2.42188 4.35156 0.976562 5.97656 0.976562C7.625 0.976562 8.95312 2.39844 8.95312 4.14844C8.95312 5.95312 7.625 7.41406 5.97656 7.41406ZM15.0312 5.97656C16.125 5.97656 17.0391 4.9375 17.0391 3.61719C17.0391 2.32812 16.1328 1.35156 15.0312 1.35156C13.9375 1.35156 13.0312 2.34375 13.0312 3.63281C13.0312 4.95312 13.9531 5.97656 15.0312 5.97656ZM5.97656 6.07812C6.875 6.07812 7.63281 5.22656 7.63281 4.14844C7.63281 3.125 6.89062 2.30469 5.97656 2.30469C5.08594 2.30469 4.33594 3.14062 4.33594 4.16406C4.33594 5.22656 5.09375 6.07812 5.97656 6.07812ZM1.67969 14.5938C0.5625 14.5938 0 14.1172 0 13.1875C0 10.5938 2.67188 8.23438 5.97656 8.23438C7.19531 8.23438 8.42969 8.5625 9.42188 9.17969C9 9.45312 8.67188 9.78125 8.41406 10.1484C7.73438 9.77344 6.85156 9.55469 5.97656 9.55469C3.49219 9.55469 1.38281 11.2734 1.38281 13.0703C1.38281 13.2031 1.44531 13.2734 1.59375 13.2734H7.09375C7.03906 13.7891 7.32812 14.3438 7.75 14.5938H1.67969ZM10.1562 14.5938C8.8125 14.5938 8.16406 14.1641 8.16406 13.25C8.16406 11.1172 10.8359 8.24219 15.0312 8.24219C19.2266 8.24219 21.8984 11.1172 21.8984 13.25C21.8984 14.1641 21.25 14.5938 19.8984 14.5938H10.1562ZM9.89844 13.2422H20.1641C20.3438 13.2422 20.4141 13.1875 20.4141 13.0391C20.4141 11.8438 18.4844 9.59375 15.0312 9.59375C11.5781 9.59375 9.64062 11.8438 9.64062 13.0391C9.64062 13.1875 9.71094 13.2422 9.89844 13.2422Z" fill="#7C859E" />
              </svg>
              Open-sourced
            </span>
          ),
          currentLabel: (
            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: -10 }} width="22" height="15" viewBox="0 0 22 15" fill="none">
              <path d="M15.0312 7.32812C13.1484 7.32812 11.6172 5.67188 11.6172 3.63281C11.6172 1.625 13.1562 0 15.0312 0C16.9219 0 18.4531 1.60156 18.4531 3.61719C18.4531 5.66406 16.9219 7.32812 15.0312 7.32812ZM5.97656 7.41406C4.34375 7.41406 3.00781 5.96094 3.00781 4.16406C3.00781 2.42188 4.35156 0.976562 5.97656 0.976562C7.625 0.976562 8.95312 2.39844 8.95312 4.14844C8.95312 5.95312 7.625 7.41406 5.97656 7.41406ZM15.0312 5.97656C16.125 5.97656 17.0391 4.9375 17.0391 3.61719C17.0391 2.32812 16.1328 1.35156 15.0312 1.35156C13.9375 1.35156 13.0312 2.34375 13.0312 3.63281C13.0312 4.95312 13.9531 5.97656 15.0312 5.97656ZM5.97656 6.07812C6.875 6.07812 7.63281 5.22656 7.63281 4.14844C7.63281 3.125 6.89062 2.30469 5.97656 2.30469C5.08594 2.30469 4.33594 3.14062 4.33594 4.16406C4.33594 5.22656 5.09375 6.07812 5.97656 6.07812ZM1.67969 14.5938C0.5625 14.5938 0 14.1172 0 13.1875C0 10.5938 2.67188 8.23438 5.97656 8.23438C7.19531 8.23438 8.42969 8.5625 9.42188 9.17969C9 9.45312 8.67188 9.78125 8.41406 10.1484C7.73438 9.77344 6.85156 9.55469 5.97656 9.55469C3.49219 9.55469 1.38281 11.2734 1.38281 13.0703C1.38281 13.2031 1.44531 13.2734 1.59375 13.2734H7.09375C7.03906 13.7891 7.32812 14.3438 7.75 14.5938H1.67969ZM10.1562 14.5938C8.8125 14.5938 8.16406 14.1641 8.16406 13.25C8.16406 11.1172 10.8359 8.24219 15.0312 8.24219C19.2266 8.24219 21.8984 11.1172 21.8984 13.25C21.8984 14.1641 21.25 14.5938 19.8984 14.5938H10.1562ZM9.89844 13.2422H20.1641C20.3438 13.2422 20.4141 13.1875 20.4141 13.0391C20.4141 11.8438 18.4844 9.59375 15.0312 9.59375C11.5781 9.59375 9.64062 11.8438 9.64062 13.0391C9.64062 13.1875 9.71094 13.2422 9.89844 13.2422Z" fill="#7C859E" />
            </svg>
          ),
        },
        {
          value: 'closed',
          label: (
            <span style={{
              padding: 0, display: 'flex', alignItems: 'center', gap: 10, 
            }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M2.33594 15.9375C1.14844 15.9375 0.53125 15.3047 0.53125 14.0234V8.49219C0.53125 7.35938 1.02344 6.73438 1.96094 6.60938V4.75C1.96094 1.86719 3.86719 0.375 6 0.375C8.13281 0.375 10.0391 1.86719 10.0391 4.75V6.60938C10.9766 6.73438 11.4609 7.35938 11.4609 8.49219V14.0234C11.4609 15.3047 10.8438 15.9375 9.65625 15.9375H2.33594ZM3.42188 4.60938V6.58594H8.57812V4.60938C8.57812 2.78125 7.39062 1.78125 6 1.78125C4.60156 1.78125 3.42188 2.78125 3.42188 4.60938ZM2.5625 14.5391H9.4375C9.76562 14.5391 9.94531 14.3438 9.94531 13.9688V8.54688C9.94531 8.17188 9.76562 7.98438 9.4375 7.98438H2.5625C2.24219 7.98438 2.04688 8.17188 2.04688 8.54688V13.9688C2.04688 14.3438 2.24219 14.5391 2.5625 14.5391Z" fill="#7C859E" />
              </svg>
              Permission-based
            </span>
          ),          
          currentLabel: (
            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: -10 }} width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path d="M2.33594 15.9375C1.14844 15.9375 0.53125 15.3047 0.53125 14.0234V8.49219C0.53125 7.35938 1.02344 6.73438 1.96094 6.60938V4.75C1.96094 1.86719 3.86719 0.375 6 0.375C8.13281 0.375 10.0391 1.86719 10.0391 4.75V6.60938C10.9766 6.73438 11.4609 7.35938 11.4609 8.49219V14.0234C11.4609 15.3047 10.8438 15.9375 9.65625 15.9375H2.33594ZM3.42188 4.60938V6.58594H8.57812V4.60938C8.57812 2.78125 7.39062 1.78125 6 1.78125C4.60156 1.78125 3.42188 2.78125 3.42188 4.60938ZM2.5625 14.5391H9.4375C9.76562 14.5391 9.94531 14.3438 9.94531 13.9688V8.54688C9.94531 8.17188 9.76562 7.98438 9.4375 7.98438H2.5625C2.24219 7.98438 2.04688 8.17188 2.04688 8.54688V13.9688C2.04688 14.3438 2.24219 14.5391 2.5625 14.5391Z" fill="#7C859E" />
            </svg>
          ),
        },
      ],
      callBack: onChangeAvailabilityClick,
    }}
    />
  );
};