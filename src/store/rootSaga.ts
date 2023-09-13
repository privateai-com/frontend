import { fork } from 'redux-saga/effects';
import metamaskSaga from './metamask/sagas';

export default function* rootSaga() {
  yield fork(metamaskSaga);
}
