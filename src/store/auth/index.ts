import { createReducer } from 'utils';
import { RequestStatus } from 'types';
import { AuthState } from 'types/store/AuthState';
import { AuthActionTypes } from './actionTypes';
import { authHandlers } from './handlers';

export const authInitialState: Readonly<AuthState> = {
  accessToken: undefined,
  refreshToken: undefined,
  timestamp: undefined,
  email: '',
  verificationCode: '',

  ui: {
    [AuthActionTypes.Registration]: RequestStatus.INIT,
    [AuthActionTypes.Login]: RequestStatus.INIT,
    [AuthActionTypes.Logout]: RequestStatus.INIT,
    [AuthActionTypes.ResendConfCode]: RequestStatus.INIT,
    [AuthActionTypes.ConfirmCode]: RequestStatus.INIT,
    [AuthActionTypes.ChangePassword]: RequestStatus.INIT,
  },
};

export default createReducer(authInitialState, authHandlers);
