import {
  call, put, select, take, 
} from 'redux-saga/effects';
import EventSource from 'eventsource';
import { ApiEndpoint, apiBaseUrl } from 'appConstants';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { profileSetStatus, profileNotificationSubscribe } from 'store/profile/actionCreators';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { authSelectors } from 'store/auth/selectors';
import { NotUndefined, END as ENDType } from '@redux-saga/types';
import { ProfileActionTypes } from '../actionTypes';

export function subscribeToSSE(eventSrc: EventSource) {
  const localEventSrc = eventSrc;

  return eventChannel((emitter) => {
    localEventSrc.onopen = (ev: NotUndefined | ENDType) => {
      // console.info('connection is established');
      emitter(ev);
    };

    // localEventSrc.onerror = (err: { message: string }) => {
    //   console.error(err);
    // };

    localEventSrc.addEventListener(
      ProfileActionTypes.NotificationSubscribeUpdate,
      (ev: NotUndefined | ENDType) => {
        // console.info('data event recieved...', ev);
        emitter(ev);
      },
    );

    return () => {
      // console.info('closing connection...');
      localEventSrc.close();
      emitter(END);
    };
  });
}

export function* profileNotificationSubscribeSaga({
  type,
}: ReturnType<typeof profileNotificationSubscribe>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));
    const url = `${apiBaseUrl}${ApiEndpoint.NotificationSubscribe}`;
    const accessTokenCurrent: string = yield select(
      authSelectors.getProp('accessToken'),
    );
    const headers = {
      Authorization: `Bearer ${accessTokenCurrent}`,
    };
    
    const options = {
      headers,
    };
    const eventSrc = new EventSource(url, options);

    const channel: EventChannel<NotUndefined> = yield call(subscribeToSSE, eventSrc);

    // yield put(ChildActions.setChannel(channel));

    while (true) {
      const event: { data: string } = yield take(channel);
      JSON.parse(String(event.data));
      // console.log({ data })
    }
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }

  // let sseChannel;
  // try {
  //   yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));
  //   const accessTokenCurrent: string = yield select(
  //     authSelectors.getProp('accessToken'),
  //   );
  //   const url = `${apiBaseUrl}${ApiEndpoint.NotificationSubscribe}`;
  //   const headers = {
  //     Authorization: `Bearer ${accessTokenCurrent}`,
  //   };
    
  //   const options = {
  //     headers,
  //   };

  //   sseChannel = yield call(createSSEChannel, url, options);

  //   while (true) {
  //     const event = yield take(sseChannel);
    
  //     if (event instanceof MessageEvent && event.data) {
  //       const eventData = event.data;
    
  //       console.log('Received SSE message:', eventData);
  //     }
  //   }
  // } catch (e) {
  //   sagaExceptionHandler(e);
  //   yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  // } finally {
  //   if (sseChannel) {
  //     sseChannel.close();
  //   }
  // }
}
