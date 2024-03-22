import { fork } from 'redux-saga/effects';
import metamaskSaga from './metamask/sagas';
import authSaga from './auth/sagas';
import profileSaga from './profile/sagas';
import articlesSaga from './articles/sagas';
import requestSaga from './request/sagas';
import chatSaga from './chat/sagas';

export default function* rootSaga() {
  yield fork(requestSaga);
  yield fork(metamaskSaga);
  yield fork(authSaga);
  yield fork(profileSaga);
  yield fork(articlesSaga);
  yield fork(chatSaga);
}
