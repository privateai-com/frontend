import { createReducer } from 'utils';
import { RequestStatus } from 'types';
import { ProfileState } from 'types/store/ProfileState';
import { ProfileActionTypes } from './actionTypes';
import { profileHandlers } from './handlers';

export const profileInitialState: Readonly<ProfileState> = {
  accountInfo: {

  },
  requester: {},
  notifications: [],
  ui: {
    [ProfileActionTypes.LinkWallet]: RequestStatus.INIT,
    [ProfileActionTypes.DeleteWallet]: RequestStatus.INIT,
    [ProfileActionTypes.UpdateProfile]: RequestStatus.INIT,
    [ProfileActionTypes.UploadAvatar]: RequestStatus.INIT,
    [ProfileActionTypes.Notification]: RequestStatus.INIT,
    [ProfileActionTypes.NotificationMarkAsView]: RequestStatus.INIT,
  },
  statusRequester: {

  },
};

export default createReducer(profileInitialState, profileHandlers);
