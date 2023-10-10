import { takeLatest } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileLinkWalletSaga } from './linkWallet';
import { profileGetProfileSaga } from './getProfile';

export default function* authSaga() {
  yield takeLatest(ProfileActionTypes.LinkWallet, profileLinkWalletSaga);
  yield takeLatest(ProfileActionTypes.GetProfile, profileGetProfileSaga);
}
