import { takeLatest } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileLinkWalletSaga } from './linkWallet';

export default function* authSaga() {
  yield takeLatest(ProfileActionTypes.LinkWallet, profileLinkWalletSaga);
}
