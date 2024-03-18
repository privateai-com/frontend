import { takeLatest } from 'redux-saga/effects';
import { ChatActionTypes } from '../actionTypes';
import { chatGetMessagesSaga } from './getMessages';
import { chatSendMessageSaga } from './sendMessage';

export default function* profileSaga() {
  yield takeLatest(ChatActionTypes.GetMessages, chatGetMessagesSaga);
  yield takeLatest(ChatActionTypes.SendMessage, chatSendMessageSaga);
}
