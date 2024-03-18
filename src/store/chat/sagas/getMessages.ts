import { put } from 'redux-saga/effects';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { chatGetMessages, chatSetState, chatSetStatus } from 'store/chat/actionCreators';

export function* chatGetMessagesSaga({
  type, payload,
}: ReturnType<typeof chatGetMessages>) {
  try {
    yield put(chatSetStatus({ type, status: RequestStatus.REQUEST }));

    yield put(chatSetState({
      messages: [
        {
          message: `Hi! Im your assistent for ${payload.articleName}. Here are some questions you can ask:`,
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
        {
          message: 'questions',
          direction: 'incoming',
          position: 'single',
          sender: 'AI_Bot',
        },
      ], 
    }));

    yield put(chatSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(chatSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
