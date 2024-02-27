import {
  AuthErrorTransformResult,
  AuthState,
  RequestStatus,
  UpdatePayload,
} from 'types';
import { AuthActionTypes } from './actionTypes';

export const authSetState = (payload: Partial<AuthState>) => ({
  type: AuthActionTypes.SetState,
  payload,
});

export const authSetStatus = (payload: {
  type: AuthActionTypes;
  status: RequestStatus;
}) => ({
  type: AuthActionTypes.SetStatus,
  payload,
});

export const authRegistration = (payload: {
  email: string;
  password: string;
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.Registration,
  payload,
});

export const authConfirmEmail = (payload: {
  email: string;
  code: string;
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.ConfirmEmail,
  payload,
});

export const authLogin = (payload: {
  email: string;
  password: string;
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.Login,
  payload,
});

export const authLoginWallet = (payload: {
  successCallback: () => void;
  errorCallback: (error: string) => void;
}) => ({
  type: AuthActionTypes.LoginWallet,
  payload,
});

export const authLogout = (
  payload: {
    callback?: () => void;
  } = {},
) => ({
  type: AuthActionTypes.Logout,
  payload,
});

export const authConfirmCode = (payload: {
  password: string;
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.ConfirmCode,
  payload,
});

export const authChangePassword = (payload: {
  verificationCode: string;
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.ChangePassword,
  payload,
});

export const authOnUpdateAccessTokensFinish = (payload: UpdatePayload) => ({
  type: AuthActionTypes.OnUpdateAccessTokenFinish,
  ...payload,
});

export const authResendConfCode = (payload: { email: string }) => ({
  type: AuthActionTypes.ResendConfCode,
  payload,
});

export const authRequestResetPassword = (payload: {
  email: string,
  successCallback: () => void;
  errorCallback: (error: AuthErrorTransformResult) => void;
}) => ({
  type: AuthActionTypes.RequestResetPassword,
  payload,
});
