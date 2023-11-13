import { createReducer } from 'utils';
import { RequestStatus } from 'types';
import { ProfileState } from 'types/store/ProfileState';
import { ProfileActionTypes } from './actionTypes';
import { profileHandlers } from './handlers';

export const profileInitialState: Readonly<ProfileState> = {
  accountInfo: {

  },
  requester: {},
  ui: {
    [ProfileActionTypes.LinkWallet]: RequestStatus.INIT,
    [ProfileActionTypes.DeleteWallet]: RequestStatus.INIT,
    [ProfileActionTypes.UpdateProfile]: RequestStatus.INIT,
    [ProfileActionTypes.UploadAvatar]: RequestStatus.INIT,
  },
};

export default createReducer(profileInitialState, profileHandlers);
