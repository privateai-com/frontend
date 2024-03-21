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
  SocketChatEvent,
  MessageChat,
} from 'types';
import {
  chatExit,
  chatLoadPage,
  chatSendMessage,
  chatSetState,
  chatStart,
} from '../actionCreators';
import { chatSelectors } from '../selectors';

let socket: Socket;
let chatId: number;
let articleTitle: string;
let articleIdCurrent: string;

export function chatSendMessageSaga({
  payload: { articleId, message },
}: ReturnType<typeof chatSendMessage>) {
  try {
    if (chatId) {
      socket.emit(SocketChatEvent.NewMessage, { articleId, chatId, message });
    }
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function* chatLoadPageSaga() {
  try {
    socket.emit(SocketChatEvent.LoadPage, {
      articleId: articleIdCurrent,
      chatId,
      take: 100000,
      skip: 0,
    });
    
    yield put(chatSetState({
      messages: [
        {
          id: 100100,
          message: `Hi! Im your assistent for ${articleTitle}. Here are some questions you can ask:`,
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
        {
          id: 100101,
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
    if (chatId) {
      socket.emit(SocketChatEvent.Exit, { articleId, chatId });
    }
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

function* handleSocketEvents(eventData: EmitedSocketChatEvent) {
  try {
    const { data: { data }, event } = eventData;

    if (event === SocketChatEvent.Start && 'chatId' in data) {
      chatId = data.chatId;
      yield put(chatLoadPage());
    }

    // if (event === SocketChatEvent.MessageWriting) {
    //   console.log({ MessageWriting: data });
    // }

    if (event === SocketChatEvent.LoadPage && Array.isArray(data)) {
      const messages: MessageChat[] = yield select(chatSelectors.getProp('messages'));
      const socketMessages = data.map(({ message, id, writer }) => ({
        id,
        message,
        sender: writer ? writer.username : 'AI_Bot',
        position: 'single' as const,
        direction: writer ? 'outgoing' as const : 'incoming' as const,
      }));

      yield put(chatSetState({
        messages: [
          messages[0],
          messages[1],
          ...socketMessages,
        ], 
      }));
    }
    if (event === SocketChatEvent.NewMessage && 'messages' in data) {
      const messages: MessageChat[] = yield select(chatSelectors.getProp('messages'));
      const socketMessages = data.messages.map(({ message, id, writer }) => ({
        id,
        message,
        sender: writer ? writer.username : 'AI_Bot',
        position: 'single' as const,
        direction: writer ? 'outgoing' as const : 'incoming' as const,
      }));

      yield put(chatSetState({
        messages: [
          messages[0],
          messages[1],
          ...socketMessages,
        ], 
      }));
    }
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

function createChannel() {
  return eventChannel<EmitedSocketChatEvent>((emit) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emitData = (data: { data: any, event: SocketChatEvent }) => {
      // console.log({ emitData: data });
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

    socket.on(SocketChatEvent.LoadPage, (data) => {
      emitData({
        data,
        event: SocketChatEvent.LoadPage,
      });
    });

    socket.on(SocketChatEvent.NewMessage, (data) => {
      emitData({
        data,
        event: SocketChatEvent.NewMessage,
      });
    });

    // socket.on(SocketChatEvent.MessageWriting, (data) => {
    //   emitData({
    //     data,
    //     event: SocketChatEvent.MessageWriting,
    //   });
    // });

    socket.on(SocketChatEvent.Exit, (data) => {
      emitData({
        data,
        event: SocketChatEvent.Exit,
      });
    });

    // socket.on(SocketChatEvent.NewMessage, emitData);
    // socket.on(SocketChatEvent.LoadPage, emitData);
    // socket.on(SocketChatEvent.MessageWriting, emitData);
    // socket.on(SocketChatEvent.SERVER_ERROR, errorHandler);

    return () => {
      socket.off(SocketChatEvent.NewMessage, emitData);
      // socket.off(SocketChatEvent.Start, emitData);
      // socket.off(SocketChatEvent.SERVER_ERROR, errorHandler);
    };
  });
}

function* watchChannel() {
  const channel: EventChannel<EmitedSocketChatEvent> = yield call(createChannel);
  yield takeLatest(channel, handleSocketEvents);
}

export function* chatSocketSaga({
  payload: { 
    articleId,
    articleName,
  },
}: ReturnType<typeof chatStart>) {
  try {
    if (!socket || !socket.connected) {
      socket = yield call(socketConnect);
    }
    articleTitle = articleName;
    articleIdCurrent = articleId;
    yield spawn(watchChannel);
    socket.emit(SocketChatEvent.Start, { articleId });
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
