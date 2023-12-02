import {
  call,
  put,
  spawn,
  takeLatest,
} from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { EventChannel, eventChannel } from 'redux-saga';

import { socketConnect } from 'api';
import { sagaExceptionHandler } from 'utils';
import {
  EmitedSocketNotificationEvent,
  NotificationInfo,
  SocketNotificationEvent,
} from 'types';
import { profileSetState } from '../actionCreators';

let socket: Socket;

function* handleSocketEvents(eventData: { data: [NotificationInfo[], number] }) {
  try {
    const { data } = eventData;
    yield put(profileSetState({ notifications: data[0] }));
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

function createUploadChannel() {
  return eventChannel<EmitedSocketNotificationEvent>((emit) => {
    const emitedData = (data: { data: [NotificationInfo[], number] }) => {
      emit({
        data: data.data,
        event: SocketNotificationEvent.NEW_NOTIFICATION,
      });
    };

    const errorHandler = (error: unknown) => {
      sagaExceptionHandler(error);
    };

    socket.on(SocketNotificationEvent.NEW_NOTIFICATION, emitedData);
    socket.on(SocketNotificationEvent.SERVER_ERROR, errorHandler);

    return () => {
      socket.off(SocketNotificationEvent.NEW_NOTIFICATION, emitedData);
      socket.off(SocketNotificationEvent.SERVER_ERROR, errorHandler);
    };
  });
}

function* watchChannel() {
  const channel: EventChannel<EmitedSocketNotificationEvent> = yield call(createUploadChannel);
  yield takeLatest(channel, handleSocketEvents);
}

export function* profileNotificationSocketSaga() {
  try {
    if (!socket || !socket.connected) {
      socket = yield call(socketConnect);
    }
    yield spawn(watchChannel);
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
