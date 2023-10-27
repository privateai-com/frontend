import { ProfileState, RequestStatus } from 'types';
import { ProfileActionTypes } from './actionTypes';

export const profileSetState = (payload: Partial<ProfileState>) => ({
  type: ProfileActionTypes.SetState,
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

export const profileDeleteWallet = () => ({
  type: ProfileActionTypes.DeleteWallet,
});
