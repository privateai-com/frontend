import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ChatActionTypes } from '../actionTypes';
import {
  chatExitSaga,
  chatLoadPageSaga,
  chatSendMessageSaga,
  chatSocketSaga,
} from './chatSocket';

export default function* chatSaga() {
  yield takeEvery(ChatActionTypes.Start, chatSocketSaga);
  yield takeLatest(ChatActionTypes.LoadPage, chatLoadPageSaga);
  yield takeLatest(ChatActionTypes.SendMessage, chatSendMessageSaga);
  yield takeLatest(ChatActionTypes.Exit, chatExitSaga);
}
