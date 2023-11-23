import {
  ProfileState, RequestStatus, ProfileUpdateData, AccountInfo, 
} from 'types';
import { ProfileActionTypes } from './actionTypes';

export const profileSetState = (payload: Partial<ProfileState>) => ({
  type: ProfileActionTypes.SetState,
  payload,
});

export const profileSetAccountInfo = (payload: Partial<ProfileState['accountInfo']>) => ({
  type: ProfileActionTypes.SetState,
  payload,
});

export const profileSetStateRequester = (payload: AccountInfo) => ({
  type: ProfileActionTypes.SetStateRequester,
  payload,
});

export const profileSetStatusRequester = (payload: {
  id: number;
  status: RequestStatus;
}) => ({
  type: ProfileActionTypes.SetStatusRequester,
  payload,
});

export const profileSetStatus = (payload: {
  type: ProfileActionTypes;
  status: RequestStatus;
}) => ({
  type: ProfileActionTypes.SetStatus,
  payload,
});

export const profileLinkWallet = () => ({
  type: ProfileActionTypes.LinkWallet,
});

export const profileGetProfile = () => ({
  type: ProfileActionTypes.GetProfile,
});

export const profileGetProfileUser = (payload: {
  profileId: number,
  successCallback: () => void,
}) => ({
  type: ProfileActionTypes.GetProfileUser,
  payload,
});

export const profileDeleteWallet = () => ({
  type: ProfileActionTypes.DeleteWallet,
});

export const profileUpdateProfile = (payload: ProfileUpdateData) => ({
  type: ProfileActionTypes.UpdateProfile,
  payload,
});

export const profileUploadAvatar = (payload: { file: File }) => ({
  type: ProfileActionTypes.UploadAvatar,
  payload,
});

export const profileNotification = () => ({
  type: ProfileActionTypes.Notification,
});

export const profileNotificationSubscribe = (payload: { userId: number }) => ({
  type: ProfileActionTypes.NotificationSubscribe,
  payload,
});

export const profileNotificationMarkAsView = (payload: { requestId: number; }) => ({
  type: ProfileActionTypes.NotificationMarkAsView,
  payload,
});
