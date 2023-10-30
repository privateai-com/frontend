import { fork } from 'redux-saga/effects';
import metamaskSaga from './metamask/sagas';
import authSaga from './auth/sagas';
import profileSaga from './profile/sagas';
import articlesSaga from './articles/sagas';

export default function* rootSaga() {
  yield fork(metamaskSaga);
  yield fork(authSaga);
  yield fork(profileSaga);
  yield fork(articlesSaga);
}
