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
  EmitedSocketChatEvent,
  ChatInfo,
  SocketChatEvent,
} from 'types';
import { chatSetState } from '../actionCreators';

let socket: Socket;

function* handleSocketEvents(eventData: { data: [ChatInfo[], number] }) {
  try {
    const { data } = eventData;
    // example
    yield put(chatSetState({
      messages: [
        {
          message: data[0][0].message,
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
      ], 
    }));
  } catch (err) {
    sagaExceptionHandler(err);
  }
}

function createUploadChannel() {
  return eventChannel<EmitedSocketChatEvent>((emit) => {
    const emitedData = (data: { data: [ChatInfo[], number] }) => {
      emit({
        data: data.data,
        event: SocketChatEvent.NEW_CHAT,
      });
    };

    const errorHandler = (error: unknown) => {
      sagaExceptionHandler(error);
    };

    socket.on(SocketChatEvent.NEW_CHAT, emitedData);
    socket.on(SocketChatEvent.SERVER_ERROR, errorHandler);

    return () => {
      socket.off(SocketChatEvent.NEW_CHAT, emitedData);
      socket.off(SocketChatEvent.SERVER_ERROR, errorHandler);
    };
  });
}

function* watchChannel() {
  const channel: EventChannel<EmitedSocketChatEvent> = yield call(createUploadChannel);
  yield takeLatest(channel, handleSocketEvents);
}

export function* chatSocketSaga() {
  try {
    if (!socket || !socket.connected) {
      socket = yield call(socketConnect);
    }
    yield spawn(watchChannel);
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
