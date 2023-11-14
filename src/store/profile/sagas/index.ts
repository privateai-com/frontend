import { takeLatest, takeLeading } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileLinkWalletSaga } from './linkWallet';
import { profileGetProfileSaga } from './getProfile';
import { profileDeleteWalletSaga } from './profileDeleteWalletSaga';
import { profileUpdateProfileSaga } from './updateProfileSaga';
import { profileUploadAvatarSaga } from './uploadAvatarSaga';
import { profileGetProfileUserSaga } from './getProfileUser';
import { profileNotificationSubscribeSaga } from './notificationSubscribe';
import { profileGetNotificationsSaga } from './getNotifications';
import { profileNotificationMarkAsViewSaga } from './notificationMarkAsView';

export default function* profileSaga() {
  yield takeLatest(ProfileActionTypes.LinkWallet, profileLinkWalletSaga);
  yield takeLeading(ProfileActionTypes.GetProfile, profileGetProfileSaga);
  yield takeLatest(ProfileActionTypes.DeleteWallet, profileDeleteWalletSaga);
  yield takeLatest(ProfileActionTypes.UpdateProfile, profileUpdateProfileSaga);
  yield takeLatest(ProfileActionTypes.UploadAvatar, profileUploadAvatarSaga);
  yield takeLatest(ProfileActionTypes.GetProfileUser, profileGetProfileUserSaga);
  yield takeLatest(ProfileActionTypes.NotificationSubscribe, profileNotificationSubscribeSaga);
  yield takeLeading(ProfileActionTypes.Notification, profileGetNotificationsSaga);
  yield takeLeading(ProfileActionTypes.NotificationMarkAsView, profileNotificationMarkAsViewSaga);
}
