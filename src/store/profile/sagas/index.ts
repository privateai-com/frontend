import { takeLatest } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileLinkWalletSaga } from './linkWallet';
import { profileDeleteWalletSaga } from './profileDeleteWalletSaga';

export default function* profileSaga() {
  yield takeLatest(ProfileActionTypes.LinkWallet, profileLinkWalletSaga);
  yield takeLatest(ProfileActionTypes.DeleteWallet, profileDeleteWalletSaga);
}
