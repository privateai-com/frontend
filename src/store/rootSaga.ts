import { fork } from 'redux-saga/effects';
import metamaskSaga from './metamask/sagas';
import authSaga from './auth/sagas';

export default function* rootSaga() {
  yield fork(metamaskSaga);
  yield fork(authSaga);
}
