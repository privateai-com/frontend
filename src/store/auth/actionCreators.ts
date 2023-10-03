import { AuthState, RequestStatus, UpdatePayload } from 'types';
import { AuthActionTypes } from './actionTypes';

export const authSetState = (payload: Partial<AuthState>) => ({
  type: AuthActionTypes.SetState,
  payload,
});

export const authSetStatus = (
  payload: { type: AuthActionTypes, status: RequestStatus },
) => ({
  type: AuthActionTypes.SetStatus,
  payload,
});

export const authRegistration = (
  payload: {
    email: string,
    password: string,
    successCallback: () => void,
    errorCallback: () => void,
  },
) => ({
  type: AuthActionTypes.Registration,
  payload,
});

export const authConfirmEmail = (
  payload: {
    email: string,
    code: string,
    successCallback: () => void,
    errorCallback: (error: string) => void,
  },
) => ({
  type: AuthActionTypes.ConfirmEmail,
  payload,
});

export const authLogin = (
  payload: {
    email: string,
    password: string,
    successCallback: () => void,
  },
) => ({
  type: AuthActionTypes.Login,
  payload,
});

export const authLoginWallet = (payload: {
  successCallback: () => void,
}) => ({
  type: AuthActionTypes.LoginWallet,
  payload,
});

export const authLogout = () => ({
  type: AuthActionTypes.Logout,
});

export const authOnUpdateAccessTokensFinish = (payload: UpdatePayload) => ({
  type: AuthActionTypes.OnUpdateAccessTokenFinish,
  ...payload,
});

export const authResendConfCode = (
  payload: {
    email: string,
  },
) => ({
  type: AuthActionTypes.ResendConfCode,
  payload,
});
