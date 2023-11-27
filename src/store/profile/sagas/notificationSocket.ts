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
