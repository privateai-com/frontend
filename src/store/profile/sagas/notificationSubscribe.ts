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

export function subscribeToSSE(eventSrc: EventSource, userId: number) {
  const localEventSrc = eventSrc;

  return eventChannel((emitter) => {
    localEventSrc.onopen = (ev: MessageEvent) => {
      // console.info('connection is established');
      emitter(ev);
    };

    // localEventSrc.onmessage = (ev: MessageEvent) => {
    //   console.info('data event received...', ev.data);
    //   emitter({ data: ev.data });
    // };

    // localEventSrc.onerror = (err: { message: string }) => {
    //   console.error(err);
    // };

    localEventSrc.addEventListener(
      `request-${userId}`,
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
  type, payload,
}: ReturnType<typeof profileNotificationSubscribe>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const url = `${apiBaseUrl}${ApiEndpoint.NotificationSubscribe}?userId=${payload.userId}`;
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

    const channel: EventChannel<NotUndefined> =
      yield call(subscribeToSSE, eventSrc, payload.userId);

    while (true) {
      const event: { data: string } = yield take(channel);
      JSON.parse(String(event.data));
      // console.log({ data })
    }
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
