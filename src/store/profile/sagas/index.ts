import { takeLatest, takeLeading } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileLinkWalletSaga } from './linkWallet';
import { profileGetProfileSaga } from './getProfile';
import { profileDeleteWalletSaga } from './profileDeleteWalletSaga';
import { profileUpdateProfileSaga } from './updateProfileSaga';
import { profileUploadAvatarSaga } from './uploadAvatarSaga';

export default function* profileSaga() {
  yield takeLatest(ProfileActionTypes.LinkWallet, profileLinkWalletSaga);
  yield takeLeading(ProfileActionTypes.GetProfile, profileGetProfileSaga);
  yield takeLatest(ProfileActionTypes.DeleteWallet, profileDeleteWalletSaga);
  yield takeLatest(ProfileActionTypes.UpdateProfile, profileUpdateProfileSaga);
  yield takeLatest(ProfileActionTypes.UploadAvatar, profileUploadAvatarSaga);
}
