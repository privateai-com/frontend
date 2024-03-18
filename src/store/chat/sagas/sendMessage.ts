import { put, select } from 'redux-saga/effects';
import { MessageChat, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { chatSendMessage, chatSetState, chatSetStatus } from 'store/chat/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import { chatSelectors } from '../selectors';

export function* chatSendMessageSaga({
  type, payload,
}: ReturnType<typeof chatSendMessage>) {
  try {
    yield put(chatSetStatus({ type, status: RequestStatus.REQUEST }));

    const messages: MessageChat[] = yield select(chatSelectors.getProp('messages'));
    const username: string = yield select(profileSelectors.getPropAccountInfo('username'));

    yield put(chatSetState({
      messages: [
        ...messages,
        {
          message: payload.message,
          sender: username,
          position: 'single',
          direction: 'outgoing',
        },
      ], 
    }));

    // yield put(chatSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(chatSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
