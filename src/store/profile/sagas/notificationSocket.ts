import {
  call,
  put,
  select,
  spawn,
  takeLatest,
} from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { EventChannel, eventChannel } from 'redux-saga';

import { socketConnect } from 'api';
import { sagaExceptionHandler } from 'utils';
import {
  AccountInfo,
  EmitedSocketNotificationEvent,
  NotificationInfo,
  SocketNotificationEvent,
} from 'types';
import { profileSetState } from '../actionCreators';
import { profileSelectors } from '../selectors';

let socket: Socket;

function* handleSocketEvents(eventData: { data: [NotificationInfo[], number] }) {
  try {
    const { data } = eventData;
    const id: AccountInfo['id'] = yield select(
      profileSelectors.getPropAccountInfo('id'),
    );

    // fixed backend
    const notifications =
      data[0].filter(({
        requester, article, isOwnerViewed, isRequesterViewed, 
      }) =>
        (requester.id === id && !isRequesterViewed) || (article.owner.id === id && !isOwnerViewed));

    yield put(profileSetState({ notifications }));
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

function createUploadChannel() {
  return eventChannel<EmitedSocketNotificationEvent>((emit) => {
    const emitedData = (data: string) => {
      emit(JSON.parse(data));
    };

    socket.on(SocketNotificationEvent.NEW_NOTIFICATION, emitedData);

    return () => {
      socket.off(SocketNotificationEvent.NEW_NOTIFICATION, emitedData);
    };
  });
}

function* watchChannel() {
  try {
    const channel: EventChannel<EmitedSocketNotificationEvent> = yield call(createUploadChannel);
    yield takeLatest(channel, handleSocketEvents);
  } catch (error) {
    sagaExceptionHandler(error);
  }
}

export function* profileNotificationSocketSaga() {
  try {
    if (!socket) {
      socket = yield call(socketConnect);
    }

    yield spawn(watchChannel);
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
