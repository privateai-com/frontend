import { takeLatest } from 'redux-saga/effects';
import { MetamaskActionTypes } from '../actionTypes';
import { connectMetamaskSaga } from './connectMetamaskSaga';
import { disconnectMetamaskSaga } from './disconnectMetamask';
import { switchNetworkSaga } from './switchNetwork';

export default function* metamaskSaga() {
  yield takeLatest(MetamaskActionTypes.Connect, connectMetamaskSaga);
  yield takeLatest(MetamaskActionTypes.Disconnect, disconnectMetamaskSaga);
  yield takeLatest(MetamaskActionTypes.SwitchNetwork, switchNetworkSaga);
}
