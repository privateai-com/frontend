import { ForgotPasswordActionTypes } from './actionTypes';

export const forgotPasswordSetEmail = (payload: { email: string }) => ({
  type: ForgotPasswordActionTypes.SetEmail,
  payload,
});

export const forgotPasswordSetVerificationCode = (payload: {
  code: string;
}) => ({
  type: ForgotPasswordActionTypes.SetVerificationCode,
  payload,
});

export const forgotPasswordSetPassword = (payload: { password: string }) => ({
  type: ForgotPasswordActionTypes.SetVerificationCode,
  payload,
});
