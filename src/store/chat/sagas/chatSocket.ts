import {
  put,
  select,
} from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import {
  MessageChat,
} from 'types';
import {
  chatLoadPage,
  chatSendMessage,
  chatSetState,
  chatStart,
} from '../actionCreators';
import { chatSelectors } from '../selectors';

let chatId: number;
let articleTitle: string;

export function* chatSendMessageSaga({
  payload: { message },
}: ReturnType<typeof chatSendMessage>) {
  try {
    if (chatId) {
      const messages: MessageChat[] = yield select(chatSelectors.getProp('messages'));

      yield put(chatSetState({
        messages: [
          ...messages,
          {
            id: messages.length + 1,
            message,
            direction: 'outgoing' as const,
            position: 'single' as const,
            sender: 'AI_Bot',
          },
        ], 
      }));
    }
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function* chatLoadPageSaga() {
  try {
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

export function chatExitSaga() {
  try {
    return;
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function* chatSocketSaga({
  payload: {
    articleName,
  },
}: ReturnType<typeof chatStart>) {
  try {
    articleTitle = articleName;
    chatId = 1;
    yield put(chatLoadPage());
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}
