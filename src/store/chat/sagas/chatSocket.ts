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
  EmitedSocketChatEvent,
  ChatInfo,
  SocketChatEvent,
  MessageChat,
} from 'types';
import { profileSelectors } from 'store/profile/selectors';
import {
  chatExit,
  chatLoadPage,
  chatSendMessage,
  chatSetState,
} from '../actionCreators';
import { chatSelectors } from '../selectors';

let socket: Socket;
// let chatId: number;
// let articleIdCurrent: string;

export function* chatSendMessageSaga({
  payload: { articleId, message },
}: ReturnType<typeof chatSendMessage>) {
  try {
    socket.emit(SocketChatEvent.NewMessage, { articleId, message });
    const messages: MessageChat[] = yield select(chatSelectors.getProp('messages'));
    const username: string = yield select(profileSelectors.getPropAccountInfo('username'));

    yield put(chatSetState({
      messages: [
        ...messages,
        {
          id: `message_${message}`,
          message,
          sender: username,
          position: 'single',
          direction: 'outgoing',
        },
      ], 
    }));
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function* chatLoadPageSaga({
  payload: { articleId, articleName },
}: ReturnType<typeof chatLoadPage>) {
  try {
    socket.emit(SocketChatEvent.LoadPage, { articleId });
    yield put(chatSetState({
      messages: [
        {
          id: '0',
          message: `Hi! Im your assistent for ${articleName}. Here are some questions you can ask:`,
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
        {
          id: '1',
          message: 'questions',
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
      ], 
    }));
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function chatExitSaga({
  payload: { articleId },
}: ReturnType<typeof chatExit>) {
  try {
    socket.emit(SocketChatEvent.LoadPage, { articleId });
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

function* handleSocketEvents(eventData: { data: [ChatInfo[], number] }) {
  try {
    const { data } = eventData;
    // example
    yield put(chatSetState({
      messages: [
        {
          id: data[0][0].id.toString(),
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

function createChannel() {
  return eventChannel<EmitedSocketChatEvent>((emit) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emitData = (data: { data: any, event: SocketChatEvent }) => {
      emit({
        data: data.data,
        event: data.event,
      });
    };

    // const errorHandler = (error: unknown) => {
    //   sagaExceptionHandler(error);
    // };

    socket.on(SocketChatEvent.Start, (data) => {
      emitData({
        data,
        event: SocketChatEvent.Start,
      });
    });

    // socket.on(SocketChatEvent.NewMessage, emitData);
    // socket.on(SocketChatEvent.LoadPage, emitData);
    socket.on(SocketChatEvent.MessageWriting, emitData);
    // socket.on(SocketChatEvent.Exit, emitData);
    // socket.on(SocketChatEvent.SERVER_ERROR, errorHandler);

    return () => {
      socket.off(SocketChatEvent.Start, emitData);
      // socket.off(SocketChatEvent.SERVER_ERROR, errorHandler);
    };
  });
}

function* watchChannel() {
  const channel: EventChannel<EmitedSocketChatEvent> = yield call(createChannel);
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
